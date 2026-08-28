/**
 * Genererar docs/MEMORY.md – komplett länk- och prisregistry för Kihlströms-sajten.
 * Allt som behövs för att se varje bild, varje pris och varje källa kommer ifrån.
 * Körs: node scripts/build-memory-doc.mjs (eller npm run build:docs)
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, "data", f), "utf8"));
const models = (() => { const m = read("models.json"); return Array.isArray(m) ? m : m.models; })();
const company = read("company.json");
const accessories = read("accessories.json");
const campaignsRaw = read("campaigns.json");
const campaigns = Array.isArray(campaignsRaw) ? campaignsRaw : campaignsRaw.campaigns;
const stock = read("stock.json");
const iveco = read("iveco-campaign.json");
const sek = (n) => (n == null ? "På förfrågan" : `${new Intl.NumberFormat("sv-SE").format(n)} kr`);

const brandName = { iveco: "IVECO", isuzu: "Isuzu", maxus: "Maxus" };

let md = `# MEMORY – Kihlströms masterregistry för bilder, priser och källor

_Genererad ${new Date().toISOString().slice(0, 10)} av \`scripts/build-memory-doc.mjs\` – kör igen efter dataändringar.
Alla priser exkl. moms om inget annat anges. Bilderna är originallänkade från officiella källor (märkes-CDN, importörens bildbank eller Blocket-annons)._

## Officiella källor – startpunkter

| Källa | Länk | Används till |
|---|---|---|
| Kihlströms – huvudsajt | https://www.kihlstroms.se/v3/ | Företagsuppgifter, personal, anläggningar |
| Kihlströms – IVECO-kampanj | https://www.kihlstroms.se/v3/iveco-daily-modeller/ | 20 kampanjmodeller, priser, säljare |
| Kihlströms – lagerbilar | https://www.kihlstroms.se/v3/bilar-i-lager-2/ | Alla 55 annonser med bilder och priser |
| Kihlströms – MAXUS | https://www.kihlstroms.se/v3/maxus/ | MAXUS-modellsida (referens) |
| Maxus Sverige – modeller | https://maxus.se/modeller | Från-priser (exkl. moms) per modell |
| Maxus Sverige – tillbehör | https://maxus.se/tillbehor | Tillbehörsöversikt (modellväljare) |
| Isuzu Sverige – modeller | https://www.isuzusverige.se/modeller/ | D-Max-programmet |
| Isuzu Sverige – prislista | https://www.isuzusverige.se/dmax/prislista/ | Priser + tillbehör med artikelnr |
| Isuzu Sverige – tillbehör | https://www.isuzusverige.se/tillbehor/ | Tillbehörslistor |
| IVECO Sverige – kampanjer | https://iveco.se/kopverktyg/kampanjer | Kampanjpriser publicerade av IVECO |
| RSA bildbank – Maxus | https://marketing.rsa.no/document/49 | 2 149 assets (bilder, videor, mallar) |
| RSA bildbank – Isuzu | https://marketing.rsa.no/document/51 | 1 130 assets (bilder, reels, mallar) |
| RSA CDN-kontrakt | https://media.ffycdn.net/eu/rsa-norway/{id}.{ext}?mod=v1/resize={px} | Direktlänkar utan auth |

## Prislistor i PDF (officiella)

| Dokument | Länk |
|---|---|
| Maxus T60 MAX – prislista & teknisk spec | https://cdn.sanity.io/files/mcx434c9/production/741e836eac907b97b16f91574d610ad44a583778.pdf |
| Maxus T60 MAX – specifikationer | https://cdn.sanity.io/files/mcx434c9/production/b74c1f2b385de89d91be14196ea5dc4bbc43cbf2.pdf |

---

## Modeller (${models.length} st) – priser, källor och bilder
`;

for (const brand of ["iveco", "isuzu", "maxus"]) {
  const list = models.filter((m) => m.brand === brand);
  md += `\n### ${brandName[brand]} (${list.length} modellfamiljer)\n\n`;
  md += `| Modell | Företagspris från | Prisnotering | Källa | Huvudbild |\n|---|---|---|---|---|\n`;
  for (const m of list) {
    md += `| ${m.name} | ${sek(m.priceFrom)} | ${(m.priceNote ?? "").replace(/\|/g, "/").slice(0, 80)} | [källa](${m.sourceUrl}) | [bild](${m.image}) |\n`;
  }
  md += `\n<details><summary>Bildgallerier per modell (klicka för att visa)</summary>\n\n`;
  for (const m of list) {
    md += `**${m.name}**\n`;
    m.gallery.forEach((g, i) => (md += `- [bild ${i + 1}](${g})\n`));
    if (m.imageFallback) md += `- fallback (lokal): ${m.imageFallback}\n`;
    md += `\n`;
  }
  md += `</details>\n`;
}

md += `\n---\n\n## IVECO kampanj 2026 – alla 20 modellerna (t.o.m. 30 september)\n\n`;
md += `| Modell | Kod | Nivå | Drivlina | Kampanjpris | Källstatus | Bild |\n|---|---|---|---|---|---|---|\n`;
for (const m of iveco.models) {
  md += `| ${m.name} | \`${m.code}\` | ${m.level} | ${m.driveline} | ${m.price} | ${m.source} | [bild](${m.image}) |\n`;
}
md += `\nKälla: ${iveco.sourceUrl}\n`;

md += `\n---\n\n## Tillbehör – artikelnr, priser och källor\n\n`;
for (const note of ["noteIsuzu", "noteMaxus", "noteIveco"]) {
  md += `- **${note.replace("note", "")}**: ${accessories[note]}\n`;
}
for (const b of accessories.brands) {
  md += `\n### ${brandName[b.id] ?? b.id}\n\n`;
  for (const cat of b.categories) {
    md += `**${cat.name}**\n\n| Art.nr | Tillbehör | Pris | Beskrivning |\n|---|---|---|---|\n`;
    for (const it of cat.items) {
      const price = it.regularPrice ? `${sek(it.price)} (ord. ${sek(it.regularPrice)})` : sek(it.price);
      md += `| ${it.art ?? "–"} | ${it.name} | ${price} | ${(it.desc ?? "").replace(/\|/g, "/").slice(0, 100)} |\n`;
    }
    md += `\n`;
  }
}

md += `\n---\n\n## Kampanjer\n\n| Kampanj | Märke | Källa |\n|---|---|---|\n`;
for (const c of campaigns) {
  md += `| ${c.title} | ${brandName[c.brand] ?? c.brand} | [källa](${c.sourceUrl}) |\n`;
}

md += `\n---\n\n## Lagerbilar (${stock.vehicles.length} st) – kontrollerade ${stock.verifiedAt}\n\n`;
const byBrand = {};
for (const v of stock.vehicles) byBrand[v.brand] = (byBrand[v.brand] ?? 0) + 1;
md += `Märkesfördelning: ${Object.entries(byBrand).map(([b, n]) => `**${b}**: ${n}`).join(", ")}\n\n`;
md += `| Nr | Bil | Titel | År/mil | Pris | Annons | Bild |\n|---|---|---|---|---|---|---|\n`;
stock.vehicles.forEach((v, i) => {
  md += `| ${i + 1} | ${v.brand} ${v.model} | ${v.title.replace(/\|/g, "/")} | ${v.year}${v.mileageKm != null ? ` · ${new Intl.NumberFormat("sv-SE").format(v.mileageKm)} mil` : ""} | ${v.price ? sek(v.price) : "Se annons"} | [Blocket](${v.adUrl}) | [bild](${v.image}) |\n`;
});

md += `\n---\n\n## Bildbanker & varumärkesmaterial\n\n`;
md += `| Märke | Svensk sida | Bildbank/guideline | \n|---|---|---|\n`;
for (const b of company.brands) {
  md += `| ${b.name} | [${b.sourceUrl}](${b.sourceUrl}) | ${b.guidelineUrl ? `[guideline](${b.guidelineUrl})` : "–"} |\n`;
}
md += `\nSe även docs/image-sources.md för detaljer kring RSA-bankerna (asset-ID:n per modell).\n`;

fs.writeFileSync(path.join(ROOT, "docs", "MEMORY.md"), md);
console.log(`✓ docs/MEMORY.md – ${models.length} modeller, ${stock.vehicles.length} lagerbilar, ${campaigns.length} kampanjer`);
