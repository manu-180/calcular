# ADR 0001: calcular en toda Latinoamérica (calcular.ar + calcularya.com)

| Campo | Valor |
|---|---|
| Estado | Propuesto |
| Fecha | 2026-10-07 |
| Decide | Manuel |
| Plan ejecutable | [0001-plan-implementacion.md](0001-plan-implementacion.md) |
| Insumos | `docs/research/paises/*.md` (bo, cl, co, cr, do, ec, gt, hn, mx, pa, pe, py, sv, uy, ve), `docs/SPEC-cuentas-y-panel.md`, `docs/GUIA-REDACCION.md` |

## 1. Contexto

calcular.ar es hoy un sitio estático de Next 16.3.7 con 150 `page.tsx`, 91 módulos de datos en
`src/data`, 98 suites `scripts/check_*.ts` descubiertas por `check-all.ts`, y un motor de datos vivos
(`.github/workflows/datos-vivos.yml`) que tres veces por día trae datos oficiales, los valida y
**commitea a `main`, que es el deploy**. El `proxy.ts` corre a propósito solo en rutas de cuenta: el
visitante anónimo no paga ninguna función. El cobro es MercadoPago Argentina (`src/lib/mp.ts`), la
entrega verifica el pago contra MP (`src/lib/entrega.ts`) y las cuentas viven en Supabase con
cookies `httpOnly` del dominio calcular.ar.

Lo que hay que agregar: N países (hoy 15 con research, 16 o más a futuro), después otros idiomas
(portugués para Brasil primero), con la misma promesa que Argentina: dato oficial con fuente y fecha,
actualización automática, sello visible y novedades por país.

### Decisiones ya tomadas (no se reabren acá)

1. calcular.ar sirve Argentina en la raíz y **ninguna URL actual cambia**.
2. El resto va en **calcularya.com** con subcarpeta por país (`/uy/aguinaldo`, `/pe/gratificacion`).
   El dominio no está comprado (consulta al registro de Vercel del 7/10/2026: disponible, USD 11,25
   por año). Nada puede depender de que exista.
3. Todos los países posibles, después otros idiomas. **Locale y país son cosas distintas.**
4. Sin redirección por IP. Aviso sugerente de país + selector. hreflang entre los dos dominios.
5. Misma estructura que Argentina por país (gratis + planillas/informes pagos, datos con fuente,
   actualización automática, «siempre actualizado», novedades).
6. Una sola cuenta de usuario (Supabase) para todos los países si es viable.
7. Redacción según `docs/GUIA-REDACCION.md` (sin rayas, tono por país).

### Atributos de calidad que ordenan las decisiones

| Prioridad | Atributo | Qué significa acá |
|---|---|---|
| 1 | No romper Argentina | Ni URLs, ni HTML, ni headers, ni performance, ni el flujo de datos vivos de AR |
| 2 | Verdad del dato | Nada NO VERIFICADO se publica como dato. Toda cifra lleva fuente https y fecha |
| 3 | Costo marginal por país | Sumar un país es sumar datos + funciones puras + tests + textos, no copiar páginas |
| 4 | Trabajo en paralelo | Un agente por país con archivos disjuntos, sin pisarse |
| 5 | Performance | Igual que AR: estático, sin spinners, Lighthouse móvil 90+ |
| 6 | Reversibilidad | Poder separar el sitio internacional en otro proyecto sin reescribir |

## 2. Capacidades de Next 16.3.7 usadas (confirmadas o no)

Confirmado leyendo `node_modules/next/dist/docs/` el 7/10/2026:

| Capacidad | Documento | Uso en este ADR |
|---|---|---|
| Varios root layouts con route groups; navegar entre ellos recarga la página entera | `03-file-conventions/route-groups.md` | `(ar)` y `(intl)` con `<html lang>` propio |
| Root layout dentro de un segmento dinámico (`app/[lang]/layout`) y `next/root-params` | `02-guides/internationalization.md`, `04-functions/next-root-params.md` | layout raíz en `intl/[mercado]` |
| `rewrites` y `redirects` con `has`/`missing` de tipo `host`; orden: headers, redirects, proxy, `beforeFiles`, archivos estáticos y `_next/static`, `afterFiles`, dinámicas, `fallback` | `05-config/01-next-config-js/rewrites.md`, `redirects.md` | ruteo por dominio sin función |
| `generateStaticParams` + `dynamicParams = false` (lo no generado da 404) | `04-functions/generate-static-params.md` | solo existen países y calculadoras publicados |
| `alternates.languages` en metadata (genera `<link rel="alternate" hreflang>`) | `04-functions/generate-metadata.md` | hreflang |
| Sitemaps anidados en segmentos y `generateSitemaps` | `01-metadata/sitemap.md` | sitemap por país |
| `robots` va en la raíz de `app` | `01-metadata/robots.md` | el de calcularya sale de un route handler |
| Proxy corre en Node.js por defecto y no acepta `runtime` | `03-file-conventions/proxy.md` | razón para NO rutear por proxy |
| `NextRequest` ya no tiene `geo` (sacado en v15) | `04-functions/next-request.md` | el país sale del header `x-vercel-ip-country` |
| `global-not-found` existe pero es **experimental** (`experimental.globalNotFound`) | `03-file-conventions/not-found.md` | no se usa |
| ISR con `export const revalidate` sin Cache Components | `02-guides/incremental-static-regeneration.md` | series diarias por país |
| `allowedDevOrigins` acepta comodines (`*.dominio`) | `05-config/01-next-config-js/allowedDevOrigins.md` | probar `calcularya.localhost` en dev |

