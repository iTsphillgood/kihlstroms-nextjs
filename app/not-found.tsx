import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="section-label">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Sidan finns inte</h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
        Adressen kan ha ändrats. Prova lagerbilar, modeller eller kontakta oss direkt på växeln 08-19 56 26.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Till startsidan</Link>
        <Link href="/lager" className="btn-ghost">Bilar i lager</Link>
        <Link href="/modeller" className="btn-ghost">Alla modeller</Link>
      </div>
    </div>
  );
}
