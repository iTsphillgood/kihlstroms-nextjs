import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileCTA from "../components/MobileCTA";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kihlströms Transport & Lastbilscenter – IVECO, Isuzu och Maxus i Stockholm",
    template: "%s | Kihlströms"
  },
  description:
    "Auktoriserad återförsäljare och verkstad för IVECO, Isuzu och Maxus. Sveriges största IVECO-återförsäljare – transportbilar, pickuper och lätta lastbilar i Smista och Spånga.",
  keywords: [
    "IVECO Stockholm",
    "Isuzu D-Max Stockholm",
    "Maxus transportbil",
    "transportbil Stockholm",
    "lagerbilar",
    "IVECO Daily",
    "verkstad transportbil"
  ],
  openGraph: {
    title: "Kihlströms Transport & Lastbilscenter",
    description:
      "Transportbilar, pickuper och lätta lastbilar från IVECO, Isuzu och Maxus – med verkstad i Smista och Spånga.",
    locale: "sv_SE",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink-900"
        >
          Hoppa till innehållet
        </a>
        <Header />
        <main id="main" className="pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
