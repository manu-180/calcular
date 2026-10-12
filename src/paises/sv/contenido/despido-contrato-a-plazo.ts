import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.despido-contrato-a-plazo",
  h1: "Calculadora de despido con contrato a plazo",
  title: "Despido con contrato a plazo en El Salvador: indemnización",
  description: "Si lo despiden sin causa antes de que venza su contrato a plazo, le pagan el salario del tiempo que faltaba, con el tope de un contrato indefinido.",
  intro: [
    "Con un contrato a plazo (con fecha de fin), si lo despiden sin causa justificada antes del vencimiento le deben el salario básico del tiempo que faltaba.",
    "Ese monto nunca puede pasar lo que cobraría con un contrato por tiempo indefinido: {{sv.indemnizacion-dias-por-anio}} de salario por año, con su tope. La calculadora compara las dos cuentas.",
  ],
  comoSeCalcula: [
    "Salario del tiempo que faltaba: el salario diario por los días que quedaban hasta el vencimiento.",
    "Máximo: {{sv.indemnizacion-dias-por-anio}} de salario por año trabajado y la parte proporcional, nunca menos de {{sv.indemnizacion-dias-minimo}}, con el salario diario limitado a {{sv.indemnizacion-tope}} veces el mínimo diario del sector.",
    "Le corresponde el menor de los dos.",
  ],
  ejemplo: ["Con $600 de salario, un contrato del 1 de enero al 31 de diciembre de 2026 cortado el 31 de agosto: faltaban $2,440, pero el máximo legal es $399.45."],
  faq: [
    {
      pregunta: "¿Cuándo es legal un contrato a plazo?",
      respuesta: "Solo en los casos que permite el Código: trabajos que por su naturaleza son temporales o transitorios. Si la labor es permanente, el contrato se considera por tiempo indefinido.",
    },
    {
      pregunta: "¿Y si el contrato termina en la fecha pactada?",
      respuesta: "Si llega el vencimiento no hay indemnización. Le deben las vacaciones y el aguinaldo proporcionales.",
    },
    {
      pregunta: "¿Me pagan vacaciones y aguinaldo aparte?",
      respuesta: "Sí. Esta calculadora muestra solo la indemnización. Para el total use la de liquidación.",
    },
  ],
  glosario: [{ termino: "Contrato a plazo", definicion: "El contrato que tiene una fecha de vencimiento pactada." }],
});
