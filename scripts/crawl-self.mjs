/**
 * Egen SEO/QA-crawler mot den lokala live-sajten (localhost:3000).
 * Besöker alla interna sidor, samlar titlar, meta, H1, bilder utan alt,
 * döda länkar och ord Räknare – skriver docs/SELF-AUDIT.md.
 * Användning: node scripts/crawl-self.mjs [baseUrl]
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const seen = new Set();
const queue = ["/"];
const pages = [];
const broken = [];

async function get(p) {
  try {
    const res = await fetch(BASE + p, { redirect: "follow" });
    return { ok: res.ok, status: res.status, html: await res.text() };
  } catch (e) {
    return { ok: false, status: 0, html: "", error: String(e) };
  }
}

function extractLinks(html, from) {
  const out = [];
  const re = /href="([^"#]+?)(#[^"]*)?"/g;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1];
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("data:")) continue;
    if (href.endsWith(".xml") || href.endsWith(".txt")) continue;
    if (href.startsWith("/_next")) continue;
    if (/\.(jpe?g|png|webp|svg|gif|ico|pdf|mp4|woff2?)$/i.test(href)) continue;
    href = href.replace(/\/$/, "") || "/";
    if (!seen.has(href)) out.push({ href, from });
  }
  return out;
}

while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  seen.add(p);
  const { ok, status, html } = await get(p);
  if (!ok) { broken.push({ page: p, status, from: queue.find(() => true)?.from ?? "-" }); continue; }

  const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? "";
  const metaDesc = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]*>/g, "").trim());
  const imgs = [...html.matchAll(/<img [^>]*>/g)].map((m) => m[0]);
  const imgsNoAlt = imgs.filter((i) => !/alt=/.test(i)).length;
  const imgsDecorative = imgs.filter((i) => /alt=""/.test(i)).length;
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter((w) => w.length > 2).length;
  const hasCta = /Begär offert|Ring växeln|Kontakta/i.test(html);
  const hasMoms = /moms/i.test(html);

  pages.push({ imgsDecorative, page: p, status, title: title.slice(0, 90), titleLen: title.length, metaLen: metaDesc.length, h1Count: h1s.length, h1: (h1s[0] ?? "").slice(0, 60), imgs: imgs.length, imgsNoAlt, words, hasCta, hasMoms });

  for (const { href } of extractLinks(html, p)) {
    if (!seen.has(href)) queue.push(href);
  }
}

let md = `# SELF-AUDIT – crawl av ${BASE}

_Genererad ${new Date().toISOString().slice(0, 10)} av \`scripts/crawl-self.mjs\` – ${pages.length} sidor besökta, ${broken.length} brutna._

## Sidöversikt

| Sida | Status | Titel (längd) | Meta-desc | H1 | Ord | Bilder (dekorativa/utan alt) | CTA | Moms |
|---|---|---|---|---|---|---|---|---|
`;
for (const p of pages) {
  md += `| ${p.page} | ${p.status} | ${p.title.slice(0, 44)}… (${p.titleLen}) | ${p.metaLen} tecken | ${p.h1Count} st: "${p.h1}" | ${p.words} | ${p.imgs} (${p.imgsNoAlt}) | ${p.hasCta ? "✓" : "SAKNAS"} | ${p.hasMoms ? "✓" : "–"} |\n`;
}

const shortTitles = pages.filter((p) => p.titleLen > 0 && p.titleLen < 30);
const longTitles = pages.filter((p) => p.titleLen > 65);
const noMeta = pages.filter((p) => p.metaLen === 0);
const noH1 = pages.filter((p) => p.h1Count === 0);
const manyH1 = pages.filter((p) => p.h1Count > 1);
const altIssues = pages.filter((p) => p.imgsNoAlt > 0);
const noCta = pages.filter((p) => !p.hasCta);

md += `\n## Funna problem\n\n`;
md += `- **Titlar utanför 30–65 tecken:** ${[...shortTitles, ...longTitles].map((p) => p.page).join(", ") || "inga ✓"}\n`;
md += `- **Saknar meta-description:** ${noMeta.map((p) => p.page).join(", ") || "inga ✓"}\n`;
md += `- **Saknar H1:** ${noH1.map((p) => p.page).join(", ") || "inga ✓"}\n`;
md += `- **Flera H1:** ${manyH1.map((p) => p.page).join(", ") || "inga ✓"}\n`;
md += `- **Bilder utan alt:** ${altIssues.map((p) => `${p.page} (${p.imgsNoAlt})`).join(", ") || "inga ✓"}\n`;
md += `- **Saknar CTA (Begär offert/Ring):** ${noCta.map((p) => p.page).join(", ") || "inga ✓"}\n`;
md += `- **Brutna länkar:** ${broken.map((b) => `${b.page} (${b.status})`).join(", ") || "inga ✓"}\n`;
md += `\n## Förbättringsförslag (prioriterade)\n\n1. Fixa bilder utan alt-texter (a11y + SEO)\n2. Titlar utanför 30–65 tecken justeras\n3. Sidor utan CTA får tydlig nästa-steg\n4. Lägg till JSON-LD (Organization + LocalBusiness per sida)\n5. sitemap.xml + robots.txt om de saknas\n`;

fs.writeFileSync(path.join(import.meta.dirname, "..", "docs", "SELF-AUDIT.md"), md);
console.log(`✓ ${pages.length} sidor crawlede, ${broken.length} brutna → docs/SELF-AUDIT.md`);
