import type { Metadata } from "next";
import Link from "next/link";
import BuildWizard from "../../components/BuildWizard";
import { models } from "../../lib/data";

export const metadata: Metadata = {
  title: "Bygg din lastbil – behovsflöde för kaross och påbyggnad",
  description:
    "Beskriv arbetsdagen så föreslår vi rätt chassi, kaross och påbyggnad – kyl, kran, flak, servicebil eller dubbelhytt från IVECO, Isuzu och Maxus."
};

export default function BuildPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Bygg din lastbil</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Planera hela arbetsbilen</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Bygg din lastbil</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Utgå från last, påbyggnad och körprofil – inte från en broschyr. Guiden ställer fyra frågor, föreslår
          modeller och paketerar behovet i ett mejl till våra säljare. Vi tar sedan fram komplett offert med bil,
          påbyggnad, leveranstid och finansiering.
        </p>
      </header>

      <div className="mt-10">
        <BuildWizard models={models} sellerEmail="alexander@kihlstroms.se" sellerName="Alexander" />
      </div>

      <section className="mt-14 grid gap-4 sm:grid-cols-3" aria-label="Så arbetar vi">
        <div className="card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Steg 1</p>
          <h2 className="mt-1 text-[15px] font-bold text-ink-900">Beskriv arbetsdagen</h2>
          <p className="mt-1.5 text-sm text-ink-600">Körsträcka, last, släp, antal personer, laddning och påbyggnad.</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Steg 2</p>
          <h2 className="mt-1 text-[15px] font-bold text-ink-900">Jämför och provkör</h2>
          <p className="mt-1.5 text-sm text-ink-600">Vi går igenom lastutrymme, räckvidd, dragvikt och förarmiljö i modellerna som passar.</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Steg 3</p>
          <h2 className="mt-1 text-[15px] font-bold text-ink-900">Offert och beställning</h2>
          <p className="mt-1.5 text-sm text-ink-600">Bil, utförande, utrustning, pris och villkor – skriftligt, med leveransbesked.</p>
        </div>
      </section>
    </div>
  );
}
