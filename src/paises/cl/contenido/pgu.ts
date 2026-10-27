import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.pgu",
  h1: "Calculadora de PGU {{anio}}",
  title: "PGU {{anio}}: calcula tu Pensión Garantizada Universal",
  description:
    "Calcula tu PGU según tu edad y tu pensión base: {{cl.pgu-maxima[menor-75]}} de 65 a 74 años y {{cl.pgu-maxima[75-o-mas]}} desde los 75. Montos de ChileAtiende.",
  intro: [
    "La Pensión Garantizada Universal (PGU) es un aporte mensual del Estado para personas de 65 años o más. Su monto depende de tu edad y de cuánto recibes de pensión.",
    "Desde septiembre de 2026, quienes tienen 75 años o más reciben un monto máximo mayor por la reforma de pensiones.",
  ],
  comoSeCalcula: [
    "Si tu pensión base es de {{cl.pgu-pension-inferior}} o menos, recibes la PGU completa: {{cl.pgu-maxima[menor-75]}} de 65 a 74 años o {{cl.pgu-maxima[75-o-mas]}} desde los 75.",
    "Si tu pensión base está entre {{cl.pgu-pension-inferior}} y {{cl.pgu-pension-superior}}, la PGU baja de forma proporcional.",
    "Desde {{cl.pgu-pension-superior}} no hay PGU.",
  ],
  ejemplo: ["Si tienes 70 años y una pensión base de $1.000.000, recibes una PGU parcial de $126.301 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto es la PGU en 2026?",
      respuesta: "{{cl.pgu-maxima[menor-75]}} al mes para personas de 65 a 74 años y {{cl.pgu-maxima[75-o-mas]}} para personas de 75 años o más, si su pensión base no pasa la pensión inferior.",
    },
    {
      pregunta: "¿Qué es la pensión base?",
      respuesta: "La suma de tu pensión autofinanciada (la que paga tu AFP con tus ahorros) y otras pensiones que recibas, como una de sobrevivencia o del IPS.",
    },
    {
      pregunta: "¿Quiénes pueden recibir la PGU?",
      respuesta: "Personas de 65 años o más que no estén en el 10 % de mayores ingresos y que cumplan los años de residencia en Chile. Se pide en ChileAtiende o en el IPS.",
    },
    {
      pregunta: "¿Cuándo sube la PGU?",
      respuesta: "Se reajusta cada febrero según el IPC. Desde septiembre de 2027 el monto mayor se extiende a todas las personas de 65 años o más.",
    },
  ],
  glosario: [
    { termino: "PGU", definicion: "Pensión Garantizada Universal. Aporte del Estado que se suma a tu pensión." },
    { termino: "Pensión inferior y superior", definicion: "Límites de pensión base que definen si recibes la PGU completa, parcial o nada." },
  ],
});
