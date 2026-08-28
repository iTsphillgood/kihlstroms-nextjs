"use client";

import { useMemo, useState } from "react";
import type { Model } from "../lib/data";
import ModelCard from "./ModelCard";

interface Props {
  models: Model[];
  showBrandFilter?: boolean;
  initialCategory?: string;
  initialFuel?: string;
}

const fuelOptions = ["Alle", "El", "Diesel", "CNG"];

export default function ModelGrid({ models, showBrandFilter = true, initialCategory, initialFuel }: Props) {
  const [category, setCategory] = useState(initialCategory ?? "Alla");
  const [fuel, setFuel] = useState(initialFuel ?? "Alle");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  const categories = useMemo(() => ["Alla", ...Array.from(new Set(models.map((m) => m.category)))], [models]);
  const fuels = useMemo(() => {
    const present = new Set(models.map((m) => (m.fuel.includes("El") ? "El" : m.fuel.includes("Diesel") ? "Diesel" : m.fuel.includes("CNG") ? "CNG" : null)).filter(Boolean) as string[]);
    return fuelOptions.filter((f) => f === "Alle" || present.has(f));
  }, [models]);

  const visible = useMemo(() => {
    let list = models.filter(
      (m) =>
        (category === "Alla" || m.category === category) &&
        (fuel === "Alle" ||
          (fuel === "El" && m.fuel.includes("El")) ||
          (fuel === "Diesel" && m.fuel.includes("Diesel")) ||
          (fuel === "CNG" && m.fuel.includes("CNG")))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
    if (sort === "price-desc") list = [...list].sort((a, b) => (b.priceFrom ?? -1) - (a.priceFrom ?? -1));
    return list;
  }, [models, category, fuel, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`chip ${category === c ? "chip-active" : ""} !px-3.5 !py-1.5`}
          >
            {c}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-ink-200 sm:block" aria-hidden="true" />
        {fuels.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFuel(f)}
            aria-pressed={fuel === f}
            className={`chip ${fuel === f ? "chip-active" : ""} !px-3.5 !py-1.5`}
          >
            {f === "Alle" ? "Alla drivlinor" : f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-sm">
          <label htmlFor="sort-models" className="hidden text-ink-500 sm:block">Sortera</label>
          <select
            id="sort-models"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="field !w-auto !py-1.5"
          >
            <option value="default">Standard</option>
            <option value="price-asc">Pris: lägst först</option>
            <option value="price-desc">Pris: högst först</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-500" role="status">
        {visible.length} {visible.length === 1 ? "modell" : "modeller"}{category !== "Alla" ? ` i kategorin ${category.toLowerCase()}` : ""}
        {fuel !== "Alle" ? ` med ${fuel.toLowerCase()}` : ""}.
      </p>

      <div className={`mt-6 grid gap-6 sm:grid-cols-2 ${showBrandFilter ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}>
        {visible.map((m) => (
          <ModelCard key={m.slug} model={m} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="card mt-6 p-8 text-center">
          <p className="font-semibold text-ink-800">Ingen modell matchar filtret</p>
          <p className="mt-1 text-sm text-ink-500">
            Rena filtren eller be oss ta fram en specialbyggd lösning via <a className="link" href="/bygg-din-lastbil">Bygg din lastbil</a>.
          </p>
        </div>
      )}
    </div>
  );
}
