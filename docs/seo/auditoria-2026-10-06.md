# Auditoría SEO de calcular.ar (6/10/2026)

Auditoría hecha sobre el HTML real del build de producción (`next build`, 218 páginas prerenderizadas, 166 indexables) y sobre el código. Cada número de este documento sale de ese build salvo que diga «estimación».

Este documento tiene dos públicos:

1. **Quien revisa la infraestructura**: secciones 1 a 4 (qué se encontró, qué se aplicó, qué quedó al máximo).
2. **El equipo que reescribe los textos de cada `page.tsx`**: secciones 5 a 8 (reglas, plantillas, la lista por ruta y el enlazado interno). Nada de eso se aplicó: es la lista de trabajo.

La sección 9 son las páginas nuevas que valen la pena, y la 10 lo que necesita a Manuel.

---

## 1. Resumen

El sitio está técnicamente sano en lo que más pesa: un canonical propio en cada página, un solo H1 por página, cero títulos o descripciones duplicados, robots abierto a buscadores y a bots de IA, y un `llms.txt` vigilado por un check. Lo que fallaba era la **capa de señales finas**, justo la que no rompe el build ni la ve un usuario:

| # | Hallazgo | Impacto | Estado |
|---|---|---|---|
| 1 | 162 de 166 títulos pasaban los 60 caracteres que muestra Google, en parte por el sufijo « · CalculAR» (11 caracteres) que agregaba el template del layout | Alto (CTR) | Sufijo sacado. Los títulos propios de cada página quedan para redacción (sección 7) |
| 2 | 157 de 166 descriptions pasan los 155 caracteres; muchas llevan montos que rotan cada mes | Alto (CTR) | Para redacción (sección 7) |
| 3 | 106 nodos Article firmaban con `{"@id": ".../#autor"}` sin el nodo Person en la misma página: para el validador de Google el autor no tenía nombre | Alto (E-E-A-T, rich results) | Corregido en `JsonLd`: la referencia sale con nombre y url |
| 4 | 22 páginas publicaban `dateModified` y `datePublished` en castellano («6 de septiembre de 2026»), formato inválido para schema.org | Alto (frescura) | Corregido en `JsonLd`: se normaliza a ISO 8601 |
| 5 | La home no tenía ningún JSON-LD (ni WebSite ni Organization): sin entidad del sitio para el nombre que Google muestra arriba del resultado | Alto (marca en SERP) | Grafo global WebSite + Organization (con logo) + Person en el layout |
| 6 | lastmod del sitemap desalineado con las páginas en 112 de 163 URLs (ej.: `/indemnizacion` decía enero y la página septiembre; 16 guías decían 2026-06-01) | Medio-alto (rastreo) | Corregido con fechas reales y un gate que impide que vuelva a pasar |
| 7 | `/inflacion/2017`, `/2018` y `/2019` construidas e indexables pero fuera del sitemap (la lista de años estaba escrita a mano) | Medio | Corregido: los años salen de la serie de IPC |
| 8 | Solo 27 páginas tenían BreadcrumbList | Medio | Migas en 150 páginas, armadas desde la URL y el modelo de navegación |
| 9 | 136 páginas pierden og:site_name, og:locale y og:type (y 107 og:url) porque Next mezcla la metadata en forma plana y cada `openGraph` de página pisa el del layout | Medio (compartidos en WhatsApp) | Helper `openGraphDe()` listo en `src/lib/seo.ts`; adoptarlo es tarea de redacción |
| 10 | 17 páginas (14 calculadoras y 3 guías) reciben 1 solo enlace contextual (dentro de `<main>`): todo el cluster ART, Ganancias por tipo de contribuyente, juicio laboral, ARCA | Alto (autoridad interna) | Para redacción (sección 8) |

**Urgencias por calendario** (para redacción, antes del 1/11): `/aguinaldo/fechas` sigue hablando de junio con la cuota de diciembre por delante; `/aguinaldo` tiene dateModified de junio; `/fondo-de-asistencia-laboral` arranca el 1/11/2026; `/blog/estatutos-laborales-derogados-2027` tiene 1 enlace entrante y la derogación es el 1/1/2027.

---

## 2. Qué se aplicó (infraestructura)

| Archivo | Cambio |
|---|---|
| `src/app/layout.tsx` | Sin template « · CalculAR» en el title. `robots.googleBot` con `max-image-preview: large`, `max-snippet: -1` y `max-video-preview: -1` (requisito de Discover para imágenes grandes). `applicationName`, `authors`, `creator`, `publisher`, `formatDetection`. Grafo JSON-LD global en el body. El default title ya no lleva raya |
| `src/lib/seo.ts` (nuevo) | `prepararJsonLd()`: fechas a ISO, referencias a autor y organización con nombre y url (sin el mail), BreadcrumbList cuando la página no trae la suya. `grafoDelSitio()`: WebSite + Organization con logo (`/apple-icon`, 180×180) + Person. `openGraphDe()`: openGraph completo para que las páginas lo adopten. `migas()` y `fechaISO()` |
| `src/components/JsonLd.tsx` | Serializa pasando por `prepararJsonLd()`. Ninguna página cambió: las 117 que usan `JsonLd` heredan las tres correcciones |
| `src/app/sitemap.ts` | lastmod real por página (el dateModified que declara la propia página o, si no tiene, el último cambio en git). Hubs con la fecha de su hijo más nuevo. Meses de convenio futuros sin lastmod hasta que empiezan. Años de inflación desde los datos. Sin `changeFrequency` ni `priority` (Google y Bing los ignoran) |
| `scripts/check_seo.ts` (nuevo, entra solo a `check-all`) | Falla si: una página indexable falta del sitemap, el sitemap lista algo que no existe o es privado, hay lastmod no ISO o futuro, el lastmod queda atrás de la fecha literal de su página, robots bloquea algo del sitemap o a un bot, o se rompen las normalizaciones de `seo.ts`. Avisa (sin fallar) cuántos títulos literales pasan los 60 caracteres |
| `public/llms.txt` | Sección nueva «Guías» con las 16 notas del blog. La línea del IPC ya no dice «último dato: julio 2026» (estaba vieja: el último cargado es agosto) y remite a la calculadora en vez de fijar un mes |
| `scripts/mapa-contenido.ts` | Columnas con el largo del title y la description literales, y `--largos` para listar solo lo que pasa 60/155. Sin el emoji de la salida |

**Nota de entorno (no es del código):** esta máquina tiene `core.autocrlf=true`, así que un worktree recién creado deja 831 archivos en CRLF y `check_eol`, `check_llms` y `check_panel_sql` fallan antes de tocar nada. En Vercel (Linux) no pasa. Para correr `check-all` en un worktree nuevo hay que pasar el working copy a LF (`sed -i 's/\r$//'` sobre los archivos que `git ls-files --eol` marca `i/lf w/crlf`; no genera diff). La solución de fondo es un `.gitattributes` con `* text=auto eol=lf`, que queda como decisión de Manuel porque afecta a todo el repo.

Verificado en el HTML del build nuevo: 166 páginas indexables, todas con el WebSite global, 0 fechas no ISO, 0 Article con autor sin nombre, 150 con migas y en las 150 la última miga coincide con el canonical de la página.

---

## 3. Hallazgos técnicos con evidencia

### 3.1 Rastreo e indexación

- **robots.txt**: correcto. Abierto a `*` y a nueve bots de IA declarados (OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Google-Extended, Applebot-Extended). Privado tapado con `$` y `/` para no comerse rutas hermanas. Se deja como está.
- **Rutas privadas**: además del Disallow llevan `X-Robots-Tag: noindex` en `next.config.ts`. Ojo con una sutileza: un Disallow impide que Google vea ese noindex, así que una URL privada enlazada desde afuera puede indexarse «sin contenido». Hoy no es un problema (nada público enlaza a `/cuenta`); si aparece en Search Console como «Indexada aunque bloqueada por robots.txt», la salida es sacar esas rutas del Disallow y dejar que el noindex haga el trabajo.
- **Sitemap**: 166 URLs, todas indexables y todas con página real. El archivo mensual (cuota alimentaria, canasta básica) mantiene la ventana indexable coherente con el `noindex` de cada página: lo cuida `check_archivo_mensual`.
- **Canonical**: autorreferente en las 166 indexables, sin barra final, siempre `https://calcular.ar`. Al máximo.

### 3.2 Datos estructurados

Tipos presentes en las indexables (build del 6/10): Organization 149, FAQPage 112, Article 106, WebApplication 81, Dataset 65, BreadcrumbList 27 (ahora 150), Product 14, CollectionPage 2, AboutPage 1.

Queda para las páginas (no se puede resolver desde afuera):

- **dateModified ausente** en `/`, `/blog`, `/convenios`, `/sobre`, las 9 planillas y los 5 informes. Sin fecha, el sitemap usa la del último commit.
- **dateModified en el futuro**: `/convenios/comercio/noviembre-2026` (2026-11-01), `/convenios/comercio/diciembre-2026` (2026-12-01), `/convenios/uocra/noviembre-2026` (2026-11-01). La página usa el 1° del mes de la escala; para un mes que todavía no empezó tiene que usar la fecha de publicación del acuerdo o la del build. El sitemap ya las publica sin lastmod hasta que llegue el mes.
- **Article sin `image`**: ninguno lo trae. No bloquea nada, pero Google lo recomienda para Article. Se puede pasar la misma URL de `/og?t=...` que ya arma cada página.
- **FAQPage**: Google dejó de mostrar el resultado enriquecido de FAQ para sitios que no son de gobierno o salud. Se mantiene porque no molesta y sirve de señal semántica (lo dice `src/lib/schema.ts`). No sumar más.
- **WebApplication sin rating**: correcto que no lo tenga. No inventar `aggregateRating`.

### 3.3 Metadata

- Sin títulos ni descriptions duplicados. Un solo H1 por página en las 166. Al máximo.
- Largos: ver sección 7, ruta por ruta.
- `openGraph` incompleto en 136 páginas (ver hallazgo 9). La forma de arreglarlo sin repetir código es:

```ts
import { openGraphDe } from "@/lib/seo";

export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: { canonical: "/aguinaldo" },
  openGraph: openGraphDe({ ruta: "/aguinaldo", titulo: "Calculadora de aguinaldo 2026", bajada: "Cuánto cobrás de SAC, en bruto y en mano" }),
};
```

### 3.4 Rendimiento visible en el código

- Fuente Geist por `next/font` (autohosteada, sin request a Google Fonts). CSS como archivo aparte por decisión medida (comentario en `next.config.ts`). AdSense diferido a después de `load`. Casi no hay imágenes en el contenido: el LCP es texto. Bien.
- HTML más pesados del build: `/` 276 KB, `/servicios-esenciales-huelga` 181 KB, `/planillas/camioneros` 180 KB, `/planillas/uocra` 174 KB. Sin medición de campo no es un hallazgo, pero la home merece una pasada de Lighthouse móvil: el payload RSC duplica el catálogo entero.

### 3.5 E-E-A-T y visibilidad en IA

- Autor real con página (`/sobre`), firma visible (`FirmaAutor`), fuentes oficiales citadas y fecha de verificación en las calculadoras. Con el arreglo del hallazgo 3 esa firma ahora llega entera al JSON-LD de cada página.
- `llms.txt` completo y vigilado. Respuesta directa arriba (`RespuestaPrimero`) en las calculadoras principales.
- Lo que falta es presencia fuera del sitio (los motores de IA citan más a terceros que al propio sitio): ver sección 10.

---

## 4. Lo que ya estaba al máximo y no se tocó

robots.txt · canonical · un H1 por página · títulos y descriptions únicos · alt en todas las imágenes · bots de IA habilitados · ventana indexable del archivo mensual · `llms.txt` y su check · IndexNow (`scripts/indexnow_ping.ts`) · seguridad de cabeceras · fuente y CSS.

---

## 5. Reglas para el equipo de redacción

1. **Title de 60 caracteres como máximo, contado entero.** El layout ya no agrega « · CalculAR»: lo que se escribe es lo que se ve. Google pone el nombre del sitio arriba del resultado a partir del WebSite global.
2. **Keyword al principio** y el año (o el mes, si el dato rota) cerca. Ejemplo: «Calculadora de aguinaldo 2026: cuánto cobrás de SAC».
3. **Description de 155 caracteres como máximo.** Primero el dato o la respuesta, después la acción («Calculá...»). Sin montos que rotan si la description no sale de la misma variable que el resto de la página.
4. **Sin raya larga** (el signo U+2014). Paréntesis, dos puntos o punto. Sin emojis.
5. **Títulos dinámicos** (`{mes}` en la lista): usar la misma variable que ya usa la página para el H1. Hoy hay casos donde el title dice un mes y el H1 otro (`/aportes-empleada-domestica`).
6. **`openGraph`**: siempre con `openGraphDe()` de `src/lib/seo.ts`, nunca un objeto suelto con solo `images`.
7. **Fechas del JSON-LD**: `JsonLd` ya convierte «6 de septiembre de 2026» a ISO, pero lo prolijo es pasar ISO desde la página. Si se sube la fecha literal de una página, `check_seo` exige subir también su línea en `src/app/sitemap.ts`.
8. **Enlaces internos con ancla descriptiva** («calculadora de indemnización», no «acá»). Entre 3 y 6 enlaces contextuales por página, dentro del texto o en un bloque «Seguí con» al final.
9. Para chequear el avance: `npx tsx scripts/mapa-contenido.ts --largos`.

---

## 6. Plantillas para las páginas mensuales (generateMetadata)

Hoy esos títulos rondan los 70-80 caracteres después de sacar la marca. Propuesta, con el dato del mes adelante:

