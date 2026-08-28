"use client";

import { useMemo, useState } from "react";
import type { StockVehicle } from "../lib/data";
import { formatSek, formatMileage } from "../lib/format";

interface Props {
  vehicles: StockVehicle[];
  sellerName: string;
  sellerEmail: string;
}

function mailtoAbout(v: StockVehicle, sellerEmail: string, sellerName: string) {
  const params = new URLSearchParams({
    subject: `Fråga om lagerbil ${v.id} – ${v.brand} ${v.model}`,
    body: [
      `Hej ${sellerName},`,
      ``,
      `Jag vill veta mer om ${v.brand} ${v.model} – ${v.title}.`,
      `Annonsnummer: ${v.id}`,
      `Annons: ${v.adUrl}`,
      ``,
      `Företag:`,
      `Namn:`,
      `Telefon:`,
      `Bilen ska användas till:`,
      `Önskad anläggning: Smista eller Spånga`
    ].join("\n")
  });
  return `mailto:${sellerEmail}?${params.toString()}`;
}

function StockImage({ v }: { v: StockVehicle }) {
  const [src, setSrc] = useState(v.image);
  return (
    <img
      src={src}
      alt={`${v.brand} ${v.model} – ${v.title}`}
      className="aspect-[16/10] w-full object-cover"
      loading="lazy"
      onError={() => setSrc(v.fallbackImage)}
    />
  );
}

const brandOptions = ["Alla", "IVECO", "Isuzu", "MAXUS"];
const fuelOptions = ["Alla", "Diesel", "El", "CNG", "Hybrid"];
const bodyOptions = ["Alla", "Skåpbil", "Skåp & lift", "Flakbil", "Kylbil", "Dubbelhytt", "Pickup", "Lastbil"];
const conditionOptions = ["Alla", "Ny", "Begagnad"];

export default function StockExplorer({ vehicles, sellerName, sellerEmail }: Props) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("Alla");
  const [fuel, setFuel] = useState("Alla");
  const [body, setBody] = useState("Alla");
  const [condition, setCondition] = useState("Alla");
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "year-desc" | "default">("default");

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = vehicles.filter((v) => {
      if (needle) {
        const hay = `${v.brand} ${v.model} ${v.title} ${v.body}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      if (brand !== "Alla" && v.brand !== brand) return false;
      if (fuel !== "Alla" && v.fuel !== fuel) return false;
      if (body !== "Alla" && v.body !== body) return false;
      if (condition !== "Alla" && v.condition !== condition) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "year-desc") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [vehicles, q, brand, fuel, body, condition, sort]);

  const resetAll = () => {
    setQ("");
    setBrand("Alla");
    setFuel("Alla");
    setBody("Alla");
    setCondition("Alla");
    setSort("default");
  };

  return (
    <div>
      <div className="card p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <label htmlFor="stock-q" className="field-label">Sök bil eller utförande</label>
            <input
              id="stock-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="t.ex. Daily, skåp, CNG, eTerron…"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="stock-brand" className="field-label">Märke</label>
            <select id="stock-brand" className="field" value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brandOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="stock-fuel" className="field-label">Drivmedel</label>
            <select id="stock-fuel" className="field" value={fuel} onChange={(e) => setFuel(e.target.value)}>
              {fuelOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="stock-body" className="field-label">Kaross</label>
            <select id="stock-body" className="field" value={body} onChange={(e) => setBody(e.target.value)}>
              {bodyOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {conditionOptions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setCondition(o)}
              aria-pressed={condition === o}
              className={`chip ${condition === o ? "chip-active" : ""}`}
            >
              {o === "Alla" ? "Ny & begagnad" : o}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="stock-sort" className="text-sm text-ink-500">Sortera</label>
            <select id="stock-sort" className="field !w-auto !py-1.5" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="default">Standard</option>
              <option value="price-asc">Pris: lägst först</option>
              <option value="price-desc">Pris: högst först</option>
              <option value="year-desc">Årsmodell: nyast</option>
            </select>
            <button type="button" onClick={resetAll} className="text-sm font-semibold text-brand-blue hover:underline">
              Rensa
            </button>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-ink-600" role="status">
        Visar {visible.length} av {vehicles.length} annonser. Priser exkl. moms där annonsen anger det.
      </p>

      <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((v) => (
          <article key={v.id} className="card group flex flex-col overflow-hidden transition hover:shadow-lifted">
            <div className="relative bg-ink-100">
              <StockImage v={v} />
              <div className="absolute left-3 top-3 flex gap-2">
                <span className="rounded-full bg-ink-950/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {v.brand}
                </span>
                {v.condition === "Begagnad" && (
                  <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Begagnad
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold tracking-tight text-ink-900">{v.brand} {v.model}</h3>
                <span className="text-xs font-medium text-ink-400">{v.body}</span>
              </div>
              <p className="mt-1 text-sm text-ink-600">{v.title}</p>
              <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
                <div>Årsmodell <span className="font-semibold text-ink-700">{v.year}</span></div>
                <div>Mätare <span className="font-semibold text-ink-700">{formatMileage(v.mileageKm)}</span></div>
                <div>{v.fuel}{v.rangeKm ? ` · ${v.rangeKm} km` : ""}</div>
                {v.transmission && <div>{v.transmission}</div>}
              </dl>
              <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-100 pt-4 mt-5">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-400">Pris i annonsen</p>
                  <p className="text-base font-extrabold text-ink-900">{formatSek(v.price)} <span className="text-xs font-medium text-ink-500">exkl. moms</span></p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <a href={v.adUrl} target="_blank" rel="noopener noreferrer" className="btn-dark !px-3.5 !py-2 text-[12px]">
                    Annons ↗
                  </a>
                  <a href={mailtoAbout(v, sellerEmail, sellerName)} className="btn-ghost !px-3.5 !py-2 text-[12px]">
                    Fråga {sellerName.split(" ")[0]}
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="card mt-6 p-8 text-center">
          <p className="font-semibold text-ink-800">Ingen annons matchar filtret</p>
          <p className="mt-1 text-sm text-ink-500">Utbudet förändras löpande – rensa filtren eller hör av dig så letar vi åt er.</p>
        </div>
      )}
    </div>
  );
}