**No confirmado** (se prueba en un spike al principio de la Fase 0, antes de construir encima):

| Supuesto | Plan B si falla |
|---|---|
| La navegación cliente con `<Link>` entre dos páginas de calcularya funciona con rewrites condicionados por `host` (el router de App pide la URL pública y el servidor reescribe) | `prefetch={false}` + `<a>` plano entre calculadoras del sitio intl |
| Un `beforeFiles` con fuente `/:path((?!_next/|api/|og).*)` deja pasar `_next/static` y las rutas técnicas | Listar en el `source` solo los prefijos válidos (códigos de país + páginas globales) |
| `sitemap.ts` dentro de `[mercado]` genera `/intl/uy/sitemap.xml` | Route handler `[mercado]/sitemap.xml/route.ts` que devuelve el XML |
| El `not-found.tsx` de `intl/[mercado]` se usa para slugs no generados con `dynamicParams = false` | Llamar `notFound()` explícito en la página |
| El build pasa con `generateStaticParams` vacío en el segmento del root layout intl (árbol apagado) | Generar siempre `global` y que su página haga `notFound()` mientras intl esté apagado |

## 3. Decisiones

### D1. Un solo proyecto Next y un solo proyecto Vercel, ruteo por dominio

| Alternativa | Riesgo para calcular.ar por deploy | Build | Aislamiento de fallas | Código compartido | Costo de arranque |
|---|---|---|---|---|---|
| **A. Un proyecto, dos dominios, ruteo por `host` en `next.config`** (elegida) | Medio: todo deploy reconstruye AR. Se baja con gates (abajo) | Crece con los países (estimación abajo) | Un error de compilación intl bloquea el deploy siguiente de AR; producción no se rompe (Vercel deja el deploy anterior) | Directo, sin paquetes | Bajo: un movimiento de carpetas URL-neutro |
| B. Mismo repo, dos proyectos Vercel con `SITIO=ar\|intl` | Bajo para deploys solo-intl si `ignoreCommand` filtra por carpeta | Cada proyecto compila todo igual (las páginas AR son carpetas estáticas, no se pueden excluir por env) | Mejor: rollback independiente | Directo | Medio: dos proyectos, dos sets de env y crons |
| C. Monorepo (`apps/ar`, `apps/intl`, `packages/motor`) | Nulo para cambios solo-intl | Separado | Total | Paquete interno, versionado | Alto: mover AR de raíz (Vercel Root Directory, workflows, `RAIZ` de 14+ scripts, `outputFileTracingIncludes`) sobre el activo que paga todo |
| D. Repo aparte copiando código | Nulo | Separado | Total | Copia: deriva garantizada | Bajo hoy, caro siempre |

**Elegida: A**, diseñada para poder pasar a C sin reescribir:

- Todo lo internacional vive en carpetas propias (`src/motor`, `src/paises`, `src/app/(intl)`), y un
  check de fronteras (`check_fronteras.ts`) prohíbe que AR importe `@/paises/*` y que intl importe
  `@/data/*` o `@/lib/*` de AR. El día que haga falta C, esas carpetas se mueven tal cual.
- **Disparadores para pasar a C** (cualquiera): build de producción de más de 15 minutos; dos
  incidentes en un mes en que código intl bloquea un deploy de datos de AR; un equipo distinto
  manteniendo intl.

**Cuantificación.** Rutas: AR tiene 150 `page.tsx` más las mensuales generadas (convenios, cuota,
canasta, inflación). Intl en régimen: 16 países × unas 10 calculadoras + home, novedades, fuentes y
planillas por país ≈ 220 rutas, más derivadas. Las rutas prerenderizadas aproximadamente se duplican.
El tiempo de build actual **no está medido en este ADR** (la CLI de Vercel de esta máquina está en el
scope `insights3`, no en el del proyecto): la Fase 0 lo mide y fija el presupuesto.

**Frecuencia de deploys, el número que decidió D5.** AR ya publica hasta 3 veces por día. Si las
series diarias de cada país (UF, UVR, UDIS, UI, tipo de cambio) pasaran por git, serían del orden de
16 países × 365 días ≈ 5.800 deploys por año que reconstruyen AR. Por eso las series no van por git
(ver D5): por git solo pasan cambios normativos, del orden de 16 × 5 a 10 por año ≈ 2 o 3 por semana.

**Gates que bajan el riesgo de A para calcular.ar:**

| Gate | Qué atrapa |
|---|---|
| `check_rutas_ar.ts` contra una foto versionada de rutas AR (path, status, canonical, title, hreflang) | Cualquier cambio visible en AR que nadie pidió |
| `check_fronteras.ts` | Acoplamiento AR ↔ intl |
| Build obligatorio en el PR (CI) antes de mergear | Un error de compilación intl que bloquearía datos-vivos AR |
| `post-deploy.yml` extendido: smoke AR intacto + smoke intl por país | Producción sirviendo mal en cualquiera de los dos dominios |