| Ruta | Title (máx. medido) | Description |
|---|---|---|
| `/convenios/comercio/[mes]` | «Sueldo de Comercio {mes}: Maestranza A {monto}» (≤ 60) | «Escala de {mes} del CCT 130/75 por categoría, sumas no remunerativas y variación contra el mes anterior. Verificada contra la circular de FAECYS.» |
| `/convenios/uocra/[mes]` | «Jornales UOCRA {mes}: Oficial {monto} la hora» (≤ 55) | «Jornales oficiales de la construcción de {mes} por categoría y zona, con la variación contra el mes anterior y la suma no remunerativa.» |
| `/convenios/camioneros/[mes]` | «Escala Camioneros {mes}: Chofer de 1ª {monto}» (≤ 58) | «Básicos de {mes} del CCT 40/89 por categoría y la variación contra el mes anterior, homologados por la DNRyRT.» |
| `/cuota-alimentaria/[mes]` | «Cuota alimentaria {mes}: canasta de crianza INDEC» (≤ 59) | «Cuánto costaba criar un hijo en {mes} según el INDEC, por edad, abierto en bienes y cuidado y actualizado a hoy.» |
| `/canasta-basica/[mes]` | «Canasta básica {mes}: línea de pobreza del INDEC» (≤ 58) | «CBT y CBA por adulto equivalente de {mes} y cuánto necesitó cada tipo de hogar para no ser pobre, con el dato del INDEC.» |
| `/inflacion/[anio]` | «Inflación {anio} en Argentina: {pct} anual, mes a mes» (≤ 52) | «La inflación de {anio} según el IPC del INDEC, con la tabla mes a mes (mensual, acumulada e interanual) y cuánto vale hoy esa plata.» |

`{mes}` es «agosto 2026» (sin «de»; los largos se midieron con «septiembre 2026» y los montos de agosto), `{monto}` el valor del mes de la categoría de referencia que la página ya usa. En Camioneros el H1 actual lleva raya.

---

## 7. Lista por ruta (title, description, enlaces, notas)

Cada ruta trae el title actual (ya sin la marca), la propuesta con su largo medido (los `{mes}` se midieron con el peor caso, «septiembre de 2026»), los enlaces internos a sumar dentro del cuerpo y cuántos enlaces contextuales recibe hoy desde el `<main>` de otras páginas. Los enlaces que ya existen figuran como «Ya enlaza» para no duplicarlos.


### Inicio y hubs

#### `/`
- Title actual (51): CalculAR — Calculadoras gratuitas para la Argentina
- **Title propuesto (51):** CalculAR: calculadoras de sueldo, impuestos y ANSES
- **Description propuesta (151):** Calculadoras gratis para la Argentina con datos oficiales: sueldo neto, aguinaldo, indemnización, monotributo, Ganancias y jubilación. Al día cada mes.
- Enlaces contextuales que recibe hoy: 0
- Notas: El title actual lleva raya. La home no tenía JSON-LD: ahora recibe el grafo global (WebSite + Organization + Person) desde el layout, no hace falta tocar la página.

#### `/blog`
- Title actual (45): Guías: tu plata explicada con datos oficiales
- **Title propuesto (54):** Guías de sueldo, impuestos y ANSES con datos oficiales
- **Description propuesta (136):** Guías sobre aguinaldo, indemnización, monotributo, Ganancias y asignaciones, con la cuenta paso a paso y la fuente oficial de cada dato.
- Enlaces contextuales que recibe hoy: 0
- Notas: Sumar dateModified al CollectionPage (hoy no tiene). Agrupar las guías por tema con H2 (Aguinaldo, Comercio, Monotributo, Despido) en vez de una sola lista cronológica.

#### `/convenios`
- Title actual (71): Convenios colectivos 2026: escalas salariales y calculadoras por gremio
- **Title propuesto (46):** Escalas salariales 2026 por convenio colectivo
- **Description propuesta (154):** Cuánto se cobra en 2026 por convenio: Comercio, UOCRA y Camioneros, con calculadora, la escala del mes y la paritaria verificada contra la fuente oficial.
- Enlaces internos a agregar en el cuerpo: `/sueldo-neto/comercio`, `/sueldo-neto/construccion`, `/sueldo-neto/camioneros`, `/convenio-vencido`, `/planillas`
- Enlaces contextuales que recibe hoy: 35
- Notas: La description actual no menciona Camioneros. Sin dateModified en el JSON-LD.

#### `/sobre`
- Title actual (47): Sobre CalculAR: quiénes somos y cómo trabajamos
- **Title propuesto (54):** Sobre CalculAR: quién hace el sitio y cómo se verifica
- **Description propuesta (136):** Quién está detrás de CalculAR, cómo se verifica cada dato contra la fuente oficial y con qué metodología se construyen las calculadoras.
- Enlaces contextuales que recibe hoy: 28
- Notas: Sumar dateModified al AboutPage. Es el destino de FirmaAutor en todo el sitio: conviene una línea de experiencia concreta (desde cuándo, qué se verificó) arriba de todo.


### Sueldo y convenios

#### `/sueldo-neto`
- Title actual (64): Calculadora de Sueldo Neto 2026: de bruto a en mano (y al revés)
- **Title propuesto (51):** Calculadora de sueldo neto 2026: de bruto a en mano
- **Description propuesta (135):** Calculá tu sueldo en mano con jubilación 11%, PAMI 3% y obra social 3%, tope SIPA, cuota sindical y Ganancias. También de neto a bruto.
- Enlaces internos a agregar en el cuerpo: `/descuentos-del-sueldo`, `/planillas/mi-sueldo`
- Ya enlaza (mantener): `/sueldo-neto/comercio`, `/sueldo-neto/construccion`, `/sueldo-neto/camioneros`
- Enlaces contextuales que recibe hoy: 78
- Notas: Es hub del cluster sueldo: las tres páginas por convenio tienen que colgar de acá con anclas del tipo «sueldo neto de Comercio».

#### `/sueldo-neto/comercio`
- Title actual (60): Sueldo Neto Empleados de Comercio 2026: cuánto queda en mano
- **Title propuesto (50):** Sueldo neto de Comercio 2026: cuánto queda en mano
- **Description propuesta (153):** Neto por categoría del CCT 130/75. Los no remunerativos solo pagan obra social, así que el neto real es mayor que el bruto por 0,83. Calculadora y tabla.
- Enlaces internos a agregar en el cuerpo: `/blog/como-liquidar-sueldo-empleado-de-comercio`
- Ya enlaza (mantener): `/convenios/comercio`, `/planillas`
- Enlaces contextuales que recibe hoy: 5

#### `/sueldo-neto/construccion`
- Title actual (59): Sueldo Neto Construcción (UOCRA) 2026: cuánto queda en mano
- **Title propuesto (44):** Sueldo neto UOCRA 2026: cuánto cobra en mano
- **Description propuesta (133):** Cuánto cobra en mano un obrero de la construcción según el CCT 76/75 por categoría y zona: oficial, medio oficial, ayudante y sereno.
- Ya enlaza (mantener): `/convenios/uocra`, `/planillas/uocra`
- Enlaces contextuales que recibe hoy: 2
- Notas: Solo 2 enlaces contextuales entrantes. Sumarla desde /convenios/uocra y desde /sueldo-neto.

#### `/sueldo-neto/camioneros`
- Title actual (63): Sueldo Neto Camioneros 2026: cuánto queda en mano por categoría
- **Title propuesto (44):** Sueldo neto de camioneros 2026 por categoría
- **Description propuesta (132):** Cuánto cobra en mano un camionero según la escala del CCT 40/89: chofer de 1ª, 2ª y 3ª, peón y taller, con bruto, descuentos y neto.
- Ya enlaza (mantener): `/convenios/camioneros`, `/planillas/camioneros`
- Enlaces contextuales que recibe hoy: 3

#### `/convenios/comercio`
- Title actual (69): Sueldo de Empleados de Comercio 2026: calculadora y escala CCT 130/75
- **Title propuesto (56):** Sueldo de Comercio 2026: escala CCT 130/75 y calculadora
- **Description propuesta (142):** Cuánto cobra un empleado de comercio en 2026 por categoría, con antigüedad, presentismo y jornada parcial. Escala oficial de FAECYS mes a mes.
- Enlaces internos a agregar en el cuerpo: `/sueldo-neto/comercio`, `/blog/aumento-comercio-agosto-2026`, `/blog/como-liquidar-sueldo-empleado-de-comercio`
- Ya enlaza (mantener): `/dia-del-empleado-de-comercio`
- Enlaces contextuales que recibe hoy: 20
- Notas: «escala salarial comercio» y «escala salarial empleados de comercio» aparecen en el autocompletado de Google AR (6/10/2026).

#### `/convenios/uocra`
- Title actual (61): Sueldos UOCRA 2026: calculadora y escala por zona (CCT 76/75)
- **Title propuesto (49):** Sueldos UOCRA 2026: jornales por categoría y zona
- **Description propuesta (136):** Jornales oficiales de UOCRA (CCT 76/75) por categoría y zona, de jornal a sueldo mensual con asistencia perfecta y suma no remunerativa.
- Ya enlaza (mantener): `/sueldo-neto/construccion`, `/planillas/uocra`
- Enlaces contextuales que recibe hoy: 12

#### `/convenios/camioneros`
- Title actual (59): Sueldo de camioneros 2026: calculadora y escala (CCT 40/89)
- **Title propuesto (43):** Sueldo de camioneros 2026: escala CCT 40/89
- **Description propuesta (145):** Escala salarial de Camioneros 2026 por categoría (chofer de 1ª, 2ª y 3ª, peones y taller) con antigüedad y calculadora, homologada por la DNRyRT.
- Ya enlaza (mantener): `/sueldo-neto/camioneros`, `/planillas/camioneros`
- Enlaces contextuales que recibe hoy: 10
- Notas: El H1 actual separa «2026» y «calculadora» con una raya: cambiarla por dos puntos.

#### `/aguinaldo`
- Title actual (68): Calculadora de Aguinaldo 2026: cuánto cobrás de SAC y cuándo se paga
- **Title propuesto (51):** Calculadora de aguinaldo 2026: cuánto cobrás de SAC
- **Description propuesta (146):** Calculá tu aguinaldo 2026: 50% del mejor sueldo del semestre, proporcional por días. Bruto y en mano, con las fechas de pago de junio y diciembre.
- Ya enlaza (mantener): `/aguinaldo/fechas`, `/aguinaldo/neto`, `/blog/aguinaldo-proporcional-como-se-calcula`, `/blog/aguinaldo-paga-ganancias`
- Enlaces contextuales que recibe hoy: 55
- Notas: PRIORIDAD por estacionalidad: la segunda cuota vence el 18/12. dateModified sigue en 2026-06-13: revisar el texto con foco en diciembre antes de noviembre.

#### `/aguinaldo/fechas`
- Title actual (72): Cuándo se paga el aguinaldo 2026: fechas por provincia, ANSES y privados
- **Title propuesto (48):** Cuándo se paga el aguinaldo 2026: fechas de pago
- **Description propuesta (149):** Cuándo se cobra el aguinaldo de diciembre 2026: privados (vence el 18/12), jubilados de ANSES y estatales por provincia, con la fuente de cada fecha.
- Enlaces internos a agregar en el cuerpo: `/jubilacion`
- Ya enlaza (mantener): `/aguinaldo`
- Enlaces contextuales que recibe hoy: 2
- Notas: PRIORIDAD: la página y su H1 hablan de junio. Hay que cargar el calendario de diciembre (dato a verificar contra ANSES y cada provincia antes de publicarlo). Solo 2 enlaces contextuales entrantes: linkearla desde /aguinaldo arriba de todo y desde /jubilacion.

#### `/aguinaldo/neto`
- Title actual (71): Aguinaldo bruto o neto: cuánto queda en mano en 2026 (tabla por sueldo)
- **Title propuesto (41):** Aguinaldo neto 2026: cuánto queda en mano
- **Description propuesta (142):** El aguinaldo se cobra neto: 50% del mejor sueldo bruto menos 17% de aportes. En mano queda cerca del 41,5% del mejor sueldo. Tabla por sueldo.
- Enlaces internos a agregar en el cuerpo: `/sueldo-neto`, `/blog/aguinaldo-paga-ganancias`
- Enlaces contextuales que recibe hoy: 7

#### `/vacaciones`
- Title actual (76): Calculadora de Vacaciones 2026: cuántos días te corresponden y cuánto cobrás
- **Title propuesto (52):** Calculadora de vacaciones 2026: días y cuánto cobrás
- **Description propuesta (141):** Calculá tus días de vacaciones por antigüedad (art. 150 LCT) y cuánto cobrás con el plus vacacional de sueldo dividido 25, con la Ley 27.802.
- Enlaces internos a agregar en el cuerpo: `/licencias-especiales`
- Ya enlaza (mantener): `/blog/cuanto-se-cobra-de-vacaciones-plus-vacacional-2026`, `/planillas/vacaciones`
- Enlaces contextuales que recibe hoy: 21
- Notas: Pico de búsqueda en diciembre y enero: refrescar dateModified (2026-06-13) con la revisión.

#### `/horas-extras`
- Title actual (75): Horas extras 2026: cuánto se cobra y cuándo te las pueden pagar con francos
- **Title propuesto (51):** Horas extras 2026: cuánto se pagan al 50% y al 100%
- **Description propuesta (134):** Calculá tus horas extra con recargo del 50% y del 100%, el tope de 30 horas por mes y los francos del banco de horas de la Ley 27.802.
- Ya enlaza (mantener): `/sueldo-neto`, `/tiempo-parcial`
- Enlaces contextuales que recibe hoy: 8

