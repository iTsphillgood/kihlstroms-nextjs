# Bildkällor & rättigheter – V4

## Princip

Alla fordonsbilder på sajten laddas **direkt från märkenas officiella svenska huvudsidor och importörens
officiella materialbanker** (originallänkar) – inga tredjeparts pressbilder i huvudflödet. Varje bild har en
**lokal fallback** som visas automatiskt om CDN:et inte svarar (komponenten `SmartImg` / `onError`).

| Märke | CDN | Källa |
| --- | --- | --- |
| Maxus | `cdn.sanity.io/images/mcx434c9/...` + `media.ffycdn.net/eu/rsa-norway/...` | maxus.se + **RSA Guideline** (marketing.rsa.no/document/49) |
| Isuzu | `www.isuzusverige.se/media/...` + `media.ffycdn.net/eu/rsa-norway/...` | isuzusverige.se + **RSA Guideline** (marketing.rsa.no/document/51) |
| IVECO | `edge.sitecorecloud.io/.../hedinnordictruck/...` | iveco.se (Hedin Nordic Truck) + Kihlströms kampanjmaterial på samma CDN |
| Lagerbilar | `images.blocketcdn.se/...` | Kihlströms Blocket-annonser |

## RSA Guideline – importörens officiella materialbanker

RSA (rsa.no) är importör för både Maxus och Isuzu på Norden och publicerar varumärkesmaterial via
marketing.rsa.no. Bild-CDN: `media.ffycdn.net/eu/rsa-norway/{id}.{ext}?mod=v1/resize={px}`.

- **Maxus – RSA Guideline**: https://marketing.rsa.no/document/49 — 2 149 tillgångar:
  934 rena bilder (T60-studio 8K, eD5-studio, SK85/eTerron 9-interiörer, Deliver 9), 70 färgthumbs,
  7 produktvideor, 42 sociala mallar, 5 annonsmallar, TV/radio.
- **Isuzu – RSA Guideline**: https://marketing.rsa.no/document/51 — 1 130 tillgångar:
  136 rena bilder (D-Max-studioserie i 8K), 60 färgthumbs, 25 annonsmallar, 56 sociala mallar, TV/radio.
- Länkarna visas även i UI:t på respektive märkessida ("Officiellt bildmaterial från importören").

### Använda RSA-bilder i sajten (data/models.json)

- **T60 MAX**: `Q8xi2Gkn9rK8xM9BPA1N` (front), `HyLmVL2J9kYYzL8k9Ltu` (sida), `RKdwohxDDcBSmEPtAiiF`
  (bak), `XoDV3CCFxBjjWtaSHwrM` (45°), `qmiAnxmXy1hPA3VvX6t4` (ratt), `PZ5rjvYLMfsvkcUT2egW` (skärm)
- **e-Deliver 5**: `7mMy9wddZiSJzPcyTAaV` (White-Front), `yXc2DNbJPkBbJArBcpKF` (White-Side),
  `EEV3hVpLFLBzruywAo8H` (White-Rear-45), `1vp9E1XxgnRZT1b3nCcf` (Cockpit), `awJAM8tgbSGhgMsrwPxy` (Cargo)
- **Deliver 9**: `HwJ5gDSanp1J5rqWKwd9` (deliver9-white-1)
- **eTerron 9 (SK85-interiörer)**: `ZeJdX978BftZhLipPzyZ` (Front Row), `qcwr6ziiRjcAWeA2RfQU`
  (Large Screen), `r9RZjHDvChoFZL7h6LW1` (Passenger View)
- **Isuzu D-Max-studio**: `jpVnngyHjN2J1cZsiHyV` (DMax-43), `tQrnoSiEhk6Gmu9EtfRt` (DMax-42),
  `Q6saXAK6ieLvQGSGBANt` (DMax-38)


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
