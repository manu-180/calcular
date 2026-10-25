# motor uz: uzbeko latino completo (núcleo, venta, módulos de main y las 41 universales)

Rama `claude/mundo-motor-uz`, basada en `origin/main` (bb530d7a). No depende de ningún motor sin mergear. Último commit: d5bef51d.

## Qué incluye

- **Núcleo**: `uz` en `IDIOMAS`; textos y errores del motor, calculadora, unidades sin plural detrás de número («3 kun», «1,5 yil»).
- **Gramática**: `GRAMATICA.uz` usa genitivo -ning, locativo -da y «uchun» suelto, pegados al nombre sin apóstrofo («Oʻzbekistonda», «Kongo Demokratik Respublikasida»).
- **Sitio**: sitio, inicio, legales (con el bloque de «Sueldos reales» que main sumó), compartir, embed y «Tu sueldo en el mundo» (`mamlakatlar-boyicha-ish-haqi`, con su ruta y su OG).
- **Módulos que main sumó después de la base del modelo tr**, que TypeScript exige para un idioma nuevo: horas de trabajo (`necha-soatlik-mehnat`), rankings (`mamlakatlar-reytingi`), sueldos reales (`haqiqiy-maoshlar`), calendario (`ish-haqi-kalendari`) y afiliados, con sus carpetas de ruta.
- **Venta**: `src/lib/pagos/textos/uz.ts` con todas las familias (informe-calculo incluida), informes, planillas y mails. `IDIOMAS_VENTA` y `check_ofertas_intl` llevan uz en «usted».
- **Universales**: las 41, textos y contenido, con slugs en uzbeko latino ASCII (`kredit-kalkulyatori`, `ipoteka-kalkulyatori`, `qqs-kalkulyatori`, `foiz-hisoblash`...). El cableado lo hizo `gen_idiomas_universales` y los cargadores están regenerados.
- **Edición de prueba**: `zz-uz` (Zetalend, `uz-001`), interna. `check_motor` suma casos de parseo uz-UZ, unidades, soʻm y gramática.
- **Reglas** (`scripts/reglas_idioma.ts`): oʻ y gʻ con U+02BB, tutuq con U+02BC, nada de cirílico mezclado, nada de exclamaciones y ninguna forma de «sen».
- **check_universales**: mercados de prueba uz-UZ con UZS, «Sent-Vinsent va Grenadin» y «Kongo Demokratik Respublikasi».
- **Buscadores** (índice, selector de país, mundo, embed): comparan sin «ʻ» ni «ʼ» y aceptan «o'» y «g'» escritos con el teclado.
- **Imágenes OG** de mundo, horas, rankings, calendario y sueldos: piden Noto Sans de respaldo en uz, porque Geist no trae el glifo U+02BB (lo comprobé contra Google Fonts).
- **Documentación**: ADR 0002 D16 (D9 a D15 ya los usan otras ramas) y una sección en `docs/global/ESTADO.md`.

## Decisiones

- **Escritura**: latina oficial. Intl de Node (ICU 78) tiene datos de uz. `Intl.NumberFormat("uz-UZ")` da «1 234 567,50 soʻm», con U+00A0 de separador de miles y U+02BB en el nombre de la moneda, y «12%». Lo uso tal cual. La fecha larga sale «24-oktabr, 2026».
- **Registro**: único, «Siz» con las formas corteses, como en soliq.uz, my.gov.uz y Kapitalbank. Los mercados van con `trato: "usted"`. El botón principal dice «Hisoblash».
- **Sufijos**: ninguno se pega a cifras, a interpolaciones ni a marcadores. Uso «{fecha} sanasigacha», «{n} ta mamlakat» y «15 foizdan».
- **Ruso**: no se hizo. Si se decide, va como edición aparte.

## Checks

- tsc: 0 errores.
- check_i18n: TODO OK, 30390 textos en 11 idiomas por 3 tratos.
- check_motor: TODO OK, 2328 pruebas.
- check_universales: 41 universales, 4497 casos probados.
- check_ofertas_intl: 15 fallas, todas de cl (12 de sueldo-liquido y 3 de finiquito, por la UF). Son las conocidas de main y ninguna es de uz.
- check_textos_paises zz-uz: TODO OK, 35 textos.
- gen_idiomas_universales --check: al día.
- check_fronteras: TODO OK, 7658 archivos.
- check_eol: TODO OK, 8498 archivos.
- check_seo_intl: TODO OK, 7562 páginas.
- check_hreflang: 900 fallas, las conocidas del clúster de inflación. Ninguna toca páginas uz.
- check_mundo, check_embed (59 mercados), check_horas, check_calendario (91 fechas), check_sueldos (15438 pasadas, 0 fallas) y check_rankings: OK.

## Saltado

- check-all y build: no los corrí, porque BRIEF-MOTOR no los pide. Además el idioma no publica ningún país.
- Pasos con credenciales: ninguno hizo falta.

## Pendientes y riesgos

- **El país Uzbekistán**: ish haqi con daromad soligʻi e INPS, eng kam ish haqi, BHM, QQS y el redondeo del soʻm. Datos de soliq.uz, lex.uz, mehnat.uz y cbu.uz.
- **Revisión nativa**: falta que un hablante nativo revise una muestra de páginas. Dudas anotadas: «choychaqa», «daromadlilik» o «rentabellik», «marjinal daromad», «temp», «Urugʻlanish sanasi».
- **Conflictos al mergear**: va a chocar con los otros motores (tr, eu, ar, id, th, uk, bn) en `IDIOMAS`, en los Record de cada diccionario, en `PAISES`, en los cargadores y en el ADR. Se resuelven sumando las dos entradas y regenerando los cargadores.
- **Nombres de país de Intl**: en uz algunos traen raya («Kongo – Kinshasa»). Aparecen en horas y rankings. No lo toqué porque es dato de ICU.
- **Fuente de la web**: Geist no tiene la «ʻ» y el navegador la pinta con otra fuente. Es solo cosmético.
- **Dependencias**: la instalación de `node_modules` del clon principal no tiene `web-vitals`, así que en este worktree corrí `npm ci` real en lugar de la junction.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