#### `/salario-minimo`
- Title actual (73): Salario mínimo octubre de 2026: $ 391.200 y la escala hasta abril de 2027
- **Title propuesto (56):** Salario mínimo {mesCorto}: cuánto es por mes y hora
- **Description propuesta (151):** El salario mínimo de {mes} por mes y por hora, la escala fijada hasta abril de 2027 (Resolución 4/2026) y todo lo que el mínimo determina.
- Enlaces internos a agregar en el cuerpo: `/tiempo-parcial`, `/canasta-basica`
- Ya enlaza (mantener): `/desempleo`, `/82-por-ciento-movil`
- Enlaces contextuales que recibe hoy: 6
- Notas: Title y description dinámicos: usar la variable de mes que ya usa la página.

#### `/tiempo-parcial`
- Title actual (71): Media jornada: cuánto te tienen que pagar (LCT art. 92 ter, texto 2026)
- **Title propuesto (46):** Media jornada 2026: cuánto te tienen que pagar
- **Description propuesta (147):** La Ley 27.802 eliminó el tope de dos tercios del art. 92 ter y permitió horas suplementarias. Calculá tu sueldo proporcional, extras y obra social.
- Enlaces internos a agregar en el cuerpo: `/salario-minimo`, `/horas-extras`
- Enlaces contextuales que recibe hoy: 4

#### `/descuentos-del-sueldo`
- Title actual (78): ¿Cuánto te pueden descontar del sueldo? El tope del 20% y sus tres excepciones
- **Title propuesto (51):** Descuentos del sueldo: el tope del 20% y el embargo
- **Description propuesta (142):** El art. 133 de la LCT limita los descuentos al 20% del sueldo, con excepciones como Ganancias y un techo nuevo del 2% para la cuota solidaria.
- Enlaces internos a agregar en el cuerpo: `/ganancias`
- Ya enlaza (mantener): `/sueldo-neto`
- Enlaces contextuales que recibe hoy: 14

#### `/propinas`
- Title actual (61): ¿Las propinas son remunerativas? Qué cambió con la Ley 27.802
- **Title propuesto (51):** ¿Las propinas son remunerativas? Qué cambió en 2026
- **Description propuesta (149):** Desde el 6/3/2026 el art. 104 de la LCT dice que las propinas nunca son remuneración. Calculá cuánto cambia tu aguinaldo, vacaciones e indemnización.
- Enlaces internos a agregar en el cuerpo: `/vacaciones`
- Ya enlaza (mantener): `/aguinaldo`, `/indemnizacion`
- Enlaces contextuales que recibe hoy: 13

#### `/dia-del-empleado-de-comercio`
- Title actual (72): Día del Empleado de Comercio 2026: se trasladó al lunes 28 de septiembre
- **Title propuesto (59):** Día del Empleado de Comercio 2026: cuándo es y cómo se paga
- **Description propuesta (138):** No es feriado nacional, pero la Ley 26.541 lo asimila a uno: si trabajás se paga doble. Cuándo cae este año y quién lo cobra sin trabajar.
- Ya enlaza (mantener): `/convenios/comercio`, `/sueldo-neto/comercio`
- Enlaces contextuales que recibe hoy: 2
- Notas: El evento de 2026 ya pasó (28/9): dejar la página evergreen y sumar la fecha de 2027 cuando FAECYS la publique.

#### `/libro-de-sueldos`
- Title actual (71): Libro de sueldos y presunción del art. 55: qué cambió con la Ley 27.802
- **Title propuesto (50):** Libro de sueldos y art. 55 LCT: qué cambió en 2026
- **Description propuesta (150):** El libro rubricado del art. 52 dejó de existir el 6/3/2026: la registración se hace ante ARCA. Y la presunción del art. 55 ahora castiga no registrar.
- Enlaces internos a agregar en el cuerpo: `/conservacion-de-recibos`, `/planillas`
- Enlaces contextuales que recibe hoy: 4

#### `/conservacion-de-recibos`
- Title actual (79): Cuánto tiempo hay que guardar los recibos de sueldo: 2 y 10 años (art. 143 LCT)
- **Title propuesto (54):** Cuánto tiempo guardar los recibos de sueldo (art. 143)
- **Description propuesta (147):** El art. 143 de la LCT fija dos plazos desde el 6/3/2026: 2 años para lo laboral y 10 para lo previsional. Calculá hasta cuándo guardar cada recibo.
- Ya enlaza (mantener): `/libro-de-sueldos`, `/blog/nuevo-recibo-de-sueldo-2026`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante: linkear desde /libro-de-sueldos y desde las dos guías de recibo.

#### `/derivar-aportes-a-prepaga`
- Title actual (77): Derivar aportes a una prepaga: cuánto llega de verdad y qué perdés al hacerlo
- **Title propuesto (53):** Derivar aportes a una prepaga: cuánto llega de verdad
- **Description propuesta (148):** El 85% de tus aportes va a la entidad que elegís y el 15% al Fondo Solidario (Decreto 600/2024). Calculá cuánto llega y cuánto pagás de tu bolsillo.
- Enlaces internos a agregar en el cuerpo: `/hasta-cuando-tengo-obra-social`, `/deducciones-generales-ganancias`
- Enlaces contextuales que recibe hoy: 3

#### `/hasta-cuando-tengo-obra-social`
- Title actual (76): ¿Hasta cuándo tenés obra social después del trabajo? Los 8 casos del art. 10
- **Title propuesto (54):** Obra social después del despido: hasta cuándo te cubre
- **Description propuesta (146):** Los 3 meses existen solo si trabajaste más de 3 meses seguidos. Los 8 casos del art. 10 de la Ley 23.660, cada uno con su plazo. Calculá tu fecha.
- Enlaces internos a agregar en el cuerpo: `/renuncia`, `/desempleo`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 2
- Notas: Linkear desde /indemnizacion y /renuncia: es la pregunta que sigue a un despido.


### Fin del trabajo

#### `/indemnizacion`
- Title actual (68): Calculadora de Indemnización por Despido 2026: cuánto te corresponde
- **Title propuesto (45):** Calculadora de indemnización por despido 2026
- **Description propuesta (151):** Calculá tu indemnización por despido sin causa: antigüedad (art. 245), preaviso, integración, aguinaldo y vacaciones proporcionales, con la Ley 27.802.
- Enlaces internos a agregar en el cuerpo: `/informes/indemnizacion`, `/hasta-cuando-tengo-obra-social`, `/certificado-de-trabajo`
- Ya enlaza (mantener): `/blog/como-se-calcula-la-indemnizacion-por-despido-2026`, `/desempleo`
- Enlaces contextuales que recibe hoy: 41
- Notas: Hub del cluster despido. «calculadora liquidación final por despido» es la sugerencia principal del autocompletado: nombrar «liquidación final» en el H2 del resultado.

#### `/renuncia`
- Title actual (67): Renuncia laboral 2026: qué te tienen que pagar y cómo se hace ahora
- **Title propuesto (48):** Liquidación final por renuncia 2026: calculadora
- **Description propuesta (147):** Calculá tu liquidación final por renuncia: días del mes, aguinaldo proporcional y vacaciones no gozadas. Desde 2026 el telegrama puede ser digital.
- Enlaces internos a agregar en el cuerpo: `/hasta-cuando-tengo-obra-social`
- Ya enlaza (mantener): `/certificado-de-trabajo`
- Enlaces contextuales que recibe hoy: 3
- Notas: «liquidación final por renuncia» y «calculadora liquidación final por renuncia» aparecen en el autocompletado de Google AR: el title nuevo apunta a esa query.

#### `/periodo-de-prueba`
- Title actual (66): Despido en período de prueba: qué te tienen que pagar (texto 2026)
- **Title propuesto (53):** Despido en período de prueba: qué te tienen que pagar
- **Description propuesta (144):** Desde el 6/3/2026 ya no hay 15 días de preaviso en el período de prueba. Calculá la liquidación final con aguinaldo y vacaciones proporcionales.
- Enlaces internos a agregar en el cuerpo: `/renuncia`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 5
- Notas: «liquidación final por despido en período de prueba» está en el autocompletado: usar la frase en un H2.

#### `/despido-plazo-fijo`
- Title actual (74): Despido antes del vencimiento del plazo: cuánto se cobra hoy (art. 95 LCT)
- **Title propuesto (51):** Despido antes del fin del plazo fijo: indemnización
- **Description propuesta (150):** El art. 95 de la LCT cambió el 6/3/2026: ahora rige la antigüedad ficta hasta el fin del plazo pactado. Calculá la indemnización con el texto vigente.
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 4
- Notas: Desambiguar contra /plazo-fijo (el bancario) con «contrato a plazo fijo» en el H1.

#### `/reingreso`
- Title actual (78): Reingreso al mismo empleador: qué antigüedad te cuentan y cuánto te descuentan
- **Title propuesto (56):** Reingreso al mismo empleador: antigüedad e indemnización
- **Description propuesta (146):** Los arts. 18 y 255 de la LCT cambiaron el 6/3/2026: la antigüedad vieja no cuenta pasados 2 años y se descuenta lo cobrado actualizado. Calculalo.
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 4

#### `/certificado-de-trabajo`
- Title actual (82): Certificado de trabajo (art. 80 LCT): plazo de 45 días y la multa que ya no existe
- **Title propuesto (54):** Certificado de trabajo (art. 80 LCT): plazo de 45 días
- **Description propuesta (146):** Desde el 6/3/2026 el empleador tiene 45 días hábiles para entregar los certificados y ya no existe la multa de 3 sueldos. Calculá tu fecha límite.
- Enlaces internos a agregar en el cuerpo: `/renuncia`, `/conservacion-de-recibos`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 5

#### `/reserva-del-empleo`
- Title actual (76): Reserva del empleo: qué pasa hoy si no te reincorporan (arts. 214 a 217 LCT)
- **Title propuesto (50):** Reserva del empleo: qué pasa si no te reincorporan
- **Description propuesta (144):** La reserva del puesto sigue vigente, pero el art. 216 de la LCT se derogó el 6/3/2026. Calculá cuánto cambia la indemnización según cuente o no.
- Enlaces internos a agregar en el cuerpo: `/licencia-por-enfermedad`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 5

