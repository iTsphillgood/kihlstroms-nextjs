import type { Metadata } from "next";
import Link from "next/link";
import AccessoryCatalog from "../../components/AccessoryCatalog";
import { accessories } from "../../lib/data";

export const metadata: Metadata = {
  title: "Tillbehör – riktiga listpriser för Isuzu D-Max, Maxus och IVECO",
  description:
    "Tillbehörskatalog med artikelnummer och rekommenderade priser: Isuzu D-Max Style-paket, kåpor, dragkrok och Eberspächer, Maxus MAX-paket samt IVECO originaldelar."
};

export default function AccessoriesPage() {
  const notes: Record<string, string> = {
    isuzu: accessories.noteIsuzu,
    maxus: accessories.noteMaxus,
    iveco: accessories.noteIveco
  };

  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Tillbehör</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Utrusta arbetsbilen</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tillbehör med riktiga priser – sätt ihop din offert
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Katalogen bygger på offentliga prislistor från Isuzu Sverige och Maxus Sverige med artikelnummer, och
          IVECO:s delar- och tillbehörsprogram. Bocka i det du vill ha pris på – så blir ett färdigt mejl till våra
          säljare. Monteringen görs i vår verkstad i Smista eller Spånga.
        </p>
      </header>

      <div className="mt-10">
        <AccessoryCatalog brands={accessories.brands} notes={notes} quoteEmail="philip@kihlstroms.se" />
      </div>
    </div>
  );
}
