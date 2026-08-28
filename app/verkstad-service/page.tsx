import type { Metadata } from "next";
import Link from "next/link";
import { locations, company } from "../../lib/data";
import LocationCards from "../../components/LocationCards";
import ServiceForm from "../../components/ServiceForm";

export const metadata: Metadata = {
  title: "Verkstad & service – auktoriserad för IVECO, Isuzu och Maxus",
  description:
    "Boka service i Kihlströms verkstad i Smista eller Spånga. Auktoriserade för IVECO, Isuzu och Maxus – MECA-verkstad som servar alla märken, även husbil."
};

const services = [
  { title: "Servicerådgivning", desc: "Vi hamnar rätt direkt – redan vid första kontakten. Ring växeln eller skicka ett ärende.", target: "verkstad" },
  { title: "Boka service", desc: "Vanlig service, stor service eller kamrem – bokning samma vecka där det finns luckor.", target: "verkstad" },
  { title: "Skadeverkstad", desc: "Vi tar emot skador och samordnar med försäkringsbolag så att bilen kommer ut i arbete igen.", target: "verkstad" },
  { title: "Husbil & specialfordon", desc: "Vi servar och reparerar transportfordon och husbil – oavsett märke.", target: "verkstad" },
  { title: "Påbyggnad & inredning", desc: "Kyl, kran, flak, servicebil eller dubbelhytt – vi bygger efter ert uppdrag.", target: "bygg" },
  { title: "Reservdelar", desc: "Originaldelar för IVECO, Isuzu och Maxus samt förfrågningar för övriga märken.", target: "parts" }
];

export default function ServicePage() {
  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Verkstad & service</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Håll bilen i arbete</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Verkstad & service</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Kihlströms är Stockholms kompletta verkstad för yrkestrafik. Vi är auktoriserade för IVECO, Isuzu och Maxus
          och vår MECA-verkstad servar och reparerar alla marknadens märken – bland annat Volvo, Scania,
          Mercedes-Benz, Volkswagen och Ford. Vi tar även hand om husbil.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={company.phoneHref} className="btn-primary">Ring växeln {company.phone}</a>
          <a href="#boka" className="btn-ghost">Skicka bokningsärende</a>
        </div>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="card p-5">
            <h2 className="text-[15px] font-bold text-ink-900">{s.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.desc}</p>
            {s.target === "parts" && (
              <Link href="/reservdelar" className="link mt-3 inline-block text-sm font-semibold">Till reservdelar →</Link>
            )}
            {s.target === "bygg" && (
              <Link href="/bygg-din-lastbil" className="link mt-3 inline-block text-sm font-semibold">Bygg din lastbil →</Link>
            )}
            {s.target === "verkstad" && (
              <a href="#boka" className="link mt-3 inline-block text-sm font-semibold">Gör en bokning →</a>
            )}
          </article>
        ))}
      </div>

      <section id="boka" className="mt-14 scroll-mt-24" aria-labelledby="boka-heading">
        <p className="section-label">Bokning</p>
        <h2 id="boka-heading" className="h-section">Skicka ett serviceärende</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
          Ange registreringsnummer, ärende och anläggning – servicerådgivaren återkommer med tidsförslag,
          oftast samma arbetsdag. Akuta ärenden: ring växeln{" "}
          <a href={company.phoneHref} className="link font-semibold">{company.phone}</a>.
        </p>
        <div className="mt-6">
          <ServiceForm locations={locations} />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="anlaggningar-heading">
        <p className="section-label">Anläggningar</p>
        <h2 id="anlaggningar-heading" className="h-section">Verkstad i Smista och Spånga</h2>
        <div className="mt-6">
          <LocationCards items={locations} />
        </div>
      </section>
    </div>
  );
}
