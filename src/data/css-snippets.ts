import fs from "node:fs";
import path from "node:path";
import { createHighlighter, type Highlighter } from "shiki";

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCssSnippetByClassName(gradientsCssText: string, className: string): string {
	const escapedClass = escapeRegExp(className);
	const ruleRegex = new RegExp(`(^|\\n)\\s*\\.${escapedClass}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "m");
	const match = gradientsCssText.match(ruleRegex);
	if (!match) return `.${className} {\n  /* style not found */\n}`;
	return `.${className} {\n${match[2].trimEnd()}\n}`;
}

function getRuleBodyByClassName(gradientsCssText: string, className: string): string {
	const escapedClass = escapeRegExp(className);
	const ruleRegex = new RegExp(`(^|\\n)\\s*\\.${escapedClass}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`, "m");
	const match = gradientsCssText.match(ruleRegex);
	return match?.[2] ?? "";
}

function parseDeclarations(ruleBody: string): Array<[string, string]> {
	return ruleBody
		.split(";")
		.map((declaration) => declaration.trim())
		.filter(Boolean)
		.map((declaration) => {
			const separatorIndex = declaration.indexOf(":");
			if (separatorIndex === -1) return null;
			const property = declaration.slice(0, separatorIndex).trim();
			const value = declaration.slice(separatorIndex + 1).trim();
			if (!property || !value) return null;
			return [property, value] as [string, string];
		})
		.filter((declaration): declaration is [string, string] => declaration !== null);
}

/** Collapse the multi-line formatting used in `gradients.css` into a single-line value. */
function collapseValue(value: string): string {
	return value.replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").trim();
}

/** Split on a separator that sits at bracket depth 0 (layers, gradient arguments, stop tokens). */
function splitTopLevel(value: string, separator: "," | " "): string[] {
	const parts: string[] = [];
	let depth = 0;
	let current = "";
	for (const character of value) {
		if (character === "(" || character === "[") depth += 1;
		else if (character === ")" || character === "]") depth -= 1;
		const isSeparator =
			depth === 0 && (separator === "," ? character === "," : /\s/.test(character));
		if (isSeparator) {
			if (current.trim()) parts.push(current.trim());
			current = "";
			continue;
		}
		current += character;
	}
	if (current.trim()) parts.push(current.trim());
	return parts;
}

function toArbitraryValue(value: string): string {
	return value
		.replace(/\s*,\s*/g, ",")
		.replace(/\s+/g, "_")
		.replace(/\\_/g, "_");
}

function toTailwindBorderClasses(value: string): string[] {
	const borderParts = value.match(/^(.+?)\s+(solid|dashed|dotted|double|none)\s+(.+)$/i);
	if (!borderParts) return [`[border:${toArbitraryValue(value)}]`];

	const [, width, style, color] = borderParts;
	const classes: string[] = [];
	classes.push(width === "1px" ? "border" : `border-[${toArbitraryValue(width)}]`);
	classes.push(`border-${style.toLowerCase()}`);
	classes.push(`border-[${toArbitraryValue(color)}]`);
	return classes;
}

function toTailwindClass(property: string, value: string): string[] {
	const arbitraryValue = toArbitraryValue(value);

	switch (property) {
		case "background-image":
			return [`bg-[${arbitraryValue}]`];
		case "background-size":
			return [`bg-size-[${arbitraryValue}]`];
		case "background-blend-mode":
			return [`[background-blend-mode:${arbitraryValue}]`];
		case "border":
			return toTailwindBorderClasses(value);
		case "box-shadow":
			return [`shadow-[${arbitraryValue}]`];
		case "backdrop-filter":
			return [`[backdrop-filter:${arbitraryValue}]`];
		case "-webkit-backdrop-filter":
			return [`[-webkit-backdrop-filter:${arbitraryValue}]`];
		default:
			return [`[${property}:${arbitraryValue}]`];
	}
}

function getTailwindSnippetByClassName(gradientsCssText: string, className: string): string {
	const ruleBody = getRuleBodyByClassName(gradientsCssText, className);
	if (!ruleBody) return `/* Tailwind style not found for ${className} */`;

	return parseDeclarations(ruleBody)
		.flatMap(([property, value]) => toTailwindClass(property, value))
		.join(" ");
}

/**
 * `background-color` -> `backgroundColor`, `-webkit-backdrop-filter` -> `WebkitBackdropFilter`.
 * The leading dash of a vendor prefix is dropped and its first letter is capitalised, which is
 * exactly the key React expects for prefixed properties.
 */
function toReactStyleKey(property: string): string {
	return property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function getReactStyleSnippetByClassName(gradientsCssText: string, className: string): string {
	const ruleBody = getRuleBodyByClassName(gradientsCssText, className);
	if (!ruleBody) return `/* React style not found for ${className} */`;

	const entries = parseDeclarations(ruleBody)
		.map(([property, value]) => `  ${toReactStyleKey(property)}: ${JSON.stringify(collapseValue(value))},`)
		.join("\n");

	return `{\n${entries}\n}`;
}

/** Re-wrap a comma separated layer list so each layer sits on its own line. */
function formatLayeredValue(value: string, indent: string): string {
	const layers = splitTopLevel(collapseValue(value), ",");
	if (layers.length < 2) return ` ${collapseValue(value)}`;
	return `\n${layers.map((layer) => `${indent}${layer}`).join(",\n")}`;
}

function getScssSnippetByClassName(gradientsCssText: string, className: string): string {
	const ruleBody = getRuleBodyByClassName(gradientsCssText, className);
	if (!ruleBody) return `// SCSS style not found for ${className}`;

	const declarations = parseDeclarations(ruleBody);
	const imageDeclaration = declarations.find(([property]) => property === "background-image");
	const variableName = `$${className}-image`;

	const lines: string[] = [];
	if (imageDeclaration) {
		lines.push(`${variableName}:${formatLayeredValue(imageDeclaration[1], "  ")};`, "");
	}

	lines.push(`@mixin ${className} {`);
	for (const [property, value] of declarations) {
		if (property === "background-image" && imageDeclaration) {
			lines.push(`  background-image: ${variableName};`);
			continue;
		}
		lines.push(`  ${property}: ${collapseValue(value)};`);
	}
	lines.push("}", "", `.${className} {`, `  @include ${className};`, "}");

	return lines.join("\n");
}

/* ------------------------------------------------------------------ *
 * Native (SwiftUI / Flutter) translation
 *
 * Only single-layer `linear-gradient` and circular `radial-gradient`
 * rules with literal colour stops are translated. Everything else gets
 * an explicit "not expressible" message instead of plausible-but-wrong
 * code: layered backgrounds, conic/repeating gradients, backdrop-filter
 * materials, elliptical radii and colours that need CSS-only functions.
 * ------------------------------------------------------------------ */

interface Rgba {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface ColorStop {
	color: Rgba;
	position: number | null;
}

type ResolvedStop = { color: Rgba; position: number };

interface LinearGradientSpec {
	kind: "linear";
	angle: number;
	stops: ResolvedStop[];
}

interface RadialGradientSpec {
	kind: "radial";
	centerX: number;
	centerY: number;
	radius: number;
	stops: ResolvedStop[];
}

type GradientSpec = LinearGradientSpec | RadialGradientSpec;

/** Why a rule cannot be translated; the platform name is filled in per target. */
type UnsupportedReason = string;

const NAMED_COLORS: Record<string, Rgba> = {
	transparent: { r: 0, g: 0, b: 0, a: 0 },
	black: { r: 0, g: 0, b: 0, a: 1 },
	white: { r: 255, g: 255, b: 255, a: 1 },
	gray: { r: 128, g: 128, b: 128, a: 1 },
	grey: { r: 128, g: 128, b: 128, a: 1 },
};

function parseNumber(token: string): number | null {
	const value = Number.parseFloat(token);
	return Number.isFinite(value) ? value : null;
}

function parseChannel(token: string, scale: number): number | null {
	if (token.endsWith("%")) {
		const percent = parseNumber(token);
		return percent === null ? null : (percent / 100) * scale;
	}
	return parseNumber(token);
}

function hueToRgbComponent(p: number, q: number, tRaw: number): number {
	let t = tRaw;
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}

function hslToRgba(h: number, s: number, l: number, a: number): Rgba {
	const hue = (((h % 360) + 360) % 360) / 360;
	if (s === 0) {
		const value = Math.round(l * 255);
		return { r: value, g: value, b: value, a };
	}
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return {
		r: Math.round(hueToRgbComponent(p, q, hue + 1 / 3) * 255),
		g: Math.round(hueToRgbComponent(p, q, hue) * 255),
		b: Math.round(hueToRgbComponent(p, q, hue - 1 / 3) * 255),
		a,
	};
}

function parseCssColor(raw: string): Rgba | null {
	const token = raw.trim().toLowerCase();
	if (!token) return null;
	if (NAMED_COLORS[token]) return NAMED_COLORS[token];

	const hexMatch = token.match(/^#([0-9a-f]{3,8})$/);
	if (hexMatch) {
		const hex = hexMatch[1];
		const expand = (part: string) => Number.parseInt(part.repeat(2), 16);
		if (hex.length === 3 || hex.length === 4) {
			return {
				r: expand(hex[0]),
				g: expand(hex[1]),
				b: expand(hex[2]),
				a: hex.length === 4 ? expand(hex[3]) / 255 : 1,
			};
		}
		if (hex.length === 6 || hex.length === 8) {
			return {
				r: Number.parseInt(hex.slice(0, 2), 16),
				g: Number.parseInt(hex.slice(2, 4), 16),
				b: Number.parseInt(hex.slice(4, 6), 16),
				a: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1,
			};
		}
		return null;
	}

	const functionMatch = token.match(/^([a-z]+)\((.*)\)$/);
	if (!functionMatch) return null;
	const [, name, argsRaw] = functionMatch;
	const args = argsRaw
		.replace(/\//g, " / ")
		.split(/[\s,]+/)
		.filter(Boolean);
	const slashIndex = args.indexOf("/");
	const alphaToken = slashIndex === -1 ? args[3] : args[slashIndex + 1];
	const channels = slashIndex === -1 ? args.slice(0, 3) : args.slice(0, slashIndex);
	if (channels.length < 3) return null;

	let alpha = 1;
	if (alphaToken !== undefined) {
		const parsed = parseChannel(alphaToken, 1);
		if (parsed === null) return null;
		alpha = Math.min(1, Math.max(0, parsed));
	}

	if (name === "rgb" || name === "rgba") {
		const rgb = channels.map((channel) => parseChannel(channel, 255));
		if (rgb.some((channel) => channel === null)) return null;
		return {
			r: Math.round(rgb[0] as number),
			g: Math.round(rgb[1] as number),
			b: Math.round(rgb[2] as number),
			a: alpha,
		};
	}

	if (name === "hsl" || name === "hsla") {
		const hue = parseNumber(channels[0]);
		const saturation = parseChannel(channels[1], 1);
		const lightness = parseChannel(channels[2], 1);
		if (hue === null || saturation === null || lightness === null) return null;
		return hslToRgba(hue, saturation, lightness, alpha);
	}

	// oklch(), lab(), color-mix() and friends have no literal RGB form here.
	return null;
}

function parsePercent(token: string): number | null {
	if (token === "0") return 0;
	if (!token.endsWith("%")) return null;
	const value = parseNumber(token);
	return value === null ? null : value / 100;
}

function parseAngleDegrees(token: string): number | null {
	const match = token.match(/^(-?[\d.]+)(deg|turn|rad|grad)$/);
	if (!match) return null;
	const value = Number.parseFloat(match[1]);
	if (!Number.isFinite(value)) return null;
	switch (match[2]) {
		case "turn":
			return value * 360;
		case "rad":
			return (value * 180) / Math.PI;
		case "grad":
			return value * 0.9;
		default:
			return value;
	}
}

const SIDE_ANGLES: Record<string, number> = {
	top: 0,
	right: 90,
	bottom: 180,
	left: 270,
	"top right": 45,
	"right top": 45,
	"bottom right": 135,
	"right bottom": 135,
	"bottom left": 225,
	"left bottom": 225,
	"top left": 315,
	"left top": 315,
};

function parseDirection(token: string): number | null {
	const angle = parseAngleDegrees(token);
	if (angle !== null) return angle;
	const toMatch = token.match(/^to\s+(.+)$/);
	if (!toMatch) return null;
	return SIDE_ANGLES[toMatch[1].trim()] ?? null;
}

function parseColorStops(args: string[]): ColorStop[] | null {
	const stops: ColorStop[] = [];
	for (const arg of args) {
		const tokens = splitTopLevel(arg, " ");
		if (tokens.length === 0) return null;
		const color = parseCssColor(tokens[0]);
		if (!color) return null;
		if (tokens.length === 1) {
			stops.push({ color, position: null });
			continue;
		}
		const positions = tokens.slice(1).map(parsePercent);
		if (positions.some((position) => position === null) || positions.length > 2) return null;
		for (const position of positions) stops.push({ color, position: position as number });
	}
	return stops.length >= 2 ? stops : null;
}

function resolveStopPositions(stops: ColorStop[]): ResolvedStop[] {
	const positions: Array<number | null> = stops.map((stop) => stop.position);
	if (positions[0] === null) positions[0] = 0;
	if (positions[positions.length - 1] === null) positions[positions.length - 1] = 1;

	let index = 0;
	while (index < positions.length) {
		if (positions[index] !== null) {
			index += 1;
			continue;
		}
		let next = index;
		while (positions[next] === null) next += 1;
		const start = positions[index - 1] as number;
		const end = positions[next] as number;
		const steps = next - (index - 1);
		for (let gap = index; gap < next; gap += 1) {
			positions[gap] = start + ((end - start) * (gap - (index - 1))) / steps;
		}
		index = next;
	}

	let highest = 0;
	return stops.map((stop, stopIndex) => {
		highest = Math.max(highest, positions[stopIndex] as number);
		return { color: stop.color, position: highest };
	});
}

function unsupported(reason: UnsupportedReason): { reason: UnsupportedReason } {
	return { reason };
}

function parseGradientSpec(
	declarations: Array<[string, string]>,
): GradientSpec | { reason: UnsupportedReason } {
	if (declarations.some(([property]) => property.endsWith("backdrop-filter"))) {
		return unsupported("this rule relies on a backdrop-filter blur, which is a material rather than a gradient");
	}

	const imageDeclaration = declarations.find(([property]) => property === "background-image");
	if (!imageDeclaration) return unsupported("this rule has no background-image to translate");

	const layers = splitTopLevel(collapseValue(imageDeclaration[1]), ",");
	if (layers.length > 1) {
		return unsupported(
			`this gradient stacks ${layers.length} CSS background layers, and there is no single native gradient that reproduces them`,
		);
	}

	const layerMatch = layers[0].match(/^([a-z-]+)\((.*)\)$/);
	if (!layerMatch) return unsupported("the background layer is not a plain CSS gradient function");

	const [, functionName, argsRaw] = layerMatch;
	if (functionName !== "linear-gradient" && functionName !== "radial-gradient") {
		return unsupported(`\`${functionName}()\` has no direct native equivalent`);
	}

	const args = splitTopLevel(argsRaw, ",");
	if (args.length < 2) return unsupported("the gradient has fewer than two colour stops");

	if (functionName === "linear-gradient") {
		const angle = parseDirection(args[0]);
		const stopArgs = angle === null ? args : args.slice(1);
		const stops = parseColorStops(stopArgs);
		if (!stops) {
			return unsupported(
				"its colour stops use CSS-only values (for example `oklch()` or `color-mix()`) with no literal colour equivalent",
			);
		}
		return { kind: "linear", angle: angle ?? 180, stops: resolveStopPositions(stops) };
	}

	// radial-gradient: only `<rx>% <ry>% [at <x>% <y>%]` with rx === ry maps to a native circle.
	const prelude = args[0];
	const preludeIsStop = parseCssColor(splitTopLevel(prelude, " ")[0]) !== null;
	if (preludeIsStop) {
		return unsupported(
			"it uses the default `farthest-corner` sizing, which depends on the painted box and has no fixed native radius",
		);
	}

	const [sizePart, positionPart = "50% 50%"] = prelude.split(/\s+at\s+/);
	const sizeTokens = splitTopLevel(sizePart, " ").filter(
		(token) => token !== "circle" && token !== "ellipse",
	);
	const sizes = sizeTokens.map(parsePercent);
	if (sizes.length === 0 || sizes.some((size) => size === null)) {
		return unsupported("its radius is not given as an explicit percentage of the box");
	}
	if (sizes.length === 2 && Math.abs((sizes[0] as number) - (sizes[1] as number)) > 1e-6) {
		return unsupported(
			`it is an ellipse (${sizeTokens[0]} x ${sizeTokens[1]}) and native radial gradients are circular`,
		);
	}

	const positionTokens = splitTopLevel(positionPart, " ").map(parsePercent);
	if (positionTokens.length !== 2 || positionTokens.some((token) => token === null)) {
		return unsupported("its centre is not given as an explicit percentage of the box");
	}

	const stops = parseColorStops(args.slice(1));
	if (!stops) {
		return unsupported(
			"its colour stops use CSS-only values (for example `oklch()` or `color-mix()`) with no literal colour equivalent",
		);
	}

	return {
		kind: "radial",
		centerX: positionTokens[0] as number,
		centerY: positionTokens[1] as number,
		radius: sizes[0] as number,
		stops: resolveStopPositions(stops),
	};
}

function rgbaToHex(color: Rgba): string {
	const channel = (value: number) =>
		Math.max(0, Math.min(255, Math.round(value)))
			.toString(16)
			.padStart(2, "0");
	return `#${channel(color.r)}${channel(color.g)}${channel(color.b)}`;
}

/**
 * Literal `#rrggbb` colour stops for a gradient rule, reusing the same single-layer
 * linear/radial parsing that powers the SwiftUI/Flutter translation above. Returns `null`
 * when the rule can't be reduced to literal stops — conic gradients, multi-layer "mesh"
 * compositions, `backdrop-filter` materials, or stops expressed in `oklch()`/`color-mix()`.
 */
export function getLiteralStopColors(gradientsCssText: string, className: string): string[] | null {
	const ruleBody = getRuleBodyByClassName(gradientsCssText, className);
	const declarations = parseDeclarations(ruleBody);
	const spec = parseGradientSpec(declarations);
	if ("reason" in spec) return null;
	return spec.stops.map((stop) => rgbaToHex(stop.color));
}

function round(value: number, digits = 3): string {
	const rounded = Number.parseFloat(value.toFixed(digits));
	return Object.is(rounded, -0) ? "0" : String(rounded);
}

/**
 * CSS measures the gradient line from the box centre: the end point sits at
 * `(|w·sinA| + |h·cosA|) / 2` along `(sinA, -cosA)`. Evaluated on a unit square this
 * gives the unit-space start/end points SwiftUI and Flutter interpolate between.
 */
function angleToUnitPoints(angleDegrees: number): {
	start: { x: number; y: number };
	end: { x: number; y: number };
} {
	const radians = (angleDegrees * Math.PI) / 180;
	const dx = Math.sin(radians);
	const dy = -Math.cos(radians);
	const half = (Math.abs(dx) + Math.abs(dy)) / 2;
	return {
		start: { x: 0.5 - half * dx, y: 0.5 - half * dy },
		end: { x: 0.5 + half * dx, y: 0.5 + half * dy },
	};
}

const SWIFT_UNIT_POINTS: Record<string, string> = {
	"0,0": ".topLeading",
	"0.5,0": ".top",
	"1,0": ".topTrailing",
	"0,0.5": ".leading",
	"0.5,0.5": ".center",
	"1,0.5": ".trailing",
	"0,1": ".bottomLeading",
	"0.5,1": ".bottom",
	"1,1": ".bottomTrailing",
};

function toSwiftUnitPoint(point: { x: number; y: number }): string {
	const named = SWIFT_UNIT_POINTS[`${round(point.x)},${round(point.y)}`];
	return named ?? `UnitPoint(x: ${round(point.x)}, y: ${round(point.y)})`;
}

function toSwiftColor(color: Rgba): string {
	return `Color(red: ${round(color.r / 255)}, green: ${round(color.g / 255)}, blue: ${round(color.b / 255)}, opacity: ${round(color.a)})`;
}

function toSwiftStops(stops: ResolvedStop[], indent: string): string {
	return stops
		.map((stop) => `${indent}.init(color: ${toSwiftColor(stop.color)}, location: ${round(stop.position)}),`)
		.join("\n");
}

const FLUTTER_ALIGNMENTS: Record<string, string> = {
	"-1,-1": "Alignment.topLeft",
	"0,-1": "Alignment.topCenter",
	"1,-1": "Alignment.topRight",
	"-1,0": "Alignment.centerLeft",
	"0,0": "Alignment.center",
	"1,0": "Alignment.centerRight",
	"-1,1": "Alignment.bottomLeft",
	"0,1": "Alignment.bottomCenter",
	"1,1": "Alignment.bottomRight",
};

function toFlutterAlignment(point: { x: number; y: number }): string {
	const x = point.x * 2 - 1;
	const y = point.y * 2 - 1;
	const named = FLUTTER_ALIGNMENTS[`${round(x)},${round(y)}`];
	return named ?? `Alignment(${round(x)}, ${round(y)})`;
}

function toFlutterColor(color: Rgba): string {
	const channel = (value: number) =>
		Math.max(0, Math.min(255, Math.round(value)))
			.toString(16)
			.padStart(2, "0")
			.toUpperCase();
	return `Color(0x${channel(color.a * 255)}${channel(color.r)}${channel(color.g)}${channel(color.b)})`;
}

/** Declarations that the native output deliberately leaves out. */
function describeOmittedDeclarations(declarations: Array<[string, string]>): string[] {
	return declarations
		.filter(([property]) => property !== "background-image")
		.map(([property]) => property);
}

function buildSwiftUiSnippet(spec: GradientSpec, sourceLayer: string, omitted: string[]): string {
	const header = [`// Translated from CSS: ${sourceLayer}`];
	if (omitted.length > 0) {
		header.push(`// The CSS rule also sets ${omitted.join(", ")} — not represented below.`);
	}

	if (spec.kind === "linear") {
		const { start, end } = angleToUnitPoints(spec.angle);
		const isAxisAligned = spec.angle % 90 === 0;
		if (!isAxisAligned) {
			header.push(
				"// CSS gradient angles are box-relative; these unit points are exact for a square frame.",
			);
		}
		return [
			...header,
			"LinearGradient(",
			"    gradient: Gradient(stops: [",
			toSwiftStops(spec.stops, "        "),
			"    ]),",
			`    startPoint: ${toSwiftUnitPoint(start)},`,
			`    endPoint: ${toSwiftUnitPoint(end)}`,
			")",
		].join("\n");
	}

	header.push(
		"// SwiftUI radial gradients are circular, so the CSS ellipse matches on a square frame.",
	);
	return [
		...header,
		"GeometryReader { proxy in",
		"    RadialGradient(",
		"        gradient: Gradient(stops: [",
		toSwiftStops(spec.stops, "            "),
		"        ]),",
		`        center: ${toSwiftUnitPoint({ x: spec.centerX, y: spec.centerY })},`,
		"        startRadius: 0,",
		`        endRadius: min(proxy.size.width, proxy.size.height) * ${round(spec.radius)}`,
		"    )",
		"}",
	].join("\n");
}

function buildFlutterSnippet(spec: GradientSpec, sourceLayer: string, omitted: string[]): string {
	const header = [`// Translated from CSS: ${sourceLayer}`];
	if (omitted.length > 0) {
		header.push(`// The CSS rule also sets ${omitted.join(", ")} — not represented below.`);
	}

	const colors = spec.stops.map((stop) => `    ${toFlutterColor(stop.color)},`).join("\n");
	const stops = spec.stops.map((stop) => round(stop.position)).join(", ");

	if (spec.kind === "linear") {
		const { start, end } = angleToUnitPoints(spec.angle);
		if (spec.angle % 90 !== 0) {
			header.push(
				"// CSS gradient angles are box-relative; these alignments are exact for a square frame.",
			);
		}
		return [
			...header,
			"const LinearGradient(",
			`  begin: ${toFlutterAlignment(start)},`,
			`  end: ${toFlutterAlignment(end)},`,
			"  colors: [",
			colors,
			"  ],",
			`  stops: [${stops}],`,
			")",
		].join("\n");
	}

	header.push(
		"// Flutter's radius is a fraction of the shortest side, so the CSS ellipse matches on a square box.",
	);
	return [
		...header,
		"const RadialGradient(",
		`  center: ${toFlutterAlignment({ x: spec.centerX, y: spec.centerY })},`,
		`  radius: ${round(spec.radius)},`,
		"  colors: [",
		colors,
		"  ],",
		`  stops: [${stops}],`,
		")",
	].join("\n");
}

export interface NativeSnippet {
	/** `true` when `code` reproduces the CSS gradient; `false` when only `reason` is meaningful. */
	available: boolean;
	code: string;
	reason: string;
}

function buildNativeSnippets(
	gradientsCssText: string,
	className: string,
): { swiftui: NativeSnippet; flutter: NativeSnippet } {
	const ruleBody = getRuleBodyByClassName(gradientsCssText, className);
	const declarations = parseDeclarations(ruleBody);
	const spec = parseGradientSpec(declarations);

	if ("reason" in spec) {
		return {
			swiftui: {
				available: false,
				code: "",
				reason: `Not expressible in SwiftUI — ${spec.reason}.`,
			},
			flutter: {
				available: false,
				code: "",
				reason: `Not expressible in Flutter — ${spec.reason}.`,
			},
		};
	}

	const imageDeclaration = declarations.find(([property]) => property === "background-image");
	const sourceLayer = collapseValue(imageDeclaration?.[1] ?? "");
	const omitted = describeOmittedDeclarations(declarations);

	return {
		swiftui: {
			available: true,
			code: buildSwiftUiSnippet(spec, sourceLayer, omitted),
			reason: "",
		},
		flutter: {
			available: true,
			code: buildFlutterSnippet(spec, sourceLayer, omitted),
			reason: "",
		},
	};
}

export interface CssSnippetFormats {
	css: string;
	tailwind: string;
	react: string;
	scss: string;
	swiftui: NativeSnippet;
	flutter: NativeSnippet;
}

let gradientsCssTextCache: string | null = null;

/** The full `src/styles/gradients.css` source, read once per build and cached. */
export function getGradientsCssText(): string {
	gradientsCssTextCache ??= fs.readFileSync(
		path.resolve(process.cwd(), "src/styles/gradients.css"),
		"utf8",
	);
	return gradientsCssTextCache;
}

export function buildCssSnippetMap(classNames: readonly string[]): Record<string, CssSnippetFormats> {
	const gradientsCssText = getGradientsCssText();
	return classNames.reduce<Record<string, CssSnippetFormats>>((acc, className) => {
		const native = buildNativeSnippets(gradientsCssText, className);
		acc[className] = {
			css: getCssSnippetByClassName(gradientsCssText, className),
			tailwind: getTailwindSnippetByClassName(gradientsCssText, className),
			react: getReactStyleSnippetByClassName(gradientsCssText, className),
			scss: getScssSnippetByClassName(gradientsCssText, className),
			swiftui: native.swiftui,
			flutter: native.flutter,
		};
		return acc;
	}, {});
}

/**
 * One Shiki highlighter for the whole build. `codeToHtml()` re-resolves themes and
 * languages on every call, which is measurable once six formats are rendered on each
 * of the 388 detail pages.
 */
let highlighterPromise: Promise<Highlighter> | null = null;

export async function highlightSnippet(code: string, lang: string): Promise<string> {
	highlighterPromise ??= createHighlighter({
		themes: ["github-light", "github-dark"],
		langs: ["css", "scss", "html", "js", "swift", "dart"],
	});
	const highlighter = await highlighterPromise;
	return highlighter.codeToHtml(code, {
		lang,
		themes: { light: "github-light", dark: "github-dark" },
		defaultColor: false,
	});
}
