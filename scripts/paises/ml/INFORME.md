# Malí (`ml`): informe del agente

- Rama: `claude/pais-ml` (base origin/main). Commits: `3c61ad0e`, `6aeef4ea` y el de este informe (ver `git log`).
- Mercado: `fr-ML`, `fr`, trato `usted` (vous), XOF, `Africa/Bamako`, escala 600, estado `interno`.
- 21 calculadoras locales (19 publicables, 2 en borrador) + 40 universales (`universales: "todas"`; la universal de TVA cae porque hay `calcul-tva` local). En `next dev` la home lista 59 calculadoras.

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| calcul-its | impuesto-renta | sí | CGI art. 7, 9 a 12-B (DGI) |
| calcul-salaire-net | sueldo-neto | **no** (borrador) | falta la tasa de jubilación INPS del asalariado verificada; declara `mundo` |
| calcul-tva | iva | sí | CGI art. 229: 18 % y 5 % |
| smig | salario-minimo | sí | decreto 2015-363 reproducido en el CGI de la DGI |
| preavis | preaviso | sí | Código del trabajo L.41 |
| indemnite-licenciement | indemnizacion-despido | sí | L.53 |
| indemnite-depart-retraite | propio | sí | L.55 |
| indemnite-services-rendus | propio | sí | L.54 (renuncia con 10 años o más) |
| conges-payes | vacaciones | sí | L.148 a L.162 |
| heures-supplementaires | horas-extra | sí | L.131, L.137 |
| conge-maternite | propio | sí | L.179 a L.182 |
| cotisation-amo | propio | sí | decreto 10-578 (JO 2010-48) |
| taxes-sur-salaires | propio | sí | CFE, TFP, TEJ (CGI) y taxe logement |
| cout-employeur | costo-empleador | **no** (borrador) | faltan las tasas patronales INPS verificadas |
| impot-revenus-fonciers | propio | sí | CGI art. 16 a 22 |
| impot-synthetique | regimen-simplificado | sí | CGI art. 70 a 74 |
| impot-sur-les-societes | propio | sí | CGI art. 85 y 86 |
| calcul-irvm | propio | sí | CGI art. 42 |
| retenue-non-residents | propio | sí | CGI art. 94 a 97 |
| convertisseur-euro-fcfa | tipo-de-cambio | sí | paridad fija BCEAO |
| convertisseur-dollar-fcfa | propio | sí | serie `ml.usd-xof` (BCEAO, diaria) |

## Datos

33 datos, todos con tramo verificado hoy (2026-10-27) salvo 2. Fuentes:

- **CGI publicado por la DGI** (`https://www.dgi.gouv.ml/CGI/`, versión consolidada al 2 de agosto de 2017, la que enlaza la propia DGI desde «Les impôts à payer»): ITS (barème, reducciones familiares, 2 puntos, tope 4 % de jubilación), TVA, SMIG (nota del decreto 2015-363), CFE/TFP/TEJ/taxe logement, IRF, impuesto sintético, IS y mínimo forfaitario, IRVM, retención a no residentes.
  - Para el ITS hay confirmación explícita y reciente: el DG de Impuestos responde en *Impôt Com* n° 38 (dic. 2025) que el art. 10 sigue sin cambios y que la grilla distinta de la ley de finanzas 2024 es un error material del anexo de gastos fiscales.
  - Los tipos de las taxes sur salaires coinciden con la página actual de la DGI «Les impôts à payer».
- **Código del trabajo** consolidado (sgg-mali.ml, incluye leyes 2017-021 y 2019-025): preaviso, despido, servicios prestados, jubilación, vacaciones, horas extra, maternidad.
- **JO 2010-48** (sgg-mali.ml): decreto 10-578, tasas AMO 3,06 % / 3,50 % / 4,48 %.
- **BCEAO**: paridad 655,957 y cotización del dólar (585,25 al 27-10-2026).

No verificados (con motivo en `datos.json`):

- `ml.inps-retraite-salarie` (3,6 %) y `ml.inps-employeur` (5,4 / 8 / 1 %): la tasa se fija por decreto (Código de previsión social, art. 192). El sitio del INPS no responde y el decreto no aparece en el texto de ~1 470 JO revisados (1999 a 2026). El 3,6 % solo figura en guías privadas, que además se contradicen entre sí.

## Detectores (probados contra la red real con `npx tsx scripts/paises/ml/probar_detectores.ts`)

- `ml.bceao-dollar` (serie): devuelve 2026-10-27 = 585,25.
- `ml.dgi-documents` (norma, API de medios WordPress de la DGI): 0 hallazgos desde hoy; con fecha 2025-01-01 encuentra 3 (ordonnance 2025-007, arrêté 2025-0033, instruction 001/2026).
- `ml.sgg-journal-officiel` (norma, lista de JO del SGG): 0 hallazgos después del n° 23/2026; con umbral n° 20 encuentra 21, 22 y 23. También detecta los números de años posteriores.

## Checks (corridos)

- `npx tsc --noEmit`: sin errores.
- `check_paises ml`: OK, 33 datos (2 pendientes), 61 calculadoras; aviso esperado de que `ml` no está en `src/paises/index.ts` y de que la serie del dólar vence si el cron no la actualiza.
- `check_paises_casos ml`: 51 casos en 19 archivos, todos OK.
- `check_textos_paises ml`: 824 textos, 0 avisos.
- `check_fronteras`: 12 451 archivos OK. `check_eol`: OK.
- Con `ml` registrado localmente (sin commitear): `check_motor` TODO OK (4 111 pruebas); `check_mundo` TODO OK (Malí no aparece: mercado `interno` y sueldo neto en borrador).
- `next dev` (webpack, puerto 3113, con `NEXT_PUBLIC_SITIO_INTL_URL`): `/ml`, `/ml/calcul-its` y `/ml/calcul-mensualite-pret` dan 200 con los marcadores resueltos; los borradores dan 404.

## Riesgos y dudas para el coordinador

1. **INPS**: con la tasa de jubilación verificada (decreto o barème del INPS), `calcul-salaire-net` y `cout-employeur` pasan a publicables cambiando el estado del dato. Están escritas y probadas con `valores`.
2. **CGI consolidado de 2017**: es el texto que publica la DGI. Revisé los anexos fiscales 2019 a 2021, las leyes de finanzas 2024 a 2026 y las modificaciones del CGI en los JO 2023 a 2026 (loi 2023-048, ord. 2025-006 y 2025-015): ninguna toca los artículos usados. Los anexos 2018 y 2022 son PDF escaneados y no los pude leer.
3. La **ley 2019-074** modificó otra vez el art. L.60 (edades de jubilación) y no encontré su texto: por eso no hice calculadora de edad de jubilación. La ley 2022-005 (art. L.35, desempleo técnico) no afecta a las calculadoras.
4. **ITS, art. 12-B**: la redacción es ambigua («multiplicando los derechos liquidados por la tasa real menos dos puntos»). Apliqué la lectura coherente: ITS = base × (tasa real − 2 puntos), mínimo cero. Da 0 para el SMIG, como manda el decreto del SMIG.
5. `next dev` con Turbopack falla en este worktree por el junction de `node_modules`; con `--webpack` funciona.
