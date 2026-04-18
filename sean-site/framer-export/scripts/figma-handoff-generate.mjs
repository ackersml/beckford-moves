#!/usr/bin/env node
/**
 * Generates use_figma JS snippets for Beckford Moves handoff.
 * Usage: node figma-handoff-generate.mjs <step>
 * Steps: setup | ref-<pageId> | content-<pageId>
 * pageId: home | about | work | detail | contact | blog
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentDir = path.join(root, "content");
const shotDir = path.join(root, "screenshots");

const PAGE_MAP = [
  { id: "home", file: "home-content-map.json", figmaPage: "Home", shot: "home-ref.jpg" },
  { id: "about", file: "about-content-map.json", figmaPage: "About", shot: "about-ref.jpg" },
  { id: "work", file: "work-content-map.json", figmaPage: "Work", shot: "work-ref.jpg" },
  { id: "detail", file: "work-detail-content-map.json", figmaPage: "Detail", shot: "work-detail-ref.jpg" },
  { id: "contact", file: "contact-content-map.json", figmaPage: "Contact", shot: "contact-ref.jpg" },
  { id: "blog", file: "blog-content-map.json", figmaPage: "Blog", shot: "blog-ref.jpg" },
];

function hexToRgb01(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function sizeFromBlock(b) {
  const c = b.classes || "";
  const tag = b.tag || "";
  if (c.includes("text-4xl") || tag === "h1") return 36;
  if (c.includes("text-3xl") || tag === "h2") return 30;
  if (c.includes("text-2xl")) return 24;
  if (c.includes("text-xl") || tag === "h3") return 20;
  if (c.includes("text-lg")) return 18;
  if (c.includes("text-sm")) return 14;
  if (tag === "h3") return 20;
  if (tag === "h2") return 30;
  if (tag === "h1") return 36;
  return 16;
}

function weightFromBlock(b) {
  const c = b.classes || "";
  if (c.includes("font-bold") || /(^|\s)h[1-2](\s|$)/.test(b.tag)) return "Bold";
  if (c.includes("font-semibold") || b.tag === "h3") return "Semi Bold";
  if (c.includes("font-medium")) return "Medium";
  return "Regular";
}

function escapeJsString(s) {
  return JSON.stringify(s ?? "");
}

function buildContentScript(blocks, pageName) {
  const lines = [];
  lines.push(`const handoff = figma.root.children.find((p) => p.name === "Handoff");`);
  lines.push(`if (!handoff) throw new Error("Missing Handoff page");`);
  lines.push(`await figma.setCurrentPageAsync(handoff);`);
  lines.push(`const art = handoff.children.find((n) => n.type === "FRAME" && n.name === ${escapeJsString(pageName)});`);
  lines.push(`if (!art) throw new Error("Missing art frame");`);
  lines.push(`let content = art.children.find((n) => n.name === "_content");`);
  lines.push(`if (content) content.remove();`);
  lines.push(`content = figma.createFrame();`);
  lines.push(`content.name = "_content";`);
  lines.push(`content.layoutMode = "VERTICAL";`);
  lines.push(`content.primaryAxisSizingMode = "AUTO";`);
  lines.push(`content.counterAxisSizingMode = "FIXED";`);
  lines.push(`content.resize(1344, 100);`);
  lines.push(`content.layoutAlign = "STRETCH";`);
  lines.push(`content.itemSpacing = 8;`);
  lines.push(`content.paddingLeft = 48;`);
  lines.push(`content.paddingRight = 48;`);
  lines.push(`content.paddingTop = 48;`);
  lines.push(`content.paddingBottom = 48;`);
  lines.push(`content.fills = [];`);
  lines.push(`art.appendChild(content);`);
  lines.push(`content.layoutSizingHorizontal = "FILL";`);
  lines.push(`content.layoutSizingVertical = "HUG";`);
  lines.push(`content.x = 0;`);
  lines.push(`content.y = 0;`);
  lines.push(`const fonts = {};`);
  lines.push(`async function ensureFont(style) {`);
  lines.push(`  const key = style.family + "|" + style.style;`);
  lines.push(`  if (fonts[key]) return;`);
  lines.push(`  await figma.loadFontAsync(style);`);
  lines.push(`  fonts[key] = true;`);
  lines.push(`}`);
  lines.push(`const inter = { family: "Inter", style: "Regular" };`);
  lines.push(`const textColor = { r: 250/255, g: 250/255, b: 250/255 };`);
  lines.push(`const muted = { r: 212/255, g: 212/255, b: 216/255 };`);
  lines.push(`const accent = { r: 234/255, g: 88/255, b: 12/255 };`);

  for (const b of blocks) {
    const key = b.cms_key;
    if (b.type === "text") {
      const size = sizeFromBlock(b);
      const w = weightFromBlock(b);
      const styleName = w === "Bold" ? "Bold" : w === "Semi Bold" ? "Semi Bold" : w === "Medium" ? "Medium" : "Regular";
      lines.push(`await ensureFont({ family: "Inter", style: ${escapeJsString(styleName)} });`);
      lines.push(`{`);
      lines.push(`  const t = figma.createText();`);
      lines.push(`  t.name = ${escapeJsString(key)};`);
      lines.push(`  t.fontName = { family: "Inter", style: ${escapeJsString(styleName)} };`);
      lines.push(`  t.fontSize = ${size};`);
      lines.push(`  t.lineHeight = { unit: "AUTO" };`);
      lines.push(`  t.characters = ${escapeJsString(b.value)};`);
      lines.push(`  const useMuted = ${escapeJsString(b.classes || "")}.includes("text-zinc-600");`);
      lines.push(`  t.fills = [{ type: "SOLID", color: useMuted ? muted : textColor }];`);
  lines.push(`  t.textAutoResize = "HEIGHT";`);
  lines.push(`  content.appendChild(t);`);
  lines.push(`  t.layoutAlign = "STRETCH";`);
  lines.push(`}`);
    } else if (b.type === "image") {
      lines.push(`{`);
      lines.push(`  const url = ${escapeJsString(b.value)};`);
      lines.push(`  try {`);
      lines.push(`    const res = await fetch(url);`);
      lines.push(`    const buf = new Uint8Array(await res.arrayBuffer());`);
      lines.push(`    const im = await figma.createImageAsync(buf);`);
      lines.push(`    const rect = figma.createRectangle();`);
      lines.push(`    rect.name = ${escapeJsString(key)};`);
      lines.push(`    const sz = await im.getSizeAsync();`);
      lines.push(`    const w = Math.min(1344, sz.width);`);
      lines.push(`    const h = Math.max(32, Math.round((sz.height / sz.width) * w));`);
      lines.push(`    rect.resize(w, h);`);
      lines.push(`    rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash: im.hash }];`);
      lines.push(`    content.appendChild(rect);`);
      lines.push(`    rect.layoutAlign = "STRETCH";`);
      lines.push(`  } catch (e) {`);
      lines.push(`    await ensureFont(inter);`);
      lines.push(`    const cap = figma.createText();`);
      lines.push(`    cap.name = ${escapeJsString(key)};`);
      lines.push(`    cap.fontName = inter;`);
      lines.push(`    cap.fontSize = 12;`);
      lines.push(`    cap.lineHeight = { unit: "AUTO" };`);
      lines.push(`    cap.characters = "[image failed] " + url;`);
      lines.push(`    cap.fills = [{ type: "SOLID", color: accent }];`);
      lines.push(`    content.appendChild(cap);`);
      lines.push(`    cap.layoutAlign = "STRETCH";`);
      lines.push(`  }`);
      lines.push(`}`);
    }
  }

  lines.push(`const refLayer = art.children.find((n) => n.name === "_reference");`);
  lines.push(`const totalH = Math.max(refLayer ? refLayer.height : 0, content.height);`);
  lines.push(`art.resize(1440, totalH);`);
  lines.push(`return { ok: true, page: ${escapeJsString(pageName)}, contentId: content.id };`);

  return lines.join("\n");
}

function buildRefScript(pageId) {
  const entry = PAGE_MAP.find((p) => p.id === pageId);
  if (!entry) throw new Error("bad page");
  const jpegPath = path.join("/tmp", entry.shot);
  const b64 = fs.readFileSync(jpegPath).toString("base64");
  return `
const b64 = ${JSON.stringify(b64)};
function decode(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
const handoff = figma.root.children.find((p) => p.name === "Handoff");
if (!handoff) throw new Error("Missing Handoff page");
await figma.setCurrentPageAsync(handoff);
let art = handoff.children.find((n) => n.type === "FRAME" && n.name === ${JSON.stringify(entry.figmaPage)});
if (!art) {
  art = figma.createFrame();
  art.name = ${JSON.stringify(entry.figmaPage)};
  handoff.appendChild(art);
}
const oldRef = art.children.find((n) => n.name === "_reference");
if (oldRef) oldRef.remove();
art.layoutMode = "NONE";
art.clipsContent = true;
const img = await figma.createImageAsync(decode(b64));
const imSize = await img.getSizeAsync();
const refH = Math.max(1, Math.round((imSize.height / imSize.width) * 1440));
const ref = figma.createRectangle();
ref.name = "_reference";
ref.resize(1440, refH);
ref.x = 0;
ref.y = 0;
ref.locked = true;
ref.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: img.hash }];
art.insertChild(0, ref);
art.resize(1440, refH);
return { ok: true, page: ${JSON.stringify(entry.figmaPage)}, artId: art.id, refId: ref.id };
`;
}

function buildSetupScript() {
  const tokens = JSON.parse(fs.readFileSync(path.join(root, "tokens", "tokens.json"), "utf8"));
  const primaryBg = hexToRgb01(tokens.primary_background_color.hex);
  const primaryText = hexToRgb01(tokens.primary_text_color.hex);
  const accent = hexToRgb01("#EA580C");

  return `
const createdNodeIds = [];
const collection = figma.variables.createVariableCollection("Beckford Moves");
const modeId = collection.modes[0].modeId;
collection.renameMode(modeId, "Default");

function makeColor(name, rgb, scopes) {
  const v = figma.variables.createVariable(name, collection, "COLOR");
  v.scopes = scopes;
  v.setValueForMode(modeId, { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 });
  return v;
}

makeColor("color/bg/primary", ${JSON.stringify(primaryBg)}, ["FRAME_FILL", "SHAPE_FILL"]);
makeColor("color/text/primary", ${JSON.stringify(primaryText)}, ["TEXT_FILL", "SHAPE_FILL"]);
makeColor("color/accent", ${JSON.stringify(accent)}, ["FRAME_FILL", "TEXT_FILL", "SHAPE_FILL"]);
makeColor("color/neutral/0", ${JSON.stringify({ r: 0, g: 0, b: 0 })}, ["FRAME_FILL", "TEXT_FILL"]);
makeColor("color/neutral/100", ${JSON.stringify({ r: 1, g: 1, b: 1 })}, ["FRAME_FILL", "TEXT_FILL"]);

async function loadInter() {
  const weights = ["Regular", "Medium", "Semi Bold", "Bold"];
  for (const w of weights) await figma.loadFontAsync({ family: "Inter", style: w });
}

await loadInter();

const sizes = [14, 16, 18, 20, 24, 30, 36];
for (const sz of sizes) {
  const weight = sz >= 24 ? "Bold" : "Regular";
  const st = figma.createTextStyle();
  st.name = "Beckford/Text/" + sz + "/" + weight;
  st.fontName = { family: "Inter", style: weight };
  st.fontSize = sz;
  st.lineHeight = { unit: "AUTO" };
}

const first = figma.root.children[0];
first.name = "Style Guide";
const handoff = figma.createPage();
handoff.name = "Handoff";

await figma.setCurrentPageAsync(first);

const sg = figma.createFrame();
sg.name = "Style Guide — Overview";
sg.layoutMode = "VERTICAL";
sg.itemSpacing = 24;
sg.paddingLeft = sg.paddingRight = sg.paddingTop = sg.paddingBottom = 48;
sg.primaryAxisSizingMode = "AUTO";
sg.counterAxisSizingMode = "FIXED";
sg.resize(1200, 400);
sg.x = 100;
sg.y = 100;
sg.fills = [{ type: "SOLID", color: ${JSON.stringify(primaryBg)} }];
await figma.setCurrentPageAsync(first);
first.appendChild(sg);

const title = figma.createText();
title.fontName = { family: "Inter", style: "Bold" };
title.fontSize = 36;
title.characters = "Beckford Moves — Tokens";
title.fills = [{ type: "SOLID", color: ${JSON.stringify(primaryText)} }];
sg.appendChild(title);

const sw = figma.createFrame();
sw.layoutMode = "HORIZONTAL";
sw.itemSpacing = 16;
sw.primaryAxisSizingMode = "AUTO";
sw.counterAxisSizingMode = "AUTO";
sw.fills = [];

const swatches = [
  { label: "Primary BG", rgb: ${JSON.stringify(primaryBg)} },
  { label: "Primary Text", rgb: ${JSON.stringify(primaryText)} },
  { label: "Accent", rgb: ${JSON.stringify(accent)} },
];
for (const s of swatches) {
  const f = figma.createFrame();
  f.layoutMode = "VERTICAL";
  f.itemSpacing = 8;
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.fills = [];
  const r = figma.createRectangle();
  r.resize(120, 120);
  r.fills = [{ type: "SOLID", color: s.rgb }];
  const lab = figma.createText();
  lab.fontName = { family: "Inter", style: "Regular" };
  lab.fontSize = 14;
  lab.characters = s.label;
  lab.fills = [{ type: "SOLID", color: ${JSON.stringify(primaryText)} }];
  f.appendChild(r);
  f.appendChild(lab);
  sw.appendChild(f);
}
sg.appendChild(sw);

const ty = figma.createText();
ty.fontName = { family: "Inter", style: "Regular" };
ty.fontSize = 18;
ty.characters = "Text styles: Beckford/Text/{14,16,18,20,24,30,36}/Regular|Bold";
ty.fills = [{ type: "SOLID", color: ${JSON.stringify(primaryText)} }];
sg.appendChild(ty);

createdNodeIds.push(sg.id);

let stackY = 0;
for (const name of ["Home", "About", "Work", "Detail", "Contact", "Blog"]) {
  await figma.setCurrentPageAsync(handoff);
  const art = figma.createFrame();
  art.name = name;
  art.resize(1440, 2000);
  art.x = 0;
  art.y = stackY;
  art.fills = [];
  art.clipsContent = true;
  handoff.appendChild(art);
  createdNodeIds.push(art.id);
  stackY += 2200;
}

return { ok: true, createdNodeIds, collectionId: collection.id };
`;
}

const step = process.argv[2] || "setup";

if (step === "setup") {
  process.stdout.write(buildSetupScript());
} else if (step.startsWith("ref-")) {
  const id = step.slice(4);
  process.stdout.write(buildRefScript(id));
} else if (step.startsWith("content-")) {
  const id = step.slice(8);
  const entry = PAGE_MAP.find((p) => p.id === id);
  const blocks = JSON.parse(fs.readFileSync(path.join(contentDir, entry.file), "utf8"));
  process.stdout.write(buildContentScript(blocks, entry.figmaPage));
} else {
  console.error("Unknown step");
  process.exit(1);
}
