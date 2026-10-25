# Motor árabe (rtl): ar en el motor, el sitio, el mundo y la venta

Rama `claude/mundo-motor-ar`, último commit `778db5db`. Se basa en `origin/main` (mergeado el 24/10). No depende de otra rama sin mergear.

## Qué incluye

`ar` entra en `IDIOMAS` y queda listo para que un agente de país escriba un país o una edición árabe (eg, sa, ae-ar, kw-ar...). Decisiones en ADR 0002, D10 (D9 es del motor europeo).

- Núcleo (WIP anterior, retomado y cerrado): textos del motor y errores, parseo de dígitos arábigo-índicos y persas con ٫ ٬ y «،», plurales de seis formas (`FormasAr`, `pluralAr`), unidades con dual, gramática (idafa, «في», «ل»), diccionario del sitio, inicio, novedades y legales.
- Dirección: `dir` y `lang` en `<html>` según el idioma, etiqueta base del locale en lang/hreflang/og:locale/inLanguage, Noto Sans Arabic por next/font (solo con texto árabe), sin letter-spacing en árabe, CSS con propiedades lógicas, flechas espejadas.
- De este cierre:
  - Merge de main y entradas ar en los diccionarios nuevos de main: compartir, embed, «Tu sueldo en el mundo» (slug `rawatib-alalam` con su carpeta de ruta).
  - `estilos-mundo.css` (de main) pasado a propiedades lógicas; el segmento mes/año y los empujones de hover van al revés en rtl.
  - Diccionario de venta `src/lib/pagos/textos/ar.ts` (29 familias, tarjeta, aviso, planilla, informe, catálogo, planillas, mails) y alta en `IDIOMAS_VENTA`.
  - Carta del informe: el monto va en `<bdi>`. Mail con `dir="rtl"` en `<html>` y en la tabla del contenido.
  - hreflang de ediciones y del mundo con la etiqueta base del locale (antes salía `ar-EG-u-ca-gregory-nu-latn`; arreglaba 28 fallas de zz-ar en check_hreflang).
  - «US$» y «HK$» en rtl: LRM detrás del símbolo latino (`simboloLegible` en `i18n/direccion.ts`), visto en next dev como «$US 2,849». Lo usan formatearMoneda, el mundo y el prefijo del campo de moneda. En ltr la salida no cambia.
  - Checks: check_ofertas_intl con ar (trato usted, reglas árabes, dir del mail); check_i18n acepta `{n}` en las unidades con dual; regla del tatweel afinada (vale en «بـ7» «لـ «x»» «الـ7»); dos casos nuevos en check_motor.
  - ADR 0002 D10 y entrada en `docs/global/ESTADO.md`.

## Decisiones

- Registro: árabe estándar moderno de banco y gobierno (Golfo y Egipto), segunda persona en masculino genérico (lo que ya decidió el WIP); impersonal donde se puede. Excepciones: la carta del informe en primera persona formal y la familia de embarazo en femenino (خذي، اسألي), como los sitios de salud árabes.
- Cifras: dígitos occidentales en todos los mercados árabes (`-u-ca-gregory-nu-latn`), como la banca en línea de Arabia Saudita, Emiratos y Egipto. El parser acepta igual los arábigo-índicos que escribe un teclado árabe. Calendario gregoriano.
- Slugs: universales con el slug en inglés del catálogo (como D8); locales igual, o transliteración simple; el mundo con `rawatib-alalam`.

## Checks (24/10)

- `npx tsc --noEmit -p .`: OK
- `check_i18n`: TODO OK, 19644 textos en 11 idiomas × 3 tratos
- `check_motor`: TODO OK, 2292 pruebas
- `check_universales`: 41 universales, 3996 casos ✓
- `check_ofertas_intl`: textos 46048 revisados OK; 15 FALLAS, todas de cl (12 de sueldo-liquido y 3 de finiquito, planilla contra calculadora con la UF del día). Ninguna toca ar.
- `check_textos_paises zz-ar`: TODO OK, 34 textos, 0 avisos
- `gen_idiomas_universales --check`: al día
- `check_fronteras`: 7510 archivos OK · `check_eol`: OK
- Además: `check_mundo` OK, `check_embed` OK (59 mercados), `check_seo_intl` OK (7522 páginas), `check_paises` OK (59 países, 98 avisos).
- `check_hreflang`: las fallas que quedan son del clúster de inflation-calculator (kw, nz y otros, en interno y producción). Aparecen igual sin los cambios de esta rama (928 contra 900 después del arreglo): dependen de las series de IPC y no son de este frente.

## Revisión visual (next dev, 24/10)

zz-ar en el inicio, la calculadora y «Tu sueldo en el mundo»: dir rtl, logo y menú a la derecha, flechas hacia la izquierda, formulario y FAQ alineados a la derecha, grilla de días del mundo llenándose de derecha a izquierda, segmento mes/año correcto. Encontrado y arreglado ahí: «$US» por «US$».
No se pudo ver el resultado ni la oferta de una calculadora en dev: en este worktree `node_modules` es una junction y Turbopack la rechaza («points out of the filesystem root»); con webpack o con un `turbopack.root` temporal (no commiteado) los mercados internos no cargan la calculadora (`import.meta.glob` de `cargadores-dev.ts`). Pasa igual en zz-en, no es del árabe. La página del informe y la de planillas no se vieron en el navegador (necesitan compra); usan `estilos-oferta.css`, ya en propiedades lógicas, y la carta está cubierta por el `<bdi>`.

## Pasos saltados

- Ninguno por credenciales. No hubo push ni PR (sin permiso de escritura).

## Pendientes y riesgos

