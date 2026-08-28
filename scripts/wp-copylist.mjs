/**
 * Genererar wordpress/KOPIERINGSLISTA.md – checklista över alla filer att kopiera in i WordPress.
 * Körs automatiskt i slutet av scripts/build-wordpress.mjs, eller standalone: node scripts/wp-copylist.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FRAG = path.join(ROOT, "wordpress", "fragments");
const files = fs.readdirSync(FRAG).filter((f) => f.endsWith(".html")).sort();

const modelsJson = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "models.json"), "utf8"));
const modelList = Array.isArray(modelsJson) ? modelsJson : modelsJson.models;
const slugToName = new Map(modelList.map((m) => [m.slug, m.name]));

const fileTitle = (f) => {
  const base = f.replace(".html", "");
  if (base === "index") return "Startsidan";
  if (base === "modeller") return "Alla modeller";
  if (base === "lager") return "Bilar i lager";
  if (base === "lager-iveco") return "Lagerbilar – IVECO";
  if (base === "kampanjer") return "Kampanjer";
  if (base === "bygg-din-lastbil") return "Bygg din lastbil";
  if (base === "verkstad-service") return "Verkstad & service";
  if (base === "reservdelar") return "Reservdelar";
  if (base === "tillbehor") return "Tillbehör";
  if (base === "om-oss") return "Om oss";
  if (base === "kontakt") return "Kontakt";
  if (base === "404") return "404–sidan";
  if (base.startsWith("marke-")) {
    const b = base.replace("marke-", "");
    return "Märkessida – " + ({ iveco: "IVECO", isuzu: "Isuzu", maxus: "Maxus" }[b] || b);
  }
  if (base.startsWith("modeller-")) {
    return "Modell – " + (slugToName.get(base.replace("modeller-", "")) || base.replace("modeller-", ""));
  }
  return base;
};

const filePermalink = (f) => {
  const base = f.replace(".html", "");
  if (base === "index") return "/ (startsidan)";
  if (base === "404") return "– (anges i WP:s 404-inställning)";
  if (base === "lager-iveco") return "/lager/iveco";
  if (base.startsWith("marke-")) return "/marke/" + base.replace("marke-", "");
  if (base.startsWith("modeller-")) return "/modeller/" + base.replace("modeller-", "");
  return "/" + base; // tankstreck är giltiga i permalänkar: /bygg-din-lastbil, /om-oss, /verkstad-service
};

const note = (f) => {
  const base = f.replace(".html", "");
  if (base === "kontakt") return "Formuläret syns men skickar inte – ersätt med Contact Form 7/WPForms";
  if (base === "verkstad-service") return "Serviceformuläret syns men skickar inte – ersätt med plugin";
  if (base === "bygg-din-lastbil") return "Guiden visar steg 1 statiskt";
  if (base === "lager") return "Fordonen listas utan filtrering";
  if (base === "modeller") return "Listan visas utan filtrering";
  if (base === "index") return "Heroslidern visar bild 1";
  return "";
};

const groups = [
  ["1. Grundsidor (skapa dessa först)", (f) => ["index", "modeller", "lager", "kampanjer", "bygg-din-lastbil", "verkstad-service", "reservdelar", "tillbehor", "om-oss", "kontakt"].includes(f.replace(".html", ""))],
  ["2. Lagerbilar", (f) => f.startsWith("lager-")],
  ["3. Märkessidor (3 st)", (f) => f.startsWith("marke-")],
  ["4. Modellsidor (22 st – permalänk /modeller/…)", (f) => f.startsWith("modeller-") && f !== "modeller.html"],
  ["5. Övrigt", (f) => f.replace(".html", "") === "404"],
];

let md = `# Kopieringslista – Kihlströms WordPress-filer

${files.length} filer i \`wordpress/fragments/\` – varje fil är självcontained (CSS ingår i filen) och klistras in som **Egen HTML**-block i WordPress.

**Så kopierar du en sida:**
1. WordPress: *Sidor → Ny* → döp sidan enligt tabellen → sätt permalänken exakt som i kolumnen "Permalänk"
2. Öppna filen i kolumnen "Fil du kopierar" (i mappen \`wordpress/fragments/\`)
3. Markera allt (Ctrl/Cmd+A) och kopiera
4. Klistra in som blocket **Egen HTML** i WordPress-sidan → Publicera
`;

let n = 0;
for (const [title, match] of groups) {
  const groupFiles = files.filter(match);
  if (!groupFiles.length) continue;
  md += `\n### ${title}\n\n| # | Fil du kopierar | WordPress-sida | Permalänk | Not |\n|---|---|---|---|---|\n`;
  for (const f of groupFiles) {
    n += 1;
    md += `| ${n} | \`fragments/${f}\` | ${fileTitle(f)} | \`${filePermalink(f)}\` | ${note(f)} |\n`;
  }
}

md += `
### Kom ihåg

- **Meny** (*Utseende → Menyer*): bygg Fordon / Verkstad & service / Om oss med permalänkarna ovan
- **Startsidan**: *Inställningar → Läsa* → "En statisk sida" → välj Startsida
- **404**: klistra in \`fragments/404.html\` i temats 404-mall eller en felsidesplugin
- **Formulär** (kontakt, service, byggguide): syns men skickar inget – ersätt med Contact Form 7/WPForms
- Klistra in som **administratör/redaktör** – lägre behörigheter kan rensa style-taggarna
- Granska helhetskänslan i \`wordpress/pages/\` – där kan du klicka dig mellan sidorna som på en riktig sajt
- Listan genereras om automatiskt av \`npm run build:wordpress\`
`;

fs.writeFileSync(path.join(ROOT, "wordpress", "KOPIERINGSLISTA.md"), md);
console.log(`✓ KOPIERINGSLISTA.md – ${n} filer listade`);
