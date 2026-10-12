import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.colones-a-dolares",
  h1: "Convertidor de colones a dólares",
  title: "Colones a dólares en El Salvador: cambio fijo de {{sv.colones-por-dolar}}",
  description: "Convierta colones salvadoreños a dólares y dólares a colones con el cambio fijo de {{sv.colones-por-dolar}} colones por dólar de la Ley de Integración Monetaria.",
  intro: [
    "Desde 2001 el colón y el dólar tienen un cambio fijo: {{sv.colones-por-dolar}} colones por cada dólar. No sube ni baja.",
    "Sirve para pasar a dólares montos viejos de escrituras, contratos o leyes que todavía hablan en colones.",
  ],
  comoSeCalcula: [
    "De colones a dólares: se divide entre {{sv.colones-por-dolar}}.",
    "De dólares a colones: se multiplica por {{sv.colones-por-dolar}}.",
  ],
  ejemplo: ["250,000 colones son $28,571.43. Y $100 son 875 colones."],
  faq: [
    {
      pregunta: "¿El colón sigue siendo moneda legal?",
      respuesta: "La Ley de Integración Monetaria lo mantiene, pero en la práctica todo se paga en dólares. Los bancos ya no ponen colones en circulación.",
    },
    {
      pregunta: "¿Por qué el cambio no cambia nunca?",
      respuesta: "Porque la ley lo fijó en {{sv.colones-por-dolar}} colones por dólar de forma inalterable desde el 1 de enero de 2001.",
    },
    {
      pregunta: "¿Dónde aparecen todavía montos en colones?",
      respuesta: "En leyes antiguas, como la del impuesto de transferencia de bienes raíces, y en escrituras y contratos firmados antes de 2001.",
    },
  ],
  glosario: [{ termino: "Integración monetaria", definicion: "El paso del colón al dólar como moneda de uso en El Salvador, en 2001." }],
});
