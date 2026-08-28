#!/usr/bin/env node
/**
 * QA-validering av data och bildreferenser.
 * Run: npm run qa
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const ok = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
  problems.push(msg);
  console.error(`  ✗ ${msg}`);
};

console.log("Kihlströms showroom – QA\n");

const dataFiles = ["company", "models", "stock", "accessories", "campaigns"];
const data = {};
for (const f of dataFiles) {
  try {
    data[f] = JSON.parse(fs.readFileSync(path.join(root, "data", `${f}.json`), "utf8"));
    ok(`${f}.json parsad`);
  } catch (e) {
    fail(`${f}.json kunde inte parsas: ${e.message}`);
  }
}
if (problems.length) {
  console.error("\nQA misslyckades: ogiltig JSON.");
  process.exit(1);
}

const models = data.models;
ok(`${models.length} modeller`);

const slugs = new Set();
for (const m of models) {
  if (slugs.has(m.slug)) fail(`dublett-slug: ${m.slug}`);
  slugs.add(m.slug);
  if (!m.brand || !["iveco", "isuzu", "maxus"].includes(m.brand)) fail(`${m.slug}: ogiltigt märke ${m.brand}`);
  if (m.priceFrom != null && (typeof m.priceFrom !== "number" || m.priceFrom < 100000)) {
    fail(`${m.slug}: misstänkt pris ${m.priceFrom}`);
  }
  for (const v of m.variants ?? []) {
    if (v.price != null && typeof v.price !== "number") fail(`${m.slug}/${v.name}: ogiltigt variantpris`);
  }
  if (!m.sourceUrl?.startsWith("http")) fail(`${m.slug}: saknar sourceUrl`);
}

const imageRefs = new Set();
for (const m of models) {
  [m.image, ...(m.gallery ?? [])].forEach((i) => i && imageRefs.add(i));
}
for (const b of data.company.brands) imageRefs.add(b.image);
for (const v of data.stock.vehicles) imageRefs.add(v.fallbackImage);
let missing = 0;
for (const ref of imageRefs) {
  if (ref.startsWith("http")) continue;
  if (!fs.existsSync(path.join(root, "public", ref.replace(/^\//, "")))) {
    fail(`bild saknas: ${ref}`);
    missing++;
  }
}
if (!missing) ok(`${imageRefs.size} bildreferenser (lokala finns på disk)`);

const emails = new Set();
const phones = new Set();
for (const s of data.company.staff) {
  if (!/^[^@\s]+@kihlstroms\.se$/.test(s.email)) fail(`staff ${s.name}: konstig mejl ${s.email}`);
  if (!s.phoneHref?.startsWith("tel:+46")) fail(`staff ${s.name}: saknar tel:+46-länk`);
  emails.add(s.email);
  phones.add(s.phoneHref);
}
ok(`${data.company.staff.length} medarbetare med mejl + tel-länk`);

if (data.stock.vehicles.length < 10) fail("för få lagerbilar (<10)");
ok(`${data.stock.vehicles.length} lagerannonser med Blocket-länk`);

const appDir = path.join(root, "app");
const compDir = path.join(root, "components");
let leaked = 0;
for (const dir of [appDir, compDir]) {
  for (const f of fs.readdirSync(dir, { recursive: true })) {
    const p = path.join(dir, String(f));
    if (!fs.statSync(p).isFile() || !/\.(tsx|ts)$/.test(p)) continue;
    const src = fs.readFileSync(p, "utf8");
    if (/DONT REMOVE|FAKE LEFT|console\.log\(/.test(src)) {
      fail(`utvecklarläcka i ${p}`);
      leaked++;
    }
  }
}
if (!leaked) ok("inga utvecklarkommentarer eller console.log i app/components");

const internalLinks = new Set();
for (const m of models) internalLinks.add(`/modeller/${m.slug}`);
for (const c of data.campaigns) {
  if (c.cta?.href?.startsWith("/") && !["/marke/iveco", "/marke/isuzu", "/marke/maxus", ...internalLinks].includes(c.cta.href)) {
    if (!c.cta.href.startsWith("/modeller")) fail(`kampanj ${c.id}: länk ${c.cta.href} matchar inte data`);
  }
}
ok("kampanjlänkar kontrollerade");

console.log(
  problems.length
    ? `\nQA misslyckades med ${problems.length} problem.`
    : `\nQA OK – ${models.length} modeller, ${data.stock.vehicles.length} annonser, ${data.company.staff.length} medarbetare.`
);
process.exit(problems.length ? 1 : 0);
