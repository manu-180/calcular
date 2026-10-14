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
- Tipo de campo `hora` (horas-trabajadas usa listas de 96 horarios) y campos condicionales por modo.
- `ui(trato, locale)`: hecho en `claude/mundo-integracion` (receta actualizada).
- Tipado de campos generados en bucle o según unidades (hoy un cast a `Record` en `calcular`).

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
