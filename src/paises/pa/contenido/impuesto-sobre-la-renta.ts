import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.impuesto-sobre-la-renta",
  h1: "Calculadora del impuesto sobre la renta en Panamá",
  title: "Impuesto sobre la renta en Panamá: personas naturales",
  description:
    "Calcula tu impuesto sobre la renta anual con la tarifa del artículo 700 del Código Fiscal: exento hasta B/. 11,000, 15% y 25% sobre el excedente.",
  intro: [
    "Las personas naturales pagan impuesto sobre la renta según una tarifa anual por tramos.",
    "Escribe tu renta neta gravable del año y te mostramos el impuesto y cuánto representa sobre tu renta.",
  ],
  comoSeCalcula: [
    "Hasta B/. 11,000 al año no se paga impuesto.",
    "De más de B/. 11,000 hasta B/. 50,000 se paga el 15% sobre lo que pasa de B/. 11,000.",
    "De más de B/. 50,000 se pagan B/. 5,850 por los primeros B/. 50,000 y el 25% sobre el excedente.",
  ],
  ejemplo: [
    "Con una renta gravable de B/. 30,000, el excedente sobre B/. 11,000 es B/. 19,000. Al 15%, el impuesto es B/. 2,850 al año.",
  ],
  faq: [
    {
      pregunta: "¿Qué es la renta neta gravable?",
      respuesta: "Tus ingresos gravables del año menos las deducciones que permite la ley. Sobre ese monto se aplica la tarifa.",
    },
    {
      pregunta: "¿El décimo tercer mes paga impuesto sobre la renta?",
      respuesta: "Sí. El decreto que creó el décimo lo libera de otros cargos, pero no del impuesto sobre la renta.",
    },
    {
      pregunta: "¿Cuál es la tarifa más alta?",
      respuesta: "El 25% sobre la parte de la renta que pasa de B/. 50,000 al año.",
    },
  ],
  glosario: [
    { termino: "Persona natural", definicion: "Una persona, a diferencia de una empresa o sociedad." },
    { termino: "Tasa efectiva", definicion: "El impuesto dividido entre tu renta. Siempre es menor que la tarifa del último tramo." },
  ],
});