### D2. Rutas: prefijo interno `/intl` + rewrites por `host`, AR a un route group

**Estructura de `src/app`:**

```
src/app/
  (ar)/layout.tsx                         hoy src/app/layout.tsx (mismo contenido)
  (ar)/page.tsx, (ar)/aguinaldo/, ...     las ~105 carpetas actuales, por git mv (URL-neutro)
  (intl)/intl/[mercado]/layout.tsx        root layout intl: <html lang={locale}>, header y footer intl
  (intl)/intl/[mercado]/page.tsx          home del país; con mercado "global", el selector de país
  (intl)/intl/[mercado]/[slug]/page.tsx   calculadora o página fija del mercado (del registro)
  (intl)/intl/[mercado]/[slug]/[sub]/page.tsx  derivadas (tablas por mes, por región) cuando hagan falta
  (intl)/intl/[mercado]/not-found.tsx
  (intl)/intl/robots.txt/route.ts         robots de calcularya
  (intl)/intl/sitemap.xml/route.ts        índice de sitemaps de calcularya
  api/...                                  compartida por los dos dominios (no se mueve)
  og/, sitemap.ts, robots.ts, icon.svg     quedan en la raíz (no necesitan layout)
```

Por qué mover AR a `(ar)`: el `<html lang="es-AR">`, el header, el footer y AdSense de AR están en el
root layout. Sin dos root layouts, las páginas intl heredarían todo eso. La alternativa (leer el host
en el layout) vuelve dinámico todo el sitio. El movimiento no cambia ninguna URL (los route groups no
entran en el path) y se verifica con la foto de rutas. Toca 14 scripts que leen `src/app/...` y los
imports `../globals.css`.

**Comparación de esquemas de ruteo:**

| Alternativa | Contra |
|---|---|
| `[mercado]` en la raíz de `app` + redirects cruzados | Toda URL inexistente de AR (`calcular.ar/typo`) caería en `[mercado]` y mostraría el 404 con chrome intl. Cambia el 404 de AR |
| Proxy que reescribe todo pedido según host | Una invocación de función Node en cada visita anónima de AR (hoy el matcher es estrecho a propósito) |
| **Prefijo interno `/intl` + `beforeFiles` por host** (elegida) | URLs internas distintas de las públicas: el canonical y los links se arman siempre con helpers (`urlIntl()`), nunca a mano |

**Comportamiento por dominio** (reglas generadas en `next.config.ts` desde el registro de mercados).
Con `NEXT_PUBLIC_SITIO_INTL_URL` sin definir, el árbol intl queda apagado: `generateStaticParams`
devuelve vacío y solo se agrega la regla que da 404 a `/intl/*` en el host AR, un path que hoy ya da
404. AR queda idéntico.

| Pedido | En calcular.ar | En calcularya.com |
|---|---|---|
| `/aguinaldo` (ruta AR) | página AR | 308 a `calcular.ar/aguinaldo` |
| `/uy/aguinaldo` (mercado publicado) | 308 a `calcularya.com/uy/aguinaldo` | rewrite a `/intl/uy/aguinaldo` |
| `/uy/...` (mercado no publicado) | 404 de AR | 404 intl |
| `/intl/...` (path interno) | 404 de AR (rewrite `beforeFiles` a una ruta inexistente) | 404 (queda `/intl/intl/...`) |
| `/` | home AR | rewrite a `/intl/global` (selector de país) |
| `/privacidad`, `/terminos`, `/contacto`, `/sobre` | páginas AR | rewrite a `/intl/global/<slug>` |
| `/robots.txt`, `/sitemap.xml` | los de AR | rewrite a `/intl/robots.txt`, `/intl/sitemap.xml` |
| `/_next/*`, `/api/*`, `/og`, archivos de `public` | normal | sin rewrite |

**Variables de entorno** (la arquitectura no depende de que el dominio exista):

| Variable | Producción hoy | Producción con dominio | Local |
|---|---|---|---|
| `NEXT_PUBLIC_SITIO_AR_URL` | `https://calcular.ar` (default en código) | igual | igual |
| `NEXT_PUBLIC_SITIO_INTL_URL` | sin definir: intl apagado | `https://calcularya.com` | `http://calcularya.localhost:3000` |

- **Local:** `calcularya.localhost` resuelve a 127.0.0.1 en Chrome; se agrega a `allowedDevOrigins`
  solo en dev. Se prueban los dos dominios con el mismo `next dev`.
- **Preview de Vercel:** el host es `*.vercel.app`. En builds con `VERCEL_ENV !== "production"` se
  agregan reglas equivalentes condicionadas a la cookie `sitio=intl`, que pone `/api/dev/sitio`
  (ruta que solo existe fuera de producción). El build de producción nunca contiene esas reglas.

**Slugs localizados:** el slug es dato del registro, no nombre de carpeta. `concepto` une
equivalentes entre países (para hreflang y para el aviso de país):

| concepto | ar (calcular.ar) | uy | pe | mx | cl | co |
|---|---|---|---|---|---|---|
| `bono-semestral` | `/aguinaldo` | `aguinaldo` | `gratificacion` | `aguinaldo` | (no existe por ley) | `prima-de-servicios` |
| `liquidacion-final` | `/indemnizacion` | `liquidacion` | `liquidacion-de-beneficios-sociales` | `finiquito` | `finiquito` | `liquidacion` |
| `sueldo-neto` | `/sueldo-neto` | `sueldo-liquido` | `sueldo-neto` | `sueldo-neto` | `sueldo-liquido` | `salario-neto` |

