import Link from "next/link";
import type { Model } from "../lib/data";
import { brandName, brandColor } from "../lib/data";
import SmartImg from "./SmartImg";
import { formatSek } from "../lib/format";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:shadow-lifted">
      <Link href={`/modeller/${model.slug}`} className="relative block overflow-hidden bg-ink-100">
        <SmartImg
          src={model.image}
          fallback={model.imageFallback}
          alt={`${model.name} – ${model.category.toLowerCase()} från ${brandName(model.brand)}`}
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {model.badge && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: brandColor(model.brand) }}
          >
            {model.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: brandColor(model.brand) }}>
          {brandName(model.brand)} · {model.category}
        </p>
        <h3 className="mt-1 text-lg font-bold tracking-tight text-ink-900">
          <Link href={`/modeller/${model.slug}`} className="hover:text-brand-blue">
            {model.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600">{model.summary}</p>
        {model.suitedFor?.[0] && (
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            <span className="font-semibold text-ink-700">Passar för:</span> {model.suitedFor[0].toLowerCase()}
          </p>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {model.specs.slice(0, 4).map((s) => (
            <div key={s.label}>
              <dt className="text-[11px] uppercase tracking-wide text-ink-400">{s.label}</dt>
              <dd className="text-[13px] font-semibold text-ink-800">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-100 pt-4 mt-5">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-ink-400">
              {model.priceFrom ? "Företagspris från" : "Pris"}
            </p>
            <p className="text-base font-extrabold text-ink-900">
              {model.priceFrom ? `${formatSek(model.priceFrom)} exkl. moms` : "På förfrågan"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Link href={`/modeller/${model.slug}`} className="btn-ghost !px-4 !py-2 text-[13px]">
              Se modellen
            </Link>
            <Link href="/kontakt#meddelande" className="text-[13px] font-semibold text-brand-blue hover:underline">
              Begär offert
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