#### `/transferencia-del-establecimiento`
- Title actual (83): Cambió el dueño de la empresa: tu antigüedad y quién responde (arts. 225 a 229 LCT)
- **Title propuesto (50):** Cambio de dueño de la empresa: antigüedad y deudas
- **Description propuesta (153):** Tu antigüedad se conserva entera (art. 225 LCT), pero desde 2026 el nuevo dueño puede quedar libre de deudas ocultas (art. 228). Calculá cuánto se juega.
- Ya enlaza (mantener): `/indemnizacion`, `/ius-variandi`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/ius-variandi`
- Title actual (83): Ius variandi: qué podés hacer hoy si te cambian las condiciones (arts. 66 y 68 LCT)
- **Title propuesto (53):** Ius variandi: qué hacer si te cambian las condiciones
- **Description propuesta (150):** La Ley 27.802 reescribió los arts. 66 y 68 de la LCT: cayó la acción de restablecimiento y entró la intimación previa. Calculá qué opciones te quedan.
- Enlaces internos a agregar en el cuerpo: `/transferencia-del-establecimiento`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 2

#### `/indemnizacion-por-fallecimiento`
- Title actual (83): Indemnización por fallecimiento del trabajador: quién cobra y cuánto (art. 248 LCT)
- **Title propuesto (57):** Indemnización por fallecimiento del trabajador (art. 248)
- **Description propuesta (151):** Desde el 6/3/2026 el art. 248 de la LCT cambió quién cobra y cómo se reparte. Calculá el monto, la mitad del art. 245, y la parte de cada beneficiario.
- Enlaces internos a agregar en el cuerpo: `/derechohabientes-art`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 4

#### `/despido-de-delegado-gremial`
- Title actual (68): Despido de un delegado gremial: cuánto se cobra con el art. 52 nuevo
- **Title propuesto (54):** Despido de delegado gremial: indemnización del art. 52
- **Description propuesta (153):** La Ley 27.802 reescribió el art. 52 de la Ley 23.551: suplentes afuera, cupo de congresales y sin acumular con el art. 245 bis. Calculá la indemnización.
- Enlaces internos a agregar en el cuerpo: `/practicas-desleales-sindicales`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 5

#### `/despido-trabajador-rural`
- Title actual (81): Despido del trabajador rural: período de prueba de 8 meses y el piso de 2 sueldos
- **Title propuesto (45):** Despido de trabajador rural: liquidación 2026
- **Description propuesta (152):** El período de prueba rural pasó a 8 meses y desapareció el permanente discontinuo. Calculá la liquidación del peón rural con el régimen agrario vigente.
- Ya enlaza (mantener): `/indemnizacion`, `/periodo-de-prueba`
- Enlaces contextuales que recibe hoy: 2

#### `/indemnizacion-periodista`
- Title actual (80): Indemnización de un periodista: el art. 43 del estatuto y qué cambia el 1/1/2027
- **Title propuesto (52):** Indemnización de periodistas: el estatuto hasta 2027
- **Description propuesta (150):** El Estatuto del Periodista suma indemnizaciones que la LCT no tiene, y la Ley 27.802 lo deroga el 1/1/2027. Calculá cuánto es hoy y cuánto desde 2027.
- Enlaces internos a agregar en el cuerpo: `/blog/estatutos-laborales-derogados-2027`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 3
- Notas: Ventana de tráfico hasta el 1/1/2027.

#### `/indemnizacion-por-clientela`
- Title actual (78): Indemnización por clientela del viajante de comercio: cuánto es y hasta cuándo
- **Title propuesto (52):** Indemnización por clientela del viajante de comercio
- **Description propuesta (150):** El art. 14 de la Ley 14.546 paga el 25% de un despido injustificado, también si el viajante renuncia, y el estatuto cae el 1/1/2027. Calculá el monto.
- Enlaces internos a agregar en el cuerpo: `/blog/estatutos-laborales-derogados-2027`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 3

#### `/fondo-de-asistencia-laboral`
- Title actual (70): Fondo de Asistencia Laboral (FAL): cuánto se aporta desde el 1/11/2026
- **Title propuesto (57):** Fondo de Asistencia Laboral (FAL): aporte desde noviembre
- **Description propuesta (139):** Desde el 1/11/2026 las empresas aportan 2,5% (MiPyME) o 1% (grandes) al FAL, con una baja equivalente de contribuciones. Calculá tu aporte.
- Ya enlaza (mantener): `/indemnizacion`, `/rifl`
- Enlaces contextuales que recibe hoy: 2
- Notas: PRIORIDAD por fecha: arranca el 1/11/2026. Solo 2 enlaces contextuales entrantes.

#### `/actualizacion-creditos-laborales`
- Title actual (66): Actualización de créditos laborales: IPC + 3% anual (art. 276 LCT)
- **Title propuesto (51):** Actualización de créditos laborales: IPC + 3% anual
- **Description propuesta (138):** Calculá cuánto vale hoy una deuda laboral con el IPC del INDEC más 3% anual (art. 276 LCT), con la serie oficial y los topes del art. 277.
- Enlaces internos a agregar en el cuerpo: `/informes/credito-laboral`, `/caducidad-de-instancia-laboral`, `/honorarios-periciales`
- Enlaces contextuales que recibe hoy: 10
- Notas: La description actual nombra «agosto de 2026» como último IPC: si se deja el mes, que salga de ULTIMO_PERIODO y no escrito a mano.


### Licencias

#### `/licencia-por-enfermedad`
- Title actual (61): Licencia por enfermedad: cuántos meses y hasta qué día cobrás
- **Title propuesto (47):** Licencia por enfermedad: cuántos meses se cobra
- **Description propuesta (146):** Son 3, 6 o 12 meses según antigüedad y cargas de familia (art. 208 LCT). Poné la fecha de inicio y mirá el día exacto en que se termina el sueldo.
- Enlaces internos a agregar en el cuerpo: `/reserva-del-empleo`, `/hasta-cuando-tengo-obra-social`
- Enlaces contextuales que recibe hoy: 4

#### `/licencia-por-maternidad`
- Title actual (55): Licencia por maternidad: fechas exactas y cuánto cobrás
- **Title propuesto (55):** Licencia por maternidad: fechas exactas y cuánto cobrás
- **Description propuesta (137):** Poné la fecha probable de parto y mirá cuándo empieza y termina tu licencia de 90 días, cuánto cobrás y quién paga (arts. 177 a 183 LCT).
- Enlaces internos a agregar en el cuerpo: `/licencias-especiales`
- Ya enlaza (mantener): `/asignaciones-familiares`
- Enlaces contextuales que recibe hoy: 3

#### `/licencias-especiales`
- Title actual (76): Licencias especiales del art. 158 LCT: días, fechas exactas y cuánto se paga
- **Title propuesto (48):** Licencias especiales (art. 158 LCT): días y pago
- **Description propuesta (144):** Matrimonio, nacimiento, fallecimiento y examen: cuántos días te tocan, hasta qué fecha con feriados y por qué el día se paga sueldo dividido 25.
- Ya enlaza (mantener): `/vacaciones`, `/licencia-por-maternidad`
- Enlaces contextuales que recibe hoy: 2

#### `/trabajo-de-mujeres`
- Title actual (70): Trabajo de mujeres en la LCT: los arts. 174, 175 y 176 están derogados
- **Title propuesto (53):** Trabajo de mujeres en la LCT: los artículos derogados
- **Description propuesta (141):** Desde el 6/3/2026 cayeron los arts. 174, 175 y 176 de la LCT: el descanso del mediodía y dos prohibiciones. Qué se derogó y qué quedó en pie.
- Ya enlaza (mantener): `/licencia-por-maternidad`
- Enlaces contextuales que recibe hoy: 3


### ART

#### `/indemnizacion-art`
- Title actual (80): Indemnización por accidente de trabajo (ART): calculadora con los pisos vigentes
- **Title propuesto (49):** Indemnización por accidente de trabajo (ART) 2026
- **Description propuesta (136):** Calculá la indemnización por incapacidad laboral con los pisos vigentes de la SRT. El viejo tope de $180.000 hoy es un piso actualizado.
- Enlaces internos a agregar en el cuerpo: `/rechazo-art`, `/empleador-sin-art`, `/pluriempleo-art`, `/derechohabientes-art`
- Ya enlaza (mantener): `/comision-medica`
- Enlaces contextuales que recibe hoy: 7
- Notas: Hub del cluster ART: hoy cuatro páginas del cluster tienen 1 o 2 enlaces contextuales. Un bloque «Si tu caso es...» con las cinco resuelve el cluster entero.

#### `/comision-medica`
- Title actual (69): Comisión médica: los 60 días hábiles que te habilitan a ir al juzgado
- **Title propuesto (45):** Comisión médica ART: plazo de 60 días hábiles
- **Description propuesta (148):** Antes de reclamarle a la ART hay que pasar por la comisión médica, que tiene 60 días hábiles. Vencido el plazo, podés ir a juicio. Calculá tu fecha.
- Enlaces internos a agregar en el cuerpo: `/rechazo-art`
- Ya enlaza (mantener): `/indemnizacion-art`
- Enlaces contextuales que recibe hoy: 6

#### `/rechazo-art`
- Title actual (56): La ART rechazó el accidente: ¿el rechazo llegó en plazo?
- **Title propuesto (43):** La ART rechazó mi accidente: ¿fue en plazo?
- **Description propuesta (148):** La ART tiene 10 días hábiles para rechazar un accidente. Calculá si el rechazo llegó en plazo, si la prórroga vale y si corresponde comisión médica.
- Ya enlaza (mantener): `/comision-medica`, `/indemnizacion-art`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/empleador-sin-art`
- Title actual (68): Mi empleador no tiene la ART al día: ¿quién me paga si me accidento?
- **Title propuesto (43):** Mi empleador no paga la ART: quién me cubre
- **Description propuesta (152):** Que la empresa deba cuotas no te deja sin cobertura: la ART tiene que atenderte y después le cobra a ella. Quién responde en cada caso, con el artículo.
- Ya enlaza (mantener): `/indemnizacion-art`, `/comision-medica`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/pluriempleo-art`
- Title actual (62): Dos trabajos y un accidente: qué ART te cubre y con qué sueldo
- **Title propuesto (52):** Pluriempleo y ART: qué ART te cubre y con qué sueldo
- **Description propuesta (143):** Con dos trabajos, qué ART responde por el accidente, qué sueldos cuentan para la base y cómo se calcula la incapacidad de un segundo accidente.
- Ya enlaza (mantener): `/indemnizacion-art`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/derechohabientes-art`
- Title actual (63): Quién cobra la indemnización por muerte laboral: las dos listas
- **Title propuesto (45):** Indemnización por muerte laboral: quién cobra
- **Description propuesta (155):** Una muerte en el trabajo genera dos indemnizaciones con listas distintas: la de la ART (Ley 24.557) y la del empleador (art. 248 LCT). Quién cobra cada una
- Ya enlaza (mantener): `/indemnizacion-por-fallecimiento`, `/indemnizacion-art`
- Enlaces contextuales que recibe hoy: 2

#### `/art-empleada-domestica`
- Title actual (78): ART de la empleada doméstica: sobre qué sueldo se liquida (no es el que cobra)
- **Title propuesto (51):** ART de empleada doméstica: cuota y sobre qué sueldo
- **Description propuesta (149):** La ART del personal de casas particulares es obligatoria y la paga el empleador sobre el mínimo de la categoría. Calculá la cuota y la indemnización.
- Ya enlaza (mantener): `/aportes-empleada-domestica`, `/empleada-domestica`, `/indemnizacion-art`
- Enlaces contextuales que recibe hoy: 2


### Casas particulares y regímenes especiales

#### `/empleada-domestica`
- Title actual (70): Empleada doméstica: cuánto cobra por hora y por mes en octubre de 2026
- **Title propuesto (60):** Sueldo de empleada doméstica {mesCorto}: por hora y mes
- **Description propuesta (150):** Escala oficial de las 5 categorías de casas particulares, con y sin retiro, por hora y por mes. Calculá el sueldo por horas reales, con extras y zona.
- Enlaces internos a agregar en el cuerpo: `/aportes-empleada-domestica`, `/despido-empleada-domestica`, `/deduccion-empleada-domestica`
- Ya enlaza (mantener): `/planillas/casas-particulares`
- Enlaces contextuales que recibe hoy: 6
- Notas: «escala salarial servicio doméstico septiembre 2026» aparece en el autocompletado: el mes en el title vale.

#### `/aportes-empleada-domestica`
- Title actual (77): Aportes de empleada doméstica: cuánto paga el empleador en septiembre de 2026
- **Title propuesto (60):** Aportes de empleada doméstica {mesCorto}: tabla de ARCA
- **Description propuesta (148):** Cuánto paga el empleador por mes según las horas semanales: obra social, jubilación y ART con la tabla oficial de ARCA. Incluye menores y jubilados.
- Enlaces internos a agregar en el cuerpo: `/art-empleada-domestica`
- Ya enlaza (mantener): `/empleada-domestica`, `/planillas/casas-particulares`
- Enlaces contextuales que recibe hoy: 5
- Notas: Inconsistencia hoy: el title dice septiembre y el H1 dice agosto. Que los dos salgan de la misma variable.

#### `/despido-empleada-domestica`
- Title actual (66): Despido de empleada doméstica: liquidación final con el texto 2026
- **Title propuesto (53):** Despido de empleada doméstica: liquidación final 2026
- **Description propuesta (146):** Calculá preaviso, integración del mes, indemnización del art. 48, aguinaldo y vacaciones proporcionales. El período de prueba ahora es de 6 meses.
- Ya enlaza (mantener): `/empleada-domestica`, `/planillas/casas-particulares`
- Enlaces contextuales que recibe hoy: 3
- Notas: «liquidación final empleada doméstica» está en el autocompletado: usar la frase en el H1 o en un H2.

#### `/deduccion-empleada-domestica`
- Title actual (77): Deducción de empleada doméstica en Ganancias 2026: cuánto te vuelve de verdad
- **Title propuesto (49):** Deducción de empleada doméstica en Ganancias 2026
- **Description propuesta (152):** El tope anual es la ganancia no imponible, pero deducir no es cobrar: te vuelve tu alícuota. Calculá el ahorro real según tu sueldo y qué pagos cuentan.
- Ya enlaza (mantener): `/ganancias`, `/aportes-empleada-domestica`
- Enlaces contextuales que recibe hoy: 5

#### `/repartidores-de-apps`
- Title actual (67): Repartidor o conductor de app: cuánto te queda por mes (Ley 27.802)
- **Title propuesto (51):** Repartidores y conductores de apps: cuánto te queda
- **Description propuesta (152):** Desde la Ley 27.802 son prestadores independientes. Calculá tu categoría de monotributo, cuánto te queda limpio por mes y la diferencia con un empleado.
- Enlaces internos a agregar en el cuerpo: `/obra-social-monotributo`
- Ya enlaza (mantener): `/monotributo`
- Enlaces contextuales que recibe hoy: 3


### Sindical y juicio laboral

#### `/caducidad-de-instancia-laboral`
- Title actual (57): Caducidad de instancia en el juicio laboral: 6, 3 y 1 mes
- **Title propuesto (54):** Caducidad de instancia laboral: plazos de 6, 3 y 1 mes
- **Description propuesta (140):** Desde el 6/3/2026 el juicio laboral lo impulsan las partes y caduca sin intimación previa. Calculá la fecha de caducidad según la instancia.
- Enlaces internos a agregar en el cuerpo: `/actualizacion-creditos-laborales`, `/honorarios-periciales`
- Ya enlaza (mantener): `/temeridad-y-malicia`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante. Armar un bloque «Juicio laboral» que una caducidad, temeridad, honorarios y actualización de créditos.

#### `/temeridad-y-malicia`
- Title actual (56): Temeridad y malicia: el art. 275 de la LCT está derogado
- **Title propuesto (45):** Temeridad y malicia: el art. 275 LCT derogado
- **Description propuesta (150):** Desde el 6/3/2026 el empleador que litiga de mala fe ya no paga el interés agravado, y el trabajador puede cargar costas por pluspetición. Qué cambió.
- Enlaces internos a agregar en el cuerpo: `/caducidad-de-instancia-laboral`
- Ya enlaza (mantener): `/actualizacion-creditos-laborales`
- Enlaces contextuales que recibe hoy: 4

#### `/honorarios-periciales`
- Title actual (52): Honorarios de peritos: el piso bajó de 6 UMA a 2 UMA
- **Title propuesto (43):** Honorarios de peritos 2026: mínimo de 2 UMA
- **Description propuesta (151):** La Ley 27.802 bajó el mínimo pericial de 6 a 2 UMA y lo desvinculó del monto del juicio. Calculá el piso legal y cuánto vale hoy una regulación en UMA.
- Enlaces internos a agregar en el cuerpo: `/caducidad-de-instancia-laboral`, `/indemnizacion-art`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante. El valor de la UMA no va en la description (rota).