(Ilustrativo: la tabla real sale del research de cada país en su fase.)

`generateStaticParams` de `[mercado]` y de `[slug]` lee el registro y devuelve solo lo publicado que
pasa los gates; `dynamicParams = false`. Unicidad de slug por mercado: la valida `check_paises.ts`.

**Locale ≠ país.** El segmento es un **mercado** (`uy`, `mx`, `br`, `global`), y cada mercado declara
su locale. Si un país necesita dos idiomas (por ejemplo Canadá), el mercado pasa a `ca` y `ca-fr`.
Brasil es `br` con locale `pt-BR`: el motor ya separa diccionario por idioma (`es`, `pt`) y
vocabulario por mercado.

### D3. Modelo de datos por país

Dos clases de dato, porque se actualizan distinto (D5):

| Clase | Ejemplos | Dónde vive | Cómo cambia |
|---|---|---|---|
| **Norma** | salario mínimo, aportes, tablas de impuesto, topes, feriados, fechas de pago | `src/paises/<m>/datos.json`, versionado en git | PR revisado; deploy al mergear |
| **Serie** | UF, UTM, UVR, UDIS, UI, tipo de cambio oficial, tasas | tabla Supabase `ca_series` | cron con guardas; las páginas la leen por ISR |

Tipos (contrato del motor; el JSON se valida contra esto en `check_paises.ts`):

```ts
type CodigoMercado = "global" | "uy" | "py" | "bo" | "pe" | "cl" | "co" | "mx" | "ve" | "ec" | "cr" | "pa" | "do" | "gt" | "sv" | "hn" | "br";
type FechaISO = `${number}-${number}-${number}`;
type Moneda = "UYU" | "PYG" | "BOB" | "PEN" | "CLP" | "COP" | "MXN" | "VES" | "USD" | "CRC" | "DOP" | "GTQ" | "HNL" | "BRL";

type Mercado = {
  codigo: CodigoMercado;
  pais: string;                 // ISO 3166-1 alfa-2 en mayúscula, para areaServed y geo
  nombre: string;               // "Perú"
  locale: string;               // "es-PE", "pt-BR": formato de números, fechas y hreflang
  idioma: "es" | "pt";          // diccionario del motor
  trato: "vos" | "tu" | "usted";
  monedas: Moneda[];            // la primera es la principal; Bolivia y Venezuela muestran USD además
  zonaHoraria: string;          // "America/Lima": decide qué tramo está vigente "hoy"
  estado: "borrador" | "interno" | "publicado";
};

type Fuente = {
  organismo: string;            // "BCRP", "IMPO", "DOF"
  titulo: string;               // "Decreto Supremo 006-2026-TR"
  url: `https://${string}`;     // obligatoria; http o vacía rompe el check
  verificadoEl: FechaISO;       // cuándo una persona o agente lo leyó en la fuente primaria
  tipo: "primaria" | "secundaria";
};

type Tramo<T> =
  | { estado: "verificado"; valor: T; desde: FechaISO; hasta?: FechaISO; region?: string; fuente: Fuente }
  | { estado: "no-verificado"; valor?: T; desde: FechaISO; hasta?: FechaISO; region?: string; motivo: string; fuente?: Fuente };

type Dato<T> = {
  id: string;                   // "pe.rmv"
  nombre: string;
  unidad: Moneda | "%" | "dias" | "UIT" | "UF" | "UMA" | "BPC" | "UVT";
  tramos: Tramo<T>[];           // sin solapes por región; huecos solo si son explícitos
  proximaRevision?: FechaISO;   // alimenta el semáforo (RMV Perú 2027, IMM Chile 1/1/2027, SM Paraguay 1/7/2027)
};

