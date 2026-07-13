# Kihlströms V4: deep research, produktdesign, sälj och WordPress

**Verifierad:** 13 juli 2026  
**Mål:** göra Kihlströms till Stockholms tydligaste B2B-val för transportbilar, pickups och lätta lastbilar.

## Executive decision

Bygg inte vidare på en enda stor Gutenberg-klump som långsiktig databas. Behåll ett isolerat HTML-block som snabb demonstrations- och lanseringsväg, men flytta fordon, modeller, kampanjer, personal, anläggningar och kundcase till strukturerade WordPress-objekt. Samma data ska därefter driva lagerlistan, modellsidorna, startsidan, offertmejl, annonser, schema och feeds.

## Liveproblem som måste bort först

1. Startsidan visar utvecklartexten `DONT REMOVE THIS`, `THIS FAKE LEFT` och `FAKE RIGHT GUTENSLIDE` för slutkund.
2. Footer, organisationsuppgifter och kontaktinformation återkommer dubbelt.
3. Navigationen lyfter IVECO och Isuzu, men Maxus är inte lika tydligt integrerat.
4. Kontaktcopy har språkfel, inkonsekventa telefonformat och några otydliga avdelningsvägar.
5. Modellinformation, kampanjkort och specifika lagerbilar blandas ihop, vilket ökar risken för fel pris, vikt och kampanjdatum.
6. En JavaScript-genererad lagerlista får inte vara den enda informationskällan. Bilkortens kärndata ska finnas i serverrenderad HTML.

## Produktdesign

### Vad Kihlströms ska äga
- Börja med kundens arbete: citylogistik, 3,5 tons släp, stor volym, påbyggnation, elektrifiering eller service.
- Visa högst tre beslutsvärden på listkortet. Lägg full teknisk data på detaljsidan.
- Gör säljaren till en del av produkten: bild, direktnummer, e-post och anläggning på relevanta sidor.
- Använd stor media och få tydliga handlingar, men behåll B2B-information om last, drag, körkort, påbyggnad och drift.
- Variera sektioner: fullbreddshero, behovsväljare, horisontell modellrail, galleri, jämförelse, case och kontakt. Undvik en oändlig vägg av likadana kort.

### Konkurrentlärdomar

**Tesla**  
Ta produktfokus, lugn typografi, tydliga lager-/beställningsvägar och konsekvent mobil CTA. Kopiera inte en D2C-personbilsprocess rakt av. Kihlströms behöver offertdialog, teknisk kvalificering, påbyggnad och mänsklig rådgivning.

**Hedin Automotive**  
Hedin leder snabbt till köpa bil, service, kampanjer och finansiering. Kihlströms kan vinna genom att vara smalare, mer tekniskt relevant och mer personlig för yrkestrafik.

**Maxus Sverige**  
Använd pris nära modellen, officiellt Sanity-material och tydliga huvuddata. Lägg till det tillverkaren inte kan ge lokalt: lagerstatus, ansvarig säljare, finansiering, påbyggnad, anläggning och leveranstid.

**Strada**  
Direkt lokal benchmark för IVECO, Isuzu och pickups. Full visuell jämförelse måste göras i en riktig browserkörning eftersom sidan inte gick att extrahera stabilt i denna forskningsmiljö.

## Säljarkitektur

### Primära konverteringar
1. Se lagerbil.
2. Få en rekommendation.
3. Bygg ett arbetsfordon.
4. Boka service.
5. Beställ reservdelar.

### Offertflöde
Kvalificera i denna ordning utan att göra formuläret tungt:
1. Arbetsuppgift och bransch.
2. Gods, mått och lastvikt.
3. Släpvagnsvikt.
4. Körsträcka och laddmöjlighet.
5. Körkortsbehörighet och totalvikt.
6. Antal säten.
7. Påbyggnad.
8. Leveranstid.
9. Köp, leasing eller avbetalning.
10. Företag, namn, telefon och vald anläggning.

Spåra minst `lead_source`, `vehicle_interest`, `location`, `seller`, `campaign` och samtycke. Skicka både strukturerade parametrar och kundens fria text till vald säljare.

## Trust-modell

Dela bevis i tre tydliga kategorier:
- **Kihlströms kundcase:** publiceras endast med verifierad relation, godkänd logotyp och gärna kundcitat.
- **Tillverkarcase:** exempelvis företag som Maxus offentligt uppger använder en modell. Märks tydligt som Maxus-case, inte Kihlströms-kunder.
- **Auktorisation och kapacitet:** märken, verkstad, MRF, MECA, anläggningar, öppettider, reservdelar och påbyggnation.

Instabox, Widriksson, L&T och Bring kan användas som tydligt märkta Maxus-tillverkarcase. OKQ8 ska inte visas som Kihlströms-kund utan dokumentation och godkännande.

