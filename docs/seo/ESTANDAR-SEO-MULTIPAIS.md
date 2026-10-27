# Estándar SEO multipaís de calcularya.com y calcular.ar

Vigente desde el 27/10/2026. Sale de una investigación con fuentes de 2025-2026 (informe:
[investigacion-seo-internacional-2026-10-27.md](investigacion-seo-internacional-2026-10-27.md); notas crudas
con cada URL y fecha de consulta en [investigacion-notas/](investigacion-notas/)) y de la auditoría del
6/10 de calcular.ar. Es el contrato: lo que el motor garantiza solo para todos los países, lo que cada país
tiene que entregar, qué lo vigila y qué queda del lado de Manuel. Se revisa cuando cambie algo de
Google (próxima revisión: abril 2027, o antes si un core update mueve calcularya más de 20 %).

La idea que ordena todo: **cada país es un producto de datos distinto, no una traducción.** Google
colapsa las variantes de un mismo idioma que dicen lo mismo y las guías de calidad de 2025 califican
«Lowest» a las páginas intercambiables. Lo que rankea en cada país es la escala oficial propia, con fecha,
fuente y un ejemplo resuelto, en el idioma del país y con alguien que responde por los números.

## 1. Lo que el motor hace solo (ningún país lo configura)

| Qué | Cómo | Vigilado por |
|---|---|---|
| Una subcarpeta por edición en el `.com` (`/mx`, `/ca`, `/ca-fr`), nunca `/ar/`: Argentina es calcular.ar | `src/motor/hosts.ts` | `check_routing_hosts` |
| Canonical propio, `<html lang>` y `dir` del mercado, robots `index` solo en producción y en mercados publicados | `src/motor/ui/metadatos.ts`, `layout.tsx` de intl | `check_seo_intl` |
| Clúster hreflang por concepto: cada calculadora lista a todas sus equivalentes (idioma-región), x-default a la home global; hasta 20 alternas en el `<head>`, más de 20 en el sitemap del mercado (`xhtml:link`); recíproco o nada | `src/motor/seo.ts`, `src/motor/mapa.ts` | `check_hreflang` |
| calcular.ar entra a cada clúster como `es-AR` (clúster cruzado entre dominios) y sus 13 calculadoras con concepto listan a las de calcularya | `src/lib/hreflang-ar.ts`, `src/app/sitemap.ts`, flag `NEXT_PUBLIC_HREFLANG_AR=1` | `check_hreflang` (bloque `[ar]`) |
| Sitemap por mercado bajo un índice, `lastmod` = última revisión real del dato (nunca la fecha del build); legales, fuentes y novedades adentro | `src/motor/mapa.ts` | `check_hreflang`, `check_seo` |
| Title con el país cuando entra en 60 de ancho visual, description hasta 160, `{{anio}}` resuelto con la fecha del mercado | `tituloConPais`, `rellenarContenido` | `check_seo_intl`, `check_textos_paises`, `check_seo_pais` |
| JSON-LD mínimo: `WebApplication` (gratis, país servido), `BreadcrumbList`, `FAQPage` (ya no da rich result, queda por la IA y porque no cuesta); `WebSite` + `Organization` + `Person` solo en la home global; `AboutPage` con `Person` en cada «Quiénes somos» | `src/motor/seo.ts`, `metadatos.ts`, `Legales.tsx` | `check_seo_intl` |
| Quiénes somos, contacto, privacidad y términos en cada edición, en su idioma, enlazados desde el header y el pie, con clúster hreflang propio | `resolverPagina`, `hreflangLegal` | `check_seo_intl`, `check_hreflang` |
| OG image por página con versión por fecha de dato; favicon PNG estable (`/og/marca`) más SVG para navegadores | `urlImagenOg`, `layout.tsx` | `check_seo_intl` |
| Sello «datos verificados en fuente oficial el …» y «actualizado hoy» por serie en cada calculadora; fuentes con URL y fecha en `/<m>/fuentes` | `Sello.tsx`, `Fuentes.tsx` | `check_frescura` |
| Resultado por defecto renderizado en servidor (nunca un formulario vacío como HTML inicial), FAQ y textos en el HTML | `PaginaCalculadora.tsx` | `check_seo_intl` |
| Enlazado: home del país agrupada por tema, 6 relacionadas por calculadora, hasta 24 «en otros países» del mismo idioma, selector por concepto; toda calculadora a 2 clics de la home del país | `PaginaCalculadora.tsx`, `Inicio.tsx` | `check_catalogo` |
| IndexNow a Bing, Yandex, Naver y Seznam tras cada deploy con datos nuevos; feed Atom de novedades por país | `scripts/indexnow_intl.ts`, `novedades.xml` | cierre de sesión (`tools/session-close.md`) |
| Verificación de Bing, Yandex y Naver por env (`NEXT_PUBLIC_VERIFICACION_BING`, `_YANDEX`, `_NAVER`) | `layout.tsx` de intl | pendiente de Manuel (§5) |
| Sin redirección por IP: `/` propone el país y la persona elige | `ArranquePais.tsx`, `/api/geo` | `check_routing_hosts` |