type Aviso = {
  id: string;
  mercado: CodigoMercado;
  nivel: "info" | "cautela" | "bloquea";   // "bloquea" oculta el resultado y explica por qué
  desde: FechaISO;
  hasta?: FechaISO;
  aplicaA: string[] | "*";                // ids de calculadora o conceptos
  texto: string;
  fuente: Fuente;
};
```

Reglas:

- `vigente(dato, fecha, region?)` devuelve **solo tramos verificados**. Si el tramo que cubre la fecha
  no está verificado, devuelve `null`, y una calculadora que lo `requiere` no se genera
  (`generateStaticParams` la excluye y el check lo reporta). Lo NO VERIFICADO puede vivir en el repo
  como trabajo pendiente, nunca en una página.
- `region` cubre lo que ya apareció en el research: zona libre de la frontera norte en México,
  Costa vs Sierra en Ecuador, la matriz región × actividad × ocupación de Panamá, las decenas de
  categorías de salario mínimo de Costa Rica. Para matrices grandes, `T` es una tabla tipada.
- Valores con rango de vigencia son la norma, no la excepción: Chile cambió el mínimo dos veces en
  2026, Perú el 1/10/2026, Uruguay el 1/7/2026. Los tramos futuros se cargan por adelantado y la
  página cambia sola el día que empiezan (ISR, D5), sin deploy.
- Los avisos legales (decreto suspendido en Colombia, reforma no vigente hasta 2027, CTS 100 % libre
  hasta el 31/12/2026 en Perú) son datos: viven en `avisos.json` del país y en la tabla `ca_avisos`
  para los urgentes (se activan sin deploy, ver D5).
- **Moneda y números:** formato con `Intl.NumberFormat(mercado.locale, { style: "currency" })`. El
  parseo de lo que tipea la persona es por locale y está testeado: en `es-PE` y `es-MX` el separador de
  miles es la coma (`S/ 1,474.77`), en `es-AR`, `es-UY`, `es-CL` y `es-CO` es el punto. Un parseo
  equivocado multiplica por mil.
- **Fecha de referencia:** la calcula el servidor en la zona del mercado y viaja como prop. El
  componente cliente nunca mira el reloj para decidir un tramo (mismo motivo que `src/lib/hoy.ts`:
  evitar hydration mismatch).

### D4. Motor de calculadoras: compartido vs propio de cada país

| Compartido (`src/motor`) | Propio de cada país (`src/paises/<m>`) |
|---|---|
| Tipos y validación de datos, `vigente()`, fechas por zona | `datos.json`, `avisos.json` |
| Formato y parseo por locale | Funciones puras de cálculo (`calculadoras/<id>.ts`) |
| Formulario declarativo (moneda, fecha, entero, opción, sí/no) | Casos oficiales (`calculadoras/<id>.casos.ts`) |
| Bloque de resultado (filas declarativas) | Textos de la página: H1, intro, FAQ, glosario (`contenido/<id>.ts`), con el tono del país |
| Sello de fuentes y «siempre actualizado» (derivado de las fuentes, no tipeado) | Detectores de fuentes (`fuentes.ts`) |
| FAQ + JSON-LD (`WebApplication`, `FAQPage`, `areaServed`, `inLanguage`, `priceCurrency`) | Novedades (`novedades.ts`) |
| CTA de planilla o informe | Catálogo de productos (`productos.ts`) y planillas en `private/<m>/` |
| Metadata, canonical, hreflang, sitemap por mercado | |
| Header, footer, selector de país, aviso de país | |

Contrato de una calculadora:

```ts
type DefinicionCalculadora<E, R> = {
  id: string;                       // "pe.gratificacion"
  mercado: CodigoMercado;
  concepto: string;                 // "bono-semestral"
  slug: string;                     // "gratificacion"
  requiere: string[];               // ids de Dato; si alguno no tiene tramo verificado, no se publica
  campos: Campo[];
  calcular: (entrada: E, datos: DatosResueltos, fecha: FechaISO) => R;   // pura: sin red, sin reloj
  resultado: FilaResultado<R>[];
  producto?: string;                // "pe.planilla-gratificacion"
  estado: "borrador" | "interno" | "publicado";
};
```

Una trampa concreta: una función no cruza de Server a Client Component. Por eso cada calculadora
tiene un archivo cliente de tres líneas (`"use client"` + `crearCalculadoraCliente(definicion)`) que
importa la función pura; el registro lo carga con import dinámico, así cada página baja solo su JS.
Los valores vigentes se resuelven en el servidor y viajan como props serializables.

**Agregar una calculadora a un país** = un tramo de datos verificado + función pura + casos oficiales
+ textos + entrada en el registro. Ninguna página nueva. Argentina no migra al motor en este ADR (no se
toca lo que funciona); puede adoptarlo calculadora por calculadora más adelante.

### D5. Actualización automática por país

Se generaliza el patrón de AR (detectar, validar, revertir lo que no pasa, avisar) con dos carriles:

| | Carril 1: normas | Carril 2: series |
|---|---|---|
| Qué | salario mínimo, aportes, tablas, topes, fechas | UF, UTM, UVR, UDIS, UI, tipo de cambio oficial, tasas BCRP |
| Fuente típica | Boletín o diario oficial (IMPO JSON, API SIDOF, El Peruano HTML, normograma DIAN) | API JSON sin token (BCRP, SIDOF, IMPO, datos.gov.co, mindicador para UF), XML (BanRep, BCU) |
| Detector | Avisa que hay norma nueva y arma un **PR borrador** con el tramo `no-verificado` y el link | Escribe en `ca_series` si pasa las guardas |
| Guardas | Revisión de una persona o de un agente revisor contra la fuente primaria; el PR nunca se auto-mergea | Banda de sanidad, salto máximo contra el último valor, continuidad de fechas y, donde hay dos fuentes (SII y mindicador para la UF), coincidencia |
| Publicación | Merge = deploy | ISR (`revalidate = 3600`) + revalidación a demanda por `/api/revalidar` con secreto después de escribir |
| Si falla | Issue por país | No escribe, queda el último valor bueno con su fecha a la vista, issue por país |

El carril 2 es el mismo criterio que AR ya usa (TNA del BCRA en vivo con banda y fallback, IPC
auto-commiteado después de pasar sus checks): una serie de una API oficial que pasa sus guardas se
publica sola. Una norma nunca.

**Interfaz de un detector** (`src/paises/<m>/fuentes.ts`):

```ts
type Detector = {
  id: string;                       // "pe.tc-sunat"
  dato: string;                     // id de Dato o de serie
  carril: "norma" | "serie";
  metodo: "api-json" | "api-xml" | "html" | "pdf" | "manual";
  url: `https://${string}`;
  traer: (http: Http) => Promise<{ valor: unknown; fecha: FechaISO } | null>;   // null = fuente caída
  banda?: { min: number; max: number; saltoRelativoMax: number };
  tlsTolerante?: boolean;           // varios .gob sirven la cadena incompleta (ya pasa en AR y en BCV)
  userAgentNavegador?: boolean;     // gob.pe y BCP rechazan bots sin UA
};
```

**Orquestación:** `.github/workflows/datos-paises.yml` con matriz por mercado (concurrencia por
mercado, horarios en UTC según la hora de publicación de cada organismo), un runner
`scripts/datos-paises/correr.ts --mercado pe` y el semáforo generalizado (`proximaRevision`, tramos
que vencen, normas con `hasta`). AR sigue con su `datos-vivos.yml` sin cambios. Vercel cron no se usa
para esto: el plan del proyecto limita la cantidad de crons y GitHub Actions ya tiene los secretos.

**Novedades por país:** cada PR del carril 1 incluye la entrada de novedad (fecha, qué cambió, desde
cuándo, fuente, calculadoras afectadas). Se publica en `/<m>/novedades` y en la home del país. Las
series no generan novedad.

**«Siempre actualizado» visible:** el sello muestra la fecha de verificación más vieja entre los
datos que usa la calculadora, y para series «actualizado automáticamente el <fecha> desde <organismo>».
Página `/<m>/fuentes` con todos los datos del país, valor vigente, desde, fuente y fecha.

### D6. i18n y SEO

| Tema | Decisión |
|---|---|
| hreflang | Clúster por `concepto`. Cada página lista a todas las equivalentes publicadas (incluida ella misma): `es-AR` → calcular.ar, `es-UY`/`es-PE`/`es-MX`... → calcularya.com, `pt-BR` cuando exista. Recíproco o nada: `check_hreflang.ts` falla si A apunta a B y B no a A |
| x-default | `https://calcularya.com/` (selector de país) para todos los clústeres en v1. Si más adelante hay hubs por concepto, pasa al hub |
| hreflang en AR | Se agrega `alternates.languages` a las páginas AR de cada clúster **recién cuando se publica el primer equivalente**. Es el único cambio en el HTML de AR, con aprobación de Manuel |
| Canonical | Absoluto con el dominio público (`urlIntl()`), nunca el path interno `/intl` |
| Sitemaps | AR sin cambios. calcularya: `/sitemap.xml` índice + `/<m>/sitemap.xml` por mercado. Solo lo publicado |
| Metadata | `metadataBase` del root layout intl = `NEXT_PUBLIC_SITIO_INTL_URL`; `og:locale` del mercado |
| JSON-LD | `WebApplication` con `areaServed: { "@type": "Country", name }`, `inLanguage` = locale, `offers.priceCurrency` = moneda del mercado. Organización propia de calcularya con `sameAs` a calcular.ar |
| Aviso de país | Componente cliente que, después de `load` + idle, pide `/api/geo` (route handler que lee `x-vercel-ip-country`, `Cache-Control: private, no-store`), guarda la respuesta en `sessionStorage` y, si el país del visitante tiene equivalente publicado y no es el de la página, muestra una barra inferior que no mueve el layout. Descartarlo se recuerda. Nunca redirige. La página sigue 100 % estática. Googlebot (EE. UU.) no ve aviso porque no hay mercado EE. UU. |
| Selector | En el header intl y en `/` de calcularya. Diseño por la skill `diseno-maestro` en la fase de UI. Banderas solo para países, nunca para idiomas |
| Search Console | calcularya.com como propiedad de dominio (DNS) + propiedades de prefijo por país (`/pe/`, `/mx/`) para leer cada mercado. calcular.ar sin cambios. IndexNow por host |
| AdSense | Agregar calcularya.com como sitio en la misma cuenta; `ads.txt` sale de `public/` en los dos dominios |

