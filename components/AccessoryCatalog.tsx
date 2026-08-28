"use client";

import { useMemo, useState } from "react";
import type { AccessoryBrand } from "../lib/data";
import { formatSek } from "../lib/format";

interface Props {
  brands: AccessoryBrand[];
  notes: Record<string, string>;
  quoteEmail: string;
}

export default function AccessoryCatalog({ brands, notes, quoteEmail }: Props) {
  const [active, setActive] = useState(brands[0]?.id ?? "");
  const [basket, setBasket] = useState<string[]>([]);

  const brand = brands.find((b) => b.id === active) ?? brands[0];
  const note = brand ? notes[brand.id] ?? "" : "";

  const total = useMemo(() => {
    if (!brand) return 0;
    return brand.categories
      .flatMap((c) => c.items)
      .filter((i) => basket.includes(`${brand.id}:${i.name}`))
      .reduce((sum, i) => sum + (i.price ?? 0), 0);
  }, [brand, basket]);

  const toggle = (key: string) =>
    setBasket((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const quoteMail = () => {
    const chosen = brand
      ? basket
          .filter((k) => k.startsWith(`${brand.id}:`))
          .map((k) => `- ${k.split(":")[1]}`)
          .join("\n")
      : "";
    const params = new URLSearchParams({
      subject: `Offert på tillbehör – ${brand?.name ?? ""}`,
      body: [
        "Hej,",
        "",
        chosen ? `Jag är intresserad av följande tillbehör:\n${chosen}` : "Jag vill ha hjälp att välja tillbehör.",
        "",
        chosen && total > 0 ? `Listpris totalt (exkl. moms): ${formatSek(total)}` : "",
        "",
        "Företag:",
        "Namn:",
        "Telefon:",
        "Fordon/modell:",
        "Önskad anläggning: Smista eller Spånga"
      ].filter(Boolean).join("\n")
    });
    window.location.href = `mailto:${quoteEmail}?${params.toString()}`;
  };

  if (!brand) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tillbehör per märke">
        {brands.map((b) => (
          <button
            key={b.id}
            type="button"
            role="tab"
            aria-selected={active === b.id}
            onClick={() => setActive(b.id)}
            className={`chip !px-4 !py-2 !text-sm ${active === b.id ? "chip-active" : ""}`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {note && (
        <p className="mt-4 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm leading-relaxed text-ink-600">
          {note}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-10">
          {brand.categories.map((cat) => (
            <section key={cat.name}>
              <h3 className="text-lg font-bold tracking-tight text-ink-900">{cat.name}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {cat.items.map((item) => {
                  const key = `${brand.id}:${item.name}`;
                  const selected = basket.includes(key);
                  return (
                    <div
                      key={key}
                      className={`card flex flex-col p-4 transition ${selected ? "ring-2 ring-brand-blue" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[15px] font-bold text-ink-900">{item.name}</p>
                          {item.art && <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">Art.nr {item.art}</p>}
                        </div>
                        <div className="text-right">
                          {item.regularPrice && (
                            <p className="text-xs text-ink-400 line-through">{formatSek(item.regularPrice)}</p>
                          )}
                          <p className={`text-[15px] font-extrabold ${item.regularPrice ? "text-brand-red" : "text-ink-900"}`}>
                            {item.price != null ? formatSek(item.price) : "Pris på förfrågan"}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                      <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-brand-blue">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggle(key)}
                          className="h-4 w-4 rounded border-ink-300 accent-[#1B5FAA]"
                        />
                        {selected ? "Valt till offert" : "Be om pris i offert"}
                      </label>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
          <p className="text-xs text-ink-400">
            Källa:{" "}
            <a href={brand.sourceUrl} className="link" target="_blank" rel="noopener noreferrer">
              {new URL(brand.sourceUrl).hostname}
            </a>{" "}
            – priser och artiklar kan ändras av leverantör.
          </p>
        </div>

        <aside className="card sticky top-24 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Din offertlista</p>
          <p className="mt-2 text-sm text-ink-600">
            {basket.filter((k) => k.startsWith(`${brand.id}:`)).length > 0
              ? `${basket.filter((k) => k.startsWith(`${brand.id}:`)).length} tillbehör valda för ${brand.name}.`
              : `Inga tillbehör valda för ${brand.name} än – bocka i det du vill ha pris på.`}
          </p>
          {total > 0 && (
            <p className="mt-3 border-t border-ink-100 pt-3 text-sm">
              Listpris totalt <span className="block text-xl font-extrabold text-ink-900">{formatSek(total)}</span>
              <span className="text-xs text-ink-400">exkl. moms, enligt listpris ovan</span>
            </p>
          )}
          <button type="button" onClick={quoteMail} className="btn-primary mt-4 w-full">
            Skicka offertförfrågan
          </button>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            Mejlet öppnas färdigt skrivet i din e-postklient och skickas till våra säljare – ingen registrering krävs.
          </p>
        </aside>
      </div>
    </div>
  );
}
