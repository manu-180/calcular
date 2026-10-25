# País fi: Suomi en finés (63 calculadoras, 23 locales, publicado)

## Qué incluye

Mercado `src/paises/fi/` (codigo `fi`, pais `FI`, idioma `fi`, locale `fi-FI`, trato `tu` según
ADR 0002 D9 (sinä implícito: imperativo y sufijos posesivos, nada de teitittely), moneda EUR,
escala 0,9 de PAISES.md, nombre «Suomi», zona Europe/Helsinki), publicado en el commit
`publicar fi` (estado `publicado`, alta al final de `PAISES`, cargadores y medición regenerados).

- 23 calculadoras locales, todas `publicado`, ninguna en borrador:
  | slug | concepto |
  |---|---|
  | palkkalaskuri | sueldo-neto (kunta de los 308 municipios, kirkko, edad, hijos; entra en «Tu sueldo en el mundo») |
  | veroprosenttilaskuri | impuesto-renta (palkka, eläke o etuus; verokortin prosentti redondeado a 0,5) |
  | kunnallisverolaskuri | propio (kunnallisvero y kirkollisvero, comparación entre dos kunnat) |
  | tyonantajan-sivukulut | costo-empleador (TyEL medio 17,10 %, työttömyys 0,31/1,23 %, sairausvakuutus 1,91 %) |
  | lomapalkkalaskuri | vacaciones (2 o 2,5 días por mes, kuukausipalkka, keskipäiväpalkka con kerroin o 9/11,5 %) |
  | lomarahalaskuri | propio (porcentaje de la persona, 50 % por defecto; no es legal, se dice) |
  | lomakorvauslaskuri | liquidacion-final (días pendientes y del año en curso, divisor 25) |
  | ylityokorvaus | horas-extra (50 % dos primeras horas diarias, 100 % siguientes, 50 % semanal, domingo) |
  | irtisanomisaika | preaviso (fecha de fin según laki 150/1930) |
  | lapsilisa | propio (orden de hijos, menores de 3 años, yksinhuoltajakorotus) |
  | vanhempainpaivaraha-laskuri | propio (fórmula Kela, 16 días al 90 %) |
  | sairauspaivaraha-laskuri | propio (fórmula Kela 2025-, omavastuuaika 1 + 9 días) |
  | alv-laskuri | iva (25,5 / 13,5 / 10 %, tramo 2025 con 14 %; reemplaza la universal) |
  | varainsiirtovero-laskuri | propio (3 % kiinteistö, 1,5 % asunto-osake sobre velaton hinta, 1,5 % arvopaperit) |
  | paaomatulovero | propio (myyntivoitto con hankintameno-olettama, pörssiosinko 85 %, umbral 30 000 €) |
  | osakesaastotili-verotus | propio (reparto de la retirada entre pääoma y tuotto, techo 100 000 €) |
  | kotitalousvahennys-laskuri | propio (40 % / 15 %, máximo 2 100 €, omavastuu 150 €, traspaso al cónyuge) |
  | inflaatiolaskuri | inflacion (KHI de Tilastokeskus, 2000=100) |
  | viivastyskorkolaskuri | propio (viitekorko + 7 o + 8 por semestre) |
  | perintoverolaskuri | propio (tablas 2026, exento bajo 30 000 €) |
  | lahjaverolaskuri | propio (tablas 2026, exento bajo 7 500 €, regalos de 3 años) |
  | kilometrikorvaus | propio (0,55 €/km 2026 y 0,58 €/km 2027, päivärahat y ateriakorvaus) |
  | yle-vero | propio (2,5 % sobre 15 150 €, máximo 160 €) |
- 40 universales en finés con `universales: "todas"` (la de IVA cae porque hay alv local).
- Sin calculadora de salario mínimo: Finlandia no tiene salario mínimo legal.
- SEO propio por página (title, description, h1, FAQ, glosario) con las búsquedas finesas:
  «palkkalaskuri», «nettopalkka», «veroprosenttilaskuri», «kunnallisvero 2026»,
  «työnantajan sivukulut», «lomapalkkalaskuri», «lomarahan laskeminen», «lomakorvaus»,
  «ylityökorvaus 50 % 100 %», «irtisanomisaika», «lapsilisä 2026», «vanhempainpäiväraha laskuri»,
  «sairauspäiväraha laskuri», «alv-laskuri», «varainsiirtovero», «pääomatulovero», «osinkovero»,
  «osakesäästötili verotus», «kotitalousvähennys 2026», «inflaatiolaskuri», «viivästyskorko»,
  «perintöverolaskuri», «lahjaverolaskuri», «kilometrikorvaus 2026», «Yle-vero».
