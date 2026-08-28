# KONKURRENSANALYS – var ligger Kihlströms digitala showroom?

_Uppdaterad 2026-08-28. Källor: live-crawl av strada.se (startsida + bilar-i-lager), docs/market-analysis.md (Hedin), docs/SELF-AUDIT.md (egen crawl, 36 sidor)._

## Läget just nu

| Område | Kihlströms (vi) | Strada (Täby) | Hedin (iveco.se/generalagent) |
|---|---|---|---|
| Märken | IVECO + Isuzu + Maxus, MECA för övriga | Isuzu + IVECO + RAM + Dodge + Arctic Trucks + Fiat Pro | IVECO-nätverk i Norden, expanderar (Malmö, Helsingborg, Jönköping, Markaryd) |
| Anläggningar | 2 (Smista + Spånga) | 1 (Täby) | Flera, växande |
| Lagerbilar online | **55 annonser statiskt synliga med bild/pris – crawlbara** | JS-laddat ("Laddar fordon…" för crawlers) – osynligt för Google | Ej jämfört i detail |
| Priser | Alla med källstatus + exkl. moms-märkning, kontrollerade 2026-08-28 | Priser i lager/annons | Kampanjpriser på iveco.se |
| Verkstads-USP | "Servar alla transportbilar och lastbilar", 2 verkstäder, jour | **Strada Priority** – förtur i verkstad vid bilköp | Tillverkarutbildade tekniker |
| SEO-grund (crawl) | 36 sidor, 0 brutna länkar, 0 bilder utan alt, CTA på alla sidor, 1 H1/sida | Brastartsida, men lagret osynligt för crawl | Ren portal, stark domän |
| Unikt material | Alla 20 IVECO-kampanjmodeller samlade, 55 lagerbilars bilder, MEMORY-register med alla källor, WP-export | Priority-konceptet, amerikanska bilar som bredd | Generalagentens material i första hand |

## Slutsats – var ligger vi

**Starkare än båda på:** transparens (priser med källa + moms-status), crawlbar lagerlista (55 bilar synliga för sökmotorer – Stradas är osynlig), komplett kampanjprogram på ett ställe, B2B-copy med offertflöde.

**Efter på:** 
1. **Kundklubb/Priority-liknande koncept** – Strada har ett namngivet lojalitetslöfte ("förtur i verkstaden"). Kihlströms har "svar samma arbetsdag" men det paketeras inte som ett namngivet program.
2. **Inbyte & finansiering-kalkyl** – Strada lyfter inbyte + finansiering direkt i lagerflödet; vi nämner det endast i byggguiden.
3. **Amerikanska bilar/bredd** – Stradas RAM/Dodge fångar en annan målgrupp; irrelevant för oss att kopiera, men posisitioneringen "tre märken, ärlig rådgivning" bör bli tydligare mot "allt amerikanskt".
4. **Titellängder** – 15 av 36 sidor har titlar > 65 tecken (Google trunkerar ~60). Kvalitetsnit men värt att fixa.
5. **Google Maps-inbäddning + öppettider i schema** – Strada visar karta direkt; vi länkar Maps/Waze (snabbare, men mindre visuellt).

## Prioriterad förbättringslista (nästa sprint)

1. **"Kihlströms Förtur"**-koncept: namnge löftet (förtur i verkstad vid köp av bil hos oss) – svar mot Strada Priority
2. **Inbytesräknare** i lagerflödet ("Vad är din bil värd?")
3. **Leasing-kalkylator** (data finns: T60 6 995 kr/mån, IVECO-finansiering)
4. Förkorta titlar till ≤ 60 tecken (15 sidor, mall: "Modell – från X kr | Kihlströms")
5. JSON-LD: Organization + LocalBusiness × 2 + Vehicle per modellsida + BreadcrumbList
6. Google Maps-embed på kontakt/verkstad (iframe, no-JS-fallback med länk)
7. Provkörningsbokning som eget flöde (Isuzu har det på sajt)

## Metod

- Egen crawl: `node scripts/crawl-self.mjs` → docs/SELF-AUDIT.md (36 sidor: status, titel, meta, H1, alt, CTA)
- Konkurrenter: manuell hämtning av strada.se + tidigare analys i docs/market-analysis.md
- Datakällor till priser/bilder: docs/MEMORY.md