#### `/convenio-vencido`
- Title actual (50): Convenio colectivo vencido: qué te sigue aplicando
- **Title propuesto (50):** Convenio colectivo vencido: qué te sigue aplicando
- **Description propuesta (144):** La Ley 27.802 amplió la ultraactividad y puso el convenio de empresa por encima del de actividad. Qué beneficios siguen con el convenio vencido.
- Enlaces internos a agregar en el cuerpo: `/negociacion-de-buena-fe`, `/blog/estatutos-laborales-derogados-2027`
- Ya enlaza (mantener): `/convenios`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/negociacion-de-buena-fe`
- Title actual (59): Negociar de buena fe: la multa del 20% ahora es obligatoria
- **Title propuesto (54):** Negociación de buena fe: la multa del 20% (Ley 23.546)
- **Description propuesta (148):** Desde el 6/3/2026 el juez sanciona a quien se niega a negociar y cesar a tiempo ya no reduce la multa. Calculá el techo del 20% de la masa salarial.
- Enlaces internos a agregar en el cuerpo: `/convenio-vencido`
- Ya enlaza (mantener): `/practicas-desleales-sindicales`
- Enlaces contextuales que recibe hoy: 2

#### `/practicas-desleales-sindicales`
- Title actual (78): Prácticas desleales del sindicato: las 8 conductas nuevas y cuánto es la multa
- **Title propuesto (50):** Prácticas desleales sindicales: conductas y multas
- **Description propuesta (148):** La Ley 27.802 sumó el art. 53 bis a la Ley 23.551 con 8 conductas desleales de los sindicatos y habilitó al empleador a querellar. Calculá la multa.
- Enlaces internos a agregar en el cuerpo: `/negociacion-de-buena-fe`
- Ya enlaza (mantener): `/despido-de-delegado-gremial`
- Enlaces contextuales que recibe hoy: 4

#### `/servicios-esenciales-huelga`
- Title actual (71): Servicios esenciales y guardias mínimas en una huelga: la lista vigente
- **Title propuesto (54):** Servicios esenciales en una huelga: lista vigente 2026
- **Description propuesta (152):** La Ley 27.802 cambió la lista del art. 24 de la Ley 25.877: 4 actividades entraron y 9 salieron. Calculá la guardia mínima de tu actividad y los plazos.
- Ya enlaza (mantener): `/practicas-desleales-sindicales`
- Enlaces contextuales que recibe hoy: 3


### Empleadores

#### `/rifl`
- Title actual (68): RIFL: cuánto baja el costo de contratar, y hasta cuándo podés entrar
- **Title propuesto (47):** RIFL: cuánto baja el costo de contratar en 2026
- **Description propuesta (155):** El régimen de incentivo a la formalización de la Ley 27.802 baja las contribuciones patronales a un 5% por 48 meses por cada alta nueva. Calculá el ahorro.
- Enlaces internos a agregar en el cuerpo: `/contratar-persona-con-discapacidad`, `/fondo-de-asistencia-laboral`
- Enlaces contextuales que recibe hoy: 3

#### `/contratar-persona-con-discapacidad`
- Title actual (77): Contratar a una persona con discapacidad: el 50% de contribuciones por 3 años
- **Title propuesto (54):** Contratar personas con discapacidad: beneficio del 50%
- **Description propuesta (153):** El art. 87 de la Ley 24.013 exime del 50% de las contribuciones patronales por 3 años desde el 22/9/2025. Calculá el ahorro y qué contribuciones alcanza.
- Enlaces internos a agregar en el cuerpo: `/rifl`, `/pension-no-contributiva`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.


### Impuestos y ARCA

#### `/monotributo`
- Title actual (58): Calculadora de Monotributo 2026: categoría y cuota mensual
- **Title propuesto (50):** Calculadora de monotributo 2026: categoría y cuota
- **Description propuesta (154):** Calculá tu categoría de monotributo y cuánto pagás por mes en 2026, con los valores oficiales de ARCA y el desglose de impuesto, jubilación y obra social.
- Enlaces internos a agregar en el cuerpo: `/obra-social-monotributo`
- Ya enlaza (mantener): `/monotributo/categorias`, `/monotributo/recategorizacion`, `/planillas/monotributo`
- Enlaces contextuales que recibe hoy: 18
- Notas: Verificar que la tabla tenga la vigencia más reciente de ARCA (dateModified 2026-06-13 y la description dice «vigentes desde febrero»).

#### `/monotributo/categorias`
- Title actual (61): Categorías del Monotributo 2026: tabla completa y actualizada
- **Title propuesto (46):** Categorías del monotributo 2026: tabla de ARCA
- **Description propuesta (145):** Tabla oficial de categorías del monotributo 2026, de la A a la K: topes de facturación, cuota mensual, superficie, energía y alquileres vigentes.
- Enlaces internos a agregar en el cuerpo: `/blog/que-incluye-la-cuota-del-monotributo`
- Ya enlaza (mantener): `/monotributo`
- Enlaces contextuales que recibe hoy: 7
- Notas: Ver nota de /monotributo sobre la vigencia.

#### `/monotributo/recategorizacion`
- Title actual (81): Recategorización del Monotributo febrero 2027: calculadora, fechas y cómo hacerla
- **Title propuesto (45):** Recategorización del monotributo febrero 2027
- **Description propuesta (133):** Hasta el 5 de febrero de 2027: calculá si te toca subir o bajar de categoría, cuánto cambia tu cuota y cómo hacer el trámite en ARCA.
- Enlaces internos a agregar en el cuerpo: `/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo`
- Ya enlaza (mantener): `/planillas/monotributo`
- Enlaces contextuales que recibe hoy: 5
- Notas: Pico de búsqueda en enero y febrero.

#### `/obra-social-monotributo`
- Title actual (74): Obra social del monotributo: desde cuándo te cubre (y qué te pueden negar)
- **Title propuesto (50):** Obra social del monotributo: desde cuándo te cubre
- **Description propuesta (149):** La cobertura llega en tres escalones: ambulatorio desde el alta, internación a los 3 meses y alto costo a los 6 (Decreto 1/2010). Calculá tus fechas.
- Ya enlaza (mantener): `/monotributo`, `/hasta-cuando-tengo-obra-social`
- Enlaces contextuales que recibe hoy: 2

#### `/ganancias`
- Title actual (64): Calculadora de Ganancias 4ta Categoría 2026: retención mes a mes
- **Title propuesto (50):** Calculadora de Ganancias 2026: retención mes a mes
- **Description propuesta (144):** Calculá cuánto te retiene tu empleador de Ganancias 4ª categoría cada mes con el método acumulado de ARCA y la escala del segundo semestre 2026.
- Enlaces internos a agregar en el cuerpo: `/ganancias-jubilados`, `/ganancias-autonomos`, `/informes/ganancias`
- Ya enlaza (mantener): `/deducciones-generales-ganancias`, `/deduccion-alquiler`
- Enlaces contextuales que recibe hoy: 9
- Notas: Hub del cluster Ganancias: autónomos, jubilados y sociedades tienen 1 enlace contextual entrante cada una.

#### `/ganancias-autonomos`
- Title actual (88): Ganancias para autónomos 2026: deducción especial y «nuevos profesionales» (calculadora)
- **Title propuesto (49):** Ganancias para autónomos 2026: deducción especial
- **Description propuesta (137):** Cuánto deduce un autónomo en 2026, el plus para nuevos profesionales y por qué sin aportes al día se pierde entera. Calculá cuánto pagás.
- Enlaces internos a agregar en el cuerpo: `/ganancias`
- Ya enlaza (mantener): `/aportes-jubilatorios-obligatorios`
- Enlaces contextuales que recibe hoy: 1
- Notas: El H1 actual tiene 120 caracteres con dos montos: acortarlo.

#### `/ganancias-jubilados`
- Title actual (97): Ganancias para jubilados 2026: desde cuánto se paga y cómo pesa la deducción de 8 haberes mínimos
- **Title propuesto (51):** Ganancias para jubilados 2026: desde cuánto se paga
- **Description propuesta (144):** Desde qué haber bruto paga Ganancias un jubilado en 2026, cómo pesan la deducción de 8 haberes mínimos y las cargas de familia. Calculá tu caso.
- Ya enlaza (mantener): `/ganancias`, `/jubilacion`, `/descuento-pami`
- Enlaces contextuales que recibe hoy: 1

#### `/ganancias-sociedades`
- Title actual (79): Escala de Ganancias para sociedades 2026: 25%, 30% y 35% (tramos y calculadora)
- **Title propuesto (53):** Ganancias de sociedades 2026: escala del 25, 30 y 35%
- **Description propuesta (152):** Tramos 2026 del impuesto a las ganancias de sociedades, ajustados por IPC, y por qué la escala la elige el año de inicio del ejercicio. Con calculadora.
- Enlaces internos a agregar en el cuerpo: `/rimi-inversiones`
- Ya enlaza (mantener): `/actualizacion-de-quebrantos`
- Enlaces contextuales que recibe hoy: 1

#### `/deducciones-generales-ganancias`
- Title actual (82): Deducciones generales de Ganancias 2026: prepaga, médicos y seguro de vida (topes)
- **Title propuesto (57):** Deducciones de Ganancias 2026: prepaga, médicos y seguros
- **Description propuesta (143):** Topes 2026 de prepaga, honorarios médicos, donaciones y seguro de vida en Ganancias. Calculá cuánto deducís y cuánto te vuelve según tu sueldo.
- Enlaces internos a agregar en el cuerpo: `/derivar-aportes-a-prepaga`
- Ya enlaza (mantener): `/ganancias`, `/deduccion-alquiler`
- Enlaces contextuales que recibe hoy: 4

#### `/deduccion-alquiler`
- Title actual (67): Deducción de alquiler en Ganancias 2026: cuánto te vuelve de verdad
- **Title propuesto (54):** Deducción de alquiler en Ganancias 2026: cuánto vuelve
- **Description propuesta (145):** Se deduce el 40% del alquiler con un tope anual y lo que vuelve depende de tu alícuota. Calculá el ahorro real y el cambio del inciso k) en 2026.
- Ya enlaza (mantener): `/ganancias`, `/inflacion/alquiler`
- Enlaces contextuales que recibe hoy: 6

#### `/multas-arca`
- Title actual (67): Multas de ARCA por deberes formales: cuánto son desde la Ley 27.799
- **Title propuesto (47):** Multas de ARCA 2026: montos desde la Ley 27.799
- **Description propuesta (155):** La multa por no presentar una DDJJ en término pasó de $200 a $220.000 y baja a la mitad si pagás y presentás. Calculá cada infracción con el monto vigente.
- Ya enlaza (mantener): `/prescripcion-deuda-arca`, `/monotributo`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/prescripcion-deuda-arca`
- Title actual (71): ¿Cuándo prescribe una deuda con ARCA? 5, 3 o 10 años tras la Ley 27.799
- **Title propuesto (47):** Prescripción de deudas con ARCA: 5, 3 o 10 años
- **Description propuesta (145):** Desde el 2/1/2026 el plazo baja a 3 años si presentaste en término y la suspensión de 120 días quedó derogada. Calculá cuándo prescribe tu deuda.
- Enlaces internos a agregar en el cuerpo: `/multas-arca`
- Enlaces contextuales que recibe hoy: 2

#### `/impuestos-internos`
- Title actual (72): Impuestos internos eliminados: qué dejó de pagarse el 1 de abril de 2026
- **Title propuesto (58):** Impuestos internos eliminados en 2026: qué dejó de pagarse
- **Description propuesta (149):** La Ley 27.802 eliminó desde el 1/4/2026 los internos a seguros, celulares, autos, embarcaciones y suntuarios. Calculá cuánto del precio era impuesto.
- Enlaces internos a agregar en el cuerpo: `/venta-de-inmuebles`
- Enlaces contextuales que recibe hoy: 3

#### `/venta-de-inmuebles`
- Title actual (52): ¿Se paga impuesto al vender una casa? Desde 2026, no
- **Title propuesto (48):** Impuesto a la venta de inmuebles 2026: ¿se paga?
- **Description propuesta (152):** El cedular del 15% quedó exento para ventas desde el 1/1/2026 (Ley 27.802) y el ITI está derogado. Calculá la ganancia con el costo actualizado por IPC.
- Enlaces internos a agregar en el cuerpo: `/inflacion`
- Enlaces contextuales que recibe hoy: 3

#### `/actualizacion-de-quebrantos`
- Title actual (65): Actualización de quebrantos por IPC: qué cambió con la Ley 27.802
- **Title propuesto (48):** Actualización de quebrantos por IPC (Ley 27.802)
- **Description propuesta (144):** Los quebrantos de ejercicios iniciados desde el 1/1/2025 se actualizan por IPC del INDEC. Calculá tu quebranto actualizado con la serie oficial.
- Enlaces internos a agregar en el cuerpo: `/ganancias-sociedades`, `/inflacion`
- Enlaces contextuales que recibe hoy: 2

#### `/rimi-inversiones`
- Title actual (73): RIMI: montos mínimos, amortización acelerada y los cuatro bienes sin piso
- **Title propuesto (48):** RIMI: montos mínimos y qué inversiones califican
- **Description propuesta (150):** El régimen para medianas inversiones rige desde el 6/3/2026, con pisos de USD 150.000 a USD 9.000.000 según la categoría MiPyME. Calculá si calificás.
- Enlaces internos a agregar en el cuerpo: `/ganancias-sociedades`
- Enlaces contextuales que recibe hoy: 2

#### `/aportes-jubilatorios-obligatorios`
- Title actual (67): ¿Tenés que aportar? El umbral es 100 dividido la cantidad de socios
- **Title propuesto (58):** Aportes jubilatorios obligatorios: quién tiene que aportar
- **Description propuesta (155):** Quién está obligado a aportar, quién puede hacerlo de forma voluntaria y quién queda exceptuado. El umbral del socio es 100 dividido la cantidad de socios.
- Enlaces internos a agregar en el cuerpo: `/ganancias-autonomos`
- Ya enlaza (mantener): `/jubilacion`, `/monotributo`
- Enlaces contextuales que recibe hoy: 2
- Notas: El title actual arranca con una pregunta sin la keyword.


