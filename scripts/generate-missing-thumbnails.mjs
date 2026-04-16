import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const CONTENT_DIR = join(ROOT, "src/content/blog");
const OUTPUT_DIR = join(ROOT, "public/images/thumbnails");

const WIDTH = 1200;
const HEIGHT = 630;

const GROUP_STYLES = {
  "game-programming": {
    badge: "GAME PROGRAMMING",
    accent: "#7cff7a",
    accentSoft: "#2ff0d0",
    glow: "#0d4b2f"
  },
  behavioral: {
    badge: "GOF BEHAVIORAL",
    accent: "#ff9a3d",
    accentSoft: "#ffe06b",
    glow: "#4f2b09"
  },
  creational: {
    badge: "GOF CREATIONAL",
    accent: "#ffe46e",
    accentSoft: "#8dff8b",
    glow: "#4d4206"
  },
  structural: {
    badge: "GOF STRUCTURAL",
    accent: "#42d8ff",
    accentSoft: "#64a6ff",
    glow: "#0a3344"
  },
  packages: {
    badge: "UNITY PACKAGE",
    accent: "#65f5bb",
    accentSoft: "#31b8ff",
    glow: "#0b3c35"
  }
};

const MARK_BY_GROUP = {
  "game-programming": drawGameProgrammingMark,
  behavioral: drawBehavioralMark,
  creational: drawCreationalMark,
  structural: drawStructuralMark,
  packages: drawPackageMark
};

main();

function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = walkMarkdownFiles(CONTENT_DIR);
  const groups = collectThumbnailEntries(files);
  for (const entry of groups.values()) {
    const filename = buildOutputFilename(entry.baseSlug);
    const outputPath = join(OUTPUT_DIR, filename);
    const thumbPath = `/images/thumbnails/${filename}`;

    writeFileSync(outputPath, renderThumbnail(entry), "utf8");

    for (const markdownPath of entry.markdownPaths) {
      injectThumbnail(markdownPath, thumbPath);
    }

    process.stdout.write(`${relative(ROOT, outputPath)}\n`);
  }
}

function walkMarkdownFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (stats.isFile() && fullPath.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function collectThumbnailEntries(files) {
  const groups = new Map();

  for (const markdownPath of files) {
    const source = readFileSync(markdownPath, "utf8");
    const frontmatter = extractFrontmatter(source);
    if (!frontmatter) {
      continue;
    }

    const existingThumbnail = frontmatter.thumbnail ?? "";
    const shouldRegenerate = !existingThumbnail || existingThumbnail.startsWith("/images/thumbnails/");
    if (!shouldRegenerate) {
      continue;
    }

    const relPath = relative(CONTENT_DIR, markdownPath).replaceAll("\\", "/");
    const baseSlug = relPath.endsWith(".en.md") ? relPath.slice(0, -6) : relPath.slice(0, -3);
    const current = groups.get(baseSlug) ?? createGroupEntry(baseSlug);

    current.markdownPaths.push(markdownPath);

    if (!current.preferredMarkdownPath || relPath.endsWith(".en.md")) {
      current.preferredMarkdownPath = markdownPath;
      current.frontmatter = frontmatter;
    }

    groups.set(baseSlug, current);
  }

  for (const entry of groups.values()) {
    entry.markdownPaths.sort();
    if (!entry.frontmatter) {
      entry.frontmatter = extractFrontmatter(readFileSync(entry.markdownPaths[0], "utf8"));
    }
  }

  return groups;
}

function createGroupEntry(baseSlug) {
  return {
    baseSlug,
    markdownPaths: [],
    preferredMarkdownPath: null,
    frontmatter: null
  };
}

function extractFrontmatter(source) {
  const section = splitFrontmatter(source);
  if (!section) {
    return null;
  }
  return parseFrontmatter(section.frontmatter);
}

function parseFrontmatter(rawFrontmatter) {
  const data = {};
  for (const line of rawFrontmatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separator = trimmed.indexOf(":");
    if (separator === -1) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    data[key] = stripQuotes(value);
  }
  return data;
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function injectThumbnail(markdownPath, thumbnailPath) {
  const source = readFileSync(markdownPath, "utf8");
  const section = splitFrontmatter(source);
  if (!section) {
    return;
  }
  if (/(^|\n)thumbnail\s*:/.test(section.frontmatter)) {
    return;
  }

  const frontmatter = section.frontmatter.replace(/\s*$/, "");
  const updated = `---\n${frontmatter}\nthumbnail: ${thumbnailPath}\n---\n${section.body}`;
  writeFileSync(markdownPath, updated, "utf8");
}

function splitFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return null;
  }

  return {
    frontmatter: match[1],
    body: source.slice(match[0].length)
  };
}

