import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.isr-asalariados",
  h1: "Calculadora de ISR para asalariados",
  title: "ISR asalariados Guatemala 2026: retención mensual",
  description:
    "Calcule su ISR anual y la retención de cada mes con la deducción de {{gt.isr-deduccion-gastos-personales}}, la extraordinaria de 2026, el IGSS y la planilla del IVA.",
  intro: [
    "Si trabaja en relación de dependencia, su patrono le retiene cada mes una parte del impuesto sobre la renta (ISR). Para eso proyecta lo que va a ganar en el año y le resta las deducciones.",
    "En 2026 hay una deducción extraordinaria. Con ella, quien gana el salario mínimo no paga ISR.",
  ],
  comoSeCalcula: [
    "Se suman los ingresos del año: salario y bonificaciones por los meses que va a trabajar. El aguinaldo y el Bono 14 no se suman porque están exentos.",
    "Se restan {{gt.isr-deduccion-gastos-personales}} de gastos personales sin comprobantes, la deducción extraordinaria de {{gt.isr-deduccion-extraordinaria}}, sus cuotas del IGSS y la planilla del IVA (hasta {{gt.isr-tope-planilla-iva}}).",
    "Sobre lo que queda (la renta imponible) se aplica la escala de la ley, que tiene dos tramos: uno para la mayoría de los sueldos y otro, más alto, para las rentas grandes.",
    "La retención mensual es el ISR del año dividido entre los meses.",
  ],
  ejemplo: [
    "Gana Q20,000 más Q250 de bonificación y le descuentan Q966 de IGSS. Renta del año: Q243,000. Deducciones: Q62,616. Renta imponible: Q180,384. ISR: Q9,019.20, o sea Q751.60 por mes.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga ISR en Guatemala si soy asalariado?",
      respuesta: "Depende de sus deducciones. En 2026, con la deducción extraordinaria, quien gana el salario mínimo no agrícola más la bonificación incentivo queda sin ISR.",
    },
    {
      pregunta: "¿Qué cambia en 2027?",
      respuesta: "La deducción sin comprobantes pasa a ser de 12 salarios mínimos no agrícolas más la bonificación incentivo, y se actualiza sola cada año con el salario mínimo. La deducción extraordinaria era solo para 2026.",
    },
    {
      pregunta: "¿Qué es la planilla del IVA?",
      respuesta: "Es la lista de las facturas de sus compras personales. Puede acreditar el IVA que pagó, hasta {{gt.isr-tope-planilla-iva}} al año. Se presenta dentro de los primeros diez días hábiles de enero.",
    },
    {
      pregunta: "¿La bonificación incentivo paga ISR?",
      respuesta: "Sí. No paga IGSS, pero se suma a sus ingresos para el ISR.",
    },
    {
      pregunta: "¿Qué pasa si me retuvieron de más?",
      respuesta: "Al final del año el patrono calcula el impuesto definitivo. Si le retuvo de más, se lo tiene que devolver.",
    },
  ],
  glosario: [
    { termino: "Renta imponible", definicion: "Lo que queda de sus ingresos después de restar las deducciones. Sobre eso se calcula el ISR." },
    { termino: "Retención", definicion: "La parte del ISR que el patrono descuenta cada mes y paga a la SAT por usted." },
    { termino: "Planilla del IVA", definicion: "Detalle de facturas que permite acreditar el IVA de sus compras personales contra el ISR." },
  ],
});