### Jubilaciones y ANSES

#### `/jubilacion`
- Title actual (63): Jubilación octubre 2026: cuánto cobrás con el aumento y el bono
- **Title propuesto (60):** Jubilación {mesCorto}: cuánto cobrás con aumento y bono
- **Description propuesta (154):** Haber mínimo y bono de {mesCorto} según la resolución de ANSES. Poné tu haber real: si cobrás más que la mínima el bono se recorta, y acá ves cuánto.
- Enlaces internos a agregar en el cuerpo: `/82-por-ciento-movil`, `/descuento-pami`, `/ganancias-jubilados`, `/puam`, `/aguinaldo/fechas`
- Enlaces contextuales que recibe hoy: 11
- Notas: Hub de ANSES: veteranos y edad avanzada tienen 1 y 2 enlaces contextuales.

#### `/82-por-ciento-movil`
- Title actual (67): 82% móvil: el suplemento del art. 125 bis en octubre de 2026 es $ 0
- **Title propuesto (55):** 82% móvil en {mesCorto}: cuánto paga el suplemento
- **Description propuesta (139):** La garantía del 82% del salario mínimo sigue vigente, pero hoy el haber mínimo la supera. Calculá tu caso y mirá a quién alcanza de verdad.
- Ya enlaza (mantener): `/jubilacion`, `/salario-minimo`
- Enlaces contextuales que recibe hoy: 3

#### `/puam`
- Title actual (75): PUAM octubre de 2026: cuánto se cobra, quién puede pedirla y la letra chica
- **Title propuesto (59):** PUAM {mesCorto}: cuánto se cobra y quién puede pedirla
- **Description propuesta (148):** La PUAM es el 80% del haber mínimo. El monto de {mesCorto} con bono, quién califica y la letra chica: no se puede trabajar y no genera pensión.
- Enlaces internos a agregar en el cuerpo: `/edad-avanzada`
- Ya enlaza (mantener): `/jubilacion`, `/pension-no-contributiva`
- Enlaces contextuales que recibe hoy: 4

#### `/edad-avanzada`
- Title actual (71): Prestación por edad avanzada octubre de 2026: cuánto se cobra de verdad
- **Title propuesto (58):** Pensión por edad avanzada {mesCorto}: cuánto se cobra
- **Description propuesta (149):** Requisitos a los 70 años con 10 de aportes y cuánto se cobra de verdad: el art. 125 garantiza el haber mínimo, no el 70% de la PBU que repiten todos.
- Ya enlaza (mantener): `/jubilacion`, `/puam`
- Enlaces contextuales que recibe hoy: 2

#### `/pension-no-contributiva`
- Title actual (78): Pensión no contributiva octubre de 2026: cuánto se cobra y quién puede pedirla
- **Title propuesto (59):** Pensión no contributiva {mesCorto}: monto y requisitos
- **Description propuesta (142):** Cuánto pagan en {mesCorto} la pensión por discapacidad, la de vejez y la de madre de 7 hijos, y hasta cuánto podés trabajar sin perderla.
- Ya enlaza (mantener): `/jubilacion`, `/puam`
- Enlaces contextuales que recibe hoy: 4

#### `/pension-veteranos-malvinas`
- Title actual (58): Pensión de Veteranos de Malvinas octubre 2026: $ 1.307.246
- **Title propuesto (55):** Pensión de veteranos de Malvinas {mesCorto}: monto
- **Description propuesta (141):** La pensión honorífica de veteranos de Malvinas equivale a tres haberes mínimos (Decreto 1357/2004) y se cobra además de cualquier jubilación.
- Ya enlaza (mantener): `/jubilacion`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante.

#### `/descuento-pami`
- Title actual (80): Descuento de PAMI en la jubilación: cuánto te sacan del haber en octubre de 2026
- **Title propuesto (60):** Descuento de PAMI {mesCorto}: cuánto te sacan del haber
- **Description propuesta (147):** El aporte de obra social del jubilado es 3% hasta el haber mínimo y 6% sobre el excedente. Calculá tu descuento y por qué irte del PAMI no lo baja.
- Enlaces internos a agregar en el cuerpo: `/ganancias-jubilados`
- Ya enlaza (mantener): `/jubilacion`
- Enlaces contextuales que recibe hoy: 2

#### `/asignaciones-familiares`
- Title actual (80): Asignaciones familiares octubre de 2026: cuánto cobrás por hijo según tu ingreso
- **Title propuesto (56):** Asignaciones familiares {mesCorto}: cuánto por hijo
- **Description propuesta (136):** Montos por hijo de {mesCorto} según el ingreso del grupo familiar. Cargá los sueldos de tu casa y mirá tu tramo, tu zona y el tope.
- Enlaces internos a agregar en el cuerpo: `/blog/tope-de-ingresos-asignaciones-familiares`, `/desempleo`
- Enlaces contextuales que recibe hoy: 7
- Notas: La guía del tope tiene 1 solo enlace contextual entrante: tiene que salir de acá.

#### `/desempleo`
- Title actual (75): Prestación por desempleo octubre de 2026: cuánto cobrás y por cuántos meses
- **Title propuesto (53):** Seguro de desempleo {mesCorto}: monto y duración
- **Description propuesta (139):** La prestación por desempleo es el 75% de tu mejor sueldo neto con piso y techo, y baja desde el quinto mes. Mirá las 12 cuotas una por una.
- Ya enlaza (mantener): `/indemnizacion`, `/asignaciones-familiares`
- Enlaces contextuales que recibe hoy: 8


### Plata y precios

#### `/inflacion`
- Title actual (71): Actualizar un monto por inflación: cuánto vale hoy tu plata (IPC INDEC)
- **Title propuesto (53):** Calculadora de inflación: actualizar un monto por IPC
- **Description propuesta (141):** Convertí cualquier monto del pasado a pesos de hoy con el IPC oficial del INDEC y mirá si tu sueldo le ganó a la inflación. Serie desde 2017.
- Ya enlaza (mantener): `/inflacion/alquiler`, `/inflacion/2026`, `/informes/inflacion`, `/plazo-fijo`
- Enlaces contextuales que recibe hoy: 78
- Notas: Las páginas /inflacion/2017 a /inflacion/2019 no estaban en el sitemap (corregido). Listar todos los años con enlace desde acá.

#### `/inflacion/alquiler`
- Title actual (62): Ajuste de alquiler por IPC: calculá cuánto aumenta tu alquiler
- **Title propuesto (44):** Ajuste de alquiler por IPC 2026: calculadora
- **Description propuesta (135):** Calculá el aumento de tu alquiler con el IPC del INDEC: cronograma de ajustes cada 3, 4, 6 o 12 meses y estimación del próximo aumento.
- Enlaces internos a agregar en el cuerpo: `/planillas/alquileres`, `/deduccion-alquiler`
- Enlaces contextuales que recibe hoy: 15

#### `/plazo-fijo`
- Title actual (73): Calculadora de Plazo Fijo 2026: cuánto ganás con tu plata a 30 días o más
- **Title propuesto (51):** Calculadora de plazo fijo 2026 con la tasa del BCRA
- **Description propuesta (140):** Simulá tu plazo fijo con la tasa actualizada del BCRA: interés, total al vencimiento, TEA y renovaciones, y mirá si le ganás a la inflación.
- Enlaces internos a agregar en el cuerpo: `/planillas/plazo-fijo`, `/blog/que-hacer-con-el-aguinaldo-2026`
- Ya enlaza (mantener): `/inflacion`
- Enlaces contextuales que recibe hoy: 13

#### `/canasta-basica`
- Title actual (72): Canasta básica agosto 2026: cuánto necesita TU familia para no ser pobre
- **Title propuesto (56):** Canasta básica {mesCorto}: cuánto necesita tu hogar
- **Description propuesta (153):** La línea de pobreza e indigencia de tu hogar con el dato del INDEC de {mesCorto}. Poné las edades reales y mirá tu umbral, no el de la familia tipo.
- Enlaces internos a agregar en el cuerpo: `/salario-minimo`, `/asignaciones-familiares`
- Ya enlaza (mantener): `/cuota-alimentaria`
- Enlaces contextuales que recibe hoy: 37

#### `/cuota-alimentaria`
- Title actual (80): Cuota alimentaria 2026: cuánto es por hijo según la canasta de crianza del INDEC
- **Title propuesto (50):** Cuota alimentaria 2026: cuánto es por hijo (INDEC)
- **Description propuesta (154):** Calculá la cuota alimentaria de referencia con el último dato del INDEC: cuánto cuesta criar a cada hijo por mes y cómo se reparte entre los progenitores.
- Enlaces internos a agregar en el cuerpo: `/informes/cuota-alimentaria`, `/blog/cuanto-cuesta-criar-un-hijo-argentina`, `/canasta-basica`
- Enlaces contextuales que recibe hoy: 56


### Productos (planillas e informes)

#### `/planillas`
- Title actual (57): Planilla de sueldos de Empleados de Comercio 2026 (Excel)
- **Title propuesto (45):** Planilla de sueldos de Comercio 2026 en Excel
- **Description propuesta (141):** Planilla de Excel y Google Sheets para liquidar el CCT 130/75 con la escala de FAECYS: antigüedad, presentismo y jornada parcial. Pago único.
- Ya enlaza (mantener): `/planillas/uocra`, `/planillas/camioneros`, `/planillas/casas-particulares`
- Enlaces contextuales que recibe hoy: 27
- Notas: /planillas es a la vez catálogo y producto de Comercio. A mediano plazo: producto en /planillas/comercio (301 desde la URL vieja) y /planillas como catálogo con CollectionPage. Las descriptions de productos sin precio: el precio rota y el snippet queda viejo.

#### `/planillas/uocra`
- Title actual (51): Planilla de sueldos UOCRA 2026 en Excel (CCT 76/75)
- **Title propuesto (51):** Planilla de sueldos UOCRA 2026 en Excel (CCT 76/75)
- **Description propuesta (150):** Excel y Google Sheets para liquidar la construcción: jornales de UOCRA por categoría y zona, asistencia perfecta, no remunerativos y neto. Pago único.
- Enlaces internos a agregar en el cuerpo: `/sueldo-neto/construccion`
- Ya enlaza (mantener): `/convenios/uocra`
- Enlaces contextuales que recibe hoy: 19
- Notas: Sin dateModified en el JSON-LD (vale para todas las planillas e informes).

#### `/planillas/camioneros`
- Title actual (69): Planilla de sueldos Camioneros 2026 en Excel (CCT 40/89) con viáticos
- **Title propuesto (44):** Planilla de sueldos Camioneros 2026 en Excel
- **Description propuesta (148):** Excel y Google Sheets para liquidar el CCT 40/89 con básicos de FADEEAC, antigüedad, kilómetros, comida, pernoctada, recibo y aguinaldo. Pago único.
- Ya enlaza (mantener): `/convenios/camioneros`
- Enlaces contextuales que recibe hoy: 17

#### `/planillas/casas-particulares`
- Title actual (54): Planilla de sueldo de empleada doméstica 2026 en Excel
- **Title propuesto (53):** Planilla de sueldo de empleada doméstica 2026 (Excel)
- **Description propuesta (150):** Excel y Google Sheets para liquidar casas particulares: escala de la CNTCP, horas extras, zona, aguinaldo, lo que se paga a ARCA y recibo. Pago único.
- Ya enlaza (mantener): `/empleada-domestica`, `/aportes-empleada-domestica`
- Enlaces contextuales que recibe hoy: 14

#### `/planillas/monotributo`
- Title actual (69): Planilla de Monotributo 2026 en Excel: facturación y recategorización
- **Title propuesto (50):** Planilla de monotributo 2026 en Excel: facturación
- **Description propuesta (152):** Cargá lo que facturás mes a mes y la planilla te dice tu categoría, cuánto margen te queda y la cuota que vas a pagar, con la tabla de ARCA. Pago único.
- Ya enlaza (mantener): `/monotributo`, `/monotributo/recategorizacion`
- Enlaces contextuales que recibe hoy: 13

#### `/planillas/alquileres`
- Title actual (68): Planilla de alquileres 2026 en Excel: ajuste por IPC, recibo y aviso
- **Title propuesto (52):** Planilla de alquileres 2026 en Excel: ajuste por IPC
- **Description propuesta (143):** Excel y Google Sheets para propietarios: hasta 6 contratos con el IPC del INDEC cargado, cuándo y cuánto aumentar, recibo y aviso al inquilino.
- Ya enlaza (mantener): `/inflacion/alquiler`
- Enlaces contextuales que recibe hoy: 9

#### `/planillas/mi-sueldo`
- Title actual (75): Planilla Mi Sueldo 2026: controlá tu recibo y tu sueldo contra la inflación
- **Title propuesto (52):** Planilla Mi Sueldo 2026: controlá tu recibo en Excel
- **Description propuesta (149):** Excel y Google Sheets para controlar los aportes de cada recibo, medir tu poder de compra con el IPC del INDEC y pedir aumento con datos. Pago único.
- Ya enlaza (mantener): `/sueldo-neto`, `/inflacion`
- Enlaces contextuales que recibe hoy: 9

#### `/planillas/plazo-fijo`
- Title actual (78): Planilla de plazos fijos 2026 en Excel: vencimientos y tasa real contra el IPC
- **Title propuesto (52):** Planilla de plazos fijos 2026 en Excel vs. inflación
- **Description propuesta (144):** Seguí tus plazos fijos de todos los bancos: vencimientos, interés, TEA y tasa real contra el IPC del INDEC. Simulá renovar y compará con un UVA.
- Ya enlaza (mantener): `/plazo-fijo`
- Enlaces contextuales que recibe hoy: 9

