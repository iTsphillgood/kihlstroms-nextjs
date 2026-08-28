# Kopieringslista – Kihlströms WordPress-filer

37 filer i `wordpress/fragments/` – varje fil är självcontained (CSS ingår i filen) och klistras in som **Egen HTML**-block i WordPress.

**Så kopierar du en sida:**
1. WordPress: *Sidor → Ny* → döp sidan enligt tabellen → sätt permalänken exakt som i kolumnen "Permalänk"
2. Öppna filen i kolumnen "Fil du kopierar" (i mappen `wordpress/fragments/`)
3. Markera allt (Ctrl/Cmd+A) och kopiera
4. Klistra in som blocket **Egen HTML** i WordPress-sidan → Publicera

### 1. Grundsidor (skapa dessa först)

| # | Fil du kopierar | WordPress-sida | Permalänk | Not |
|---|---|---|---|---|
| 1 | `fragments/bygg-din-lastbil.html` | Bygg din lastbil | `/bygg-din-lastbil` | Guiden visar steg 1 statiskt |
| 2 | `fragments/index.html` | Startsidan | `/ (startsidan)` | Heroslidern visar bild 1 |
| 3 | `fragments/kampanjer.html` | Kampanjer | `/kampanjer` |  |
| 4 | `fragments/kontakt.html` | Kontakt | `/kontakt` | Formuläret syns men skickar inte – ersätt med Contact Form 7/WPForms |
| 5 | `fragments/lager.html` | Bilar i lager | `/lager` | Fordonen listas utan filtrering |
| 6 | `fragments/modeller.html` | Alla modeller | `/modeller` | Listan visas utan filtrering |
| 7 | `fragments/om-oss.html` | Om oss | `/om-oss` |  |
| 8 | `fragments/reservdelar.html` | Reservdelar | `/reservdelar` |  |
| 9 | `fragments/tillbehor.html` | Tillbehör | `/tillbehor` |  |
| 10 | `fragments/verkstad-service.html` | Verkstad & service | `/verkstad-service` | Serviceformuläret syns men skickar inte – ersätt med plugin |

### 2. Lagerbilar

| # | Fil du kopierar | WordPress-sida | Permalänk | Not |
|---|---|---|---|---|
| 11 | `fragments/lager-iveco.html` | Lagerbilar – IVECO | `/lager/iveco` |  |

### 3. Märkessidor (3 st)

| # | Fil du kopierar | WordPress-sida | Permalänk | Not |
|---|---|---|---|---|
| 12 | `fragments/marke-isuzu.html` | Märkessida – Isuzu | `/marke/isuzu` |  |
| 13 | `fragments/marke-iveco.html` | Märkessida – IVECO | `/marke/iveco` |  |
| 14 | `fragments/marke-maxus.html` | Märkessida – Maxus | `/marke/maxus` |  |

### 4. Modellsidor (22 st – permalänk /modeller/…)

