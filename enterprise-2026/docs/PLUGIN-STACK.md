# WordPress-pluginstack

1. **Kihlströms Core** – eget plugin för posttyper, taxonomier, metadata, lager och integrationslager.
2. **ACF / ACF Pro** – redaktörs-UI för strukturerad data, Local JSON i Git.
3. **Rank Math SEO** – om nuvarande SEO-plugin inte ska behållas. Använd ett enda SEO/schema/redirect-system.
4. **WPForms** – behåll befintligt formulärsystem och bygg villkorad routing efter ärende/anläggning/märke.
5. **ShortPixel** – endast om server/CDN inte redan sköter bildoptimering.

## Cache
LiteSpeed Cache endast om servern faktiskt kör LiteSpeed/OpenLiteSpeed. På Apache/NGINX används hostingens cache eller en enda annan cachelösning.

## Staging-only
Query Monitor och Health Check. WP All Import endast när verklig feed/CSV/XML finns.

## Undvik
Flera SEO-plugins, flera minify/cache-plugins, flera bildoptimerare och page builders ovanpå samma Gutenberg-komponenter.
