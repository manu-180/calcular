# Por qué ven las planillas y no compran · análisis del 2026-11-03

Pregunta de Manuel: muchos ven la oferta de las planillas, pocos tocan «Comprar». Datos: `ca_eventos`,
`ca_vistas`, `ca_checkouts`, `ca_compras` (medición propia, personas distintas por `vid`), las
preferencias y pagos de MercadoPago (`tools/embudo-planillas.ts`, libre_albedrio) y Search Console
(`docs/medicion/ultimo.json`). Ventana principal: 30 días, 4/10 → 3/11/2026. Ventas: 60 y 90 días.

## El embudo entero (30 días, personas)

| Paso | Personas | Del paso anterior |
|---|---:|---:|
| Vieron una oferta de planilla (media pantalla, 1 s) | 2271 | — |
| Tocaron un botón de compra («Comprar», «Comprar mi planilla») | 128 | 5,6 % |
| Tocaron «Ver la planilla» hacia una landing | 40 | 1,8 % |
| Abrieron el diálogo del mail | 27 | 21 % de los toques |
| Mandaron el mail y llegaron a MercadoPago | 13 | 48 % |
| Pagaron (MP, 4/9 → 3/11: 35 preferencias, 13 pagos) | ~5 por mes | 37 % |

Semana a semana los checkouts venían subiendo (2, 2, 3, 3, 5 del 28/9 al 1/11) con las vistas de
oferta (449 → 755): el embudo no está roto, está angosto en dos lugares.

## Dónde se pierde la gente

**1. En el diálogo del mail (arreglado hoy).** Pedíamos el mail antes de ir a MP «para mandarte el
recordatorio si no terminás». La mitad de los que abrían el diálogo no lo mandaba (27 → 13). Y el
recordatorio no recuperó a nadie: las 16 ventas de los últimos 90 días se pagaron entre 0 y 12
minutos después del checkout. MP devolvió el mail del comprador en las 16, incluidas las 3 anteriores
al diálogo. Desde hoy «Comprar» va derecho a MercadoPago (`docs/decisiones/compra-directa.md`).

**2. En a quién se le ofrece: Comercio.** Comercio es el producto que más gente ve y el que menos
vende.

| Producto | Vieron la oferta | Tocaron Comprar | Diálogo | Checkout | Ventas 60 d |
|---|---:|---:|---:|---:|---:|
| Comercio ($14.900) | 1055 | 48 (+8 ver) | 4 | 1 | 1 |
| Casas particulares ($9.900) | 515 | 23 (+4) | 7 | 5 | 5 |
| Camioneros ($14.900) | 228 | 8 (+11) | 4 | 2 | 2 |
| UOCRA ($14.900) | 222 | 19 (+7) | 7 | 4 | 6 |
| Monotributo ($9.900) | 181 | 11 | 2 | 1 | 0 |
| Alquileres ($9.900) | 44 | 16 | 0 | 0 | 0 |
| Mi sueldo ($6.900) | 24 | 1 (+1) | 1 | 0 | 0 |
| Vacaciones / Plazo fijo | 17 / 9 | 1 / 0 | 1 / 0 | 0 | 0 |

La oferta de Comercio en `/convenios/comercio` la vieron 654 personas y la tocaron 10 (1,5 %). La
misma oferta, con el mismo diseño, en `/convenios/uocra` la tocan 9,7 % y en `/convenios/camioneros`
7,9 %. No es la oferta: es la gente. Search Console dice quién entra a `/convenios/comercio`:
«cuánto gana un empleado de comercio», «cuánto cobra un empleado de comercio por 8 horas / 4 horas»
(11.488 impresiones en 14 días). Son empleados mirando su sueldo. La planilla liquida sueldos: es
para el que paga. Lo mismo en `/convenios/comercio/octubre-2026` (233 vieron, 26 tocaron «Ver la
planilla», 11 %, y en la landing no pasó nada) y en el blog de «modelo de recibo de sueldo» (77 → 11
→ nada: buscan un modelo de recibo, y la planilla de Comercio no trae hoja de recibo; la de Casas
particulares sí).

Lo que sí vende confirma la lectura: Casas particulares vende desde `/aportes-empleada-domestica` y
`/deduccion-empleada-domestica` (páginas del que paga: 3 inicios, 3 ventas), UOCRA desde Google
directo a `/planillas/uocra` («recibo de sueldo uocra excel», «calculadora sueldos uocra»:
4 inicios, 3 ventas) y Camioneros desde la calculadora del convenio (2 inicios, 2 ventas).

