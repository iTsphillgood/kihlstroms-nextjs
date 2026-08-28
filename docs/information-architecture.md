# Informationsarkitektur och teknisk struktur – V4-showroom

## Sitemap

```
/                         Startsida – heroslider per märke, uppgifter, modeller, lager, kampanjer, personal, anläggningar
/modeller                 Alla 22 modellfamiljer med filter (kaross, drivlina) + sortering
/modeller/[slug]          Modellsida – varianter/prislista, nyckeltal, passar för, säljare, källa
/marke/iveco              Märkessida – program, kampanjer, märkessäljare
/marke/isuzu
/marke/maxus
/lager                    16 speklade annonser med filter (märke, bränsle, kaross, skick), sök + sortering
/kampanjer                4 aktuella kampanjer med källor
/tillbehor                Tillbehörskatalog per märke med offertlista (mailto)
/bygg-din-lastbil         Behovsguide i 4 steg → modellförslag + mejl
/verkstad-service         Verkstadstjänster + bokningsärende + anläggningar
/reservdelar              Reservdelsflöde till Andreas (Syd) och Marcin (Norr)
/kontakt                  Kontaktformulär (routing per ärende + anläggning), all personal, anläggningar
/om-oss                   Företaget, märkesauktorisationer, verkstad, karriär
```

## Navigation

- **Desktop:** sticky mörk topbar med tre megamenyer (Fordon, Verkstad & service, Om oss) + snabblänkar
  "Bilar i lager" och "Kampanjer" + växeltelefon + CTA.
- **Mobil:** drawer-meny + sticky bottom-bar (Ring / Lager / Offert).
- **Uppgiftsbaserad** sektion på startsidan ("Vad ska bilen göra i din verksamhet?") med 6 vägar in.

## Datamodell (data/*.json)

| Fil | Innehåll | Källa |
| --- | --- | --- |
| company.json | Företag, 2 anläggningar, 13 medarbetare, 3 märken | kihlstroms.se/v3/kontakt |
| models.json | 22 modellfamiljer: varianter med modellkoder + priser, nyckeltal, "passar för", bilder | maxus.se, isuzusverige.se, iveco.se, kihlstroms.se/v3 |
| stock.json | 16 annonser med annonsnummer, Blocket-länk och bild | kihlstroms.se/v3/bilar-i-lager-2 |
| accessories.json | Isuzu 22 artiklar med art.nr + listpris, Maxus MAX-paket, IVECO-program | isuzusverige.se/tillbehor, mynewsdesk (RSA) |
| campaigns.json | 4 kampanjer med fakta och källor | maxus.se, isuzusverige.se, kihlstroms.se/v3 |

Alla priser exkl. moms. Varje modell- och kampanjobjekt bär `sourceUrl` för spårbarhet – samma fält
som i WordPress-modellen (`source_url`, `last_verified_at`).

## Komponenter

| Komponent | Ansvar | Noteringar |
| --- | --- | --- |
| HeroSlider | Autoplay-slider, 5 slides, swipe/tangenter/piltangenter, pausa vid hover/fokus, respekterar prefers-reduced-motion | Client |
| Header / MobileCTA | Megameny, drawer, sticky mobil-CTA | Client |
| ModelGrid + ModelCard | Filter (kaross/drivlina) + sortering, modellkort med nyckeltal och frånpris | Grid client, kort server |
| StockExplorer | Sök, 4 filter + skick, sortering, fallbackbild om annonsbild saknas, mailto per annons | Client |
| AccessoryCatalog | Märkestabbar, kategorier, offertlista med totalsumma → mailto | Client |
| BuildWizard | 4-stegs behovsguide med förslagslogik (el/diesel, drag, påbyggnad, last) | Client |
| ContactForm | Validering, routing per ärende/anläggning, mailto-compose | Client |
| StaffList / LocationCards | Personal med direktnummer; anläggningar med öppettider + kartlänkar | Server |

## Kvalitet & tillgänglighet

- Server-renderade listsidor (SEO) med klientside-filter ovanpå – inget innehåll som bara finns i JS.
- Tanke-stolskontroller: alt-texter, aria-labels/roles på slider och filter, tangentbordsnavigering,
  fokusstates, reduced-motion, hoppa-till-innehåll-länk.
- `scripts/qa.mjs` validerar JSON, bildreferenser, interna länkar och letar trasiga priser.
- Ingen extern UI-ram (ren Tailwind), systemtypsnitt → snabb First Load (~87 kB delat JS).

## Väg mot produktion (WordPress)

1. Behåll dataformaten – de mappar 1:1 mot CPT `vehicle`/`model`/`part`/`staff`/`location` i
   docs/wordpress-architecture.md.
2. Byt prototypbilder mot officiellt material (Maxus Sanity-CDN, isuzusverige.se/media, Hedin/IVECO sitecore)
   efter godkännande – alla byten dokumenteras i docs/image-sources.md.
3. Ersätt mailto-flödena med Fluent Forms + routing när staging är satt.
4. Kör `npm run qa` i CI innan publicering (trasiga länkar, bilder, JSON).
