import fs from "node:fs";
import path from "node:path";

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

function toReactStyleKey(property: string): string {
	return property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function getReactStyleSnippetByClassName(gradientsCssText: string, className: string): string {
	const ruleBody = getRuleBodyByClassName(gradientsCssText, className);
	if (!ruleBody) return `/* React style not found for ${className} */`;

	const entries = parseDeclarations(ruleBody)
		.map(([property, value]) => `  ${JSON.stringify(toReactStyleKey(property))}: ${JSON.stringify(value)}`)
		.join(",\n");

	return `{\n${entries}\n}`;
}

export interface CssSnippetFormats {
	css: string;
	tailwind: string;
	react: string;
}

export function buildCssSnippetMap(classNames: readonly string[]): Record<string, CssSnippetFormats> {
	const gradientsCssText = fs.readFileSync(
		path.resolve(process.cwd(), "src/styles/gradients.css"),
		"utf8",
	);
	return classNames.reduce<Record<string, CssSnippetFormats>>((acc, className) => {
		acc[className] = {
			css: getCssSnippetByClassName(gradientsCssText, className),
			tailwind: getTailwindSnippetByClassName(gradientsCssText, className),
			react: getReactStyleSnippetByClassName(gradientsCssText, className),
		};
		return acc;
	}, {});
}
