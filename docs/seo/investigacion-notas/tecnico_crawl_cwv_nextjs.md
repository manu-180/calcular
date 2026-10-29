# SEO técnico, crawl y Core Web Vitals para un sitio Next.js 16 / Vercel de ~15–20k páginas, ~100 países, ~30 idiomas (RTL y CJK)

Todas las fuentes consultadas el **2026-10-27**. Donde la fuente es un blog de terceros (no Google/Chrome/Next.js/Vercel) se marca como tal.

---

## Pregunta 1 — Umbrales exactos de CWV, cambios 2025-2026 y "nueva métrica" 2026

### Takeaway
Los umbrales no cambiaron: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1, medidos al percentil 75 por dispositivo. Lo único nuevo en 2026 es que CrUX publica (desde el dataset de septiembre 2026, release 2026-10-13) variantes **experimentales** de LCP/INP/CLS que incluyen *soft navigations* de SPAs; los scores estables no cambian y Chrome apunta a sacarlas de experimental en mayo 2027. No existe ninguna métrica oficial llamada "Engagement Reliability".

### Cited Findings
- Umbrales "good": LCP dentro de los 2,5 s desde el inicio de carga; INP ≤ 200 ms; CLS ≤ 0,1. Se mide el percentil 75 de cargas, segmentado móvil/desktop; una página pasa si cumple los tres en p75. Página publicada 2020-05-04, actualizada 2024-10-31. INP reemplazó a FID como métrica estable en 2024. Las métricas estables cambian como máximo una vez por año y se anuncian en la documentación oficial y el changelog. — [web.dev/articles/vitals](https://web.dev/articles/vitals)
- Release notes de CrUX 2025-2026: ningún cambio de umbral en todo el período. Enero 2025: se agregan sub-partes de LCP, tipo de recurso LCP (texto/imagen) y RTT a la API/BigQuery; se retira la dimensión ECT. Marzo 2025: CrUX Vis sale de experimental. El CrUX Dashboard (Looker Studio) se deprecó a fines de noviembre 2025 (octubre 2025 fue el último mes de datos del conector). — [developer.chrome.com/docs/crux/release-notes](https://developer.chrome.com/docs/crux/release-notes/)
- Dataset de septiembre 2026 (publicado 2026-10-13): CrUX agrega variantes experimentales de LCP, INP y CLS que incluyen soft navigations, en BigQuery, CrUX API y History API. Tasas de aprobación de orígenes: estables LCP 68,3 % / CLS 81,7 % / INP 85,4 % / CWV 55,9 %; con soft navs LCP 72,1 % / CLS 85,1 % / INP 87,4 % / CWV 59,5 %. — [developer.chrome.com/docs/crux/release-notes](https://developer.chrome.com/docs/crux/release-notes/)
- Los nuevos campos se llaman `experimental_largest_contentful_paint_with_softnavs` y `experimental_interaction_to_next_paint_with_softnavs` (INP por soft navigation además de por hard navigation). Los scores estables no cambian "por ahora"; Chrome apunta a sacar las métricas de experimental en **mayo 2027**, sujeto a feedback, y cuando eso pase Search Console pasará a los nuevos datos. Sitios SPA-heavy verán tasas de aprobación mayores; la mayoría verá poco cambio. — [SEJ: Google Adds Experimental Soft Navigation Metrics To CrUX](https://www.searchenginejournal.com/google-experimental-soft-navigation-metrics-crux/592820/) (terciario, resumiendo anuncio de Annie Sullivan en web.dev del 2026-10-13); [web.dev: How SPA architectures affect Core Web Vitals](https://web.dev/articles/vitals-spa-faq)
- "Engagement Reliability" / "Visual Stability Index": aparecen únicamente en un blog de marketing ([ideafueled.com](https://ideafueled.com/blog/core-web-vitals-2026-explained/)) sin respaldo de Chrome o Google. **No verificado; tratar como inexistente.**
- Tendencia INP 2026: regresión continua en Android desde mayo 2026 ("cause unknown" en agosto 2026). — [CrUX release notes](https://developer.chrome.com/docs/crux/release-notes/)

### Inferences
- Para un sitio Next.js App Router con navegación cliente (`<Link>`), las soft navigations van a contar a partir de 2027: cada cambio de ruta en cliente tendrá su propio LCP/INP/CLS. Conviene medir ya con las variantes experimentales en CrUX API para no llevarse sorpresas (p.ej. LCP alto en transiciones que cargan datos en cliente).
- La regresión de INP en Android refuerza priorizar INP (hidratación mínima, handlers livianos en calculadoras) sobre LCP, que ya es alto en el dataset.

### Gaps
- No encontré documentación de Chrome que fije fecha exacta de salida de experimental (el "mayo 2027" viene de SEJ citando a Chrome; verificar en web.dev antes de planificar).

---

## Pregunta 2 — CWV como factor de ranking hoy (qué dice Google)

### Takeaway
Google mantiene que los CWV "son usados por nuestros sistemas de ranking" pero que no hay señal única y que buenos scores no garantizan rankings; el resto de la "page experience" (HTTPS, sin intersticiales) no ayuda directamente a rankear.

### Cited Findings
- "Core Web Vitals are used by our ranking systems"; "there's more to great page experience than Core Web Vitals scores alone"; FAQ: "There is no single signal". Otros aspectos de page experience "don't directly help your website rank higher". Página actualizada **2026-09-22**. — [Understanding page experience in Google Search results](https://developers.google.com/search/docs/appearance/page-experience)

### Inferences
- CWV es un desempate/señal menor; la inversión se justifica más por conversión/retención que por ranking. Para 20k páginas programáticas, pasar CWV en p75 evita el "needs improvement" masivo en Search Console pero no mueve posiciones por sí solo.

### Gaps
- Ninguno relevante.

---

## Pregunta 3 — Cómo renderiza JS Googlebot en 2026 y por qué importa SSR/streaming

### Takeaway
Googlebot sigue el modelo crawl → cola de render → index con Chromium evergreen; el render "puede tardar segundos o más", páginas no-200 pueden no renderizarse, y Google sigue recomendando SSR/pre-render. Novedad 2026: Googlebot corta el HTML a **2 MB (headers incluidos)**; CSS/JS tienen contador propio; el WRS no pide imágenes, video ni fuentes.

### Cited Findings
- Tres fases: crawling, rendering, indexing. Toda página 200 va a la cola de render "may stay on this queue for a few seconds, but it can take longer than that"; páginas no-200 (p.ej. 404) pueden saltarse el render. Chromium headless evergreen. El WRS puede ignorar headers de caché y usar JS/CSS viejo → usar fingerprinting en nombres de archivo. Shadow/light DOM se aplanan. SSR/pre-rendering "sigue siendo recomendado" porque no todos los bots ejecutan JS. "When Google encounters the noindex tag, it may skip rendering and JavaScript execution" → no poner noindex en el HTML inicial si se quiere indexar. No cambiar el canonical por JS. Actualizado 2026-03-04. — [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- Post de Gary Illyes "Inside Googlebot: demystifying crawling, fetching, and the bytes we process" (marzo 2026): Googlebot obtiene hasta **2 MB** por URL (PDF: 64 MB; crawlers sin límite declarado: 15 MB por defecto). **Los headers HTTP cuentan dentro de los 2 MB.** Pasado el corte no rechaza la página: manda lo truncado a indexación y al WRS "como si estuviera completo"; lo que queda después de 2 MB nunca se fetchea ni indexa. CSS y JS externos tienen cada uno su propio contador separado. El WRS fetchea JS, CSS y XHR, pero **no** imágenes, video ni fuentes. El límite "is not set in stone and may change over time". — [SEJ, 2026-03-31, resumiendo el post de Google](https://www.searchenginejournal.com/google-explains-googlebot-byte-limits-and-crawling-architecture/570961/); post original: [developers.google.com/search/blog/2026/03/crawler-blog-post](https://developers.google.com/search/blog/2026/03/crawler-blog-post) (no pude extraer el cuerpo por WebFetch; confirmado vía SEJ, [Search Engine Roundtable](https://www.seroundtable.com/google-explains-googlebot-41136.html) y [Search Engine Land](https://searchengineland.com/google-explains-how-crawling-works-in-2026-473110)). Tema también en Search Off the Record ep. "Are websites getting fat?" — [podcastaddict listing](https://podcastaddict.com/search-off-the-record/episode/220468435)
- Post anterior de 2022 que fijaba 15 MB: — [Googlebot and the 15 MB thing](https://developers.google.com/search/blog/2022/06/googlebot-15mb). Un reporte japonés de febrero 2026 dice que usuarios vieron páginas cortadas a fines de 2025 coincidiendo con la baja de 15 → 2 MB (secundario). — [internet.watch.impress.co.jp](https://internet.watch.impress.co.jp/docs/yajiuma/2084460.html)
- Next.js 15.2+ hace *streaming metadata*: si `generateMetadata` es dinámico, los tags se agregan al `<body>` después del UI inicial; Vercel "verificó" que Googlebot los interpreta porque ejecuta JS e inspecciona el DOM completo. Para bots HTML-limited (p.ej. `facebookexternalhit`) detectados por User-Agent, el metadata bloquea y va en `<head>`. Se puede forzar bloqueo total con `htmlLimitedBots: /.*/`. Doc actualizada 2026-08-19. — [nextjs.org generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### Inferences
- Un HTML de 130 KB está lejísimos de 2 MB; el riesgo real es el **payload RSC inline** (`self.__next_f.push(...)`) en páginas con tablas grandes (rankings, sueldos por país): medir el HTML sin comprimir de las páginas más pesadas y mantenerlo bajo ~1 MB con margen, porque los headers también cuentan.
- Si `generateMetadata` es prerenderizado (ISR estático sin APIs de request), canonical/hreflang van en `<head>` en el HTML inicial, que es lo deseable. Evitar `cookies()/headers()/searchParams` en `generateMetadata` de páginas SEO para no depender del streaming ni del render de Google (que "puede tardar más").
- Como el WRS no descarga fuentes, los problemas de fuentes (CJK/Arabic) afectan a usuarios y CWV de campo, no al indexado.

### Gaps
- No pude leer el post original de Google de marzo 2026 (WebFetch devuelve sólo el archivo del blog); los datos vienen de tres medios SEO coincidentes. No encontré declaración oficial de si los 2 MB se miden comprimidos o sin comprimir (SEJ dice que el post no lo aclara).

---

## Pregunta 4 — Crawl budget para 10k+ URLs: tiempos de respuesta, 304/ETag, lastmod, parámetros, 404/410, soft 404

### Takeaway
Google no publica un target de milisegundos: el límite de capacidad sube con TTFB "estable o mejorando" y baja con lentitud/5xx/429. Recomienda soportar 304, lastmod honesto, consolidar duplicados (nunca con noindex para "ahorrar"), y 404/410 (tratados igual) para páginas eliminadas. El sitio de 15–20k URLs cae en "medium or larger (10,000+)" sólo si cambia a diario.

### Cited Findings
- Crawl budget importa para "Large sites (1 million+ unique pages)" que cambian ~semanalmente, "Medium or larger sites (10,000+ unique pages)" con cambios diarios, o sitios con muchas URLs en "Discovered - currently not indexed". Cada hostname tiene su propio budget. Respuestas "stable or improving" (latencia, TTFB) suben el crawl capacity limit; respuestas lentas o errores lo bajan. 5xx y 429 reducen la capacidad. "Hostload exceeded" en URL Inspection → más recursos de servidor. **Sin cifra en milisegundos.** Soportar 304 Not Modified para que Google reutilice su copia. Mantener sitemaps al día con `<lastmod>`. Consolidar duplicados; si no se puede, bloquear variantes sin valor en robots.txt (infinite scroll, ordenamientos). "Don't use noindex" para esto: Google igual pide la página y la descarta. No usar robots.txt para "liberar" budget: sólo se reasigna si ya se está tocando el límite. 404/410 para eliminadas: Google no olvida la URL pero el 404 es señal fuerte de no recrawlear; URLs bloqueadas quedan más tiempo en cola. Arreglar soft 404 (siguen consumiendo). Evitar cadenas de redirects. — [Large site owner's guide to managing your crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) (también en la nueva ubicación [developers.google.com/crawling/docs/crawl-budget](https://developers.google.com/crawling/docs/crawl-budget))
- Códigos HTTP: "All 4xx errors, except 429, are treated the same" → 404 y 410 son equivalentes para Google; URLs indexadas con 4xx se eliminan; 404 nuevos no se procesan y la frecuencia de crawl baja gradualmente. 301 = señal fuerte; **308 equivalente a 301**; 302 = señal débil; 307 equivalente a 302. 304: "content hasn't changed", el pipeline puede recalcular señales pero no afecta indexación. 5xx y 429 bajan la tasa de crawl en proporción a los errores; persistentes → eliminación del índice. Soft 404 = respuesta 2xx con contenido que sugiere error (página vacía o mensaje de error); se reporta en Search Console. Redirects: hasta 10 saltos. Sin mención de límite de bytes. — [HTTP status codes, network and DNS errors](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- No usar 404/403/410 para frenar a Googlebot; sólo 429 o 5xx señalan sobrecarga. — [Don't 404 my yum (2023-02)](https://developers.google.com/search/blog/2023/02/dont-404-my-yum)
- lastmod: "Google uses the <lastmod> value if it's consistently and verifiably accurate"; puede compararlo con la fecha real; debe reflejar la última modificación significativa ("main content, the structured data, or links"); cambiar el copyright no cuenta. — [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Un blog afirma que "desde julio 2026" la guía de crawl budget recomienda explícitamente 304 (terciario; la guía efectivamente lo recomienda hoy, la fecha de inclusión no la verifiqué). — [capconvert.com](https://www.capconvert.com/learn/blog/xml-sitemaps-and-lastmod-tags-do-they-still-matter-for-google-and-ai-crawlers)

### Inferences
- Con 15–20k páginas ISR en Vercel, el crawl budget no debería ser el cuello de botella si (a) TTFB desde CDN es estable, (b) no hay 5xx en revalidación (Vercel sirve stale ante fallo, ver P8), (c) no se generan variantes con parámetros. El riesgo típico de un sitio programático es "Discovered – currently not indexed" por **calidad/duplicación**, no por capacidad.
- 304/ETag en Vercel: las respuestas ISR/estáticas llevan ETag y la CDN responde 304 a `If-None-Match`; para `If-Modified-Since` hace falta `Last-Modified`. No encontré doc oficial de Vercel que confirme el 304 para ISR en App Router → verificar con `curl -I -H 'If-None-Match: ...'` en producción antes de asumirlo.
- 404 vs 410 para países retirados: para Google son iguales; 410 es semánticamente más limpio y no perjudica. Si la página de país tiene equivalente (otro idioma/país), un 308 al equivalente conserva señales; si no, 410 + sacarla del sitemap + quitar sus `xhtml:link` de todos los hermanos (si no, "missing return link").

### Gaps
- Google no publica un objetivo numérico de TTFB para crawl (confirmado: la guía dice "no specific millisecond targets"). Las cifras tipo "<200 ms" / "<600 ms" que circulan son de terceros; la única cifra oficial relacionada es el umbral de CWV LCP 2,5 s (y web.dev recomienda TTFB ≤ 800 ms para usuarios, no para crawl — no re-verificado en esta sesión).

---

## Pregunta 5 — Sitemaps + hreflang: límites reales, `xhtml:link` en índice, matemática de tamaño con 100 alternates

### Takeaway
Límites: 50.000 URLs o 50 MB sin comprimir por sitemap; índice con hasta 50.000 `<loc>`; 500 índices por sitio en Search Console. Los `xhtml:link` **no cuentan para el límite de URLs pero sí para los 50 MB**, y Google no documenta hreflang en entradas de índice (sólo en `<urlset>`). Con 100 alternates por URL, el tope práctico es ~4.000–4.700 URLs por archivo, no 50.000.

### Cited Findings
- "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs"; UTF-8; si se excede, dividir. — [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- "A sitemap index file may have up to 50,000 loc tags"; "all the sitemap requirements apply to sitemap index files also"; los sitemaps referenciados deben estar en el mismo sitio y en el directorio del índice o más profundo; hasta **500 sitemap index files por sitio** en Search Console. **No dice** si un índice puede apuntar a otro índice. — [Manage sitemaps with sitemap index file](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps)
- hreflang en sitemap: namespace `xmlns:xhtml="http://www.w3.org/1999/xhtml"`; cada `<url>` lleva `<xhtml:link rel="alternate" hreflang="..." href="...">` para "every alternate version of the page, including itself"; "Child elements don't count towards the URL limit for sitemaps"; URLs totalmente calificadas con protocolo; el sitemap sólo puede contener descendientes del directorio donde está alojado. Reciprocidad obligatoria: si dos páginas no se enlazan mutuamente, "the tags will be ignored". Códigos: ISO 639-1 + opcional ISO 3166-1 alpha-2; región sola es inválida; `EU`, `UN`, `UK` se ignoran. x-default: recomendado para selector de idioma/fallback (ejemplos HTML y header). Header `Link:` disponible para no-HTML y debe ser idéntico en todas las versiones. **No menciona** hreflang en índices ni límites de cantidad de alternates. — [Localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Next.js: `alternates.languages` emite `<link rel="alternate" hreflang="xx" href="...">`; con `metadataBase` se pueden usar rutas relativas. — [nextjs.org generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

### Inferences (matemática de tamaño)
- Una línea `<xhtml:link rel="alternate" hreflang="es-AR" href="https://calcularya.com/ar/es/sueldo-neto/"/>` pesa ~95–115 bytes. Con 100 alternates + `<loc>` + `<lastmod>` cada `<url>` ocupa ~10–12 KB. 50 MB / ~11 KB ≈ **4.500 URLs por archivo** (usar 3.000–4.000 de tope con margen por slugs largos y x-default). 20.000 URLs × ~11 KB ≈ 220 MB sin comprimir → **~50–70 archivos** bajo un índice; muy por debajo del tope de 50.000 `<loc>` del índice. Gzip reduce ~90 % el transfer pero el límite es sobre tamaño sin comprimir.
- Como el límite de 50k es por URLs `<loc>` y no por hijos, lo que manda es el peso: **particionar por tamaño de bytes, no por cantidad de URLs**, y validar con un script que ningún archivo pase 45 MB.
- Reciprocidad a escala: al agregar o retirar un país/idioma se deben regenerar **todos** los archivos del clúster afectado, no sólo el nuevo; un generador determinista desde una única tabla país×idioma×slug evita "missing return links". Mantener el clúster coherente también en `<head>`: Google no exige usar ambos canales, y para 100 alternates el `<head>` suma ~10 KB de HTML por página (10 KB × 20k páginas ISR = 200 MB de ISR writes extra; ver P8). **Una opción viable es hreflang sólo en sitemap y `<head>` sólo con canonical**, que es exactamente lo que Google acepta ("you can use sitemaps" como método alternativo). Decisión a tomar según coste de ISR y verificabilidad (el header `<head>` lo muestra URL Inspection; el sitemap no).
- Índice de índices: no documentado por Google; el protocolo sitemaps.org tampoco lo prevé. Con 500 índices permitidos por propiedad y 50k `<loc>` por índice, no hace falta anidar.

### Gaps
- Google no documenta un máximo de `xhtml:link` por `<url>` ni un peso recomendado; los 100 alternates por URL sólo están limitados por los 50 MB. No hallé estudios (Ahrefs/Merkle/Onely) 2025-2026 sobre clústeres hreflang de 100+ con datos de procesamiento; el riesgo de que Google ignore clústeres gigantes queda sin evidencia.

---

## Pregunta 6 — Valor actual de IndexNow y Google Indexing API

### Takeaway
Google sigue sin adoptar IndexNow (sirve para Bing, Yandex, Naver, Seznam, Yep); la Indexing API de Google sigue oficialmente limitada a JobPosting y BroadcastEvent. Para Google, lo que queda es sitemap con lastmod honesto, enlaces internos y URL Inspection manual.

### Cited Findings
- Google no figura entre los participantes de indexnow.org (chequeado por terceros a septiembre 2026); motores que sí: Bing, Yandex, Naver, Seznam, Yep. — [indexernow.com](https://www.indexernow.com/google-indexnow); [pressonify.ai](https://pressonify.ai/blog/indexnow-instant-indexing-press-releases-2026); [Wikipedia IndexNow](https://en.wikipedia.org/wiki/IndexNow) (todos terciarios; la lista oficial está en indexnow.org, no consultada en esta sesión)
- Indexing API "officially scoped to JobPosting and BroadcastEvent"; usarla para páginas comunes es una zona gris no soportada; algunos blogs reportan que "funciona" para posts comunes (anecdótico y contra ToS). — [crawlwp.com](https://crawlwp.com/indexnow-vs-google-indexing-api-vs-sitemaps/); [indexfast.co](https://indexfast.co/blog/indexnow-vs-indexing-api)
- Google: "Google uses the <lastmod> value if it's consistently and verifiably accurate". — [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### Inferences
- IndexNow vale como ping barato a Bing/Yandex/Naver (relevante para Corea/Rusia/Turquía dentro de los 100 países) y para ChatGPT/Copilot que consumen el índice de Bing; para Google el único "ping" legítimo es el sitemap con lastmod real. Usar la Indexing API para calculadoras violaría la línea roja "no violar ToS".

### Gaps
- No verifiqué en indexnow.org la lista oficial de participantes en esta sesión.

---

## Pregunta 7 — Fuentes por idioma, RTL/CJK y CWV

### Takeaway
Google (WRS) no descarga fuentes, así que las fuentes no afectan el indexado pero sí LCP/CLS de campo. Guía oficial: subsetting por `unicode-range` (CJK >10k glifos; "optimizar CJK es particularmente desafiante"), WOFF2, `font-display: swap`/`optional`, `size-adjust` en fallback para CLS, preload sólo de la fuente crítica (preload ignora `unicode-range`). No hay guía oficial específica para árabe/hebreo.

### Cited Findings
- `unicode-range` descarga la fuente sólo si la página contiene esos caracteres; fuentes latinas "100 to 1000 glyphs", "CJK fonts may have over 10,000 characters"; Google Fonts ya subsetea por script (latin, latin-ext, devanagari…) y es fácil perder eso al self-hostear; "optimizing for CJK languages is particularly challenging". Self-host sólo gana con CDN + HTTP/2. `preload` ignora `unicode-range` y compite con otros recursos: usarlo sólo para la fuente más importante en un único formato. Chromium/Firefox bloquean texto hasta 3 s por defecto, Safari indefinidamente; `swap` = 0 ms block; `optional` = 100 ms block y minimiza shifts; `block` también puede causar shift. Recomendación combinada: `swap` para branding, `optional` para cuerpo. `size-adjust` para reducir CLS entre fallback y web font. Iconos: SVG antes que icon fonts. Última actualización 2022-10-04. **No menciona árabe.** — [web.dev Best practices for fonts](https://web.dev/articles/font-best-practices)
- El WRS "doesn't request images or videos. Media files and fonts aren't fetched." — [SEJ sobre el post de Illyes 2026-03](https://www.searchenginejournal.com/google-explains-googlebot-byte-limits-and-crawling-architecture/570961/)
- Terceros: fuente CJK completa 5–30 MB; con `unicode-range` por rangos una página típica baja a <100 KB (mejor caso). Fallback con `ascent-override`/`descent-override`/`line-gap-override`/`size-adjust` como "mayor ganancia de CLS" (tutorial de vendor, no estándar). — [unicodefyi.com web fonts](https://unicodefyi.com/glossary/web-fonts/); [kilo.ai font-optimizer](https://kilo.ai/kiloclaw/bytes/font-optimizer); [apogeewatcher](https://apogeewatcher.com/blog/font-subsetting-web-performance-4-tools-reduce-font-file-size-lcp)

### Inferences
- Para 30 idiomas en un solo layout: cargar fuentes por `[lang]` (next/font con `subsets` por locale, o `@font-face` con `unicode-range` por script) y **nunca** una pila global que incluya CJK/árabe en todas las páginas. Para CJK la opción más barata en CWV es `font-display: optional` + fallback del sistema (Noto Sans CJK suele estar instalada en Android/Windows/macOS), aceptando que la web font a veces no se use.
- RTL: `dir="rtl"` en `<html>` desde el servidor (no por JS) para evitar CLS por re-layout; usar propiedades lógicas CSS (`margin-inline-start`) para no duplicar hojas de estilo.
- Dado que el LCP de una calculadora suele ser texto (título/H1) y no imagen, el `font-display` elegido impacta directamente en LCP: `optional`/`swap` con fallback métrico.

### Gaps
- No encontré guía de Google/Chrome 2025-2026 sobre métricas de fallback para árabe/hebreo (altura de línea, kashida); la práctica de `size-adjust` por script no está documentada oficialmente.

---

## Pregunta 8 — OG images, ISR y caché en Vercel (costes, `stale-while-revalidate`, headers)

### Takeaway
En Vercel, ISR escribe `Cache-Control` solo (s-maxage = revalidate, SWR = expire − revalidate), con caché CDN gratis y caché ISR durable cobrada por unidades de 8 KB (reads/writes); nada se cobra si la revalidación no cambia el contenido. `opengraph-image.tsx` es un Route Handler **estático por defecto** (build-time y cacheado) salvo que use APIs de request o datos no cacheados; no pasa por Image Optimization.

### Cited Findings
- ISR en Vercel: "manages Cache-Control headers automatically"; patrón stale-while-revalidate; caché ISR durable en la región de la función, persiste "until you revalidate it or it goes unaccessed for 31 days", scoped por deployment (cada deploy arranca con caché propia; rollback conserva la vieja); cache shielding (lee ISR cache antes de invocar la función); request collapsing por región; purgas globales en <300 ms; revalidación fallida → sirve stale y reintenta a los 30 s (fallo = red, status distinto de 200/301/302/307/308/404/410, o error de función). Costes: invocaciones (revalidaciones), ISR writes, ISR reads, Fast Origin Transfer. On-demand revalidation aplica sólo al dominio/deployment donde se dispara. Doc actualizada 2026-08-28. — [vercel.com/docs/incremental-static-regeneration](https://vercel.com/docs/incremental-static-regeneration)
- Pricing ISR: CDN reads/writes gratis; durable reads/writes en **unidades de 8 KB**, precio regional según región de función (iad1 siempre se elige si está); sin límite de almacenamiento; CDN cache "ephemeral… minutes to hours"; "When revalidation runs and the content hasn't changed from the previous version, no ISR write units are incurred" (time-based y on-demand). Writes inesperados → buscar `new Date()`, `Math.random()` u otro no-determinismo en el output. Métrica "Write Utilization" en Observability+. Doc actualizada 2026-08-11. — [ISR Usage and Pricing](https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing)
- Next.js (docs CDN caching, vía búsqueda): páginas ISR usan `s-maxage=<revalidate>, stale-while-revalidate=<expire − revalidate>`; expire por defecto 1 año; la caché CDN externa no soporta revalidación on-demand (sirve hasta vencer s-maxage). — [nextjs.org CDN caching guide](https://nextjs.org/docs/app/guides/cdn-caching) (resumen de búsqueda, no fetch directo)
- Vercel CDN para funciones: cachea sólo con `s-maxage` (opcional SWR); `CDN-Cache-Control` controla la CDN de Vercel separado del browser; `Vercel-CDN-Cache-Control` afecta sólo a Vercel y no se reenvía. — [Vercel CDN Cache](https://vercel.com/docs/caching/cdn-cache) (resumen de búsqueda)
- `opengraph-image.(js|tsx)`: "By default, generated images are statically optimized (generated at build time and cached) unless they use Request-time APIs or uncached data"; son Route Handlers especiales "cached by default"; acepta route segment config (p.ej. `revalidate`); `params` es Promise desde v16; límites de archivo estático: OG 8 MB, Twitter 5 MB (build falla si se excede); fuentes se cargan con `readFile` a nivel de módulo (una vez). Doc actualizada 2026-07-09. — [nextjs.org opengraph-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- Image Optimization (precio distinto a ISR): Hobby 5K transformaciones/mes, 300K cache reads, 100K cache writes; on-demand $0,05–0,0812 por 1K transformaciones, $0,40–0,64 por 1M reads, $4,00–6,40 por 1M writes (unidades 8 KB); transformación cobrada por MISS/STALE; límite 10 MB por imagen transformada, 8192 px; sólo jpeg/png/webp/avif. — [Image Optimization limits and pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)

### Inferences
- 20k OG images generadas con `ImageResponse` en build inflan el build; mejor `generateStaticParams` parcial (países top) y el resto on-demand con `revalidate` largo (p.ej. 30 días): primera visita paga una invocación + ~1 unidad de write por cada 8 KB de PNG (un OG de 100 KB ≈ 13 write units), después CDN/ISR cache. Los bots sociales (facebookexternalhit, WhatsApp, X) son quienes disparan el fetch; Googlebot no fetchea imágenes en WRS pero sí las descubre vía `og:image`/Google Images crawl.
- Mantener el HTML ISR determinista (sin fechas "actualizado hoy" generadas en render, sin IDs aleatorios) es la palanca de coste más grande: con 20k páginas, cada byte que cambia en cada revalidación se cobra.
- Para 304/ETag ver P4: verificar empíricamente en producción.

### Gaps
- No encontré doc oficial de Vercel sobre `ETag`/304 específicamente para ISR App Router ni el `Cache-Control` exacto que Next 16 emite con Cache Components (`use cache` + `cacheLife`) — verificar con `curl -I` en prod.
- Precios exactos de ISR read/write por región no están en la página (remite a "regional pricing"); no los consulté.

---

## Pregunta 9 — Next.js App Router: canonical + hreflang correctos y pitfalls (metas duplicadas, auto-referencia, metadataBase)

### Takeaway
Declarar `metadataBase` una vez en el root layout, generar `alternates.canonical` **y** `alternates.languages` (incluyendo la propia URL y `x-default`) en el `generateMetadata` de cada página de locale, desde la misma tabla que alimenta el sitemap; nunca poner `alternates.canonical` en un layout (se hereda a todas las páginas) y recordar que el merge es **shallow**: un `alternates`/`openGraph`/`robots` definido en la página reemplaza por completo al del layout.

### Cited Findings
- `metadataBase`: prefijo para campos que requieren URL absoluta, aplica al segmento actual y descendientes; "typically set in root app/layout.js"; ruta relativa sin `metadataBase` → **build error**; URL absoluta ignora `metadataBase`; `/payments`, `./payments`, `../payments` todos resuelven a `https://acme.com/payments` (favorece intención sobre traversal); con `'use cache'` en `generateMetadata` el retorno debe ser serializable → `metadataBase` como string. `alternates.canonical` → `<link rel="canonical">`; `alternates.languages: {'en-US': '/en-US'}` → `<link rel="alternate" hreflang="en-US" href="https://acme.com/en-US">`. Merge: objetos de metadata de layout→page se fusionan **shallow**; "Duplicate keys are replaced based on their ordering"; campos anidados (`openGraph`, `robots`) definidos antes son **sobrescritos** por el último segmento que los define (p.ej. se pierde `openGraph.description` del layout). No se puede exportar `metadata` y `generateMetadata` del mismo segmento. File-based metadata (opengraph-image, icon) tiene prioridad sobre el objeto. `robots` → `<meta name="robots" content="index, follow">` + `googlebot`. `fetch` dentro de `generateMetadata` se memoiza con el de la página. Con Cache Components, `generateMetadata` que toca `params`/`cookies()`/datos no cacheados "defers to request time" y si el resto es prerenderizable Next lanza error exigiendo `'use cache'` o un marcador dinámico. Doc actualizada 2026-08-19. — [nextjs.org generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- Google hreflang: cada versión debe listarse a sí misma y a todas las demás; sin reciprocidad se ignora; URLs absolutas; `x-default` para selector/fallback; códigos ISO 639-1 (+ ISO 3166-1 alpha-2 opcional); región sola inválida; `UK`/`EU`/`UN` se ignoran. No cambiar canonical por JS. — [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions); [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- Terceros coincidentes: no poner `alternates.canonical` en root layout (aplicaría a todas las páginas); cada locale canonicaliza a sí mismo (nunca EN → otro idioma, "tells Google to drop the translation"); x-default a `/en` sólo si es el default real; slugs traducidos → mapa locale→slug único que alimente páginas y sitemap, "or diff them in CI". — [seosnapshot.dev](https://seosnapshot.dev/blog/canonical-url-nextjs); [samioda.com 2026 guide](https://samioda.com/en/blog/nextjs-internationalization-i18n-app-router); [eastondev.com 2025-12-25](https://eastondev.com/blog/en/posts/dev/20251225-nextjs-i18n-seo/); [dev.to Next.js 16 4-language site](https://dev.to/olivia_342fsfsdgrere/running-a-4-language-nextjs-16-site-for-humans-and-ai-crawlers-hreflang-llmstxt-json-ld-and-42j)

### Inferences
- Patrón recomendado: `app/layout.tsx` → sólo `metadataBase` + `title.template` + `robots` globales; `app/[country]/[lang]/[slug]/page.tsx` → `generateMetadata` devuelve `{ alternates: { canonical: '/ar/es/sueldo-neto', languages: { 'es-AR': '/ar/es/sueldo-neto', ..., 'x-default': '/en/sueldo-neto' } } }` construido por la misma función que arma el sitemap. Como `generateMetadata` debe ser prerenderizable para que vaya en `<head>`, usar sólo `params` (no `searchParams`/`headers()`) y datos cacheados.
- Duplicados típicos: (1) `alternates` en layout **y** en page → shallow merge: gana la page, pero si la page no define `alternates`, hereda el canonical del layout = canonical equivocado en todas las páginas hijas; (2) `<link rel="canonical">` manual en JSX + `alternates.canonical` → dos canonicals; (3) rutas con/sin trailing slash según `trailingSlash` de next.config vs. el canonical declarado → mismatch que Google resuelve eligiendo él (todas las URLs del clúster deben usar la misma convención).
- Para `noindex` en páginas que se desindexan: `robots: { index: false }` en `generateMetadata` (va en `<head>` si es prerenderizado). No confiar en noindex agregado por streaming/JS: Google puede saltar el render al ver noindex, y al revés, un noindex que llega tarde puede no verse en el primer pase.

### Gaps
- No hay doc oficial de Next.js sobre el tamaño máximo razonable de `alternates.languages` (100 entradas × 20k páginas) ni sobre su impacto en el payload RSC; sólo se infiere del peso del HTML (~10 KB/página).

---

## Pregunta 10 — `noindex` meta vs `X-Robots-Tag`, 404 vs 410, 308 para cambios de slug

### Takeaway
Meta robots y `X-Robots-Tag` son equivalentes regla por regla; el header es obligatorio para no-HTML y cómodo para aplicar por ruta en `next.config`/proxy; la regla más restrictiva gana; un noindex bloqueado por robots.txt no se lee. 404 y 410 se tratan igual; 308 equivale a 301.

### Cited Findings
- "Any rule that can be used in a robots meta tag can also be specified as an X-Robots-Tag"; header para PDF/imágenes/video; "In the case of conflicting robots rules, the more restrictive rule applies"; páginas bloqueadas por robots.txt → directivas "will not be found and will therefore be ignored"; `indexifembedded` sólo tiene efecto junto a `noindex`. Actualizado 2026-03-24. — [Robots meta tag, data-nosnippet, and X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- 4xx (salvo 429) iguales; 308 = 301 (señal fuerte); 307 = 302 (débil); hasta 10 redirects. — [HTTP status codes](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- Crawl budget: "Don't use noindex" para liberar budget (Google igual pide la página). 404/410 para eliminadas. — [Crawl budget guide](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)
- Next.js `redirect()` y `permanentRedirect()` existen; `redirects` de `next.config` con `permanent: true` emite 308 (comportamiento documentado de Next; no re-verificado en esta sesión — ver Gaps).

### Inferences
- Cambio de slug: 308 desde el slug viejo al nuevo (por `next.config` `redirects` o reglas bulk de Vercel), actualizar canonical, sitemap (sacar la vieja, lastmod nuevo en la nueva) y los `xhtml:link` de todo el clúster en el mismo deploy. Evitar cadenas (viejo→intermedio→nuevo): Google tolera 10 saltos pero cada salto gasta crawl.
- Países retirados: 410 (o 404) + eliminar del sitemap + eliminar de los alternates de los hermanos. **No** redirigir al home ni a una página poco relacionada: Google lo trata como soft 404 (ver P11).
- `X-Robots-Tag` conviene en Vercel para bloquear de un plumazo patrones (`/api/*`, `/og/*`, previews) vía `headers()` de next.config; `robots` metadata para decisiones por página.

### Gaps
- No re-verifiqué en esta sesión la doc de Next 16 sobre `permanentRedirect()`/`redirects` emitiendo 308; es comportamiento conocido desde Next 13 pero conviene confirmarlo con `curl -I`.

---

## Pregunta 11 — Soft 404 y páginas cuyo contenido principal es un formulario/calculadora

### Takeaway
Google define soft 404 como 2xx con contenido que "sugiere error" (vacío o mensaje de error) y lo reporta en Search Console; no hay declaración oficial de que un formulario/calculadora sea per se soft 404, pero sí evidencia de que páginas "esqueléticas" (poco texto, layout vacío) y redirects a páginas poco relacionadas se clasifican como soft 404, y Mueller señala que el layout/visual cuenta, no sólo el texto.

### Cited Findings
- Soft 404 = "2xx response has content that suggests an error, such as an empty page or an error message"; Search Console los reporta. — [HTTP status codes](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- Para soft 404 en apps cliente: redirigir por JS a una URL que devuelva 404 o inyectar meta noindex. Páginas no-200 pueden no renderizarse. — [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- Mueller (vía Search Console guide, min 23:12 de un video): "it's not just about the words on the page – layout, design, and visuals matter too". — [sitechecker.pro soft 404 guide](https://sitechecker.pro/google-search-console/soft-404-errors/) (secundario)
- Páginas útiles pero muy cortas (definición, spec única, dirección+mapa) se clasifican como soft 404 "porque parecen esqueléticas"; fix: texto real + enlaces internos. Una página de contacto con dirección y formulario se trata distinto de "heading + one-line intro + check back soon". — [ambeltek.com](https://ambeltek.com/blog/soft-404-errors/); [amrutservices.com](https://amrutservices.com/soft-404s) (terciarios)
- Caso de estudio: 301 a páginas menos relevantes son vistos como soft 404. — [gsqi.com](https://www.gsqi.com/marketing-blog/redirects-less-relevant-pages-soft-404s/); recordatorio de Google de no redirigir páginas muertas al home. — [seroundtable](https://www.seroundtable.com/301-404-pages-to-your-home-page-26923.html)
- Mueller 2026: 200 con contenido de 404 = "definitely soft-404". — [seroundtable 2026-01](https://www.seroundtable.com/google-why-404s-seo-40692.html)
- Documentación aclarada en diciembre 2025: páginas con status no-200 pueden no renderizarse. — [ppc.land soft 404](https://ppc.land/soft-404/) (secundario)
- Dato directo del proyecto: las release notes de CrUX muestran que la calidad "vacía" se juzga por lo renderizado; y Google indexa sólo lo que está en el HTML renderizado (shadow DOM aplanado). — [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

### Inferences
- Una calculadora cuyo HTML inicial es sólo `<form>` con inputs vacíos y un botón se parece a una página "esquelética": riesgo de soft 404 o de "Crawled – currently not indexed". Mitigación concreta y verificable en URL Inspection: (1) SSR de un **resultado por defecto** (ejemplo precalculado con valores típicos del país: "Con un sueldo bruto de X, el neto es Y"); (2) tabla/escala de referencia renderizada en servidor (tramos, ejemplos por rango); (3) 200–400 palabras de explicación con cifras oficiales y fecha; (4) FAQ y enlaces internos al clúster del país; (5) JSON-LD (`WebApplication`/`FAQPage`); (6) que el contenido no dependa de JS para pintarse (el render de Google puede demorar y el WRS trunca a 2 MB).
- Países/idiomas con datos incompletos (sin escalas oficiales) no deberían publicarse como páginas 200 "vacías": mejor no generarlas (o 404) hasta tener datos, para no alimentar el patrón soft 404 en todo el clúster hreflang.

### Gaps
- No encontré ninguna declaración oficial de Google 2025-2026 específica sobre calculadoras/forms como "thin"; la evidencia es indirecta (definición de soft 404 + comentarios de Mueller + casos de terceros).
- No encontré estudios de Ahrefs/Onely/Merkle 2025-2026 sobre tasa de indexación de páginas de herramientas programáticas.
