# Plan de implementación del ADR 0001 (multi-país)

Leer antes: [0001-multi-pais.md](0001-multi-pais.md). Este plan no reabre decisiones: las ejecuta.

## Reglas para todas las fases

- Cada fase es un PR contra `main`, desde un worktree y una rama propios. Nadie mergea sin CI verde,
  `npx -y tsx scripts/check-all.ts` verde y `npm run build` verde. El merge lo decide Manuel.
- Ninguna fase cambia algo visible de calcular.ar salvo las marcadas **«cambio visible AR»**, que
  necesitan aprobación explícita de Manuel en el PR.
- Copy para personas: lo escribe Claude con la skill `ux-writing` y `docs/GUIA-REDACCION.md`, en el
  tono del mercado. No se delega a un modelo económico.
- Un dato entra como `verificado` solo después de leerlo en la fuente primaria. Si no se pudo, entra
  `no-verificado` con su `motivo` y la calculadora que lo necesita no se publica.

## Mapa de dueños de archivos

| Zona | Dueño | Quién más puede tocarla |
|---|---|---|
| `src/app/(ar)/**`, `src/data/**`, `src/lib/**` (AR) | Nadie de este plan, salvo la Fase 0.2 (mover) y los pasos «cambio visible AR» | Coordinador |
| `src/motor/**` | Agente motor | Coordinador |
| `src/app/(intl)/**`, `src/app/api/geo`, `src/app/api/revalidar`, `src/app/api/entrega`, `src/app/api/cobro` | Agente plataforma intl | Coordinador |
| `src/paises/index.ts` (registro de mercados) | **Solo coordinador** (una línea por país al integrar) | |
| `src/paises/<m>/**`, `private/<m>/**`, `scripts/paises/<m>/**` | Agente del país `<m>` | |
| `next.config.ts`, `vercel.json`, `.github/workflows/**`, `supabase/migrations/**` | Coordinador (o el agente de la subfase que lo diga) | |
| `scripts/check_*.ts` nuevos del plan | El agente de la subfase que lo crea | |

Con este mapa, desde la Fase 2 cada país es un agente con archivos disjuntos: el registro, los
workflows y el sitemap leen la lista de mercados de `src/paises/index.ts`, así que sumar un país no
toca nada compartido salvo esa línea.

## Fase 0: base multi-país sin ningún país público

Objetivo: todo el andamiaje construido y probado con un mercado ficticio `zz` que nunca existe en
producción, y **calcular.ar idéntico byte a byte en lo que importa** (rutas, status, head, headers,
contenido de `<main>`).

### 0.1 Línea base y gate de no regresión AR

| Campo | Detalle |
|---|---|
| Crea | `scripts/check_rutas_ar.ts`, `scripts/snapshots/rutas-ar.json` |
| Dueño | `test-automator` (Sonnet, razonamiento medio) |
| Depende de | nada |
| Qué hace el check | Levanta `next start` (o usa `--base`), recorre las URLs del sitemap AR más una lista fija (privadas, `/og`, `/robots.txt`, `/sitemap.xml`, una URL inexistente para el 404) y guarda por URL: status, `<title>`, canonical, meta robots, `link rel=alternate`, headers (`content-security-policy`, `x-robots-tag`, `cache-control`, `referrer-policy`) y un hash del texto de `<main>` normalizado (sin hashes de chunks ni build id). Compara contra la foto |
| Además | Medir y anotar en este archivo el tiempo de `npm run build` actual y el número de rutas prerenderizadas (presupuesto de D1) |
| Terminado | Foto commiteada, check verde contra `main`, y rojo si se cambia a mano un `title` (prueba de que detecta) |
| Verificación | `npx -y tsx scripts/check_rutas_ar.ts` verde; cambio de prueba lo pone rojo |

### 0.2 Mover AR a `src/app/(ar)` (URL-neutro)

| Campo | Detalle |
|---|---|
| Toca | `git mv` de `src/app/layout.tsx`, `page.tsx`, `globals.css` y las carpetas de página a `src/app/(ar)/`. Quedan en la raíz: `api/`, `og/`, `sitemap.ts`, `robots.ts`, `icon.svg`, `apple-icon.tsx`. Ajustar imports `../globals.css` y los 14 scripts que leen `src/app/...` (`check_ads_no_canibalizan`, `check_archivo_mensual`, `check_autoria`, `check_blog_registro`, `check_catalogo`, `check_informe_*` (5), `check_llms`, `check_planilla_archivo`, `check_rastreo`, `mapa-contenido`) |
| Dueño | `legacy-modernizer` (Opus, razonamiento alto). Ventana sin otras sesiones escribiendo en `src/app` |
| Depende de | 0.1 |
| Terminado | `check_rutas_ar.ts` idéntico, `check-all` verde, build verde, Lighthouse móvil de `/aguinaldo` y `/sueldo-neto` en el mismo rango que antes (94 a 95) |
| Verificación | Los tres comandos + `git diff --stat -M` muestra solo renombres y los ajustes de imports |
| Rollback | Revert del commit |

