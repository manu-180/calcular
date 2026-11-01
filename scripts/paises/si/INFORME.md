# Informe del país: Eslovenia (si)

Rama `claude/pais-si`. **Depende de `claude/mundo-motor-sl`** (esloveno en el motor, ADR D32): no se puede integrar antes
que esa rama. Estado `interno`, sin registrar en `src/paises/index.ts`. Fecha de lectura de los datos: 2026-11-01.

## Calculadoras

24 locales, todas publicables, y 40 universales (`universales: "todas"`; la de IVA se cae por `ddv-kalkulator`). Total 64.

| Slug | Concepto | Publicable | Nota |
|---|---|---|---|
| izracun-place | sueldo-neto | sí | bruto a neto, con `mundo` declarado |
| neto-bruto-kalkulator | propio | sí | búsqueda por bisección sobre el cálculo de plača |
| strosek-delodajalca | costo-empleador | sí | suma contribuciones de la diferencia hasta la base mínima |
| minimalna-placa | salario-minimo | sí | |
| izracun-prispevkov | aportes-seguridad-social | sí | |
| kalkulator-dohodnine | impuesto-renta | sí | anual, con dodatna splošna olajšava |
| olajsava-za-otroke | propio | sí | |
| izracun-regresa | bono-semestral | sí | exento hasta la última povprečna plača (serie SURS) |
| zimski-regres | propio | sí | ZPZR |
| sp-normiranec | regimen-simplificado | sí | ZPZR y 59. člen ZDoh-2 |
| prispevki-sp | propio | sí | caso oficial: planilla FURS de octubre 2026 |
| ddv-kalkulator | iva | sí | 22, 9,5 y 5 % |
| davek-na-promet-nepremicnin | propio | sí | 2 % |
| letni-dopust | vacaciones | sí | |
| izracun-odpravnine | indemnizacion-despido | sí | |
| odpovedni-rok | preaviso | sí | |
| izracun-nadur | horas-extra | sí | el % lo escribe la persona |
| izracun-bolniske | propio | sí | |
| starsevski-dopust | propio | sí | sin el tope del nadomestilo, avisado en pantalla |
| otroski-dodatek | propio | sí | |
| izracun-pokojnine | jubilacion | sí | estimación; la base la pone la persona |
| kalkulator-inflacije | inflacion | sí | serie SURS |
| tecaj-evra | tipo-de-cambio | sí | serie Banka Slovenije |
| povprecna-placa | propio | sí | serie SURS |

## Datos

40 datos con 42 tramos, todos verificados en fuente primaria: Uradni list (Pravilnik 104/25), PISRS (ZDR-1, ZDoh-2, ZPIZ-2,
ZPZR, ZZVZZ, ZSDP-1, ZDDV-1, ZDPN-2, leídos por la API de sus textos consolidados), FURS (OZP, najnižja osnova, planilla SZ
10/2026, pavšalni prispevki), SPOT, gov.si (minimalna plača, otroški dodatek), ZPIZ (pokojninska osnova). Cinco series: IPC y
povprečna plača (SiStat), USD, GBP y CHF (Banka Slovenije).

### Sin verificar y por eso fuera del cálculo

- Tope del nadomestilo parental: 112.a člen ZSDP-1 habla de dos veces la plača promedio «con ajustes», sin monto oficial en un
  solo lugar. No se aplica y la pantalla lo dice.
- Porcentaje de nadure: 128. člen ZDR-1 lo deja a la convención colectiva. El 30 del campo es solo un valor inicial editable.

### Fechas `desde`

Donde solo se leyó el texto vigente, el tramo arranca en `2026-01-01` y no en la fecha histórica de la norma: no se afirma una
vigencia que no se leyó. Excepción: contribuciones (julio de 2025, dicho por SPOT), OZP y minimalna plača.

## Decisiones

