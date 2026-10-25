# País ro: România en rumano (60 calculadoras, 20 locales, publicado)

## Qué incluye

Rama `claude/pais-ro`, basada en `claude/mundo-motor-ro` (**sin mergear: este PR depende de
`claude/mundo-motor-ro`**, que trae el rumano al motor, el diccionario de venta y las 41 universales en
rumano). Lleva además `origin/main` mergeado al empezar.

Mercado `src/paises/ro/` (codigo `ro`, pais `RO`, idioma `ro`, locale `ro-RO`, trato `usted`
según ADR 0002 D18: «dumneavoastră» implícito con la 2.ª del plural, «Calculați», «Introduceți»;
moneda RON, escala 4.5 de PAISES.md, nombre «România», zona Europe/Bucharest), publicado en el commit
`publicar ro` (estado `publicado`, alta al final de `PAISES`, cargadores y medición regenerados).

- 20 calculadoras locales: 15 `publicado` y 5 `borrador`.
  | slug | concepto | estado |
  |---|---|---|
  | calculator-salariu-net | sueldo-neto (CAS 25 %, CASS 10 %, impozit 10 %, deducere personală por persoane în întreținere y por tramo de 50 lei, deducere tineri sub 26 y 100 lei por copil, suma neimpozabilă 300/200 lei de 2026; entra en «Tu sueldo en el mundo») | publicado |
  | calculator-salariu-brut | propio (brut din net, búsqueda leu a leu porque el net no es monótono) | publicado |
  | cost-total-angajator | costo-empleador (CAM 2,25 %, sin la suma neimpozabilă) | publicado |
  | salariul-minim | salario-minimo (4.050 lei hasta el 30/6/2026, 4.325 lei desde el 1/7/2026, por hora, net y costo) | publicado |
  | calculator-tva | iva (21 % y 11 % desde el 1/8/2025; reemplaza la universal) | publicado |
  | calculator-pfa | regimen-simplificado (sistem real y normă de venit, CAS 12/24 SM, CASS 6..72 SM, pensionari, CAS opcional) | publicado |
  | calculator-microintreprindere | propio (impozit micro 1 %, plafon 100.000 EUR al curs BNR, dividendos 16 %) | publicado |
  | impozit-dividende | propio (16 % + CASS por tramos 6/12/24 SM) | publicado |
  | impozit-chirie | propio (20 % forfetar, 10 %, CASS por tramos) | publicado |
  | impozit-vanzare-apartament | propio (3 % hasta 3 años, 1 % después, grila notarilor) | publicado |
  | calculator-cass | propio (CASS sobre chirii, dividende, dobânzi, drepturi de autor) | publicado |
  | calculator-drepturi-de-autor | propio (40 % forfetar, 10 %, CAS y CASS por tramos, sin CAS con salario o pensión) | publicado |
  | curs-valutar-bnr | tipo-de-cambio (EUR, USD, GBP, CHF, MDL) | publicado |
  | calculator-inflatie | inflacion (IAPC de Eurostat para România, 2000-01 a 2026-09) | publicado |
  | calculator-depozit-bancar | plazo-fijo (impozit pe dobânzi 10 %, con o sin capitalizare) | publicado |
  | calculator-concediu-de-odihna | vacaciones | borrador (Codul muncii art. 145 no verificado) |
  | calculator-ore-suplimentare | horas-extra | borrador (Codul muncii art. 123 no verificado) |
  | calculator-preaviz | preaviso | borrador (Codul muncii art. 75 y 81 no verificados) |
  | calculator-concediu-medical | propio | borrador (porcentajes 55/65/75 % verificados en la Legea 141/2025; falta el art. 10 de la OUG 158/2005 y el texto final de la OUG 91/2025, el día no pagado) |
  | indemnizatie-crestere-copil | propio | borrador (OUG 111/2010 no verificada) |
