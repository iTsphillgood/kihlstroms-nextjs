import type { Location } from "../lib/data";

export default function LocationCards({ items }: { items: Location[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((loc) => (
        <section key={loc.id} id={loc.id} className="card overflow-hidden scroll-mt-24">
          <div
            className="flex h-28 items-end bg-ink-900 p-5"
            style={{
              backgroundImage:
                "linear-gradient(115deg, rgba(27,95,170,.55), rgba(10,24,32,.9)), repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0 12px, transparent 12px 24px)"
            }}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300">{loc.region}</p>
              <h3 className="text-xl font-extrabold text-white">{loc.name}</h3>
            </div>
          </div>
          <div className="p-5">
            <address className="not-italic text-sm text-ink-700">
              {loc.address}, {loc.city}
            </address>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 text-ink-400">Försäljning</dt>
                <dd className="font-medium text-ink-800">{loc.salesHours}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 text-ink-400">Verkstad</dt>
                <dd className="font-medium text-ink-800">{loc.workshopHours}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={loc.phoneHref} className="btn-dark !px-4 !py-2 text-[13px]">Ring {loc.phone}</a>
              <a href={`mailto:${loc.email}`} className="btn-ghost !px-4 !py-2 text-[13px]">{loc.email}</a>
              <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-[13px]">Google Maps ↗</a>
              <a href={loc.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-[13px]">Waze ↗</a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