function buildOutputFilename(baseSlug) {
  return baseSlug
    .replace(/\.md$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() + ".svg";
}

function renderThumbnail(entry) {
  const { baseSlug, frontmatter } = entry;
  const segments = baseSlug.split("/");
  const slug = segments.at(-1) ?? "post";
  const title = normalizeTitle(frontmatter.title || slug);
  const groupKey = detectGroupKey(segments);
  const style = GROUP_STYLES[groupKey];
  const badge = style.badge;
  const accent = style.accent;
  const accentSoft = style.accentSoft;
  const glow = style.glow;
  const titleLines = wrapText(title, 18, 2);
  const acronym = buildAcronym(title);
  const metaCode = buildMetaCode(groupKey, slug);
  const footerCopy = buildFooterCopy(groupKey, slug);
  const mark = MARK_BY_GROUP[groupKey]({ accent, accentSoft, acronym });
  const titleY = titleLines.length === 1 ? 286 : 248;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(`${badge} ${title}`)}</desc>
  <defs>
    <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#05080c" />
      <stop offset="100%" stop-color="#070b11" />
    </linearGradient>
    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${accentSoft}" stop-opacity="0.28" />
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGradient)" />
  <circle cx="934" cy="140" r="180" fill="${glow}" opacity="0.26" />
  <rect x="54" y="54" width="1092" height="522" rx="34" fill="#0b1017" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
  <path d="M90 132 H522" stroke="url(#lineGradient)" stroke-width="3" stroke-linecap="round" />

  <rect x="90" y="86" width="${Math.max(168, badge.length * 10.4)}" height="38" rx="19" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.26" />
  <text x="112" y="111" fill="${accent}" font-size="16" font-family="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" letter-spacing="2.2">${escapeXml(badge)}</text>

  <text x="90" y="${titleY}" fill="#f3f5f7" font-size="74" font-weight="800" font-family="'A2z', 'Pretendard', 'Segoe UI', system-ui, sans-serif" letter-spacing="-2.1">
    ${titleLines.map((line, index) => `<tspan x="90" dy="${index === 0 ? 0 : 84}">${escapeXml(line)}</tspan>`).join("")}
  </text>

  <text x="92" y="470" fill="#aeb8c2" font-size="22" font-weight="500" font-family="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" letter-spacing="1.2">${escapeXml(metaCode)}</text>
  <text x="92" y="516" fill="${accentSoft}" font-size="20" font-family="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" letter-spacing="2">${escapeXml(footerCopy)}</text>

  <g transform="translate(784 133)">
    <rect x="0" y="0" width="270" height="270" rx="32" fill="rgba(255,255,255,0.02)" stroke="${accent}" stroke-opacity="0.24" stroke-width="2" />
    <circle cx="135" cy="135" r="92" fill="none" stroke="${accent}" stroke-opacity="0.18" stroke-width="2" />
    ${mark}
    <text x="135" y="232" fill="${accent}" fill-opacity="0.22" text-anchor="middle" font-size="32" font-weight="800" font-family="'SFMono-Regular', Consolas, 'Liberation Mono', monospace" letter-spacing="5">${escapeXml(acronym)}</text>
  </g>
