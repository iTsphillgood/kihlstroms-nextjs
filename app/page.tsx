import Link from "next/link";
import HeroSlider, { type HeroSlide } from "../components/HeroSlider";
import ModelCard from "../components/ModelCard";
import StaffList from "../components/StaffList";
import LocationCards from "../components/LocationCards";
import StockImg from "../components/StockImg";
import { models, stock, campaigns, staff, locations, brandInfo, company } from "../lib/data";
import { formatSek, formatMileage } from "../lib/format";

const M = "https://cdn.sanity.io/images/mcx434c9/production/";
const I = "https://www.isuzusverige.se/media/";
const V = "https://edge.sitecorecloud.io/hedinitaban27a1-hedin8837-prod5c4b-4604/media/project/hedin/distribution-cars/hedinnordictruck/shared/images/";

const heroSlides: HeroSlide[] = [
  {
    id: "iveco-kampanj",
    brand: "IVECO",
    brandColor: "#1B5FAA",
    eyebrow: "Kampanj 2026 · t.o.m. 30 september",
    title: "20 färdiga kampanjbilar med tydligt företagspris",
    text: "Skåpbil, skåp & lift, flak, dubbelhytt och el – paket byggda på det svenska företag faktiskt beställer. Kihlströms är Sveriges största IVECO-återförsäljare.",
    price: "Från 419 000 kr exkl. moms",
    priceNote: "Kampanjpris",
    image: `${V}campaigns/sverige/9-new-models/header-img/iveco-daily-12m3---16_9---header/12m3skpbilfastlane/fastlanevanhero/fastlanevanhero.png?w=1600&q=85`,
    imageFallback: "/images/models/iveco-daily.png",
    imageAlt: "IVECO Daily skåpbil – kampanjmodell 2026",
    primary: { label: "Se alla 20 modellerna", href: "/marke/iveco" },
    secondary: { label: "Begär offert", href: "/kontakt#meddelande" },
    facts: ["20 st|Kampanjmodeller", "5 st|Eldrivna", "419 000 kr|Lägsta pris exkl. moms"]
  },
  {
    id: "isuzu-dmax",
    brand: "Isuzu",
    brandColor: "#C8102E",
    eyebrow: "Sveriges mest sålda pickup",
    title: "Isuzu D-Max – vald av proffs, tre år i rad",
    text: "Ny drivlina: 2,2-liters turbodiesel med 400 Nm och 8-växlad automat. Lasta upp till ett ton, dra 3 500 kg – HVO100-godkänd med 5 års garanti.",
    price: "Från 469 900 kr exkl. moms",
    priceNote: "Rek. kundpris",
    image: `${I}glmkbrd4/my26-dc-xrx-rolltop-n3-7107_v_hero_desktop.png?width=1920&height=1080&format=png&v=1dcdeb427866170`,
    imageFallback: "/images/models/isuzu-dmax-xrx.jpg",
    imageAlt: "Isuzu D-Max Double Cab pickup med RollTop",
    primary: { label: "Se D-Max-modellerna", href: "/marke/isuzu" },
    secondary: { label: "Boka provkörning", href: "/kontakt#meddelande" },
    facts: ["400 Nm|Vridmoment", "3 500 kg|Dragvikt", "ca 4 244 kr/år|Skatt med CNG-paket"]
  },
  {
    id: "isuzu-at35",
    brand: "Isuzu",
    brandColor: "#C8102E",
    eyebrow: "Kampanj · Arctic Trucks",
    title: "D-Max AT35 – äkta Arctic Trucks till kampanjpris",
    text: "35\" BFGoodrich KO2, AT-fälgar, 40 mm höjning, fyrkantsfäste med dragkrok samt godkännande och registrering – allt ingår i paketet.",
    price: "729 900 kr exkl. moms",
    priceNote: "Kampanj · ord. 738 900 kr",
    image: `${I}1dvdjid1/at35-my26.png?width=1600&height=994&format=png&v=1dcd2579a552010`,
    imageFallback: "/images/models/isuzu-dmax-at35.jpg",
    imageAlt: "Isuzu D-Max Arctic Trucks AT35",
    primary: { label: "Se Arctic Trucks-modellerna", href: "/modeller/isuzu-d-max-arctic-trucks" },
    secondary: { label: "Se AT37-kampanjen", href: "/kampanjer" },
    facts: ["35\"|BFGoodrich KO2", "40 mm|Höjning", "793 900 kr|AT37 kampanjpris"]
  },
  {
    id: "maxus-eterron",
    brand: "Maxus",
    brandColor: "#0E7490",
    eyebrow: "Elpickup med fyrhjulsdrift",
    title: "MAXUS eTerron 9 – 436 hk och 3,5 ton drag",
    text: "Elektrisk 4x4-pickup med 102 kWh batteri, upp till 432 km räckvidd, 236 liters frunk och fem säten. Byggd för krävande arbetsdagar.",
    price: "Från 699 900 kr exkl. moms",
    image: `${M}0c054dacc93acca171f517f9a3991bc7eac9b0cd-1920x1200.png?w=1600&q=85&auto=format`,
    imageFallback: "/images/models/maxus-eterron9.webp",
    imageAlt: "MAXUS eTerron 9 – elektrisk fyrhjulsdriven pickup",
    primary: { label: "Se eTerron 9", href: "/modeller/maxus-eterron-9" },
    secondary: { label: "Alla Maxus-modeller", href: "/marke/maxus" },
    facts: ["436 hk|Effekt", "432 km|Räckvidd", "3 500 kg|Dragvikt"]
  },
  {
    id: "iveco-edaily",
    brand: "IVECO",
    brandColor: "#1B5FAA",
    eyebrow: "Miljözon klass 3",
    title: "eDaily – enda eltransportbilen som får dra 3,5 ton",
    text: "Kom in i miljözonen med full last- och dragförmåga. Upp till 364 km WLTP, 8 års batterigaranti och assistans 24/7 i hela Europa.",
    price: "Från 679 000 kr exkl. moms",
    priceNote: "Kampanjpris",
    image: `${V}campaigns/norge/edaily-kampanj/stage-row/iveco-edaily-kassebil---stage-row---desktop.png?w=1600&iar=0`,
    imageFallback: "/images/models/iveco-edaily.png",
    imageAlt: "IVECO eDaily – elektrisk skåpbil",
    primary: { label: "Se eDaily", href: "/modeller/iveco-edaily" },
    secondary: { label: "Jämför eltransportbilar", href: "/modeller?bransle=El" },
    facts: ["364 km|Räckvidd WLTP", "3 500 kg|Dragvikt", "8 år|Batterigaranti"]
  }
];

