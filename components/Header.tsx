"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavGroup {
  label: string;
  columns: {
    heading: string;
    links: { label: string; href: string; desc?: string }[];
  }[];
  footer?: { label: string; href: string };
}

const vehicleMenu: NavGroup = {
  label: "Fordon",
  columns: [
    {
      heading: "Våra märken",
      links: [
        { label: "IVECO", href: "/marke/iveco", desc: "Daily, eDaily, Eurocargo, S-Way" },
        { label: "Isuzu", href: "/marke/isuzu", desc: "D-Max, Arctic Trucks, BEV" },
        { label: "Maxus", href: "/marke/maxus", desc: "Skåpbilar, chassin, pickuper" }
      ]
    },
    {
      heading: "Hitta rätt bil",
      links: [
        { label: "Bilar i lager", href: "/lager", desc: "Nya och begagnade annonser" },
        { label: "Alla modeller", href: "/modeller", desc: "Jämför hela programmet" },
        { label: "Kampanjer", href: "/kampanjer", desc: "Aktuella kampanjpriser" },
        { label: "Bygg din lastbil", href: "/bygg-din-lastbil", desc: "Behovsflöde för påbyggnad" }
      ]
    },
    {
      heading: "Populärt just nu",
      links: [
        { label: "Eltransportbilar", href: "/modeller?bransle=El" },
        { label: "Pickuper", href: "/modeller?kategori=Pickup" },
        { label: "Kyl och flak", href: "/bygg-din-lastbil" },
        { label: "Tillbehör", href: "/tillbehor" }
      ]
    }
  ],
  footer: { label: "Osäker på modellval? Ring växeln 08-19 56 26 →", href: "/kontakt" }
};

const serviceMenu: NavGroup = {
  label: "Verkstad & service",
  columns: [
    {
      heading: "Verkstad",
      links: [
        { label: "Boka service", href: "/verkstad-service", desc: "IVECO, Isuzu, Maxus + alla märken" },
        { label: "Reservdelar", href: "/reservdelar", desc: "Sök del via reg.nr eller VIN" }
      ]
    },
    {
      heading: "Anläggningar",
      links: [
        { label: "Syd – Smista", href: "/kontakt#smista", desc: "Mån–Fre 07–16" },
        { label: "Norr – Spånga", href: "/kontakt#spanga", desc: "Mån–Fre 07–16" }
      ]
    }
  ],
  footer: { label: "Akut driftstopp? Ring växeln 08-19 56 26 →", href: "tel:+468195626" }
};

const aboutMenu: NavGroup = {
  label: "Om oss",
  columns: [
    {
      heading: "Kihlströms",
      links: [
        { label: "Om Kihlströms", href: "/om-oss", desc: "Sveriges största IVECO-återförsäljare" },
        { label: "Kontakt & personal", href: "/kontakt", desc: "Rätt person för varje ärende" }
      ]
    }
  ]
};

const menus = [vehicleMenu, serviceMenu, aboutMenu];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/60 bg-ink-950/95 text-white backdrop-blur supports-[backdrop-filter]:bg-ink-950/80">
      <div className="container-site flex h-16 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Kihlströms – startsidan">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue font-black tracking-tight">K</span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[15px] font-extrabold tracking-tight">KIHLSTRÖMS</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-300">
              Transport & Lastbilscenter
            </span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Huvudmeny">
          {menus.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                aria-expanded={openMenu === menu.label}
                aria-haspopup="true"
                onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
                onFocus={() => setOpenMenu(menu.label)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  openMenu === menu.label ? "bg-white/10 text-white" : "text-ink-100 hover:bg-white/5 hover:text-white"
                }`}
              >
                {menu.label}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`transition-transform ${openMenu === menu.label ? "rotate-180" : ""}`}>
                  <path d="M2 4.5 6 8.5 10 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openMenu === menu.label && (
                <div className="absolute left-0 top-full w-max min-w-[560px] animate-fade-in pt-2">
                  <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white text-ink-900 shadow-lifted">
                    <div className="grid grid-cols-2 gap-6 p-6" style={{ gridTemplateColumns: `repeat(${Math.min(menu.columns.length, 3)}, minmax(180px, 1fr))` }}>
                      {menu.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">{col.heading}</p>
                          <ul className="space-y-1">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link href={link.href} className="group block rounded-lg px-2.5 py-1.5 transition hover:bg-ink-50">
                                  <span className="text-sm font-semibold text-ink-800 group-hover:text-brand-blue">{link.label}</span>
                                  {link.desc && <span className="block text-xs text-ink-500">{link.desc}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {menu.footer && (
                      <Link
                        href={menu.footer.href}
                        className="flex items-center justify-between border-t border-ink-100 bg-ink-50 px-6 py-3.5 text-sm font-semibold text-ink-800 transition hover:bg-ink-100"
                      >
                        {menu.footer.label}
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/lager" className="rounded-lg px-3.5 py-2 text-sm font-semibold text-ink-100 transition hover:bg-white/5 hover:text-white">
            Bilar i lager
          </Link>
          <Link href="/kampanjer" className="rounded-lg px-3.5 py-2 text-sm font-semibold text-ink-100 transition hover:bg-white/5 hover:text-white">
            Kampanjer
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="tel:+468195626"
            className="hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-white/5 md:flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 5c0-.6.4-1 1-1h2.6c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.4 1l-1.6 1c.9 2.1 2.6 3.8 4.7 4.7l1-1.6c.2-.3.6-.5 1-.4l3 .8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1C9.8 20 4 14.2 4 7V5Z" fill="currentColor" />
            </svg>
            08-19 56 26
          </a>
          <Link href="/kontakt#meddelande" className="hidden btn-primary !py-2 !px-4 sm:inline-flex">
            Kontakta oss
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-lg text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Öppna menyn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/70" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white p-6 shadow-lifted">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-base font-extrabold tracking-tight text-ink-950">Meny</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg text-ink-600 hover:bg-ink-50"
                aria-label="Stäng menyn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="space-y-6" aria-label="Mobilmeny">
              {menus.map((menu) => (
                <div key={menu.label}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">{menu.label}</p>
                  <ul className="space-y-0.5">
                    {menu.columns.flatMap((c) => c.links).map((link) => (
                      <li key={link.label + link.href}>
                        <Link href={link.href} className="block rounded-lg px-2.5 py-2 text-[15px] font-semibold text-ink-800 hover:bg-ink-50">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="space-y-3 border-t border-ink-100 pt-6">
                <a href="tel:+468195626" className="btn-dark w-full">
                  Ring växeln 08-19 56 26
                </a>
                <Link href="/kontakt#meddelande" className="btn-primary w-full">
                  Skicka meddelande
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
