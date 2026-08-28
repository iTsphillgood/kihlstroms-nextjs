import type { Metadata } from "next";
import Link from "next/link";
import ModelGrid from "../../components/ModelGrid";
import { models } from "../../lib/data";

export const metadata: Metadata = {
  title: "Alla modeller – IVECO, Isuzu och Maxus",
  description:
    "Jämför alla transportbilar, chassin, pickuper och lastbilar från IVECO, Isuzu och Maxus – med svenska priser och specifikationer."
};

export default function ModelsPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Modeller</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Hela programmet</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Alla modeller – välj efter jobbet
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          {models.length} modellfamiljer från IVECO, Isuzu och Maxus med svenska frånpriser och nyckeltal.
          Filtrera på kaross eller drivlina, sortera på pris och gå vidare till modellens variants priser.
        </p>
      </header>

      <div className="mt-10">
        <ModelGrid models={models} />
      </div>
    </div>
  );
}
