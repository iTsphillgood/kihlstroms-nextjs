import Link from "next/link";
import { company, locations, brandInfo } from "../lib/data";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue font-black text-white">K</span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-extrabold tracking-tight text-white">KIHLSTRÖMS</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-400">
                Transport & Lastbilscenter
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300">
            {company.pitch}
          </p>
          <div className="mt-5 flex flex-col gap-1.5 text-sm">
            <a href={company.phoneHref} className="font-bold text-white hover:text-brand-blue">
              Växel {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="text-ink-300 hover:text-white">
              {company.email}
            </a>
          </div>
        </div>

        <nav aria-label="Märken">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-400">Märken</p>
          <ul className="space-y-2.5 text-sm">
            {brandInfo.map((b) => (
              <li key={b.id}>
                <Link href={`/marke/${b.id}`} className="flex items-center gap-2 font-semibold text-white hover:text-brand-blue">
                  <BrandLogo brand={b.id} dark className="h-4" alt="" />
                </Link>
                <p className="text-xs text-ink-400">{b.tagline}</p>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Snablänkar">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-400">Snabbt</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/lager" className="hover:text-white">Bilar i lager</Link></li>
            <li><Link href="/modeller" className="hover:text-white">Alla modeller</Link></li>
            <li><Link href="/kampanjer" className="hover:text-white">Kampanjer</Link></li>
            <li><Link href="/tillbehor" className="hover:text-white">Tillbehör</Link></li>
            <li><Link href="/verkstad-service" className="hover:text-white">Boka service</Link></li>
            <li><Link href="/reservdelar" className="hover:text-white">Reservdelar</Link></li>
            <li><Link href="/bygg-din-lastbil" className="hover:text-white">Bygg din lastbil</Link></li>
            <li><Link href="/om-oss" className="hover:text-white">Om oss</Link></li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-400">Anläggningar</p>
          <ul className="space-y-4 text-sm">
            {locations.map((loc) => (
              <li key={loc.id}>
                <p className="font-semibold text-white">{loc.name}</p>
                <p className="text-ink-300">{loc.address}, {loc.city}</p>
                <p className="text-xs text-ink-400">Försäljning {loc.salesHours.replace("Mån–Fre ", "")}</p>
                <div className="mt-1.5 flex gap-3 text-xs">
                  <a href={loc.mapsUrl} className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    Google Maps
                  </a>
                  <a href={loc.wazeUrl} className="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">
                    Waze
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. Priser och utbud kan ändras – kontakta oss för aktuell offert.</p>
          <p>Alla priser exklusive moms om inget annat anges.</p>
        </div>
      </div>
    </footer>
  );
}