- **ZIURS no está vigente.** El Odlok OdZIURS (Uradni list 1692/2026) fija el referendo para el **6 de diciembre de 2026**. Un
  resumen de búsqueda decía 22 de noviembre; vale el Odlok. Se calcula con las reglas de hoy (ZPZR para normiranci, sin
  socialna kapica) y hay un aviso `cautela` en ocho calculadoras, hasta el 31/12/2026. **Después del 6/12 hay que revisar**:
  si pasa, cambian normiranci (con efecto desde el 1/1/2026), zimski regres y tope de contribuciones.
- **Davek na nepremičnine anual: no se construyó.** PISRS marca ZDavNepr como neveljaven. Una calculadora con ese nombre
  engañaría. Se explica en la FAQ de `davek-na-promet-nepremicnin`.
- Debajo de la base mínima (1.521,62 €, mayor que la minimalna plača 1.481,88 €) el empleador paga PIZ, ZZ y DO del trabajador
  sobre la diferencia, y el trabajador solo starševsko y zaposlovanje (FURS, Dohodek iz delovnega razmerja).
- OZP y DO reducen la base del impuesto (FURS, mismo documento).
- En `otroski-dodatek` el orden de los hijos pone primero a los de secundaria, por ser mayores. Es una aproximación.

## Detectores

`scripts/paises/si/probar_detectores.ts`, corrido contra las fuentes reales: 3 de tipo de cambio (BSI, dato del 30/10/2026),
IPC y povprečna plača (PXWeb con `postJson`, 13 puntos, último 2026-09 y 2026-08), y 5 de norma sobre la API de PISRS, que
comparan la cantidad de versiones consolidadas (hoy sin hallazgos).

## Checks

`tsc`, `check_paises si`, `check_paises_casos si` (61 casos), `check_textos_paises si`, `check_seo_pais si`, `check_fronteras`,
`check_eol`, `check_ofertas_intl si`. Con registro local: `check_motor` (5123 pruebas) y `check_calendario` (157 fechas) en verde;
`check_mundo` con 1 falla ajena (`be`) y ninguna de `si`, aunque su salida no nombra a `si` y no confirmé que haya entrado a la
comparación. Los resultados de los casos se calcularon además con un script Python independiente.

`next dev` con registro local y estado publicado solo para mirar (revertido): `/si`, `/si/izracun-place`, `/si/kalkulator-kredita`,
`/si/sp-normiranec`, `/si/kalkulator-inflacije`, `/si/otroski-dodatek`, `/si/novedades` y `/si/letni-dopust` responden 200, sin
marcadores sin resolver. No se probó el cálculo en el navegador con clics.

## Pedidos al motor

- `src/motor/ui/contexto.ts:96` decide resolver la tarjeta con `marcadoresDe`, que no cuenta `{{anio}}`. Si el `h1` lleva solo
  `{{anio}}` y el primer párrafo no tiene marcador de dato, la tarjeta muestra `{{anio}}` crudo. Ningún check lo atrapa. Acá se
  rodeó poniendo un dato en cada primer párrafo, pero **puede estar pasando en otros países**.
- Un mercado `interno` da 404 en `next dev`, al revés de lo que dice `BRIEF-PAIS.md`. Hace falta además
  `NEXT_PUBLIC_SITIO_INTL_URL` y `TSX_DISABLE_CACHE=1` al levantar.

## Riesgos

- Sin revisión de un hablante nativo: los textos son míos, igual que los del motor (D32).
- Búsquedas: no se pudo consultar el autocompletar de Google en Eslovenia. Los slugs salen de las consultas del encargo y del
  vocabulario de las fuentes oficiales, sin medición de volumen.
- La akontacija no considera un segundo empleador, y `kalkulator-dohodnine` solo ingresos de empleo.
- `izracun-pokojnine` usa los porcentajes de 2026 y 2027, con tramo hasta el 31/12/2027: hay que cargar los siguientes de la
  tabla del 37. člen ZPIZ-2.
- Series con `maxAntiguedadDias`: sin el cron, tipo de cambio, IPC y povprečna plača dejan de publicarse antes del 1/12/2026
  (avisos de `check_paises`).
