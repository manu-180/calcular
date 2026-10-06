# Planilla de vacaciones 2026 — research de producto (6/10/2026)

## Quién compra y en qué situación está

El **empleador chico**: comercio, consultorio, estudio, pyme de 3 a 40 personas, y el **estudio contable**
que liquida para clientes. Hoy (octubre) arranca el período legal de otorgamiento (1/10 al 30/4, art. 154
LCT) y tiene, en las próximas semanas, tres obligaciones concretas por cada persona del equipo:

1. Saber **cuántos días le tocan** (escala por antigüedad al 31/12, art. 150; requisito de medio año de
   días hábiles, art. 151; proporcional de 1 día cada 20 trabajados, art. 153).
2. **Avisar por escrito con 30 días de anticipación** la fecha de inicio (art. 154, texto de la Ley 27.802),
   que tiene que caer en **lunes, o el hábil siguiente si el lunes es feriado** (art. 151).
3. **Pagar al inicio** la retribución (sueldo ÷ 25 por día, art. 155 inc. a), que a la caja le pega distinto
   según en qué mes salga cada uno.

Lo que hace con el entregable al día siguiente: carga el equipo una vez, prueba fechas hasta que no quede
ninguna alerta, imprime una nota de vacaciones por persona para que la firme, y sabe cuánta plata necesita
en noviembre, diciembre, enero… Si alguien se va en el medio, saca las vacaciones no gozadas para la
liquidación final.

El **empleado** también usa la calculadora (para saber cuántos días y cuánto cobra). La oferta no le habla
a él: va debajo del resultado, rotulada para quien tiene gente a cargo, y el resultado gratis no cambia.
Lo que se suma a la calculadora (fecha de inicio opcional → hasta cuándo, cuándo vuelve, hasta cuándo
tienen que avisarte) le sirve igual a los dos.

## Qué hay en el mercado

- Plantillas genéricas gratis (Coverflex, Factorial MX, Absentify, Actualícese): calendarios de ausencias
  con saldo de días. Son de otros países, no saben de la escala del art. 150, del divisor 25, del aviso de
  30 días ni de la regla del lunes. No hacen la nota.
- Software de RR. HH./liquidación (suscripción mensual): resuelve todo, pero es caro y excesivo para un
  equipo de 5.
- Modelos de nota sueltos en foros y blogs jurídicos, muchos con la anticipación **vieja de 45 días** (texto
  anterior a la Ley 27.802): mandar ese modelo hoy no es ilegal, pero el cálculo de fechas queda mal.

**El hueco**: una planilla argentina, al día con la reforma, que junte días + fechas + aviso + pago + nota
para firmar, para todo el equipo, a precio de impulso y sin suscripción.

## Normas (verificadas en InfoLEG el 6/10/2026)

- LCT 20.744, texto actualizado, arts. 150 a 157, 162 y 164:
  https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm
  - Art. 150: 14/21/28/35 días corridos; antigüedad «al 31 de diciembre del año que correspondan».
  - Art. 151: mitad de los días hábiles del año; feriados laborables cuentan como hábiles; «comenzará en día
    lunes o el siguiente hábil si aquél fuese feriado» (otra regla para quien trabaja en días inhábiles).
  - Art. 153: 1 día cada 20 de trabajo efectivo si no llega al mínimo.
  - Art. 154 (sustituido por art. 41 de la Ley 27.802): período 1/10–30/4, fuera de él sólo de mutuo
    acuerdo; aviso por escrito con antelación no menor a 30 días (los convenios pueden fijar otro sistema);
    fraccionamiento por acuerdo en tramos de al menos 7 días; verano al menos una vez cada 3 años si no son
    simultáneas; enfermedad durante las vacaciones → se reprograma el saldo.
  - Art. 155: sueldo mensual ÷ 25; se paga «a la iniciación» del período.
  - Art. 156: al extinguirse el contrato, indemnización proporcional a la fracción del año trabajada.
  - Art. 157: si el empleador no avisó a tiempo, el trabajador puede tomarlas avisando fehacientemente, de
    modo que terminen antes del 31 de mayo.
  - Art. 162: no se compensan en dinero (salvo el 156). Art. 164: acumulación de 1/3 por acuerdo.
- Ley 27.802 (B.O. 6/3/2026): https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm
  — de vacaciones, sólo sustituye el art. 154. No toca la escala (150) ni el divisor (155).
- Feriados: los que ya usa el sitio (`src/lib/feriados.ts`, Ley 27.399 + resolución de días turísticos).

## Cómo calcula (mismo motor que el sitio)

- Días, régimen y pago: `calcularVacaciones` (`src/lib/vacaciones.ts`). Proporcional al egreso:
  `calcularIndemnizacion(...).vacaciones` (`src/lib/indemnizacion.ts`): días de la escala × días del año
  trabajados / 365, a sueldo ÷ 25, más su SAC (1/12).
- Fechas (fin, regreso, aviso, regla del lunes): nuevas, en `src/components/vacaciones/cronograma.ts`, con
  los feriados del sitio. El check evalúa el .xlsx y exige los mismos resultados.

## Límites YMYL

- Es una referencia de cálculo con fuentes, no asesoramiento. Se dice en la planilla y en la landing.
- Sueldo variable: la ley manda promediar (art. 155 inc. c); la planilla pide cargar ese promedio, no lo
  calcula.
- El convenio puede fijar otra anticipación o época (art. 154): la anticipación es una celda editable.
- La retribución es bruta: lleva los mismos aportes que el sueldo. No se calculan contribuciones patronales.
- Al egreso, la planilla replica el motor del sitio (proporcional del año calendario del egreso); si ya se
  gozaron vacaciones a cuenta de ese año, o quedó un período anterior sin tomar, se aclara que hay que
  ajustarlo con el liquidador.
