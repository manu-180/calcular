import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.accidente-de-trabajo",
  h1: "Indemnización por accidente de trabajo en Honduras",
  title: "Accidente de trabajo en Honduras: cuánto se paga",
  description: "Calcule la indemnización por un accidente o enfermedad de trabajo: {{hn.riesgo-incapacidad-temporal}} del salario durante la incapacidad o la indemnización por muerte.",
  intro: [
    "Si sufre un accidente o una enfermedad por su trabajo (un riesgo profesional), el patrono le debe atención médica y una indemnización.",
    "Mientras no puede trabajar, cobra el {{hn.riesgo-incapacidad-temporal}} de su salario. Si el trabajador muere, sus dependientes cobran {{hn.riesgo-muerte-dias}} de salario más los gastos de funeral.",
  ],
  comoSeCalcula: [
    "Salario diario = salario mensual al momento del accidente / 30. Nunca menos que el salario mínimo.",
    "Incapacidad temporal: salario diario × {{hn.riesgo-incapacidad-temporal}} × días de incapacidad, hasta {{hn.riesgo-incapacidad-max-dias}}.",
    "Muerte: {{hn.riesgo-funeral-meses}} de salario para el funeral más salario diario × {{hn.riesgo-muerte-dias}} para los dependientes.",
  ],
  ejemplo: ["Gana L15,000 y queda incapacitado 30 días por un accidente de trabajo. Cobra 500 × 75 % × 30 = L11,250."],
  faq: [
    {
      pregunta: "¿Cuánto me pagan si me accidento en el trabajo?",
      respuesta: "Durante la incapacidad temporal, el {{hn.riesgo-incapacidad-temporal}} de su salario desde el primer día y hasta por {{hn.riesgo-incapacidad-max-dias}}. Además, atención médica, medicinas y traslados.",
    },
    {
      pregunta: "¿Qué pasa si la incapacidad dura más de un año?",
      respuesta: "Se trata como incapacidad permanente. Se indemniza con un porcentaje que fija la tabla de valuación de incapacidades del Código del Trabajo.",
    },
    {
      pregunta: "¿Quién cobra si el trabajador muere?",
      respuesta: "La esposa o compañera, los hijos menores y los padres que dependían de él, en partes iguales si no hay testamento. Lo aprueba el juzgado de trabajo.",
    },
    {
      pregunta: "¿Y si estoy asegurado en el IHSS?",
      respuesta: "Si el patrono lo tenía asegurado contra riesgos profesionales, el seguro paga según sus reglas. La indemnización del seguro no puede ser menor que la del Código.",
    },
  ],
  glosario: [
    { termino: "Riesgo profesional", definicion: "Un accidente o una enfermedad que sufre el trabajador por causa de su trabajo." },
    { termino: "Incapacidad temporal", definicion: "Cuando no puede trabajar por un tiempo y después se recupera." },
  ],
});
