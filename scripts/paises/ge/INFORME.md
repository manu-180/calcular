# Georgia (ge): informe del agente

Rama `claude/pais-ge`. **Depende de `claude/mundo-motor-ka` sin mergear** (idioma `ka`, ADR 0002, D26): hay que
integrar ese motor antes o junto con este país. `estado: "interno"`, sin tocar `src/paises/index.ts`.

## Calculadoras locales (23, todas publicables)

| Slug | Concepto | Nota |
|---|---|---|
| khelpasis-kalkulatori | sueldo-neto | 20 % y 2+2+2; caso oficial del Fondo de Pensiones (1000 → 784); declara `mundo` |
| bruto-netodan | propio | inversa, mismo ejemplo oficial |
| damsakmeblis-kharji | costo-empleador | bruto + 2 % |
| sashemosavlo-gadasakhadi | impuesto-renta | salario, renta, plusvalía, dividendo, interés |
| mtsire-biznesis-gadasakhadi | regimen-simplificado | 1 %, 3 %, topes 500 000 y 700 000, micro 30 000 |
| dghg-kalkulatori | iva | 18 % y tope de registro; reemplaza la universal del concepto (slug igual) |
| dividendis-gadasakhadi | propio | 5 %, con opción desde la ganancia (15 % + 5 %) |
| saprotsento-shemosavlis-gadasakhadi | propio | 5 %, excepción art. 131.5; ver riesgos |
| konebis-gadasakhadi | propio | 0,8 a 1 %, exento hasta 100 000 de ingreso familiar; tierra afuera |
| kiris-gadasakhadi | propio | alquiler residencial 5 %, otro 20 % |
| binis-gakidvis-gadasakhadi | propio | 5 % sobre la diferencia; exento pasado 2 años (vivienda) o 6 meses (auto) |
| mogebis-gadasakhadi | propio | 15 % sobre monto / 0,85 |
| shvebulebis-anazghaureba | vacaciones | 24 días hábiles, art. 36 |
| zeganakveturi-anazghaureba | horas-extra | la ley no fija recargo: lo ingresa la persona |
| gatavisuplebis-kompensatsia | indemnizacion-despido | 1 o 2 meses según preaviso |
| gaprtkhilebis-vada | preaviso | 30 y 3 días |
| dekretuli-shvebuleba | propio | solo días y fechas (183 o 200); sin monto, ver abajo |
| daavadebis-anazghaureba | propio | 40 y 60 días; art. 46.4: sin pago salvo ley o contrato |
| sapensio-shenatani | aportes-seguridad-social | 2+2+2 con tramos anuales 24 000 y 60 000 |
| dagrovebiti-pensia | jubilacion | proyección con rendimiento supuesto por la persona |
| khelpasis-dagvianeba | propio | 0,07 % por día, art. 41.4 |
| valutis-kursi | tipo-de-cambio | NBG: USD, EUR, GBP, TRY, RUB |
| inflatsiis-kalkulatori | inflacion | IPC Geostat 2010 = 100, desde 2000 |

Universales: `"todas"`, entran 40 (la de IVA cae por la local). `check_ofertas_intl` en verde.

**Salario mínimo: no hay calculadora ni dato.** El art. 41 del Código Laboral deja forma y monto al contrato; el
decreto de 1999 está en matsne, que no se pudo leer. No se cargó ninguna cifra.

## Fuentes

**matsne.gov.ge responde «Access Denied» desde esta conexión**, con curl y con navegador real, sin captcha que
resolver: parece un bloqueo del sitio y no se intentó esquivarlo. Se usaron copias oficiales de otros organismos:

| Norma | Fuente leída | Estado |
|---|---|---|
| Código Tributario | infohub.rs.ge (Servicio de Ingresos), consolidado con enmiendas hasta 16/10/2026 | al día |
| Ley de pensión acumulativa | site-api.pensions.ge, PDF del Fondo, publicado 21/09/2026 | al día |
| Código Laboral | sla.gov.ge, PDF con enmiendas al menos hasta 2023 | **revisar contra matsne** |
| Curso | API de nbg.gov.ge, 18/10 a 31/10/2026 | al día |
| Tasa de política | nbg.gov.ge, decisiones del comité: 8,25 % desde 6/5/2026, ratificada 21/10 | al día |
| IPC | xlsx de geostat.ge, hasta 09/2026 | al día |

`desde` de los datos tributarios y laborales es 2026-01-01 por prudencia: no es la fecha de la norma sino el inicio
del año leído. Por eso los textos no usan `{{id#desde}}` con ellos.

## No verificados

- `ge.dekretuli-dakhmareba`: monto del subsidio de maternidad. El art. 39 lo delega en un decreto de gobierno que
  está en matsne. Sin usar en ninguna calculadora; `dekretuli-shvebuleba` solo cuenta días y lo dice en el texto.
  Ni siquiera el valor de pista (2000) salió de una fuente oficial.

## Detectores (probados con `scripts/paises/ge/probar_detectores.ts`)

- Series `ge.usd/eur/gbp/try/rub-nbg`: devuelven el punto del 31/10/2026, normalizado por unidad.
- `ge.sagadasakhado-kodeksi`: última enmienda en la API de infohub (necesita el encabezado `languageCode`). `[]`.
- `ge.pensia-kanoni`: fecha del PDF en la API del Fondo. `[]`.
- `ge.mpr-nbg`: página de decisiones. `[]`. Es burdo: solo mira que siga apareciendo 8.25.
- `ge.cpi-geostat`: Geostat publica solo en xlsx y `Http` no lee binarios, así que vigila el id del archivo y avisa.
  **La serie `ge.cpi` no se actualiza sola**: si nadie carga el mes, la calculadora deja de publicarse a los 70 días.
  Para esto se sumó el dato `ge.cpi-bazisi` (base 100), porque un detector de norma exige un dato existente.
  Pedido al motor: `Http` binario o xlsx.
- Código Laboral: sin detector, porque matsne no responde.

## Checks (con el país registrado localmente)

`tsc` 0 errores; `check_paises ge` OK (47 datos, 46 tramos verificados, 6 series, 63 calculadoras, 2 avisos de series
que vencen sin cron); `check_paises_casos ge` 57 casos en 23 archivos; `check_textos_paises ge` 911 textos, 0 avisos;
`check_seo_pais ge` sin fallas, 21 páginas por debajo del objetivo de 220 palabras (150 a 216, mínimo 90);
`check_ofertas_intl`, `check_fronteras`, `check_eol` OK; `check_motor` 4884 pruebas OK. `check_mundo` falla por `be` (neto de Bélgica, ajeno a este país) y `ge` no aparece en su lista: revisarlo al publicar.

No se abrió `next dev`: exige `npm ci` real en el worktree y no aporta sobre los checks; queda para la integración.

## Riesgos y dudas

1. **Interés de depósitos.** El art. 131.5 leído dice que el interés recibido de una institución financiera licenciada
   no tributa en la fuente. Es lo que implementa la calculadora, pero el rs.ge antiguo habla de 5 % general y de
   memoria los bancos retienen sobre depósitos. El texto pide comprobar el extracto. Que lo revise alguien local.
2. **Licencia por enfermedad.** La lectura del art. 46.4 (sin pago salvo ley o contrato) no cubre posibles normas
   especiales del sector público; el texto lo advierte.
3. **Divisor de días** (vacaciones, enfermedad): el Código no lo fija. Es un supuesto declarado en la página.
4. **Código Laboral sobre copia de sla.gov.ge**: confirmar contra matsne antes de publicar, en especial arts. 27, 31, 37, 48.
5. **Slugs y búsquedas**: transliteración de 2002 sobre términos reales, pero WebSearch es solo de EE. UU.: no se pudo
   mirar el autocompletar de Google en Georgia.
6. **Georgiano sin revisión nativa**, igual que el motor (D26).