## Informationsarkitektur

- `/v3/` startsida och vägval.
- `/v3/bilar-i-lager/` serverrenderat lager med filter.
- `/v3/valj-fordon/` behovsguide.
- `/v3/iveco/`, `/v3/isuzu/`, `/v3/maxus/` varumärkeshubbar.
- En landningssida per modellfamilj.
- `/v3/bygg-din-lastbil/` skåp, lift, flak, tipp, kran, kyl och crew.
- `/v3/branscher/` distribution, bygg, entreprenad, service, kyl och fleet.
- `/v3/driftpartner/` företagsprogram.
- `/v3/verkstad-service/`, `/v3/reservdelar/`, `/v3/finansiering/`.
- `/v3/galleri-kundleveranser/` godkända leveranser och påbyggnationer.
- `/v3/kontakt/` personer, avdelningar, öppettider och anläggningar.

## WordPress-datamodell

Använd prefixade posttyper i ett plugin, inte i temat:
- `kls_vehicle` specifik lagerbil.
- `kls_model` modellfamilj.
- `kls_campaign` kampanj med start/slut och juridiska villkor.
- `kls_case` kundleverans eller projekt.
- `kls_staff` person.
- `kls_location` anläggning.

Taxonomier:
- `kls_brand`.
- `kls_use`.
- komplettera med drivlina, kaross/påbyggnad och lagerstatus om filterbehovet motiverar det.

Viktiga fordonsfält:
- pris exkl. moms, kampanjpris och kampanjdatum.
- märke, modell, version, årsmodell och lagerstatus.
- drivlina, växellåda, totalvikt, lastvikt, volym, dragvikt och säten.
- lagerort, ansvarig säljare, hero, galleri, PDF och käll-/annonslänk.
- registreringsnummer och VIN ska vara privata backendfält och aldrig returneras i publik REST utan särskilt behov.
- `source_url`, `verified_at` och `verified_by` ska vara obligatoriska för tekniska fakta.

Sätt `show_in_rest=true` för publika strukturer. Whitelista publik REST-data. Returnera aldrig all postmeta blint.

## Gratis/lågkostnadsstack

- Gutenberg och blockmönster.
- ACF Free för fält och vid behov registrering av posttyper/taxonomier.
- Kihlströms Site Core-plugin för datamodell, REST och lager-shortcode.
- Performance Lab för utvalda Core-teamfunktioner efter stagingtest.
- Redirection för 301/404.
- En SEO-plugin, inte flera.
- Native REST API.
- Cachelösning utifrån servermiljö, exempelvis LiteSpeed Cache endast om servern stödjer det.
- Matomo eller annan analyslösning med korrekt samtyckes- och integritetskonfiguration.

## Lager och annonser

1. Skapa bilen en gång i WordPress.
2. Generera lagerkort, detaljsida, relaterad modellsida och kampanjyta från samma post.
3. Skapa ett granskningsbart annonspaket med rubrik, pris, specifikation, bilder, kontakt och spårad URL.
4. Publicera till Blocket och andra marknadsplatser via godkänt dealerflöde, API eller manuell export. Använd inte reverse-engineerade privata endpoints.
5. När status blir `sold` tas bilen bort från aktivt lager men kan behållas som arkiverat case med relaterade alternativ.

## Prioritering

### P0
- Ta bort utvecklartext och dubbel footer.
- Normalisera kontaktuppgifter och telefonformat.
- Lägg Maxus i huvudnavigationen.
- Markera utgångna och kampanjstyrda modeller korrekt.

### P1
- Installera och testa `kls_vehicle`-datamodellen på staging.
- Bygg serverrenderad lagerlista och återanvändbar detaljmall.
- Koppla säljarrouting och strukturerat offertflöde.
- Publicera modellhubbar för IVECO, Isuzu och Maxus.

### P2
- Godkända kundcase och leveransgalleri.
- DriftPartner-program och fleetöversikt.
- Godkänd annons-/feedadapter.
- Schemalagd källkontroll av pris, kampanjdatum, bildlänkar och specifikationer.

## Källor
- https://www.kihlstroms.se/v3/
- https://www.kihlstroms.se/v3/kontakt/
- https://maxus.se/modeller
- https://maxus.se/modeller/e-deliver-5
- https://maxus.se/modeller/e-deliver-7
- https://maxus.se/modeller/deliver-7
- https://maxus.se/modeller/e-deliver-9-elektrisk-transportbil
- https://maxus.se/modeller/deliver-9
- https://maxus.se/modeller/t60
- https://maxus.se/modeller/eterron-9
- https://hedinautomotive.se/
- https://www.tesla.com/sv_se
- https://www.strada.se/
- https://wordpress.org/plugins/advanced-custom-fields/
- https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/
- https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-rest-api-support-for-custom-content-types/
