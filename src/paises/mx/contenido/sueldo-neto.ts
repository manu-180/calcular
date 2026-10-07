import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.sueldo-neto",
  h1: "Calculadora de sueldo neto 2026",
  title: "Sueldo neto 2026: cuánto te queda después de ISR e IMSS",
  description:
    "Calcula tu sueldo neto quincenal o mensual con las tarifas de ISR 2026, el subsidio para el empleo y las cuotas del IMSS. Datos oficiales del DOF.",
  intro: [
    "Tu sueldo neto es lo que te llega a la cuenta después de los descuentos de ley: el ISR y tus cuotas del IMSS.",
    "Escribe tu sueldo bruto del periodo y cada cuánto te pagan. La calculadora usa la tarifa del SAT de ese periodo.",
  ],
  comoSeCalcula: [
    "ISR: se busca tu sueldo en la tarifa del periodo. Se paga la cuota fija de ese renglón más un porcentaje de lo que pasa el límite inferior.",
    "Subsidio para el empleo: si ganas hasta {{mx.subsidio-empleo-limite}} al mes, se te descuenta del ISR el {{mx.subsidio-empleo}} de la UMA mensual ({{mx.uma-mensual}}), en proporción a los días del periodo.",
    "IMSS: se calcula sobre tu salario base de cotización (SBC). Si no lo sabes, lo estimamos con tu salario diario y las prestaciones mínimas de ley.",
    "Las cuotas del IMSS que pagas tú suman {{mx.cuotas-imss-obrero[cesantia-vejez]}} de cesantía y vejez, {{mx.cuotas-imss-obrero[invalidez-vida]}} de invalidez y vida, {{mx.cuotas-imss-obrero[gastos-medicos-pensionados]}} de gastos médicos de pensionados y {{mx.cuotas-imss-obrero[prestaciones-dinero]}} de prestaciones en dinero.",
    "Si tu SBC pasa de {{mx.umbral-excedente-imss}}, pagas además {{mx.cuotas-imss-obrero[excedente-eym]}} sobre lo que pasa. El SBC tiene un tope de {{mx.tope-sbc-imss}}.",
    "Si ganas el salario mínimo, no te retienen ISR y tu empresa paga tus cuotas del IMSS.",
  ],
  faq: [
    {
      pregunta: "¿Por qué mi recibo de nómina no da exactamente lo mismo?",
      respuesta: "Tu recibo puede tener otros conceptos: vales, préstamos, Infonavit, caja de ahorro o un SBC distinto. Si escribes el SBC de tu recibo, el cálculo se acerca mucho más.",
    },
    {
      pregunta: "¿Qué es el subsidio para el empleo?",
      respuesta: "Es una ayuda del gobierno para quienes ganan poco. Baja el ISR que te retienen, pero nunca te deja con ISR negativo.",
    },
    {
      pregunta: "¿Cuánto se descuenta del IMSS?",
      respuesta: "Para la mayoría de los sueldos, la suma de {{mx.cuotas-imss-obrero[cesantia-vejez]}}, {{mx.cuotas-imss-obrero[invalidez-vida]}}, {{mx.cuotas-imss-obrero[gastos-medicos-pensionados]}} y {{mx.cuotas-imss-obrero[prestaciones-dinero]}} de tu salario base de cotización. Sube un poco si tu SBC pasa de {{mx.umbral-excedente-imss}}.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre sueldo bruto y neto?",
      respuesta: "El bruto es lo que pactaste con tu empresa. El neto es lo que recibes después de ISR e IMSS.",
    },
  ],
  glosario: [
    { termino: "SBC", definicion: "Salario base de cotización: tu salario diario más la parte proporcional de prestaciones como aguinaldo y prima vacacional." },
    { termino: "Subsidio para el empleo", definicion: "Monto que se resta del ISR de quienes ganan menos del límite mensual." },
    { termino: "Tarifa del ISR", definicion: "Tabla del Anexo 8 de la Resolución Miscelánea Fiscal con límite inferior, cuota fija y porcentaje." },
  ],
});
