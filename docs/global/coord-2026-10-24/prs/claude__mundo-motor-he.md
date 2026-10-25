# Motor hebreo (he, rtl): el idioma completo para Israel, con las 41 universales

Rama `claude/mundo-motor-he`, último commit `4388c295`. **Depende de `claude/mundo-motor-ar`** (sin mergear): la rama sale de su punta `7d9ed77b` y reutiliza todo el soporte rtl de D10 (`direccion.ts`, `dir`/`lang` en `<html>`, CSS con propiedades lógicas, flechas espejadas, `<bdi>` en la carta, `dir` en el mail, `coma()`). Hay que mergear primero el árabe. Después se mergeó `origin/main` (286ecb06) en `b1c79131`.

## Qué incluye

`he` entra en `IDIOMAS` y queda listo para que un agente de país escriba Israel.

- **Núcleo** (`964cc191`):
  - Motor y textos de error en hebreo; `direccionDe("he")` es rtl.
  - `LOCALE_RTL` junta ar y he para la LRM detrás de «US$».
  - `src/motor/i18n/hebreo.ts`: `FormasHe`, `pluralHe`, `pluralHeTexto` y `prefijoHe`, y las unidades de tiempo con el dual (יומיים, חודשיים, שנתיים).
  - `GRAMATICA.he`: «בישראל» y «לישראל». La «ה» del artículo se absorbe («בממלכה המאוחדת»). Lleva guion delante de un nombre latino o de una cifra («ב-Zetaland»).
  - Reglas en `scripts/reglas_idioma.ts`, casos en `check_motor` y mercados de prueba en `check_universales`: he-IL con ILS, «סנט וינסנט והגרנדינים» y he-001 con GBP.
- **Sitio** (`74cb5e21`):
  - Diccionario del sitio, inicio y novedades.
  - Legales, siguiendo la versión inglesa completa, con la sección de sueldos compartidos.
  - Fuente del sistema para el hebreo (Segoe UI, Arial, Arial Hebrew, Noto Sans Hebrew) con Geist para latín y cifras; sin descarga.
  - Edición interna `zz-he` (זטלנד, `he-001`).
- **Venta** (`b483fe82`): `src/lib/pagos/textos/he.ts` completo (29 familias, tarjeta, aviso, planilla, informe, catálogo, planillas, mails). `he` está en `IDIOMAS_VENTA` y `check_ofertas_intl` le aplica las reglas del hebreo.
- **Páginas globales** (`e3ba50ed`):
  - Rutas: «Tu sueldo en el mundo» `sachar-baolam`, rankings `dirug-medinot` (con los rankings de adentro en inglés), horas `kama-shaot-avoda`, calendario `luach-maskorot` y sueldos reales `sachar-amiti`, cada una con su carpeta de ruta.
  - Además: embed, compartir, afiliados y las palabras de período en `inferir.ts`.
  - El calendario usa plantillas one/two/other.
  - Imágenes OG: Satori no aplica bidi y dibujaba el hebreo al revés. `src/motor/ui/og-rtl.tsx` (`TextoOg`) lo pasa a orden visual solo en he, con Noto Sans Hebrew. En los demás idiomas el HTML de la imagen no cambia.
- **Las 41 universales** (`14125863`, `2f642c08`, `be815f22`, `e2ed391c`): `textos/he.ts` y `contenido/he.ts` con el slug en inglés del catálogo, más el cableado y los cargadores.
- **Documentación** (`4388c295`): ADR 0002 D22 y una sección en `docs/global/ESTADO.md`.

## Decisiones (ADR 0002, D22)

- **Registro:** plural inclusivo («הזינו», «בחרו», «שימו לב»), como Bank Hapoalim, Leumi y gov.il. Botones en infinitivo con ל o en sustantivo («לחישוב», «להורדת הקובץ»). Mercados con `trato: "usted"`. La carta del informe va en primera persona formal. En embarazo se usa el plural inclusivo o la forma impersonal, sin femenino.
- **Formato:** Intl he-IL (coma de miles, punto decimal, «₪» de Intl con sus RLM, que se ve a la izquierda del número). Cifras occidentales y calendario gregoriano; no se usan fechas hebreas.
- **Comillas y gershayim:** las del teclado, como gov.il, los bancos y lo que la gente busca: «"» para citar y en acrónimos (מע"מ, ק"מ) y «'» para el geresh. Nada de «» “” ״ ׳. «דוח» va sin gershayim.
- **Slugs:**
  - Universales: en inglés, como D8 y D10.
  - Páginas con carpeta: transliteración simple.
  - Locales de Israel: término en inglés o transliteración.
