"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Model } from "../lib/data";
import { brandName } from "../lib/data";
import { formatSek } from "../lib/format";

interface Props {
  models: Model[];
  sellerEmail: string;
  sellerName: string;
}

const uses = [
  { id: "transport", label: "Leverans och transport", icon: "📦" },
  { id: "service", label: "Service och installation", icon: "🔧" },
  { id: "bygg", label: "Bygg och anläggning", icon: "🏗️" },
  { id: "drag", label: "Tungt släp och drag", icon: "🚛" },
  { id: "city", label: "Miljözon och citykörning", icon: "🌿" },
  { id: "crew", label: "Arbetslag och passagerare", icon: "👷" }
];

const builds = [
  "Skåpbil (standard)",
  "Volymskåp / större skåp",
  "Skåp med bakgavellift",
  "Flak (fabrik eller TMT)",
  "Kyl eller frys",
  "Servicebil med inredning",
  "Dubbelhytt (Snoeks)",
  "Kran",
  "Chassi – egen påbyggnad"
];

const fuels = ["El", "Diesel/HVO100", "Biogas/CNG", "Ingen preferens"];

export default function BuildWizard({ models, sellerEmail, sellerName }: Props) {
  const [step, setStep] = useState(0);
  const [use, setUse] = useState<string[]>([]);
  const [build, setBuild] = useState<string[]>([]);
  const [fuel, setFuel] = useState(fuels[3]);
  const [payload, setPayload] = useState("1000");
  const [range, setRange] = useState("250");

  const toggleIn = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const suggestions = useMemo(() => {
    const wantElectric = fuel === "El" || use.includes("city");
    const needTow = use.includes("drag");
    const needCrew = use.includes("crew");
    const payloadNum = parseInt(payload, 10) || 0;
    let list = models.filter((m) => {
      if (wantElectric && !m.fuel.includes("El")) return false;
      if (!wantElectric && fuel !== "Ingen preferens" && fuel !== "Diesel/HVO100" && !m.fuel.includes("CNG")) return false;
      if (build.some((b) => b.includes("lift")) && !["iveco-daily-skap-lift"].includes(m.slug)) return false;
      if (build.some((b) => b.includes("Flak")) && !["iveco-daily-flakbil", "iveco-edaily", "maxus-e-deliver-9-chassi"].includes(m.slug)) return false;
      if (build.some((b) => b.includes("Dubbelhytt")) && !["iveco-daily-dubbelhytt"].includes(m.slug)) return false;
      if (build.some((b) => b.includes("Kyl"))) return false;
      if (needTow) {
        const drag = m.specs.find((s) => s.label.toLowerCase().includes("drag"))?.value ?? "";
        const tons = parseFloat(drag.replace(/\s/g, "").replace(",", ".")) || 0;
        if (tons < 3.4 && !m.category.includes("Pickup")) return false;
        if (tons < 3.4) return false;
      }
      const capacity = m.specs.find((s) => s.label === "Nyttolast" || s.label === "Lastvikt")?.value ?? "";
      const capNum = parseInt(capacity.replace(/\D/g, ""), 10) || 0;
      if (payloadNum > 1200 && capNum && capNum < payloadNum) return false;
      return true;
    });
    if (list.length === 0) {
      list = models.filter((m) => m.category === "Skåpbil" || m.category === "Chassi");
    }
    if (needCrew) {
      list = [...list].sort((a, b) => Number(b.slug.includes("dubbelhytt")) - Number(a.slug.includes("dubbellhytt")));
    }
    return list.slice(0, 3);
  }, [models, use, build, fuel, payload]);

  const mailto = () => {
    const params = new URLSearchParams({
      subject: "Bygg din lastbil – behovsbeskrivning",
      body: [
        "Hej,",
        "",
        "Jag vill ha hjälp att bygga rätt arbetsbil.",
        "",
        `Användning: ${use.map((u) => uses.find((x) => x.id === u)?.label).join(", ") || "ej angivet"}`,
        `Påbyggnad: ${build.join(", ") || "ej angivet"}`,
        `Drivlina (preferens): ${fuel}`,
        `Ungefärlig lastvikt: ${payload} kg`,
        `Ungefärlig körsträcka per dag: ${range} km`,
        suggestions.length ? `Förslag från guiden: ${suggestions.map((s) => s.name).join(", ")}` : "",
        "",
        "Företag:",
        "Namn:",
        "Telefon:",
        "Önskad anläggning: Smista eller Spånga"
      ].filter(Boolean).join("\n")
    });
    window.location.href = `mailto:${sellerEmail}?${params.toString()}`;
  };

  const steps = ["Användning", "Påbyggnad", "Drivlinap & last", "Förslag"];

  return (
    <div className="card overflow-hidden">
      <ol className="flex border-b border-ink-100 bg-ink-50 text-sm" aria-label="Steg i guiden">
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={step === i ? "step" : undefined}
              className={`flex w-full items-center justify-center gap-2 px-2 py-3.5 font-semibold transition ${
                step === i ? "bg-white text-brand-blue" : "text-ink-500 hover:text-ink-800"
              }`}
            >
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${step >= i ? "bg-brand-blue text-white" : "bg-ink-200 text-ink-500"}`}>
                {i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink-900">Vad ska bilen användas till?</h2>
            <p className="mt-1.5 text-sm text-ink-600">Välj ett eller flera alternativ.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {uses.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => toggleIn(use, setUse, u.id)}
                  aria-pressed={use.includes(u.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    use.includes(u.id) ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/30" : "border-ink-200 bg-white hover:border-ink-300"
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">{u.icon}</span>
                  <span className="mt-2 block text-sm font-bold text-ink-900">{u.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink-900">Vilken påbyggnad behöver ni?</h2>
            <p className="mt-1.5 text-sm text-ink-600">Välj ett eller flera – vi bygger i egen regi eller med godkända partners.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {builds.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleIn(build, setBuild, b)}
                  aria-pressed={build.includes(b)}
                  className={`chip !px-4 !py-2 !text-sm ${build.includes(b) ? "chip-active" : ""}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink-900">Drivlina och last</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="field-label">Drivlina (preferens)</p>
                <div className="flex flex-col gap-2">
                  {fuels.map((f) => (
                    <label key={f} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-700">
                      <input type="radio" name="fuel" checked={fuel === f} onChange={() => setFuel(f)} className="h-4 w-4 accent-[#1B5FAA]" />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="payload" className="field-label">Ungefärlig lastvikt: <span className="font-bold text-ink-900">{payload} kg</span></label>
                <input id="payload" type="range" min="300" max="2000" step="50" value={payload} onChange={(e) => setPayload(e.target.value)} className="mt-3 w-full accent-[#1B5FAA]" />
                <p className="mt-1 text-xs text-ink-400">300–2 000 kg</p>
              </div>
              <div>
                <label htmlFor="range" className="field-label">Körsträcka per dag: <span className="font-bold text-ink-900">{range} km</span></label>
                <input id="range" type="range" min="30" max="500" step="10" value={range} onChange={(e) => setRange(e.target.value)} className="mt-3 w-full accent-[#1B5FAA]" />
                <p className="mt-1 text-xs text-ink-400">30–500 km</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink-900">Våra förslag utifrån dina svar</h2>
            <p className="mt-1.5 text-sm text-ink-600">
              Guiden gör en första avgränsning – säljteamet kompletterar med verkliga leveranstider och pris.
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {suggestions.map((m) => (
                <div key={m.slug} className="rounded-xl border border-ink-200 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{brandName(m.brand)} · {m.category}</p>
                  <p className="mt-1 text-[15px] font-bold text-ink-900">{m.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-600">{m.summary}</p>
                  <p className="mt-3 text-sm font-extrabold text-ink-900">
                    {m.priceFrom ? `fr. ${formatSek(m.priceFrom)}` : "Pris på förfrågan"}
                  </p>
                  <Link href={`/modeller/${m.slug}`} className="link mt-2 inline-block text-xs font-semibold">Se modellen →</Link>
                </div>
              ))}
            </div>
            <button type="button" onClick={mailto} className="btn-primary mt-6">
              Skicka behovet till {sellerName}
            </button>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-5">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="btn-ghost disabled:pointer-events-none disabled:opacity-40"
          >
            Tillbaka
          </button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep(step + 1)} className="btn-primary">
              Nästa steg
            </button>
          ) : (
            <span className="text-xs text-ink-400">Steg 4 av 4</span>
          )}
        </div>
      </div>
    </div>
  );
}
