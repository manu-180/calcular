import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.sueldo-neto",
  h1: "Calculadora de sueldo neto 2026: de bruto a neto",
  title: "Calculadora de sueldo neto 2026: quincenal y mensual",
  description:
    "Escribe tu sueldo bruto y ve al instante cuánto te descuentan de ISR e IMSS y cuánto te queda por quincena o por mes. Con las tarifas 2026 del SAT.",
  intro: [
    "Tu sueldo neto es tu sueldo bruto menos el ISR y las cuotas del IMSS que te descuentan. Es lo que de verdad te llega a la cuenta cada quincena o cada mes.",
    "Escribe tu sueldo bruto y cada cuánto te pagan. La calculadora aplica la tarifa del SAT de ese periodo, el subsidio para el empleo y tus cuotas del IMSS.",
  ],
  comoSeCalcula: [
    "ISR: se busca tu sueldo en la tarifa del periodo. Se paga la cuota fija de ese renglón más un porcentaje de lo que pasa el límite inferior.",
    "Subsidio para el empleo: si ganas hasta {{mx.subsidio-empleo-limite}} al mes, se te descuenta del ISR el {{mx.subsidio-empleo}} de la UMA mensual ({{mx.uma-mensual}}), en proporción a los días del periodo.",
    "IMSS: se calcula sobre tu salario base de cotización (SBC). Si no lo sabes, lo estimamos con tu salario diario y las prestaciones mínimas de ley.",
    "Las cuotas del IMSS que pagas tú suman {{mx.cuotas-imss-obrero[cesantia-vejez]}} de cesantía y vejez, {{mx.cuotas-imss-obrero[invalidez-vida]}} de invalidez y vida, {{mx.cuotas-imss-obrero[gastos-medicos-pensionados]}} de gastos médicos de pensionados y {{mx.cuotas-imss-obrero[prestaciones-dinero]}} de prestaciones en dinero.",
    "Si tu SBC pasa de {{mx.umbral-excedente-imss}}, pagas además {{mx.cuotas-imss-obrero[excedente-eym]}} sobre lo que pasa. El SBC tiene un tope de {{mx.tope-sbc-imss}}.",
    "Sueldo neto = sueldo bruto menos el ISR que te retienen menos tus cuotas del IMSS.",
    "Si ganas el salario mínimo, no te retienen ISR y tu empresa paga tus cuotas del IMSS.",
  ],
  ejemplo: [
    "Con un sueldo bruto de 15,000 pesos al mes y un año en la empresa, con las tarifas 2026 te retienen 1,402.82 pesos de ISR y 399.81 de IMSS. Tu sueldo neto es de 13,197.37 pesos.",
    "Si te pagan 7,500 pesos por quincena, tu sueldo neto quincenal es de 6,592.87 pesos.",
  ],
  faq: [
    {
      pregunta: "¿Cómo calculo mi sueldo neto?",
      respuesta: "Al sueldo bruto le restas el ISR que te retienen y tus cuotas del IMSS. Con un sueldo de 10,000 pesos al mes en 2026, el neto queda en 9,554.10 pesos.",
    },
    {
      pregunta: "¿Cuánto me descuentan de ISR e IMSS?",
      respuesta: "Depende de cuánto ganas. Con 15,000 pesos al mes en 2026, el ISR es de 1,402.82 pesos y el IMSS de 399.81. En total, alrededor del 12% de tu sueldo.",
    },
    {
      pregunta: "¿Por qué mi recibo de nómina no da exactamente lo mismo?",
      respuesta: "Tu recibo puede tener otros conceptos: vales, préstamos, Infonavit, caja de ahorro o un SBC distinto. Si escribes el SBC de tu recibo, el cálculo se acerca mucho más.",
    },
    {
      pregunta: "¿Qué es el subsidio para el empleo?",
      respuesta: "Es una ayuda para quienes ganan hasta {{mx.subsidio-empleo-limite}} al mes. Baja el ISR que te retienen, pero nunca te deja con ISR negativo.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre sueldo bruto y neto?",
      respuesta: "El bruto es lo que pactaste con tu empresa. El neto es lo que recibes después de ISR e IMSS.",
    },
  ],
  glosario: [
    { termino: "Sueldo neto", definicion: "Lo que recibes después de los descuentos de ley (ISR e IMSS)." },
    { termino: "SBC", definicion: "Salario base de cotización: tu salario diario más la parte proporcional de prestaciones como aguinaldo y prima vacacional." },
    { termino: "Subsidio para el empleo", definicion: "Monto que se resta del ISR de quienes ganan menos del límite mensual." },
    { termino: "Tarifa del ISR", definicion: "Tabla del Anexo 8 de la Resolución Miscelánea Fiscal con límite inferior, cuota fija y porcentaje." },
  ],
});
