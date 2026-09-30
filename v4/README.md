# Kihlströms V4 – datadriven WordPress- och B2B-grund

Verifierad 13 juli 2026.

## Innehåll
- `data/site-data.json`: 11 Maxus-modeller, riktiga säljare, anläggningar, källor och trust-klassning.
- `prototype/index.html`: responsiv B2B-prototyp med behovsmatchning, modellslider, galleri och direkta kontaktvägar.
- `wordpress/kihlstroms-site-core.php`: plugin-grund för fordon, modeller, kampanjer, case, personal, anläggningar, REST och lager-shortcode.
- `docs/research-and-architecture.md`: Product Design-, konkurrent-, WordPress- och säljplan.
- `scripts/validate.mjs`: automatiserad kontroll av data och frontendläckor.

## Kör QA
```bash
node v4/scripts/validate.mjs
```

## Publiceringsregel
Kör på staging. Kontrollera pris, kampanjdatum, variant, bildrättigheter och kontaktuppgifter före produktionspublicering. Kundlogotyper får endast användas med dokumenterad relation och godkännande.