### D7. Pagos multi-país

`docs/research/paises/cobros.md` no existe todavía. Lo que dicen los research por país: MercadoPago
opera solo en AR, BR, CL, CO, MX, PE y UY (verificado en cr, ec, pa y do el 7/10/2026). Bolivia,
Paraguay, Venezuela, Ecuador, Costa Rica, Panamá, Dominicana, Guatemala, El Salvador y Honduras
necesitan otra vía.

Además, **una cuenta de MercadoPago cobra solo en su país** y abrirla pide identificación fiscal
local (no verificado para cada país en este ADR). La cuenta AR de hoy no sirve para cobrar en MXN.

Interfaz (no cambia nada de `src/lib/mp.ts` de AR):

```ts
type ProveedorCobro = {
  id: "mp-ar" | "mp-uy" | "mp-pe" | "mp-mx" | "mp-cl" | "mp-co" | "mor" | "paypal";
  mercados: CodigoMercado[];
  crearCheckout(p: { producto: ProductoIntl; email?: string; checkoutId: string; volverA: string }): Promise<{ url: string }>;
  obtenerPago(id: string): Promise<PagoNormalizado>;          // la fuente de verdad sigue siendo el proveedor
  verificarNotificacion(req: Request): Promise<{ pagoId: string } | null>;   // firma del webhook
};
type PagoNormalizado = {
  proveedor: ProveedorCobro["id"]; id: string; estado: "aprobado" | "pendiente" | "rechazado" | "reembolsado";
  monto: number; moneda: Moneda; producto: string; checkoutId: string | null; email: string | null;
};
```

