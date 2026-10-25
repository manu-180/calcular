# motor bn: bengalí (bn-BD) en el motor, el sitio, la venta y las 41 universales

Rama: `claude/mundo-motor-bn`, basada en `origin/main` (f228b37c). No depende de otra rama sin mergear.
ADR 0002, D14.

## Qué incluye

- Núcleo: `bn` en `IDIOMAS`; textos y errores del motor, calculadora, unidades sin plural detrás del
  número (৩ দিন), `GRAMATICA.bn` con sufijos de genitivo y locativo (বাংলাদেশের, কানাডায়).
- Cifras: los montos visibles van con dígitos bengalíes (০-৯), el formato por defecto de Intl en bn-BD y
  el que usan las páginas en bangla de NBR, Bangladesh Bank y los bancos. Miles en lakh y crore.
  `cifrasBn` (`src/motor/i18n/bengali.ts`) para lo que llega como número suelto; `textoDelLocale` para
  los resultados y celdas de formato texto.
- Parseo: `parsearNumero` acepta los dígitos ০-৯ de un teclado bengalí; `conLakhs` reconoce bn-BD;
  `sugerenciaMiles` responde con los dígitos que escribió la persona.
- Ancho de SEO (`src/motor/ancho.ts`): letra bengalí 1,5; hasanta y signos sobre o bajo la letra 0;
  signos vocálicos del costado 0,5. Medido con los avances de Nirmala UI contra Arial.
- Sitio, inicio, legales, compartir, embed y «Tu sueldo en el mundo» en `/bishwe-beton` (página y OG).
- CSS: fuente del sistema para bn (Noto Sans Bengali, Kohinoor Bangla, Nirmala UI, Vrinda), sin
  descargar fuentes; títulos sin tracking negativo y con interlineado 1,35.
- Venta: `src/lib/pagos/textos/bn.ts` con las 27 familias (informe-calculo incluida), tarjeta, aviso,
  planilla, informe, catálogo, planillas y mails; alta en `IDIOMAS_VENTA`. La carta del informe cierra
  con `nota.puntoFinal` («।» en bn).
- Las 41 universales en bengalí (textos/bn.ts y contenido/bn.ts), con el slug en inglés del catálogo
  como D8. Hechas en 4 forks y revisadas por muestras.
- Reglas (`scripts/reglas_idioma.ts`): dari «।» al final, sin exclamaciones, sin cifras latinas, sin
  তুমি/তুই ni sus imperativos.
- Pruebas: edición interna `zz-bn` (locale bn-001); `check_universales` con bn-BD (BDT, escala 120) y
  «সেন্ট ভিনসেন্ট ও গ্রেনাডিনস»; casos de bn-BD en `check_motor`; `check_i18n` llama las funciones
  de bn con «৭» de muestra; `check_ofertas_intl` corre las reglas de bn.
- Docs: ADR 0002 D14 y sección del 24/10 en `docs/global/ESTADO.md`.

Registro: «আপনি» con las formas corteses (করুন, দিন, দেখুন), el de bKash, Sonali Bank y NBR e-Return;
mercados con `trato: "usted"`.

## Checks

- `npx tsc --noEmit -p .`: sin errores.
- `npx tsx scripts/check_i18n.ts`: TODO OK, 19.614 textos en 11 idiomas × 3 tratos.
- `npx tsx scripts/check_motor.ts`: TODO OK, 2.337 pruebas.
- `npx tsx scripts/check_universales.ts`: 41 universales, 4.330 casos probados, sin fallas.
- `npx tsx scripts/check_ofertas_intl.ts`: sin fallas de bn. Quedan 15 fallas de Chile (cl/sueldo-liquido
  y cl/finiquito: el tope imponible de la planilla da 3707987 y el de la calculadora 3708942). Son de la
  UF del día, ajenas a este frente.
- `npx tsx scripts/check_textos_paises.ts zz-bn`: TODO OK, 33 textos.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día.
- `npx tsx scripts/check_fronteras.ts`: TODO OK, 7.591 archivos.
- `npx tsx scripts/check_eol.ts`: TODO OK.
- No corrí `check-all` ni el build (no los pide BRIEF-MOTOR). No hizo falta ninguna credencial.

## Choques esperables al mergear

- `src/motor/tipos.ts` (IDIOMAS), los `Record<Idioma>` de i18n, `IDIOMAS_VENTA`, `PAISES`,
  `check_motor` (hermanas y ediciones de zz), `check_universales` (PRUEBA, REGLAS_COMPLETAS),
  `check_ofertas_intl` (TRATOS) y el ADR chocan con las otras ramas de motor (eu, ar, id, th, tr): se
  resuelven sumando las entradas de todas.