#### `/planillas/vacaciones`
- Title actual (74): Planilla de vacaciones 2026 en Excel: días, aviso, pago y nota para firmar
- **Title propuesto (53):** Planilla de vacaciones 2026 en Excel para empleadores
- **Description propuesta (152):** Organizá las vacaciones de tu equipo: días por antigüedad, inicio válido, aviso de 30 días, pago a sueldo dividido 25 y la nota para firmar. Pago único.
- Ya enlaza (mantener): `/vacaciones`
- Enlaces contextuales que recibe hoy: 10

#### `/informes/cuota-alimentaria`
- Title actual (46): Informe de cuota alimentaria para la mediación
- **Title propuesto (46):** Informe de cuota alimentaria para la mediación
- **Description propuesta (153):** Informe en PDF para la mediación: cuánto cuesta criar a tus hijos según el INDEC, cómo se reparte entre los progenitores y cómo se actualiza. Pago único.
- Enlaces internos a agregar en el cuerpo: `/cuota-alimentaria`
- Enlaces contextuales que recibe hoy: 10

#### `/informes/indemnizacion`
- Title actual (57): Informe de liquidación final por despido, rubro por rubro
- **Title propuesto (40):** Informe de liquidación final por despido
- **Description propuesta (144):** Cada rubro de tu liquidación con su artículo y la cuenta a la vista, comparado con lo que te ofrecen, y qué revisar antes de firmar. Pago único.
- Enlaces internos a agregar en el cuerpo: `/indemnizacion`
- Enlaces contextuales que recibe hoy: 10

#### `/informes/ganancias`
- Title actual (58): Informe de Ganancias 2026: cuánto pagás y cómo pagar menos
- **Title propuesto (54):** Informe de Ganancias 2026: cuánto pagás y cómo bajarlo
- **Description propuesta (143):** Informe en PDF con tu retención de Ganancias mes a mes, tu tramo, cuánto te devuelve cada deducción y cómo cargarlas en el SiRADIG. Pago único.
- Enlaces internos a agregar en el cuerpo: `/ganancias`
- Enlaces contextuales que recibe hoy: 10

#### `/informes/inflacion`
- Title actual (58): Informe de actualización por inflación, con la carta lista
- **Title propuesto (48):** Informe de actualización por inflación con carta
- **Description propuesta (146):** Tu monto actualizado mes a mes con el IPC del INDEC, la cuenta explicada y una carta lista para pedir aumento o actualizar honorarios. Pago único.
- Enlaces internos a agregar en el cuerpo: `/inflacion`
- Enlaces contextuales que recibe hoy: 11

#### `/informes/credito-laboral`
- Title actual (58): Informe de actualización de crédito laboral (art. 276 LCT)
- **Title propuesto (53):** Informe de crédito laboral actualizado (art. 276 LCT)
- **Description propuesta (154):** Tu liquidación laboral actualizada con IPC más 3% anual, rubro por rubro, con tabla de índices y fuentes oficiales. En A4 para imprimir o PDF. Pago único.
- Enlaces internos a agregar en el cuerpo: `/actualizacion-creditos-laborales`
- Enlaces contextuales que recibe hoy: 10


### Guías del blog

#### `/blog/estatutos-laborales-derogados-2027`
- Title actual (82): Qué estatutos laborales se derogan el 1 de enero de 2027 (Ley 27.802, Título XXVI)
- **Title propuesto (55):** Estatutos laborales que se derogan en 2027 (Ley 27.802)
- **Description propuesta (137):** Periodistas, viajantes, teletrabajo, peluqueros y choferes: los regímenes que caen el 1/1/2027 y los que ya no rigen desde marzo de 2026.
- Enlaces internos a agregar en el cuerpo: `/convenio-vencido`
- Ya enlaza (mantener): `/indemnizacion-periodista`, `/indemnizacion-por-clientela`
- Enlaces contextuales que recibe hoy: 1
- Notas: PRIORIDAD: 1 solo enlace contextual entrante y la fecha de la derogación se acerca. Tiene que recibir enlaces de las dos calculadoras de estatutos.

#### `/blog/tope-de-ingresos-asignaciones-familiares`
- Title actual (105): Tope de las asignaciones familiares octubre de 2026: por qué un solo sueldo deja afuera a toda la familia
- **Title propuesto (55):** El tope de las asignaciones familiares: los dos límites
- **Description propuesta (143):** Hay un tope del grupo familiar y uno individual que deja afuera a toda la familia si una persona lo supera. Los montos del mes y los escalones.
- Ya enlaza (mantener): `/asignaciones-familiares`
- Enlaces contextuales que recibe hoy: 1
- Notas: Title actual de 116 caracteres. 1 solo enlace contextual entrante.

#### `/blog/aumento-comercio-agosto-2026`
- Title actual (72): Aumento de comercio agosto 2026: escala, bono de $50.000 y cuánto cobrás
- **Title propuesto (57):** Aumento de Comercio agosto 2026: escala y bono de $50.000
- **Description propuesta (145):** El acuerdo del 22/7/2026 da 5,7% en tres tramos que no se acumulan y un bono de $50.000 en dos cuotas. La escala oficial de agosto por categoría.
- Ya enlaza (mantener): `/convenios/comercio`, `/convenios/comercio/agosto-2026`
- Enlaces contextuales que recibe hoy: 1
- Notas: 1 solo enlace contextual entrante. Es noticia de un mes: que enlace fuerte a la escala del mes vigente para pasarle autoridad.

#### `/blog/cuanto-cuesta-criar-un-hijo-argentina`
- Title actual (72): Cuánto cuesta criar un hijo en Argentina 2026: el dato oficial del INDEC
- **Title propuesto (53):** Cuánto cuesta criar un hijo en Argentina 2026 (INDEC)
- **Description propuesta (135):** La canasta de crianza del INDEC tramo por tramo: qué parte es gasto y qué parte es tiempo de cuidado, con la serie completa desde 2020.
- Enlaces internos a agregar en el cuerpo: `/informes/cuota-alimentaria`
- Ya enlaza (mantener): `/cuota-alimentaria`
- Enlaces contextuales que recibe hoy: 21

#### `/blog/cuanto-se-cobra-de-vacaciones-plus-vacacional-2026`
- Title actual (67): Cuánto se cobra de vacaciones en 2026: el plus vacacional explicado
- **Title propuesto (54):** Cuánto se cobra de vacaciones 2026: el plus vacacional
- **Description propuesta (149):** Cada día de vacaciones se paga como sueldo dividido 25 y no 30. Por qué pasa, cuánto es el plus según tu antigüedad y la calculadora que lo resuelve.
- Enlaces internos a agregar en el cuerpo: `/planillas/vacaciones`
- Ya enlaza (mantener): `/vacaciones`
- Enlaces contextuales que recibe hoy: 2
- Notas: Refrescar para diciembre y enero.

#### `/blog/como-se-calcula-la-indemnizacion-por-despido-2026`
- Title actual (74): Cómo se calcula la indemnización por despido en 2026 (ejemplo paso a paso)
- **Title propuesto (49):** Cómo se calcula la indemnización por despido 2026
- **Description propuesta (144):** El art. 245 de la LCT con la reforma de la Ley 27.802: antigüedad, preaviso, integración y liquidación final, con un ejemplo real peso por peso.
- Enlaces internos a agregar en el cuerpo: `/informes/indemnizacion`, `/periodo-de-prueba`
- Ya enlaza (mantener): `/indemnizacion`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/aguinaldo-monotributista`
- Title actual (59): ¿El monotributista cobra aguinaldo? Qué dice la ley en 2026
- **Title propuesto (51):** ¿El monotributista cobra aguinaldo? Qué dice la ley
- **Description propuesta (147):** No: el aguinaldo es solo para trabajadores en relación de dependencia. La excepción del pluriempleo y cómo armarte tu propio aguinaldo si facturás.
- Enlaces internos a agregar en el cuerpo: `/monotributo`
- Ya enlaza (mantener): `/aguinaldo`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/aguinaldo-proporcional-como-se-calcula`
- Title actual (78): Aguinaldo proporcional 2026: cómo se calcula si no trabajaste todo el semestre
- **Title propuesto (53):** Aguinaldo proporcional 2026: cómo se calcula por días
- **Description propuesta (150):** Si entraste o saliste a mitad de semestre, el aguinaldo es proporcional a los días trabajados. La fórmula de la LCT con ejemplos reales y calculadora.
- Enlaces internos a agregar en el cuerpo: `/renuncia`
- Ya enlaza (mantener): `/aguinaldo`
- Enlaces contextuales que recibe hoy: 4
- Notas: «aguinaldo proporcional 3 meses» y «calcular aguinaldo 3 meses» están en el autocompletado: sumar un H2 con la tabla por meses trabajados.

#### `/blog/que-incluye-la-cuota-del-monotributo`
- Title actual (73): Qué incluye la cuota del monotributo 2026 (con el desglose por categoría)
- **Title propuesto (56):** Qué incluye la cuota del monotributo 2026, por categoría
- **Description propuesta (145):** La cuota suma impuesto integrado, aporte jubilatorio y obra social. Cuánto va a cada parte en 2026, categoría por categoría, con valores de ARCA.
- Enlaces internos a agregar en el cuerpo: `/obra-social-monotributo`
- Ya enlaza (mantener): `/monotributo/categorias`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo`
- Title actual (68): Qué pasa si me paso del límite de facturación del monotributo (2026)
- **Title propuesto (51):** Me pasé del límite del monotributo: qué pasa (2026)
- **Description propuesta (147):** Si superás el tope de tu categoría podés recategorizarte o quedar excluido y pasar al Régimen General. Cómo funciona y los topes oficiales de ARCA.
- Enlaces internos a agregar en el cuerpo: `/planillas/monotributo`
- Ya enlaza (mantener): `/monotributo/recategorizacion`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/como-calcular-aguinaldo-empleado-de-comercio`
- Title actual (72): Cómo calcular el aguinaldo de un empleado de comercio 2026 (paso a paso)
- **Title propuesto (55):** Aguinaldo de empleado de Comercio 2026: cómo calcularlo
- **Description propuesta (155):** El SAC de Comercio es el 50% del mejor sueldo del semestre e incluye los no remunerativos. Fórmula, ejemplo real y los 2 errores que te hacen cobrar menos.
- Ya enlaza (mantener): `/aguinaldo`, `/convenios/comercio`
- Enlaces contextuales que recibe hoy: 12

#### `/blog/nuevo-recibo-de-sueldo-2026`
- Title actual (72): Nuevo recibo de sueldo 2026: qué cambió y cómo leerlo (Decreto 407/2026)
- **Title propuesto (58):** Nuevo recibo de sueldo 2026: qué cambió (Decreto 407/2026)
- **Description propuesta (153):** Desde junio de 2026 el recibo tiene 4 secciones y muestra el costo laboral del empleador. Qué cambió, qué no cambia y cómo leerlo, con la fuente oficial.
- Enlaces internos a agregar en el cuerpo: `/conservacion-de-recibos`, `/planillas/mi-sueldo`
- Enlaces contextuales que recibe hoy: 4

#### `/blog/modelo-recibo-de-sueldo-empleado-de-comercio`
- Title actual (71): Modelo de recibo de sueldo de Empleado de Comercio 2026 (nuevo formato)
- **Title propuesto (43):** Modelo de recibo de sueldo de Comercio 2026
- **Description propuesta (140):** El recibo del CCT 130/75 con el formato del Decreto 407/2026: las 4 secciones obligatorias, el costo laboral y un modelo con números reales.
- Enlaces internos a agregar en el cuerpo: `/blog/nuevo-recibo-de-sueldo-2026`
- Ya enlaza (mantener): `/planillas`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/como-liquidar-sueldo-empleado-de-comercio`
- Title actual (69): Cómo liquidar el sueldo de un empleado de comercio 2026 (paso a paso)
- **Title propuesto (53):** Cómo liquidar un sueldo de Comercio 2026, paso a paso
- **Description propuesta (152):** Básico por categoría, no remunerativos, antigüedad, presentismo, jornada parcial y descuentos del CCT 130/75, con un ejemplo real y la escala de FAECYS.
- Enlaces internos a agregar en el cuerpo: `/sueldo-neto/comercio`
- Ya enlaza (mantener): `/planillas`, `/convenios/comercio`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/aguinaldo-paga-ganancias`
- Title actual (52): ¿El aguinaldo paga impuesto a las Ganancias en 2026?
- **Title propuesto (37):** ¿El aguinaldo paga Ganancias en 2026?
- **Description propuesta (140):** Solo si tu sueldo es alto, y no se retiene todo junto: el SAC se prorratea mes a mes. Desde qué sueldo te alcanza y cómo verlo en tu recibo.
- Enlaces internos a agregar en el cuerpo: `/ganancias`, `/informes/ganancias`
- Ya enlaza (mantener): `/aguinaldo/neto`
- Enlaces contextuales que recibe hoy: 3

#### `/blog/que-hacer-con-el-aguinaldo-2026`
- Title actual (71): Qué hacer con el aguinaldo 2026: las opciones, con la cuenta a la vista
- **Title propuesto (53):** Qué hacer con el aguinaldo 2026: opciones con números
- **Description propuesta (140):** Pagar deudas caras, plazo fijo tradicional o UVA, dólares o adelantar compras: qué conviene hoy con la tasa del BCRA y el IPC sobre la mesa.
- Enlaces internos a agregar en el cuerpo: `/planillas/plazo-fijo`
- Ya enlaza (mantener): `/plazo-fijo`, `/inflacion`
- Enlaces contextuales que recibe hoy: 2
- Notas: Refrescar para diciembre: hoy cita el IPC de junio.


