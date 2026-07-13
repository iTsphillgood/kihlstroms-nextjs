# WordPress-arkitektur 2026-07-13

## Rekommendation
Bygg om startsidan och lagerflödet som ett **blocktema med strukturerad fordonsdata**, inte som en enda jättelik HTML-klump. Den fristående prototypen visar design och funktion, medan WordPress ska äga data, mallar och publicering.

## Teknisk bas
- WordPress 7.0.1 eller senare. WordPress rekommenderar PHP 8.3+, MySQL 8.0 eller MariaDB 10.11+.
- ACF 6.8.4 eller senare för posttyp, taxonomier och fordonsfält. Gratisversionen räcker för huvuddelen av modellen.
- Gutenberg, Query Loop och Block Bindings. Använd Interactivity API för filter, jämförelse, favoriter och dynamiska lagerkort.
- WP All Import vid stora CSV/XML-importer. För små lager används WordPress-admin direkt.
- Ett litet eget plugin `kihlstroms-vehicles` för posttypen `vehicle`, schema, API, feed-export och återanvändbara block. Undvik att lägga affärslogik i temat.

## Innehållsmodell
### Posttyper
1. `vehicle` – en specifik lagerbil eller beställningsbil.
2. `model` – en modellfamilj, exempelvis IVECO Daily eller Maxus e-Deliver 7.
3. `campaign` – tidsstyrda kampanjer.
4. `case` – levererad kundlösning när publicering är godkänd.
5. `staff` – säljare och verkstadskontakter.
6. `location` – Smista och Spånga.
7. `part` – utvalda reservdelar och tillbehör.

### Taxonomier
Märke, drivlina, kaross, användningsområde, totalvikt, lagerort och lagerstatus.

## Lager- och annonsflöde
- En bil registreras en gång.
- Samma data driver lagerlistan, bilens detaljsida, startsidans kort, kampanjsidor och exportfeed.
- Blocket-publicering ska ske via avtalad feed/API eller ett granskat exportsteg. Automatisera inte mot inofficiella endpoints.
- Lägg `last_verified_at`, `source_url` och ansvarig säljare på varje bil.
- Sålda bilar avpubliceras från lager men kan behållas internt för historik.

## Bildhantering
- Spara egna lagerbilsbilder i WordPress med WebP/AVIF och original kvar.
- Maxus Sanity-CDN används för godkänt modellmaterial, men en schemalagd crawler bygger endast ett manifest och förändringsrapport.
- Importera inte Tesla- eller Hedin-bilder. De är designreferenser, inte återförsäljarassets.
- Alt-text ska beskriva modell, kaross och bildvinkel, inte stapla sökord.

## Sidstruktur
1. Startsida – uppgiftsbaserad navigation, lagerutval, bygg din bil, service, reservdelar, säljare och anläggningar.
2. Lagerbilar – indexerbar serverrenderad lista med filter ovanpå.
3. Fordonsdetalj – galleri, pris, data, finansiering, leveransstatus, säljare och offert.
4. Märkessidor – IVECO, Isuzu, Maxus.
5. Modellsidor – återanvändbar mall, inte unik handkod per modell.
6. Bygg din lastbil – behovsflöde för kaross/påbyggnad.
7. Verkstad & service – välj anläggning och ärende.
8. Reservdelar – formulär med registreringsnummer/VIN.
9. Kampanjer – tidsstyrd CPT.
10. Leveranser & case – endast godkända kundcase.

## Kostnadsfri eller lågkostnadsstack
- WordPress core / Gutenberg.
- ACF Free.
- Query Monitor på staging.
- Redirection för 301 och 404-logg.
- WebP Express eller serverns bildoptimering, välj en lösning.
- Fluent Forms Free eller befintligt formulärverktyg, men formulär ska routas efter ärende och anläggning.
- Independent Analytics eller serverloggar om enklare integritetsvänlig statistik önskas.

## Prestanda och QA
- Ingen extern UI-ram i produktion om temat kan leverera CSS självt.
- Hero-media under 250–400 kB per viewportvariant.
- Serverrendera alla lagerkort och kärntexter. JS får förbättra filtrering, inte skapa allt innehåll från tom HTML.
- Testa 360, 768, 1024 och 1440 px, tangentbord, reduced motion, formulärfel och långsam uppkoppling.
- CI ska stoppa publicering vid trasiga länkar, saknade alt-texter och läckta utvecklarkommentarer.
