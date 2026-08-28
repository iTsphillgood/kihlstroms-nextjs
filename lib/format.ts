export function formatSek(value: number | null | undefined, opts?: { suffix?: string }): string {
  if (value == null) return "Pris på förfrågan";
  const formatted = new Intl.NumberFormat("sv-SE").format(value);
  return `${formatted} kr${opts?.suffix ? " " + opts.suffix : ""}`;
}

export function formatPriceShort(value: number | null | undefined): string {
  if (value == null) return "Förfrågan";
  return new Intl.NumberFormat("sv-SE").format(value);
}

export function formatMileage(km?: number): string {
  if (km == null) return "–";
  if (km === 0) return "0 mil";
  return `${new Intl.NumberFormat("sv-SE").format(Math.round(km / 10))} mil`;
}

export function mailtoLink(opts: {
  to: string;
  subject: string;
  body?: string;
}): string {
  const params = new URLSearchParams({ subject: opts.subject });
  if (opts.body) params.set("body", opts.body);
  return `mailto:${opts.to}?${params.toString()}`;
}

export function quoteMailto(modelName: string, sellerEmail: string): string {
  return mailtoLink({
    to: sellerEmail,
    subject: `Offertförfrågan – ${modelName}`,
    body: [
      `Hej,`,
      ``,
      `Jag vill ha ett företagspris på ${modelName}.`,
      ``,
      `Företag:`,
      `Namn:`,
      `Telefon:`,
      `Bilen ska användas till:`,
      `Önskad anläggning: Smista eller Spånga`
    ].join("\n")
  });
}