- 40 universales en rumano con `universales: "todas"` (la de TVA cae porque hay TVA local).
- Total 60 (55 publicables hoy).
- SEO propio por página con las búsquedas rumanas: «calculator salariu net 2026», «calculator salariu
  brut din net», «cost total angajator», «salariul minim 2026», «calculator TVA», «calculator PFA»,
  «impozit micro», «impozit pe dividende 2026», «impozit pe chirie», «impozit vânzare apartament»,
  «calculator CASS», «drepturi de autor», «curs valutar BNR», «calculator inflație»,
  «calculator depozit bancar», «calcul concediu medical», «calculator concediu de odihnă».
- `series.json`: cursuri BNR EUR, USD, GBP, CHF y MDL (40 sesiones hasta el 23/10/2026, del XML
  `curs.bnr.ro`) e IAPC de Eurostat (`prc_hicp_minr`, 2025 = 100). `avisos.json` (1: la suma
  neimpozabilă vence el 31/12/2026), `novedades.ts` (4), `fuentes.ts` (9 detectores: 5 cursos BNR,
  IAPC Eurostat, Codul fiscal de ANAF por la marca «ultima actualizare», y 2 manuales: salariul
  minim y Codul muncii) y `scripts/paises/ro/probar_detectores.ts` (probado contra la red real: los 7
  automáticos responden, 0 hallazgos en el Codul fiscal).

## Datos

32 datos: 27 verificados el 24/10/2026 en fuente primaria y 5 no verificados.

- ANAF, Codul fiscal actualizado (última actualización: Legea nr. 170/2026),
  https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm: CAS 25 % (art. 138),
  CASS 10 % (art. 156), CAM 2,25 % (art. 220^3), impozit 10 % (art. 64), deducere personală (art. 77:
  tabla por persoane, 2.000 lei, 50 lei, 0,5 puntos, 15 % tineri, 100 lei copil), TVA 21/11 % (art. 291),
  impozit micro 1 % y plafon 100.000 EUR (art. 47 y 51), dividende 16 % (art. 97 alin. 7), dobânzi 10 %
  (art. 97), chirii 20 % (art. 84), drepturi de autor 40 % (art. 72), transfer imobiliar 3/1 % (art. 111),
  tramos CAS (art. 148), CASS (art. 170 y 174) y salario mínimo al 1 de enero (art. 135^1 alin. 3).
- HG nr. 1.506/2024 (4.050 lei, 24,496 lei/oră) y HG nr. 146/2026 (4.325 lei desde el 1/7/2026,
  25,949 lei/oră), en PDF publicado por ANAF.
- OUG nr. 89/2025, art. III (suma neimpozabilă 300 lei hasta 4.300 lei en el semestre 1, 200 lei hasta
  4.600 lei en el semestre 2; solo 2026), en PDF publicado por ANAF.
