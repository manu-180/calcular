# Motor griego (el): el idioma completo, venta, páginas globales y las 41 universales

Rama `claude/mundo-motor-el`, último commit `629378ca`. Sale de `origin/main` (`286ecb06`). No depende de ninguna rama sin mergear.

## Qué incluye

El commit agrega `el` a `IDIOMAS` y deja el idioma listo para que un agente de país escriba Grecia (`gr`) y Chipre (`cy`). Las decisiones están en ADR 0002, D20 (D9 a D19 los usan otras ramas de motor).

- **Núcleo:**
  - Textos del motor y mensajes de error, y la calculadora.
  - Unidades de tiempo: ημέρα, εβδομάδα, ώρα, μήνας, έτος.
  - `formaEl`/`pluralEl` en `src/motor/i18n/plural.ts`, para el plural one/other.
  - `inferir.ts` reconoce ετήσιος, μηνιαίος, έτος y μήνας.
- **Gramática del país** (`GRAMATICA.el` y `casosEl`):
  - Pone el artículo con género y número, declina el nombre y contrae «σε»: «στην Ελλάδα», «στην Κύπρο», «στον Καναδά», «στο Βέλγιο», «στις Ηνωμένες Πολιτείες», «της Κύπρου», «για τη Γερμανία».
  - Cubre los ~280 nombres de Intl.DisplayNames en el, con una regla para los femeninos en -α/-η y una tabla para los irregulares.
- **Sitio:** sitio, inicio, legales, compartir, embebible y afiliados.
- **Páginas globales:**
  - «Tu sueldo en el mundo» (`misthos-ston-kosmo`)
  - Rankings (`katataxi-choron`, con `pou-ftanei-o-misthos`, `imera-forologikis-eleftherias` y `posa-menoun-apo-tin-afxisi`)
  - Horas de trabajo (`poses-ores-douleias`)
  - Calendario (`imerologio-misthodosias`, con .ics)
  - Sueldos reales (`pragmatikoi-misthoi`)
  - Cada una tiene sus carpetas de ruta y su OG.
- **Venta:** diccionario completo `src/lib/pagos/textos/el.ts` (28 familias, tarjeta, aviso, planilla, informe, catálogo, planillas y mails) y alta en `IDIOMAS_VENTA`.
- **Universales:** las 41, en textos y contenido, con slugs ELOT 743 en ASCII (`ypologismos-dosis-daneiou`, `ypologismos-fpa`, `ypologismos-stegastikou-daneiou`, `anatokismos`...). Los cargadores están regenerados.
- **Fuente:** Geist no trae griego.
  - En la web, `:lang(el)` usa entera la fuente del sistema, con Noto Sans de respaldo.
  - En las OG, Noto Sans va de respaldo, como Noto Sans JP en japonés.
  - Las mayúsculas de las OG pasan por `toLocaleUpperCase(locale)`, que en griego saca los tonos; antes las hacía el `textTransform` de Satori.
- **Buscador:** cuenta como letras las griegas (U+0370 a U+03FF) y trata igual la sigma final y la otra.
- **Reglas (`scripts/reglas_idioma.ts`):**
  - Puntuación: «?» en un texto griego (la pregunta va con «;», U+003B), U+037E y comillas que no son «».
  - Escritura: politónico, mayúsculas sostenidas con tono y palabras que mezclan letras latinas y griegas.
  - Registro: segunda del singular (pronombres, presentes e imperativos que no coinciden con el aoristo).
  - Corren sobre toda la página en check_universales y en check_ofertas_intl.
- **Pruebas:**
  - Edición interna `zz-el` (Ζηταλάνδη, `el-001`).
  - Mercados de prueba en check_universales: el-GR y el-CY con EUR, más «Άγιος Βικέντιος και Γρεναδίνες» y «Ηνωμένα Αραβικά Εμιράτα».
  - Casos de parseo, plurales, gramática y mayúsculas en check_motor.
- **Docs:** ADR 0002 D20 y una sección en `docs/global/ESTADO.md`.

## Decisiones

- **Registro:** uno solo, el πληθυντικός ευγενείας de myAADE, gov.gr y la Εθνική Τράπεζα. Las oraciones van en imperativo cortés («εισάγετε», «υπολογίστε») y el botón es «Υπολογισμός». Los mercados van con `trato: "usted"`.
- **Signo de pregunta:** se escribe el punto y coma U+003B, que es la forma canónica (U+037E se normaliza a ese carácter en NFC).
- **Slugs:** transliteración ELOT 743 y no el slug en inglés del catálogo. Es lo que usan los sitios griegos y se lee.
- **Neutralidad:** las universales y las páginas globales son neutrales entre Grecia y Chipre. No nombran ΑΑΔΕ, ΕΦΚΑ ni ΚΤΕΟ.

## Checks (24/10)

- `npx tsc --noEmit -p .`: OK.
- `check_i18n`: TODO OK, 30390 textos en 11 idiomas × 3 tratos.
- `check_motor`: TODO OK, 2331 pruebas.
- `check_universales`: 41 universales, 4664 casos ✓.
- `check_ofertas_intl`: 46048 textos revisados. Da 15 fallas, todas de cl (UF), que son las conocidas de main. No hay ninguna del griego.
- `check_textos_paises zz-el`: OK.
- `gen_idiomas_universales --check`: índices al día.
- `check_fronteras`: OK.
- `check_eol`: OK.
- `check_calendario`: TODO OK.
- `check_horas`: OK, con un aviso ajeno (AR vence el 31/10).
- `check_rankings`: TODO OK.
- `check_mundo`: TODO OK, 43 países.
- `check_sueldos`: 15436 pasadas, 0 fallas.
- `check_embed`: TODO OK, 59 mercados.

No corrí check-all, check_hreflang ni el build: no se publica ningún país y zz-el es interno. No hizo falta ningún paso con credenciales.

## Pendientes y riesgos

- **Revisión nativa:** falta que un hablante nativo revise una muestra de páginas. Dudas anotadas:
  - «Ίδια συμμετοχή» para la entrada de la hipoteca.
  - «ρυθμιζόμενες χρεώσεις» en Chipre.
  - «μέχρι την 1 Μαρτίου» contra «1η»: la fecha la arma Intl.
- **Los países en sí:** Grecia y Chipre (datos oficiales verificados, capa local) quedan para un agente de país.
- **Conflictos al mergear con otras ramas de motor (cs, eu, ru, uk...):**
  - `src/motor/i18n/plural.ts`: todas lo crean.
  - Las listas de `IDIOMAS`/`IDIOMAS_VENTA`, los Record de diccionarios y `GRAMATICA`.
  - `FUENTE_CJK` de las OG.
  - La normalización del buscador: hay que sumar el rango griego al cirílico de ru.
  - Los cargadores generados.
  - Se resuelve juntando las entradas y regenerando con `check_motor --generar-cargadores` y `gen_idiomas_universales`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
