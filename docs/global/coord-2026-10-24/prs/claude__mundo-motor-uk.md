# Motor ucraniano (uk): núcleo, sitio, venta, páginas globales y las 41 universales

Rama `claude/mundo-motor-uk`, basada en `origin/main` (con el merge de main del 24/10 incluido). No depende de ninguna rama sin mergear.

## Qué incluye

- **Núcleo.** `uk` en `IDIOMAS`, textos y errores del motor, calculadora y afiliados.
- **Plurales eslavos.** Las cuatro categorías de `Intl.PluralRules("uk")` (one/few/many/other):
  - `src/motor/i18n/plural.ts` trae `formaUk` y `pluralUk`.
  - Las unidades de tiempo suman las formas `pocos` y `muchos` con la misma interfaz `FormasUnidad` que la rama del motor eu.
  - Las fracciones van en genitivo singular: «1,5 року».
- **Gramática del país.** `GRAMATICA.uk` declina por regla los nombres que da Intl.DisplayNames en uk: «в Україні», «для України», «у Великій Британії», «в Обʼєднаних Арабських Еміратах», «на Філіппінах», «в Іраку».
  - Una tabla cubre los irregulares y los nombres de isla que van con «на».
  - Probada con unos 110 nombres de países.
- **Sitio.** Sitio, inicio, legales, compartir y embed.
- **Páginas globales.** «Tu sueldo en el mundo» (`zarplata-u-sviti`), rankings (`reitynh-krain`), horas de trabajo (`skilky-hodyn-roboty`), calendario (`kalendar-vyplat`) y sueldos reales (`realni-zarplaty`), cada una con su carpeta de rutas.
- **Venta.** Diccionario completo `src/lib/pagos/textos/uk.ts`: las 29 familias (`informe-calculo` incluida), informes, planillas y mails. `uk` entra en `IDIOMAS_VENTA`.
- **Universales.** Las 41, con `textos/uk.ts` y `contenido/uk.ts` cableados por `gen_idiomas_universales`. Los slugs usan la transliteración oficial ucraniana (resolución 55/2010 del Gabinete de Ministros): `kalkuliator-kredytu`, `kalkuliator-pdv`, `skladni-vidsotky`, `indeks-masy-tila`…
- **Edición de prueba.** `zz-uk` (Зеталенд, `uk-001`, estado interno), con `check_motor` actualizado.
- **Reglas del idioma** en `scripts/reglas_idioma.ts`:
  - se atrapan «ти» y sus formas, y la «Ви» con mayúscula a mitad de oración;
  - también las letras rusas (ы э ё ъ), las comillas que no son «», el apóstrofo que no es ʼ ni ' y los calcos del ruso.
  - Corren sobre la página entera en `check_universales` y en `check_ofertas_intl`.
- **Mercados de prueba** en `check_universales`: uk-UA con UAH, «Сент-Вінсент і Гренадіни» y «Обʼєднані Арабські Емірати».
- **Arreglos compartidos y mínimos:**
  - El índice del buscador cuenta el cirílico como letra. Antes `[^a-z0-9]` lo borraba y una búsqueda en ucraniano no daba nada.
  - El contador del buscador acepta una forma few opcional (`resultadosPocos`).
  - `inferir.ts` reconoce «місячна» y «річна».
  - Las OG de mundo, rankings, horas y calendario cargan Noto Sans de respaldo en uk.
- **Documentación.** ADR 0002, entrada D15 (registro, plurales, gramática, formato, slugs, reglas), y sección nueva en `docs/global/ESTADO.md`.

**Registro.** Es el de Дія, ПриватБанк, monobank y el portal de la ДПС. «Ви» va con minúscula y con las formas corteses («введіть», «оберіть», «розрахуйте»). Los botones van en infinitivo («Розрахувати»). Los mercados uk usan `trato: "usted"`.

## Checks

| Check | Resultado |
|---|---|
| `npx tsc --noEmit -p .` | sin errores |
| check_i18n | 30423 textos en 11 idiomas × 3 tratos, OK |
| check_motor | 2329 pruebas OK |
| check_universales | 41 universales, 4497 casos, OK |
| check_ofertas_intl | 46048 textos revisados; 15 fallas, todas de cl (UF): conocidas de main y ajenas al frente |
| check_textos_paises zz-uk | 35 textos, 0 avisos |
| gen_idiomas_universales --check | al día |
| check_fronteras | 7659 archivos, OK |
| check_eol | OK |
| check_seo_intl | 7562 páginas, OK |
| check_hreflang | 900 fallas, todas del clúster de inflación: conocidas de main y ajenas al frente |
| check_calendario | 91 fechas en 20 ediciones, OK |
| check_horas, check_rankings, check_mundo | OK |
| check_sueldos | 15436 pasadas, 0 fallas |

Las fallas de check_ofertas_intl y de check_hreflang ya están arregladas en `claude/mundo-arreglos-2026-10-24`.

## Pasos saltados

- No se corrieron `next build` ni `check-all` completos: no los pide el brief del motor.
- No hizo falta ningún paso con credenciales: el frente no usa Supabase, Vercel ni PayPal.

## Pendientes

- **El país Ucrania en sí** (BRIEF-PAIS): sueldo neto con ПДФО, військовий збір y ЄСВ, ФОП, відпускні, лікарняні, mínimo y ПДВ, con datos verificados en fuentes oficiales.
- **Revisión de un hablante nativo** sobre una muestra de páginas antes de publicar. Dudas que dejaron los forks:
  - «тіло кредиту» y «ануїтет»;
  - «статки» frente a «чисті активи»;
  - «Маржинальний дохід»;
  - «Амортизація» frente a «знецінення»;
  - «Пів місяця (24 рази на рік)» para la quincena;
  - «Калькулятор пропорцій» en el h1 de `proportsiia`;
  - «запас на підрізку»;
  - la transcripción «Міффліна-Сан Жеора»;
  - «Календар виплат».
- **Marcadores del país en la venta.** El agente de país tiene que escribir `{normas}` en genitivo (va detrás de «відповідно до») e `{incluye}` en acusativo. Está anotado en `uk.ts`.

## Riesgos al mergear

- **Choque con `claude/mundo-motor-eu`:**
  - `src/motor/i18n/plural.ts` lo crean las dos ramas: hay que dejar `pluralPl` junto a `formaUk` y `pluralUk`.
  - En `unidades.ts` y `formato.ts` el cambio de `FormasUnidad` es idéntico; solo se suman las filas de cada idioma.
- **Listas de idiomas y cargadores.** `IDIOMAS`, los `Record<Idioma, ...>` y `src/motor/universales/cargadores.ts` van a chocar con las otras ramas de idioma (eu, tr, ar, id). Se resuelven sumando las entradas de las dos ramas y regenerando con `check_motor --generar-cargadores` y `gen_idiomas_universales`.
- **Buscador.** El cambio de `[^a-z0-9]` a `[^a-z0-9Ѐ-ӿ]` en el índice no altera las búsquedas en alfabeto latino.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
