# Bildkällor & rättigheter – V4

## Princip

Alla fordonsbilder på sajten laddas **direkt från märkenas officiella svenska huvudsidors CDN:er**
(originallänkar) – inga tredjeparts pressbilder i huvudflödet. Varje bild har en **lokal fallback**
som visas automatiskt om CDN:et inte svarar (komponenten `SmartImg` / `onError`).

| Märke | CDN | Källa |
| --- | --- | --- |
| Maxus | `cdn.sanity.io/images/mcx434c9/...` | maxus.se (samma Sanity-projekt använder kihlstroms.se för officiellt Maxus-material) |
| Isuzu | `www.isuzusverige.se/media/...` | isuzusverige.se |
| IVECO | `edge.sitecorecloud.io/.../hedinnordictruck/...` | iveco.se (Hedin Nordic Truck) + Kihlströms kampanjmaterial på samma CDN |
| Lagerbilar | `images.blocketcdn.se/...` | Kihlströms Blocket-annonser |

## Ursprung per modell (data/models.json)

### IVECO (iveco.se / Hedin – sitecore CDN)
- Daily Skåpbil: `models/vans/stage-row-daily-12m3-proline.png` + hero `campaigns/sverige/.../fastlanevanhero.png` + `models/vans/iveco-daily-van.jpg`
- Skåp & Lift: `models/vans/stage-row-daily-box-lift-proline.png` / `stagerow-daily-box-lift-fastlane.png`
- Flakbil: `models/vans/stage-row-daily-cab-proline.png` / `-fastlane.png` + `iveco-daily-chassis.jpg`
- Dubbelhytt: `models/vans/stage-row-daily-cab-fastlane.png` + `iveco-daily-4x4.jpg`
- eSuperJolly: `models/vans/stage-row-esuperjolly-proline.png` / `-fastlane.png`
- eDaily: `campaigns/norge/edaily-kampanj/stage-row/iveco-edaily-kassebil---stage-row---desktop.png` + `iveco-edaily-van.jpg` + `iveco-edaily-cab.jpg`
- Eurocargo: `models/trucks/eurocargo-4x2.jpg`
- S-Way: `models/trucks/iveco-sway-artic.jpg`

### Isuzu (isuzusverige.se/media)
- Extended Cab: `a5wozl3o/my24_ec_xrl_kapa_modelimage2.jpg` + galleri `j5dbhr3r`, `xnkcjs2z`
- Double Cab: `qmtn33gp/my26-dc-xrx-rolltop-n3-7107_v.png` + hero `glmkbrd4/..._hero_desktop.png` + Skåne-galleri `2grm5ivo`
- Arctic Trucks: `1dvdjid1/at35-my26.png` (huvud) + `eiwjkzic/at33-my26.png` + `02tgq4lc/at37-my26.png`
- BEV: `lgdjwqjg/gfx_1140_modelimage.png` + `gjsgfbhf/my26_bev_xrl_front_splashwhite.png` + `5tthzxig/my26_bev_xrx_front_splashwhite.png`

### Maxus (cdn.sanity.io, exakt de bilderna maxus.se serverar på /modeller)
- e-Deliver 5: `5da2e871...-1920x1200.png` · e-Deliver 7: `eab0b939...` · Deliver 7: `2a274008...`
- e-Deliver 9: `2be53751...` · Deliver 9: `b0da463f...` · e-Deliver 9 chassi: `3731648c...-2400x1231.jpg`
- T60 MAX: `f5f6d2af...` · eTerron 9: `0c054dac...` + officiella galleribilder ur samma projekt
- **T90 EV och e-Deliver 3:** maxus.se har tagit bort modellsidorna (404 vid besök 2026-08-28).
  Dessa två modeller använder därför fortfarande lokala verkliga fordonsbilder
  (M Sverige / Niemibil – se nedan) tills officiellt material finns igen.

## Lokala fallback-bilder (public/images/models/)

Endast fallback + T90 EV/e-Deliver 3. Riktiga press-/objektbilder:

| Fil | Källa | Utgivare |
| --- | --- | --- |
| maxus-edeliver3.webp | niemibil.se/tjanstebil/maxus-elektriska-transportbilar | Niemibil (SE) |
| maxus-edeliver5.jpg | alltomelbil.se | Allt om Elbil (SE) |
| maxus-edeliver7.jpg | byggvarlden.se | Byggvärlden (SE) |
| maxus-deliver7.jpg | caradisiac.com | Caradisiac (FR) |
| maxus-edeliver9.jpg | klicket.se | Klicket (SE) |
| maxus-deliver9.jpg | theaa.com/used-vans | The AA (UK) |
| maxus-t60.jpg/-2.jpg | m3.se/article/2812713 | M3 (SE) |
| maxus-eterron9.webp/-2.webp | electrichunter.com | Electric Hunter |
| maxus-t90ev.jpg/-wide.jpg | msverige.se | Motormännens Riksförbund (SE) |
| isuzu-dmax-xrx.jpg/-2.jpg | olofssonauto.com | Olofsson Auto (SE) |
| isuzu-dmax-at35.jpg/-2.jpg | autocar.co.uk | Autocar (UK) |
| iveco-daily.png/-2.jpg | trucker.se / psauction.se | Trucker (SE) / PS Auction (SE) |
| iveco-edaily.png | multibolaget.se | Multibolaget (SE) |
| iveco-sway.jpg | autoline.info | Autoline |
| iveco-eurocargo.jpg | europa-lastbilar.se | Europa Lastbilar (SE) |

## Pris- och datakällor

- Maxus: https://maxus.se/modeller (besökt 2026-08-28; T90 EV- och e-Deliver 3-sidorna nedlagda)
- Maxus T60 MAX-paket: mynewsdesk.com/se/rsa (pressmeddelande 2025-06-12)
- Isuzu prislista, drivlina, CNG-paket och AT-kampanjer: isuzusverige.se/dmax/prislista, /modeller/double-cab, /modeller/extended-cab, /modeller/double-cab-arctic-trucks, /modeller/bev, /tillbehor
- IVECO modellprogram: iveco.se; kampanjpriser: kihlstroms.se/v3/iveco-daily-modeller (flera priser publicerade på iveco.se/kopverktyg/kampanjer)
- Lagerbilar: kihlstroms.se/v3/bilar-i-lager-2 (Blocket-annonser)
- Företag/personal/anläggningar: kihlstroms.se/v3/kontakt

Alla priser exklusive moms om inget annat anges och kan ändras av importörerna.
Publicering i produktion ska ske efter skriftligt godkännande från respektive generalagent.
