import type { BrandId } from "../lib/data";
import { brandInfo } from "../lib/data";

/**
 * Officiell varumärkeslogotyp (originallänkad). På mörk bakgrund inverteras
 * mörka logotyper (IVECO:s svarta svg) via CSS-filter.
 */
export default function BrandLogo({
  brand,
  dark = false,
  className = "h-6",
  alt
}: {
  brand: BrandId;
  dark?: boolean;
  className?: string;
  alt?: string;
}) {
  const info = brandInfo.find((b) => b.id === brand);
  if (!info?.logoUrl) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={info.logoUrl}
      alt={alt ?? `${info.name}-logotyp`}
      className={`${className} w-auto object-contain ${dark && brand === "iveco" ? "invert" : ""}`}
      loading="lazy"
    />
  );
}