- `series.json`: KHI de Tilastokeskus (pisteluku 2000=100, 2000-01 a 2026-09, 321 puntos).
  `avisos.json` vacío, `novedades.ts` (7, incluida la de kilometrikorvaus 2027), `fuentes.ts`
  (6 detectores) y `scripts/paises/fi/probar_detectores.ts`.

## Datos

58 datos, 67 tramos, todos verificados el 24/10/2026 en fuentes primarias; 0 no verificados.

- Verohallinto (vero.fi): valtion tuloveroasteikko 2026; decisión de kuntien ja seurakuntien
  tuloveroprosentit 2026 (308 municipios, ev.lut. y ortodoksi, leídos de la tabla de la decisión
  VH/6585/00.01.00/2025); decisión de ennakonpidätysprosenttien laskentaperusteet 2026 (TyEL 7,30 %,
  työttömyys 0,89 %, päivärahamaksu 0,88 % y su tuloraja 17 255 €, sairaanhoitomaksu 1,10 % + 0,39 %,
  tulonhankkimisvähennys 750 €, perusvähennys 4 265 € y 18 %, työtulovähennys 3 430 €, 18 %, 2 % entre
  35 000 y 50 550 €, 105 € por hijo, 1 200 € a los 65, Yle-vero 2,5 % / 15 150 € / 160 €, pääomatulovero
  30/34 % con 30 000 €); eläketulovähennys 2026; lisävero de pensión 5,85 % sobre 60 000 €; alv;
  varainsiirtovero; hankintameno-olettama; 1 000 € de luovutukset; pörssiosinko 85 %;
  osakesäästötili 100 000 €; kotitalousvähennys 2026-2027 (comunicado del 13.10.2026 y página en
  inglés con ejemplos); perintö- y lahjaverotaulukot 2026; matkakorvaukset 2026 (noticia) y 2027
  (decisión del 23.10.2026).
- Kela (kela.fi): euromäärät 1.1.2026 y 1.1.2027 (PDF; lapsilisä y vähimmäispäiväraha iguales los dos
  años), fórmulas de päiväraha («How daily allowances are calculated», actualizada 26.9.2026),
  vakuutusmaksuvähennys 9,07 %, 160 días de vanhempainraha, sairausvakuutusmaksu del empleador 1,91 %.
- Eläketurvakeskus: Lakisääteiset sosiaalivakuutusmaksut Suomessa 2026 (TyEL 24,40 / 17,10 / 7,30 %).
- Työllisyysrahasto: työttömyysvakuutusmaksut 2026 (0,31 % hasta 2 509 500 €, 1,23 % encima, 0,89 %).
- Finlex: vuosilomalaki 162/2005 (5, 11, 12, 16 y 17 §, tabla de kertoimet), työsopimuslaki 55/2001
  (6:3), työaikalaki 872/2019 (17 y 20 §), laki säädettyjen määräaikain laskemisesta 150/1930,
  korkolaki 633/1982 (4, 4 a y 12 §).
- Suomen Pankki: viitekorko 2025-H1 (3,5 %), 2025-H2, 2026-H1 y 2026-H2 (2,5 %).
- Tilastokeskus: tabla PxWeb 11xs (kuluttajahintaindeksi).

## Casos

98 casos en 23 archivos. Oficiales: los 24 ejemplos de veroprosentit 2026 de vero.fi (palkka, eläke
y etuus de 10 000 a 70 000 €: el cálculo de `lib/verot.ts` da al centavo los 24), el piso con
yhtiölaina de varainsiirtovero, el de hankintameno-olettama, el de pörssiosinko, los ejemplos 6 a 8 de
osakesäästötili, los de kotitalousvähennys 2026, perintövero (1 300 y 1 050 €), lahjavero (2 000 y
4 675 €) y los importes de lapsilisä. El resto, recalculado con la norma y la cuenta escrita.

## Decisiones

- kunnallisvero y kirkollisvero como mapas de 308 municipios con `opcion-dato` (no regiones, que
  hubieran triplicado datos.json con 900 tramos).
- La cuenta de impuestos (lib/verot.ts) sigue la decisión de ennakonpidätys: el työtulovähennys va
  primero contra la valtion vero y el resto contra kunnallisvero, sairaanhoitomaksu y kirkollisvero
  en proporción; sairaanhoitomaksu 1,10 % más 0,39 % sobre lo que no es palkka (por eso 1,49 % en
  eläke y etuus). Neto mensual = palkka × (1 − verot/bruto anual) − TyEL − työttömyys.