### 0.3 Spike de ruteo por dominio (antes de construir encima)

| Campo | Detalle |
|---|---|
| Crea | Rama descartable con `src/app/(intl)/intl/[mercado]/layout.tsx`, `page.tsx`, `[slug]/page.tsx` mínimos y las reglas de `next.config.ts` |
| Dueño | `ecc:code-architect` o `frontend-developer` (Opus, alto) |
| Depende de | 0.2 |
| Prueba los 5 supuestos no confirmados del ADR (sección 2) | Navegación con `<Link>` bajo rewrite por host; exclusión de `_next`/`api`/`og` en el `beforeFiles`; `sitemap.ts` dentro de `[mercado]`; `not-found` con `dynamicParams = false`; build con `generateStaticParams` vacío |
| Terminado | Tabla de resultados agregada a este archivo (supuesto, resultado, plan B aplicado o no) |
| Verificación | `next build && next start` y `curl -sI -H "Host: calcularya.com" http://localhost:3000/<ruta>` para cada fila de la tabla «Comportamiento por dominio» del ADR; en el navegador, `http://calcularya.localhost:3000` |

### 0.4 Motor: tipos, vigencia, formato

| Campo | Detalle |
|---|---|
| Crea | `src/motor/tipos.ts` (Mercado, Fuente, Tramo, Dato, Aviso, DefinicionCalculadora, Campo, FilaResultado, ProductoIntl), `src/motor/vigencia.ts` (`vigente`, `hoyEn(mercado)`), `src/motor/formato.ts` (moneda, número, fecha y parseo por locale), `src/motor/datos.ts` (carga y validación de `datos.json`), `src/motor/registro.ts` (consultas sobre `src/paises/index.ts`), `src/paises/index.ts` (vacío salvo `zz` y `global`), `src/paises/zz/**` (mercado ficticio con una calculadora de prueba), `scripts/check_motor.ts`, `scripts/check_paises.ts`, `scripts/check_paises_casos.ts`, `scripts/check_fronteras.ts` |
| Dueño | `typescript-pro` (Opus, alto) |
| Depende de | 0.2 (puede arrancar en paralelo con 0.3: archivos disjuntos) |
| Terminado | Los cuatro checks verdes; `check_motor.ts` cubre `es-PE` (`1,474.77`), `es-MX`, `es-CO` (`1.750.905`), `es-UY`, `es-CL`, `pt-BR`; bordes de tramo (día anterior, día de inicio) en dos zonas horarias; un dato `no-verificado` nunca sale de `vigente()` |
| Verificación | `npx -y tsx scripts/check-all.ts`; prueba negativa: un `datos.json` de `zz` con `url: "http://..."` pone rojo `check_paises.ts` |

### 0.5 Árbol intl y ruteo por dominio (definitivo)

| Campo | Detalle |
|---|---|
| Crea/toca | `src/app/(intl)/intl/[mercado]/{layout,page,not-found}.tsx`, `[slug]/page.tsx`, `src/app/(intl)/intl/robots.txt/route.ts`, `src/app/(intl)/intl/sitemap.xml/route.ts`, sitemap por mercado (según el spike), `src/motor/seo.ts` (`urlIntl`, metadata, canonical, `hreflangDe(concepto)`, JSON-LD), `next.config.ts` (reglas por host generadas desde el registro, `allowedDevOrigins` solo en dev, reglas por cookie solo fuera de producción), `src/app/api/dev/sitio/route.ts` (solo fuera de producción), `scripts/check_hreflang.ts`, `scripts/check_routing_hosts.ts` |
| Dueño | Agente plataforma intl: `frontend-developer` (Opus, alto) |
| Depende de | 0.3, 0.4 |
| Terminado | Con `NEXT_PUBLIC_SITIO_INTL_URL` sin definir: `check_rutas_ar.ts` idéntico y ninguna ruta `/intl` prerenderizada. Con la variable en `http://calcularya.localhost:3000` y `zz` en estado `interno`: las 8 filas de la tabla de comportamiento por dominio dan lo esperado |
| Verificación | `scripts/check_routing_hosts.ts` (corre `curl` con `-H Host:` contra `next start` y compara status y `location` por fila); `check_rutas_ar.ts` en los dos modos |

