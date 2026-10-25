# Motor tailandés (th): núcleo, venta y las 41 universales

Rama: `claude/mundo-motor-th` (sale de `origin/main` y tiene mergeado `origin/main` del 24/10, con calendario, horas, rankings y sueldos reales). No depende de ninguna rama sin mergear. Decisiones en ADR 0002, **D13** (D9 a D12 los usan otras ramas).

## Qué incluye

- **Núcleo.** `th` en `IDIOMAS`, textos y errores del motor, calculadora, unidades sin plural («3 วัน»), `GRAMATICA.th` (ของ/ใน/สำหรับ).
- **Formato th-TH.**
  - Cifras arábigas.
  - Fechas en พ.ศ.: es el calendario por defecto de `th` en Intl, también en `th-001`, así que no hizo falta `-u-ca-buddhist`.
  - Los diccionarios que reciben un año como número lo pasan a +543.
- **parsearNumero.** Lee las palabras de unidad («2.5 ล้าน», «1 ล้าน 5 แสน», «3 หมื่น») y los dígitos tailandeses. Antes «2 ล้าน» daba 2.
- **anchoVisual.** No cuenta las marcas combinantes (`\p{Mn}`), es decir las vocales y tonos apilados: «ภาษีมูลค่าเพิ่ม» mide 10 y no 15. En textos latinos no cambia nada.
- **Sitio.** Sitio, inicio, legales, compartir, embed y afiliados.
- **Páginas con carpeta por idioma.** Los slugs van en RTGS, porque el inglés ya tiene su carpeta:
  - «Tu sueldo en el mundo»: `ngoen-duean-thua-lok`.
  - Calendario: `patithin-ngoen-duean`.
  - Horas de trabajo: `chua-mong-tham-ngan`.
  - Rankings: `andap-prathet`. Los rankings internos van en inglés, como ja/ko/zh.
  - «Sueldos reales»: `ngoen-duean-ching`.
  - La OG del mundo carga Noto Sans Thai.
- **CSS.**
  - Fuente del sistema: Thonburi y Leelawadee UI, con Noto Sans Thai y Tahoma de respaldo.
  - `word-break: normal` en `:lang(th)`: el navegador corta por diccionario sin partir palabras. `keep-all` no cortaría nunca y `break-all` parte palabras.
  - Interlineado 1.65 y tracking 0 en títulos.
- **Venta.** Diccionario completo `src/lib/pagos/textos/th.ts`: todas las familias, incluida `informe-calculo`, más informes, planillas y mails. Entra en `IDIOMAS_VENTA`.
- **Universales.** Las 41 con `textos/th.ts` y `contenido/th.ts`, cableadas con `gen_idiomas_universales`, y los cargadores regenerados.
- **Slugs de las universales.** El slug en inglés del catálogo, como D8: la romanización del tailandés es larga y ambigua.
- **Reglas** (`scripts/reglas_idioma.ts`). Sin:
  - exclamaciones;
  - espacios raros (U+200B, duro, fino, doble, tono suelto);
  - punto o «?» al final de oración;
  - ครับ/ค่ะ/คะ;
  - คุณ/ท่าน como pronombre (no cuentan คุณภาพ, ขอบคุณ ni เท่านั้น);
  - ผม/ดิฉัน/ฉัน;
  - dígitos tailandeses;
  - ค.ศ. ni «ปี 2026».
- **Pruebas.**
  - Edición interna `zz-th` (Zetaland, `th-001`).
  - `check_universales` con th-TH/THB y «เซนต์วินเซนต์และเกรนาดีนส์».
  - `check_motor` con parseo, unidades, fechas en พ.ศ. y ancho.
  - `check_ofertas_intl` con `th: ["usted"]`; el texto del mail colapsa espacios antes de las reglas.

**Registro.** Cortés y neutro, el de SCB, Kasikorn y กรมสรรพากร:
- sin pronombre de segunda persona (el sujeto se omite o va el rol);
- sin ครับ/ค่ะ;
- «กรุณา» para pedir;
- sin punto final.

Los mercados van con `trato: "usted"`. La carta del informe usa «ข้าพเจ้า».

## Checks (después del merge de main)

- `npx tsc --noEmit -p .`: 0 errores. Con la junction a node_modules faltaba `web-vitals`, que trajo main; se resolvió con `npm ci` en el worktree.
- `check_i18n`: TODO OK, 30375 textos en 11 idiomas × 3 tratos.
- `check_motor`: TODO OK, 2332 pruebas.
- `check_universales`: 41 universales, 4330 casos ✓.
- `gen_idiomas_universales --check`: al día.
- `check_textos_paises zz-th`: 12 textos, 0 avisos.
- `check_fronteras`: 7658 archivos OK.
- `check_eol`: OK.
- `check_ofertas_intl`: 15 fallas, todas de cl (tope en UF de sueldo-liquido y finiquito). Es la falla conocida de main, arreglada en `claude/mundo-arreglos-2026-10-24`. Ninguna es de th.
- `check_calendario`: 91 fechas en 20 ediciones OK.
- `check_horas`: 32 países OK, con 1 aviso ajeno (AR vence el 31/10).
- `check_rankings`: OK.
- `check_sueldos`: 15436 pasadas, 0 fallas.
- `check_mundo`: OK.
- `check_seo_intl`: 7562 páginas en los dos modos OK.
- `check_embed`: 59 mercados OK.
- `check_hreflang`: 900 fallas, las conocidas del clúster de inflación de main. Ninguna es de th. Se corrió antes del merge.

## Saltado

- `check-all` y `npm run build`: no se corrieron. El frente no publica ningún país (zz-th es interno).
- Sin credenciales: nada que aplicar en Supabase, Vercel ni PayPal.

## Pendientes y riesgos

- **Tailandia en sí** (BRIEF-PAIS), con datos verificados en rd.go.th, sso.go.th y mol.go.th:
  - ภาษีเงินได้บุคคลธรรมดา;
  - ประกันสังคม;
  - ค่าจ้างขั้นต่ำ por provincia;
  - VAT 7 %;
  - ภาษีหัก ณ ที่จ่าย;
  - ค่าชดเชย.
- **Revisión nativa.** Antes de publicar, un hablante nativo debería revisar una muestra de páginas. Los textos se escribieron con el vocabulario de bancos y servicios, pero no los revisó un nativo.
- **OG sin fuente tailandesa.** La OG de las calculadoras intl, del calendario, de las horas y de los rankings no carga una fuente tailandesa (hoy tampoco CJK): un título en tailandés puede salir con cuadritos. Solo la tarjeta del mundo carga Noto Sans Thai. Satori no hace shaping complejo, así que los tonos pueden quedar algo corridos.
- **Choques al mergear.** Va a chocar con las ramas de otros idiomas en todos los `Record<Idioma>` (IDIOMAS, diccionarios, rutas, `IDIOMAS_VENTA`, cargadores, `check_universales`). Se resuelve sumando las dos entradas y regenerando cargadores con `check_motor --generar-cargadores` y los index con `gen_idiomas_universales`.
- **Merge sin coautoría.** El commit de merge de main lleva el mensaje por defecto, sin la línea Co-Authored-By.
- **rankings.ts en otro commit.** El bloque th de `rankings.ts` quedó dentro del commit «horas de trabajo en tailandés» (fca8151f), porque dos forks commitearon a la vez. El contenido está completo.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