- Dependencia: las 41 universales en árabe son de `claude/mundo-trad-ar`. Hasta que entren, zz-ar y cualquier mercado árabe muestran solo sus calculadoras locales. `check_universales` ya prueba eg, sa y ma-ar.
- Revisión por hablante nativo del árabe antes del primer país (sitio, venta y legales).
- Mirar en producción, con un país árabe real, el resultado de una calculadora, la tarjeta de oferta, el informe impreso y el mail en Gmail y Outlook.
- `src/paises/index.ts` va a chocar con otras ramas por zzAr en `PAISES` (se resuelve agregándolo después de zzJa).

## Puesta al día con main 7d190a68 (24/10, tarde)

Merge de `origin/main` en 7d190a68 (bb530d7a y un commit más: calendario laboral y fiscal con .ics,
«¿Cuántas horas de trabajo cuesta?», rankings con kit de prensa y datos abiertos, «Sueldos reales»,
afiliados, «Tu sueldo en el mundo» en calcular.ar y medición de fugas). Último commit de la rama:
`7d9ed77b`.

- `59871791` merge: conflictos en check_hreflang (imports de los dos lados), el layout intl (`lang`
  con `etiquetaIdioma` y `dir` de esta rama, más `suppressHydrationWarning` y `ScriptExperimentos` de
  main) y `mundo/ui/seo.ts` (el hreflang a calcular.ar de main con la etiqueta base del locale).
- `aedb0067` diccionarios ar de calendario, horas, rankings, sueldos reales y afiliados, en el registro
  de D10. Slugs transliterados como `rawatib-alalam`: `taqwim-alrawatib`, `saat-alamal`,
  `tartib-alduwal`, `rawatib-haqiqiya` (rankings de adentro en inglés, como ja, ko y zh). La cuenta
  regresiva del calendario manda una plantilla por categoría de plural en los idiomas con más de dos
  formas (el árabe: بعد يومين، بعد 3 أيام، بعد 11 يومًا); en los demás el HTML no cambia. hreflang e
  inLanguage de las páginas nuevas con la etiqueta base (`ar-EG`). check_rankings prueba `empate()` con
  3 en árabe (el dual dice el 2 con la palabra).
- `fc0c2cec` rtl en las hojas nuevas (propiedades lógicas, barras que se llenan desde la derecha,
  empujones de hover espejados). La barra de rango de «Sueldos reales» queda de izquierda a derecha a
  propósito (eje de montos).
- `f534211a` zz-ar pasa a `ar-001-u-ca-gregory-nu-latn`, el mismo cambio línea por línea que bed8874b
  de `claude/pais-eg` (con ar-EG chocaba con Egipto en hreflang en modo interno).
- `5cf996c6` coma árabe: la portada del país decía «...لإجمالي الجمهورية, في 24 أكتوبر» porque
  DatosVivos pegaba serie y fecha con una coma latina en el JSX (los diccionarios del sitio y del
  inicio en árabe no tienen ninguna). `coma()` y `puntoYComa()` en `direccion.ts`, usadas también en
  novedades, calendario, horas, oferta, informe y la frase de posición de los rankings.
  `reglas_idioma` atrapa ahora también la coma latina delante de una letra árabe («Zetaland, في»).
- `7d9ed77b` ADR 0002 D10 y ESTADO con las páginas nuevas y los slugs.

### Checks de la puesta al día

- `npx tsc --noEmit -p .`: OK
- `check_i18n`: TODO OK, 30405 textos en 11 idiomas × 3 tratos
- `check_motor`: TODO OK, 2292 pruebas
- `check_universales`: 41 universales, 3996 casos ✓
- `check_ofertas_intl`: textos 46048 revisados OK; 15 FALLAS, las de siempre de cl (UF), ajenas.
- `check_textos_paises zz-ar`: TODO OK, 33 textos, 0 avisos
- `gen_idiomas_universales --check`: al día · `check_fronteras`: 7578 archivos OK · `check_eol`: OK
- `check_calendario`: 91 fechas en 20 ediciones, .ics válidos · `check_horas`: 32 países, 1 aviso (AR
  vence el 31/10) · `check_rankings`: 3 rankings, 344 filas, 43 países · `check_sueldos`: 15436
  pasadas, 0 fallas · `check_mundo`: OK · `check_embed`: 59 mercados · `check_seo_intl`: 7522 páginas
  · `check_paises`: 59 países, 98 avisos · `check_paises_casos`: 4963 casos
- `check_hreflang`: 1242 fallas, todas del clúster de inflation-calculator (kw, be-fr, lu y otros);
  ninguna de zz-ar ni de las páginas nuevas. Es la falla conocida de main (arreglada en
  `claude/mundo-arreglos-2026-10-24`); sube contra las 928 de antes porque main sumó mercados.
- `check-all`: 151/155 suites verdes. Fallan check_hreflang y check_ofertas_intl (las de arriba),
  check_panel_sql (18 fallas: las tablas y funciones `ca_sueldos_*` de «Sueldos reales» que trajo main
  no están en la lista esperada del check) y check_mes_en_render (11 avisos en páginas de `(ar)`: el
  análisis por nombre confunde `resolver()` de los diccionarios con el `resolver()` de
  `sueldo-en-el-mundo/mundo-ar.tsx`, que llega a la grilla del mundo). Las cuatro vienen de main.

### Pendientes nuevos

- Las imágenes OG de calendario, horas, rankings y sueldos (como la del mundo) no cargan fuente árabe
  ni dan forma rtl en Satori: en una edición árabe salen con la fuente por defecto. Queda para cuando
  se publique el primer país árabe.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