const tasks = [
  {
    title: "Hitta en lagerbil",
    desc: "Nya och begagnade annonser – filtrera på skåp, flak, pickup eller el.",
    href: "/lager",
    icon: "M3 13h2l1.6-4.4A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.6L19 13h2M5.5 13h13a1.5 1.5 0 0 1 1.5 1.5V17h-2.8M6.3 17H3.5v-2.5A1.5 1.5 0 0 1 5 13"
  },
  {
    title: "Bygg din lastbil",
    desc: "Kyl, kran, flak eller servicebil – behovsflöde för hela arbetsbilen.",
    href: "/bygg-din-lastbil",
    icon: "M4 20h16M6 20V9l6-4 6 4v11M10 20v-5h4v5"
  },
  {
    title: "Service & verkstad",
    desc: "Auktoriserad för IVECO, Isuzu och Maxus – MECA för alla märken.",
    href: "/verkstad-service",
    icon: "M12 6v6l4 2M4.5 19a8.5 8.5 0 1 1 15 0"
  },
  {
    title: "Reservdelar",
    desc: "Sök del via registreringsnummer eller VIN – lagret har tusentals artiklar.",
    href: "/reservdelar",
    icon: "M10 4 4 6l2 14 6-2m0-14 6 2-2 14m-4-14v14M7 9l3 .8m4-1.6 3 .8"
  },
  {
    title: "Tillbehör & paket",
    desc: "Riktiga listpriser från Isuzu och Maxus – sätt ihop din offertlista.",
    href: "/tillbehor",
    icon: "M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M5 7h14l-1 13H6L5 7Z"
  },
  {
    title: "Kampanjer just nu",
    desc: "IVECO 20-modellerskampanj, T90 EV och MAX-paketet – aktuella priser.",
    href: "/kampanjer",
    icon: "M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
  }
];

