import type { Metadata } from "next";
import Link from "next/link";
import { staff } from "../../lib/data";

export const metadata: Metadata = {
  title: "Reservdelar – sök del via reg.nr eller VIN",
  description:
    "Reservdelar för IVECO, Isuzu och Maxus – och förfrågningar för övriga transportbilsmärken. Kontakta Andreas i Smista eller Marcin i Spånga."
};

export default function PartsPage() {
  const partsStaff = staff.filter((s) => s.role === "Reservdelar");

  const mailtoParts = (to: string, loc: string) => {
    const params = new URLSearchParams({
      subject: "Reservdelsförfrågan",
      body: [
        "Hej,",
        "",
        "Jag söker följande del:",
        "",
        "Registreringsnummer / VIN:",
        "Fordonsmodell och årsmodell:",
        "Delbensämning (vad behövs):",
        "Företag:",
        "Namn:",
        "Telefon:"
      ].join("\n")
    });
    return `mailto:${to}?${params.toString()}`;
  };

  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Reservdelar</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Originaldelar – snabbt</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Reservdelar</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Vi erbjuder reservdelar för IVECO, Isuzu och Maxus samt tar emot reservdelsförfrågningar för övriga
          transportbilsmärken. Kontakta oss så hjälper vi er att hitta rätt delar snabbt och smidigt – lagret i
          Smista omfattar flera tusen artiklar.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {partsStaff.map((person) => (
          <article key={person.name} className="card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">Reservdelar · {person.location}</p>
            <h2 className="mt-2 text-xl font-bold text-ink-900">{person.name}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{person.bio}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a href={mailtoParts(person.email, person.location)} className="btn-primary">Mejla reservdelsförfrågan</a>
              <a href={person.phoneHref} className="btn-ghost">Ring {person.phone}</a>
            </div>
          </article>
        ))}
      </div>

      <section className="card mt-8 bg-ink-50 p-6 sm:p-8" aria-labelledby="parts-info">
        <h2 id="parts-info" className="text-lg font-bold tracking-tight text-ink-900">Så snabbt går det till</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          <li className="rounded-xl bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Steg 1</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Mejla registreringsnummer eller VIN och vad du behöver.</p>
          </li>
          <li className="rounded-xl bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Steg 2</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Vi letar upp rätt originaldel och svarar med pris och leveranstid.</p>
          </li>
          <li className="rounded-xl bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Steg 3</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Upphämtning i Smista eller Spånga – eller montering i verkstaden.</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