Lo que el motor **no** hace y está decidido así (con la evidencia del informe): no genera `llms.txt` por
mercado (Google no lo lee; el global queda), no agrega `HowTo` ni busca rich results de FAQ (murieron),
no mete `aggregateRating` (exige reseñas reales con comentario), no redirige por geolocalización, no usa
la Indexing API, no declara `Dataset` fuera de los datos abiertos de rankings.

## 2. Lo que cada país tiene que entregar (gate de publicación)

Es lo que `check_seo_pais` mide, calculadora local por calculadora local (las universales no entran: su
texto es del motor por idioma). Falla = el país no se publica.

| Regla | Falla / aviso | Por qué |
|---|---|---|
| Año en `title`, `description` y `h1` con `{{anio}}`, nunca tipeado | falla | el año que la gente escribe cambia el 1/1; 1.379 textos lo tenían tipeado y en enero decían 2026 |
| Año vencido (los dos anteriores) en title o h1 | falla (aviso en description) | un título con año viejo es causa documentada de reescritura por Google |
| Ejercicios fiscales con rango («2026-27») y años de normas («Employment Act 1955», «Ley 2000») | se dejan: nombran la escala o la norma, no el año de la búsqueda |
| Al menos 3 preguntas en la FAQ | falla | lo que de verdad pregunta la gente del país; también lo que cita la IA |
| Cuerpo propio (intro + cómo se calcula + ejemplo + FAQ + glosario) de al menos 90 palabras; objetivo 220 | falla / aviso | las que rankean en UK, DE, US y ES llevan 250 a 1.700 palabras con tabla y ejemplo; p50 de hoy = 230 |
| Ejemplo resuelto con un monto concreto | aviso | patrón de todas las calculadoras que rankean; es lo que la IA cita |
| La intro da un número vigente (marcador) en sus primeros párrafos | aviso | respuesta primero: el valor antes del porqué |
| Dos calculadoras locales del mismo concepto en países del mismo idioma no comparten más del 65 % de sus oraciones (aviso desde 40 %) | falla / aviso | modifier-delete test: si al sacar el nombre del país la página es la de otro país, es un doorway |
| `{{anio}}` solo en title, description y h1; en el cuerpo va la vigencia real (`{{id#desde}}`) | aviso | el año del reloj en el cuerpo miente cuando la escala es del año anterior |

Lo que el check no mide y el agente tiene que hacer igual (está en el brief):

- **Slug = la consulta real del país**, en su idioma y escritura (`brutto-netto-rechner`, `salaire-brut-net`,
  `sueldo-liquido` en Chile y no `sueldo-neto`). Verificar en Google del país con el idioma del país antes
  de elegirlo: autocompletar y «otras preguntas». Una vez publicado no se cambia (un cambio es un 308 y
  pierde señal).
- **Title = la misma promesa que el H1, con el dato que lo distingue**: «Calculadora de aguinaldo {{anio}}:
  cuánto te toca y el ISR». Marca nunca (la pone el `WebSite`); país solo si no entra solo (lo agrega el
  motor); sin signos de exclamación, sin mayúsculas de grito.
- **Description con el número vigente** por marcador y una acción («Pon tu sueldo y listo»).
- **≥ 3 datos propios del país por calculadora** (tramo, tope, aporte, mínimo, fecha de vigencia) citados
  a su norma con URL `https` y `verificadoEl`. Si solo cambia la moneda, no es una calculadora local: es una
  universal y se deja como universal.
- **FAQ con lo que pregunta la gente del país**, con la norma como respuesta y nunca una afirmación sin
  fuente primaria.
- **Vocabulario nativo**: el término legal una vez y explicado, después la palabra común del país.
- **Novedades reales** (`novedades.ts`) con fecha y fuente: alimentan el feed, el `lastmod` y la sección
  «qué cambió», que es lo que un competidor global no tiene.

## 3. Lotes y medición (cómo se publica y cuándo se juzga)

- **Un país entero por vez, 1 a 3 países por semana.** Un lote de 80 páginas en una semana bajó la
  indexación de ese lote al 41 % en el único caso con números; 25 a 30 por semana indexó completo.
  Publicar es: `check-all` + build verdes, merge, deploy READY, smoke, `indexnow_intl.ts --desde <hoy>`.
- **Gates por país** (Search Console, vista «país × subcarpeta»): ≥ 50 % de sus URLs indexadas a los
  30 días; impresiones a los 60; clics a los 90; juicio a los 6 meses (el 40,8 % de las páginas que llegan
  al top 10 lo hacen el primer mes; a los 6 meses sin señal las chances caen).
- **Proporción de páginas finas del dominio por debajo del 7 %** (sitios con < 7 % de páginas ≤ 500
  palabras fueron estables en el core update de diciembre 2025; con ≥ 32 % fueron volátiles). Las
  universales son el riesgo: 40 por país que solo cambian moneda y ejemplo. Regla: a los 90 días de
  publicado un país, sus universales sin impresiones en Search Console salen del sitemap y pasan a
  `noindex` (obra pendiente: automatizarlo en el Vigía; hasta entonces lo decide el informe semanal de
  `mejora-continua`). Las locales nunca se podan por tráfico: se arreglan.
