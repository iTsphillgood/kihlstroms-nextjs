import type { Metadata } from "next";
import Link from "next/link";
import { company, brandInfo, models, stock } from "../../lib/data";

export const metadata: Metadata = {
  title: "Om Kihlströms – Sveriges största IVECO-återförsäljare",
  description:
    "Kihlströms Transport & Lastbilscenter är auktoriserad återförsäljare och verkstad för IVECO, Isuzu och Maxus med två anläggningar i Stockholm."
};

export default function AboutPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Om oss</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Om Kihlströms</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Vi håller Stockholms arbetsbilar i arbete
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          {company.pitch} Vi erbjuder HVO, biogas, diesel och eldrivna transportbilar – och är auktoriserade
          återförsäljare och verkstad för IVECO, Isuzu och Maxus.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {company.claims.map((claim) => (
          <div key={claim} className="card p-5">
            <p className="text-sm font-bold text-ink-900">{claim}</p>
          </div>
        ))}
      </div>

      <section className="mt-14 grid gap-10 lg:grid-cols-2" aria-labelledby="marca-heading">
        <div>
          <p className="section-label">Tre märken, ett team</p>
          <h2 id="marca-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
            Auktoriserad för {brandInfo.map((b) => b.name).join(", ")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
            Det gör att vi kan jämföra ärligt mellan märkena – {models.length} modellfamiljer med svenska priser och
            för närvarande {stock.vehicles.length} annonserade bilar i lagret. Samma säljteam tar er från behov till
            provkörning, offert och leverans, och vår MECA-verkstad tar över ansvaret efter det.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {brandInfo.map((b) => (
              <Link key={b.id} href={`/marke/${b.id}`} className="btn-ghost">{b.name} →</Link>
            ))}
          </div>
        </div>
        <div className="card bg-ink-50 p-7">
          <h3 className="text-lg font-bold tracking-tight text-ink-900">Verkstad för alla märken</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            Kihlströms är Stockholms kompletta verkstad för yrkestrafik. Vi är auktoriserade för IVECO, Isuzu och
            Maxus och vår MECA-verkstad servar och reparerar alla marknadens märken – bland annat Volvo, Scania,
            Mercedes-Benz, Volkswagen och Ford. Vi hjälper er också med reservdelsförfrågningar och med service och
            reparationer för transportfordon och husbil.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/verkstad-service" className="btn-primary">Boka service</Link>
            <Link href="/reservdelar" className="btn-ghost">Reservdelar</Link>
          </div>
        </div>
      </section>

      <section className="mt-14 card overflow-hidden" aria-labelledby="karriar-heading">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="p-8">
            <p className="section-label">Karriär</p>
            <h2 id="karriar-heading" className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              Är du vår nästa stjärnsäljare?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              Kihlströms växer i Stockholm. Har du rätt driv, fordonsintresse och förmåga att skapa långsiktiga
              kundrelationer kan du skicka en spontanansökan direkt via formuläret.
            </p>
            <Link href="/kontakt#meddelande" className="btn-primary mt-5">Skicka intresseanmälan →</Link>
          </div>
          <div
            className="hidden min-h-[220px] md:block"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(27,95,170,.35), rgba(10,24,32,.75)), repeating-linear-gradient(-45deg, rgba(255,255,255,.04) 0 14px, transparent 14px 28px)"
            }}
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}
