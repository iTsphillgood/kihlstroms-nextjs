/**
 * Bygger WordPress-färdiga HTML-sidor från den statiska Next.js-exporten.
 *
 * Användning:
 *   WP_EXPORT=1 npx next build && node scripts/build-wordpress.mjs
 *   (eller: npm run build:wordpress)
 *
 * Output i wordpress/:
 *   pages/*.html     – kompletta HTML-sidor med nav/footer och inbäddad CSS (grund för "Egen HTML"/tema)
 *   fragments/*.html – innehållet ur <main> med inbäddad, scopad CSS – klart att klistras in som "Egen HTML"-block i WordPress
 *   assets/images/   – lokala fallback-bilder (kopieras från public/)
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const WP = path.join(ROOT, "wordpress");

/* ---------- 1. Statisk export ---------- */
if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.log("Kör WP_EXPORT=1 next build …");
  execSync("WP_EXPORT=1 npx next build", { cwd: ROOT, stdio: "inherit" });
}

/* ---------- 2. Samla in alla HTML-sidor ---------- */
const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
})(OUT);

if (htmlFiles.length === 0) {
  console.error("Hittade ingen HTML i out/ – kör WP_EXPORT=1 npx next build först.");
  process.exit(1);
}

/* ---------- 3. CSS ---------- */
const cssDir = path.join(OUT, "_next", "static", "css");
const css = fs
  .readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => fs.readFileSync(path.join(cssDir, f), "utf8"))
  .join("\n");

/* Scopa CSS under .kms-scope så den kan läggas i WordPress utan att krocka med temat */
function scopeCss(source, scope) {
  const KEEP_VERBATIM = /^@(?:keyframes|font-face|-webkit-keyframes|property|layer)\b/i;
  const RECURSE = /^@(?:media|supports|container)\b/i;
  let out = "";

  function parseChunk(start, end, indent) {
    let i = start;
    while (i < end) {
      // hitta nästa '{' eller ';' på denna nivå
      let j = i;
      while (j < end && source[j] !== "{" && source[j] !== ";") j++;
      const head = source.slice(i, j).trim();
      if (source[j] === ";") {
        // @charset/@import eller nästa regel börjar direkt
        out += head.startsWith("@") ? head + ";" : "";
        i = j + 1;
        continue;
      }
      if (j >= end) break;
      // hitta matchande '}'
      let depth = 1;
      let k = j + 1;
      while (k < end && depth > 0) {
        if (source[k] === "{") depth++;
        else if (source[k] === "}") depth--;
        k++;
      }
      const body = source.slice(j + 1, k - 1);
      if (KEEP_VERBATIM.test(head)) {
        out += head + "{" + body + "}";
      } else if (RECURSE.test(head)) {
        out += head + "{";
        parseChunk(j + 1, k - 1, indent);
        out += "}";
      } else if (head) {
        const scoped = head
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => (/^(html|body|:root)$/.test(s) ? scope : `${scope} ${s}`))
          .join(",");
        out += scoped + "{" + body + "}";
      }
      i = k;
    }
  }

  parseChunk(0, source.length, "");
  return out;
}

const scopedCss = `${scopeCss(css, ".kms-scope")}\n/* bas för fragmentet */\n.kms-scope{min-height:inherit;}\n`;

/* ---------- 4. Rensa en HTML-sida från Next.js-runtime ---------- */
function cleanHtml(html) {
  let doc = html;
  // bort all JS (Next-runtime, hydration, flight-data)
  doc = doc.replace(/<script\b[\s\S]*?<\/script>/g, "");
  doc = doc.replace(/<script\b[^>]*\/>/g, "");
  // stylesheet-länkar mot /_next tas bort – CSS:en bäddas in i filerna istället
  doc = doc.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, (m) => (m.includes("/_next/") ? "" : m));
  // bort preload/prefetch till /_next
  doc = doc.replace(/<link\b[^>]*href="\/_next[^"]*"[^>]*>/g, "");
  // JSON-flightdata i länkar
  doc = doc.replace(/<link\b[^>]*as="fetch"[^>]*>/g, "");
  return doc;
}

/* ---------- 5. Interna länkar → filnamn ---------- */
const routeToFile = new Map();
for (const file of htmlFiles) {
  const rel = path.relative(OUT, file).split(path.sep).join("/");
  const route = "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
  const flat = route === "/" ? "index" : route.split("/").filter(Boolean).join("-");
  routeToFile.set(route, flat + ".html");
}

