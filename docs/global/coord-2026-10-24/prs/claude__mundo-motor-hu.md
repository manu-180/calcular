# Motor húngaro (hu): núcleo, venta, páginas globales, 41 universales y zz-hu

Rama local `claude/mundo-motor-hu`, basada en `origin/main` (286ecb06). No depende de ninguna rama de
motor sin mergear: copia la forma de `claude/mundo-motor-cs` (D19) y toma ideas de
`claude/mundo-motor-tr` (D12) y de la gramática finesa de `claude/mundo-motor-eu` (D9). Decisiones en
ADR 0002, D21.

## Qué incluye

- `hu` en `IDIOMAS`. Motor y mensajes de error, calculadora y unidades de tiempo, que no llevan plural
  detrás del número («3 nap», «1,5 év»).
- Gramática del país en `src/motor/i18n/gramatica.ts`:
  - `esetekHu(p)` da el lugar, la dirección, el origen y el dativo, con armonía vocálica y los dos
    grupos de sufijos: -ban/-ben y -on/-en/-ön. Ejemplos: «Magyarországon», «Németországban»,
    «Cipruson», «Thaiföldön», «az Egyesült Államokban», «a Fülöp-szigeteken».
  - `GRAMATICA.hu`: `de` es el poseedor sin sufijo y `para` es «X számára».
  - `neveloHu`/`conNeveloHu` eligen «a» o «az», también delante de cifras («az 1», «az 5», «a 10»,
    «az 1 500 000 Ft»).
  - `mayusculaHu` pone la mayúscula cuando una de estas formas abre la oración.
  - Probado con los ~250 nombres de país de Intl en hu.
- Registro: tegezés, como OTP, K&H y Revolut. NAV usa magázás, pero esto es una web de
  calculadoras. Los mercados van con `trato: "tu"`.
- El sitio, la página de inicio y las legales.
- Las páginas globales con sus rutas:
  - Tu sueldo en el mundo: `fizetes-a-vilagban`
  - Rankings: `orszagok-rangsora`, con `hol-er-tobbet-a-fizetes`, `adoszabadsag-napja` y
    `mennyi-marad-a-fizetesemelesbol`
  - Horas de trabajo: `hany-ora-munka`
  - Calendario: `fizetesi-naptar`
  - Sueldos reales: `valodi-fizetesek`
  - Además: embed, compartir, afiliados y los productos de horas.
- `inferir.ts` reconoce «éves» y «havi».
- Geist con `latin-ext` para la ő y la ű.
- El diccionario de venta completo (`src/lib/pagos/textos/hu.ts`, en `IDIOMAS_VENTA`).
- Las 41 universales en húngaro, cableadas y en los cargadores. Los slugs son ASCII: `hitelkalkulator`,
  `afa-kalkulator`, `lakashitel-kalkulator`... `nettober-kalkulator` queda libre para el país.
- Reglas de texto en `scripts/reglas_idioma.ts`:
  - magázás («Ön», «kattintson», «adja meg»...);
  - comillas que no son „ ”;
  - un sufijo pegado a una cifra («5-ben», «27%-os»);
  - plural detrás de un número.
- Edición interna `zz-hu` (Zetaország, `hu-001`).
- Mercados de prueba en `check_universales`:
  - hu-HU con HUF;
  - «Saint Vincent és a Grenadine-szigetek», el nombre largo;
  - «Németország».
- Casos nuevos en `check_motor`: parseo, forint, fecha larga, artículo y casos del país.
- `docs/adr/0002-mundo.md` (D21) y una sección en `docs/global/ESTADO.md`.

## Checks

- `npx tsc --noEmit -p .`: 0 errores.
- `check_i18n`: TODO OK, 30 390 textos en 11 idiomas × 3 tratos.
- `check_motor`: TODO OK, 2 330 pruebas.
- `check_universales`: 41 universales, 4 497 casos ✓.
- `check_ofertas_intl`: 15 fallas, todas de cl/sueldo-liquido y cl/finiquito (UF, la falla conocida
  de main). Ninguna es de hu.
- `check_textos_paises zz-hu`: 35 textos revisados, 0 avisos.
- `gen_idiomas_universales --check`: index al día.
- `check_fronteras`: TODO OK, 7 659 archivos.
- `check_eol`: TODO OK.
- `check_calendario`: TODO OK, 91 fechas en 20 ediciones.
- `check_horas`: OK, 32 países (1 aviso ajeno, de México).
- `check_rankings`: TODO OK, 3 rankings, 344 filas, 116 ediciones.
- `check_mundo`: TODO OK.
- `check_sueldos`: 15 437 pasadas, 0 fallas.
- `check_embed`: TODO OK, 59 mercados.
- `check-all`: 150 de 155 suites OK. Fallan check_guiones, check_hreflang, check_mes_en_render, check_ofertas_intl y check_panel_sql:
  - check_guiones: era de esta rama (la raya que trae Intl en «Kongó – Kinshasa», en las claves de esetekHu). Quedó arreglado en 710b3fb6 y check_guiones corrido aparte da OK.
  - Las otras cuatro son las fallas conocidas de main, arregladas en `claude/mundo-arreglos-2026-10-24`. check_hreflang da 1 850 fallas, todas del clúster de inflación y ninguna de hu ni de zz-hu.
  - check_ofertas_intl da 15 fallas, todas de cl.

## Pasos saltados

- No hubo push ni PR: no hay permiso de escritura ni `gh`.
- No se corrieron el build ni `next dev`.

## Pendientes y riesgos

- Revisión de un hablante nativo sobre una muestra de páginas. Tres puntos a mirar:
  - la tabla de sufijos de los países poco frecuentes;
  - los títulos con «kalkulátor» separado, como se busca en Google, cuando la norma académica pide
    guion;
  - los sufijos detrás de abreviaturas de unidad en textos fijos («km-en», «kW-ban»).
- El país Hungría está por hacerse: nettó bér kalkulátor, minimálbér, ÁFA, KATA y átalányadó, con
  datos de fuentes oficiales.
- Al mergear con otras ramas de motor (cs, tr, eu, uk...) chocan las listas por idioma: `IDIOMAS`,
  `GRAMATICA`, los `DICCIONARIOS_*`, `IDIOMAS_VENTA`, `TRATOS`, los mercados de prueba, los slugs de las
  páginas globales y `PAISES` con las zz-*. También chocan las esperas de `check_motor` sobre las
  hermanas de zz/bono. Se resuelven sumando los idiomas de las dos ramas. El cambio de Geist es el
  mismo que en cs.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
