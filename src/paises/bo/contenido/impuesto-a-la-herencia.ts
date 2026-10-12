import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.impuesto-a-la-herencia",
  h1: "Calculadora del impuesto a la herencia",
  title: "Impuesto a la herencia en Bolivia: calcule cuánto paga",
  description: "Calcule el Impuesto a la Transmisión Gratuita de Bienes por herencia o donación: {{bo.tgb-alicuotas[directos]}}, {{bo.tgb-alicuotas[hermanos]}} o {{bo.tgb-alicuotas[otros]}} según el parentesco.",
  intro: [
    "Quien recibe bienes por herencia o donación paga el Impuesto a la Transmisión Gratuita de Bienes. La alícuota depende del parentesco con quien deja o regala los bienes.",
    "Elija quién recibe y escriba el valor de lo que le toca.",
  ],
  comoSeCalcula: [
    "Padres, hijos, abuelos, nietos y cónyuge: {{bo.tgb-alicuotas[directos]}}.",
    "Hermanos y sus descendientes: {{bo.tgb-alicuotas[hermanos]}}.",
    "Otros parientes, legatarios y donatarios: {{bo.tgb-alicuotas[otros]}}.",
    "La alícuota se aplica al avalúo de lo que recibe cada persona.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga por heredar una casa?",
      respuesta: "Si la hereda un hijo, el cónyuge o un padre, el {{bo.tgb-alicuotas[directos]}} del avalúo. Un hermano paga el {{bo.tgb-alicuotas[hermanos]}} y otras personas el {{bo.tgb-alicuotas[otros]}}.",
    },
    {
      pregunta: "¿Cuál es el plazo para pagar?",
      respuesta: "En una herencia, 90 días desde que se abre la sucesión por sentencia. En una donación, 5 días hábiles desde el acto.",
    },
    {
      pregunta: "¿Qué bienes paga?",
      respuesta: "Solo los sujetos a registro: inmuebles, vehículos, acciones, cuotas de capital y derechos. Las indemnizaciones de seguros de vida están exentas.",
    },
  ],
  glosario: [
    { termino: "TGB", definicion: "Impuesto a la Transmisión Gratuita de Bienes, por herencia o donación." },
    { termino: "Avalúo", definicion: "El valor de los bienes que se usa para calcular el impuesto." },
  ],
});
