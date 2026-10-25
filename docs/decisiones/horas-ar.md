# «¿Cuántas horas de trabajo te cuesta?» en calcular.ar (2026-10-25)

Enganche principal del inicio desde el 25/10/2026: reemplaza a «¿Hasta qué día del año trabajás para el
Estado?», que no se entendía sin explicación. Página: `/cuantas-horas-de-trabajo` (el mismo slug que el
índice en español de calcularya).

## Cuenta

Valor hora = sueldo mensual en mano ÷ (días por semana × horas por día × 4,33). Con sueldo bruto, primero
se restan aportes (17 % con tope SIPA) y una Ganancias estimada sin cargas de familia (`lib/ganancias`).
Sin sueldo, la página usa la hora del SMVM (`lib/horas/ar.ts`), que es bruta, y lo dice.

## Precios: qué entra y de dónde

| Ítem | Fuente | Vence |
|---|---|---|
| Asado, pan, leche, huevos, dulce de leche, cerveza, café | INDEC, precios promedio GBA (API de series de datos.gob.ar, serie `105.1_I2*`, una por pedido) | fin del mes del dato + 3 |
| Nafta súper y tanque de 50 litros | Secretaría de Energía, CSV de precios vigentes (Res. 314/2016): mediana de las estaciones de la Ciudad que informaron en los últimos 30 días, mínimo 8 | lectura + 45 días |
| Canasta básica total | INDEC (`data/canasta-basica.ts`, ya en el sitio) | fin del mes del dato + 3 |
| Spotify Premium | precio oficial (`lib/horas/precios.json`) | lectura + 120 días |

Se actualizan solos en la ronda mensual (`scripts/cron/mensual.ts` y `.github/workflows/mensual.yml`):
`scripts/horas/actualizar_cotidianos_ar.ts` escribe `lib/horas/cotidianos-ar.json` y
`scripts/check_horas_ar.ts` frena la publicación si algo está vencido, sin fuente o fuera de banda.

## Descartados

- **Yerba**: está en el catálogo, pero la serie de la API (`105.1_I2YM_2016_M_19`) devuelve solo 11 puntos
  hasta 2017-02 (25/10/2026). El script rechaza un período vencido, así que el ítem aparece solo cuando la
  API se arregle. El XLS del INDEC sí la trae, pero leer XLS (BIFF) pide una dependencia nueva.
- **iPhone**: Apple no vende en la Argentina. Un «precio importado» (dólar oficial + impuestos) sería una
  cuenta nuestra con un régimen que cambió varias veces: no es un precio oficial. En cambio, la página
  muestra cuánto costaría un iPhone 17 afuera con las mismas veces el salario mínimo de cada país, con el
  índice internacional de calcularya (precios de la tienda oficial de Apple).
- **Alquiler**: no hay precio oficial.
- **Subte y colectivo**: la tarifa cambia todos los meses y no hay un dato abierto que se pueda leer solo;
  cargarla a mano rompe la regla de 100 % automático.

## Link compartido y privacidad

`/cuantas-horas-de-trabajo/<ítem>.<minutos>` (noindex, canonical a la página). Lleva solo el ítem y un
valor de `ESCALA_COMPARTIDA` (`lib/horas-ar/formato.ts`), nunca los minutos exactos ni el sueldo: con el
precio público, los minutos exactos dejaban deducir el valor hora con ±0,5 %. La escala es casi geométrica
(5, 10, 15, 20, 25, 30, 40, 50 min; 1 h, 1 h 15, 1 h 30, 2, 2 h 30, 3, 4, 5, 6, 8, 10, 12, 15, 20 h…) y
cada valor cubre un rango de valor hora de ±10 % o más, igual que las franjas de «Tu sueldo en el mundo».
`check_horas_ar` lo prueba con el redondeo a minutos enteros (el más angosto, 25 min, da justo 1,1 / 0,9).
La pantalla propia muestra los minutos exactos; el link, la tarjeta y el texto dicen «cerca de» y el valor
de la escala. Un valor fuera de la escala va con 308 al que le toca; uno inválido es 404. La tarjeta OG
(`og?c=…&formato=historia|cuadrado`) lee solo `c` y `formato`, y da 404 con un valor fuera de la escala.

## Puente desde /sueldo-neto

Una sola línea (mismo A/B «con/sin»): ahora lleva a horas y deja el sueldo en sessionStorage
(`ca-horas-sueldo`) y el bruto para el mundo. El mundo queda a un toque desde la página de horas.