- `src/motor/formato.ts` choca con `claude/mundo-motor-ar`, que también pasa dígitos a ASCII al comienzo
  de `parsearNumero` y `sugerenciaMiles`: hay que dejar las dos conversiones (árabe-índicos y bengalíes).
- `src/motor/ancho.ts` puede chocar con el motor tailandés si también lo toca.
- `src/motor/universales/cargadores.ts` se regenera con `check_motor --generar-cargadores`.

## Pendientes y riesgos

- Falta el país Bangladés (BRIEF-PAIS): আয়কর, ভ্যাট, সঞ্চয়পত্র y su উৎসে কর, PF/gratuity, festival
  bonus, con datos verificados.
- Días hábiles: `dias-entre-fechas` y `sumar-dias` cuentan de lunes a viernes; en Bangladés se descansa
  el viernes (y el sábado en la administración pública). Los textos bn lo advierten; el país tiene que
  decidir si suma una opción de fin de semana al motor.
- La imagen OG de «Tu sueldo en el mundo» pide Noto Sans Bengali, pero Satori no reordena los signos
  vocálicos (ি va antes de la consonante): la tarjeta puede salir con algún conjunto mal armado. El OG
  de las calculadoras no carga fuentes por idioma (igual que hoy con ja, ko y zh).
- Algún número que la UI pinte sin pasar por Intl ni por los diccionarios (contadores sueltos de
  componentes) puede salir con dígitos latinos; las reglas cubren diccionarios, universales y ofertas.
- `horas-trabajadas` muestra la hora como la da Intl de bn-BD («৯:০০ AM», con AM/PM latino).
- Con escala 120 los ejemplos de hipoteca llegan a ২,৫০,০০,০০০৳ (2,5 crore): es la escala de BDT,
  pero conviene que un nativo vea si suena realista.
- Ningún hablante nativo revisó todavía los textos: hace falta una muestra antes de publicar.

## Puesta al día con main 7d190a68

Merge de `origin/main` (7d190a68, incluye bb530d7a) en 37abcdeb, sin conflictos. Commits d1cc2ed3 y 6955756d:

- Diccionarios completados en bengalí: rankings, horas de trabajo, calendario laboral y fiscal, sueldos
  reales (35 ocupaciones, aporte y página) y afiliados. Productos del índice de horas en bengalí
  (আইফোন ১৭, আইফোন ১৮ প্রো, ম্যাকবুক এয়ার, স্পটিফাই প্রিমিয়াম).
- Rutas transliteradas como `bishwe-beton`: `desher-ranking` (`kothay-beton-beshi-chole`,
  `kor-mukti-dibos`, `beton-briddhir-koto-thake`), `koto-ghonta-kaj`, `beton-calendar` (con el .ics y
  los eventos) y `asol-beton`, cada una con su OG. Las OG de horas, rankings, calendario y sueldos
  piden Noto Sans Bengali de respaldo.
- Cifras: `valorPara` (`src/motor/i18n/bengali.ts`) hace que los `rellenar` de plantillas con
  {marcas} (horas, sueldos y los textos de mundo del navegador) pongan dígitos bengalíes cuando la
  plantilla está en bengalí. Arregla además un error previo: `conMarcas` de mundo no reconocía el
  centinela escrito con dígitos bengalíes y el navegador habría mostrado «৯৮৭৬৫৪টি».
- `scripts/reglas_idioma.ts`: la regla bn ignora lo que va entre `{{ }}` (el índice `[1]` de un
  marcador de escala y el «।» que lo sigue ya no cuentan como error).
- `scripts/check_rankings.ts` lee los dígitos bengalíes como ASCII al buscar puesto y total.
- ADR 0002 D14 suma las rutas nuevas.

Checks después de la puesta al día:

- tsc: 0 errores.
- check_i18n: TODO OK, 30.375 textos en 11 idiomas × 3 tratos.
- check_motor: 2.337 pruebas OK. check_universales: 41 universales, 4.330 casos.
- check_horas: OK, 32 países (1 aviso de AR, ajeno). check_rankings: TODO OK, 3 rankings, 43 países.
  check_sueldos: 15.436 pasadas, 0 fallas. check_calendario: 91 fechas en 20 ediciones.
  check_mundo: TODO OK. check_embed: 59 mercados.
- check_seo_intl: TODO OK, 7.562 páginas.
- check_hreflang: fallas solo del clúster de inflación (ajenas, conocidas de main; el número varía
  entre corridas, 1.242 y 1.892), ninguna de bn.
- check_ofertas_intl: las 15 fallas de cl (UF), ajenas.
- check_textos_paises zz-bn, gen_idiomas_universales --check, check_fronteras y check_eol: OK.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
