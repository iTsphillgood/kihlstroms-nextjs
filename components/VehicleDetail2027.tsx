"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { StockVehicle } from "../lib/data";

type Props = { vehicle: StockVehicle; verifiedAt: string; sellerEmail: string };
type Accessory = { id: string; name: string; price: number; group?: string };
const format = (n: number) => new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 }).format(Math.round(n)) + " kr";
const ADDONS: Accessory[] = [
  { id: "wheel18", name: "18-tums vinterhjul, nordisk friktion", price: 35000, group: "wheels" },
  { id: "wheel20", name: "20-tums vinterhjul, nordisk friktion", price: 45000, group: "wheels" },
  { id: "bed", name: "Flakmatta", price: 5000 },
  { id: "floor", name: "Gummimattor", price: 2000 },
  { id: "cable", name: "Laddkabel", price: 2530 }
];
const MODEL_PHOTOS = [
  "https://cdn.sanity.io/images/mcx434c9/production/c6ea666eba7a7a084fa24c0a7219aeabff23062c-7998x5335.jpg?w=1400&q=80&auto=format",
  "https://cdn.sanity.io/images/mcx434c9/production/ba6f57399a1b7eae49ba302cfec8db6ba20273b0-8192x5464.jpg?w=1400&q=80&auto=format"
];
function VehiclePhoto({ src, fallback, alt, className }: {src:string;fallback:string;alt:string;className:string}) {
  const [actual, setActual] = useState(src);
  useEffect(() => setActual(src), [src]);
  return <img src={actual} onError={() => { if (actual !== fallback) setActual(fallback); }} alt={alt} className={className} loading="lazy" />;
}
export default function VehicleDetail2027({ vehicle, verifiedAt, sellerEmail }: Props) {
  const isETerron = vehicle.brand.toLowerCase() === "maxus" && vehicle.model.toLowerCase().includes("eterron");
  const photos = useMemo(() => isETerron ? [vehicle.image, ...MODEL_PHOTOS] : [vehicle.image], [isETerron, vehicle.image]);
  const addons = isETerron ? ADDONS : [];
  const [selected, setSelected] = useState<string[]>([]);
  const [vat, setVat] = useState(false);
  const [deposit, setDeposit] = useState(20);
  const [term, setTerm] = useState(36);
  const [residual, setResidual] = useState(45);
  const [rate, setRate] = useState(5.95);
  const [comparison, setComparison] = useState(389900);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("");
  const picked = addons.filter(x => selected.includes(x.id));
  const extra = picked.reduce((sum,x) => sum + x.price, 0);
  const total = vehicle.price + extra;
  const r = rate / 1200;
  const principal = total * (1 - deposit / 100);
  const rest = total * (residual / 100);
  const monthly = Math.max(0, r ? (principal - rest / Math.pow(1 + r, term)) * r / (1 - Math.pow(1+r,-term)) : (principal-rest)/term);
  const support = Math.max(0, (vehicle.price - comparison) * 0.3);
  const name = vehicle.brand + " " + vehicle.model;
  useEffect(() => {
    try { setSaved(localStorage.getItem("car_" + vehicle.id) === "1"); } catch {}
  }, [vehicle.id]);
  useEffect(() => {
    if (!formOpen && galleryIndex === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setFormOpen(false); setGalleryIndex(null); }
      if (galleryIndex !== null && e.key === "ArrowRight") setGalleryIndex((galleryIndex+1) % photos.length);
      if (galleryIndex !== null && e.key === "ArrowLeft") setGalleryIndex((galleryIndex+photos.length-1) % photos.length);
    };
    document.addEventListener("keydown", key);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = original; };
  }, [formOpen,galleryIndex,photos.length]);
  function choose(x: Accessory) {
    setSelected(prev => {
      const without = prev.filter(id => id !== x.id && !(x.group && ADDONS.find(a => a.id === id)?.group === x.group));
      return prev.includes(x.id) ? without : [...without,x.id];
    });
  }
  function offerText(form?: FormData) {
    return [
      "Hej! Jag vill ha information om " + name + ".",
      "Annons: " + vehicle.id + " / " + vehicle.year,
      "Pris exkl. moms: " + format(vehicle.price),
      "Tillbehör: " + (picked.length ? picked.map(x => x.name + " " + format(x.price)).join(", ") : "Inga"),
      "Indikativt totalpris exkl. moms: " + format(total),
      "Finansieringsönskemål: " + deposit + "% insats, " + term + " månader, " + residual + "% restvärde",
      "Räkneexempel (ej offert): " + format(monthly) + "/mån, antagen ränta " + rate + "%",
      "Namn: " + String(form?.get("name") || ""),
      "Företag: " + String(form?.get("company") || ""),
      "E-post: " + String(form?.get("email") || ""),
      "Telefon: " + String(form?.get("phone") || ""),
      "Anläggning: " + String(form?.get("location") || ""),
      "Ärende: " + String(form?.get("intent") || ""),
      "Meddelande: " + String(form?.get("message") || ""),
      "Kostnader, finansiering och lagerstatus behöver bekräftas av säljare."
    ].join("\n");
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = offerText(new FormData(e.currentTarget));
    window.location.href = "mailto:" + sellerEmail + "?subject=" + encodeURIComponent("Förfrågan " + name + " / " + vehicle.id) + "&body=" + encodeURIComponent(text);
    setStatus("E-postprogrammet öppnas. Skicka mejlet där för att slutföra förfrågan.");
  }
  async function copy() {
    try { await navigator.clipboard.writeText(offerText()); setStatus("Offertunderlaget är kopierat."); }
    catch { setStatus("Kopiering stöds inte i denna webbläsare."); }
  }
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: name, url: location.href });
      else { await navigator.clipboard.writeText(location.href); setStatus("Länken är kopierad."); }
    } catch { setStatus("Det gick inte att dela länken."); }
  }
  const facts = isETerron ? [["430 km","WLTP-räckvidd, upp till"],["3 500 kg","Dragvikt, bromsad"],["436 hk","Effekt"],["102 kWh","Batteri"]] : [
    [String(vehicle.year),"Årsmodell"],[vehicle.fuel,"Drivmedel"],[vehicle.transmission || "Fråga oss","Växellåda"],[vehicle.body,"Kaross"]
  ];
  const specs: string[][] = [["Årsmodell",String(vehicle.year)],["Drivmedel",vehicle.fuel],["Kaross",vehicle.body],["Växellåda",vehicle.transmission || "På förfrågan"],["Mätarställning",typeof vehicle.mileageKm === "number" ? String(vehicle.mileageKm/10) + " mil" : "På förfrågan"]];
  if(isETerron) specs.push(["Räckvidd WLTP","Upp till 430 km"],["Dragvikt","3 500 kg"],["Lastvikt","575 kg"],["Frunk","236 liter"],["Laddning DC","20–80 % ca 42 min"],["V2L","Ja"]);
  return <div className="container-site pb-20">
    <div className="overflow-hidden rounded-3xl bg-slate-200">
      <div className={"grid gap-1 " + (photos.length > 1 ? "grid-cols-2 lg:grid-cols-[1.7fr_1fr]" : "grid-cols-1")}>
        <button type="button" aria-label="Öppna bilder" onClick={() => setGalleryIndex(0)} className={"relative block bg-slate-300 " + (photos.length>1?"col-span-2 lg:col-span-1":"")}>
          <VehiclePhoto src={photos[0]} fallback={vehicle.fallbackImage} alt={name+" annonsbild"} className="aspect-[16/10] h-full w-full object-cover" />
          <span className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-2 text-xs font-bold">Visa bilder ↗</span>
        </button>
        {photos.length > 1 && <div className="col-span-2 grid grid-cols-2 gap-1 lg:col-span-1 lg:grid-cols-1">{photos.slice(1).map((photo,i) => <button type="button" key={photo} onClick={() => setGalleryIndex(i+1)} className="relative bg-slate-200"><VehiclePhoto src={photo} fallback={vehicle.fallbackImage} alt={name+" modellbild"} className="h-full w-full object-cover" /><span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white">Modellbild</span></button>)}</div>}
      </div>
    </div>
    <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
      <div><p className="section-label">{vehicle.brand} / {vehicle.body} / DIGITALT SHOWROOM 2027</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{name}</h1><p className="mt-2 text-sm leading-relaxed text-slate-600">{vehicle.title}</p></div>
      <div className="flex gap-2"><button type="button" className="btn-ghost" aria-pressed={saved} onClick={() => { const newSaved=!saved;setSaved(newSaved);try{localStorage.setItem("car_"+vehicle.id,newSaved?"1":"0");}catch{} }}>{saved?"♥ Sparad":"♡ Spara"}</button><button type="button" onClick={share} className="btn-ghost">↗ Dela</button></div>
    </div>
    <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-w-0 space-y-10">
        <section><h2 className="h-section">För arbete och vardag</h2><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">{facts.map(([n,l]) => <div key={l} className="rounded-2xl border border-slate-200 bg-white p-4"><strong className="block text-xl font-extrabold">{n}</strong><span className="mt-2 block text-xs text-slate-500">{l}</span></div>)}</div><p className="mt-4 text-xs text-slate-500">Lagerunderlaget daterat {verifiedAt}. Slutpris och tillgänglighet ska alltid bekräftas.</p></section>
        {isETerron && <section><p className="section-label">Arbetsnytta</p><h2 className="h-section">Mer än bara räckvidd</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{[["3,5 ton","Dra släp och maskiner inom bilens registrerade begränsningar."],["V2L","Använd bilbatteriet för att driva externa verktyg och utrustning."],["236 liter","Praktisk frunk med plats för utrustning och laddkablar."]].map(([h,p])=><div key={h} className="rounded-2xl bg-slate-100 p-5"><b className="text-xl">{h}</b><p className="mt-3 text-sm leading-relaxed text-slate-600">{p}</p></div>)}</div></section>}
        {addons.length>0&&<section id="tillval"><p className="section-label">Tillval</p><h2 className="h-section">Anpassa din pickup</h2><p className="mt-3 text-xs text-slate-500">Prisuppgifter för tillbehör är indikativa och behöver bekräftas.</p><div className="mt-5 rounded-2xl border border-slate-200 bg-white px-5">{addons.map(a=><label className="flex cursor-pointer items-center gap-4 border-b border-slate-100 py-5 last:border-0" key={a.id}><input type="checkbox" checked={selected.includes(a.id)} onChange={()=>choose(a)} className="h-5 w-5 accent-blue-700" /><span className="flex-1 text-sm font-semibold">{a.name}</span><strong className="text-sm">{format(a.price)}</strong></label>)}</div><div className="mt-3 flex justify-between rounded-xl bg-blue-50 p-4 text-sm"><span>Valda tillbehör exkl moms</span><strong>{format(extra)}</strong></div></section>}
        {isETerron&&<section id="klimatpremie"><p className="section-label">Företag</p><h2 className="h-section">Klimatpremie som räkneexempel</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Energimyndigheten avgör om ett stöd kan beviljas och vilket fordon som är närmast jämförbart. Ett räkneexempel är inte ett beviljat stöd.</p><div className="mt-5 grid gap-4 rounded-2xl border border-lime-200 bg-lime-50 p-5 sm:grid-cols-2"><label className="text-xs font-bold">Jämförelsepris exkl moms<select value={comparison} onChange={e=>setComparison(Number(e.target.value))} className="field mt-2"><option value="389900">389 900 kr</option><option value="349000">349 000 kr</option></select></label><div className="rounded-xl bg-white p-4"><span className="text-xs text-slate-500">Teoretiskt högsta belopp</span><strong className="mt-2 block text-2xl">{format(support)}</strong></div></div><p className="mt-4 text-xs leading-relaxed text-slate-500">Ansökan ska skickas in innan beställning. Vid leasing söker leasinggivaren normalt stöd. <a href="https://www.energimyndigheten.se/klimat/transporter/transporteffektivt-samhalle/klimatpremie-for-latta-ellastbilar/" className="underline" target="_blank" rel="noopener noreferrer">Aktuella regler ↗</a></p></section>}
        <section id="specifikationer"><p className="section-label">Teknik</p><h2 className="h-section">Specifikationer</h2><dl className="mt-5 grid gap-x-7 sm:grid-cols-2">{specs.map(([label,value])=><div key={label} className="flex justify-between gap-2 border-b border-slate-200 py-4 text-sm"><dt className="text-slate-500">{label}</dt><dd className="text-right font-bold">{value}</dd></div>)}</dl>{isETerron&&<a className="mt-5 inline-block text-xs font-bold text-blue-700 underline" href="https://maxus.se/modeller/eterron-9" target="_blank" rel="noopener noreferrer">Officiella fordonsuppgifter hos MAXUS ↗</a>}</section>
        <section id="fragor"><p className="section-label">FAQ</p><h2 className="h-section">Vanliga frågor</h2>{[["Är priset inklusive moms?","Du kan växla mellan priser inklusive och exklusive moms i prisrutan. Priset måste bekräftas före köp."],["Kan jag räkna på finansieringen?","Ja, månadskostnaden beräknas som ett exempel utifrån nominell ränta, kontantinsats och restvärde, utan avgifter."],["Finns bilen i lager?","Lagerdata uppdateras inte i realtid i denna version. Kontakta en säljare för ett säkert besked."],["Tar ni inbytesbilar?","Ja, ange registreringsnummer och miltal i meddelandet så kan vi diskutera inbyte."]].map(([q,a])=><details key={q} className="border-b border-slate-200"><summary className="cursor-pointer py-5 text-sm font-bold">{q}</summary><p className="pb-5 text-sm text-slate-600">{a}</p></details>)}</section>
      </div>
      <aside className="self-start lg:sticky lg:top-24"><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"><div className="p-6"><p className="text-xs font-semibold text-slate-500">Pris enligt lagermaterial · måste verifieras</p><p className="mt-3 text-4xl font-black tracking-tight">{format(total*(vat?1.25:1))}</p><p className="mt-1 text-xs text-slate-500">{vat?"Inkl.":"Exkl."} moms · valda tillbehör inkluderade</p><div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-bold"><button type="button" onClick={()=>setVat(false)} aria-pressed={!vat} className={"rounded-lg p-3 "+(!vat?"bg-white shadow-sm":"text-slate-500")}>Exkl. moms</button><button type="button" onClick={()=>setVat(true)} aria-pressed={vat} className={"rounded-lg p-3 "+(vat?"bg-white shadow-sm":"text-slate-500")}>Inkl. moms</button></div><div className="mt-5 flex justify-between text-sm"><span>Grundpris</span><strong>{format(vehicle.price*(vat?1.25:1))}</strong></div><div className="mt-2 flex justify-between text-sm"><span>Tillbehör</span><strong>{format(extra*(vat?1.25:1))}</strong></div><div className="mt-6 rounded-2xl bg-slate-100 p-5"><b className="text-xs">Illustrativ finansieringskalkyl</b><p className="mt-3 text-3xl font-extrabold">{format(monthly)}<small className="text-xs">/mån exkl. moms</small></p>{[
        {label:"Kontantinsats",val:deposit,min:20,max:50,step:5,set:setDeposit,unit:"%"},
        {label:"Avtalstid",val:term,min:12,max:60,step:12,set:setTerm,unit:" månader"},
        {label:"Restvärde",val:residual,min:0,max:55,step:5,set:setResidual,unit:"%"},
        {label:"Antagen nominell ränta",val:rate,min:0,max:12,step:.25,set:setRate,unit:"%"}
      ].map(x=><label key={x.label} className="mt-4 block"><span className="flex justify-between gap-2 text-xs"><span>{x.label}</span><strong>{String(x.val).replace(".",",")}{x.unit}</strong></span><input type="range" min={x.min} max={x.max} step={x.step} value={x.val} onChange={e=>x.set(Number(e.target.value))} className="mt-2 w-full accent-blue-700" /></label>)}</div><p className="mt-4 text-xs leading-relaxed text-slate-500">Ej bindande finansieringsoffert. Avgifter och kreditprövning tillkommer. Klimatpremie avräknas inte.</p><button type="button" className="btn-primary mt-5 w-full" onClick={()=>setFormOpen(true)}>Begär personlig offert ↗</button><button type="button" className="btn-ghost mt-2 w-full" onClick={()=>setFormOpen(true)}>Boka provkörning</button><a href="tel:08195626" className="mt-5 block text-center text-sm font-bold text-blue-700">Ring 08-19 56 26</a></div><p className="border-t border-slate-200 bg-slate-50 p-5 text-xs leading-6 text-slate-600">✓ Stockholm Syd och Norr<br/>✓ Personlig rådgivning<br/>✓ Finansiering på förfrågan</p></div></aside>
    </div>
    <div className="mt-12 flex flex-wrap justify-between gap-5 rounded-3xl bg-slate-900 p-10 text-white"><div><p className="text-xs font-bold text-lime-300">DIGITALT SHOWROOM 2027</p><h2 className="mt-3 text-2xl font-extrabold">Rätt bil. Rätt upplägg.</h2><p className="mt-3 text-sm text-slate-300">Vi hjälper dig vidare med tillbehör, finansiering och leverans.</p></div><button type="button" className="rounded-xl bg-lime-300 px-6 py-4 text-sm font-extrabold text-slate-900" onClick={()=>setFormOpen(true)}>Ta fram offert ↗</button></div>
    {galleryIndex!==null&&<div role="dialog" aria-modal="true" aria-label="Bildgalleri" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 p-5 text-white"><button className="absolute right-5 top-5 rounded-xl border border-white/30 px-4 py-2" type="button" onClick={()=>setGalleryIndex(null)}>Stäng ×</button><VehiclePhoto src={photos[galleryIndex]} fallback={vehicle.fallbackImage} alt={name+" bild"} className="max-h-[72vh] max-w-[96vw] object-contain"/><div className="mt-5 flex items-center gap-5 text-xs"><button type="button" onClick={()=>setGalleryIndex((galleryIndex+photos.length-1)%photos.length)}>← Föregående</button><span>{galleryIndex+1}/{photos.length}</span><button type="button" onClick={()=>setGalleryIndex((galleryIndex+1)%photos.length)}>Nästa →</button></div></div>}
    {formOpen&&<div role="dialog" aria-modal="true" aria-labelledby="offer-heading" className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4"><div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 sm:p-8"><div className="flex justify-between gap-4"><div><h2 id="offer-heading" className="text-2xl font-extrabold">Förfrågan {name}</h2><p className="mt-2 text-sm text-slate-500">Ett mejl med din bil och valda tillbehör skapas. Du skickar det själv.</p></div><button type="button" className="self-start rounded-lg border px-3 py-2" onClick={()=>setFormOpen(false)} aria-label="Stäng">×</button></div><form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">{[
      ["name","Namn","text",true],["company","Företag","text",false],["email","E-post","email",true],["phone","Telefon","tel",true]
    ].map(([id,label,type,required])=><label key={String(id)} className="text-xs font-bold">{label}{required?" *":""}<input className="field mt-2" name={String(id)} type={String(type)} required={Boolean(required)}/></label>)}<label className="text-xs font-bold">Anläggning<select name="location" className="field mt-2"><option>Smista</option><option>Spånga</option><option>Valfri</option></select></label><label className="text-xs font-bold">Ärende<select name="intent" className="field mt-2"><option>Offert</option><option>Provkörning</option><option>Finansiering</option><option>Inbyte</option></select></label><label className="text-xs font-bold sm:col-span-2">Meddelande<textarea name="message" className="field mt-2 min-h-24"/></label><div className="flex flex-wrap gap-2 sm:col-span-2"><button type="submit" className="btn-primary">Öppna e-postapp ↗</button><button type="button" className="btn-ghost" onClick={copy}>Kopiera underlag</button></div></form><p className="mt-4 text-xs text-slate-500">Inget skickas automatiskt eller lagras av prototypen.</p></div></div>}
    {status&&<div role="status" className="fixed bottom-20 left-1/2 z-[110] w-[90vw] max-w-md -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-4 text-center text-xs text-white shadow-lg" onClick={()=>setStatus("")}>{status} <button type="button" className="ml-2 underline">Stäng</button></div>}
  </div>;
}
