import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SCREENSHOTS_DIR = path.join(ROOT, "screenshots");
const TOKENS_DIR = path.join(ROOT, "tokens");
const CONTENT_DIR = path.join(ROOT, "content");

const BASE_URL = "https://beckfordmoves.com";
const VIEWPORT = { width: 1440, height: 900 };

const PAGE_PLAN = [
  { urlPath: "/", slug: "home" },
  { urlPath: "/about", slug: "about" },
  { urlPath: "/work", slug: "work" },
  { urlPath: "/contact", slug: "contact" },
];

function stripQuotes(v) {
  return String(v || "").trim().replace(/^['"]|['"]$/g, "");
}

function csvEscape(v) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function sanitizeKey(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60) || "item";
}

function classifyOrigin(src, pageUrl) {
  try {
    const base = new URL(pageUrl);
    const parsed = new URL(src, pageUrl);
    const href = parsed.href.toLowerCase();
    if (
      src.startsWith("/") ||
      parsed.origin === base.origin ||
      href.includes("beckfordmoves.com")
    ) {
      return "local";
    }
    if (href.includes("supabase") || href.includes("storage/v1")) {
      return "supabase";
    }
    return "external";
  } catch {
    return "external";
  }
}

async function ensureDirs() {
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });
  await fs.mkdir(TOKENS_DIR, { recursive: true });
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

