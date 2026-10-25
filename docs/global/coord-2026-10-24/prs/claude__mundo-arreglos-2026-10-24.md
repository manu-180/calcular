# Arreglos transversales del motor: hreflang por zona, planilla de cl, portugués europeo y montos de 3 decimales

Rama `claude/mundo-arreglos-2026-10-24`, desde `origin/main` (`f228b37c`). No depende de ninguna rama sin mergear.

## Qué incluye (un commit por arreglo, la causa explicada en cada mensaje)

1. **check_hreflang rojo (900 fallas, clúster de inflación)**. Causa: `registro.pagina()` y el sitemap armaban los equivalentes con la fecha del mercado de la página para todos los mercados. Por la tarde en América, au, nz, sg, hk, my y ph ya están en el 25/10, y `ni.ipc` (último punto julio 2026, máximo 115 días) vence justo el 25/10. Desde esas seis páginas Nicaragua salía del clúster y desde las demás no. Arreglo: `vigencia.fechasDesde(mercado, fecha)` evalúa a cada mercado en su propia fecha (la de la página corrida por la diferencia de zonas; con `CALCULAR_HOY` todos dan la misma, como antes). Lo usan `pagina()` y `mapa.alternosEnSitemap`, igual que ya hacía `/api/geo/equivalentes`. No tapa series vencidas: una serie que vence sale del clúster en todas las páginas a la vez, el día de su mercado. Prueba nueva en check_hreflang con un instante fijo.
2. **check_ofertas_intl rojo (15 fallas de cl)**. Causa: el check cargaba los datos sobre la copia del repo de `private/intl/cl/sueldo-y-liquidacion-2026.xlsx`, que guarda la UF del día en que se regeneró (41.199,86 contra 41.210,47 de hoy). Los topes en UF (tope imponible y 90 UF de la indemnización) daban otro número que la calculadora. No es una diferencia real: en CI y en producción el archivo nace del prebuild. Arreglo: el check usa la planilla que arma `construirPlanilla()` en memoria (los mismos bytes del prebuild). No se commitea un .xlsx regenerado (se vencería con el próximo punto de la UF).
3. **Portugués europeo para la lusofonía**. `esPortuguesEuropeo(locale)` y `variantesDeLocale(locale)` en `src/motor/i18n/variantes.ts`: todo `pt-*` menos `pt-BR` (pt-PT, pt-AO, pt-MZ, pt-CV, pt-GW, pt-ST, pt-TL) toma los parches con clave `"pt-PT"`. Lo aplican el resolver (todos los diccionarios del motor), legales, `conVariantes`, `contenidoConVariantes` y los 35 contenidos pt de las universales. Lo propio de Portugal (IRS, IMI, IMT, IUC, PPR, Segurança Social, duodécimos) se pisa con la clave `PT_LUSOFONIA` en palabras de cualquier país lusófono (mundo y 6 universales). Checks: mercado de prueba pt-AO en check_universales con el vocabulario de pt-PT y uno de la lusofonía; check_i18n revisa pt-PT y pt-AO como idiomas, la tabla de verdad de la función y que pt-AO y pt-MZ no salgan como Brasil. Regla nueva en RECETA-UNIVERSAL.
4. **Montos de monedas de 3 decimales** (pedido del agente de Túnez). Causas: la regla de miles ambiguos rechazaba «1544,136» (fr-TN) y «1544.136» (en-KW), que es justo lo que escribe el prefill; el valor inicial se recortaba a 2 decimales; los dígitos arábigo-índicos de ar-KW, ar-BH, ar-OM y ar-JO no se leían; y los puntos del símbolo («د.ك.») dejaban el número terminado en punto. Arreglo: `parsearNumero` recibe los decimales de la moneda del campo (con 3 no corre la regla de miles ambiguos), lee dígitos arábigos y persas con «٫» y «٬», y saca los puntos pegados a letras o a «/» («د.ك.», «S/.», «B/.»); el valor inicial de un campo de moneda usa los decimales de la moneda. Casos en check_motor para fr-TN TND, ar-KW, ar-BH, ar-JO y en-KW KWD, más la ida y vuelta del formulario.

## Checks

Todos en verde en la rama (24/10, tarde de Argentina, cuando au, nz, sg, hk, my y ph ya estaban en el 25/10):

- `npx tsc --noEmit -p .`: sin errores.
- `check_hreflang`: TODO OK, 7284 páginas en los dos modos (antes: 900 fallas). Con `CALCULAR_HOY=2026-10-25`: TODO OK, 7282 (la de inflación de ni sale en todos los clústeres a la vez).
- `check_ofertas_intl`: TODO OK (antes: 15 fallas de cl).
- `check_i18n`: TODO OK, 21015 textos en 10 idiomas × 3 tratos (con pt-PT y pt-AO como idiomas).
- `check_universales`: 41 universales, 4163 casos, con el mercado de prueba pt-AO.
- `check_motor`: 2309 pruebas.
- `check_paises_casos`: 4956 casos en 1263 archivos.
- `check_eol`: TODO OK.
- `check-all`: 150/150 suites verdes. Se corrió como en CI: `gen_planilla_todas` antes (los .xlsx regenerados se descartaron después, no se commitean).

Último commit: `05971bfa` (alinea `formato.ts` con `claude/mundo-motor-ar`; check_motor, check_paises_casos y check_ofertas_intl de kw se repitieron después de ese commit).

