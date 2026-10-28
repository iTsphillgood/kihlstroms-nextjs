# Kihlströms Digital Showroom 2027

## Referens och syfte

Baserad på en genomgång av Carla-sidan för OMODA 9 (publik visning av layout, produktinformation, pris, valbara tillbehör och finansiering). Ingen av Carlas privata komponenter, skyddade källkod, bilder eller formulärlogik har kopierats. Kihlströms-lösningen är en separat originalimplementation med B2B-fokus.

## Filer

- `app/fordon/[id]/page.tsx`: serverrenderade fordonsdetaljer, statiska rutter, unik metadata per fordon, och **noindex tills lager och pris verifierats**.
- `components/VehicleDetail2027.tsx`: återanvändbar klientkomponent med responsivt galleri, fakta, tillbehör, offertunderlag, moms- och finansieringskalkyl, samt klimatpremieexempel där det är relevant.
- `components/StockExplorer.tsx`: lagerkortens huvudsakliga CTA länkar till ny fordonsdetaljsida.
- `public/showroom-2027/index.html`: fristående koncept/prototyp med inbyggd CSS och JS. Kan visas separat och behöver inte React.

## Funktioner

1. Modellbilder och annonsbild separeras. För MAXUS eTerron 9 används officiella tillverkarbilder som komplettering, inte som bilder på det faktiska objektet.
2. Valbara tillbehör ingår i beräknat pris, varav endast ett vinterhjulspaket kan väljas.
3. Pris kan visas inklusive eller exklusive moms. Månadskalkylen är ett **illustrativt annuitetslån med restvärde**, nominell ränta, utan avgifter, och inte en skarp leasingoffert.
4. Klimatpremieräkning är endast ett *teoretiskt exempel*. Köparen måste först ansöka innan beställning; Energimyndigheten godkänner stödberättigande och jämförelsefordon.
5. Formuläret öppnar besökarens e-postapp med ett färdigställt offertunderlag. Det skickar **inte** uppgifter till backend och är inte ett levererat lead förrän användaren skickat mejlet.
6. Spara använder browser-localStorage; delning använder Web Share eller clipboard när tillåtet.

## Produktionskrav innan merge

- **Lagerfeed:** Synka och verifiera fordonsobjekt mot Winassist/annonser med uppdateringsdatum, VIN/registreringsnummer, bilder, pris och faktiskt tillgänglighetsstatus. Befintliga `data/stock.json` är daterad 2026-08-28, alltså inte realtid.
- **Bilfakta:** Kontrollera specifikationer mot exakt modellår, konfigurering och registrering. eTerron 9 standardvärden baseras på maxus.se.
- **Tillval:** Bekräfta RSA-priser, lagersaldo, montering och moms.
- **Finans:** Byt räkneexempel mot godkänd finansberäkning med avgifter, effektiv ränta, kostnadsinformation, kreditvillkor och korrekt typ av finansiering. DNB/Santander-koppling kräver behörig integration.
- **Leads:** Implementera serverbaserat formulär med bot-skydd, validering, korrekt GDPR-information, samtyckes-/kontaktvägar där tillämpligt, samt leverans och spårning till riktig inkorg/CRM.
- **SEO:** Sätt `robots.index: true` först när varje unik annons valideras med sann lagerstatus, korrekt kanonisk URL och uppdaterat pris; lägg då Product/Car strukturerad data bara för verifierbara faktauppgifter.
- **Prestanda:** Lagra tillverkarbilder på tillåten, stabil CDN/egen media. Optimera storlekar/format, prioritera LCP-bild, testa Core Web Vitals.
- **QA:** Kör `npm install && npm run build && npm run qa`, kontrollera desktop/mobil, keyboard/focus, offertmail och filternavigation.
- **Publicering:** PR:n är en arbetsgren; merge först efter test och verksamhetsgodkännande.

## Referenser

- Referenssidans UX: https://www.carla.se/bil/omoda-9-2026-dat8nna9io6g00ehlmjg
- Produktinformation: https://maxus.se/modeller/eterron-9
- Stödregler: https://www.energimyndigheten.se/klimat/transporter/transporteffektivt-samhalle/klimatpremie-for-latta-ellastbilar/
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
