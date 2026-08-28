import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand, brandInfo, modelsByBrand, campaigns, staff, ivecoCampaign, getModel } from "../../../lib/data";
import ModelGrid from "../../../components/ModelGrid";
import StaffList from "../../../components/StaffList";
import SmartImg from "../../../components/SmartImg";

export function generateStaticParams() {
  return brandInfo.map((b) => ({ brand: b.id }));
}

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const brand = getBrand(params.brand);
  if (!brand) return {};
  return {
    title: `${brand.name} hos Kihlströms – ${brand.tagline.toLowerCase()}`,
    description: brand.description
  };
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) notFound();

  const brandModels = modelsByBrand(brand.id);
  const brandCampaigns = campaigns.filter((c) => c.brand === brand.id);
  const brandStaff = staff.filter((s) =>
    s.brands.some((b) => b.toLowerCase() === brand.name.toLowerCase()) &&
    (s.role.toLowerCase().includes("sälj") || s.role === "Försäljningschef")
  );

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(110% 90% at 80% 10%, ${brand.color}66 0%, transparent 55%)` }}
          aria-hidden="true"
        />
        <div className="container-site relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Brödsmulor" className="text-sm text-ink-300">
              <Link href="/" className="hover:text-white">Startsida</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="font-medium text-white">{brand.name}</span>
            </nav>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">{brand.name}</h1>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#cfe2f5" }}>{brand.tagline}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-200">{brand.description}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {brand.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: brand.color === "#0E7490" ? "#67e8f9" : "#9cc6f2" }}>
                    <path d="m3 8.5 3.2 3L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#modeller" className="btn-primary">Se modellerna</a>
              <a href={brand.sourceUrl} className="btn-light" target="_blank" rel="noopener noreferrer">
                {brand.name}s svenska sida ↗
              </a>
              {brand.guidelineUrl && (
                <a href={brand.guidelineUrl} className="text-xs text-ink-300 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                  Officiellt bildmaterial från importören ↗
                </a>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
            <SmartImg src={brand.image} fallback={brand.imageFallback} alt={`${brand.name} – fordonsbild`} className="aspect-[16/10] w-full object-cover" eager />
          </div>
        </div>
      </section>

      <div className="container-site py-14 md:py-20" id="modeller">
        <div className="max-w-2xl">
          <p className="section-label">Modellprogram</p>
          <h2 className="h-section">{brandModels.length} modellfamiljer med svenska priser</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Filtrera på kaross och drivlinor, sortera på pris. Klicka vidare till varje modells varianter och prislista.
          </p>
        </div>
        <div className="mt-8">
          <ModelGrid models={brandModels} showBrandFilter={false} />
        </div>
      </div>

      {ivecoCampaign.brand === brand.id && (
        <section className="border-t border-ink-100 bg-ink-50 py-14 md:py-20" aria-labelledby="campaign-models">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="section-label">Kampanj 2026 · t.o.m. 30 september</p>
              <h2 id="campaign-models" className="h-section">Alla {ivecoCampaign.models.length} kampanjmodellerna – välj efter jobbet</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Färdigbyggda Daily och eldrivna transportbilar med tydligt företagspris. Skåpbil för distribution,
                skåp &amp; lift för tunga lyft, flakbil för material, dubbelhytt för arbetslaget eller el för miljözonen.
                Alla priser exkl. moms.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {ivecoCampaign.models.map((m) => {
                const family = getModel(m.family);
                return (
                  <article key={m.name} className="card flex flex-col overflow-hidden">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.image} alt={m.name} loading="lazy" className="aspect-[16/10] w-full bg-white object-contain p-4" />
                      <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: brand.color }}>
                        {m.level}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">{m.category} · {m.driveline}</p>
                      <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink-900">{m.name}</h3>
                      <p className="mt-0.5 font-mono text-xs text-ink-500">{m.code}</p>
                      <ul className="mt-3 space-y-1 text-sm text-ink-600">
                        {m.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: brand.color }} aria-hidden="true" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 border-t border-ink-100 pt-4">
                        <p className="text-lg font-extrabold tracking-tight text-ink-900">
                          {m.price} <span className="text-xs font-medium text-ink-500">exkl. moms</span>
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink-400">{m.source}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <Link href="/kontakt#meddelande" className="font-semibold text-brand-blue hover:underline">Begär offert</Link>
                        {family && (
                          <Link href={`/modeller/${family.slug}`} className="font-semibold text-ink-700 hover:text-brand-blue">
                            Mer om {family.name.split(" ").slice(0, 2).join(" ")} →
                          </Link>
                        )}
                        <a href={m.specUrl} className="ml-auto text-xs text-ink-400 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">Specifikation ↗</a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="card mt-8 flex flex-col items-start justify-between gap-4 bg-ink-950 p-6 text-white sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-bold">Hittar du inte rätt konfiguration?</p>
                <p className="text-sm text-ink-300">Kyl, kran, servicebil eller specialpåbyggnad – vi bygger efter ert uppdrag.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/bygg-din-lastbil" className="btn-light">Bygg din lastbil</Link>
                <Link href="/kontakt#meddelande" className="btn-primary">Begär offert</Link>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-400">
              Priser kontrollerade 2026-08-28 mot Kihlströms och IVECO Sverige. Lokala leveransomkostnader kan tillkomma.{" "}
              <a href={ivecoCampaign.sourceUrl} className="underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">Se kampanjsidan ↗</a>
            </p>
          </div>
        </section>
      )}

      {brandCampaigns.length > 0 && (
        <section className="border-t border-ink-100 bg-white py-14 md:py-16" aria-labelledby="brand-campaigns">
          <div className="container-site">
            <p className="section-label">Kampanjer</p>
            <h2 id="brand-campaigns" className="h-section">Aktuellt inom {brand.name}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {brandCampaigns.map((c) => (
                <article key={c.id} className="card p-6">
                  <h3 className="text-lg font-bold tracking-tight text-ink-900">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{c.punchline}</p>
                  <ul className="mt-4 space-y-1 text-sm text-ink-600">
                    {c.facts.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: brand.color }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-4">
                    <Link href={c.cta.href} className="btn-ghost">{c.cta.label}</Link>
                    <a href={c.sourceUrl} className="link text-xs" target="_blank" rel="noopener noreferrer">Läs mer hos märket ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {brandStaff.length > 0 && (
        <section className="container-site py-14 md:py-16" aria-labelledby="brand-staff">
          <div className="max-w-2xl">
            <p className="section-label">Dina kontakter</p>
            <h2 id="brand-staff" className="h-section">{brand.name}-säljare i Smista och Spånga</h2>
          </div>
          <div className="mt-8">
            <StaffList people={brandStaff} />
          </div>
        </section>
      )}
    </>
  );
}