| # | Fil du kopierar | WordPress-sida | Permalänk | Not |
|---|---|---|---|---|
| 15 | `fragments/modeller-isuzu-d-max-arctic-trucks.html` | Modell – Isuzu D-Max Arctic Trucks | `/modeller/isuzu-d-max-arctic-trucks` |  |
| 16 | `fragments/modeller-isuzu-d-max-bev.html` | Modell – Isuzu D-Max BEV | `/modeller/isuzu-d-max-bev` |  |
| 17 | `fragments/modeller-isuzu-d-max-double-cab.html` | Modell – Isuzu D-Max Double Cab | `/modeller/isuzu-d-max-double-cab` |  |
| 18 | `fragments/modeller-isuzu-d-max-extended-cab.html` | Modell – Isuzu D-Max Extended Cab | `/modeller/isuzu-d-max-extended-cab` |  |
| 19 | `fragments/modeller-iveco-daily-dubbelhytt.html` | Modell – IVECO Daily Dubbelhytt | `/modeller/iveco-daily-dubbelhytt` |  |
| 20 | `fragments/modeller-iveco-daily-flakbil.html` | Modell – IVECO Daily Flakbil | `/modeller/iveco-daily-flakbil` |  |
| 21 | `fragments/modeller-iveco-daily-skap-lift.html` | Modell – IVECO Daily Skåp & Lift | `/modeller/iveco-daily-skap-lift` |  |
| 22 | `fragments/modeller-iveco-daily-skapbil.html` | Modell – IVECO Daily Skåpbil | `/modeller/iveco-daily-skapbil` |  |
| 23 | `fragments/modeller-iveco-edaily.html` | Modell – IVECO eDaily | `/modeller/iveco-edaily` |  |
| 24 | `fragments/modeller-iveco-esuperjolly.html` | Modell – IVECO eSuperJolly | `/modeller/iveco-esuperjolly` |  |
| 25 | `fragments/modeller-iveco-eurocargo.html` | Modell – IVECO Eurocargo | `/modeller/iveco-eurocargo` |  |
| 26 | `fragments/modeller-iveco-s-way.html` | Modell – IVECO S-Way | `/modeller/iveco-s-way` |  |
| 27 | `fragments/modeller-maxus-deliver-7.html` | Modell – MAXUS Deliver 7 | `/modeller/maxus-deliver-7` |  |
| 28 | `fragments/modeller-maxus-deliver-9.html` | Modell – MAXUS Deliver 9 | `/modeller/maxus-deliver-9` |  |
| 29 | `fragments/modeller-maxus-e-deliver-3.html` | Modell – MAXUS e-Deliver 3 | `/modeller/maxus-e-deliver-3` |  |
| 30 | `fragments/modeller-maxus-e-deliver-5.html` | Modell – MAXUS e-Deliver 5 | `/modeller/maxus-e-deliver-5` |  |
| 31 | `fragments/modeller-maxus-e-deliver-7.html` | Modell – MAXUS e-Deliver 7 | `/modeller/maxus-e-deliver-7` |  |
| 32 | `fragments/modeller-maxus-e-deliver-9-chassi.html` | Modell – MAXUS e-Deliver 9 Chassi | `/modeller/maxus-e-deliver-9-chassi` |  |
| 33 | `fragments/modeller-maxus-e-deliver-9.html` | Modell – MAXUS e-Deliver 9 | `/modeller/maxus-e-deliver-9` |  |
| 34 | `fragments/modeller-maxus-eterron-9.html` | Modell – MAXUS eTerron 9 | `/modeller/maxus-eterron-9` |  |
| 35 | `fragments/modeller-maxus-t60-max.html` | Modell – MAXUS T60 MAX | `/modeller/maxus-t60-max` |  |
| 36 | `fragments/modeller-maxus-t90-ev.html` | Modell – MAXUS T90 EV | `/modeller/maxus-t90-ev` |  |

### 5. Övrigt

| # | Fil du kopierar | WordPress-sida | Permalänk | Not |
|---|---|---|---|---|
| 37 | `fragments/404.html` | 404–sidan | `– (anges i WP:s 404-inställning)` |  |

### Kom ihåg

- **Meny** (*Utseende → Menyer*): bygg Fordon / Verkstad & service / Om oss med permalänkarna ovan
- **Startsidan**: *Inställningar → Läsa* → "En statisk sida" → välj Startsida
- **404**: klistra in `fragments/404.html` i temats 404-mall eller en felsidesplugin
- **Formulär** (kontakt, service, byggguide): syns men skickar inget – ersätt med Contact Form 7/WPForms
- Klistra in som **administratör/redaktör** – lägre behörigheter kan rensa style-taggarna
- Granska helhetskänslan i `wordpress/pages/` – där kan du klicka dig mellan sidorna som på en riktig sajt
- Listan genereras om automatiskt av `npm run build:wordpress`
