import type { Metadata } from "next";
import Link from "next/link";
import { campaigns, brandInfo, company } from "../../lib/data";

export const metadata: Metadata = {
  title: "Kampanjer – aktuella kampanjpriser på transportbilar",
  description:
    "IVECO kampanj 2026 med 20 modeller från 419 000 kr, Maxus T90 EV till 299 900 kr och MAX-paketet till T60. Aktuella erbjudanden hos Kihlströms."
};

export default function CampaignsPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Kampanjer</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Aktuellt</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Kampanjer just nu</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Alla kampanjpriser kommer från märkenas svenska kanaler och anges exklusive moms. Ring växeln{" "}
          {company.phone} eller mejla så räknar vi på leveranstid och finansiering.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {campaigns.map((c) => {
          const color = brandInfo.find((b) => b.id === c.brand)?.color ?? "#1B5FAA";
          return (
            <article key={c.id} className="card overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: color }} aria-hidden="true" />
              <div className="p-7">
                <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: color }}>
                  {c.brand === "iveco" ? "IVECO" : c.brand === "isuzu" ? "Isuzu" : "Maxus"}
                </span>
                <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink-900">{c.title}</h2>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-ink-700">{c.punchline}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink-600">
                  {c.facts.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" style={{ color }} aria-hidden="true">
                        <path d="m3 8.5 3.2 3L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link href={c.cta.href} className="btn-primary">{c.cta.label}</Link>
                  <a href={c.sourceUrl} className="link text-xs" target="_blank" rel="noopener noreferrer">Källa ↗</a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
