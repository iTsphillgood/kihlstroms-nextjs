export type BrandId = "iveco" | "isuzu" | "maxus";

export interface Variant {
  name: string;
  code?: string;
  price: number | null;
  engine?: string;
  note?: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Model {
  slug: string;
  brand: BrandId;
  name: string;
  category: string;
  fuel: string;
  summary: string;
  suitedFor: string[];
  benefits?: string[];
  priceFrom: number | null;
  priceNote?: string;
  badge?: string;
  image: string;
  imageFallback?: string;
  gallery: string[];
  variants: Variant[];
  specs: Spec[];
  sourceUrl: string;
  campaignSource?: string;
}

export interface CompanyPromise {
  title: string;
  desc: string;
  icon: string;
}

export interface Staff {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  brands: string[];
  bio: string;
}

export interface Location {
  id: string;
  name: string;
  region: string;
  address: string;
  city: string;
  salesHours: string;
  workshopHours: string;
  email: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  wazeUrl: string;
}

export interface BrandInfo {
  id: BrandId;
  name: string;
  tagline: string;
  description: string;
  color: string;
  image: string;
  imageFallback?: string;
  guidelineUrl?: string;
  sourceUrl: string;
  highlights: string[];
}

export interface StockVehicle {
  id: string;
  brand: string;
  model: string;
  title: string;
  body: string;
  condition: string;
  year: number;
  mileageKm?: number;
  fuel: string;
  rangeKm?: number;
  transmission?: string;
  price: number;
  adUrl: string;
  image: string;
  fallbackImage: string;
}

export interface AccessoryItem {
  art: string | null;
  name: string;
  price: number | null;
  regularPrice?: number;
  desc: string;
}

export interface AccessoryCategory {
  name: string;
  items: AccessoryItem[];
}

export interface AccessoryBrand {
  id: BrandId;
  name: string;
  sourceUrl: string;
  categories: AccessoryCategory[];
}

export interface Campaign {
  id: string;
  brand: BrandId;
  title: string;
  punchline: string;
  facts: string[];
  cta: { label: string; href: string };
  sourceUrl: string;
}

import companyJson from "../data/company.json";
import modelsJson from "../data/models.json";
import stockJson from "../data/stock.json";
import accessoriesJson from "../data/accessories.json";
import campaignsJson from "../data/campaigns.json";

export const company = companyJson.company as { name: string; shortName: string; tagline: string; pitch: string; phone: string; phoneHref: string; email: string; claims: string[]; brands: string[]; promises: CompanyPromise[] };
export const locations = companyJson.locations as Location[];
export const staff = companyJson.staff as Staff[];
export const brandInfo = companyJson.brands as BrandInfo[];
export const models = modelsJson as Model[];
export const stock = stockJson as {
  verifiedAt: string;
  sourceNote: string;
  contactSeller: { name: string; email: string };
  vehicles: StockVehicle[];
};
export const accessories = accessoriesJson as {
  noteIsuzu: string;
  noteMaxus: string;
  noteIveco: string;
  brands: AccessoryBrand[];
};
export const campaigns = campaignsJson as Campaign[];

export function getModel(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

export function getBrand(id: string): BrandInfo | undefined {
  return brandInfo.find((b) => b.id === id);
}

export function brandName(id: BrandId): string {
  return id === "iveco" ? "IVECO" : id === "isuzu" ? "Isuzu" : "Maxus";
}

export function brandColor(id: BrandId): string {
  return getBrand(id)?.color ?? "#1B5FAA";
}

export function modelsByBrand(id: BrandId): Model[] {
  return models.filter((m) => m.brand === id);
}
