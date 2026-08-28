import type { Metadata } from "next";
import Link from "next/link";
import StockExplorer from "../../../components/StockExplorer";
import { stock } from "../../../lib/data";

export const metadata: Metadata = {
  title: "IVECO lagerbilar – Daily, eDaily, eSuperJolly och Eurocargo i Stockholm",
  description:
    "Alla IVECO-lagerbilar hos Kihlströms: Daily Fastlane och Proline, skåp & lift, kylbilar, flak, CNG-miljöbilar och eldrivna eDaily – priser exkl. moms enligt annons."
};

export default function IvecoStockPage() {
  const iveco = stock.vehicles.filter((v) => v.brand === "IVECO");
  const fastlane = iveco.filter((v) => /fastlane/i.test(v.title));
  const cheapest = iveco.filter((v) => v.price).reduce((min, v) => ((v.price ?? 0) < (min.price ?? 0) ? v : min), iveco[0]);

  return (
    <div className="container-site py-12 md:py-16">
      <nav aria-label="Brödsmulor" className="text-sm text-ink-500">
        <Link href="/" className="hover:text-brand-blue">Startsida</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href="/lager" className="hover:text-brand-blue">Bilar i lager</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="font-medium text-ink-800">IVECO</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="section-label">IVECO · Smista och Spånga</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{iveco.length} IVECO-lagerbilar – klara att levereras</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Daily Fastlane och Proline, skåp &amp; lift, kylbilar, flak, CNG-miljöbilar och eldrivna eDaily –
          alla annonser med pris exkl. moms och bild från den aktuella annonsen. Hittar du inte rätt
          konfiguration byggar vi en Daily efter ert uppdrag i stället.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <p><span className="font-bold text-ink-900">{fastlane.length} st</span> <span className="text-ink-500">Fastlane i lager</span></p>
          <p><span className="font-bold text-ink-900">Från {new Intl.NumberFormat("sv-SE").format(cheapest.price ?? 0)} kr</span> <span className="text-ink-500">exkl. moms</span></p>
          <p><span className="font-bold text-ink-900">{iveco.filter((v) => v.fuel === "El").length} st</span> <span className="text-ink-500">eldrivna</span></p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#lager" className="btn-primary">Se alla {iveco.length} annonserna</a>
          <Link href="/marke/iveco" className="btn-ghost">Jämför alla 20 kampanjmodellerna</Link>
        </div>
      </header>

      <div className="mt-10" id="lager">
        <StockExplorer
          vehicles={iveco}
          sellerName={stock.contactSeller.name.split(" ")[0]}
          sellerEmail={stock.contactSeller.email}
        />
      </div>
    </div>
  );
}
