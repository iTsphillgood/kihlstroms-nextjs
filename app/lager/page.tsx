import type { Metadata } from "next";
import Link from "next/link";
import StockExplorer from "../../components/StockExplorer";
import { stock } from "../../lib/data";

export const metadata: Metadata = {
  title: "Bilar i lager – nya och begagnade transportbilar i Stockholm",
  description:
    "Kihlströms aktuella fordonsannonser från IVECO, Isuzu och Maxus. Filtrera på märke, bränsle, kaross och skick – priser enligt annons."
};

export default function StockPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">Bilar i lager</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">Transportbilar och lätta lastbilar · Stockholm</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Transportbilar i lager</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Färdiga bilar som kan levereras inom några dagar – filtrera på kaross, bränsle och skick tills du hittar rätt.
          Hittar du ingen passande bil byggar vi en åt dig i stället. {stock.sourceNote}
        </p>
        <p className="mt-3 text-xs text-ink-400">Uppgifter verifierade {stock.verifiedAt}. Ring växeln 08-19 56 26 så bokar säljaren en visning – ofta samma dag.</p>
      </header>

      <div className="mt-10">
        <StockExplorer
          vehicles={stock.vehicles}
          sellerName={stock.contactSeller.name.split(" ")[0]}
          sellerEmail={stock.contactSeller.email}
        />
      </div>
    </div>
  );
}
