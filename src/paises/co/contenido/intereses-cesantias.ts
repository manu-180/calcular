import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.intereses-cesantias",
  h1: "Calculadora de intereses sobre las cesantías",
  title: "Intereses de cesantías 2026: calcula cuánto te pagan",
  description:
    "Calcula los intereses sobre tus cesantías: el {{co.intereses-cesantias}} anual, proporcional a los días trabajados. Te los paga la empresa a más tardar el 31 de enero.",
  intro: [
    "Los intereses sobre las cesantías son un pago aparte de las cesantías. Las cesantías van a tu fondo, pero los intereses te los paga la empresa directo a ti.",
    "Son el {{co.intereses-cesantias}} al año sobre lo que acumulaste de cesantías. Si trabajaste menos de un año, te pagan la parte proporcional.",
  ],
  comoSeCalcula: [
    "Toma el valor de tus cesantías del año.",
    "Multiplícalo por el {{co.intereses-cesantias}} y por los días trabajados.",
    "Divide el resultado por 360, que es el año laboral en Colombia.",
  ],
  ejemplo: [
    "Si tus cesantías de 2026 son $2.000.000 y trabajaste todo el año, los intereses son $240.000.",
    "Si entraste a mitad de año y tus cesantías son $1.000.000 por 180 días, te pagan $60.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo me pagan los intereses sobre las cesantías?",
      respuesta: "La empresa te los paga a más tardar el 31 de enero, por el año anterior. Si te retiras antes, se pagan en la liquidación.",
    },
    {
      pregunta: "¿Los intereses van al fondo de cesantías?",
      respuesta: "No. Las cesantías se consignan en tu fondo antes del 15 de febrero, pero los intereses te los paga la empresa directamente, en tu cuenta o en efectivo.",
    },
    {
      pregunta: "¿Cuánto es el interés de las cesantías?",
      respuesta: "El {{co.intereses-cesantias}} anual sobre el valor de las cesantías. Si trabajaste menos del año completo, se paga en proporción a los días.",
    },
    {
      pregunta: "¿Tengo intereses si tengo salario integral?",
      respuesta: "No. El salario integral ya incluye el valor de las prestaciones, así que no se liquidan cesantías ni sus intereses aparte.",
    },
  ],
  glosario: [
    { termino: "Cesantías", definicion: "Un mes de salario por cada año trabajado, que la empresa consigna en un fondo a tu nombre." },
    { termino: "Intereses sobre las cesantías", definicion: "El {{co.intereses-cesantias}} anual sobre las cesantías, que la empresa te paga a ti cada enero." },
  ],
});