La entrega intl es una sola ruta (`/api/entrega/[producto]`) que llama `obtenerPago` del proveedor
del producto y aplica el mismo doble gate de AR (pago aprobado por el monto exacto y del producto
correcto). Productos namespaced por mercado (`pe.planilla-gratificacion`).

| Opción | Cubre | Contra |
|---|---|---|
| Merchant of record global (Lemon Squeezy, Paddle u otro) | Todos los mercados con tarjeta; precio en USD | Comisión más alta; sin medios locales (OXXO, PSE, Yape); payout a Argentina por verificar |
| MercadoPago por país | 6 mercados con medios locales | Una cuenta por país con identidad fiscal local |
| dLocal Go u otro agregador cross-border | Medios locales en varios países sin entidad local | Alta y condiciones por verificar |
| PayPal | Casi todos | Conversión pobre en LATAM |

Recomendación: arrancar con **un merchant of record global para todos los mercados intl** (una
integración, cubre todos) y sumar MercadoPago local solo donde haya cuenta. Sin decisión de Manuel,
los países salen sin productos pagos (AdSense + captura de mail) y el CTA de planilla queda apagado
por mercado.

### D8. Cuentas

| Tema | Decisión |
|---|---|
| Base | El mismo proyecto Supabase (`wsmsspeeeujynqornyrj`) y la misma tabla `auth.users`: un mail, una cuenta |
| Sesión | Las cookies son por dominio: calcular.ar y calcularya.com tienen **sesiones separadas** sobre la misma cuenta. v1 de intl **sin cuentas** (comprar no exige cuenta, igual que AR; la entrega va por mail) |
| Cuentas en calcularya (v2) | Mismas Server Actions y mails propios por Resend con el dominio y la marca del sitio. El flujo `generateLink` → `token_hash` → `/auth/confirmar` → `verifyOtp` no depende de la lista de redirects de Supabase, así que sirve igual en el dominio nuevo |
| Puente entre dominios (v3, solo si hay demanda) | Con sesión en un dominio, una Server Action genera un `token_hash` de un solo uso para el mail del usuario y redirige a `/auth/confirmar` del otro dominio (destino fijo, nunca tomado de un parámetro). Reusa la infraestructura existente, sin proveedor de identidad nuevo |
| Datos con país | Migración nueva: `ca_perfiles.mercado_preferido`; `ca_compras.mercado`, `ca_compras.proveedor`; `ca_checkouts.mercado`, `ca_checkouts.proveedor`, `ca_checkouts.moneda`; `ca_calculos.sitio`. Defaults que dejan AR igual (`'ar'`, `'mp-ar'`) |
| Interruptor | `NEXT_PUBLIC_CUENTAS_INTL` separado de `NEXT_PUBLIC_CUENTAS_ACTIVAS`: prender cuentas intl no toca AR |

### D9. Gates de calidad

Todos entran solos en `check-all.ts` (descubre `check_*.ts`):

| Check | Falla si |
|---|---|
| `check_paises.ts` | Un dato sin fuente `https`, sin `verificadoEl`, con tramos solapados, una calculadora publicada que requiere un dato sin tramo verificado para hoy y los próximos 30 días, slugs repetidos en un mercado, un mercado publicado sin `trato` o `locale` |
| `check_paises_casos.ts` | Una calculadora publicada sin casos oficiales, o un caso que no da (tolerancia en centavos, explícita) |
| `check_motor.ts` | Formato o parseo por locale (incluye `1,474.77` en es-PE y `1.750.905` en es-CO), `vigente()` en bordes de tramo y por zona horaria |
| `check_fronteras.ts` | AR importa `@/paises` o intl importa datos o libs de AR |
| `check_rutas_ar.ts` | Cambió algo de AR respecto de la foto versionada (se actualiza la foto solo a propósito, en el mismo PR) |
| `check_hreflang.ts` | Un clúster no recíproco, un hreflang a algo no publicado, falta x-default |
| `check_textos_paises.ts` | Rayas en texto visible, muletillas de la guía, voseo en un mercado `tu`/`usted` (patrones como «calculá», «cobrás») |
| Smoke post-deploy por mercado | Una página intl no muestra el dato vigente (mismo criterio que `scripts/datos-vivos/smoke.ts`) |

**Presupuesto de performance** (base AR medida en `next.config.ts`: `/aguinaldo` 123 KB de HTML,
Lighthouse móvil 94 a 95):

| Métrica | Límite por página de calculadora intl |
|---|---|
| HTML | 130 KB |
| Lighthouse móvil | 92 o más |
| TBT | 200 ms o menos |
| CLS | 0,02 o menos (el aviso de país no puede mover nada) |
| JS de la ruta | no más de 10 % sobre la calculadora AR equivalente |

### D10. Orden de rollout

Criterios: atractivo del research, mantenibilidad del dato (API sin token vs scraping vs manual),
posibilidad de cobrar, competencia y **estacionalidad** (hoy es 7/10/2026: CTS en Perú se deposita
el 15/11, la gratificación vence el 15/12, el aguinaldo mexicano el 20/12).

