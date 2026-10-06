# Informe de Ganancias 2026 — research de producto (2026-10-06)

## Quién compra y en qué situación está
Empleado en relación de dependencia con sueldo bruto arriba de ~$3.000.000 (soltero, 2.º semestre 2026): le aparece en el recibo una retención de Ganancias que en junio y diciembre se dispara por el aguinaldo. Llega a `/ganancias` buscando "cuánto me descuentan" y se va con un número que le duele. No es contador ni quiere serlo. Las preguntas que se hace, en orden:
1. ¿Cuánto voy a pagar en el año y por qué el recibo cambia tanto de un mes a otro?
2. ¿Hay algo legal que pueda hacer para pagar menos?
3. ¿Qué cargo, dónde, con qué papeles y hasta cuándo?

Es octubre: quedan tres recibos (más el aguinaldo de diciembre) y la ventana para completar el F.572 de 2026 llega al 31/3/2027. Lo que se carga ahora corrige lo acumulado desde enero (método acumulado), así que el momento es bueno y el producto puede decirlo.

## Qué le sirve de verdad (qué hace al día siguiente)
- Saber su **tramo marginal** y traducirlo a plata: "cada $100.000 por mes que deducís, te vuelven $X en el año". Una deducción no devuelve lo deducido, devuelve lo deducido × alícuota: casi nadie lo explica con SU número.
- Una lista corta de **deducciones que probablemente no está cargando**, cada una con el techo legal y cuánto le devolvería a SU alícuota, más el cálculo exacto si carga lo que paga.
- Los **papeles** que necesita para cada una (factura con CUIT del emisor, contrato, recibos) y el **paso a paso del SiRADIG** con los nombres reales de los botones.
- Un **plan para esta semana**: juntar comprobantes, cargarlos, enviar al empleador, revisar el próximo recibo.

## Mercado
- Gratis: calculadoras de retención (incluida la nuestra), notas de diarios que repiten los topes, guías PDF de ARCA por deducción (precisas pero sueltas y sin números personales).
- Pago: la consulta con un contador (honorario por consulta, muy por encima del precio de impulso).
- **Hueco:** nadie junta en un documento (a) la proyección mes a mes con el motor real, (b) cuánto le vuelve cada deducción a la alícuota de la persona y (c) qué hacer, en qué pantalla y hasta cuándo. El informe es eso, con fuentes y fecha.

## Normas y datos verificados (consulta: 6/10/2026)
| Tema | Fuente | Qué dice |
|---|---|---|
| Deducciones personales y escala 2.º semestre 2026 | PDF ARCA art. 30 y art. 94 (ya en `src/data/ganancias.ts`, verificados 29/7/2026) | MNI, especial, cónyuge, hijo; 9 tramos 5%–35%. |
| Art. 30 LIG (cargas de familia) | [InfoLEG, texto actualizado](https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm) | Cónyuge/conviviente e hijos < 18 (o incapacitados), a cargo y sin ingresos anuales > MNI; sólo los deduce el pariente más cercano con ganancias imponibles. |
| Hijos al 50% o 100% | [ARCA SiRADIG — cargas de familia](https://www.afip.gob.ar/572Web/carga-datos/familia.asp) | Si a los dos progenitores les retienen, cada uno 50% o uno el 100%. Hace falta el CUIL de cada carga. |
| Art. 85 LIG (deducciones generales) | InfoLEG, texto actualizado + [ARCA — deducciones generales](https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/deducciones-generales.asp) | Prepaga 5%; honorarios médicos 40% de lo facturado con tope 5%; donaciones 5%; seguro de vida y de retiro $753.472,14 c/u en 2026; intereses hipotecarios $20.000; sepelio $996,23. |
| Educación (art. 85 inc. j, Ley 27.701) | InfoLEG + ARCA (misma página) | Servicios y herramientas educativas de cargas de familia e hijos hasta 24 que estudian: tope 40% del MNI. |
| Alquiler (art. 85 inc. h) | ARCA [SiRADIG — alquileres](https://www.afip.gob.ar/572Web/carga-datos/alquileres.asp) + `src/data/deduccion-alquiler.ts` | 40% con tope MNI, sin ser titular de ningún inmueble; factura del locador. El 10% del inc. k) ya no corre para casa habitación desde 2026 (art. 192 Ley 27.802). |
| Casas particulares (Ley 26.063 art. 16) | `src/data/deduccion-domestica.ts` (verificado 13/8/2026) | Sueldo + contribuciones (sin ART), tope MNI. |
| Plazo del F.572 | ARCA [¿Qué datos cargar?](https://www.afip.gob.ar/572Web/carga-datos/que-datos-cargar.asp) y [guía paso a paso](https://www.afip.gob.ar/guias/paso-a-paso/Guia-SiRADIG-Como-presentar-Y-Como-Cargar-Pluriempleo.pdf) | Se puede presentar todos los meses; al 31 de marzo del año siguiente tiene que estar enviado para la liquidación anual. Botones: Crear nuevo borrador → Carga de formulario → Deducciones y desgravaciones → Agregar mes individual/rango → Agregar comprobante → Vista previa → Enviar al empleador → Generar presentación. |
| Ley 27.802 (B.O. 6/3/2026) | InfoLEG texto actualizado (búsqueda de las notas "27.802") | En la LIG tocó arts. 26 (inc. h y n), 57-bis/hacienda, residencia y un párrafo de ajuste: **no** cambió arts. 30 ni 85 para empleados, salvo el efecto del 26 n) sobre el 10% del alquiler. |

## Decisiones de producto
- Datos que viajan en el pago: sólo lo que la calculadora ya tiene (bruto, cónyuge, hijos, % sindical, otras deducciones mensuales). Lo que la persona paga de alquiler, prepaga, etc. lo carga en el informe, en su navegador.
- Todos los impuestos salen de `calcularRetencionMensual` (el motor de `/ganancias`). Los montos deducibles con sus topes salen de los motores de las calculadoras de deducciones (`deduccion-alquiler`, `deduccion-domestica`, `deducciones-generales`). La única regla nueva es el tope de educación (40% del MNI, derivado de `DEDUCCIONES.mni`).
- El total "hasta" de la oferta se arma con techos legales y se presenta como techo, nunca como promesa.
- Sin "tips" grises: nada de facturas a nombre de otros, inflar gastos ni cargar hijos que ya deduce el otro progenitor al 100%.

## Límites YMYL
- Es una referencia de cálculo con supuestos (sueldo fijo, SAC = 50%, un solo empleador). No reemplaza la liquidación del empleador ni a un contador.
- Cada deducción exige comprobantes; ARCA puede impugnar lo cargado sin respaldo. El informe lo dice al lado de cada una.
- No se dan fechas de devolución del empleador: se dice que recalcula lo acumulado y que la liquidación anual cierra lo que falte.
