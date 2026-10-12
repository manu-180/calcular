import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.gratificacion-trunca",
  h1: "Calculadora de gratificación trunca",
  title: "Gratificación trunca 2026: calcula cuánto te toca",
  description:
    "Calcula tu gratificación trunca con tus fechas de ingreso y salida. Incluye la bonificación del {{pe.bonificacion-extraordinaria[essalud]}} y la RMV de {{pe.rmv}}.",
  intro: [
    "Si dejas tu trabajo antes de julio o de diciembre, igual cobras la gratificación de ese semestre en proporción a los meses completos que trabajaste. Eso es la gratificación trunca.",
    "Pon tu fecha de ingreso, tu último día y tu sueldo. Te mostramos cuántos meses cuentan y cuánto te tienen que pagar en tu liquidación.",
  ],
  comoSeCalcula: [
    "Primero se ve en qué semestre sales: de enero a junio corresponde a la gratificación de julio y de julio a diciembre a la de diciembre.",
    "Se cuentan solo los meses calendario completos que trabajaste en ese semestre. Los días sueltos del mes en que entraste o saliste no suman.",
    "Tu remuneración (sueldo, asignación familiar de {{pe.asignacion-familiar}} de la RMV si la cobras y el promedio de pagos variables) se multiplica por esos meses y se divide entre 6.",
    "Se suma la bonificación extraordinaria: {{pe.bonificacion-extraordinaria[essalud]}} si estás en EsSalud o {{pe.bonificacion-extraordinaria[eps]}} si tienes EPS. En la pequeña empresa es media gratificación y en la microempresa no hay.",
  ],
  ejemplo: [
    "Ganas S/ 2,400 y renuncias el 20 de octubre. Del semestre cuentan julio, agosto y setiembre: S/ 2,400 × 3 / 6 = S/ 1,200, más S/ 108 de bonificación. En tu liquidación recibes S/ 1,308.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto tiempo tengo que trabajar para cobrar gratificación trunca?",
      respuesta: "Al menos un mes calendario completo dentro del semestre en que sales. Si entraste el 10 de agosto y saliste el 20 de setiembre, no hay ningún mes completo y no te toca.",
    },
    {
      pregunta: "¿Cuándo me pagan la gratificación trunca?",
      respuesta: "Junto con tu liquidación de beneficios sociales, dentro de las 48 horas siguientes a tu cese.",
    },
    {
      pregunta: "¿Me pagan gratificación trunca si me despiden?",
      respuesta: "Sí. Se paga siempre que termina la relación laboral, sea por renuncia, despido o fin de contrato.",
    },
    {
      pregunta: "¿La gratificación trunca tiene descuentos de AFP u ONP?",
      respuesta: "No. Igual que la gratificación completa, no paga aportes de pensión. Solo podría tener retención de quinta categoría.",
    },
  ],
  glosario: [
    { termino: "Gratificación trunca", definicion: "Parte proporcional de la gratificación que se paga cuando terminas de trabajar antes de que acabe el semestre." },
    { termino: "Mes calendario completo", definicion: "Un mes trabajado del primer al último día. Por ejemplo, todo setiembre." },
  ],
});