**3. Landings que reciben a la persona equivocada.** `/planillas` (Comercio) convierte 2,4 % a
diálogo contra 5,6 % UOCRA y 10 % Casas, con la misma plantilla: su tráfico de Google son consultas
de calculadora («calculadora faecys», «calcular sueldo empleado de comercio», posición 63). Las
landings chicas rebotan por lo mismo: `/planillas/vacaciones` 74 % de rebote («planilla vacaciones»,
«vacaciones 2026.xlsx»: buscan un archivo gratis), `/planillas/alquileres` 54 % (9 s de mediana),
`/planillas/mi-sueldo` 52 %, `/planillas/monotributo` 49 % y 0 toques en 43 visitantes.

**4. Celular.** 583 personas vieron una oferta en el celular, 24 tocaron Comprar, 6 abrieron el
diálogo y 1 llegó a MP (escritorio: 1684 → 104 → 21 → 12). Pocos casos para afirmar más que esto:
el diálogo en el celular perdía 5 de 6. Hoy ya no existe; se vuelve a mirar el 1/12.

**5. Mediciones que no cierran (anotado, sin tocar).** En `/inflacion/alquiler` 16 personas vieron
la oferta y 16 tocaron: la oferta se monta recién con el resultado y el observador de `vista_oferta`
no siempre la ve; esa página tiene además 3,2 % de clics de rabia nuevos. Y en septiembre 39 de las
43 «preferencias» de Comercio eran un GET diario a las 07:57 sin visitante ni página (un bot):
la línea de base «40 inicios, 1 venta» del 27/9 estaba inflada por eso, ya resuelto el 13/10.

## Qué se hizo hoy

- «Comprar» → MercadoPago directo en todas las planillas e informes; mail opcional en el POST y en
  `/planillas/comprar`. Medición: `checkout` por toque de Comprar (hoy 10 %), ventas/mes (hoy ~5) y
  tasa checkout → pago en MP (hoy 37 %). Evaluación el 2026-12-01.

## Qué sigue (en orden de plata esperada)

1. **Comercio: ofrecerle al que paga, no al que cobra.** En `/convenios/comercio`, los meses y el
   blog, la gente es empleada. Dos caminos, los dos medibles con `<Variante>`:
   - En las páginas de empleados, bajar la oferta de la planilla de liquidación a un link discreto
     («¿Liquidás sueldos? Planilla para el empleador») y probar arriba algo para el empleado
     (controlar el recibo: la calculadora gratis ya lo hace; «Mi sueldo» a $6.900 no tiene señal
     todavía, 24 vistas y 0 ventas).
   - Llevar la planilla de Comercio a páginas de empleador: `/aguinaldo`, `/libro-sueldos`,
     `/certificado-trabajo`, el blog de «cómo liquidar» (10 vistas de oferta, 1 toque: poco tráfico
     pero la gente correcta) y, sobre todo, SEO para «planilla liquidación sueldos comercio excel»,
     «liquidar sueldo empleado de comercio», que es como vende UOCRA.
   - Sumar una hoja «Recibo» a la planilla de Comercio: es lo que piden los 77 lectores del post de
     modelo de recibo que tocaron y se fueron, y Casas particulares (que la tiene) vende 5 de 5.
2. **Landings chicas: dar algo antes de vender.** Vacaciones, alquileres, mi sueldo y monotributo
   reciben gente que busca un archivo gratis o una calculadora. Una vista previa usable (la hoja con
   un caso editable) o el link a la calculadora gratis arriba del todo convierte el rebote en uso;
   hoy el rebote es 49–74 %. Experimento `rebotes` por landing.
3. **Monotributo: kill criteria en marcha.** 181 vistas de oferta, 11 toques, 0 ventas en 60 días
   y una landing sin un solo toque en 43 visitantes. Si al 2026-12-01 sigue en cero, se archiva la
   planilla y queda la calculadora.
4. **Medición.** Observar `[data-oferta]` también cuando se monta tarde (MutationObserver o
   re-observar al renderizar la oferta): sin eso, las ofertas que aparecen con el resultado
   (alquiler, plazo fijo, vacaciones) no cuentan vistas y su tasa de toque sale inflada.