export default function HomePage() {
  const featured = [
    "iveco-daily-skapbil",
    "isuzu-d-max-double-cab",
    "maxus-e-deliver-7",
    "maxus-eterron-9",
    "iveco-edaily",
    "maxus-t90-ev"
  ]
    .map((slug) => models.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const stockPreview = stock.vehicles.slice(0, 3);
  const salesStaff = staff.filter((s) => s.role.toLowerCase().includes("sälj") || s.role === "Försäljningschef").slice(0, 3);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="border-b border-ink-100 bg-white" aria-label="Våra märken">
        <div className="container-site grid gap-6 py-10 sm:grid-cols-3">
          {brandInfo.map((b) => (
            <Link
              key={b.id}
              href={`/marke/${b.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition hover:border-ink-100 hover:bg-ink-50"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-black text-white"
                style={{ backgroundColor: b.color }}
                aria-hidden="true"
              >
                {b.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-extrabold tracking-tight text-ink-900 group-hover:text-brand-blue">
                  {b.name}
                </span>
                <span className="block truncate text-xs text-ink-500">{b.tagline}</span>
              </span>
              <svg className="ml-auto shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-blue" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-site py-14 md:py-20" aria-labelledby="tasks-heading">
        <div className="max-w-2xl">
          <p className="section-label">Uppgiftsbaserad navigation</p>
          <h2 id="tasks-heading" className="h-section">Vad ska bilen göra i din verksamhet?</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Välj väg efter jobbet, inte efter märke. Vi hjälper er jämföra kapacitet, utförande och total ekonomi –
            och samma team tar hand om bilen genom hela livscykeln.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Link key={task.title} href={task.href} className="card group flex gap-4 p-5 transition hover:shadow-lifted">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-50 text-brand-blue">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={task.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[15px] font-bold text-ink-900 group-hover:text-brand-blue">{task.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-600">{task.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="models-heading">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-label">Utvalda modeller</p>
              <h2 id="models-heading" className="h-section">Riktiga priser på riktiga arbetsbilar</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Allt från {models.filter((m) => m.priceFrom).reduce((min, m) => Math.min(min, m.priceFrom ?? Infinity), Infinity).toLocaleString("sv-SE")} kr exkl. moms –
                {" "}med specifikationer och prislista från märkenas svenska sajter.
              </p>
            </div>
            <Link href="/modeller" className="btn-ghost">Alla {models.length} modeller →</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((m) => (
              <ModelCard key={m.slug} model={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20" aria-labelledby="stock-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="section-label">Bilar i lager</p>
            <h2 id="stock-heading" className="h-section">{stock.vehicles.length} aktuella annonser i Stockholm</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Nya och begagnade transportbilar i Smista och Spånga. Pris enligt annons, exklusive moms.
            </p>
          </div>
          <Link href="/lager" className="btn-ghost">Se hela lagret →</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {stockPreview.map((v) => (
            <article key={v.id} className="card flex flex-col overflow-hidden transition hover:shadow-lifted">
              <div className="relative bg-ink-100">
                <StockImg
                  src={v.image}
                  fallback={v.fallbackImage}
                  alt={`${v.brand} ${v.model} – ${v.title}`}
                  className="aspect-[16/10] w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink-950/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {v.brand}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight text-ink-900">{v.brand} {v.model}</h3>
                <p className="mt-1 text-sm text-ink-600">{v.title}</p>
                <p className="mt-2 text-xs text-ink-500">
                  {v.year} · {formatMileage(v.mileageKm)} · {v.fuel}
                </p>
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-100 pt-4 mt-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-ink-400">Pris i annonsen</p>
                    <p className="text-base font-extrabold text-ink-900">{formatSek(v.price)}</p>
                  </div>
                  <a href={v.adUrl} target="_blank" rel="noopener noreferrer" className="btn-dark !px-4 !py-2 text-[13px]">
                    Till annonsen ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink-950 py-14 text-white md:py-20" aria-labelledby="campaign-heading">
        <div className="container-site">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-300">Kampanjer just nu</p>
          <h2 id="campaign-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Aktuella erbjudanden från märkena
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {campaigns.map((c) => {
              const color = brandInfo.find((b) => b.id === c.brand)?.color ?? "#1B5FAA";
              return (
                <article key={c.id} className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-inset ring-white/10">
                  <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: color }}>
                    {c.brand === "iveco" ? "IVECO" : c.brand === "isuzu" ? "Isuzu" : "Maxus"}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-200">{c.punchline}</p>
                  <ul className="mt-4 space-y-1 text-sm text-ink-300">
                    {c.facts.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-4">
                    <Link href={c.cta.href} className="btn-light">{c.cta.label}</Link>
                    <a href={c.sourceUrl} className="text-xs text-ink-300 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                      Källa ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20" aria-labelledby="usp-heading">
        <div className="grid gap-4 rounded-3xl border border-ink-100 bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-4xl font-black tracking-tight text-brand-blue">1</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Sveriges största IVECO-återförsäljare</p>
          </div>
          <div>
            <p className="text-4xl font-black tracking-tight text-brand-blue">3</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Märken auktoriserade – IVECO, Isuzu och Maxus</p>
          </div>
          <div>
            <p className="text-4xl font-black tracking-tight text-brand-blue">2</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Fullserviceanläggningar – Smista och Spånga</p>
          </div>
          <div>
            <p className="text-4xl font-black tracking-tight text-brand-blue">{company.phone}</p>
            <p className="mt-1 text-sm font-semibold text-ink-800">Växel – direkt till rätt person samma dag</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" aria-labelledby="staff-heading">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-label">Människorna bakom</p>
              <h2 id="staff-heading" className="h-section">Prata direkt med en säljare – inga formulärkrångel</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                Riktiga personer med direktnummer och mejl. Ring växeln {company.phone} eller välj säljare direkt.
              </p>
            </div>
            <Link href="/kontakt" className="btn-ghost">All personal →</Link>
          </div>
          <div className="mt-8">
            <StaffList people={salesStaff} />
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20" aria-labelledby="locations-heading">
        <div className="max-w-2xl">
          <p className="section-label">Två anläggningar i Stockholm</p>
          <h2 id="locations-heading" className="h-section">Möt oss i Smista eller Spånga</h2>
        </div>
        <div className="mt-8">
          <LocationCards items={locations} />
        </div>
      </section>
    </>
  );
}