### 0.6 UI compartida del motor

| Campo | Detalle |
|---|---|
| Crea | `src/motor/ui/` (Formulario declarativo, Resultado, Sello con fuentes y «actualizado automáticamente», FAQ con JSON-LD, CTA de producto, Header y Footer intl, Selector de país, Aviso de país), `src/motor/i18n/{es,pt}.ts` (textos del motor por idioma), `src/app/api/geo/route.ts` (`x-vercel-ip-country`, `private, no-store`) |
| Dueño | `frontend-developer` con la skill `diseno-maestro` (Mobbin, dirección de arte, verificación en Browser pane) y `ui-animation` para el selector y el aviso (Opus, alto) |
| Depende de | 0.4; puede ir en paralelo con 0.5 si no toca `src/app/(intl)` |
| Terminado | La calculadora de `zz` en `calcularya.localhost` cumple el presupuesto de D9 (HTML ≤ 130 KB, Lighthouse móvil ≥ 92, TBT ≤ 200 ms, CLS ≤ 0,02 con el aviso visible); cero Supabase en el bundle cliente; vetos de diseño de Manuel respetados (sin marquee, sin caret visible, sin sombras teñidas, fondo con carácter) |
| Verificación | Lighthouse móvil en local de producción (`next build && next start`), screenshot en Browser pane a 375 px y 1280 px, `check_textos_paises.ts` verde |

### 0.7 Datos: carril de normas, carril de series, semáforo

| Campo | Detalle |
|---|---|
| Crea | `supabase/migrations/<fecha>_ca_series_avisos.sql` (`ca_series`: mercado, serie, fecha, valor, fuente_url, obtenido_at; `ca_avisos`; RLS con lectura pública solo de filas vigentes y escritura solo service role), `src/motor/series.ts` (lectura en el servidor para ISR, con fallback al último valor horneado), `src/app/api/revalidar/route.ts` (secreto, `revalidatePath` por mercado), `scripts/datos-paises/correr.ts` (runner por mercado: detectores, bandas, PR borrador para normas, escritura de series), `scripts/datos-paises/matriz.ts` (lista de mercados con detectores, para la matriz del workflow), `scripts/datos-paises/semaforo.ts`, `.github/workflows/datos-paises.yml` |
| Dueño | `backend-architect` (Opus, alto) + `database-architect` para la migración |
| Depende de | 0.4 |
| Terminado | Migración aplicada en el proyecto Supabase con `get_advisors` (security y performance) limpio; corrida del workflow con `zz` contra un detector de prueba que devuelve un valor fuera de banda: no escribe y abre el issue; un valor dentro de banda: escribe y revalida; una norma nueva: abre PR borrador con el tramo `no-verificado` |
| Verificación | `workflow_dispatch` de `datos-paises.yml`; consulta a `ca_series`; `datos-vivos.yml` de AR sin cambios (`git diff` vacío en ese archivo) |

### 0.8 Pagos: interfaz y entrega intl

| Campo | Detalle |
|---|---|
| Crea | `src/motor/cobro/tipos.ts` (`ProveedorCobro`, `PagoNormalizado`, `ProductoIntl`), `src/motor/cobro/registro.ts`, `src/app/api/entrega/[producto]/route.ts` (doble gate: monto exacto y producto correcto), `src/app/api/cobro/[proveedor]/{checkout,webhook}/route.ts`, migración de columnas de D8 (`mercado`, `proveedor`, `moneda` con defaults AR), `outputFileTracingIncludes` para `/api/entrega/[producto]` |
| No toca | `src/lib/mp.ts`, `src/lib/entrega.ts`, `/api/mp/*`, `/api/planilla-*` de AR |
| Dueño | `payment-integration` (Opus, alto) |
| Depende de | 0.4. El adaptador concreto (merchant of record o MP local) espera la decisión de Manuel |
| Terminado | Proveedor falso en tests que cubre aprobado, pendiente, rechazado, reembolsado, monto distinto y producto distinto; la entrega rechaza todo lo que no es aprobado por el monto y producto exactos |
| Verificación | `scripts/check_cobro_intl.ts` verde; `check_mp_webhook.ts` y `check_entrega.ts` de AR siguen verdes sin cambios |

### 0.9 Cierre de Fase 0: prueba de que calcular.ar no cambió