function rewriteLinks(doc) {
  return doc.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, target) => {
    // /kontakt#meddelande → kontakt.html#meddelande
    const hashSplit = target.split("#");
    const route = hashSplit[0] === "" ? "/" : "/" + hashSplit[0].replace(/\/$/, "");
    const hash = hashSplit[1] ? "#" + hashSplit[1] : "";
    const file = routeToFile.get(route);
    if (file) return `${attr}="${file}${hash}"`;
    // övriga relativa (t.ex. /images/…): peka på assets-katalogen
    if (route.startsWith("/images/")) return `${attr}="assets/${hashSplit[0]}"`;
    return m;
  });
}

/* ---------- 6. Generera pages/ och fragments/ ---------- */
for (const dir of ["pages", "fragments", "assets"]) {
  fs.rmSync(path.join(WP, dir), { recursive: true, force: true });
  fs.mkdirSync(path.join(WP, dir), { recursive: true });
}

// lokala fallback-bilder (CSS bäddas in i varje fil – ingen separat css-fil)
if (fs.existsSync(path.join(OUT, "images"))) {
  fs.cpSync(path.join(OUT, "images"), path.join(WP, "assets", "images"), { recursive: true });
}

let pageCount = 0;
for (const file of htmlFiles) {
  const rel = path.relative(OUT, file).split(path.sep).join("/");
  const route = "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
  const flat = (route === "/" ? "index" : route.split("/").filter(Boolean).join("-")) + ".html";
  const raw = fs.readFileSync(file, "utf8");

  // Hel sida (med nav/footer, för granskning och som mall) – CSS inbäddad i <head>
  const page = rewriteLinks(cleanHtml(raw)).replace(
    "</head>",
    `<style>\n${css}\n</style>\n</head>`
  );
  fs.writeFileSync(path.join(WP, "pages", flat), page);

  // Fragment (endast <main>-innehållet) – scopad CSS inbäddad, klart att klistras in i WordPress
  const mainStart = raw.indexOf('<main id="main"');
  const mainEnd = raw.lastIndexOf("</main>");
  if (mainStart !== -1 && mainEnd !== -1) {
    const innerStart = raw.indexOf(">", mainStart) + 1;
    const fragmentBody = raw.slice(innerStart, mainEnd);
    const fragment =
      `<!-- Kihlströms – innehåll för sidan ${route} -->\n` +
      `<!-- Självcontained: design och innehåll i samma block. Klistra in som "Egen HTML" i WordPress -->\n` +
      `<!-- Interna länkar pekar på WordPress-permalänkar: skapa sidorna med samma sökvägar -->\n` +
      `<div class="kms-scope">\n<style>\n${scopedCss}\n</style>\n` +
      cleanHtml(fragmentBody).trim() +
      `\n</div>\n`;
    fs.writeFileSync(path.join(WP, "fragments", flat), fragment);
  }
  pageCount++;
}

/* ---------- 7. index-fil för granskning ---------- */
const routes = [...routeToFile.entries()].sort((a, b) => a[0].localeCompare(b[0]));
const index = `<!doctype html><html lang="sv"><head><meta charset="utf-8"><title>Kihlströms – WordPress-export (granskning)</title><style>body{font-family:system-ui;margin:40px;line-height:1.6}li{margin:4px 0}h1{font-size:22px}</style></head><body><h1>Kihlströms – WordPress-export</h1><p>${pageCount} sidor genererade ${new Date().toISOString().slice(0, 10)}. CSS:en är inbäddad i varje fil. Öppna pages/ för förhandsgranskning, fragments/ för WordPress-innehåll.</p><ul>${routes
  .map(([route, file]) => `<li><a href="pages/${file}">${route}</a> – <a href="fragments/${file}">fragment</a></li>`)
  .join("")}</ul></body></html>`;
fs.writeFileSync(path.join(WP, "index.html"), index);

console.log(`✓ ${pageCount} sidor → wordpress/pages/ och wordpress/fragments/`);
console.log(`✓ CSS inbäddad i varje fil (≈ ${(css.length / 1024).toFixed(0)} kB/sida, ingen separat css-fil)`);

/* ---------- 8. Kopieringslista ---------- */
execSync("node scripts/wp-copylist.mjs", { cwd: ROOT, stdio: "inherit" });