- **Universales sin organismos ni leyes israelíes:** se instancian en cualquier mercado hebreo. Usan vocabulario israelí (לוח שפיצר, משכנתא, הון עצמי, מע"מ).
- **Reglas de texto:**
  - Sin niqqud ni exclamaciones.
  - Puntuación latina bien puesta y sin «، ؛ ؟».
  - Sin comillas tipográficas.
  - Sin imperativo singular con género.

## Checks (24/10)

- `npx tsc --noEmit -p .`: sin errores
- `check_i18n`: TODO OK, 32592 textos en 12 idiomas × 3 tratos
- `check_motor`: TODO OK, 2360 pruebas
- `check_universales`: 41 universales, 4497 casos ✓
- `check_ofertas_intl`: 46688 textos revisados OK. Da 15 FALLAS, todas las conocidas de cl/sueldo-liquido y cl/finiquito (UF), ajenas; ninguna de he.
- `check_textos_paises zz-he`: TODO OK, 32 textos, 0 avisos
- `gen_idiomas_universales --check`: index al día
- `check_fronteras`: 7671 archivos OK · `check_eol`: OK
- `check_calendario`: 91 fechas en 20 ediciones · `check_horas`: 32 países, 1 aviso ajeno (AR) · `check_rankings`: 3 rankings, 344 filas, 43 países, 117 ediciones · `check_mundo`: OK · `check_sueldos`: 16478 pasadas, 0 fallas · `check_embed`: 60 mercados
- `check_seo_intl`: 7566 páginas en los dos modos · `check_paises`: 60 países, 98 avisos
- `check_hreflang`: 1850 fallas, todas del clúster de inflación/IPC (la falla conocida de main, arreglada en `claude/mundo-arreglos-2026-10-24`); ninguna de zz-he.

No corrí `check-all` ni el build: no hay país publicado.

## Revisión visual (next dev con `npm ci` real, 24/10)

- **Lo que se vio bien:**
  - zz-he con `dir="rtl"` y `lang="he-001"`.
  - El menú y el logo a la derecha, y la fuente del sistema aplicada.
  - Inicio, calculadora (formulario, ejemplo, FAQ) y «Tu sueldo en el mundo» bien alineados.
  - «ב-43 מדינות» y el signo de pregunta del h1 del lado correcto.
  - La OG del mundo responde con un PNG.
- **Lo que no se pudo ver:** el resultado de una calculadora. En dev el cliente de la calculadora no carga en los mercados internos. Pasa igual en zz-en, así que no es del hebreo.
- **404 esperados:** calendario y «Sueldos reales» dan 404 en zz-he, igual que en zz-ar y zz-en, porque zz no tiene datos para esas páginas.

## Pasos saltados

- Ninguno por credenciales. No hubo push ni PR (sin permiso de escritura).

## Pendientes y riesgos

- **Orden de merge:** después de `claude/mundo-motor-ar`.
- **Conflictos esperables con otros motores:**
  - Los Record por idioma (i18n, `IDIOMAS`, `IDIOMAS_VENTA`, `check_universales.PRUEBA`).
  - `src/paises/index.ts` (zzHe va después de zzAr).
  - `cargadores.ts` (regenerar).
  - `check_motor`: la lista de ediciones de zz.
- **Revisión nativa:** un hablante nativo debería revisar el sitio, la venta, los legales y una muestra de universales antes del primer país.
- **Falta Israel:**
  - Las calculadoras: שכר נטו (מס הכנסה, נקודות זיכוי, ביטוח לאומי, מס בריאות), שכר מינימום, מע"מ, פיצויי פיטורים, דמי הבראה y ימי חופשה.
  - Los datos verificados en gov.il, btl.gov.il y taxes.gov.il.
- **OG del árabe:** `og-rtl.tsx` solo sirve para el hebreo. El árabe además necesita unir las letras; sigue pendiente, como dice el PR del árabe.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