</svg>`;
}

function detectGroupKey(segments) {
  if (segments[0] === "Packages") {
    return "packages";
  }
  if (segments[0] !== "DesignPattern") {
    return "packages";
  }
  if (segments[1] === "game-programming") {
    return "game-programming";
  }
  if (segments[1] === "go-f") {
    return segments[2] ?? "behavioral";
  }
  return "behavioral";
}

function normalizeTitle(title) {
  return title
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanDescription(description) {
  return description
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^-+\s*/g, "")
    .trim();
}

function wrapText(text, lineWidth, maxLines) {
  if (!text) {
    return [];
  }

  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  let truncated = false;

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= lineWidth || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
    if (lines.length === maxLines - 1) {
      truncated = true;
      break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (truncated || words.join(" ").length > lines.join(" ").length) {
    const lastIndex = lines.length - 1;
    if (lastIndex >= 0) {
      lines[lastIndex] = truncateLine(lines[lastIndex], lineWidth - 1);
    }
  }

  return lines.slice(0, maxLines);
}

function truncateLine(line, maxLength) {
  if (line.length <= maxLength) {
    return line;
  }
  return `${line.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function buildAcronym(title) {
  const parts = title
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 3).toUpperCase();
  }

  return parts
    .slice(0, 4)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function buildMetaCode(groupKey, slug) {
  const normalizedSlug = slug.replace(/-/g, "_");
  if (groupKey === "packages") {
    return `package:${normalizedSlug}`;
  }
  return `pattern:${normalizedSlug}`;
}

function buildFooterCopy(groupKey, slug) {
  if (groupKey === "packages") {
    return `somblog://unity/${slug}`;
  }
  return `somblog://design-pattern/${slug}`;
}

function drawGameProgrammingMark({ accent, accentSoft }) {
  return `
    <circle cx="135" cy="120" r="54" fill="none" stroke="${accent}" stroke-width="10" stroke-opacity="0.78" stroke-dasharray="220 28" stroke-linecap="round" />
    <path d="M178 76 L203 82 L191 104" fill="none" stroke="${accentSoft}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="135" cy="120" r="14" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="4" />
  `;
}

function drawBehavioralMark({ accent, accentSoft }) {
  return `
    <circle cx="96" cy="94" r="16" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="4" />
    <circle cx="170" cy="120" r="16" fill="${accentSoft}" fill-opacity="0.14" stroke="${accentSoft}" stroke-width="4" />
    <circle cx="114" cy="188" r="16" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="4" />
    <path d="M111 100 L154 114" stroke="${accent}" stroke-width="6" stroke-linecap="round" />
    <path d="M161 135 L123 173" stroke="${accentSoft}" stroke-width="6" stroke-linecap="round" />
  `;
}

function drawCreationalMark({ accent, accentSoft }) {
  return `
    <rect x="88" y="88" width="54" height="54" rx="12" fill="none" stroke="${accent}" stroke-width="8" />
    <rect x="128" y="128" width="54" height="54" rx="12" fill="none" stroke="${accentSoft}" stroke-width="8" />
    <rect x="168" y="88" width="54" height="54" rx="12" fill="none" stroke="${accent}" stroke-width="8" />
  `;
}

function drawStructuralMark({ accent, accentSoft }) {
  return `
    <rect x="78" y="92" width="78" height="54" rx="14" fill="none" stroke="${accent}" stroke-width="8" />
    <rect x="152" y="124" width="78" height="54" rx="14" fill="none" stroke="${accentSoft}" stroke-width="8" />
    <rect x="96" y="180" width="78" height="54" rx="14" fill="none" stroke="${accent}" stroke-width="8" />
  `;
}

function drawPackageMark({ accent, accentSoft }) {
  return `
    <path d="M135 78 L195 112 L195 182 L135 216 L75 182 L75 112 Z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round" />
    <path d="M75 112 L135 146 L195 112" fill="none" stroke="${accentSoft}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M135 146 V216" fill="none" stroke="${accentSoft}" stroke-width="8" stroke-linecap="round" />
  `;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