- Tramos de normas fiscales con `desde` 2026-01-01 y `proximaRevision` 2027-01-01 sin `hasta`
  (como de). Kela y matkakorvaukset con `hasta` porque los valores 2027 ya están publicados.
- lomaraha no está en la ley: la calculadora pide el porcentaje (50 % por defecto) y el texto cita la
  guía de Verohallinto (se paga por TES, contrato o costumbre).
- kotitalousvähennys con palkka: sivukulut enteros, como dice el comunicado en finés (la página en
  inglés dice «15 % of the wages and the indirect wage costs», ambigua).
- Edad en palkkalaskuri en tres grupos (17, 18-64, 65-67) por TyEL, työttömyys, Yle-vero e ikäkorotus.
- «Tu sueldo en el mundo»: `mundo` declarado (Helsinki, sin iglesia, sin hijos). FI entra: 8,2 / 21,1 /
  39,2 %.
- Detectores: las decisiones de Verohallinto se actualizan en la misma URL, así que se vigila el año del
  título; ETK ya devuelve un hallazgo (TyEL 2027), que es una propuesta y no se cargó.

## Depende de

`claude/mundo-motor-eu` (motor pl/sv/da/nb/fi, e371d144) y `claude/mundo-trad-fi` (universales en
finés, 6fcbbbd1), ninguna mergeada en main. La rama sale de `claude/mundo-motor-eu`, mergea
`claude/mundo-trad-fi` (avance rápido, sin conflictos) y `origin/main` (286ecb06, sin conflictos).

## Checks corridos

Con fi publicado:

- `npx tsc --noEmit -p .`: OK.
- `check_motor --generar-cargadores`: 2353 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_paises fi`: OK, 58 datos (67 tramos verificados, 0 pendientes), 1 serie, 63 calculadoras,
  publicado; 1 aviso esperable (KHI deja de ser publicable antes del 24/11 si el cron no trae octubre).
- `check_paises_casos fi`: 98 casos en 23 archivos OK.
- `check_textos_paises fi`: 2139 textos, 0 avisos.
- `check_fronteras`: 7794 archivos OK. `check_eol`: 8689 archivos en LF.
- `check_seo_intl`: 7710 páginas intl OK en los dos modos.
- `check_ofertas_intl`: todas las de fi OK; 15 fallas, todas de `cl/sueldo-liquido` y `cl/finiquito`
  (UF), ajenas.
- `check_mundo`: FI incluido (declarado).
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (pares que no listan las mismas
  páginas), la falla conocida de main. Con `claude/mundo-arreglos-2026-10-24` mergeada en prueba
  (sin commitear, merge abortado): TODO OK, 8480 páginas en los dos modos. Ajena a fi.
- `check-all`: 151/155 suites verdes. Fallan `check_hreflang` y `check_ofertas_intl` (lo de arriba,
  ajeno) y `check_mes_en_render` (11 páginas de `src/app/(ar)`) y `check_panel_sql` (tablas
  ca_sueldos_* sin RLS), que fallan igual en `claude/mundo-motor-eu` sin fi. Ajenas a fi.
- Detectores contra la red (`scripts/paises/fi/probar_detectores.ts`): 6/6 responden (KHI 321 puntos
  hasta 2026-09 = 160, igual a series.json; tres decisiones de Vero y Suomen Pankki sin hallazgos; ETK
  con el hallazgo de 2027).

## Saltado

- Sin credenciales: no hubo pasos que las pidieran. Sin push ni PR (403), cuerpo en este archivo.
- `next dev` y `npm run build` no se corrieron (opcionales; la junction de node_modules no sirve
  para Turbopack y check-all cubre tsc y checks).

## Pendientes y riesgos

- **Revisión de un hablante nativo de finés pendiente**: los textos (contenido, etiquetas, errores y
  observaciones de las 23 locales) los escribió el agente; conviene que un nativo los lea antes de
  difundir, sobre todo los títulos y las preguntas frecuentes.
- La edición en sueco (fi-sv) queda para después.
- Cargar los valores de 2027 (asteikko, kunnat, ennakonpidätys, TyEL, työttömyys) cuando se publiquen;
  los datos fiscales no tienen `hasta`, así que en 2027 seguirían usando 2026 hasta actualizarlos.
- palkkalaskuri no modela otras deducciones (matkakulut, ay-jäsenmaksu ya no deducible desde 2026,
  kotitalousvähennys) ni ingresos de capital; lo dice en la observación.
- Tapaturmavakuutus del empleador no tiene tasa oficial única: queda como campo opcional.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
