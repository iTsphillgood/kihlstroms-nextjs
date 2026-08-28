import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModel, models, brandName, brandColor, modelsByBrand, stock, staff } from "../../../lib/data";
import { formatSek, quoteMailto } from "../../../lib/format";
import ModelCard from "../../../components/ModelCard";
import SmartImg from "../../../components/SmartImg";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const model = getModel(params.slug);
  if (!model) return {};
  const price = model.priceFrom ? ` – från ${model.priceFrom.toLocaleString("sv-SE")} kr exkl. moms` : "";
  return {
    title: `${model.name}${price}`,
    description: `${model.summary} ${model.suitedFor.join(", ")}.`
  };
}

export default function ModelPage({ params }: { params: { slug: string } }) {
  const model = getModel(params.slug);
  if (!model) notFound();

  const color = brandColor(model.brand);
  const gallery = [model.image, ...model.gallery].slice(0, 5);
  const related = modelsByBrand(model.brand).filter((m) => m.slug !== model.slug).slice(0, 3);
  const stockMatches = stock.vehicles.filter(
    (v) => v.brand.toLowerCase() === brandName(model.brand).toLowerCase() && v.model.toLowerCase().split(" ").some((w) => model.name.toLowerCase().includes(w))
  );
  const seller = staff.find((s) => s.role.toLowerCase().includes("sälj"));

  return (
    <>
      <div className="border-b border-ink-100 bg-white">
        <div className="container-site py-10 md:py-14">
          <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
            <Link href="/" className="hover:text-brand-blue">Startsida</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/modeller" className="hover:text-brand-blue">Modeller</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="font-medium text-ink-800">{model.name}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: color }}>
                  {brandName(model.brand)}
                </span>
                <span className="chip">{model.category}</span>
                <span className="chip">{model.fuel}</span>
                {model.badge && <span className="chip !border-brand-red !text-brand-red">{model.badge}</span>}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{model.name}</h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600 sm:text-base">{model.summary}</p>

              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
                  {model.priceFrom ? "Företagspris från" : "Pris"}
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-ink-900">
                  {model.priceFrom ? formatSek(model.priceFrom) : "På förfrågan"}
                  {model.priceFrom && <span className="ml-2 text-sm font-semibold text-ink-500">exkl. moms</span>}
                </p>
                {model.priceNote && <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-ink-500">{model.priceNote}</p>}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={quoteMailto(model.name, seller?.email ?? "info@kihlstroms.se")} className="btn-primary">
                  Begär offert – svar samma arbetsdag
                </a>
                <Link href="/kontakt#meddelande" className="btn-ghost">Boka provkörning</Link>
                {stockMatches.length > 0 && (
                  <Link href="/lager" className="btn-ghost">
                    {stockMatches.length} i lager just nu
                  </Link>
                )}
              </div>
              <p className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8.5 3.2 3L13 5" stroke="#1B5FAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Direkt till namngiven säljare
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8.5 3.2 3L13 5" stroke="#1B5FAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Offert med pris, leveranstid och finansiering
                </span>
              </p>
            </div>

            <div className="grid gap-3">
              <div className="overflow-hidden rounded-2xl bg-ink-100 shadow-card">
                <SmartImg src={gallery[0]} fallback={model.imageFallback} alt={`${model.name} – huvudbild`} className="aspect-[16/10] w-full object-cover" eager />
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {gallery.slice(1).map((g, i) => (
                    <div key={g + i} className="overflow-hidden rounded-xl bg-ink-100">
                      <SmartImg src={g} fallback={model.imageFallback} alt={`${model.name} – bild ${i + 2}`} className="aspect-[16/10] w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-12">
          {model.variants.length > 1 && (
            <section aria-labelledby="variants-heading">
              <p className="section-label">Prislista</p>
              <h2 id="variants-heading" className="h-section">Varianter och priser</h2>
              <div className="card mt-6 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Variant</th>
                      <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Drivlina</th>
                      <th scope="col" className="px-5 py-3 text-right font-semibold">Pris exkl. moms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {model.variants.map((v) => (
                      <tr key={v.name} className="align-top">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-ink-900">{v.name}</p>
                          {v.code && <p className="mt-0.5 font-mono text-xs text-ink-500">{v.code}</p>}
                          {v.note && <p className="mt-1 text-xs leading-relaxed text-ink-500">{v.note}</p>}
                        </td>
                        <td className="hidden px-5 py-4 text-ink-600 sm:table-cell">{v.engine ?? "–"}</td>
                        <td className="px-5 py-4 text-right font-extrabold text-ink-900">
                          {v.price != null ? formatSek(v.price) : "Förfrågan"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {model.campaignSource && (
                <p className="mt-3 text-xs text-ink-400">
                  Priserna följer{" "}
                  <a href={model.campaignSource} className="link" target="_blank" rel="noopener noreferrer">
                    Kihlströms kampanjprogram
                  </a>
                  {" "}där flera priser är publicerade på{" "}
                  <a href={model.sourceUrl} className="link" target="_blank" rel="noopener noreferrer">
                    iveco.se
                  </a>
                  .
                </p>
              )}
            </section>
          )}

          <section aria-labelledby="specs-heading">
            <p className="section-label">Specifikationer</p>
            <h2 id="specs-heading" className="h-section">Nyckeltal</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {model.specs.map((s) => (
                <div key={s.label} className="card p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{s.label}</dt>
                  <dd className="mt-1.5 text-[15px] font-bold text-ink-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {model.benefits && model.benefits.length > 0 && (
            <section aria-labelledby="benefits-heading">
              <p className="section-label">Därför väljer företag den här modellen</p>
              <h2 id="benefits-heading" className="h-section">Fördelar i ditt arbete</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {model.benefits.map((b) => (
                  <li key={b} className="card flex gap-3.5 p-5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-blue/10">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="m3 8.5 3.2 3L13 5" stroke="#1B5FAA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="suited-heading">
            <p className="section-label">Use cases</p>
            <h2 id="suited-heading" className="h-section">Typiska uppdrag</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {model.suitedFor.map((s) => (
                <li key={s} className="chip !px-4 !py-2 !text-sm">{s}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-500">
              Osäker om modellen räcker till?{" "}
              <Link href="/bygg-din-lastbil" className="link">Gör behovsguiden Bygg din lastbil</Link> så föreslår vi rätt fordon och påbyggnad.
            </p>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Prata med en säljare</p>
            {seller && (
              <>
                <p className="mt-2 text-lg font-bold text-ink-900">{seller.name}</p>
                <p className="text-sm font-semibold text-brand-blue">{seller.role} · {seller.location}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{seller.bio}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href={quoteMailto(model.name, seller.email)} className="btn-primary w-full">Mejla om {model.name}</a>
                  <a href={seller.phoneHref} className="btn-ghost w-full">Ring {seller.phone}</a>
                </div>
              </>
            )}
            <p className="mt-4 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-500">
              Offert med pris, leveranstid och finansieringsförslag – oftast svar samma arbetsdag.
            </p>
          </div>

          <div className="card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">Priser & källor</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Priser och specifikationer följer {brandName(model.brand)}s officiella svenska prislista
              (senast kontrollerad 2026-08-28) och anges exklusive moms. Offerten sätter alltid de
              slutgiltiga villkoren – inklusive leveranstid och eventuell kampanj.
            </p>
            <a href={model.sourceUrl} className="link mt-3 inline-block text-sm font-semibold" target="_blank" rel="noopener noreferrer">
              Se {brandName(model.brand)}s egna sidor ↗
            </a>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-ink-100 bg-white py-12 md:py-16" aria-labelledby="related-heading">
          <div className="container-site">
            <h2 id="related-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
              Fler {brandName(model.brand)}-modeller
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((m) => (
                <ModelCard key={m.slug} model={m} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
