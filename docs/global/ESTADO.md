# Estado: calcularya.com en el mundo

Plan y decisiones: `docs/adr/0002-mundo.md`. Receta de universales: `docs/global/RECETA-UNIVERSAL.md`.
Rama de integración: `claude/global-calculators-multipa-s-dfbec3` (incluye el PR #30 de auditoría).

## Ronda 1 (13/10/2026, en curso)

| Frente | Rama | Archivos que posee |
|---|---|---|
| Idiomas del motor (es pt en fr de it nl) | `claude/mundo-i18n` | `src/motor/{tipos,datos,textos,formato}.ts`, `src/motor/i18n/**`, `ui/{textos-inicio,Legales,NoEncontrada}`, not-found y llms.txt intl, `check_textos_paises`, `check_i18n` |
| Ofertas, informes, planillas y mails por idioma; familias de universales | `claude/mundo-ofertas` | `src/lib/pagos/**` (menos `ventas-intl.ts`), `ui/Oferta.tsx`, `(intl)/**/informes/**`, `(intl)/**/planillas/**` (menos `_compra.tsx`), `src/lib/prefill/intl*`, checks de ofertas |
| Escala e integración de universales | `claude/mundo-escala` | `src/motor/{registro,cliente,paginas,seo,mapa,sitio,hosts}.ts`, resto de `src/motor/ui/**`, `src/app/(intl)/**` (menos informes, planillas y not-found), `api/geo/**`, `src/paises/index.ts`, `universales/cargadores.ts`, `public/banderas/**`, checks de motor, hreflang y ruteo |
| Métricas del panel | `claude/mundo-metricas` | `supabase/migrations` nuevas, `src/lib/{medicion,panel}/**`, `components/panel/**`, `(ar)/dashboard/**`, `api/e/**`, `rastreo*.ts`, `_compra.tsx`, `api/pagos/checkout/**`, `ventas-intl.ts` |
| Universales de finanzas, negocio y sueldo (19) | `claude/mundo-univ-finanzas` | `src/motor/universales/<19 ids>/**`, `universales/finanzas.ts` |
| Universales cotidianas, salud, hogar e IVA (21) | `claude/mundo-univ-cotidianas` | `src/motor/universales/<21 ids>/**`, `universales/cotidianas.ts` |
| Investigación de los países del mundo | `claude/mundo-paises-research` | `docs/global/PAISES.md` |

## Integrado en la rama (14/10/2026)

- Contrato de universales, 40 conceptos, 6 categorías, `check_universales`, `gen_idiomas_universales`.
- **41 universales** en es (tú, usted, vos) y en: 1.157 casos en verde, incluidos mercados con nombre
  de país largo. Frentes cerrados: `claude/mundo-univ-finanzas`, `claude/mundo-univ-cotidianas`.
- `docs/global/PAISES.md`: 199 países, tier 1 = US DE GB IN FR CA AU BR IT ES NL CH ZA BE AT.

## Traducción de universales (en curso)

Un agente por idioma, cada uno crea solo `textos/<idioma>.ts` y `contenido/<idioma>.ts`; el cableado
lo hace `gen_idiomas_universales`: `claude/mundo-trad-{pt,fr,de,it,nl}`. Registro fijo por idioma:
pt «você», fr «vous», de «Sie», it «tu», nl «je».

## Pedidos al motor anotados

- `NOMBRES_UNIDAD` por idioma: hecho; filas, tablas e informe formatean con el locale del mercado.
- Tipo de campo `hora` y campos condicionales (`visibleSi`): hechos en motor 2 (RECETA, sección 7).
  Falta migrar horas-trabajadas de sus listas de 96 horarios a `hora`.
- `ui(trato, locale)`: hecho en `claude/mundo-integracion` (receta actualizada).
- Tipado de campos generados en bucle o según unidades (hoy un cast a `Record` en `calcular`).

## 16/10/2026 23:20 · En main y producción; se retoma la expansión a todo el mundo

PR #31 (y #30) mergeados a main el 16/10 22:36, deploy READY: 38 países, 4 ediciones. Antes del merge
se arreglaron: lakhs en en-IN (`parsearNumero`), prefill intl con null en campos ocultos, tabla del
EMI de India, mes por render en Comercio por horas y `uy.dolar` vencido (hreflang).

Misión de Manuel: todos los países del mundo, cada uno en su idioma, lo más completo posible, con
fuentes citadas y al día, sin frenar. Frentes en curso (cada uno en su worktree y rama):

| Frente | Rama | Agente |
|---|---|---|
| Filipinas | claude/pais-ph | af4a25bad79056aa2 |
| Luxemburgo fr + lu-de | claude/pais-lu | a8551c6c0f34cfe9e |
| Marruecos | claude/pais-ma | a38af4c77ca2794fb |
| Quebec | claude/quebec | a09af92be368a2db8 |
| Motor 3 (ja/ko/zh) | claude/mundo-motor-3 | a2ac60979cc7a480b |
| Emiratos | claude/pais-ae | ab9a66bde237e6a69 |
| Kuwait | claude/pais-kw | a80b3b979be977cdc |
| Pakistán | claude/pais-pk | afc298c5c5529a805 |
| Kenia | claude/pais-ke | ada73c81be98bb517 |
| Costa de Marfil | claude/pais-ci | ab0048b77b06a4135 |
| Angola | claude/pais-ao | a3758a764dbcf8a03 |
| Motor árabe (RTL) | claude/mundo-motor-ar | a69696ff45bde473e |
| Motor pl/sv/da/nb/fi | claude/mundo-motor-eu | a83bcd96f30132acb |

Publicar sigue el procedimiento de la entrada de la pausa. Un PR nuevo contra main por tanda.

## 16/10/2026 19:30 · PAUSA pedida por Manuel · 38 países y 4 ediciones publicados

Publicados desde la última entrada: Nigeria (55) y Malasia (60). Verde con 44 mercados:
check_paises_casos 4282, check_textos_paises 54355, check_hreflang 5664, check_seo_intl 5932.

Frenado de forma segura: ningún agente corriendo, todo commiteado y pusheado. Para retomar, cada frente
tiene su rama y su worktree (`.claude/worktrees/agent-<id>`); con SendMessage al id se retoma con su
contexto, o se lanza un agente nuevo con el encargo de BRIEF-PAIS sobre la misma rama.

| Frente | Rama | Agente | Dónde quedó |
|---|---|---|---|
| Filipinas | claude/pais-ph | af4a25bad79056aa2 | checks finales antes de cerrar |
| Luxemburgo fr + lu-de | claude/pais-lu | a8551c6c0f34cfe9e | 14 locales con casos; falta contenido, lu-de y checks |
| Marruecos (fr) | claude/pais-ma | a38af4c77ca2794fb | 5 locales nuevas por registrar y checks |
| Quebec en ca y ca-fr | claude/quebec | a09af92be368a2db8 | impôt QC, salaire net y taxe de bienvenue hechos; falta CNESST, ofertas TPS/TVQ, detector manual y ESTADO |
| Motor 3 (ja, ko, zh) | claude/mundo-motor-3 | a2ac60979cc7a480b | núcleo hecho; universales en curso (iba por préstamo y tasa efectiva) |
| Emiratos (en) | claude/pais-ae | ab9a66bde237e6a69 | sin código todavía |
| Kuwait (en) | claude/pais-kw | a80b3b979be977cdc | sin código todavía |
| Pakistán (en) | claude/pais-pk | afc298c5c5529a805 | sin código todavía |

Al publicar un país: merge de su rama, `estado: "publicado"` en mercado.ts, import y alta en `PAISES`
(`src/paises/index.ts`), `check_motor --generar-cargadores`, `check_medicion_mercados --escribir`, tsc y
checks (paises, paises_casos, textos_paises, fronteras, eol, hreflang, seo_intl), commit y push.

Pendientes que no dependen de agentes: SQL de métricas (docs/global/SQL-METRICAS.md, pasos 1 y 2, lo
corre Manuel); EPF de Malasia (kwsp.gov.my detrás de Cloudflare, se verifica a mano); `nz.ocr` manual
antes del 2026-12-11.

## 16/10/2026 14:30 · 36 países y 4 ediciones publicados

Hong Kong (en, 60 calculadoras) publicado. Verde con 42 mercados: check_paises_casos 4172,
check_textos_paises 52855, check_hreflang 5434, check_seo_intl 5690. Tercer corte por límite de sesión
del día (10:15); avance guardado como WIP y retomados a las 14:29: Filipinas, Malasia, Nigeria,
Marruecos (fr), Luxemburgo (fr + lu-de), Emiratos (en), Quebec completo (taxe de bienvenue ya hecha) y
motor 3 (ja, ko, zh; universales en curso).

## 16/10/2026 05:45 · 35 países y 4 ediciones publicados

India (57 calculadoras) publicada, con las ediciones ch-fr (62), ch-it (62), ca-fr (53) y be-fr (52).
Verde con 41 mercados: check_motor 1823, check_paises_casos 4076, check_textos_paises 51879,
check_hreflang 5314, check_seo_intl 5564, check_datos_paises 85. dea.gov.in (India) usa la raíz ISRG
Root YR, que Node no trae: se versionó su cruce firmado por ISRG Root X1 en `scripts/datos-paises/certs`
(tlsTolerante suma intermedios, nunca apaga la verificación).

En curso: Filipinas, Hong Kong (en), Malasia (en), Nigeria, Marruecos (fr), Luxemburgo (fr + lu-de),
Quebec completo en ca y ca-fr (impôt QC, CNESST, taxe de bienvenue, ofertas TPS/TVQ, detector manual
para nz.ocr) y motor 3 (ja, ko, zh).

Pedidos al motor anotados por los países: título de la fuente traducible en ediciones (be-fr muestra
el documento en neerlandés).

## 16/10/2026 04:30 · 34 países publicados

Bélgica (nl, 56 calculadoras) publicada. Verde con 36 mercados: check_paises_casos 3737,
check_textos_paises 48544, check_hreflang 4742, check_seo_intl 4962. El límite de sesión cortó a los 8
agentes a las 01:45; avance guardado como WIP en cada rama y retomados a las 04:21: India, Filipinas,
Hong Kong, Malasia, ediciones ca-fr, ch-fr/ch-it y be-fr, y motor 3 (ja, ko, zh).

## 16/10/2026 01:00 · 33 países publicados

Suiza (de, 62 calculadoras) y Singapur (61) publicadas; motor 2 integrado (ediciones de idioma con
`definirEdicion`, marcadores de escalas, semanas, hora, campos condicionales, cargadores en dev,
check_ofertas más rápido; zz-en de prueba). Verde con 35 mercados: check_motor 1645,
check_paises_casos 3670, check_textos_paises 47778, check_hreflang 4632, check_seo_intl 4846.
Hipoteca y alquilar o comprar dicen «deposit» en en-GB/IE/AU/NZ/ZA. IPC de ca y at con margen de
100 días (el de 75 dejaba un hueco cada mes por el atraso de publicación).

Ojo: a la medianoche de Argentina, check_hreflang puede fallar si una serie vence justo entre la fecha
de dos zonas horarias (los clústeres se arman con la fecha de cada mercado). Se ve con
`CALCULAR_HOY=AAAA-MM-DD` fijo.

En curso (retomados a las 00:52 tras un timeout de la API que cortó a todos; avance pusheado):
India, Bélgica (nl, en checks finales), Filipinas, Hong Kong (en), Malasia (en), edición ca-fr
(+ check_ofertas: it/calcolo-tfr y za.bond-calculator; nz.ocr a detector manual), ediciones ch-fr y
ch-it, y motor 3 (`claude/mundo-motor-3`: ja, ko y zh para Japón, Corea, Taiwán y HK en chino).

RBNZ: la página y el xlsx tienen el desafío anti-bots de Cloudflare. No se saltea: `nz.ocr` pasa a
manual.

## Edición ca-fr (`claude/edicion-ca-fr`, interno y sin registrar)

13 calculadoras de `ca` traducidas al francés de Quebec (vous, fr-CA) más las universales en
francés: TPS/TVQ, salario mínimo, RRQ/RPC, cotizaciones y prestaciones de assurance-emploi, costo
empleador (con RQAP), ACE, recuperación de la SV, REER, CELI, inflación, USD/CAD e hipoteca variable.
Por defecto abren en Quebec (región qc, plan RRQ).

**Quebec en `ca` (`claude/quebec`):**
- Impuesto de Quebec en sueldo neto e impuesto a la renta. Usa la tabla 2026, el monto de base y la
  deducción para trabajadores (Finanzas Quebec). Del lado federal suma el abatimiento del 16,5 % (CRA
  T4032-QC), y aplica QPP, EI de Quebec y RQAP. Traducidas en ca-fr (`calcul-salaire-net`,
  `calcul-impot-revenu`).
- Taxe de bienvenue 2026 (Québec.ca) en land-transfer-tax, sin Montreal. Traducida en ca-fr
  (`calcul-taxe-de-bienvenue`).
- Vacances, heures supplémentaires y préavis (LNT) en **borrador**: Légis Québec y la CNESST
  responden 403 a las herramientas (Cloudflare y CloudFront). Hay que abrir la ley en un navegador,
  confirmar los valores de `ca.qc-vacation-pay`, `ca.qc-overtime` y `ca.qc-notice`, pasarlos a
  verificado y publicar las tres calculadoras (ya están traducidas).
- Pendientes:
  - ganancias de capital con Quebec, porque falta verificar la tasa de inclusión de Quebec;
  - las tasas de Montreal en la taxe de bienvenue;
  - créditos de Quebec además del de base (personne seule, âge, revenus de retraite).
- Ofertas fr-CA: la familia de facturación dice TPS/TVQ (`src/lib/pagos/textos/fr-ca.ts`).

## Motor 2 (`claude/mundo-motor-2`, integrado el 16/10/2026)

- **País y edición (ADR 0002, D3):** `definirEdicion(base, {...})` en `src/motor/registro.ts` y
  `definirTextos` en `src/motor/edicion.ts`. Una edición (`ca-fr`) reusa datos, series, avisos y
  detectores del país y escribe solo textos. Edición de prueba: `src/paises/zz-en`. Receta en
  `docs/global/BRIEF-PAIS.md` («Ediciones»). Hreflang entre ediciones (calculadoras, inicio, fuentes y
  novedades), selector con «País (Idioma)», geo por `navigator.languages`, cargadores generados para
  traducciones y `check_paises_casos` que marca textos sin traducir.
- **i18n con locale:** los diccionarios del sitio reciben el locale; de-CH y de-LI sin «ß»; parches
  `regional` por locale para variantes futuras.
- **Marcadores:** `{{serie}}` y `{{serie#desde}}` (la serie tiene que estar en `requiere`), filas de
  escala `{{id[n].tasa|desde|hasta|cuotaFija}}` con `-1` para la última, `#desde` en escalas.
  `check_paises` falla si un marcador no se resuelve hoy.
- **Unidad `semanas`** en los 7 idiomas; campo `region` con subconjunto (`regiones: [...]`).
- **`next dev` calcula en mercados internos** sin publicarlos (`cargadores/dev.ts` +
  `src/paises/cargadores-dev.ts`); producción sigue con los mapas generados.
- **`check_ofertas_intl`** con índice de casos: de 128 s a unos 30 s en esta máquina.
- **`nz.ocr`:** el RBNZ está detrás del desafío anti-bots de Cloudflare (`cf-mitigated: challenge`)
  y no se saltea. El motor no tiene vía para series manuales (`metodo: "manual"` es solo una etiqueta;
  el detector igual corre). Queda así: el semáforo (`scripts/datos-paises/semaforo.ts`) avisa desde 30
  días antes del vencimiento (2026-12-11) y el punto nuevo se carga a mano en `src/paises/nz/series.json`
  después de cada decisión del RBNZ. Pedido al motor: que un detector `manual` no corra y figure como
  «carga manual» en el resumen del cron.

## 14/10/2026 23:30 · 31 países publicados

Nueva Zelanda (60 calculadoras) y Sudáfrica (60) publicadas. Verde con 32 mercados: check_motor 1559,
check_paises_casos 3487, check_textos_paises 45680, check_hreflang 4345, check_seo_intl 4544.

El límite semanal cortó a los demás a las 18:00; avance pusheado y retomados a las 23:30: motor 2,
India (solo había investigado, sin código), Singapur, Suiza (de, en verificación final) y Bélgica (nl,
WIP `7315719`). Nuevos: Filipinas (`claude/pais-ph`) y Hong Kong en inglés (`claude/pais-hk`).

Pendientes de los países:
- `nz.ocr`: detector `manual` (el cron no lo corre; el semáforo avisa 30 días antes). Vence el 2026-12-11.
- `za`: los marcadores de series ya existen (`{{za.prime-rate}}`). IPC y prime vencen el 2026-11-13 si el cron no corre.
- Universal hipoteca dice «Down payment»; en NZ se dice «deposit».
- Montos escritos a mano en escalas y FAQ de nz y za: revisar en abril y marzo de 2027.

## 14/10/2026 17:30 · 29 países publicados · PR borrador #31

| País | Calculadoras | | País | Calculadoras |
|---|---|---|---|---|
| Estados Unidos | 63 | | Canadá (en) | 61 |
| Reino Unido | 61 | | Países Bajos | 63 |
| Brasil | 63 | | Irlanda | 61 |
| Francia | 60 | | Austria | 62 |
| Alemania | 67 | | Portugal | 62 |
| España | 59 | | Australia | 59 |
| Italia | 57 | | 16 de Latinoamérica | ~80 cada uno |

Verde con 30 mercados (con global y zz): check_motor 1516, check_paises_casos 3319, check_textos_paises
43893, check_hreflang 4105 páginas, check_seo_intl 4292 páginas, check_universales 2660 casos, eol.
Integrado también el pulido (`claude/mundo-pulido`): es-ES, pt-PT, fr-CA, de-CH, redondeo, «1er» en fr.

En curso (retomados a las 17:21 tras el tercer corte por límite de uso, con el avance guardado como
WIP en cada rama): motor 2 (`claude/mundo-motor-2`: ediciones de idioma, marcadores de series y
escalas, semanas, cargadores en dev, check_ofertas más rápido), India, Singapur, Sudáfrica, Suiza (de),
Nueva Zelanda y Bélgica (nl).

Procedimiento ante un corte por límite: en cada worktree de agente, `git checkout -- src/paises/index.ts`
(registro local de prueba), commit WIP de `src`/`scripts`, push de la rama y SendMessage para retomar.

## Hoy (14/10/2026 08:50) · PR borrador: https://github.com/manu-180/calcular/pull/31

| País | Calculadoras | Rama |
|---|---|---|
| Estados Unidos `us` | 63 (23 locales + 40 universales) | `claude/pais-us` |
| Reino Unido `gb` | 61 (21 + 40) | `claude/pais-gb` |
| Brasil `br` | 63 (23 + 40) | `claude/pais-br` |
| Francia `fr` | 60 (20 + 40) | `claude/pais-fr` |
| Alemania `de` | 67 (27 + 40; Grunderwerbsteuer en borrador) | `claude/pais-de` |
| España `es` | 59 (19 + 40) | `claude/pais-es` |
| Italia `it` | 57 (17 + 40) | `claude/pais-it` |
| 16 de Latinoamérica | ~80 cada uno (1.246 en total) | `claude/mundo-integracion` |

Todos publicados e integrados. Verde con 24 mercados: check_motor 1382, check_paises_casos 2764,
check_textos_paises 37545, check_seo_intl 3520 páginas, check_hreflang, check_universales, check_eol.

En curso: pulido de universales y motor (`claude/mundo-pulido`: es-ES, pt-PT, fr-CA, de-CH, redondeo,
fechas fr, bloque de fuentes traducido), y los países nl au ca pt at ie.

Pendientes conocidos:
- España: pisar slugs de universales con vocabulario peninsular cuando entre el pulido.
- Ediciones con dos idiomas (ca-fr, ch-fr, be-fr): el registro todavía no tiene País/Edición.
- Marcador para series y para filas de una escala; unidad «semanas».

## Retomado (14/10/2026 02:27)

Integrados: escala (`claude/mundo-escala`) y métricas (`claude/mundo-metricas`), con cargadores
regenerados y el check del flujo de ofertas ajustado (el checkout intl se registra siempre; la fila no
lleva datos sin la casilla). Verdes: tsc, check_motor (1020), check_paises, check_paises_casos (2166),
check_i18n, check_universales, check_hreflang, check_seo_intl, check_panel_sql, check_metricas_mundo,
check_rastreo, check_pagos, check_flujo_ofertas_intl, check_fronteras, check_eol. check_ofertas_intl
solo falla por la UF de Chile en planillas viejas (artefacto que regenera el build).

En curso:

| Frente | Rama |
|---|---|
| Pedidos cruzados, global en inglés, universales en LATAM, `ui(trato, locale)` | `claude/mundo-integracion` |
| Traducción de las 19 de finanzas | `claude/mundo-trad-{pt,fr,de,it,nl}` |
| Países tanda 1 (encargo: `docs/global/BRIEF-PAIS.md`) | `claude/pais-{us,gb,de,fr,br}` |

Siguiente tanda de países: es it nl ca au at ch be in za pt ie nz.

**14/10 03:50 a 07:20:** las 41 universales quedaron en los 7 idiomas (1992 casos, integradas en
efd6636). A las ~03:55 el límite de uso de la sesión cortó a los 11 agentes; a las 07:21 se guardó
como WIP lo que había sin commitear (us, de, fr, br, es), se pushearon todas las ramas y se retomaron
integración, us, gb, de, fr, br, es e it. nl (`claude/pais-nl`), au y ca quedan para la tanda siguiente:
sus agentes no habían escrito nada. Correr menos agentes Opus en paralelo para no volver a tocar el
límite de golpe.

## Pausa y cómo retomar (14/10/2026 00:45, pedida por Manuel)

Todo commiteado y pusheado. Integrado en esta rama: contrato, 41 universales (es, en), PAISES.md,
**i18n del motor** (`claude/mundo-i18n`, 7 idiomas, `check_i18n` verde) y **ofertas por idioma**
(`claude/mundo-ofertas`, 19 familias nuevas, textos en 7 idiomas). Checks verdes tras integrar:
tsc, check_i18n, check_universales (41, 1157 casos), check_fronteras, check_eol.

| Frente pausado | Rama · último commit | Qué falta |
|---|---|---|
| Escala | `claude/mundo-escala` · 566770c (verde, 8 de 9 puntos) | integrar; punto 9 (global en inglés) ya destrabado por i18n (datos.ts acepta IDIOMAS) |
| Métricas | `claude/mundo-metricas` · f832241 (WIP, casi todo hecho) | revisar 2 fallas de `check_flujo_ofertas_intl` (probable: el checkout intl ahora se registra siempre, `api/pagos/checkout/route.ts`); commit final; Manuel corre `docs/global/SQL-METRICAS.md` pasos 1 y 2. Arregló un bug grave: `/api/e` descartaba todo evento con producto intl, así que hoy no se mide ningún clic de oferta de calcularya |
| Traducción pt | `claude/mundo-trad-pt` · 7af11db | 19 de finanzas |
| Traducción fr | `claude/mundo-trad-fr` · 4623cb6 | 19 de finanzas; su script de tipografía fr (`tipo_fr.py`) vivía en su scratchpad |
| Traducción de | `claude/mundo-trad-de` · b8e382c | 19 de finanzas; «ß» en `ui()` para de-CH |
| Traducción it | `claude/mundo-trad-it` · a941bb7 | 18 de finanzas (prestamo hecha); creó `universales/comun/italiano.ts` |
| Traducción nl | `claude/mundo-trad-nl` · b191f0e | 17 de finanzas; prestamo y tasa-efectiva sin verificar |

**Orden al retomar:**
1. Integrar `claude/mundo-escala` (conflictos esperables en `src/motor/ui/**` e i18n: gana i18n en
   diccionarios, escala en estructura). Correr tsc y todos los checks del motor.
2. Pedidos cruzados pendientes:
   - escala → i18n: claves `shell.menu.vida` (es «Vida diaria», en «Everyday») y `pais.irASeccion`;
     sacar textos provisorios de `menu.ts` e `Inicio.tsx`.
   - i18n → UI: `AvisoPais.tsx:40`, `SelectorPais.tsx:42`, `Sello.tsx:36` con idioma fijo;
     `metadatos.ts:72` y `og/[[...slug]]/route.tsx:103` a `paginasLegales(idioma, trato, locale)`;
     `validar.ts:57` aceptar ids del país de una edición (`paisDelMercado`).
   - i18n → ofertas: regex `^[a-z]{2,6}$` de `catalogo-intl.ts:34` y `:363` a `RE_CODIGO_MERCADO`.
   - ofertas → universales: prestamo, hipoteca, interes-compuesto, tarjeta-de-credito declaran `tablas`
     (verificar que ya lo hacen); tarjeta: campo del pago llamado `pago|pagoMensual|cuota`.
   - ofertas/escala → informe: `_informe-vivo.tsx` tiene que cargar universales con `cargarUniversal`.
   - métricas → `_compra.tsx`: `textos={textosTarjeta(m.idioma, m.trato).aviso}` en `<AvisoPronto>`.
   - `ui()` de universales sin locale (decimales, «ß» de-CH, variantes pt-PT): pasar `locale` a `ui`.
3. Prender global en inglés (`src/paises/index.ts`: «Worldwide», en, en).
4. Integrar métricas.
5. Retomar los 5 traductores (SendMessage a cada uno o agentes nuevos con su rama) con las 19 de
   finanzas; integrar con `git merge -X ours` y `npx tsx scripts/gen_idiomas_universales.ts`.
6. Encargo de país global (docs/global/BRIEF-PAIS.md, nuevo) y tanda 1: US GB CA AU (en), DE AT CH
   (de), FR BE (fr), IT, NL, ES, BR PT. Cada país: `universales: "todas"` + iva con su tasa verificada
   + calculadoras locales verificadas.
7. Sumar `universales: "todas"` a los 16 países LATAM.

## Próximo

Ronda 2: integrar las ramas de la ronda 1, traducir universales a pt fr de it nl, País y edición
(países con varios idiomas), y la primera tanda de países (tier 1 de `docs/global/PAISES.md`).