async function extractPageData(page, pageLabel, pageUrl) {
  return page.evaluate(({ pageLabel, pageUrl }) => {
    const textTags = new Set(["H1", "H2", "H3", "H4", "P", "A", "LI", "BUTTON", "SPAN"]);
    const colorMap = new Map();
    const fontFamilies = new Set();
    const fontSizes = new Set();
    const radii = new Set();
    const items = [];
    const images = [];
    const keyCounts = {};
    const doc = document.documentElement;
    const pageHeight = Math.max(
      doc?.scrollHeight || 0,
      document.body?.scrollHeight || 0,
      window.innerHeight || 0
    );

    const localStripQuotes = (v) => String(v || "").trim().replace(/^['"]|['"]$/g, "");
    const localSanitizeKey = (input) =>
      String(input || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .slice(0, 60) || "item";

    const normalizeColor = (raw) => {
      const value = (raw || "").trim();
      if (!value || value === "transparent" || value === "initial" || value === "inherit") {
        return null;
      }
      const tmp = document.createElement("span");
      tmp.style.color = value;
      document.body.appendChild(tmp);
      const resolved = getComputedStyle(tmp).color;
      tmp.remove();
      const match = resolved.match(/^rgba?\(([^)]+)\)$/i);
      if (!match) {
        return null;
      }
      const parts = match[1]
        .split(",")
        .map((p) => p.trim())
        .map(Number);
      if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) {
        return null;
      }
      const r = Math.max(0, Math.min(255, Math.round(parts[0])));
      const g = Math.max(0, Math.min(255, Math.round(parts[1])));
      const b = Math.max(0, Math.min(255, Math.round(parts[2])));
      const a = parts.length > 3 && Number.isFinite(parts[3]) ? parts[3] : 1;
      const rgba = `rgba(${r}, ${g}, ${b}, ${Math.round(a * 1000) / 1000})`;
      const hex = a === 1
        ? `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase()}`
        : null;
      return { rgba, hex };
    };

    const positionHint = (y) => {
      const ratio = pageHeight > 0 ? y / pageHeight : 0;
      if (ratio < 0.33) return "top";
      if (ratio < 0.66) return "middle";
      return "bottom";
    };

    const addColor = (raw, property) => {
      const normalized = normalizeColor(raw);
      if (!normalized) return;
      if (!colorMap.has(normalized.rgba)) {
        colorMap.set(normalized.rgba, {
          rgba: normalized.rgba,
          hex: normalized.hex,
          properties: new Set([property]),
        });
      } else {
        colorMap.get(normalized.rgba).properties.add(property);
      }
    };

    const elements = Array.from(document.querySelectorAll("*"));
    for (const el of elements) {
      const style = getComputedStyle(el);
      addColor(style.color, "color");
      addColor(style.backgroundColor, "background-color");
      addColor(style.borderColor, "border-color");

      const ff = localStripQuotes(style.fontFamily).toLowerCase();
      if (ff && ff !== "inherit") {
        fontFamilies.add(style.fontFamily.trim());
      }
      const fs = (style.fontSize || "").trim();
      if (fs.endsWith("px")) fontSizes.add(fs);
      const br = (style.borderRadius || "").trim();
      if (br && br !== "0px" && br !== "0px 0px 0px 0px") radii.add(br);
    }

    let textIndex = 0;
    for (const el of elements) {
      const tag = el.tagName;
      if (!textTags.has(tag)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
        continue;
      }
      const text = (el.innerText || "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      textIndex += 1;
      const base = localSanitizeKey(
        `${tag.toLowerCase()}_${text.split(" ").slice(0, 6).join("_")}` || `text_${textIndex}`
      );
      keyCounts[base] = (keyCounts[base] || 0) + 1;
      const cms_key = `${pageLabel}_${base}_${keyCounts[base]}`;
      items.push({
        type: "text",
        value: text,
        tag: tag.toLowerCase(),
        classes: (el.className || "").toString().trim(),
        position_hint: positionHint(el.getBoundingClientRect().top + window.scrollY),
        cms_key,
      });
    }

    let imageIndex = 0;
    const seenImageValues = new Set();
    const addImageItem = (srcValue, tag, classes, yPos, suggestedName) => {
      const value = String(srcValue || "").trim();
      if (!value || seenImageValues.has(`${tag}|${value}`)) return;
      seenImageValues.add(`${tag}|${value}`);
      imageIndex += 1;
      const base = localSanitizeKey(suggestedName || `${tag}_image_${imageIndex}`);
      keyCounts[base] = (keyCounts[base] || 0) + 1;
      const cms_key = `${pageLabel}_${base}_${keyCounts[base]}`;
      items.push({
        type: "image",
        value,
        tag,
        classes,
        position_hint: positionHint(yPos),
        cms_key,
      });
      images.push({
        src: value,
        page: pageUrl,
      });
    };

    const imgElements = Array.from(document.querySelectorAll("img"));
    for (const img of imgElements) {
      const rect = img.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      const style = getComputedStyle(img);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
        continue;
      }
      const src = img.currentSrc || img.src || img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "image";
      addImageItem(
        src,
        "img",
        (img.className || "").toString().trim(),
        rect.top + window.scrollY,
        `img_${alt}`
      );
    }

    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      const style = getComputedStyle(el);
      const bg = style.backgroundImage || "";
      if (!bg || bg === "none") continue;
      const urls = Array.from(bg.matchAll(/url\((['"]?)(.*?)\1\)/g)).map((m) => m[2]).filter(Boolean);
      for (const u of urls) {
        addImageItem(
          u,
          el.tagName.toLowerCase(),
          (el.className || "").toString().trim(),
          rect.top + window.scrollY,
          `${el.tagName.toLowerCase()}_background_image`
        );
      }
    }

    const resolveUrl = (href) => {
      try {
        return new URL(href, pageUrl).href;
      } catch {
        return String(href || "").trim();
      }
    };

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && ogImage.getAttribute("content")) {
      addImageItem(
        resolveUrl(ogImage.getAttribute("content")),
        "meta",
        'property="og:image"',
        0,
        "meta_og_image"
      );
    }
    const twImage = document.querySelector('meta[name="twitter:image"]');
    if (twImage && twImage.getAttribute("content")) {
      addImageItem(
        resolveUrl(twImage.getAttribute("content")),
        "meta",
        'name="twitter:image"',
        0,
        "meta_twitter_image"
      );
    }
    const iconLinks = Array.from(document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]'));
    for (const link of iconLinks) {
      const href = link.getAttribute("href");
      if (!href) continue;
      const rel = (link.getAttribute("rel") || "icon").trim().replace(/\s+/g, "_");
      addImageItem(resolveUrl(href), "link", `rel="${rel}"`, 0, `link_${rel}`);
    }

    const bodyStyle = getComputedStyle(document.body);
    const htmlStyle = getComputedStyle(document.documentElement);
    const primaryBackground = normalizeColor(bodyStyle.backgroundColor) || normalizeColor(htmlStyle.backgroundColor);
    const primaryText = normalizeColor(bodyStyle.color) || normalizeColor(htmlStyle.color);

    return {
      tokens: {
        colors: Array.from(colorMap.values()).map((v) => ({
          rgba: v.rgba,
          hex: v.hex,
          properties: Array.from(v.properties),
        })),
        fontFamilies: Array.from(fontFamilies),
        fontSizes: Array.from(fontSizes),
        borderRadius: Array.from(radii),
        primaryBackground,
        primaryText,
      },
      items,
      images,
    };
  }, { pageLabel, pageUrl });
}

function mergeTokenSets(globalTokens, pageTokens) {
  for (const c of pageTokens.colors) {
    if (!globalTokens.colorMap.has(c.rgba)) {
      globalTokens.colorMap.set(c.rgba, {
        rgba: c.rgba,
        hex: c.hex || null,
        properties: new Set(c.properties || []),
      });
    } else {
      const current = globalTokens.colorMap.get(c.rgba);
      for (const p of c.properties || []) current.properties.add(p);
    }
  }
  for (const ff of pageTokens.fontFamilies || []) globalTokens.fontFamilies.add(ff);
  for (const fs of pageTokens.fontSizes || []) globalTokens.fontSizes.add(fs);
  for (const br of pageTokens.borderRadius || []) globalTokens.borderRadius.add(br);
  if (!globalTokens.primaryBackground && pageTokens.primaryBackground) {
    globalTokens.primaryBackground = pageTokens.primaryBackground;
  }
  if (!globalTokens.primaryText && pageTokens.primaryText) {
    globalTokens.primaryText = pageTokens.primaryText;
  }
}

async function main() {
  await ensureDirs();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const globalTokens = {
    colorMap: new Map(),
    fontFamilies: new Set(),
    fontSizes: new Set(),
    borderRadius: new Set(),
    primaryBackground: null,
    primaryText: null,
  };

  const contentMapFiles = [];
  const csvRows = [];
  const imageInventory = [];

  // Discover first valid work detail URL from /work page links.
  const workUrl = `${BASE_URL}/work`;
  await page.goto(workUrl, { waitUntil: "domcontentloaded" });
  const workDetailCandidates = await page.evaluate((baseUrl) => {
    const links = Array.from(document.querySelectorAll("a[href]"));
    const base = new URL(baseUrl);
    const matches = [];
    for (const link of links) {
      const raw = link.getAttribute("href");
      if (!raw) continue;
      try {
        const absolute = new URL(raw, baseUrl);
        if (absolute.origin !== base.origin) continue;
        const p = absolute.pathname.replace(/\/+$/, "");
        if (p.startsWith("/work/") && p !== "/work") {
          matches.push(absolute.href);
        }
      } catch {
        // Skip invalid URLs.
      }
    }
    return Array.from(new Set(matches));
  }, BASE_URL);

  let discoveredWorkDetail = null;
  for (const candidate of workDetailCandidates) {
    try {
      const probe = await context.request.get(candidate);
      if (probe.status() >= 200 && probe.status() < 400) {
        discoveredWorkDetail = candidate;
        break;
      }
    } catch {
      // Try next candidate.
    }
  }
  if (!discoveredWorkDetail && workDetailCandidates.length > 0) {
    discoveredWorkDetail = workDetailCandidates[0];
  }
  if (!discoveredWorkDetail) {
    const notionFallback = `${BASE_URL}/work/notion`;
    try {
      const probe = await context.request.get(notionFallback);
      if (probe.status() >= 200 && probe.status() < 400) {
        discoveredWorkDetail = notionFallback;
      }
    } catch {
      // Leave null if fallback is unavailable.
    }
  }

  const pagesToProcess = [...PAGE_PLAN];
  if (discoveredWorkDetail) {
    pagesToProcess.splice(3, 0, { urlPath: new URL(discoveredWorkDetail).pathname, slug: "work-detail" });
  }

  // Check if /blog exists (status 200).
  const blogResponse = await page.goto(`${BASE_URL}/blog`, { waitUntil: "domcontentloaded" });
  const blogExists = blogResponse && blogResponse.status() === 200;
  if (blogExists) {
    pagesToProcess.splice(pagesToProcess.length - 1, 0, { urlPath: "/blog", slug: "blog" });
  }

  for (const plan of pagesToProcess) {
    const url = `${BASE_URL}${plan.urlPath === "/" ? "" : plan.urlPath}`;
    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (!response || (response.status() >= 400 && plan.slug !== "work-detail")) {
      continue;
    }

    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const max = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0,
        window.innerHeight || 0
      );
      const step = Math.max(300, Math.floor((window.innerHeight || 900) * 0.85));
      for (let y = 0; y < max; y += step) {
        window.scrollTo(0, y);
        await sleep(120);
      }
      window.scrollTo(0, 0);
      await sleep(200);
    });

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${plan.slug}.png`),
      fullPage: true,
    });

    const extracted = await extractPageData(page, plan.slug.replace(/-/g, "_"), url);
    mergeTokenSets(globalTokens, extracted.tokens);

    const contentFile = path.join(CONTENT_DIR, `${plan.slug}-content-map.json`);
    await fs.writeFile(contentFile, JSON.stringify(extracted.items, null, 2), "utf8");
    contentMapFiles.push(contentFile);

    for (const item of extracted.items) {
      csvRows.push({
        key: item.cms_key,
        value_text: item.type === "text" ? item.value : "",
        value_image: item.type === "image" ? item.value : "",
        page: plan.slug,
      });
    }

    for (const img of extracted.images) {
      const origin = classifyOrigin(img.src, img.page);
      imageInventory.push({
        src: img.src,
        page: plan.slug,
        origin,
        notes: origin === "supabase" ? "Likely Supabase storage asset" : "",
      });
    }
  }

  const tokensOutput = {
    colors: Array.from(globalTokens.colorMap.values())
      .map((v) => ({
        rgba: v.rgba,
        hex: v.hex,
        properties: Array.from(v.properties),
      }))
      .sort((a, b) => a.rgba.localeCompare(b.rgba)),
    font_families: Array.from(globalTokens.fontFamilies).sort(),
    font_sizes_px: Array.from(globalTokens.fontSizes).sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b)),
    border_radius_px: Array.from(globalTokens.borderRadius).sort(),
    primary_background_color: globalTokens.primaryBackground,
    primary_text_color: globalTokens.primaryText,
  };

  await fs.writeFile(path.join(TOKENS_DIR, "tokens.json"), JSON.stringify(tokensOutput, null, 2), "utf8");
  await fs.writeFile(path.join(CONTENT_DIR, "image-inventory.json"), JSON.stringify(imageInventory, null, 2), "utf8");

  const csvHeader = "key,value_text,value_image,page";
  const csvBody = csvRows
    .map((r) => [r.key, r.value_text, r.value_image, r.page].map(csvEscape).join(","))
    .join("\n");
  await fs.writeFile(path.join(CONTENT_DIR, "framer-cms-import.csv"), `${csvHeader}\n${csvBody}\n`, "utf8");

  const readme = `# Framer Migration Handoff

## Step 1: Import into Framer
- Create a new Framer project named \`Beckford Moves\`.
- Rebuild page structure using screenshots in \`framer-export/screenshots/\`.
- Use content maps in \`framer-export/content/*-content-map.json\` to recreate editable text/image layers.

## Step 2: Set Up CMS in Framer
- Create a CMS collection named **Site Content**.
- Add fields:
  - \`key\` (Text)
  - \`value_text\` (Text)
  - \`value_image\` (Image)
  - \`page\` (Text)
- Import CSV from \`framer-export/content/framer-cms-import.csv\`.

## Step 3: Bind Layers by cms_key
- Name each Framer layer to match the \`cms_key\` values from the content map files.
- Text layers bind to \`value_text\`.
- Image layers bind to \`value_image\`.
- Use the \`page\` field for filtering by page section.

## Step 4: Design Fidelity
- Recreate spacing, typography, and colors using \`framer-export/tokens/tokens.json\`.
- Use \`framer-export/content/image-inventory.json\` to source all existing images by origin.

## Step 5: Domain Cutover
- Keep production DNS on current host while Framer rebuild is reviewed.
- Perform domain cutover only after client approval of Framer version.
`;
  await fs.writeFile(path.join(ROOT, "README_FRAMER.md"), readme, "utf8");

  await browser.close();

  const result = {
    discoveredWorkDetail: discoveredWorkDetail || null,
    blogIncluded: blogExists,
    screenshotsDir: SCREENSHOTS_DIR,
    tokensFile: path.join(TOKENS_DIR, "tokens.json"),
    contentFiles: contentMapFiles.map((f) => path.relative(ROOT, f)),
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
