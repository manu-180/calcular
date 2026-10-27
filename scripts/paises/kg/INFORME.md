# Kirguistán (`kg`): informe del agente

- Rama: `claude/pais-kg` (base `origin/main`). Último commit de código: `3a805e7a` (más el commit de este informe).
- Mercado: `kg`, ruso (`ru-KG`), KGS, `estado: "interno"`. `src/paises/index.ts` no se commitea (lo registra el coordinador).
- Total: **65 calculadoras** = 25 locales + 40 universales (`universales: "todas"`; la universal de IVA se cae sola porque hay `kalkulyator-nds` local).

## Calculadoras locales (25, todas `publicado`, todas con datos verificados)

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| kalkulyator-zarplaty | sueldo-neto (declara `mundo`) | sí | Código Tributario, ley de tarifas del Fondo Social |
| zarplata-na-ruki | propio (neto → bruto) | sí | ídem |
| podokhodnyy-nalog | impuesto-renta | sí | Código Tributario, art. 197 |
| strakhovye-vznosy | aportes-seguridad-social | sí | Ley de tarifas de aportes |
| nalogi-rabotodatelya | costo-empleador | sí | ídem |
| minimalnaya-zarplata | salario-minimo | sí | Ley de presupuesto 2026 a 2028 (aviso: 3608 сом desde 2027) |
| raschetnyy-pokazatel | conversor-unidad | sí | Resolución del Jogorku Kenesh n.º 1115-III |
| kalkulyator-nds | iva | sí | Código Tributario |
| nalog-s-prodazh | propio | sí | Código Tributario |
| edinyy-nalog | regimen-simplificado | sí | Código Tributario |
| nalog-na-pribyl | propio | sí | Código Tributario |
| penya-po-nalogam | propio | sí | Código Tributario |
| otpusknye | vacaciones | sí | Código de Trabajo 2025, arts. 68 y 95 |
| kompensatsiya-za-otpusk | propio | sí | Código de Trabajo, arts. 76 y 79 |
| sverkhurochnye | horas-extra | sí | Código de Trabajo, arts. 108 y 109 |
| vykhodnoe-posobie | indemnizacion-despido | sí | Código de Trabajo, art. 47 |
| zaderzhka-zarplaty | propio | sí | Código de Trabajo, art. 95 |
| bolnichnye | propio | sí | Reglamento de prestaciones (doc. 12601) |
| dekretnye | propio | sí | ídem y Código de Trabajo |
| kurs-valyut | tipo-de-cambio | sí, con detector | XML diario del Banco Nacional (НБКР) |
| kalkulyator-inflyatsii | inflacion | sí, con detector | IPC del Comité Nacional de Estadística (Нацстатком) |
| alimenty | pension-alimentos | sí | Código de Familia, art. 86 (reforma por Ley n.º 111 del 04.06.2025) |
| srok-preduprezhdeniya | preaviso | sí | Código de Trabajo, arts. 12, 24, 43, 46 y 169 |
| ispytatelnyy-srok | propio | sí | Código de Trabajo, arts. 12 y 24 |
| raschet-pri-uvolnenii | liquidacion-final | sí | Código de Trabajo, arts. 47, 94 y 95 |

## Datos

- **34 datos con 35 tramos verificados y 0 sin verificar**, más 6 series (USD, EUR, RUB, KZT, CNY e IPC). Todo se leyó en fuente primaria https con `verificadoEl: 2026-10-27`: CBD del Ministerio de Justicia (cbd.minjust.gov.kg), nbkr.kg y stat.gov.kg.
- Las cifras de las normas salen del texto de la última versión de cada ley. Para traerlo se usa la API del CBD: `GetDocument?DocumentCode=` y `GetEdition?editionId=&lang=ru` (la página web es una SPA y no trae el texto).
- No verificados: ninguno. Lo descarté en vez de cargarlo sin fuente: el impuesto a la propiedad (bases y coeficientes por decreto), «Үй-бүлөгө көмөк» (prestación con prueba de recursos) y los montos de «Балага сүйүнчү» y «Бала ырысы» (por decreto, no los leí en fuente oficial).

## Detectores (13) y prueba

`npx tsx scripts/paises/kg/probar-detectores.ts`, corrido hoy contra las fuentes reales:
- 5 de tipo de cambio del НБКР (`api-xml`): cada uno devolvió el valor del 28.10.2026 (USD 87,4492; EUR 97,5408; RUB 1,0815; KZT 0,1921; CNY 13,1154).
- `kg.ipc-stat` (html, portada de stat.gov.kg): `[]`, porque no hay un mes nuevo después del último punto de la serie.
- 7 de normas (`api-json`, versiones en el CBD): Código Tributario, Ley de tarifas, Código de Trabajo, Ley de presupuesto, Reglamento de prestaciones, Código de Familia y Resolución del índice de cálculo. Todos devolvieron `[]` (no hay versiones posteriores al 27.10.2026). El del Código de Trabajo ahora también vigila los datos de preaviso y período de prueba.

## Checks (corridos, con `kg` registrado localmente)

- `npx tsc --noEmit`: sin errores.
- `check_paises kg`: OK, 34 datos, 6 series, 65 calculadoras. 2 avisos esperables: `kurs-valyut` e `inflyatsii` dejan de ser publicables el 26.11.2026 si no corren los detectores.
- `check_paises_casos kg`: 94 casos en 25 archivos, OK.
- `check_textos_paises kg`: 1023 textos, 0 avisos.
- `check_fronteras`: 12 470 archivos sin cruces. `check_eol`: 13 689 archivos en LF.
- `check_motor`: 4111 pruebas OK. `check_mundo`: OK.
- `next dev --webpack -p 3111` con `NEXT_PUBLIC_SITIO_INTL_URL`: `/kg`, `/kg/srok-preduprezhdeniya`, `/kg/raschet-pri-uvolnenii` y `/kg/kalkulyator-kredita` (universal) responden 200, con su H1 en ruso y los marcadores resueltos.

## Riesgos y dudas para el coordinador

1. Preaviso: corre el vencimiento de sábado o domingo al día hábil siguiente (art. 12.3), pero no conoce los feriados de Kirguistán. Lo dice en una observación.
2. Período de prueba: aplica literalmente el art. 12.2 (el plazo vence el mismo día del último mes). Si en la práctica kirguisa se cuenta como «el día anterior», el resultado se corre un día.
3. Alimentos: el tramo empieza el 04.06.2025, que es la fecha de la Ley n.º 111. La entrada en vigor real puede ser unos días después de la publicación. El valor no cambia.
4. Liquidación final: los montos son brutos (antes de impuesto y aportes), y la calculadora lo aclara. No digo nada sobre la exención de la indemnización porque no lo leí.
5. Infraestructura: un push de esta sesión devolvió 403 (credencial `developers-insights`). El siguiente pasó sin cambiar nada. Además, cbd.minjust.gov.kg corta el TLS con curl/schannel, pero `fetch` de Node funciona, que es lo que usan los detectores.
6. Con node_modules como junction, `next dev` con Turbopack falla («Symlink node_modules is invalid»). Hace falta `--webpack`.
