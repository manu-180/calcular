# Motor de idioma checo (cs) para Chequia

Deja el checo listo en el motor para que después un agente de país solo tenga que escribir Chequia.
La rama sale de `origin/main` (286ecb06) y no depende de ningún otro motor sin mergear.

## Qué incluye

- **Núcleo:** `cs` en `IDIOMAS`. Están en checo los textos y errores del motor y la calculadora.
  - **Plurales:** one, few, many (fracciones) y other, con `formaCs` y `pluralCs` en `src/motor/i18n/plural.ts`. Las unidades de tiempo usan `pocos` y `muchos`: «1 rok», «3 roky», «5 let», «1,5 roku».
  - **Declinación del país:** `GRAMATICA.cs` y `padyCs` dan «v Česku», «ve Francii», «na Slovensku», «pro Česko», «Spojených států».
  - **Reglas de texto:** detectan el tykání, la «Vy» con mayúscula y las comillas que no son „ “.
  - **Checks:** casos de parseo, plurales y gramática en `check_motor`, y mercados de prueba en `check_universales`: Česko con CZK, «Svatý Vincenc a Grenadiny» y «Spojené arabské emiráty».
- **Sitio:** `src/motor/i18n/cs.ts`, inicio y legales.
  - El buscador muestra «výsledek», «výsledky» o «výsledků» según Intl.PluralRules del `lang` de la página.
  - Geist suma el subconjunto latin-ext en los layouts intl y embebido.
- **Venta:** el diccionario completo `src/lib/pagos/textos/cs.ts`. `cs` entra en `IDIOMAS_VENTA` y en los TRATOS de `check_ofertas_intl`.
- **Páginas globales con sus rutas:**
  - «Tu sueldo en el mundo»: `mzda-ve-svete`
  - Rankings: `zebricek-zemi`, con `kde-mzda-vystaci-nejdal`, `den-danove-svobody` y `kolik-zbyde-ze-zvyseni-mzdy`
  - Horas de trabajo: `kolik-hodin-prace`
  - Calendario: `vyplatni-kalendar`
  - Sueldos reales: `skutecne-mzdy`
  - Además: embebible, compartir, afiliados y las palabras de período en `inferir.ts`.
- **Las 41 universales en checo:** slugs ASCII sin diacríticos (`kalkulacka-uveru`, `kalkulacka-dph`, `hypotecni-kalkulacka`...) y cableado con `gen_idiomas_universales`.
- **Edición interna `zz-cs`:** Zetalandie, locale cs-001.
- **Documentación:** ADR 0002, D19, y una sección en `docs/global/ESTADO.md`.

## Decisiones

- **Nombre visible:** «Česko». Es el nombre corto oficial y el que da Intl.DisplayNames. «Česká republika» también se declina.
- **Registro:** vykání con «vy» en minúscula, como en Finanční správa, ČSOB y Česká spořitelna.
  - Las oraciones van en imperativo cortés («zadejte», «spočítejte») y los botones en infinitivo («Spočítat»).
  - Los mercados van con `trato: "usted"`.
- **Calendario:** el slug es `vyplatni-kalendar` porque `kalendar-vyplat` ya lo usa uk.
- **Porcentajes:** van con espacio («21 %»), también en la prosa, como en la tipografía checa.
- **Textos sin género gramatical:** se evitan los participios con género sobre la persona.
- **Universales neutrales de país:** no nombran la ČNB y «OSVČ» no aparece en el texto visible.

## Checks (24/10)

- `npx tsc --noEmit -p .`: sin errores
- `check_i18n`: TODO OK (30423 textos en 11 idiomas × 3 tratos)
- `check_motor`: TODO OK (2329 pruebas)
- `check_universales`: 41 universales, 4497 casos ✓
- `check_ofertas_intl`: 15 fallas, todas las conocidas de cl por UF (ajenas, arregladas en `claude/mundo-arreglos-2026-10-24`); ninguna de cs
- `check_textos_paises zz-cs`: TODO OK (35 textos, 0 avisos)
- `gen_idiomas_universales --check`: index al día ✓
- `check_fronteras`: TODO OK (7660 archivos)
- `check_eol`: TODO OK
- `check_calendario`: TODO OK (91 fechas en 20 ediciones)
- `check_horas`: OK (32 países, 1 aviso ajeno de AR)
- `check_rankings`: TODO OK (3 rankings, 344 filas, 43 países, 116 ediciones)
- `check_mundo`: TODO OK (43 países)
- `check_sueldos`: 15437 pasadas, 0 fallas
- `check_embed`: TODO OK (59 mercados)

No corrí `check-all` ni el build: no los pide el brief de motor y no hay país publicado. No hizo falta ninguna credencial.

## Pendientes y riesgos

- **Merge con `claude/mundo-motor-eu` y `claude/mundo-motor-uk`:**
  - `src/motor/i18n/plural.ts` choca porque las tres ramas lo crean: hay que dejar juntos `pluralPl`, `formaUk`/`pluralUk` y `formaCs`/`pluralCs`.
  - También chocan las líneas de los Record por idioma, `FormasUnidad`, el cambio de `formato.ts` y `resultadosPocos`. Esos tres últimos son iguales en las tres ramas.
  - Para `cuantosResultados` del buscador conviene la versión de esta rama (Intl.PluralRules del `lang`), que sirve para uk y para cs.
- **Caso borde aceptado en horas:** si la cifra es exactamente «1 hodina», la frase con «stojí» queda en nominativo (lo correcto sería «1 hodinu»).
- **Falta el país Chequia:** sueldo neto con daň z příjmů y pojištění, OSVČ, minimální mzda, DPH, etc., con datos verificados en financnisprava.cz, cssz.cz, mpsv.cz, czso.cz y cnb.cz.
- **Antes de publicar:** conviene que un hablante nativo revise una muestra de páginas.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
