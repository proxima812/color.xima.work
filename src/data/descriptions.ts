import type { Locale } from "../i18n";

type LocaleKey = Locale;

const skipTokens = new Set<string>([
	"linear",
	"radial",
	"conic",
	"repeating",
	"multi",
	"stop",
	"transparent",
	"mesh",
	"neo",
	"noise",
	"overlay",
	"femme",
	"masc",
	"border",
	"glow",
	"flag",
]);

const usages: Record<LocaleKey, readonly string[]> = {
	ru: ["под hero-секцию с контрастной типографикой", "под карточки продукта и pricing-блок", "под фоновую секцию лендинга", "под акцентную CTA-зону", "под баннер в маркетинговом экране", "под тёмный интерфейс дашборда"],
	en: ["for hero sections with contrast typography", "for product cards and pricing blocks", "for landing page background sections", "for accent CTA zones", "for marketing banners", "for dark dashboard layouts"],
	tt: ["контраст типографикасы булган hero өчен", "продукт карточкалары һәм бәя блогы өчен", "лендингның фон секциясе өчен", "CTA акцент зонасы өчен", "маркетинг баннеры өчен", "караңгы dashboard өчен"],
};

const colorWords: Record<LocaleKey, Readonly<Record<string, string>>> = {
	ru: { rose: "розовый", mint: "мятный", blue: "синий", violet: "фиолетовый", green: "зелёный", gold: "золотой", cobalt: "кобальтовый", amber: "янтарный", ocean: "океанический", night: "ночной", peach: "персиковый", coral: "коралловый", lime: "лаймовый", teal: "бирюзовый", indigo: "индиго", berry: "ягодный", sunset: "закатный", arctic: "ледяной", sky: "небесный", ruby: "рубиновый", neon: "неоновый", smoke: "дымчатый", frost: "морозный", plum: "сливовый" },
	en: { rose: "rose", mint: "mint", blue: "blue", violet: "violet", green: "green", gold: "gold", cobalt: "cobalt", amber: "amber", ocean: "ocean", night: "night", peach: "peach", coral: "coral", lime: "lime", teal: "teal", indigo: "indigo", berry: "berry", sunset: "sunset", arctic: "arctic", sky: "sky", ruby: "ruby", neon: "neon", smoke: "smoky", frost: "frost", plum: "plum" },
	tt: { rose: "алсу", mint: "мәтрүшкә", blue: "зәңгәр", violet: "шәмәхә", green: "яшел", gold: "алтын", cobalt: "кобальт", amber: "кәрәбә", ocean: "океан", night: "төнге", peach: "шәфталу", coral: "коралл", lime: "лайм", teal: "фирүзә", indigo: "индиго", berry: "җиләк", sunset: "кояш баешы", arctic: "салкын", sky: "күк", ruby: "рубин", neon: "неон", smoke: "төтенле", frost: "бозлы", plum: "кара җимеш" },
};

