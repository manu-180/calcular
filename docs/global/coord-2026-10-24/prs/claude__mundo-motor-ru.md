# Motor ruso (ru): núcleo, venta, páginas globales y las 41 universales, primero para Kazajistán

Rama `claude/mundo-motor-ru`, basada en `origin/main` (no depende de ningún motor sin mergear).

## Qué incluye

- **Núcleo.** `ru` en `IDIOMAS`; textos y errores del motor, calculadora, `formato.ts` (unidades con
  one/few/many/other), `src/motor/i18n/plural.ts` (`formaRu`, `pluralRu`), `FormasUnidad` con
  `pocos`/`muchos` en `unidades.ts` y `GRAMATICA.ru`, que declina el nombre del país (genitivo, «в/во/на»
  y «для»: «в Казахстане», «во Франции», «на Кипре», «на Сент-Винсенте и Гренадинах»).
- **Sitio.** `src/motor/i18n/ru.ts`, inicio, legales, compartir, embed, afiliados. El buscador
  indexa cirílico y su contador usa la forma few (`resultadosPocos`: «3 результата»).
- **Páginas globales de main por idioma.** «Tu sueldo en el mundo» (`zarplata-v-mire`), rankings
  (`reyting-stran` con `pokupatelnaya-sposobnost-zarplaty`, `den-nalogovoy-svobody`,
  `skolko-ostaetsya-ot-povysheniya`), horas de trabajo (`skolko-chasov-raboty`), calendario
  (`kalendar-zarplaty`) y sueldos reales (`realnye-zarplaty`), con sus rutas en
  `src/app/(intl)/intl/[mercado]/`, OG con Noto Sans de respaldo y las palabras de período rusas en
  `inferir.ts`.
- **Venta.** `src/lib/pagos/textos/ru.ts`, el diccionario completo (844 líneas: ofertas, informes,
  planillas, mails), y su alta en `IDIOMAS_VENTA`.
- **Universales.** Las 41 en ruso (`textos/ru.ts` y `contenido/ru.ts`), con slugs transliterados
  (`kalkulyator-kredita`, `kalkulyator-ipoteki`, `kalkulyator-nds`, `slozhnye-protsenty`...), cableadas
  con `gen_idiomas_universales` y sus cargadores.
- **Reglas y pruebas.** Reglas del ruso en `scripts/reglas_idioma.ts`: «ты», «Вы» con mayúscula a mitad
  de oración, «ё», letras ucranianas, kazajas o bielorrusas y comillas que no son «». Casos de parseo,
  plurales y gramática en `check_motor`. Mercados de prueba en `check_universales`: ru-KZ con KZT, el
  nombre largo «Сент-Винсент и Гренадины» y «Объединенные Арабские Эмираты». El ruso entra en
  `check_ofertas_intl`.
- **Edición interna `zz-ru`** (Зеталенд, `ru-001`, `estado: "interno"`).
- **Docs.** ADR 0002, D17: por qué Kazajistán sale en ruso primero, con el kazajo como edición futura
  `kz-kk`; registro, escritura, plurales, gramática, formato y slugs. Más una sección en
  `docs/global/ESTADO.md`.

## Decisiones

- **Registro.** Un solo registro, el de Kaspi, Halyk, egov.kz y Сбер: «вы» en minúscula, imperativo
  cortés y botones en infinitivo («Рассчитать»). Los mercados van con `trato: "usted"`.
- **Sin «ё».** Se escribe «е», como en la mayoría de los sitios de servicio. Un check lo controla.
- **Sin rayas.** Las definiciones se reescriben sin la raya copulativa («Ипотекой называют...»).
- **Textos neutrales de país.** Ningún organismo de un solo país, ni «копейка» ni «тиын». La tasa del
  НДС sale del dato del país.
- **Slugs.** Transliteración ASCII simple, la más común en las URLs de la región, en vez del slug en
  inglés. El calendario va en `kalendar-zarplaty` porque `kalendar-vyplat` es la carpeta del ucraniano:
  dos idiomas no pueden compartir carpeta bajo `[mercado]`.
- **«в N странах».** Se arma con `formaRu`, porque con 21, 31, 41 va en singular («в 41 стране»). En las
  plantillas con marcadores, el número va detrás de dos puntos o entre paréntesis.
- **Украина.** Va con «в» («в Украине»).

## Checks (24/10/2026)

- `npx tsc --noEmit -p .`: sin errores.
- `check_i18n`: TODO OK, 30 423 textos en 11 idiomas × 3 tratos.
- `check_motor`: TODO OK, 2 332 pruebas.
- `check_universales`: 41 universales, 4 497 casos probados.
- `check_ofertas_intl`: 15 FALLAS, todas de cl (sueldo-liquido y finiquito, por la UF). Son las conocidas
  de main y están arregladas en `claude/mundo-arreglos-2026-10-24`. El ruso no suma ninguna (46 048
  textos revisados).
- `check_textos_paises zz-ru`: TODO OK, 35 textos, 0 avisos.
- `gen_idiomas_universales --check`: index al día.
- `check_fronteras`: TODO OK, 7 659 archivos.
- `check_eol`: TODO OK, 8 499 archivos en LF.
- `check_calendario`: TODO OK, 91 fechas en 20 ediciones.
- `check_horas`: OK, 32 países, 1 aviso ajeno: AR vence el 2026-10-31.
- `check_rankings`: TODO OK, 3 rankings, 43 países.
- `check_mundo`: TODO OK.
- `check_sueldos`: 15 436 pasadas, 0 fallas.
- `check_paises`: TODO OK, 59 países, 98 avisos ajenos (series de za y otras por vencer).

Saltado: `check-all`, `build`, `check_hreflang` y `check_seo_intl` completos. No se publica ningún
país, así que no corresponden al frente de motor. Sin push ni PR real, porque la cuenta no tiene
permiso.

## Pendientes y riesgos

- **Choques al mergear con `claude/mundo-motor-eu` y `claude/mundo-motor-uk`.**
  - Las tres ramas crean `src/motor/i18n/plural.ts`: hay que dejar `pluralPl`, `formaUk`/`pluralUk` y
    `formaRu`/`pluralRu` juntos.
  - Los cambios a `FormasUnidad`, `formato.ts`, `resultadosPocos` y el cirílico del buscador son los
    mismos en las tres: alcanza con quedarse con una versión.
  - Las listas de `IDIOMAS`, los `Record<Idioma>`, `PAISES` y `cargadores.ts` chocan por la lista.
    Para resolver: regenerar con `check_motor --generar-cargadores` y ajustar las expectativas de
    `hermanas`/`ediciones` de zz en `check_motor`.
- **Kazajistán como país** sigue pendiente (BRIEF-PAIS): ИПН, ОПВ, ВОСМС, aportes del empleador, МРП,
  МЗП, НДС, depósitos con ГЭСВ, «Отбасы», con fuentes oficiales (adilet.zan.kz, kgd.gov.kz, egov.kz,
  nationalbank.kz, stat.gov.kz).
- **Revisión nativa.** Conviene que un hablante nativo revise una muestra de páginas antes de publicar.
- **Dudas de los forks:**
  - El título de hipoteca usa «Ипотечный калькулятор» y el slug es `kalkulyator-ipoteki`.
  - tasa-efectiva escribe «п. п.».
  - calorias escribe «Миффлина-Сан Жеора» con guion corto, porque la regla prohíbe la raya.
- **Marcadores del diccionario de venta.** `{normas}` va tras «в соответствии с», así que el país lo
  escribe en instrumental. `{incluye}` va tras «Содержит», en acusativo.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
