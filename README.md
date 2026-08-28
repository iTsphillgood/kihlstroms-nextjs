# Kihlströms Digital Showroom 2026

Datadriven B2B-showroom och WordPress-arkitektur för Kihlströms Transport & Lastbilscenter.
Byggd som Next.js 14 (App Router, TypeScript, Tailwind) med all fordonsdata i strukturerad JSON.

## Kör

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run qa         # validerar JSON, bildreferenser, mejl/tel-länkar, dev-läckor
```

## Vad som ingår i V4

- **Hero-slider per märke och kampanj** – IVECO kampanj 2026, Isuzu D-Max, Maxus eTerron 9,
  T90 EV-kampanj och eDaily/miljözon. Autoplay, swipe, tangentbord, pausa vid hover, reduced-motion.
- **22 modellfamiljer med riktiga svenska priser** – Maxus (maxus.se), Isuzu D-Max inkl. AT/BEV
  (isuzusverige.se prislista) och IVECO:s 20 kampanjmodeller med modellkoder (iveco.se / kihlstroms.se).
- **Lager med 16 speklade annonser** – märke-, bränsle-, kaross- och skickfilter + sök + sortering,
  direktlänkar till Blocket-annonser och säljare.
- **Tillbehörskatalog med listpriser** – Isuzu D-Max 22 artiklar med artikelnummer, Maxus MAX-paket,
  IVECO-program. Offertlista som blir ett färdigt mejl.
- **Bygg din lastbil** – 4-stegs behovsguide (användning, påbyggnad, drivlina/last) med modellförslag.
- **Riktiga säljare och anläggningar** – 13 namngivna medarbetare med direkta `mailto:`/`tel:`-länkar,
  Smista och Spånga med öppettider och kartlänkar.
- **Uppgiftsbaserad navigation**, megameny, mobil CTA-bar (Ring/Lager/Offert), kontaktrouting per ärende.
- **Dokumentation** – `docs/market-analysis.md` (konkurrenter, priser, QA av v3),
  `docs/information-architecture.md` (sitemap, data, komponenter), `docs/image-sources.md` (bildkällor),
  `docs/wordpress-architecture.md` (produktionsmodell).

## Datakällor

Priser och specifikationer är hämtade från respektive märkes svenska sajt och Kihlströms egna sidor
(se `sourceUrl` i varje objekt): maxus.se, isuzusverige.se, iveco.se, kihlstroms.se/v3.
Alla priser exklusive moms om inget annat anges och kan ändras av importörerna.

## Viktigt

- Tesla, Hedin och Strada används som UX- och konkurrensreferenser. Deras bilder och texter ska inte kopieras.
- Fordonsbilderna i `public/images/models/` är riktiga press-/objektbilder från angivna utgivare
  (se docs/image-sources.md) och ska bytas till officiellt märkesmaterial efter skriftligt godkännande.
- Kundlogotyper ska endast publiceras efter verifierad relation och skriftligt godkännande.
- Produktion sker via staging och manuell kontroll; `npm run qa` ska gå grönt innan varje publicering.