- Legea nr. 141/2025, art. IX (concediu medical 55/65/75 %), en PDF publicado por ANAF.
- BNR, XML de cursos de referencia (https://curs.bnr.ro/nbrfxrates10days.xml).
- Eurostat, IAPC România (fuente primaria del sistema estadístico europeo, datos de INS).

No verificados (motivo):
- `ro.concediu-odihna-minim` (20 zile), `ro.spor-ore-suplimentare` (75 %), `ro.preaviz` (20/20/45 zile
  lucrătoare): Codul muncii. legislatie.just.ro cierra la conexión TLS desde esta red (curl, Python y
  WebFetch) y no encontré el texto actualizado en otro sitio oficial.
- `ro.concediu-medical-plafon` (12 SM): OUG 158/2005 art. 10 en forma actualizada, misma causa; falta
  también el texto final de la OUG 91/2025 (el día no pagado entre el 1/2/2026 y el 31/12/2027).
- `ro.indemnizatie-copil` (85 %, 1.250 y 8.500 lei): OUG 111/2010; legislatie.just.ro y mmuncii.gov.ro
  (verificación anti-bot) no responden.

## Decisiones

- Codul fiscal leído en la copia consolidada de ANAF (ente recaudador) porque legislatie.just.ro no
  responde. Los decretos (HG, OUG, Legea 141/2025) también en los PDF de static.anaf.ro.
- Inflación con el IAPC de Eurostat y no con el IPC de INS: insse.ro y mmuncii.gov.ro responden con una
  verificación anti-bot que no se saltea, y TEMPO solo atiende por http. La página lo dice.
- Rotundeo: bases e impuesto a leu con 50 bani hacia abajo (art. 66 y normas al art. 64); CAS, CASS y CAM a
  leu con 50 bani hacia arriba, que es lo que da el net oficial del salario mínimo (2.699 lei a 4.325 brut;
  2.574 lei a 4.050 brut).
- Impozit micro con cota única de 1 % (art. 51 vigente), no 1 %/3 % como pedía el encargo.
- Impuesto de venta de inmueble 3 %/1 % (art. 111 vigente al 24/10/2026).
- CAS y CASS del PFA y de otras rentas con el salario mínimo del 1 de enero (4.050 lei para 2026).
- Claves de mapa sin «pana» (`max-3-ani`, `max-7`) porque check_textos lo toma como palabra sin
  diacríticos.

## Pedidos al motor

- `scripts/reglas_idioma.ts`: sumar «micro» a `PREFIJOS_RO`. Hoy «microîntreprindere» (la palabra
  correcta, DOOM) falla como «î» interior; los textos dicen «impozit micro» y «firme micro» para
  esquivarlo.

## Checks

Corridos en la rama con `ro` publicado (commit `publicar ro`):

- `npx tsc --noEmit -p .`: 0 errores.
- `check_motor --generar-cargadores`: 2353 pruebas OK (genera `cargadores/ro.ts`).
- `check_medicion_mercados --escribir`: 57 mercados intl.
- `check_paises ro`: OK (32 datos, 6 series, 60 calculadoras); avisos solo de vencimiento de series
  diarias si el cron no corre (BNR, a 30 días).
- `check_paises_casos ro`: 70 casos en 15 archivos, 0 fallas.
- `check_textos_paises ro`: 890 textos, 0 fallas.
- `check_fronteras`: 7743 archivos sin cruces. `check_eol`: 8586 archivos en LF.
- `check_seo_intl`: 7678 páginas intl, 0 fallas.
- `check_mundo`: OK; RO entra «declarado» con `ro.calculator-salariu-net` (carga 38,3 % / 41,5 % / 41,5 %).
- `check_ofertas_intl`: 15 fallas, todas de `cl` (UF), conocidas de main y arregladas en
  `claude/mundo-arreglos-2026-10-24`. Ninguna de ro.
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (conocido de main, arreglado en
  `claude/mundo-arreglos-2026-10-24`); ro suma `calculator-inflatie` al clúster y por eso crece el
  número. Ninguna fuera de ese clúster.
- `check-all`: 151/155 suites verdes. Fallan check_hreflang y check_ofertas_intl (lo de arriba),
  check_mes_en_render (11 páginas de `(ar)` que leen el reloj al cargar el módulo vía informeMundo) y
  check_panel_sql (18 fallas de tablas y grants de Supabase). Las dos últimas no tocan `src/paises/ro`.
- `scripts/paises/ro/probar_detectores.ts`: 7 detectores automáticos responden; 2 manuales.
- `npm run build` y `next dev`: no corridos (opcional según el brief común; la junction de node_modules
  no sirve para Turbopack).

## Pendientes y riesgos

- **Revisión de un hablante nativo de rumano pendiente** para todos los textos (registro
  «dumneavoastră», vocabulario fiscal, «de» en plurales).
- Verificar el Codul muncii, la OUG 158/2005 consolidada (y la OUG 91/2025 con su ley de aprobación) y
  la OUG 111/2010 para publicar las 5 calculadoras en borrador.
- El 1/1/2027 vencen `ro.salariu-minim-1-ianuarie` y la suma neimpozabilă (tramo 0 verificado desde
  2027): hay que cargar el salario mínimo al 1/1/2027 o las calculadoras de PFA, CASS, dividendos,
  chirie y drepturi de autor dejan de publicarse. El detector del salario mínimo es manual.
- Las preguntas frecuentes del salario mínimo citan el net de 2.699 lei de julio de 2026; con un salario
  mínimo nuevo hay que actualizarlas.
- Sin credenciales: no hubo push, PR, Supabase ni Vercel.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
