# Arquitectura SEO internacional: hreflang, geotargeting y motores no-Google (estado 2026)

Fecha de consulta de todas las fuentes: **2026-10-27**, salvo que se indique otra. Todo lo anterior a 2025 está marcado como tal.

Contexto: calcularya.com (.com, ~100 países en subcarpetas `/mx`, `/de`, `/jp`…) + calcular.ar (ccTLD Argentina).

---

## Pregunta 1 — ¿Qué dice la documentación oficial de Google HOY sobre hreflang y sitios multi-región? ¿Cambios 2025-2026?

### Takeaway
La doc oficial (actualizada 2026-09-21) no cambió las reglas de fondo: tres métodos equivalentes (HTML head, HTTP header, sitemap), reciprocidad obligatoria, códigos ISO 639-1 + ISO 3166-1 alpha-2, `x-default` recomendado, y **ningún límite numérico de alternates por página**. El único límite duro es el del sitemap (50.000 URLs / 50 MB, y los `xhtml:link` no cuentan para el límite de URLs). No hay ningún anuncio 2025-2026 de Google que modifique hreflang; lo relevante de 2025 son aclaraciones de Mueller (hreflang es pista, no directiva; no garantiza indexación; variantes del mismo idioma se agrupan).

### Cited Findings
- Tres métodos: HTML `<link>` en `<head>`, HTTP header `Link:` y sitemap. "The three methods are equivalent from Google's perspective." Usar los tres no da beneficio. — [Google: Localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions) (página "Last updated 2026-09-21 UTC")
- Reciprocidad: cada versión debe listarse a sí misma y a todas las demás; "If two pages don't both point to each other, the tags will be ignored." Se pueden omitir algunos idiomas en algunas páginas: Google procesa los pares recíprocos que existan. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- URLs alternas deben ser absolutas con protocolo, y **pueden estar en dominios distintos** (base para el cross-domain calcularya.com ↔ calcular.ar). — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Códigos: idioma ISO 639-1, región ISO 3166-1 alpha-2; `es-419` **no** es soportado; "You can't specify the country code by itself"; `EU`, `UN`, `UK` "doesn't have an effect"; script ISO 15924 (`zh-Hant`, `zh-Hans-US`); valores case-insensitive. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Formatos válidos: sólo idioma (`de`) y idioma-región (`en-GB`). Si hay varias variantes regionales de un idioma, Google recomienda tener además una página "catchall" para ese idioma sin región. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- `x-default`: "used when no other language/region matches the user's browser setting"; recomendado para selectores de idioma y home que redirige. No lleva código de idioma. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Sitemap: namespace `xmlns:xhtml="http://www.w3.org/1999/xhtml"`, cada `<url>` lista todos los alternates incluido el propio; "Child elements don't count towards the URL limit for sitemaps"; un sitemap sólo puede contener URLs descendientes del directorio donde se aloja. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Límite por archivo: "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs." Sitemaps cross-domain permitidos si se verifica la propiedad de cada sitio en Search Console (o se referencia desde el robots.txt de cada sitio). — [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (Last updated 2026-07-08)
- Google **no** usa hreflang ni `<html lang>` para detectar el idioma de la página; detecta por contenido. Las versiones localizadas sólo son duplicados "if the main content of the page remains untranslated". — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Errores comunes listados por Google: return links faltantes, código de idioma incorrecto (región sola), códigos reservados. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Mayo 2025, John Mueller: "hreflang doesn't guarantee indexing, so it can also just be that not all variations are indexed"; sobre variantes mismo idioma: "I suspect this is a 'same language' case where our systems just try to simplify things for sites"; "it's common that one is chosen as canonical (they're the same)" (fr-fr / fr-be). — [Search Engine Journal, 2025-05-12](https://www.searchenginejournal.com/google-reminds-that-hreflang-tags-are-hints-not-directives/546428/); [Search Engine Roundtable](https://www.seroundtable.com/google-hreflang-doesnt-guarantee-indexing-39388.html)
- Mueller: self-referencing hreflang "optional - but good practice" (contradice la doc oficial, que lo exige); hreflang es "one of the most complex aspects of SEO". Ahrefs: x-default "You don't have to use them, but Google recommends that you do". — [Ahrefs hreflang guide, actualizado 2025-03-08](https://ahrefs.com/blog/hreflang-tags/)
- Mueller (2025): hreflang apuntando a URLs con 301 es "probably OK", pero mejor links limpios. — [Search Engine Roundtable](https://www.seroundtable.com/google-hreflang-301-redirects-39185.html)
- Anterior (2022): "there is no bonus for hreflang, it's only about showing the most-fitting page in search for users in a specific country / language". — [Search Engine Roundtable, 2022](https://seroundtable.com/using-hreflang-34127.html)
- Anterior (2014): x-default pensado para home/selector de país y home con auto-redirect; se puede anotar como x-default la página genérica aunque sólo redirija. — [Google Search Central blog, mayo 2014 (ES)](https://developers.google.com/search/blog/2014/05/creating-right-homepage-for-your?hl=es)

### Inferences
- Para ~100 países el método sitemap es el que escala: no hay límite de `xhtml:link` por URL, y el límite de 50k URLs se maneja con un sitemap index. Con 100 alternates × N páginas, el `<head>` crecería ~100 líneas por página; Google lo acepta pero la práctica (ver P2) va a sitemap.
- Elegir **un** método y ser consistente; mezclar no aporta y complica auditar la reciprocidad.
- Cross-domain calcularya.com ↔ calcular.ar: válido con cualquier método; con sitemap, lo más limpio es que cada dominio aloje su propio sitemap listando los alternates del otro (ambos verificados en GSC).

### Gaps
- No hay límite numérico oficial de hreflang por página publicado por Google (confirmado por ausencia en la doc; no es un hallazgo negativo verificado por declaración explícita).
- No encontré cambios anunciados 2025-2026 en hreflang en Search Central blog; la búsqueda no devolvió office hours 2026 sobre el tema.

---

## Pregunta 2 — ¿Cómo lo estructuran los sitios grandes single-domain (Wise, Deel, Numbeo, talent.com, Booking, Airbnb)? ¿Case studies 2024-2026 con resultados?

### Takeaway
Inspección directa del HTML (2026-10-27): Wise = .com + subcarpeta por país con hreflang idioma-región **y** catchall por idioma (`es`→/es/, `es-MX`→/mx/, `de`→/de/, `de-AT`→/at/), 46 tags, x-default a la home; Deel = subcarpeta por locale (`es`, `es-es`, `pt`, `pt-pt`), 17 tags; talent.com = **subdominio por país** (`ar.talent.com`, `mx.talent.com`) con 127 hreflang, todos idioma-región; Airbnb = ccTLDs + subdominios de idioma, 96 tags; Numbeo = subdominio por idioma + país por query param, sin hreflang visible. No encontré ningún case study 2024-2026 con datos de resultados para un single domain de ~100 países.

### Cited Findings
- **Wise** (`wise.com`, 46 hreflang en head, Next.js): `en`→`/`, `en-GB`→`/`, `en-AE`→`/ae/`, `en-AU`→`/au/`, `en-CA`→`/ca/`, `en-US`→`/us/`, `en-KR`→`/kr/`, `en-SE`→`/se/`, `de`→`/de/`, `de-AT`→`/at/`, `de-CH`→`/ch/`, `es`→`/es/`, `es-MX`→`/mx/`, `es-CL`→`/cl/`, `pt`→`/pt/`, `pt-BR`→`/br/`, `fr`→`/fr/`, `fr-BE`→`/be/`, `fr-LU`→`/lu/`, `ja`→`/jp/`, `th`→`/th/`, `tr`→`https://wiseturkiye.com.tr` (dominio aparte por regulación), `x-default`→`/`. — Inspección propia con curl de [https://wise.com/](https://wise.com/) (2026-10-27)
- **Deel** (`www.deel.com`, 17 hreflang): `en`→`/`, `en-gb`→`/en-gb/`, `fr`, `de`, `es`→`/es/`, `es-es`→`/es-es/`, `pt`→`/pt/`, `pt-pt`→`/pt-pt/`, `nl`, `it-it`, `ja`, `ko-kr`, `zh-cn`, `zh-tw`, `sv-se`, `da-dk`, `x-default`→`/`. — Inspección propia de [https://www.deel.com/](https://www.deel.com/) (2026-10-27)
- **talent.com** (127 hreflang): subdominio por país con idioma-región siempre (`es-ar`→`ar.talent.com`, `es-mx`→`mx.talent.com`, `es-co`, `es-cl`, `es-pe`, `es-es`→`es.talent.com`, `es-us`→`www.talent.com/es`, `fr-ca`→`ca.talent.com/fr`, `en-ca`→`ca.talent.com`, `fr-be`→`be.talent.com/fr`, `nl-be`→`be.talent.com`), `x-default`→`www.talent.com`. Ejemplo de **país con dos ediciones** (CA: en/fr, BE: nl/fr, BH: ar/en). — Inspección propia de [https://www.talent.com/](https://www.talent.com/) (2026-10-27)
- **Airbnb** (96 hreflang): mezcla ccTLD + subdominio de idioma: `en`→`www.airbnb.com`, `es-US`→`es.airbnb.com`, `zh-US`→`zh.airbnb.com`, `de`→`airbnb.de`, `es-ES`→`airbnb.es`, `pt`→`airbnb.com.br`, `en-GB`→`airbnb.co.uk`. — Inspección propia de [https://www.airbnb.com/](https://www.airbnb.com/) (2026-10-27)
- **Numbeo**: idioma por subdominio (`de.numbeo.com`, `es.numbeo.com`…), país por query (`country_result.jsp?country=…`), ciudad por path; sin hreflang en el HTML renderizado que devolvió el fetch. — [numbeo.com/cost-of-living](https://www.numbeo.com/cost-of-living/)
- **Booking.com**: curl devolvió 0 hreflang (bloqueo anti-bot probable); terceros afirman "single domain with subdirectories and hreflang for each language-region pair" sin datos. — [geotargetly.com (vendor, sin datos)](https://geotargetly.com/blog/how-to-target-multiple-countries-with-a-single-website)
- Tabla oficial Google pros/cons: subdirectorio con gTLD = "Easy setup; low maintenance (same host)" vs. cons "Users may not recognize geotargeting; single server location; harder site separation"; ccTLD = "Clear geotargeting" pero "can target only one country"; parámetros de URL = "Not recommended". — [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- Práctica para sitios grandes: head inline "can make HTML bloated and fragile at scale"; sitemap centraliza y facilita auditar; dividir en sitemaps numerados bajo índice porque las entradas hreflang agrandan mucho cada `<url>`. — [Propellic (vendor)](https://www.propellic.com/blog/scaling-hreflang-moving-international-seo-markup-from-html-to-xml-sitemaps); [jquery.app sitemap builder](https://www.jquery.app/tools/hreflang-sitemap-builder/)
- BrightonSEO abril 2025: charla "XML hreflang: a practical guide for large ecommerce sites" cuestiona que head sea automáticamente mejor que sitemap (sólo abstract visto). — [BrightonSEO](https://brightonseo.com/events/april-2025/talks/xml-hreflang-a-practical-guide-for-large-ecommerce-sites)
- Anecdótico, sin metodología: un canal de Telegram afirma que hreflang por sitemap "valida" días/semanas más lento que en head en sitios grandes y que mezclar métodos da validación inconsistente; el autor admite no poder probar causalidad. — [HreflangLab (Telegram)](https://t.me/s/HreflangLab/72)

### Inferences
- El patrón "catchall de idioma + variantes por país" (Wise: `es` + `es-MX` + `es-CL`) es exactamente lo que la doc de Google recomienda y sirve de modelo para calcularya: `/es/` (o la edición ES) como `es`, `/mx/` como `es-MX`, `/ar/` → calcular.ar como `es-AR`.
- Wise usa `en-KR`, `en-SE`, `en-NL`, `en-DK`: para países donde no traduce, igual crea subcarpeta país en inglés con hreflang región → señal de país sin traducción. Útil para países "cola larga".
- Ninguno de los grandes usa parámetros de URL para país (Numbeo sí, y no tiene hreflang: no es modelo).

### Gaps
- No existe (o no encontré) case study 2024-2026 con before/after de tráfico para un single .com de ~100 países; todo lo disponible es guía de vendors o ejemplos sin cifras.
- Booking.com no pudo inspeccionarse (anti-bot).

---

## Pregunta 3 — ¿Evidencia sobre idioma-solo vs idioma-región (es vs es-MX)? ¿Y un idioma con varios países mostrando la versión de país equivocada?

### Takeaway
Google no publica una preferencia entre `es` y `es-MX`: ambos son válidos, la región "tells Google the page is aimed at that country's users" (post 2011), y la doc actual recomienda **tener ambas**: variantes por país + una catchall de idioma. El riesgo documentado y confirmado por Mueller es el "same language case": si el contenido en el mismo idioma es (casi) idéntico entre países, Google elige una canónica y puede mostrar la URL "equivocada" en otros países; la mitigación oficial es contenido realmente distinto por país (moneda, datos, precios), no más hreflang.

### Cited Findings
- Doc actual: "Language-only (`de`) and language-region (`en-GB`) formats are both valid"; con varias variantes regionales de un idioma, agregar página catchall del idioma sin región. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Anterior (2011, lanzamiento): `hreflang="es-ES"` / `es-MX` indican que Google trata esa región como target. — [Google blog 2011: New markup for multilingual content](https://developers.google.com/search/blog/2011/12/new-markup-for-multilingual-content)
- Mueller (mayo 2025): con fr-fr y fr-be iguales "it's common that one is chosen as canonical (they're the same)"; "our systems just try to simplify things". — [SEJ 2025-05-12](https://www.searchenginejournal.com/google-reminds-that-hreflang-tags-are-hints-not-directives/546428/)
- Anterior (2018, Glenn Gabe): con árabe para EG/SA/LB, cada URL con canónica propia y clusters hreflang correctos, usuarios de Egipto/Arabia veían la URL de Líbano; Mueller (hangout, parafraseado) dijo que con contenido idéntico en el mismo idioma Google puede indexar una sola y mostrarla en todos los países; fixes sugeridos: hacer cada página lo más única posible y banner para usuarios del otro país. Diagnóstico: GSC → Excluded → "Submitted URL not selected as canonical". — [GSQi, 2018-05-07](https://www.gsqi.com/marketing-blog/hreflang-magic-trick-same-language-different-countries/)
- Anterior (2022, Mueller): hreflang no da bonus de ranking; los problemas "probably a lot of that will be limited to same-language / different-country situations". — [Search Engine Roundtable 2022](https://seroundtable.com/using-hreflang-34127.html)
- Anécdota de foro (no oficial): sitio anotado `es-ES`/`en-US` cuyas páginas en inglés aparecían en google.com.mx para queries en español; consejo recibido: usar `es` y `en` genéricos. — [Moz Q&A](https://mozprod.nodebb.com/community/q/topic/44880/do-i-use-es-mx-or-es-mx-for-my-spanish-site-for-mexico-only/1)
- Google: hreflang y `lang` no sirven para detectar idioma; las versiones localizadas son duplicados sólo si el contenido principal no está traducido. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)

### Inferences
- Para calcularya: anotar cada edición de país con idioma-región (`es-MX`, `es-CO`, `es-AR`→calcular.ar) **y** designar una edición como catchall `es` (p. ej. la de España o una `/es/` genérica). Igual para `en`, `pt`, `fr`, `de`, `ar`.
- La defensa real contra "versión de país equivocada" es que cada edición tenga datos propios visibles (moneda, escalas, feriados, salarios locales) en el contenido principal: eso evita que Google las colapse como duplicados del mismo idioma.
- Países con dos ediciones (`/ca` en-CA y `/ca-fr` fr-CA; `/be` nl-BE y fr-BE) son soportados: talent.com lo hace con `ca.talent.com` + `ca.talent.com/fr`. Cada edición es una URL distinta con su par idioma-región; no se puede asignar dos hreflang a la misma URL para un mismo idioma.

### Gaps
- No encontré declaración oficial 2024-2026 de Google que diga "usá es en vez de es-MX" o viceversa; sólo la doc genérica y el caso "same language".
- No encontré estudio cuantitativo (Ahrefs/Semrush/Sistrix) 2025-2026 que mida el error de versión de país por configuración de hreflang.

---

## Pregunta 4 — Geotargeting de subcarpetas sin el informe International Targeting; cómo decide Google el país; ¿ayuda el nombre del país en `<title>`/H1?

### Takeaway
El informe International Targeting de Search Console se eliminó el 22/09/2022 y Google dice que el country-targeting "was determined to have little value for the ecosystem, and is no longer supported": no hay reemplazo. Hoy las señales oficiales de país para una subcarpeta de .com son: hreflang con región, idioma y moneda local, direcciones/teléfonos locales, enlaces entrantes locales y Business Profile; Google ignora meta tags `geo.*` y la ubicación del servidor es señal débil (CDN). Sobre el nombre del país en el title: no hay evidencia ni declaración oficial; la única opinión encontrada es de foro 2011 (ayuda para queries que ya nombran el país y para CTR, no como geo-señal).

### Cited Findings
- "The International Targeting report has been deprecated." El country targeting "was determined to have little value for the ecosystem, and is no longer supported." "Google will continue to support and use hreflang tags on your pages." Sin reemplazo nombrado. — [Google Search Console Help](https://support.google.com/webmasters/answer/12474899?hl=en)
- Fecha de retiro: 22 de septiembre de 2022. — [Search Engine Land](https://searchengineland.com/google-search-console-to-remove-international-targeting-report-387477)
- Señales de país listadas por Google: ccTLD; "hreflang statements, whether in tags, headers, or sitemaps"; server location ("not definitive", CDN); "local addresses and phone numbers on the pages", idioma y moneda local, links entrantes locales, Business Profile. "Google ignores locational meta tags (like geo.position or distribution)." — [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- Para gTLD apuntando a un país: "explicitly set a country target using one of the methods described previously" (en la doc actual eso queda reducido a hreflang + señales on-page, porque el método de GSC ya no existe). `.tv`, `.me` tratados como gTLD. — [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- Nombres de subdominio como `en-gb` no definen audiencia: hay que "explicitly map the target audience" con hreflang. — [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- Dónde ver hreflang hoy en GSC: no hay informe central; se verifica por URL con URL Inspection, y errores de anotación fallan en silencio. — [seo-kreativ.de](https://www.seo-kreativ.de/en/blog/hreflang-tags/); [Synup](https://www.synup.com/en/how-to/hreflang-tag-errors-in-search-console)
- Nombre del país en title: única fuente, opinión de foro 2011: ayuda sólo para queries que ya incluyen el país; las marcas lo ponen "for click-through rate rather than rankings". — [WebmasterWorld, 2011](https://www.webmasterworld.com/google/4279604.htm)
- Shopify (guía vendor): ccTLD "provide the strongest local SEO signal"; las tres opciones (dominio, subcarpeta, subdominio) son válidas. — [Shopify Help: International SEO for markets](https://help.shopify.com/en/manual/markets/seo)

### Inferences
- Para una subcarpeta `/mx` en .com, la señal de país que controlás 100% es: hreflang `es-MX` + moneda MXN visible + datos/fuentes oficiales mexicanas + nombre de país y entidades locales en el contenido (que además captura queries "en México"). Enlaces desde dominios .mx son la señal externa.
- El título con país ("… en México 2026") se justifica por cobertura de query y CTR (los usuarios escriben "sueldo neto México"), no por una geo-señal documentada. No hay contraindicación.
- Sin informe de GSC, la validación de hreflang debe ser propia (crawler + URL Inspection muestral) y continua.

### Gaps
- Ningún estudio 2025-2026 mide el efecto del nombre del país en title/H1 sobre la geo-relevancia de subcarpetas; marcar como "sin evidencia".
- No hay declaración oficial de Google sobre si el idioma de la página + moneda bastan para posicionar en google.com.mx sin ccTLD; sólo la lista de señales.

---

## Pregunta 5 — Páginas locale-adaptive y crawl de Googlebot desde IPs de EE. UU.; redirección por IP

### Takeaway
Google documenta que Googlebot crawlea por defecto desde IPs que parecen de EE. UU., sin `Accept-Language`, y también desde IPs fuera de EE. UU. (mismo user agent); recomienda explícitamente **URLs separadas por locale con hreflang** y advierte "Don't use IP analysis to adapt your content" y "Avoid automatically redirecting" entre versiones. Las reglas de robots deben ser idénticas en cada locale.

### Cited Findings
- "the default IP addresses of the Googlebot crawler appear to be based in the USA"; "the crawler sends HTTP requests without setting Accept-Language in the request header"; "Googlebot crawls with IP addresses based outside the USA, in addition to the US-based IP addresses"; mismo UA en todas las configuraciones; verificar por reverse DNS. — [Google: Locale-adaptive pages](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages)
- "We recommend using separate locale URL configurations and annotating them with rel="alternate" hreflang annotations." Robots meta y robots.txt "must specify the same rules in each locale". — [Google: Locale-adaptive pages](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages)
- "Avoid automatically redirecting" usuarios entre versiones; "don't redirect based on what you think the user's language may be"; "Don't use IP analysis to adapt your content". Google no varía la ubicación del crawler para encontrar variaciones. — [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- Mueller 2018 (parafraseado): mostrar banner sugiriendo la versión correcta en vez de redirigir. — [GSQi 2018](https://www.gsqi.com/marketing-blog/hreflang-magic-trick-same-language-different-countries/)

### Inferences
- Para calcularya: nunca 302 por geo-IP en `/`; la home debe ser accesible (x-default) y ofrecer banner/selector. Cualquier personalización por IP (p. ej. sugerir país) debe ser aditiva, no cambiar el contenido indexable.

### Gaps
- Google no publica lista de países desde los que crawlea ni proporción; no hay dato 2026 al respecto.

---

## Pregunta 6 — Qué requieren Bing, Yandex, Naver, Baidu, Seznam, Yahoo Japan

### Takeaway
IndexNow (una sola clave en la raíz, hasta 10.000 URLs por POST, 429 si se abusa) cubre Bing, Yandex, Naver, Seznam y Yep a la vez; Google no participa. Yandex soporta hreflang **sólo en HTML `<link>`** ("no longer supports using the Sitemap file for language versions") y asigna región por Yandex Webmaster con moderación (en general una sola región; sitios de contenido general no la necesitan). Naver exige registrar dominio o subdominio (no subcarpetas) en Search Advisor y enviar sitemap/RSS manualmente. Bing: la doc oficial no fue accesible (devuelve página vacía); terceros coinciden en que trata hreflang como señal débil y lee `content-language`; el geotargeting por carpeta existió desde 2013 y persiste en la API, estado de la UI no confirmado. Seznam: sin doc oficial accesible; terceros dicen que lee hreflang en head y tiene Seznam Reporter/Webmaster. Baidu: sin fuente oficial; terceros reportan soporte parcial de hreflang y, sin confirmar, fin del envío directo de sitemap XML (dic. 2025). Yahoo Japan: usa Google desde 2010; el contrato vencía marzo 2025 y **no encontré confirmación** del resultado de la renovación.

### Cited Findings
**IndexNow**
- Motores participantes nombrados: Microsoft Bing, Naver, Seznam.cz, Yandex, Yep. — [indexnow.org](https://www.indexnow.org/)
- Clave "a minimum of 8 and a maximum of 128 hexadecimal characters" (y luego admite a-z, A-Z, 0-9, guiones); archivo `{key}.txt` en la raíz o `keyLocation`; "You can submit up to 10,000 URLs per post"; 429 = "Too Many Requests (potential Spam)"; sin límite numérico de frecuencia publicado; URLs enviadas "will be automatically shared with all other participating search engines". — [IndexNow documentation](https://www.indexnow.org/documentation)
- Bing (y Yandex) dejaron de aceptar pings de sitemap; se reemplaza por IndexNow (fuente secundaria). — [ctrl.blog](https://www.ctrl.blog/entry/sitemap-ping-indexnow/)

**Bing**
- Anterior (2013, blog oficial Bing): geo-targeting configurable a nivel dominio, subdominio, carpeta o página; la regla más específica gana; nivel dominio sólo para "geo-targetable top-level domains, such as .com, .org, .net"; ccTLDs no pueden a nivel dominio. — [Bing Webmaster blog, 2013-04-26](https://blogs.bing.com/webmaster/April-2013/Announcing-Malware-Re-Evaluation-and-Geo-Targeting)
- La API de Bing Webmaster sigue exponiendo `GetCountryRegionSettings` / `AddCountryRegionSettings` / `RemoveCountryRegionSettings` (scope página/directorio/dominio/subdominio) según wrappers MCP no oficiales (2026). — [devleader.ca Bing Webmaster MCP](https://www.devleader.ca/projects/bing-webmaster-mcp/tools/add-country-region-settings); [glama.ai](https://glama.ai/mcp/servers/zizzfizzix/mcp-server-bwt/tools/add_country_region_settings)
- Un artículo marcado como histórico afirma que la opción de geo-targeting "no more available in Bing webmaster tools" (sin fecha). Conflicto no resuelto. — [WebNots](https://www.webnots.com/bing-geo-targeting-option/)
- Ahrefs (2025-03-08): Bing considera hreflang "a weak signal for them" y se apoya en "the content-language HTML attribute", links y datos de visitantes. — [Ahrefs](https://ahrefs.com/blog/hreflang-tags/)
- technicalseo.com afirma que Bing "does not currently support hreflang"; contradicho por CyberOptik ("supports hreflang in head and XML sitemaps"). — [technicalseo.com](https://technicalseo.com/tools/pages/docs/hreflang.html); [CyberOptik](https://www.cyberoptik.net/glossary/hreflang/)

**Yandex**
- hreflang: sólo describe `<link rel="alternate" hreflang="…">` en `<head>`; "Yandex no longer supports using the Sitemap file for language versions"; códigos ISO 639-1 + ISO 3166-1 alpha-2 (o ISO 3166-2:RU para regiones rusas), ejemplos `ru`, `en-us`, `tr-tr`; `x-default` para páginas con idioma automático o selector; "The site structure doesn't affect the processing of the hreflang attribute" (subdominios, dominios o directorios). — [Yandex Webmaster: Indexing localized pages](https://yandex.com/support/webmaster/en/yandex-indexing/locale-pages.html)
- Región: "As a rule, you can assign only one region"; se asigna "based on the actual address of the company specified on the site"; varias regiones sólo con oficinas regionales; moderación "from several days to several weeks"; sitios de contenido general no necesitan región y pueden marcar "No region"; una región asignada no excluye aparecer en otras ("It can be found by users from any region if the site content is recognized as relevant"); subdominios regionales deben tener contenido distinto. — [Yandex Webmaster: Site region](https://yandex.com/support/webmaster/en/site-geography/site-region.html)

**Naver**
- "Naver doesn't support subfolder registrations": se registra dominio o subdominio (protocolo + dominio); verificación por archivo HTML o meta tag; informe de recolección contra robots.txt, robots meta y sitemaps XML; Naver "tends to prefer content within Naver-specific properties" (Café, Blog, Knowledge iN). — [The Egg, 2020-10-29 (anterior)](https://www.theegg.com/seo/korea/naver-webmaster-tools-guide)
- Flujo actual (terceros): registrar, verificar (HTML, meta `naver-site-verification`, o DNS), enviar sitemap y RSS en el menú 요청, pedir recolección de URLs; no garantiza indexación. — [inblog.ai](https://inblog.ai/docs/seo-tutorial-domain-setup/registering-with-naver-search-advisor); [Linguise](https://www.linguise.com/blog/guide/naver-seo-guide/)
- La doc oficial `searchadvisor.naver.com` no fue accesible desde esta sesión (bloqueo de fetch).

**Seznam**
- Participa en IndexNow (ver arriba). Plugin "IndexNowForSeznamCZ" envía URLs nuevas/cambiadas/borradas a Seznam. — [plugintracker](https://plugintracker.io/plugins/indexnow-pro-seznam-cz)
- Terceros: Seznam soporta hreflang en head (ejemplo `cs-cz`); `hreflang="CZ"` es incorrecto, usar `cs-CZ` o `cs`; herramienta Seznam Webmaster/Reporter para indexación. — [SEJ Seznam guide](https://www.searchenginejournal.com/seznam-seo-guide/262285); [searchengineworld.com](https://www.searchengineworld.com/seznam-cz-search-engine-overview-for-web-marketers-seos)
- `search.seznam.cz/prirucka` devolvió 404; no se pudo leer doc oficial.

**Baidu**
- Terceros: Baidu "doesn't fully embrace hreflang"; ICP necesario sólo para hosting en China continental (no bloquea la indexación, pero el hosting externo carga 3-8× más lento); un vendor reporta que en diciembre 2025 Baidu terminó el envío directo de sitemap XML — **no confirmado** oficialmente. — [chinafy](https://www.chinafy.com/blog/how-to-create-a-multilingual-website-that-ranks-on-baidu); [we-interactive 2026](https://we-interactive.com/insights/how-to-get-on-baidu-search-results-the-2026-china-seo-strategy); [seosherpa](https://seosherpa.com/baidu-seo/)

**Yahoo Japan**
- Yahoo Japan usa la tecnología de búsqueda de Google desde 2010 (contrato de 2 años con renovación automática). — [LY Corp. (PDF 2010)](https://www.lycorp.co.jp/en/ir/news/news-5052777038611857712/main/0/link/en20100727_2.pdf)
- Anterior (2024): el contrato vencía fin de marzo 2025; Yahoo Japan hizo bucket tests y se especuló un cambio a Naver; también podría extender con Google. — [AJPR](https://www.ajpr.com/yahoo-japan-may-switch-organic-search-engine-from-google-to-naver/)

### Inferences
- Plan mínimo por motor para calcularya: (1) IndexNow con una clave en `/{key}.txt` y POST en lote por cada deploy/cambio de datos — cubre Bing/Yandex/Naver/Seznam; (2) hreflang en **HTML head** si se quiere que Yandex lo lea (el sitemap no le sirve), o aceptar que Yandex sólo vea las señales de idioma; (3) `<meta http-equiv="content-language">` + `<html lang>` correctos por edición para Bing; (4) Naver: registrar `calcularya.com` entero (no se puede registrar `/kr`), enviar sitemap específico `/kr`; (5) Yandex Webmaster: para RU/KZ/UZ/TR probablemente "No region" (sitio de contenido/herramientas sin dirección física), hreflang `ru`, `ru-KZ`, `kk`, `uz`, `tr`; (6) Baidu: no invertir salvo que haya edición `/cn`; (7) Yahoo Japan: optimizar para Google basta mientras no se confirme cambio de proveedor.
- Conflicto head vs sitemap: si se quiere un solo método que sirva a Google y Yandex, es head; si el peso del head preocupa, usar sitemap para Google y aceptar que Yandex no lo procese (su cuota es 70% RU, 30% KZ, 25% TR, 21% UZ).

### Gaps
- Doc oficial de Bing Webmaster (geo-targeting y hreflang) inaccesible: las páginas `bing.com/webmasters/help/*` devolvieron sólo el título. El estado actual de la UI de geo-targeting no está confirmado.
- Doc oficial de Naver y Seznam inaccesibles; todo lo citado es de terceros.
- Resultado de la renovación Google ↔ Yahoo Japan (marzo 2025) no encontrado.
- Baidu: sin fuente oficial sobre hreflang ni sobre el supuesto fin del envío de sitemaps.

---

## Pregunta 7 — Cuota de mercado de buscadores 2025-2026 en los mercados no-Google (RU, KR, CZ, CN, JP, TR, UZ, KZ, UA)

### Takeaway
Statcounter, **septiembre 2026**, todas las plataformas: Rusia Yandex 70,3% / Google 28,1%; Corea Google 48,0% / Naver 43,1% (la medición doméstica coreana da Naver ~64%, conflicto metodológico); China Baidu 46,7% / Bing 21,8% / Google 1,5%; Japón Google 59,3% / Bing 31,4% / Yahoo 7,6%; Turquía Google 73,4% / Yandex 25,2%; Uzbekistán Google 76,3% / Yandex 21,5%; Kazajistán Google 68,2% / Yandex 29,7%; Ucrania Google 90,7% / Yandex 6,3%; Chequia Google 78,7% / Seznam 15,1%.

### Cited Findings
- **Rusia (sep 2026):** Yandex 70,33%, Google 28,12%, Bing 0,74%, Mail.ru 0,46%. — [Statcounter RU](https://gs.statcounter.com/search-engine-market-share/all/russian-federation)
- **Corea del Sur (sep 2026):** Google 47,97%, Naver 43,06%, Bing 4,83%, Yandex 1,72%, Daum 0,73%. — [Statcounter KR](https://gs.statcounter.com/search-engine-market-share/all/south-korea). Medición doméstica coreana reporta Naver primero con 63,8% (diferencia atribuida a metodología). — [searchengines.net](https://www.searchengines.net/guides/search-engine-market-share-by-country/)
- **China (sep 2026):** Baidu 46,65%, Bing 21,76%, Yandex 14,98%, Haosou 12,26%, Sogou 2,61%, Google 1,46%. — [Statcounter CN](https://gs.statcounter.com/search-engine-market-share/all/china)
- **Japón (sep 2026):** Google 59,27%, Bing 31,41%, Yahoo! 7,61%. Bing ≥24% todos los meses desde enero 2026 según compilación. — [Statcounter JP](https://gs.statcounter.com/search-engine-market-share/all/japan); [searchengines.net](https://www.searchengines.net/guides/search-engine-market-share-by-country/)
- **Turquía (sep 2026):** Google 73,42%, Yandex 25,19%, Bing 0,71%. (Una compilación de marzo 2026 daba Yandex 13,44%, bajando desde 42,59% en 2024; el dato de Statcounter de septiembre es el más reciente y difiere.) — [Statcounter TR](https://gs.statcounter.com/search-engine-market-share/all/turkey); [searchengines.net](https://www.searchengines.net/guides/search-engine-market-share-by-country/)
- **Uzbekistán (sep 2026):** Google 76,31%, Yandex 21,45%, Bing 1,72%. — [Statcounter UZ](https://gs.statcounter.com/search-engine-market-share/all/uzbekistan)
- **Kazajistán (sep 2026):** Google 68,15%, Yandex 29,72%, Bing 1,46%. — [Statcounter KZ](https://gs.statcounter.com/search-engine-market-share/all/kazakhstan)
- **Ucrania (sep 2026):** Google 90,67%, Yandex 6,26%, Bing 2,47%. — [Statcounter UA](https://gs.statcounter.com/search-engine-market-share/all/ukraine)
- **Chequia (sep 2026):** Google 78,71%, Seznam 15,05%, Bing 4,73%. Seznam en desktop ago 2026: 15,64%. — [Statcounter CZ](https://gs.statcounter.com/search-engine-market-share/all/czech-republic); [Statcounter CZ desktop](https://gs.statcounter.com/search-engine-market-share/desktop/czech-republic)

### Inferences
- Sólo Rusia y China tienen un líder no-Google claro; Corea está partida (y Naver domina si se mira medición local); en KZ/TR/UZ Yandex pesa 20-30%: vale IndexNow + hreflang en head + Yandex Webmaster, pero Google sigue siendo el canal principal. Ucrania y Chequia: Google domina, Seznam es 15% (IndexNow lo cubre casi gratis).
- Japón: Bing al 31% hace relevante el `content-language` y Bing Webmaster Tools incluso sin Yahoo Japan.

### Gaps
- Statcounter mide por tráfico de referencia web, no por queries; las cifras de Corea y China difieren fuertemente de mediciones locales. No encontré fuente 2026 de medición doméstica para RU/KZ/UZ.