- **Medir en Search Console, no en herramientas pagas**: calcular.ar y calcularya.com son dos propiedades
  (dominio); filtro Page regex `^https://calcularya\.com/mx/` + Country = MX; el export semanal por API ya
  existe (`scripts/medicion/informe.ts`) y el agente de los lunes lee las fugas por consulta.
- **No comparar durante un core update** ni sacar conclusiones de un país con < 30 clics.

## 4. Lo que no se hace (y por qué, con la evidencia)

| No | Por qué |
|---|---|
| `/ar/` en calcularya.com | duplicaría calcular.ar; el clúster cruzado por dominio es el método documentado |
| `es-419`, `EU`, `UK`, país solo (`MX`) en hreflang | códigos inválidos para Google |
| Redirigir por IP o por `Accept-Language` | Googlebot rastrea desde EE. UU. sin `Accept-Language` y vería siempre la misma versión |
| Traducir el texto argentino para un país | «translating only the boilerplate» es la definición de Google de la mala experiencia; `check_textos_paises` lo rechaza por trato y vocabulario |
| Publicar un país con datos sin verificar | QRG: inexactitud en YMYL = Low; la calculadora queda en borrador, no sale con un número dudoso |
| 100 países de golpe | Google presume que cada página nueva vale lo que vale el dominio: un lote flojo contamina a los demás |
| FAQ/HowTo «para rich results», `aggregateRating` propio, `llms.txt` por mercado, schema «para la IA» | FAQ murió el 7/5/2026, HowTo en 2023; el rating exige reseñas reales; Google dice que no hace falta nada especial para AI Overviews y que no lee `llms.txt`; el único estudio controlado da schema −4,6 % en AIO |
| Año tipeado en títulos o URLs con año | se vence; la URL con año muere el 1/1 |
| `noindex` masivo «para ahorrar crawl», Indexing API | `noindex` no ahorra rastreo (404/410 sí); la Indexing API es solo para empleos y eventos |
| Widgets embebibles con anchor de palabra clave u ocultos | política de spam vigente; el embebible lleva la marca, visible, `nofollow` por defecto |
| Bloquear OAI-SearchBot, Claude-SearchBot, PerplexityBot | son los que citan; los de entrenamiento se deciden aparte |

## 5. Pendiente de Manuel (altas únicas, nada recurrente)

1. **Bing Webmaster Tools**: importar calcularya.com y calcular.ar desde Search Console (un clic con la
   cuenta de Google) o verificar con meta: el token va en Vercel como `NEXT_PUBLIC_VERIFICACION_BING`.
   Cubre Bing, Copilot y lo que ChatGPT search lee; Japón tiene 31 % de Bing.
2. **Yandex Webmaster** (`NEXT_PUBLIC_VERIFICACION_YANDEX`): Rusia 70 %, Kazajistán 30 %, Uzbekistán y
   Turquía 20 a 25 %. Región del sitio: «sin región». Yandex solo lee hreflang del `<head>`: para las
   ediciones en ruso (kz, kg, tj, uz) sus clústeres grandes van por sitemap y Yandex no los ve; si esos
   países muestran señal, se sube `MAX_HREFLANG_HEAD` solo para ellos (obra).
3. **Naver Search Advisor** (`NEXT_PUBLIC_VERIFICACION_NAVER`): Corea, Naver 43 a 64 %. Naver no registra
   subcarpetas: se registra el dominio y se le carga el sitemap `/kr/sitemap.xml` y el feed `/kr/novedades.xml`.
4. **Search Console**: confirmar que calcularya.com está como propiedad de dominio (está, con cuenta de
   servicio desde el 24/10) y guardar las vistas por país que use el informe de los lunes.

Lo demás ya está hecho o lo hace un cron: no hay tarea recurrente para Manuel.

## 6. Cómo se agrega un país nuevo con el mismo nivel (resumen operativo)

1. El agente lee `docs/global/BRIEF-PAIS.md` (o `docs/paises/BRIEF-AGENTE-PAIS.md` en Latinoamérica),
   que remite a este estándar, y construye el país con la RECETA.
2. Antes de devolver corre, además de los checks de datos: `npx tsx scripts/check_seo_pais.ts <m>` en
   verde y lee sus avisos.
3. El coordinador registra el país, corre `check-all` (incluye `check_seo_pais`, `check_hreflang`,
   `check_seo_intl`) y `next build`, mergea, verifica el deploy, manda IndexNow y anota la fecha de
   publicación en `docs/global/ESTADO.md`.
4. A los 30, 60 y 90 días el informe semanal de `mejora-continua` lee la vista del país en Search Console y
   deja el veredicto en `docs/medicion/BITACORA.md`.

Nada de esto requiere tocar el motor: un país nuevo hereda hreflang, sitemap, legales, schema, OG,
sello y enlazado por existir en el registro. El nivel lo decide la calidad de sus datos y de su texto,
y eso es lo que el check mide.