## Datos

- `ni.ipc`: no hay dato nuevo. El INIDE no publicó el IPC de agosto 2026 al 24/10 (su página del IPC lista hasta julio, publicado el 10/9; los meses anteriores salían a las dos o tres semanas). El BCN tiene un bloqueo anti-bots (Radware) y no se intentó saltear. La calculadora de inflación de Nicaragua sale de publicación el 25/10 en todos los clústeres a la vez, que es lo correcto. Pendiente: cargar agosto cuando el INIDE lo publique (el cron no lee XLS: va a mano, cuadro 2-1-06).
- `kw.cpi`: vence alrededor del 31/10 (último punto con 120 días de margen). No tiene detector; las fuentes del CBK respondieron con forma inesperada en la corrida del 24/10. Pendiente.
- `us.cpi-u`: último punto agosto 2026 (100 días). La API del BLS respondió 503 («The BLS website is busy») en la corrida del 24/10. Pendiente reintentar antes de que venza.

## Riesgos y merge

- `src/motor/formato.ts` choca con `claude/mundo-motor-ar` (sin mergear), que también agrega `aLatino` para dígitos árabes. El bloque se alineó con el de esa rama para que la resolución sea elegir una de las dos versiones; lo nuevo de acá es la opción `decimales` y `sinPuntosDeSimbolo`.
- `scripts/check_universales.ts` y `scripts/check_i18n.ts` suman casos: si otra rama agrega mercados de prueba en el mismo lugar, el conflicto es de líneas vecinas.
- Sin credenciales: no hubo push ni PR (se deja este cuerpo).

## Puesta al día con main 286ecb06

`git merge origin/main` (286ecb06, con calendario, horas, rankings, sueldos reales, afiliados y medición): merge `ea0c741e` sin conflictos. En main fallaban 4 suites; tras el merge, dos se arreglan solas con lo que ya traía la rama y dos necesitaron un commit cada una.

1. **check_hreflang** (en main, 1.200 a 1.900 fallas en el clúster de inflación). Lo cubre `fechasDesde` de esta rama: las páginas nuevas de main arman sus clústeres por su lado (mundo, rankings, horas y calendario, que evalúa cada edición con `hoyEn(m)`) y check_hreflang ya las recorre. Resultado: TODO OK con 8244 páginas en los dos modos; con `CALCULAR_HOY=2026-10-25`, 8242; con `CALCULAR_HOY=2026-10-26`, 8238 (la diferencia son series que vencen y salen de todos los clústeres a la vez).
2. **check_ofertas_intl** (15 fallas de cl en main): TODO OK tras el merge, con la planilla armada en memoria de esta rama.
3. **check_panel_sql** (18 fallas en main), commit `968dade2`. Causa: el chequeo estático esperaba las 13 tablas de medición, buscaba el RLS solo como sentencia literal (`ca_sueldos_endurecer` lo aplica en un bucle `foreach ... execute format(...)`) y admitía security definer y grants a anon solo para el panel. Las migraciones están bien (check_sueldos prueba en PGlite que anon y authenticated no leen ni ejecutan nada). Arreglo en el check, sin tocar migraciones: 19 tablas; RLS enable y force aceptados también desde ese bucle (el cuerpo tiene que ejecutar exactamente el `alter table ... row level security`); security definer permitido en `ca_vincular_compras` y en seis funciones de sueldos con nombre; los grants a anon se revisan sentencia por sentencia y solo se exceptúan `ca_sueldos_dos_cifras` (redondeo puro, la misma excepción de check_sueldos) y `ca_sueldos_agregados` mientras una migración posterior la borre. No hizo falta migración nueva. Resultado: 519 ok, 0 fallas.
4. **check_mes_en_render** (11 páginas de (ar) en main), commit `7e7de837`. Causa: el grafo de llamadas iba por nombre, y el `resolver()` de `sueldo-en-el-mundo/mundo-ar.tsx` (que llega al reloj por `grilla() > grillaMundo() > informeMundo()`) contagiaba al `resolver()` de los diccionarios, y con él a `textosMundo`, `textosSueldos`, `textosCalendario` y los `textosDe` homónimos. Arreglo: cada función es «archivo#nombre» y cada llamada se resuelve donde está escrita (función del mismo archivo, después el import con alias, `import * as`, re-exports y `export *`). Lo que no se puede resolver así (métodos `obj.f()`, funciones por parámetro) sigue por nombre, así que el check no se afloja donde no puede probar a quién se llama. Probado con un archivo temporal en (ar): sigue marcando `hoyAR()` con alias, `H.periodoActualAR()`, `grillaMundo()` transitivo, una función local que lee el reloj, `Date.now()`, `obj.vigenteEn()` y un `resolver()` local con reloj; ya no marca `textosMundo()`. Resultado: 724 archivos, 585 funciones que dependen de hoy, ninguna a nivel de módulo.

Checks después de la puesta al día:

- `npx tsc --noEmit -p .`: sin errores.
- `check_eol`: TODO OK.
- `check-all`: **155/155 suites verdes** (24/10 a la noche de Argentina). Las cuatro suites de arriba corrieron con los dos commits de arreglo ya aplicados. Sin `gen_planilla_todas` previo (check_ofertas_intl ya no depende de las planillas del repo).

Último commit: `968dade2`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
