# AGENT.md – handbok för agenter som jobbar i kihlstroms-nextjs

_Det här är operationshandboken för repo:t. Läs den först, sen docs/MEMORY.md (alla länkar/priser/bilder)._

## Repo-karta

| Sökväg | Innehåll |
|---|---|
| `app/` | Next.js 14 App Router-sidor (svenska). `/marke/[brand]`, `/modeller/[slug]`, `/lager`, `/lager/iveco`, `/kampanjer`, `/tillbehor`, `/verkstad-service`, `/reservdelar`, `/bygg-din-lastbil`, `/kontakt`, `/om-oss` |
| `components/` | Server- och klientkomponenter (HeroSlider, ModelGrid/ModelCard, StockExplorer, ContactForm, ServiceForm, BuildWizard, AccessoryCatalog m.fl.) |
| `data/*.json` | ALL kunddata: models (22), stock (55), accessories, campaigns, iveco-campaign (20), company (personal, löften, anläggningar) |
| `lib/data.ts` | Typad läsning av all JSON + helpers (brandName, brandColor, getModel…) |
| `docs/MEMORY.md` | **Masterregistry** – varje bild-, pris- och källänk (genereras) |
| `docs/image-sources.md` | RSA-bankarnas asset-ID:n och CDN-kontrakt |
| `docs/market-analysis.md` | Tidigare marknadsanalys |
| `wordpress/` | WP-export: pages/, fragments/, KOPIERINGSLISTA.md (CSS inbäddad per fil) |
| `scripts/` | qa.mjs, build-wordpress.mjs, wp-copylist.mjs, build-memory-doc.mjs, crawl-sites.mjs |

## Kommandon

```bash
npm run qa              # datavalidering – kör ALLTID före commit
npm run dev             # lokal utveckling
npx next build          # produktionsbygge
npm run build:wordpress # statisk export → wordpress/ (37 sidor) + KOPIERINGSLISTA
npm run build:docs      # regenerera docs/MEMORY.md efter dataändringar
```

## Hårda regler

1. **Svenska i all kundvänd text.** Inga utvecklarkommentarer, debug-texter eller "prototyp"-formuleringar i frontend.
2. **Priser alltid med moms-status** – sajten standard är "exkl. moms" (B2B). Aldrig pris utan källa.
3. **Bilder originallänkas** från officiella källor (märkes-CDN, RSA-bank, Blocket-annons) – aldrig hotlinka från obehöriga tredjepartssajter, aldrig ladda ner i sandbox (curl-blockad). Lokala fallbacks i `public/images/`.
4. **Inga logotyper** utan verifierad relation – idag används märkesfärger + initialer, inte varumärkeslogotyper.
5. **Efter varje dataändring:** `npm run qa` → `npm run build:docs` (om data/*.json ändrats) → `next build` → vid live-ändring även `npm run build:wordpress`.
7. **Commit till `arena/01a04797-kihlstroms-nextjs`** – PR #3 mot main uppdateras automatiskt vid push.

## Subagent-planen (roller vid längre arbete)

| Agent | Ansvar | Nästa uppgifter |
|---|---|---|
| **Design** | Layout, hierarki, rörlighet | Jämförsida sida-vid-sida (maxus-jamfor på riktiga sajten), galleri-lightbox på modellsidor, karuselläge i modellgridden, dark-mode-consistency |
| **Data** | Källor, priser, aktualitet | Bevaka kihlstroms.se/v3 + maxus.se + isuzusverige.se prislistor (crawl-sites.mjs finns men fetch-failar från sandbox – kör lokalt), T90 EV/e-Deliver 3 från-priser saknas på maxus.se (404) – be säljare |
| **Funktion** | Formulär, interaktivitet | Ersätt mailto-formulär med riktigt backend (API route + SMTP), provkörningsbokning, jämförelseverktyg (2–3 modeller), offert-JSON som mejlas till rätt säljare |
| **SEO/innehåll** | Metadata, schema, copy | Schema.org (Vehicle, Organization, LocalBusiness), sitemap.xml, Open Graph-bilder per modell, blogg/nyheter för kampanjer |
| **WP** | WordPress-flödet | Base64-importfil per fragment, instruktionsvideo, dubbelkolla att `<style>` överlever låga behörigheter |
| **QA** | Kvalitet | Lighthouse (a11y, prestanda), localStorage-offertlista, link-checker på alla externa URL:er i MEMORY.md |

## Backlog – vad som saknas mot riktiga sajten (med källor)

1. **Jämförsida** "maxus-jamfor" – riktiga sajten har modellval sida-vid-sida
2. **Provkörningsbokning** – separat flöde finns på isuzusverige.se/boka-provkorning
3. **Säljarprofiler** – riktiga sajten har egna sidor (/maxus-saljare/philip/) med foto (Wasse: ny bild 2026-08, tel 076-666 78 87, mejl waseem@kihlstroms.se)
4. **Anläggningsbilder** – riktiga sajten har foton på Smista/Spånga (wp-content-URL:er)
5. **Finansiering/leasing** – Maxus business lease 6 995 kr/mån finns; IVECO-finansiering nämns men utan räntor
6. **Video/360** – RSA-bankarna innehåller MP4:er (T60, eD5, eD7) – ej inlaggt
7. **Blocket-live** – lagret är statisk snapshot 2026-08-28; riktiga sajten länkar "Se 55 aktuella annonser"
8. **Nyhetsbrev** – forms på maxus.se; saknas hos oss
9. **T90 EV & e-Deliver 3 priser** – maxus.se 40:ar dessa sidor; endast via säljare (dokumenterat i market-analysis.md)
10. **Isuzu AT37** – ingående på AT35-sidan men ingen egen modellsida

## Kända fallgropar

- Sandbox kan inte ladda ner bilder (SSL-reset) – användarens webbläsare laddar dem.
- `crawl-sites.mjs` fetch-failar från sandbox; kör utifrn lokal maskin.
- Isuzu media-URL:er kräver filnamn (annars 404).
- WordPress kan rensa `<style>` för användare med låga behörigheter – klistra in som admin/redaktör.
- `next.config.mjs` växlar export-läge via `WP_EXPORT=1` – kör aldrig vanlig build med den satt.