---

## 8. Enlazado interno: clusters y hubs

Medición: enlaces `<a href="/...">` dentro de `<main>` de cada página construida (no cuenta header ni footer, que enlazan casi todo desde el menú). El menú reparte rastreo, pero no relevancia: lo que le dice a Google qué página manda en un tema es el enlace contextual con ancla descriptiva.

**Páginas con 1 solo enlace contextual entrante** (17): `/blog/aumento-comercio-agosto-2026`, `/blog/estatutos-laborales-derogados-2027`, `/blog/tope-de-ingresos-asignaciones-familiares`, `/caducidad-de-instancia-laboral`, `/conservacion-de-recibos`, `/contratar-persona-con-discapacidad`, `/convenio-vencido`, `/empleador-sin-art`, `/ganancias-autonomos`, `/ganancias-jubilados`, `/ganancias-sociedades`, `/honorarios-periciales`, `/multas-arca`, `/pension-veteranos-malvinas`, `/pluriempleo-art`, `/rechazo-art`, `/transferencia-del-establecimiento`.

Propuesta de clusters, cada uno con su página pilar. La regla: el pilar enlaza a todas sus hijas con un bloque «Si tu caso es...», cada hija enlaza al pilar y a dos hermanas, y nada enlaza fuera del cluster salvo cuando la relación es directa.

| Cluster | Pilar | Hijas |
|---|---|---|
| Despido y fin del trabajo | `/indemnizacion` | `/renuncia`, `/periodo-de-prueba`, `/despido-plazo-fijo`, `/reingreso`, `/certificado-de-trabajo`, `/reserva-del-empleo`, `/transferencia-del-establecimiento`, `/ius-variandi`, `/indemnizacion-por-fallecimiento`, `/hasta-cuando-tengo-obra-social`, `/desempleo`, `/despido-trabajador-rural`, `/informes/indemnizacion`, `/blog/como-se-calcula-la-indemnizacion-por-despido-2026` |
| Estatutos que se derogan | `/blog/estatutos-laborales-derogados-2027` | `/indemnizacion-periodista`, `/indemnizacion-por-clientela` |
| ART | `/indemnizacion-art` | `/comision-medica`, `/rechazo-art`, `/empleador-sin-art`, `/pluriempleo-art`, `/derechohabientes-art`, `/art-empleada-domestica` |
| Juicio laboral | `/actualizacion-creditos-laborales` | `/caducidad-de-instancia-laboral`, `/temeridad-y-malicia`, `/honorarios-periciales`, `/informes/credito-laboral` |
| Sindical | `/convenio-vencido` | `/negociacion-de-buena-fe`, `/practicas-desleales-sindicales`, `/servicios-esenciales-huelga`, `/despido-de-delegado-gremial` |
| Ganancias | `/ganancias` | `/ganancias-autonomos`, `/ganancias-jubilados`, `/ganancias-sociedades`, `/deducciones-generales-ganancias`, `/deduccion-alquiler`, `/deduccion-empleada-domestica`, `/informes/ganancias`, `/blog/aguinaldo-paga-ganancias` |
| ARCA y otros impuestos | `/multas-arca` | `/prescripcion-deuda-arca`, `/impuestos-internos`, `/venta-de-inmuebles`, `/actualizacion-de-quebrantos`, `/rimi-inversiones` |
| Costo de contratar | `/rifl` | `/contratar-persona-con-discapacidad`, `/fondo-de-asistencia-laboral`, `/libro-de-sueldos`, `/conservacion-de-recibos` |
| ANSES | `/jubilacion` | `/82-por-ciento-movil`, `/puam`, `/edad-avanzada`, `/pension-no-contributiva`, `/pension-veteranos-malvinas`, `/descuento-pami`, `/ganancias-jubilados`, `/aportes-jubilatorios-obligatorios` |
| Familia | `/asignaciones-familiares` | `/blog/tope-de-ingresos-asignaciones-familiares`, `/cuota-alimentaria`, `/canasta-basica`, `/licencia-por-maternidad` |
| Casas particulares | `/empleada-domestica` | `/aportes-empleada-domestica`, `/art-empleada-domestica`, `/despido-empleada-domestica`, `/deduccion-empleada-domestica`, `/planillas/casas-particulares` |
| Sueldo | `/sueldo-neto` | `/sueldo-neto/comercio`, `/sueldo-neto/construccion`, `/sueldo-neto/camioneros`, `/aguinaldo`, `/vacaciones`, `/horas-extras`, `/tiempo-parcial`, `/descuentos-del-sueldo`, `/propinas`, `/salario-minimo` |
| Monotributo | `/monotributo` | `/monotributo/categorias`, `/monotributo/recategorizacion`, `/obra-social-monotributo`, `/repartidores-de-apps`, `/planillas/monotributo`, las dos guías de monotributo |

**Hubs por tema (estructura, a mediano plazo).** Hoy las URLs son planas (`/rechazo-art`, no `/art/rechazo`) y no existe una página por tema: el menú agrupa, pero ese grupo no tiene URL. Una página índice por cada grupo de `src/data/navegacion.ts` (diez temas) con dos párrafos propios, la lista comentada de calculadoras y las guías del tema le daría a cada cluster un pilar indexable y migas de tres niveles. No hace falta mover URLs: las migas de `src/lib/seo.ts` toman cualquier tramo intermedio que exista como página. Si se crean, el nombre del tramo se agrega en `NOMBRE_DE_TRAMO` de ese archivo.

---

## 9. Páginas nuevas que valen la pena

**Cómo se estimó.** No hay herramienta de volumen conectada (Ahrefs y Semrush sin autorizar en esta sesión), así que **ningún número de volumen de esta tabla está medido**. Lo que sí está verificado es la demanda: cada keyword se consultó en el autocompletado de Google Argentina (`suggestqueries.google.com`, `gl=ar`, 6/10/2026) y figura la sugerencia textual que apareció. La banda de volumen es una estimación cualitativa por tipo de query (cabeza genérica, convenio con variante mensual, long tail) y hay que confirmarla con Keyword Planner o Search Console antes de priorizar.

| # | Página propuesta | Keyword principal | Intención | Demanda verificada (autocompletado AR, 6/10/2026) | Volumen (estimación) | Notas |
|---|---|---|---|---|---|---|
| 1 | `/liquidacion-final` | calculadora liquidación final | Transaccional (calcular) | «calculadora liquidacion final por despido», «calculadora liquidación final por renuncia», «liquidacion final empleada domestica», «liquidacion final por despido en periodo de prueba» | Alta (estimación) | Riesgo de canibalizar `/indemnizacion` y `/renuncia`. Alternativa sin página nueva: que `/indemnizacion` y `/renuncia` usen «liquidación final» en title y H2 (ya propuesto en la sección 7). Si se crea, que sea un selector por causa (despido, renuncia, período de prueba, doméstica) que lleve a cada calculadora. El competidor que aparece en el autocompletado es Ignacio Online |
| 2 | `/convenios/bancarios` (+ meses) | sueldo bancario 2026 | Informacional con dato | «sueldo bancario 2026», «sueldo bancario julio 2026», «sueldo bancario agosto 2026», «sueldo bancario inicial» | Alta, recurrente cada mes (estimación) | Mismo patrón que Comercio: hub + archivo mensual + sueldo neto. Requiere la escala oficial de La Bancaria verificada |
| 3 | `/convenios/sanidad` (+ meses) | escala salarial sanidad 2026 | Informacional con dato | «escala salarial sanidad 108 75 septiembre 2026», «escala salarial sanidad 122/75» | Alta (estimación) | Dos convenios (108/75 clínicas y 122/75 hospitales): una página por CCT o una con selector |
| 4 | `/convenios/uom` (+ meses) | sueldo UOM 2026 | Informacional con dato | «sueldo uom 2026», «sueldo uom rama 17», «sueldo uom operario calificado» | Alta (estimación) | La UOM tiene ramas: empezar por la rama 17 que aparece sugerida |
| 5 | `/convenios/gastronomicos` (+ meses) | sueldo gastronómicos 2026 | Informacional con dato | «sueldo gastronomicos 2026», «sueldo gastronomicos 2026 por hora» | Media-alta (estimación) | CCT 389/04 (UTHGRA). Cruza con `/propinas` |
| 6 | `/convenios/encargados-de-edificio` (+ meses) | sueldo encargado de edificio 2026 | Informacional con dato | «sueldo encargado de edificio 2026» y variantes por cada mes de 2026 | Media-alta (estimación) | Público doble: el encargado y el consorcio que liquida. Candidata a planilla paga |
| 7 | `/convenios/seguridad-privada` (+ meses) | sueldo seguridad privada 2026 | Informacional con dato | «sueldo seguridad privada 2026», variantes julio y agosto 2026 | Media (estimación) | |
| 8 | `/iva` | calcular IVA | Transaccional (calcular) | «calcular iva argentina», «calcular iva 21», «calcular iva 10.5», «calcular iva de un precio» | Alta, todo el año (estimación) | Coincide exacto con el dominio («calcular» + tema). Agregar y quitar IVA al 21%, 10,5% y 27%. Riesgo de datos bajo (alícuotas de la Ley de IVA) |
| 9 | `/porcentaje` | calcular porcentaje | Transaccional (calcular) | «calcular porcentaje de aumento», «calcular porcentaje de descuento», «calcular porcentaje entre dos numeros» | Alta, todo el año (estimación) | Genérica pero con el nombre del dominio. El ángulo propio: «porcentaje de aumento» enlazado a inflación y paritarias |
| 10 | `/dias-habiles` | calcular días hábiles | Transaccional (calcular) | «calcular dias habiles judiciales», «calcular dias habiles administrativos», «calcular dias habiles en argentina» | Media-alta (estimación) | El sitio ya calcula plazos hábiles con feriados en una docena de páginas (`src/lib/feriados.ts`): es la herramienta transversal que les falta y un imán de enlaces de abogados |
| 11 | `/intereses` | calculadora de intereses (tasa activa BNA) | Transaccional | «calculadora de intereses tasa activa banco nacion», «calculadora de intereses judiciales», «calculadora de intereses resarcitorios», «calculadora de intereses arca» | Media (estimación) | Necesita una serie oficial de tasa activa: verificar fuente (BNA o BCRA) antes de construir. Cruza con `/actualizacion-creditos-laborales` |
| 12 | `/bienes-personales` | bienes personales 2026 | Informacional y transaccional | «bienes personales 2026 minimo no imponible», «bienes personales 2026 alicuotas», «bienes personales 2026 vencimiento» | Media, con pico en el vencimiento (estimación) | Completa el cluster de impuestos de personas humanas |
| 13 | `/monotributo/categoria-a` a `/categoria-k` | monotributo categoría A (B, C...) | Informacional | «monotributo categoria a cuanto puede facturar por mes», «monotributo categoria b», «monotributo categoria c» | Media por categoría (estimación) | Programática ya prevista en `PLAN_CRECIMIENTO.md`. Cada una necesita contenido propio (facturación mensual equivalente, para quién sirve, salto a la siguiente) o es contenido fino |
| 14 | `/cuotas-o-contado` | conviene cuotas o contado | Transaccional | «calcular si conviene cuotas o contado» | Media (estimación) | Usa la tasa de plazo fijo y el IPC que el sitio ya tiene |
| 15 | `/blog/siradig-formulario-572` | SiRADIG formulario 572 | Informacional (cómo hacer) | «siradig trabajador formulario 572 completar», «siradig 2026», «siradig que es» | Media, con pico en marzo (estimación) | Guía que alimenta `/ganancias` y el informe pago |
| 16 | `/credito-hipotecario-uva` | simulador crédito hipotecario UVA | Transaccional | «simulador credito hipotecario uva banco nacion» y variantes por banco | Alta (estimación) | Compite con los simuladores de cada banco. La UVA es serie oficial del BCRA, pero las tasas por banco rotan y no son de fuente oficial: riesgo de dato viejo |

**Qué no crear**: «aguinaldo por 3 meses trabajados» aparece fuerte en el autocompletado («aguinaldo proporcional 3 meses», «calcular aguinaldo 3 meses»), pero ya la cubre `/blog/aguinaldo-proporcional-como-se-calcula`. Va como H2 con tabla por meses en esa guía, no como página nueva.

Antes de construir cualquiera: `npx tsx scripts/mapa-contenido.ts <tema>` para descartar canibalización, y la fuente oficial verificada (regla del repo).

---

## 10. Lo que necesita a Manuel

1. **Search Console**: enviar el sitemap de nuevo después del deploy (lastmod cambió en 112 URLs) y mirar en «Mejoras» que aparezcan las rutas de navegación (BreadcrumbList). Revisar «Indexada aunque bloqueada por robots.txt» por las rutas privadas.
2. **Validar en vivo** con la prueba de resultados enriquecidos una página de cada tipo: `/aguinaldo` (Article + migas), `/sueldo-neto/comercio` (migas de tres niveles), `/` (WebSite y Organization).
3. **Bing Webmaster Tools**: reenviar el sitemap (ChatGPT busca sobre el índice de Bing) y correr `scripts/indexnow_ping.ts` después del deploy.
4. **Volumen real** de la sección 9: Keyword Planner o Search Console. Este documento solo verificó que la demanda existe.
5. **Presencia fuera del sitio**: los motores de IA citan más a terceros que al sitio propio. Un perfil de CalculAR en directorios de herramientas y respuestas con datos (no con links sueltos) en foros donde se pregunta por aguinaldo o liquidación final suman más citas que cualquier cambio on-page.
