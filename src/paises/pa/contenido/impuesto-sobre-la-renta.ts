import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.impuesto-sobre-la-renta",
  h1: "Calculadora del impuesto sobre la renta en Panamá",
  title: "Impuesto sobre la renta en Panamá {{anio}}: calcula tu ISR",
  description:
    "Calcula el impuesto sobre la renta de personas naturales en Panamá: exento hasta B/. 11,000 al año, 15% y 25% sobre el excedente (art. 700 del Código Fiscal).",
  intro: [
    "En Panamá, una persona natural no paga impuesto sobre la renta hasta B/. 11,000 al año. Paga el 15% sobre lo que pasa de ese monto, y desde B/. 50,000 el 25% sobre el excedente.",
    "Escribe tu renta neta gravable del año. Te mostramos el impuesto, tu tasa efectiva y cuánto representa por mes.",
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
      pregunta: "¿Desde cuánto se paga impuesto sobre la renta en Panamá?",
      respuesta: "Desde una renta neta gravable de más de B/. 11,000 al año. Hasta ese monto estás exento.",
    },
    {
      pregunta: "¿Cuánto impuesto pago con una renta de B/. 30,000?",
      respuesta: "B/. 2,850 al año. Es el 15% de los B/. 19,000 que pasan de B/. 11,000.",
    },
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