function clamp(text: string, fallbackTail: string): string {
	if (text.length < 20) return `${text} ${fallbackTail}`;
	if (text.length <= 110) return text;
	const cut = text.slice(0, 110);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace === -1 ? cut : cut.slice(0, Math.max(lastSpace, 20))).trimEnd()}.`;
}

function getColorTokens(name: string): string[] {
	return name
		.split("-")
		.filter((part) => !skipTokens.has(part))
		.slice(0, 2);
}

function getTypeLabel(locale: LocaleKey, name: string): string {
	if (name.startsWith("mesh-")) {
		if (locale === "ru") return "Сетчатый градиент";
		if (locale === "tt") return "Сетка градиенты";
		return "Mesh gradient";
	}
	if (name.startsWith("glow-")) {
		if (locale === "ru") return "Светящийся градиент";
		if (locale === "tt") return "Ялтыраган градиент";
		return "Glow gradient";
	}
	if (name.startsWith("linear-")) {
		if (locale === "ru") return "Линейный градиент";
		if (locale === "tt") return "Сызыклы градиент";
		return "Linear gradient";
	}
	if (name.startsWith("radial-")) {
		if (locale === "ru") return "Радиальный градиент";
		if (locale === "tt") return "Радиаль градиент";
		return "Radial gradient";
	}
	if (name.startsWith("conic-")) {
		if (locale === "ru") return "Конический градиент";
		if (locale === "tt") return "Коник градиент";
		return "Conic gradient";
	}
	if (name.startsWith("repeating-")) {
		if (locale === "ru") return "Повторяющийся градиент";
		if (locale === "tt") return "Кабатлана торган градиент";
		return "Repeating gradient";
	}
	if (name.startsWith("multi-stop-")) {
		if (locale === "ru") return "Многоточечный градиент";
		if (locale === "tt") return "Күп нокталы градиент";
		return "Multi-stop gradient";
	}
	if (name.startsWith("transparent-")) {
		if (locale === "ru") return "Полупрозрачный градиент";
		if (locale === "tt") return "Ярым үтәкүренмәле градиент";
		return "Semi-transparent gradient";
	}
	if (name.startsWith("border-")) {
		if (locale === "ru") return "Контурный градиент";
		if (locale === "tt") return "Контур градиенты";
		return "Border gradient";
	}
	if (name.startsWith("noise-")) {
		if (locale === "ru") return "Градиент с зерном";
		if (locale === "tt") return "Бөртекле градиент";
		return "Grainy gradient";
	}
	if (name.startsWith("flag-")) {
		if (locale === "ru") return "Флаговый градиент";
		if (locale === "tt") return "Флаг стилендәге градиент";
		return "Flag-inspired gradient";
	}
	if (name.startsWith("femme-")) {
		if (locale === "ru") return "Мягкий fashion-градиент";
		if (locale === "tt") return "Йомшак fashion-градиент";
		return "Soft fashion gradient";
	}
	if (name.startsWith("masc-")) {
		if (locale === "ru") return "Контрастный industrial-градиент";
		if (locale === "tt") return "Контраст industrial-градиент";
		return "High-contrast industrial gradient";
	}
	if (locale === "ru") return "Градиент";
	if (locale === "tt") return "Градиент";
	return "Gradient";
}

function getPalette(locale: LocaleKey, name: string): string {
	const tokens = getColorTokens(name);
	const dict = colorWords[locale];
	const translated = tokens.map((token) => dict[token]).filter(Boolean);
	if (!translated.length) {
		if (locale === "ru") return "нейтральная палитра";
		if (locale === "tt") return "нейтраль палитра";
		return "neutral palette";
	}
	if (translated.length === 1) return translated[0];
	return `${translated[0]} + ${translated[1]}`;
}

export function getDescription(locale: Locale, name: string, id: number): string {
	const usage = usages[locale][(id * 3 + 1) % usages[locale].length];
	const type = getTypeLabel(locale, name);
	const palette = getPalette(locale, name);

	if (locale === "en") return clamp(`${type} with ${palette} palette, optimized ${usage}.`, "for modern UI");
	if (locale === "tt") return clamp(`${type}: ${palette} палитрасы. ${usage}.`, "заманча стильдә");
	return clamp(`${type} с палитрой ${palette}. Лучше всего работает ${usage}.`, "в современном стиле");
}

export function getLastUpdatedLabel(locale: Locale, lastUpdatedInput: string): string {
	const lastUpdated = new Date(lastUpdatedInput);
	const fmt2 = (n: number) => String(n).padStart(2, "0");

	const ruMonths = ["янв.", "февр.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."];
	const ttMonths = ["гыйн.", "февр.", "март", "апр.", "май", "июнь", "июль", "авг.", "сент.", "окт.", "нояб.", "дек."];

	if (locale === "ru") return `${fmt2(lastUpdated.getDate())} ${ruMonths[lastUpdated.getMonth()]} ${lastUpdated.getFullYear()} - ${fmt2(lastUpdated.getHours())}:${fmt2(lastUpdated.getMinutes())}`;
	if (locale === "tt") return `${fmt2(lastUpdated.getDate())} ${ttMonths[lastUpdated.getMonth()]} ${lastUpdated.getFullYear()} - ${fmt2(lastUpdated.getHours())}:${fmt2(lastUpdated.getMinutes())}`;

	const enParts = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}).formatToParts(lastUpdated);
	const enGet = (type: string) => enParts.find((part) => part.type === type)?.value ?? "";
	return `${enGet("month")} ${enGet("day")}, ${enGet("year")} - ${enGet("hour")}:${enGet("minute")} ${enGet("dayPeriod")}`;
}
