# GEO / visibilidad en buscadores con IA (2026) para un sitio multi-país de calculadoras gratuitas

Fecha de consulta de todas las fuentes: 2026-10-27. Cuando una cifra sale de un resumen secundario (blog de vendor) y no del estudio original, se marca «(secundario)».

## Pregunta 1 — ¿Qué patrones on-page suben la probabilidad de cita en AI Overviews / AI Mode / ChatGPT según estudios 2025-2026?

### Takeaway
No hay un «truco de formato» probado con rigor: los únicos estudios con muestra grande y método explícito (Ahrefs, Pew, Seer) muestran que (a) rankear ya no garantiza cita (sólo ~38 % de las URLs citadas en AIO están en el top 10), (b) Google usa «query fan-out» y cita páginas que responden sub-preguntas, y (c) el schema no mueve la aguja. Las afirmaciones sobre «pasajes de 40-75 palabras», «headings en pregunta 3,4×» o «tablas 1,5×» provienen de vendors sin método verificable y deben tratarse como hipótesis.

### Cited Findings
- Google (doc oficial, actualizado 2025-12-10): «There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary»; ambos «may use a "query fan-out" technique — issuing multiple related searches across subtopics and data sources»; la elegibilidad es simplemente estar indexado y poder mostrar snippet; «There's also no special schema.org structured data that you need to add» — [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google publicó el 2026-05-15 una guía específica «Optimizing your website for generative AI features on Google Search» y aclaró el mismo día que las spam policies aplican a respuestas generativas — [Google Search Central changelog](https://developers.google.com/search/updates) (entradas «May 15, 2026»)
- Ahrefs (2026-03-02, 863 K SERPs, ~4 M URLs citadas en AIO): sólo 37,9 % de las citas vienen del top 10; 31,2 % de posiciones 11-100; 31,0 % de más allá del top 100. En julio 2025 era ~76 % desde el SERP original. AIO corre sobre Gemini 3 desde enero 2026. Sin desglose por idioma/país — [Ahrefs: 38% of AI Overview citations pull from the top 10](https://ahrefs.com/blog/ai-overview-citations-top-10/)
- Ahrefs (2025-12-15, 540 K pares de queries, datos US sept. 2025): AI Overviews y AI Mode citan URLs distintas — sólo 13,7 % de overlap (16,3 % en top 3) aunque las respuestas tienen 86 % de similitud semántica. AI Mode incluye citas en 97 % de respuestas vs 89 % AIO; AIO cita YouTube y «core pages» (home/categoría) ~2× más; AI Mode cita más Wikipedia (28,9 % vs 18,1 %), Quora (3,5×) y sitios de salud — [Ahrefs: AI Overviews vs AI Mode](https://ahrefs.com/blog/ai-overviews-vs-ai-mode)
- Ahrefs (dic. 2025, 75 K marcas): la correlación (Spearman) más fuerte con visibilidad en ChatGPT/AI Mode/AIO es menciones en YouTube (~0,737); menciones web de marca ~0,664 (estudio AIO mayo 2025); backlinks ~0,218 (secundario, no confirmado en la página de Ahrefs). Ahrefs advierte que es correlación, no causa — [Ahrefs: AI brand visibility correlations](https://ahrefs.com/blog/ai-brand-visibility-correlations); resumen con cifras en [Medium](https://medium.com/@lorenzoswanson786/ahrefs-studied-75-000-brands-brand-mentions-beat-backlinks-3-to-1-for-ai-visibility-e86ef9f6baba) (secundario)
- Semrush (secundario, >10 M keywords): ~97 % de las citas en AIO vienen del top 20 orgánico — contradice directamente a Ahrefs 2026; probablemente mide otra cosa (dominio vs URL, ventana temporal) — [tech-insider.org](https://tech-insider.org/google-ai-overviews-citation-rules-2026/) (secundario; no se encontró el post primario de Semrush)
- Pew Research (marzo 2025, 68.879 búsquedas de 900 adultos US): los resúmenes IA aparecen en 60 % de búsquedas con palabra interrogativa (who/what/when/why), 53 % de búsquedas de 10+ palabras, 36 % de frases completas y sólo 8 % de 1-2 palabras; 88 % de resúmenes citan ≥3 fuentes; mediana 67 palabras; sitios .gov son 6 % de las fuentes de resúmenes vs 2 % en resultados clásicos — [Pew Research](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- Seer Interactive (abril 2026, 53 marcas, 5,47 M queries): tasa de AIO por tipo de query — comparación «X vs Y» 95,4 %, review 86,3 %, pregunta 85,9 %, **price/cost/buy 83,4 %**, best-of 81,3 %, near-me 76,9 %; 4+ palabras 35,5 %, 1 palabra 27,3 %. Por intención: informacional 36 %, comercial 8 %, transaccional 5 % — [Seer Interactive: AIO impact on Google CTR 2026 update](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)
- España, segunda ola (julio 2026, 5 medios top): AIO aparece en 46,1 % de keywords (vs 29,8 % en nov. 2025); queries que empiezan con «qué» disparan AIO 97,6 % y «por qué» 97,4 %; 21,7 % en keywords de 1 palabra vs 63,9 % en 4 palabras; categoría economía 68,7 % — [Clara Soteras / Univ. Barcelona](https://clarasoteras.com/en/blog/second-study-ai-overviews-spanish-publishers-july-2026/)
- Afirmaciones de vendors SIN método verificable (tratar como hipótesis): pasaje citado típico 56 palabras y 41 % de páginas citadas tienen ≥1 tabla (8.561 páginas) — [geekytech](https://www.geekytech.co.uk/resources-tools/ai-citation-study-2026/); pasajes de 40-75 palabras extraídos 3,1× más — [rankbits](https://rankbits.com/blog/optimize-page-to-get-cited-by-ai); headings en pregunta 3,4× — [airops](https://www.airops.com/blog/passage-level-aeo-optimization); contenido actualizado en <3 meses ~2× más citado por ChatGPT — [getpassionfruit](https://www.getpassionfruit.com/blog/ai-citation-rate-by-content-length-does-longer-content-get-cited-more); 55 % de citas AIO salen del primer 30 % de la página (CXL, secundario) — [stackmatix](https://www.stackmatix.com/blog/ai-overview-citation-analysis); Ahrefs (174 K páginas) casi nula correlación entre word count y posición de cita (secundario) — [digitalapplied](https://www.digitalapplied.com/blog/content-strategy-ai-overviews-post-io-guide-2026)

### Inferences
- Para un sitio de calculadoras: las queries «cuánto es / cuánto cobro / cuánto sale X en país Y» caen en «question» y «price/cost» (83-86 % de tasa AIO según Seer) → casi siempre habrá AIO encima. La única posición defendible es ser la fuente citada; el fan-out premia tener páginas separadas que respondan cada sub-pregunta (definición, escala vigente, ejemplo numérico, fecha de vigencia) además de la calculadora.
- La preferencia de AIO por «core pages» (home/categoría) y la de AI Mode por fuentes enciclopédicas sugiere mantener landings de categoría por país con texto explicativo, no sólo el widget.
- El 6 % de fuentes .gov en resúmenes (Pew) y la ausencia de datos sobre calculadoras indican que para datos fiscales la IA tiende a citar la fuente oficial; un sitio tercero compite citando la fuente oficial con fecha y mostrando la tabla/escala, no sólo el resultado.

### Gaps
- No existe estudio público que segmente citas por idioma o país (Ahrefs lo dice explícitamente). Lo más cercano: Sistrix marzo 2026 (47 % de queries informacionales en Europa con AIO, secundario) y el estudio español de Soteras.
- No se encontró el post primario de Semrush del «97 % del top 20».
- Ningún estudio mide «longitud de pasaje» o «headings en pregunta» con método reproducible y muestra pública.

## Pregunta 2 — ¿Google lee llms.txt? ¿Qué dijeron Google, OpenAI, Anthropic, Perplexity?

### Takeaway
Google no usa llms.txt para Search ni para AIO/AI Mode: su guía oficial dice que no hacen falta archivos legibles por máquina ni «AI text files», y en junio 2026 añadió una nota de que crearlo es «completamente fine» pero no ayuda ni perjudica. Ningún proveedor (OpenAI, Anthropic, Perplexity) ha confirmado públicamente que su sistema de respuestas en producción lea llms.txt; la evidencia de beneficio es nula.

### Cited Findings
- Google, doc AI features: «You don't need to create new machine readable files, AI text files, or markup to appear in these features» — [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)
- Changelog Google 2026-06-15: «Clarifying guidance on llms.txt files — Added a note to the AI optimization guide clarifying Google Search's usage of llms.txt files» — [Google Search Central updates](https://developers.google.com/search/updates)
- SEJ (2026-06-17) cita la nota: «while these files aren't needed for Google Search… It's completely fine if you decide to create and maintain LLMS.txt files (or other similar files)»; la guía original de mayo desaconsejaba también markdown para LLMs y la nota lo suaviza — [Search Engine Journal](https://www.searchenginejournal.com/googles-says-its-fine-to-use-llms-txt-for-ai-seo/579608/)
- Gary Illyes (Search Central Live APAC, julio 2025) y John Mueller (comparación con meta keywords; «no AI system currently uses llms.txt», Bluesky) — reportado en secundarios sin fecha/enlace primario: [getpassionfruit](https://www.getpassionfruit.com/blog/should-i-create-an-llms.txt-file-google-s-2026-guidance-explained), [securityboulevard](https://securityboulevard.com/2026/10/llms-txt-is-the-meta-keywords-of-2026/), [1clickreport](https://www.1clickreport.com/blog/llms-txt-evidence-2026)
- Contradicción interna de Google: Chrome Lighthouse 13.3 (mayo 2026) audita la presencia de llms.txt en una categoría experimental de «machine interaction» para agentes de navegador (no para Search) — [SEJ: llms.txt guidance depends on which product you ask](https://searchenginejournal.com/googles-llms-txt-guidance-depends-on-which-product-you-ask/575431/); [pikaseo](https://pikaseo.com/articles/google-llms-txt-lighthouse-contradiction-2026) (secundario)
- Anthropic: la página oficial de crawlers no menciona llms.txt — [Anthropic support: crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- OpenAI: la página oficial de bots no menciona llms.txt — [OpenAI bots](https://developers.openai.com/api/docs/bots)
- Perplexity: la página oficial de bots no menciona llms.txt — [Perplexity bots](https://docs.perplexity.ai/guides/bots). Un auditor tercero (Agent Score, 2026-04-21) encontró un llms.txt en docs.perplexity.ai, pero eso es adopción como publicador, no soporte como consumidor — [buildwithfern](https://buildwithfern.com/agent-score/company/perplexity)
- «As of Q1 2026, none of OpenAI, Google, Anthropic, Meta, or Perplexity had publicly confirmed their production answer systems read the file» — [hybridranking](https://hybridranking.com/blog/llms-txt-one-year-later) (secundario)

### Inferences
- Crear /llms.txt es inocuo y barato; no debe consumir esfuerzo ni usarse como argumento de visibilidad. Su único uso plausible es para agentes/IDEs que leen docs (caso dev docs), no para un sitio de consumidores.

### Gaps
- No se pudo abrir la guía «generative-ai-optimization» de Google (404 en la URL probada) para citar el texto verbatim de la nota; se cita vía changelog + SEJ.
- No hay citas primarias con fecha de Mueller/Illyes; sólo reportes de terceros.

## Pregunta 3 — Para queries «cuánto es X en país Y», ¿las respuestas IA citan calculadoras o las reemplazan?

### Takeaway
No existe ningún estudio público que mida citas de calculadoras interactivas en AIO/AI Mode/ChatGPT. Lo que sí hay: las queries de precio/costo y las preguntas tienen tasas de AIO de 83-86 %, los resúmenes sobre-representan fuentes .gov, y AI Mode agrega «preferred sources» (mayo 2026). La hipótesis más defendible es que la IA responde el número ella misma y cita la fuente del dato (oficial o tabla), no el widget.

### Cited Findings
- Búsqueda específica: ningún estudio de citas de calculadoras; la única página que lo trata (recited.io) es una guía sin datos — [recited.io](https://recited.io/kb/content-formats-that-maximize-ai-citations/data-rich-content-formats/interactive-calculators-and-tools/)
- Seer 2026: AIO en 83,4 % de queries «price/cost/buy» y 85,9 % de preguntas; CTR orgánico medio informacional con marca citada 2,07 % vs no citada 0,94 % vs sin AIO 3,35 %; en transaccionales, CTR orgánico no-citado cayó 48 % en 2025 (4,17 % → 2,15 %) — [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)
- Pew: .gov = 6 % de fuentes en resúmenes IA vs 2 % en resultados clásicos — [Pew](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- Google 2026-05-27: «Preferred sources is available in AI Mode and AI Overviews» (el usuario puede marcar fuentes preferidas) — [Google changelog](https://developers.google.com/search/updates)
- Google 2026-05-08/06-15: FAQ rich results eliminados de Search desde 2026-05-07 y documentación retirada — [Google changelog](https://developers.google.com/search/updates)
- Estudio España: categoría «economía» con AIO en 68,7 % de keywords; evergreen 56,5 % — [Clara Soteras](https://clarasoteras.com/en/blog/second-study-ai-overviews-spanish-publishers-july-2026/)

### Inferences
- Para «cuánto cobro neto con sueldo bruto X en Chile 2026», la IA puede calcular aproximado; lo que no puede hacer con confianza es garantizar la escala vigente. La ventaja citable del sitio es: tabla de escalas/tasas con fecha de vigencia y enlace a la fuente oficial + ejemplos numéricos ya resueltos en texto (que la IA puede extraer) + el widget como «ir más allá». Esto es especulación fundada en Pew (.gov) y fan-out, no un hallazgo medido.
- Las queries de «calculadora X» (navegacionales a herramienta) no están cubiertas por ningún estudio; es razonable esperar menor tasa de AIO que en «cuánto es» (Seer: 1 palabra 27 %, 4+ palabras 35 %).

### Gaps
- Sin dato alguno sobre si AIO/AI Mode enlaza widgets interactivos. Verificar empíricamente con muestras propias por país (Search Console no separa clicks de AI Mode; ver P4).

## Pregunta 4 — Impacto medido de AI Overviews / AI Mode en CTR 2025-2026 por tipo de query

### Takeaway
Las tres fuentes primarias convergen en caída fuerte: Ahrefs −58 % de CTR en posición 1 cuando hay AIO (dic. 2023 → dic. 2025), Pew 15 % → 8 % de clicks en visitas con resumen, Seer CTR orgánico con AIO 3,19 % (ene. 2025) → 1,31 % (dic. 2025) con rebote a 2,36 % (feb. 2026). Zero-click en Google US: 68 % (SparkToro, ene-abr 2026). Ser citado duplica el CTR frente a no serlo, pero sigue ~38 % por debajo de una SERP sin AIO.

### Cited Findings
- Ahrefs (2026-02-04, 300 K keywords, GSC agregado, desktop): CTR pos. 1 en keywords con AIO 0,073 (dic. 2023) → 0,016 (dic. 2025); contrafactual 0,037 → −58 %. Pos. 2 −50,8 %, pos. 3 −46,4 %, pos. 4-10 entre −38,8 % y −19,4 %. Correlación, no causa; 99,2 % de keywords con AIO son informacionales — [Ahrefs update](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/); estudio original abril 2025 (−34,5 %) — [Ahrefs 2025](https://ahrefs.com/blog/ai-overviews-reduce-clicks/)
- Pew (marzo 2025): click en resultado tradicional 8 % de visitas con resumen vs 15 % sin; click en enlace dentro del resumen 1 %; sesión termina tras la SERP 26 % vs 16 %; 18 % de búsquedas mostraron resumen — [Pew](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- Seer (abril 2026, 53 marcas, 2,43 B impresiones orgánicas): CTR orgánico con AIO por mes — ene. 2025 3,19 %, jul. 1,81 %, nov. 1,33 %, dic. 1,31 %, ene. 2026 2,33 %, feb. 2026 2,36 %; sin AIO feb. 2026 3,82 %. Marca citada da ~120 % más clicks por impresión que no citada, pero ~38 % menos que sin AIO. Paid CTR con AIO subió de 14,64 % a 16,21 %. Hallazgos «direccionales y correlacionales» — [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)
- SparkToro/Similarweb (SSRN abril 2026): 68 % de búsquedas US en Google terminan sin click (ene-abr 2026); sólo 0,34 % de búsquedas pasaron a AI Mode en ese período; cambio de panel (Datos → Similarweb) hace la comparación con 2024 «apples and oranges» — [Search Engine Land](https://searchengineland.com/google-zero-click-searches-reach-68-in-early-2026-study-479717); Datos Q1 2026 con definición estricta desktop: ~22,4 % — [ppc.land](https://ppc.land/ai-still-under-2-but-growing-datos-q1-2026-state-of-search-report/) (secundario)
- Semrush/Datos (US desktop, mayo-julio 2025, ~69 M sesiones): 92-94 % de sesiones de AI Mode sin click (secundario; no se verificó el informe primario) — [searchlab.nl](https://searchlab.nl/en/statistics/ai-overviews-sge-statistics-2026)
- Search Console: desde mayo 2026 las impresiones de AI Mode van dentro del Performance report, pero los clicks de AI Mode se agrupan con web orgánico y no se pueden filtrar por separado — [websitebuilderexpert](https://www.websitebuilderexpert.com/news/ai-mode-google-search-console/), [engageweb](https://www.engageweb.co.uk/blog/google-confirms-data-from-ai-mode-will-appear-in-search-console) (secundarios)
- «Web Guide»: experimento de Search Labs que agrupa páginas por aspectos de la query, opt-in y limitado a la pestaña Web; no hay fuente que confirme lanzamiento general en 2026 ni efecto medido en CTR — [TechCrunch](https://techcrunch.com/?p=3030993)
- Meta-análisis de 39 estudios sobre caída de tráfico por AIO (secundario, útil como índice) — [Organic Labs](https://organiclabs.ai/research/ai-overviews-ctr-meta-analysis)

### Inferences
- Para calculadoras: el rebote de CTR en 2026 (Seer) y la baja prevalencia de AIO en transaccional (4,9 %) sugieren que las queries navegacionales «calculadora de X» sufren menos que las «cuánto es X». Separar en Search Console las queries por patrón («calculadora», «simulador» vs «cuánto», «cómo se calcula») es la medición más útil que el sitio puede hacer por su cuenta.

### Gaps
- No hay estudio de CTR específico para sitios de herramientas/calculadoras ni por país hispano; todos los datos son US (Ahrefs, Pew, Seer, SparkToro) salvo el estudio español (prevalencia, no CTR).
- No se confirmó la cifra «AI Mode 93 % zero-click» en fuente primaria.

## Pregunta 5 — ¿Qué puede hacer un sitio (schema, open data, APIs, embebibles) para ser usado como fuente por asistentes IA?

### Takeaway
Lo que tiene evidencia: estar indexado y crawleable por los bots de búsqueda de cada proveedor (OAI-SearchBot, Claude-SearchBot, PerplexityBot), menciones de marca en YouTube/Reddit/Wikipedia (correlación fuerte), y contenido que responda sub-preguntas. Lo que NO tiene evidencia: schema (Ahrefs: −4,6 % en AIO, ~0 en AI Mode/ChatGPT), llms.txt, FAQPage (función eliminada). Open data/APIs/embebibles no tienen estudio alguno; su valor es indirecto (generan menciones y enlaces).

### Cited Findings
- Ahrefs (2026-05-11, 1.885 páginas que añadieron JSON-LD ago. 2025-mar. 2026 vs 4.000 control, diff-in-diff): AIO −4,6 % (significativo), AI Mode +2,4 % y ChatGPT +2,2 % (indistinguibles de cero). Conclusión: mantener markup útil, no pagar por «uplift» de citas — original [Ahrefs](https://ahrefs.com/blog/schema-ai-citations/) (no se pudo abrir; cifras vía [authoritytech](https://authoritytech.io/curated/schema-markup-ai-citations-ahrefs-study-2026))
- Afirmación contraria no verificable: «Princeton/Moz, 500 K URLs, FAQ schema 3,2× más citado» — sin fuente primaria encontrada; [sgaindex](https://sgaindex.com/news/ai-overview3-3517d27c) (secundario, dudoso); «schema 2,3×» en 1.000 AIO — [thestacc](https://thestacc.com/blog/ai-overviews-citation-sources/) (vendor)
- Google: schema debe coincidir con el texto visible; no hay schema especial para AIO/AI Mode — [Google](https://developers.google.com/search/docs/appearance/ai-features). FAQ rich result eliminado 2026-05-07 — [changelog](https://developers.google.com/search/updates)
- Fuentes más citadas por plataforma (Profound, 680 M citas, ago. 2024-jun. 2025): Reddit 46,7 % de top-10 fuentes en Perplexity, 21,0 % en AIO, 11,3 % en ChatGPT (Wikipedia 47,9 % en ChatGPT) — [Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns); Peec AI (30 M fuentes, mayo 2026): Reddit dominio más citado global — [Peec](https://peec.ai/blog/top-domains-cited-by-ai-search-analysis-based-on-30m-sources); 5W/Similarweb (mayo 2026): Wikipedia #1 y Reddit #2 en ChatGPT US, >25 % entre ambos — [PR Newswire](https://www.prnewswire.com/news-releases/wikipedia-and-reddit-now-drive-over-25-of-chatgpt-citations-in-the-us-new-5w-research-finds--wsj-nyt-and-bloomberg-do-not-appear-in-the-top-20-302768339.html); Ahrefs AI Mode (5,5 M queries, sept. 2025): Wikipedia #1, Reddit #4 — [Ahrefs](https://ahrefs.com/blog/most-cited-domains-ai-mode/); la cuota de Reddit cae (Conductor: 2,02 % → 1,01 % oct. 2025-ene. 2026; Perplexity ~47 % → ~24 %) — [Conductor](https://www.conductor.com/academy/reddit-ai-citation-decline/), [Adweek](https://www.adweek.com/media/youtube-reddit-ai-search-engine-citations/)
- SE Ranking (secundario): dominios con millones de menciones en Reddit promedian 7 citas en ChatGPT vs 1,8 con presencia mínima — [winstondigitalmarketing](https://www.winstondigitalmarketing.com/playbooks/how-to-get-cited-by-chatgpt-in-2026/) (no se encontró el informe primario)
- Ahrefs: YouTube = dominio más citado en AIO, +34 % en 6 meses; 18,2 % de URLs citadas fuera del top 100 son de YouTube; 5,6 % de todas las citas — [Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)
- Yext (6,8 M citas): 86 % desde fuentes «brand-managed» (secundario) — [everything-pr](https://everything-pr.com/ai-platform-citation-source-index-2026)
- Google-Extended: token sólo de robots.txt (sin UA propio); controla training y grounding de Gemini Apps y Vertex AI; «does not impact a site's inclusion in Google Search nor is it used as a ranking signal»; no menciona AIO/AI Mode (que se controlan con Googlebot + nosnippet/max-snippet) — [Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)

### Inferences
- Para datos oficiales por país: el activo citable es la página-tabla «escala/tasa vigente + fecha + fuente oficial» en HTML plano (no sólo dentro del widget JS), porque es lo que un pasaje extraíble necesita. Dataset schema no tiene evidencia de efecto en citas; puede servir para Google Dataset Search, que es otro canal (no estudiado aquí).
- Widgets embebibles y APIs abiertas no aparecen en ningún estudio; su valor plausible es generar menciones web y en YouTube (el factor con mayor correlación), no una cita directa.

### Gaps
- Ningún estudio sobre Dataset, Speakable, APIs públicas o embebibles como señal de cita IA.
- No se pudo abrir el post original de Ahrefs sobre schema (404 en la URL del resumen).

## Pregunta 6 — Disponibilidad de AI Overviews / AI Mode por país e idioma (2026)

### Takeaway
AI Overviews: >200 países y >40 idiomas desde mayo 2025 (excluidos Cuba, Irán y China continental). AI Mode: >200 países desde octubre 2025 con 35+ idiomas nuevos (lista de 43 idiomas incluye español, portugués de Brasil, francés, alemán, italiano, etc.); trackers hablan de ~98 idiomas en 2026 y de Francia como último gran mercado (22 jul. 2026), pero esas cifras no tienen fuente primaria de Google. Google no publica una lista única país×idioma.

### Cited Findings
- Google (2025-10-07): AI Mode se expande a «more than 35 new languages and over 40 new countries and territories», total «over 200 countries and territories» — [blog.google](https://blog.google/products-and-platforms/products/search/ai-mode-expands-languages-locations/)
- Lista de 43 idiomas y 134 países/territorios nuevos (incluye español, portugués BR, francés, alemán, italiano, holandés, polaco, árabe, hindi, etc.) — [Search Engine Roundtable](https://www.seroundtable.com/google-ai-mode-expands-40232.html)
- AI Mode en Hindi, Indonesio, Japonés, Coreano y Portugués BR (sept. 2025) — [Search Engine Land](https://searchengineland.com/google-expands-ai-mode-beyond-english-461680)
- AI Overviews: «as of May 2025… over 200 countries and territories and in more than 40 languages, excluding Cuba, Iran, and mainland China» — [Wikipedia](https://en.wikipedia.org/wiki/AI_Overviews)
- 13 idiomas africanos añadidos a AIO y AI Mode (marzo 2026) — [ITNewsAfrica](https://www.itnewsafrica.com/2026/03/google-brings-ai-overviews-ai-mode-to-13-african-languages/)
- «53 idiomas nuevos → ~98 total» (atribuido a Nick Fox) y «Francia 22-jul-2026» — sólo en trackers/aggregators, sin fuente primaria: [keywordseverywhere AI Mode tracker](https://keywordseverywhere.com/news/google-ai-mode/), [keywordseverywhere AIO tracker](https://keywordseverywhere.com/news/ai-overviews/), [toolradar](https://toolradar.com/tools/google-ai/mentions)
- AI Mode 1 B usuarios mensuales (I/O 2026, secundario); «AIO y AI Mode fusionados, Gemini 3.5 Flash default» — [andrew.ooo](https://andrew.ooo/answers/what-is-google-ai-mode-global-rollout-may-2026/) (fuente poco fiable, no verificada)
- Prevalencia por mercado: España 46,1 % de keywords (medios, julio 2026) — [Soteras](https://clarasoteras.com/en/blog/second-study-ai-overviews-spanish-publishers-july-2026/); Brasil desktop ~15,5 % vs global ~13 % (marzo 2025, desactualizado) — [wearetg](https://www.wearetg.com/blog/ai-overview-statistics/); Europa 47 % de informacionales (Sistrix marzo 2026, secundario) — [aisosystem](https://www.aisosystem.com/en/blog/ai-overviews-statistics-and-trends-2026)

### Inferences
- Para ~100 países objetivo, asumir AIO y AI Mode activos en prácticamente todos salvo Cuba/Irán/China; la diferencia real entre países será la prevalencia por query, no la disponibilidad. Hay que medirla por país con muestras propias.

### Gaps
- Google no publica tabla oficial país × idioma; no se verificó el post de I/O 2026 (mayo) sobre idiomas.

## Pregunta 7 — robots.txt para crawlers IA: user-agents actuales y comportamiento

### Takeaway
Regla práctica validada en docs oficiales: permitir los bots de **búsqueda** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot) porque bloquearlos elimina la cita; los bots de **training** (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, meta-externalagent, CCBot, Bytespider, Amazonbot) son decisión de política y no afectan visibilidad en búsqueda. Los fetchers iniciados por usuario (ChatGPT-User, Claude-User, Perplexity-User, meta-externalfetcher) pueden ignorar robots.txt.

### Cited Findings
- OpenAI: `OAI-SearchBot/1.4; +https://openai.com/searchbot` (muestra sitios en ChatGPT search; opt-out = excluido de respuestas con búsqueda); `ChatGPT-User/1.0; +https://openai.com/bot` (acciones iniciadas por usuario; «robots.txt may not apply»; no determina elegibilidad en búsqueda); `GPTBot/1.4; +https://openai.com/gptbot` (training). Cambios en robots.txt tardan ~24 h en aplicarse a resultados — [OpenAI bots](https://developers.openai.com/api/docs/bots)
- Anthropic: `ClaudeBot` (training), `Claude-User` (fetch por pedido del usuario; bloquear reduce visibilidad en búsqueda dirigida por usuario), `Claude-SearchBot` (índice de búsqueda; bloquear «may reduce visibility and accuracy in user search results»); respetan robots.txt y `Crawl-delay`; IPs en claude.com/crawling/bots.json; bloquear por IP impide leer robots.txt — [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- Perplexity: `PerplexityBot/1.0; +https://perplexity.ai/perplexitybot` (índice de búsqueda, «not used to crawl content for AI foundation models»); `Perplexity-User/1.0; +https://perplexity.ai/perplexity-user` («generally ignores robots.txt rules» porque el usuario pidió el fetch) — [Perplexity bots](https://docs.perplexity.ai/guides/bots)
- Google: `Google-Extended` sólo token robots.txt, controla training/grounding Gemini, no afecta Search ni ranking — [Google](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- Meta: `meta-externalagent/1.1` (training/índice; bloqueable por robots.txt), `meta-externalfetcher/1.1` («may bypass robots.txt rules») — [Meta web crawlers](https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/)
- Apple: `Applebot-Extended` opt-out de training de modelos generativos; no fetchea páginas (token sobre datos ya recogidos por Applebot) — [Apple: About Applebot](https://support.apple.com/HT6619)
- Bytespider (ByteDance): sin documentación oficial conocida; «reportedly does not always respect robots.txt», bloquear vía WAF — [technologychecker](https://technologychecker.io/blog/ai-crawler-list) / [anagram](https://www.anagram.ai/blog/ai-crawler-user-agent-list-2026-14-bots-and-robotstxt-tokens-to-know) (secundarios)
- CCBot (Common Crawl) y Amazonbot: respetan robots.txt según guías terceras; no se abrió documentación oficial — [theseoagent](https://www.theseoagent.ai/blog/ai-crawlers) (secundario)

### Inferences
- Config mínima para calcularya: `Allow` explícito (o sin Disallow) para OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot; decidir aparte GPTBot/ClaudeBot/Google-Extended/CCBot/meta-externalagent/Applebot-Extended; Bytespider por firewall si molesta. Vercel Firewall puede hacer el bloqueo por UA sin tocar robots.txt.

### Gaps
- No se verificaron las páginas oficiales de Common Crawl ni Amazon.

## Pregunta 8 — IndexNow en 2026: adopción y valor

### Takeaway
IndexNow sigue siendo Bing + Yandex + Naver + Seznam + Yep (+ endpoints de Amazon e Internet Archive); una sola submission se comparte entre todos. Google no participa. El valor es velocidad de crawl/indexación en esos motores (y por tanto en Copilot/ChatGPT-search que usan índice de Bing), no ranking. No hay cifras oficiales 2026.

### Cited Findings
- Endpoints listados: Amazon, Bing, Naver, Seznam.cz, Yandex, Yep + api.indexnow.org; «your submission will be shared across all IndexNow-enabled search engines»; key de 8-128 chars en `{key}.txt`; POST hasta 10.000 URLs; 200 aceptado / 202 verificación pendiente — [IndexNow FAQ](https://www.indexnow.org/faq)
- Última cifra oficial: >3,5 B URLs/día (Microsoft, dic. 2024); share de clicks de Bing ligados a IndexNow reportado inconsistentemente (17-22 %) — [pressonify](https://pressonify.ai/blog/indexnow-instant-indexing-press-releases-2026), [crawlwp](https://crawlwp.com/indexnow-vs-google-indexing-api-vs-sitemaps/) (secundarios)
- Google evaluó IndexNow tras 2021 y nunca lo adoptó — [indexernow](https://www.indexernow.com/google-indexnow) (secundario)

### Inferences
- Para un sitio con datos que cambian mensualmente (escalas, tasas), IndexNow es la forma barata de que Bing/Copilot/ChatGPT-search vean la versión nueva rápido; mantener el ping automático en el workflow de datos vivos.

### Gaps
- Sin datos oficiales 2026 de Naver/Seznam/Yandex sobre uso o beneficio.

## Pregunta 9 — Google Discover para sitios de herramientas

### Takeaway
Discover es elegible para cualquier página indexada que cumpla las políticas, sin markup especial, pero está pensado para contenido de interés (artículos, video) y Google dice que «might not recommend» formularios y similares. Para un sitio de calculadoras, el camino realista es contenido tipo artículo (p. ej. «cambió la escala de X en país Y») con imagen ≥1200 px y `max-image-preview:large`.

### Cited Findings
- Google Discover (actualizado 2026-03-09): elegible si indexado y cumple políticas; «being eligible… is not a guarantee of appearing»; sin tags ni structured data requeridos; apto para «interest-based content such as articles and videos»; «might not recommend» job applications, petitions, forms, code repositories; imágenes ≥1200 px, >300.000 píxeles, 16:9, `max-image-preview:large` o AMP, imagen preferida vía schema u `og:image` — [Google Discover](https://developers.google.com/search/docs/appearance/google-discover)
- Discover core update 2026-02-05 «enhancing the quality of articles that appear in Discover»; guía «Get on Discover» ampliada el mismo día; «preferred image best practices» añadido 2026-03-02 — [Google blog](https://developers.google.com/search/blog/2026/02/discover-core-update), [changelog](https://developers.google.com/search/updates)

### Inferences
- Una calculadora como tal (formulario) es un mal candidato a Discover; sí lo es una nota con dato nuevo + gráfico propio. Esperar poco tráfico de Discover y no diseñar en torno a él.

### Gaps
- Ningún dato público de Discover para sitios de herramientas.