| Verificación | Comando o método | Esperado |
|---|---|---|
| Rutas, head, headers, contenido | `npx -y tsx scripts/check_rutas_ar.ts` | idéntico a la foto de 0.1 |
| Suites | `npx -y tsx scripts/check-all.ts` | verde (las nuevas incluidas) |
| Build | `npm run build` | verde; tiempo dentro del presupuesto anotado en 0.1 más un 15 % |
| Sitemap y robots AR | `curl` de `/sitemap.xml` y `/robots.txt` antes y después | byte a byte iguales |
| Performance AR | Lighthouse móvil de `/aguinaldo`, `/sueldo-neto`, `/monotributo` | mismo rango que antes |
| Preview de Vercel | PR con preview; `check_rutas_ar.ts --base <preview>` | idéntico |
| Producción, después del merge | `post-deploy.yml` (smoke AR) | verde |

Dueño del cierre: coordinador. Modelo: Opus, razonamiento alto.

## Fase 1: Perú, piloto completo

Objetivo: calcularya.com/pe en producción con 4 calculadoras, datos verificados en fuente primaria,
actualización automática, novedades y (si hay decisión de cobro) una planilla paga. Fechas que
mandan: CTS se deposita el 15/11/2026 y la gratificación vence el 15/12/2026.

| Paso | Archivos | Dueño | Depende de | Terminado | Verificación |
|---|---|---|---|---|---|
| 1.1 Verificar fuentes primarias | `src/paises/pe/datos.json`, `avisos.json`, `mercado.ts` | `search-specialist` + Claude revisor (Opus, alto) | Fase 0 | RMV (S/ 1.130 hasta 30/9/2026, S/ 1.230 desde 1/10/2026), UIT 2026, asignación familiar, bonificación extraordinaria (9 % y 6,75 % con EPS), aportes AFP/ONP, regla CTS 2026: cada valor `verificado` con URL primaria (El Peruano o gob.pe), o `no-verificado` con motivo. El research marca las fórmulas como fuente secundaria: hay que abrir Ley 27735, Ley 30334, DS 001-97-TR, DS 007-2002-TR | `check_paises.ts` verde |
| 1.2 Calculadoras | `src/paises/pe/calculadoras/{gratificacion,cts,liquidacion,sueldo-neto}.ts` + `.casos.ts` + cliente | `typescript-pro` (Opus, alto) | 1.1 | Cada una con casos oficiales; incluye `(1.230 + 123) × 1,09 = 1.474,77` | `check_paises_casos.ts` verde |
| 1.3 Textos | `src/paises/pe/contenido/*.ts`, `novedades.ts` (primera: RMV nueva) | Claude con `ux-writing` (Opus, medio) | 1.2 | Tú, vocabulario peruano del research, cero rayas | `check_textos_paises.ts` verde y lectura en voz alta |
| 1.4 Detectores | `src/paises/pe/fuentes.ts` | `backend-architect` (Sonnet, medio) | 1.1, 0.7 | BCRP (series, API JSON sin token), SUNAT `tipoCambio.txt`, El Peruano (normas, con UA de navegador) | Corrida manual de `datos-paises.yml` para `pe`: series escritas, cero PR falsos |
| 1.5 Producto (si hay decisión de cobro) | `src/paises/pe/productos.ts`, `scripts/paises/pe/gen_planilla_*.ts`, `private/pe/*.xlsx` | `payment-integration` + agente del país (Opus, alto) | 0.8 + decisión | Compra de prueba en sandbox del proveedor y descarga con doble gate | Smoke de entrega |
| 1.6 Integración | `src/paises/index.ts` (línea de `pe`, estado `interno`) | Coordinador | 1.1 a 1.4 | `/pe/*` visible solo en preview con cookie | `check_routing_hosts.ts`, Lighthouse de `/pe/gratificacion` dentro del presupuesto |
| 1.7 Lanzamiento | Dominio en Vercel, `NEXT_PUBLIC_SITIO_INTL_URL`, `pe` a `publicado`, Search Console (dominio + prefijo `/pe/`), AdSense, IndexNow | Coordinador (`deployment-engineer`, Sonnet, medio) | 1.6 + dominio comprado | `calcularya.com/pe/gratificacion` 200 con dato vigente; `calcular.ar/pe/gratificacion` da 308 | `post-deploy.yml` con smoke intl; `vercel inspect` en `READY` |
| 1.8 **Cambio visible AR** | `alternates.languages` con `hreflangDe("bono-semestral")` y `hreflangDe("liquidacion-final")` en las páginas AR del clúster, aviso de país y link «Otros países» en el footer (lo que Manuel apruebe) | Coordinador | 1.7 + aprobación | Clústeres recíprocos; foto de rutas AR actualizada a propósito en el mismo PR | `check_hreflang.ts`, `check_rutas_ar.ts` con la diferencia esperada y nada más |
| 1.9 Retro del piloto | Este archivo: qué cambió del motor, tiempos reales por paso | Coordinador | 1.8 | Ajustes al motor antes de abrir países en paralelo | Revisión de Manuel |

