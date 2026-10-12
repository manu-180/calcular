import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.subsidio-de-frontera",
  h1: "Calculadora de subsidio de frontera",
  title: "Subsidio de frontera en Bolivia: calcule su bono",
  description: "Calcule el subsidio de frontera: el {{bo.subsidio-frontera}} de su haber básico si trabaja de forma permanente a menos de 50 km de una frontera.",
  intro: [
    "Quien trabaja de forma permanente dentro de los 50 kilómetros lineales de una frontera internacional cobra un subsidio de frontera cada mes.",
    "Escriba su haber básico y confirme si su lugar de trabajo está en esa franja.",
  ],
  comoSeCalcula: [
    "El subsidio es el {{bo.subsidio-frontera}} del haber básico mensual.",
    "Se paga junto con el sueldo y forma parte del total ganado.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el subsidio de frontera?",
      respuesta: "El {{bo.subsidio-frontera}} del haber básico (D.S. N° 21137, artículo 12).",
    },
    {
      pregunta: "¿Quién tiene derecho al bono de frontera?",
      respuesta: "La persona que trabaja de forma permanente dentro de los 50 kilómetros lineales de una frontera internacional. Si va solo de comisión, no le corresponde.",
    },
    {
      pregunta: "¿El subsidio de frontera entra en el aguinaldo y la indemnización?",
      respuesta: "Sí. Forma parte del total ganado, que es la base del aguinaldo, la indemnización y los aportes.",
    },
  ],
  glosario: [
    { termino: "Subsidio de frontera", definicion: "Pago mensual extra para quien trabaja en la franja de 50 km de una frontera." },
    { termino: "Total ganado", definicion: "Todo lo que cobra en el mes antes de descuentos: haber básico, bonos, subsidios y horas extras." },
  ],
});
