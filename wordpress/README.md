# Kihlströms – WordPress-export

Alla sidor från kihlstroms-nextjs, exporterade som ren HTML utan JavaScript-beroenden.
Genererad av `npm run build:wordpress` – kör igen efter ändringar i sajten så uppdateras mapparna ned.

## Innehåll

| Katalog/fil | Vad det är |
|---|---|
| `pages/*.html` | Kompletta HTML-sidor med menyer, sidfot och delad CSS – fungerar att öppna direkt i webbläsaren som granskning, eller att ladda upp som statisk webbplats |
| `fragments/*.html` | Sidinnehållet (utan menyer/sidfot) insvept i `<div class="kms-scope">` – detta klistras in i WordPress som **Egen HTML**-block |
| `assets/site.css` | Hela sajtens samlade CSS (33 kB) |
| `assets/kihlstroms-wp.css` | Samma CSS men scopad under `.kms-scope` – krockar inte med WordPress-temat |
| `assets/images/` | Lokala fallback-bilder (märkes-CDN-bilderna är fortfarande originallänkade) |
| `index.html` | Granskningslista med länkar till alla sidor |

## Sidlista → WordPress

| Fil | Permalänk i WP | Sida |
|---|---|---|
| `index` | `/` | Startsida |
| `modeller` | `/modeller` | Alla modeller |
| `modeller-iveco-daily-skapbil` m.fl. (22 st) | `/modeller/<slug>` | Modellsidor |
| `marke-iveco` / `marke-isuzu` / `marke-maxus` | `/marke/<märke>` | Märkessidor |
| `lager` | `/lager` | Bilar i lager |
| `kampanjer` | `/kampanjer` | Kampanjer |
| `bygg-din-lastbil` | `/bygg-din-lastbil` | Bygg din lastbil |
| `verkstad-service` | `/verkstad-service` | Verkstad & service |
| `reservdelar` | `/reservdelar` | Reservdelar |
| `tillbehor` | `/tillbehor` | Tillbehör |
| `om-oss` | `/om-oss` | Om oss |
| `kontakt` | `/kontakt` | Kontakt |
| `404` | (felssidorna i WP-inställningar) | 404 |

## Så här installerar du i WordPress

1. **CSS en gång.** Kopiera innehållet i `assets/kihlstroms-wp.css` under
   *Utseende → Anpassa → Extra CSS* (eller ladda upp som stilmall i child-temat).
   Allt är scopat under `.kms-scope` och påverkar inte resten av sajten.
2. **Skapa sidorna** med samma permalänkar som i tabellen ovan
   (*Sidor → Ny* och sätt permalänk, t.ex. `lager`).
3. **Klistra in innehållet.** Öppna `fragments/<sida>.html`, kopiera allt,
   och klistra in som blocket **Egen HTML** i respektive sida. Blockredigerarens
   förhandsvisning visar sidan rätt när CSS:en är på plats.
4. **Meny & sidfot** skapar du med WordPress egna menyer (*Utseende → Menyer*) –
   fragmenten innehåller inga navigationsmennyer.
5. **Startsidan** pekas in under *Inställningar → Läsa* → "En statisk sida".

## Begränsningar att känna till (statisk HTML utan JS)

- **Formulär** (kontakt, service, byggguide) är synliga med rätt design men skickar
  inget. Ersätt med t.ex. *Contact Form 7* eller *WPForms* och behåll fältens
  rubriker – eller länka `Begär offert`-knapparna till ett formulär.
- **Hero-slidern** på startsidan visar första bilden (övriga ligger gömda i HTML:en).
- **Lagerfiltret** visar alla fordon utan filtrering, och **byggguiden** visar
  första steget.
- Bilderna laddas från märkenas officiella CDN:er (originallänkade). Fallback-bilderna
  i `assets/images/` laddar du bara upp om något CDN skulle försvinna.

## Uppdatera exporten

```bash
npm run build:wordpress
```

bygger om hela sajten statiskt och genererar om `pages/`, `fragments/` och `assets/`.
