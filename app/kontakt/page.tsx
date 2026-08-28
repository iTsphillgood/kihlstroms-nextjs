import type { Metadata } from "next";
import Link from "next/link";
import { company, locations, staff } from "../../lib/data";
import ContactForm from "../../components/ContactForm";
import LocationCards from "../../components/LocationCards";
import StaffList from "../../components/StaffList";

export const metadata: Metadata = {
  title: "Kontakt och personal – Smista och Spånga",
  description:
    "Kontakta Kihlströms Transport & Lastbilscenter. Ring växeln 08-19 56 26 eller hitta rätt person för försäljning, verkstad, service, reservdelar och ekonomi."
};

export default function ContactPage() {
  const sales = staff.filter((s) => s.role.toLowerCase().includes("sälj") || s.role === "Försäljningschef");
  const workshop = staff.filter((s) =>
    s.role.includes("Servicerådgivare") || s.role.includes("Verkmästare") || s.role.includes("Verkstadschef")
  );
  const partsEconomy = staff.filter((s) => s.role === "Reservdelar" || s.role.includes("Ekonomi") || s.role.includes("direktör"));

  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Kontakt</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">{company.tagline}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Kontakta Kihlströms</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Två fullserviceanläggningar i Stockholm, ett tydligt mål: att hålla din transportbil, pickup eller lastbil
          i arbete. Här hittar du rätt person för försäljning, verkstad, service, reservdelar och ekonomi.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={company.phoneHref} className="btn-primary">Ring växeln {company.phone}</a>
          <a href="#meddelande" className="btn-ghost">Skicka meddelande</a>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="anlaggningar-heading">
        <h2 id="anlaggningar-heading" className="text-xl font-bold tracking-tight sm:text-2xl">Anläggningar</h2>
        <div className="mt-6">
          <LocationCards items={locations} />
        </div>
      </section>

      <section id="meddelande" className="mt-14 scroll-mt-24" aria-labelledby="form-heading">
        <p className="section-label">Kontakt</p>
        <h2 id="form-heading" className="text-xl font-bold tracking-tight sm:text-2xl">Skicka ett meddelande till oss</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
          Fyll i formuläret så återkommer vi så snart vi kan – oftast samma arbetsdag. Du kan även ringa växeln på{" "}
          <a href={company.phoneHref} className="link font-semibold">{company.phone}</a>.
        </p>
        <div className="mt-6">
          <ContactForm staff={staff} />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="säljare-heading">
        <p className="section-label">Bilförsäljning</p>
        <h2 id="säljare-heading" className="text-xl font-bold tracking-tight sm:text-2xl">Våra säljare</h2>
        <div className="mt-6">
          <StaffList people={sales} />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="verkstad-personal">
        <p className="section-label">Verkstad & service</p>
        <h2 id="verkstad-personal" className="text-xl font-bold tracking-tight sm:text-2xl">Servicerådgivare och verkstadsledare</h2>
        <div className="mt-6">
          <StaffList people={workshop} />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="admin-personal">
        <p className="section-label">Reservdelar, ekonomi & ledning</p>
        <h2 id="admin-personal" className="text-xl font-bold tracking-tight sm:text-2xl">Administration och reservdelar</h2>
        <div className="mt-6">
          <StaffList people={partsEconomy} />
        </div>
      </section>
    </div>
  );
}