| Ola | Mercado | Atractivo (research) | Datos | Cobro | Competencia | Por qué en esta ola |
|---|---|---|---|---|---|---|
| Piloto | **Perú** | 6,5/10 | Alta: BCRP API JSON sin token, SUNAT `tipoCambio.txt` | MP opera | Media (sueldojusto.pe, hacecuentas.com/pe) | RMV nueva desde el 1/10/2026 (S/ 1.230) que la competencia todavía no refleja, CTS y gratificación en los próximos 70 días, fórmulas simples para probar el motor |
| 2 | México | 7/10 | Alta: API SIDOF sin token; Banxico e INEGI con token | MP opera | Muy alta | El mercado más grande; aguinaldo al 20/12. ISR y subsidio son el caso difícil del motor, mejor con el motor ya probado |
| 2 | Uruguay | 6/10 | Alta: IMPO JSON, BCU, INE | MP opera | Alta (datosuruguay.com) | Más parecido a AR (voseo, aguinaldo); bajo riesgo |
| 3 | Colombia | sin puntaje | Media-alta: BanRep SDMX, datos.gov.co | MP opera | Alta (gerencie, actualicese) | Prima 20/12; avisos legales volátiles (SMMLV suspendido y repuesto) prueban el sistema de avisos |
| 3 | Chile | sin puntaje | Alta: SII, mindicador (no oficial) | MP opera | Saturada | Serie UF diaria prueba el carril 2 |
| 3 | Ecuador | 8/10 | Media-baja: fuente del SBU no alcanzable, solo prensa | Sin MP | n/d | Atractivo alto y USD, pero el dato base no se puede verificar en fuente primaria hoy |
| 3 | Dominicana, Costa Rica, Guatemala | 8/10, 7/10, 7/10 | Por revisar en su research | Sin MP | n/d | Atractivo alto; dependen de la decisión de cobro |
| 4 | Paraguay | 5/10 | Media-baja: BCP sin API y anti-bot | Sin MP | Baja | Chico y difícil de mantener |
| 4 | Bolivia | sin puntaje | Media: BCB scraping, Gaceta inaccesible | Sin MP | Media | Tipo de cambio flexible desde 29/6/2026 |
| 4 | El Salvador, Panamá, Honduras | 6/10, 5/10, 5/10 | Por revisar | Sin MP | n/d | Mercados chicos; El Salvador y Panamá en USD |
| 5 | Venezuela | sin puntaje | Baja: BCV scraping, normas sin Gaceta legible | Sin MP, riesgo de cumplimiento | Media | Volatilidad alta del dato y del cobro |
| 6 | Brasil (`pt-BR`) | sin research | n/d | MP opera | n/d | Primer idioma nuevo: prueba el diccionario `pt` |

Puntajes de Chile, Colombia, Bolivia y Venezuela: sus research no traen puntaje numérico; el orden es
lectura cualitativa.

## 4. Consecuencias

**Positivas:** un país nuevo cuesta datos + funciones + tests + textos; AR no cambia hasta que se
decide publicar hreflang; las series se actualizan sin deploys; el mismo pipeline de verdad del dato
de AR, endurecido con estados verificado/no verificado.

**Negativas y riesgos:**

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El `git mv` de AR a `(ar)` es un cambio masivo sobre el activo principal y choca con cualquier sesión que edite `src/app` | Alto si sale mal, nulo si sale bien | PR único, ventana sin otras sesiones en `src/app`, foto de rutas + diff de HTML de las 20 páginas con más tráfico, rollback = revert de un commit |
| Un error de build intl frena los deploys de datos-vivos AR | Medio | Build obligatorio en el PR; disparador de paso a monorepo |
| Supuestos de Next no confirmados (sección 2) | Medio | Spike en Fase 0 con plan B por cada uno |
| Fórmulas con fuentes secundarias (Perú) o fuente oficial inalcanzable (Ecuador, Bolivia, Venezuela) | Retrasa países | El gate no publica; el research marca qué falta verificar |
| Parseo de números por locale | Resultados por mil | `check_motor.ts` con casos por locale |
| hreflang mal armado entre dominios | Google muestra el país equivocado | Recíproco o nada, check automático, seguimiento en Search Console |
| Dominio nuevo sin autoridad | Tráfico inicial bajo | Links desde calcular.ar (footer «Otros países»), decisión de Manuel por ser cambio visible en AR |
| Sin decisión de cobro | Países sin ingreso por planillas | AdSense + mail; el CTA se prende por mercado |

## 5. Lo que tiene que decidir Manuel

1. Comprar calcularya.com en el scope de Vercel del proyecto calcular (disponible, USD 11,25 por año
   al 7/10/2026).
2. Estrategia de cobro intl: merchant of record global (cuál) y si se abren cuentas MercadoPago
   locales.
3. Aprobar la ventana para mover AR a `(ar)` (un PR, URL-neutro, sin otras sesiones en `src/app`).
4. Cambios visibles en calcular.ar al publicar el piloto: hreflang en las páginas del clúster, aviso
   de país y link «Otros países» en el footer.
5. Marca visible del sitio nuevo («CalcularYa» u otra).
