import fs from "node:fs/promises";
const data=JSON.parse(await fs.readFile(new URL("../data/site-data.json",import.meta.url),"utf8"));
const errors=[];
if(data.models.length!==11)errors.push(`Expected 11 models, found ${data.models.length}`);
if(data.staff.length!==3)errors.push(`Expected 3 sales contacts, found ${data.staff.length}`);
for(const m of data.models){
  if(!m.source_url?.startsWith("https://maxus.se/"))errors.push(`Bad source: ${m.slug}`);
  if(!m.image_url?.includes("cdn.sanity.io"))errors.push(`Bad image: ${m.slug}`);
  if(!Number.isFinite(m.price_ex_vat))errors.push(`Missing price: ${m.slug}`);
}
for(const s of data.staff){if(!s.email?.endsWith("@kihlstroms.se"))errors.push(`Bad email: ${s.name}`)}
const html=await fs.readFile(new URL("../prototype/index.html",import.meta.url),"utf8");
for(const leak of ["DONT REMOVE THIS","FAKE LEFT","FAKE RIGHT","developer note"])if(html.includes(leak))errors.push(`Frontend leak: ${leak}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("V4 QA OK: 11 models, official sources, 3 sellers, no frontend leaks.");
