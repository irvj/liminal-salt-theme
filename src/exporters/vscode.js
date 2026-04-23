import { writeFileSync, mkdirSync, rmSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import theme from "../theme.js";

const ASSETS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../assets");

const EXTENSION_MANIFEST = {
	name: "liminal-salt",
	displayName: "Liminal Salt",
	description:
		"An earthy, accessible color theme — beige, sage, and stone tones. Dark and light variants, WCAG 2.1 AA throughout.",
	version: "1.0.0",
	publisher: "",
	license: "MIT",
	engines: { vscode: "^1.80.0" },
	categories: ["Themes"],
	keywords: [
		"theme",
		"color-theme",
		"dark",
		"light",
		"earthy",
		"neutral",
		"sage",
		"beige",
		"accessible",
		"wcag",
	],
	icon: "icon.png",
	galleryBanner: { color: "#1a1c1b", theme: "dark" },
	repository: {
		type: "git",
		url: "https://github.com/irvj/liminal-salt-theme.git",
	},
	contributes: {
		themes: [
			{
				label: "Liminal Salt Dark",
				uiTheme: "vs-dark",
				path: "./themes/liminal-salt-dark-color-theme.json",
			},
			{
				label: "Liminal Salt Light",
				uiTheme: "vs",
				path: "./themes/liminal-salt-light-color-theme.json",
			},
		],
	},
};

const README = `# Liminal Salt

An earthy, accessible color theme for VS Code — beige, sage, and stone tones grounded in natural materials. Dark and light variants, WCAG 2.1 AA throughout.

## Install

Search **Liminal Salt** in the Extensions view, then pick a variant from **Preferences: Color Theme**:

- Liminal Salt Dark
- Liminal Salt Light

## Palette & source

Full palette tables, contrast ratios, and themes for other editors and terminals (Zed, Neovim, JetBrains, Alacritty, Ghostty, iTerm2, WezTerm, tmux) live in the [source repository](https://github.com/irvj/liminal-salt-theme).

## License

MIT
`;

const CHANGELOG = `# Changelog

## 1.0.0

- Initial release: Liminal Salt Dark and Liminal Salt Light.
`;

const LICENSE = `MIT License

Copyright (c) Joseph Irvin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

const VSCODEIGNORE = `.vscode/**
.vscode-test/**
**/*.map
**/.DS_Store
`;

function buildColorTheme(mode) {
	const isDark = mode === "dark";
	const u = theme.ui[mode];
	const s = theme.syntax[mode];
	const e = theme.editor[mode];
	const a = theme.ansi[mode];

	return {
		name: `Liminal Salt ${isDark ? "Dark" : "Light"}`,
		type: isDark ? "dark" : "light",
		colors: {
			"editor.background": u.background,
			"editor.foreground": u.foreground,
			"editorCursor.foreground": e.cursor,
			"editor.selectionBackground": e.selection,
			"editor.lineHighlightBackground": e.lineHighlight,
			"editor.findMatchBackground": e.findMatch,
			"editor.findMatchHighlightBackground": e.findMatch + "88",
			"editorLineNumber.foreground": e.gutterForeground,
			"editorLineNumber.activeForeground": e.gutterActiveForeground,
			"editorBracketMatch.background": e.bracketMatch + "44",
			"editorBracketMatch.border": e.bracketMatch,
			"editorIndentGuide.background": e.indentGuide,
			"editorIndentGuide.activeBackground": e.gutterForeground,
			"editorWhitespace.foreground": e.whitespace,
			"diffEditor.insertedTextBackground": e.diffInsertedBackground + "88",
			"diffEditor.removedTextBackground": e.diffDeletedBackground + "88",

			"sideBar.background": u.muted,
			"sideBar.foreground": u.foreground,
			"sideBar.border": u.border,
			"sideBarTitle.foreground": u.foreground,
			"sideBarSectionHeader.background": u.muted,
			"sideBarSectionHeader.foreground": u.foreground,
			"activityBar.background": u.muted,
			"activityBar.foreground": u.foreground,
			"activityBar.border": u.border,
			"activityBarBadge.background": u.accent,
			"activityBarBadge.foreground": u.accentForeground,

			"titleBar.activeBackground": u.card,
			"titleBar.activeForeground": u.foreground,
			"titleBar.inactiveBackground": u.card,
			"titleBar.inactiveForeground": u.mutedForeground,
			"titleBar.border": u.border,

			"statusBar.background": u.card,
			"statusBar.foreground": u.foreground,
			"statusBar.border": u.border,
			"statusBar.debuggingBackground": u.warning,
			"statusBar.debuggingForeground": u.warningForeground,
			"statusBar.noFolderBackground": u.muted,

			"tab.activeBackground": u.background,
			"tab.activeForeground": u.foreground,
			"tab.inactiveBackground": u.card,
			"tab.inactiveForeground": u.mutedForeground,
			"tab.border": u.border,
			"editorGroupHeader.tabsBackground": u.card,
			"editorGroupHeader.tabsBorder": u.border,

			"list.activeSelectionBackground": u.accent + "33",
			"list.activeSelectionForeground": u.foreground,
			"list.hoverBackground": u.border + "88",
			"list.focusBackground": u.accent + "22",
			"list.inactiveSelectionBackground": u.muted,

			"input.background": u.muted,
			"input.foreground": u.foreground,
			"input.border": u.border,
			"input.placeholderForeground": u.mutedForeground,
			"dropdown.background": u.card,
			"dropdown.border": u.border,
			"dropdown.foreground": u.foreground,

			"button.background": u.accent,
			"button.foreground": u.accentForeground,
			"button.hoverBackground": u.accentHover,

			"scrollbarSlider.background": u.border + "88",
			"scrollbarSlider.hoverBackground": u.border + "cc",
			"scrollbarSlider.activeBackground": u.border,

			"badge.background": u.accent,
			"badge.foreground": u.accentForeground,

			"notifications.background": u.card,
			"notifications.foreground": u.foreground,
			"notifications.border": u.border,

			"panel.background": u.muted,
			"panel.foreground": u.foreground,
			"panel.border": u.border,
			"panelTitle.activeBorder": u.accent,
			"panelTitle.activeForeground": u.foreground,
			"panelTitle.inactiveForeground": u.mutedForeground,

			"terminal.background": u.background,
			"terminal.foreground": u.foreground,
			"terminal.ansiBlack": a.black,
			"terminal.ansiRed": a.red,
			"terminal.ansiGreen": a.green,
			"terminal.ansiYellow": a.yellow,
			"terminal.ansiBlue": a.blue,
			"terminal.ansiMagenta": a.magenta,
			"terminal.ansiCyan": a.cyan,
			"terminal.ansiWhite": a.white,
			"terminal.ansiBrightBlack": a.brightBlack,
			"terminal.ansiBrightRed": a.brightRed,
			"terminal.ansiBrightGreen": a.brightGreen,
			"terminal.ansiBrightYellow": a.brightYellow,
			"terminal.ansiBrightBlue": a.brightBlue,
			"terminal.ansiBrightMagenta": a.brightMagenta,
			"terminal.ansiBrightCyan": a.brightCyan,
			"terminal.ansiBrightWhite": a.brightWhite,

			"peekView.border": u.accent,
			"peekViewEditor.background": u.muted,
			"peekViewResult.background": u.card,
			"peekViewTitle.background": u.card,

			"gitDecoration.modifiedResourceForeground": s.string,
			"gitDecoration.deletedResourceForeground": s.deleted,
			"gitDecoration.untrackedResourceForeground": s.inserted,
			"gitDecoration.conflictingResourceForeground": s.escape,

			"breadcrumb.foreground": u.mutedForeground,
			"breadcrumb.focusForeground": u.foreground,
			"breadcrumb.activeSelectionForeground": u.foreground,

			"editorWidget.background": u.card,
			"editorWidget.foreground": u.foreground,
			"editorWidget.border": u.border,

			focusBorder: u.ring,

			"editor.selectionHighlightBackground": e.selection + "88",
			"editor.wordHighlightBackground": e.selection + "66",
			"editor.wordHighlightStrongBackground": e.selection + "99",

			"minimap.selectionHighlight": e.selection,
			"minimap.findMatchHighlight": e.findMatch,

			"editorError.foreground": u.destructive,
			"editorWarning.foreground": u.warning,
			"editorInfo.foreground": u.accent,

			"editorOverviewRuler.errorForeground": u.destructive,
			"editorOverviewRuler.warningForeground": u.warning,
			"editorOverviewRuler.infoForeground": u.accent,
		},
		tokenColors: [
			{
				name: "Comment",
				scope: ["comment", "punctuation.definition.comment"],
				settings: { foreground: s.comment, fontStyle: "italic" },
			},
			{
				name: "Keyword",
				scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"],
				settings: { foreground: s.keyword },
			},
			{
				name: "Function",
				scope: ["entity.name.function", "support.function", "meta.function-call"],
				settings: { foreground: s.function },
			},
			{
				name: "String",
				scope: ["string", "string.quoted"],
				settings: { foreground: s.string },
			},
			{
				name: "Number",
				scope: ["constant.numeric"],
				settings: { foreground: s.number },
			},
			{
				name: "Type",
				scope: [
					"entity.name.type",
					"support.type",
					"entity.name.class",
					"support.class",
				],
				settings: { foreground: s.type },
			},
			{
				name: "Variable",
				scope: ["variable", "variable.other"],
				settings: { foreground: s.variable },
			},
			{
				name: "Constant",
				scope: ["constant", "constant.language", "variable.other.constant"],
				settings: { foreground: s.constant },
			},
			{
				name: "Operator",
				scope: ["keyword.operator"],
				settings: { foreground: s.operator },
			},
			{
				name: "Punctuation",
				scope: ["punctuation", "meta.brace", "punctuation.definition.tag"],
				settings: { foreground: s.punctuation },
			},
			{
				name: "Tag",
				scope: ["entity.name.tag", "support.tag"],
				settings: { foreground: s.tag },
			},
			{
				name: "Attribute",
				scope: ["entity.other.attribute-name"],
				settings: { foreground: s.attribute },
			},
			{
				name: "Regex",
				scope: ["string.regexp"],
				settings: { foreground: s.regex },
			},
			{
				name: "Escape",
				scope: ["constant.character.escape"],
				settings: { foreground: s.escape },
			},
			{
				name: "Inserted",
				scope: ["markup.inserted"],
				settings: { foreground: s.inserted },
			},
			{
				name: "Deleted",
				scope: ["markup.deleted"],
				settings: { foreground: s.deleted },
			},
			{
				name: "Markup Heading",
				scope: ["markup.heading", "entity.name.section"],
				settings: { foreground: s.keyword, fontStyle: "bold" },
			},
			{
				name: "Markup Bold",
				scope: ["markup.bold"],
				settings: { fontStyle: "bold" },
			},
			{
				name: "Markup Italic",
				scope: ["markup.italic"],
				settings: { fontStyle: "italic" },
			},
			{
				name: "Markup Link",
				scope: ["markup.underline.link", "string.other.link"],
				settings: { foreground: s.type },
			},
		],
	};
}

export default function exportVSCode(outDir) {
	const dir = `${outDir}/vscode`;
	rmSync(dir, { recursive: true, force: true });
	mkdirSync(`${dir}/themes`, { recursive: true });

	for (const mode of ["dark", "light"]) {
		const data = buildColorTheme(mode);
		const filename = `themes/liminal-salt-${mode}-color-theme.json`;
		writeFileSync(`${dir}/${filename}`, JSON.stringify(data, null, "\t") + "\n");
		console.log(`  ✓ ${dir}/${filename}`);
	}

	writeFileSync(
		`${dir}/package.json`,
		JSON.stringify(EXTENSION_MANIFEST, null, "\t") + "\n",
	);
	console.log(`  ✓ ${dir}/package.json`);

	writeFileSync(`${dir}/README.md`, README);
	writeFileSync(`${dir}/CHANGELOG.md`, CHANGELOG);
	writeFileSync(`${dir}/LICENSE`, LICENSE);
	writeFileSync(`${dir}/.vscodeignore`, VSCODEIGNORE);

	copyFileSync(`${ASSETS_DIR}/icon.png`, `${dir}/icon.png`);
	console.log(`  ✓ ${dir}/icon.png`);

	if (!EXTENSION_MANIFEST.publisher) {
		console.warn(
			`  ! publisher ID is empty in ${dir}/package.json — set it before running 'vsce publish'`,
		);
	}
}