Criterio de Fase 1 terminada: 14 días en producción con el semáforo de `pe` en verde, Search Console
sin errores de hreflang y el motor sin cambios incompatibles pendientes.

## Fase 2 en adelante: países en paralelo

Un agente por país, en su worktree, con `src/paises/<m>/**`, `private/<m>/**` y `scripts/paises/<m>/**`
como únicos archivos propios. El coordinador integra (línea en `src/paises/index.ts`, estado
`interno` y después `publicado`) y es el único que toca las páginas AR para hreflang.

Receta por país (los mismos pasos 1.1 a 1.7, sin rehacer plataforma):

1. Datos verificados en fuente primaria (`datos.json`, `avisos.json`, `mercado.ts` con locale, trato,
   monedas y zona horaria).
2. Calculadoras top 4 o 5 del research, con casos oficiales.
3. Textos en el tono del país y novedades.
4. Detectores (series y normas) con bandas.
5. Producto si el mercado tiene proveedor de cobro.
6. Integración como `interno`, revisión en preview, `publicado`.

| Ola | Mercados | Dueños en paralelo | Depende de | Nota |
|---|---|---|---|---|
| 2 | México, Uruguay | 2 agentes país (Opus, alto para México por ISR y subsidio; Sonnet, medio para Uruguay) | Fase 1 cerrada | México antes del pico de aguinaldo (vence el 20/12) |
| 3 | Colombia, Chile, Ecuador, Dominicana, Costa Rica, Guatemala | hasta 6 agentes país | Ola 2 publicada | Ecuador, Dominicana, Costa Rica y Guatemala solo si hay cobro sin MP decidido y el dato base se verifica en fuente primaria |
| 4 | Paraguay, Bolivia, El Salvador, Panamá, Honduras | hasta 5 agentes país | Ola 3 | Fuentes con scraping y anti-bot: detectores con UA de navegador |
| 5 | Venezuela | 1 agente país | Ola 4 + decisión de cobro | Avisos legales y doble moneda (VES y USD) |
| 6 | Brasil (`pt-BR`) | agente motor (diccionario `pt`) + agente país | Research de Brasil | Primer idioma nuevo: `check_textos_paises.ts` con reglas para portugués |

Criterio de un país terminado: `check-all` verde, smoke post-deploy del mercado verde, Lighthouse
dentro del presupuesto, sitemap del mercado enviado en Search Console, clúster hreflang recíproco.

## Fases transversales (cuando haga falta)

| Fase | Qué | Disparador |
|---|---|---|
| T1 Cuentas intl v2 | Login y biblioteca en calcularya con `NEXT_PUBLIC_CUENTAS_INTL`, mails por Resend con la marca del sitio | Primeras ventas intl |
| T2 Puente de sesión | Server Action con `token_hash` de un solo uso entre dominios | Usuarios que compran en los dos sitios |
| T3 Hubs por concepto | `calcularya.com/calculadora/<concepto>` como x-default de cada clúster | Más de 6 mercados con el mismo concepto |
| T4 Paso a monorepo | Mover `src/motor`, `src/paises` y `src/app/(intl)` a `apps/intl` + `packages/motor` | Cualquiera de los disparadores de D1 |

## Registro de mediciones (se completa en la ejecución)

| Medición | Valor | Fecha |
|---|---|---|
| Tiempo de `npm run build` antes de Fase 0 | 75 s con `BUILD_CPUS=2` en frío (prebuild de planillas incluido; compilación 24,1 s, TypeScript 24,0 s, prerender 5,2 s); 42 s con la caché de Turbopack caliente | 2026-10-07 |
| Rutas prerenderizadas antes de Fase 0 | 233 páginas generadas (225 rutas en `prerender-manifest.json`); la foto `check_rutas_ar` cubre 244 URLs | 2026-10-07 |
| Tiempo de build después de 0.2 (AR en `(ar)`) | 30 a 47 s con `BUILD_CPUS=2` y caché caliente; 233 páginas, tabla de rutas del build idéntica | 2026-10-07 |
| Resultado del spike de ruteo (5 supuestos) | pendiente (0.3) | |
| Tiempo de build al cerrar Fase 1 | pendiente (1.9) | |
