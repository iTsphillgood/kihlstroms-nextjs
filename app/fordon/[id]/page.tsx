import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VehicleDetail2027 from "../../../components/VehicleDetail2027";
import { stock } from "../../../lib/data";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return stock.vehicles.map((vehicle) => ({ id: vehicle.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const vehicle = stock.vehicles.find((item) => item.id === params.id);
  if (!vehicle) return { title: "Bilen hittades inte", robots: { index: false } };
  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} – ${vehicle.body} | Kihlströms`,
    description: `Se bilder, specifikationer, tillval och prisinformation för ${vehicle.brand} ${vehicle.model}. Begär offert eller boka provkörning i Stockholm.`,
    // Lagermaterialet är inte realtidsverifierat. Slå på indexering först efter lagersynk.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} hos Kihlströms`,
      description: vehicle.title,
      images: [{ url: vehicle.image }]
    }
  };
}

export default function VehiclePage({ params }: Props) {
  const vehicle = stock.vehicles.find((item) => item.id === params.id);
  if (!vehicle) notFound();
  return (
    <div className="bg-[#f8fafc]">
      <div className="container-site pt-6">
        <nav aria-label="Brödsmulor" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-700">Hem</Link><span aria-hidden="true">/</span>
          <Link href="/lager" className="hover:text-blue-700">Bilar i lager</Link><span aria-hidden="true">/</span>
          <span className="text-slate-900">{vehicle.brand} {vehicle.model}</span>
        </nav>
      </div>
      <VehicleDetail2027 vehicle={vehicle} verifiedAt={stock.verifiedAt} sellerEmail={stock.contactSeller.email} />
    </div>
  );
}
