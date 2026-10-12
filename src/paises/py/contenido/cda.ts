import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.cda",
  h1: "Calculadora de CDA (certificado de depósito de ahorro)",
  title: "Calculadora de CDA en Paraguay: cuánto te rinde",
  description: "Calculá los intereses de un CDA en guaraníes: poné el monto, la tasa anual que te ofrece el banco y el plazo en días. Los intereses no pagan IRP.",
  intro: [
    "El CDA (certificado de depósito de ahorro) es el plazo fijo de Paraguay: dejás tu plata en el banco por un tiempo y te paga una tasa de interés.",
    "Poné el monto, la tasa anual de la oferta y el plazo. Te mostramos los intereses y el total a cobrar.",
  ],
  comoSeCalcula: [
    "Los intereses son el monto por la tasa anual por los días del plazo, dividido 365.",
    "El total es el monto invertido más los intereses.",
    "Los intereses de depósitos en bancos, financieras y cooperativas del país no pagan IRP.",
  ],
  ejemplo: ["Con Gs. 100.000.000 al 7,32 % anual por 360 días, ganás Gs. 7.219.726 de intereses."],
  faq: [
    {
      pregunta: "¿Cómo se calculan los intereses de un CDA?",
      respuesta: "Monto por tasa anual por días, dividido 365. Es interés simple sobre el capital.",
    },
    {
      pregunta: "¿Los intereses del CDA pagan impuesto?",
      respuesta: "No. La Ley 6380 exonera del IRP los intereses de depósitos en bancos, financieras, cooperativas y mutuales del país.",
    },
    {
      pregunta: "¿Qué tasa me conviene usar?",
      respuesta: "La que te ofrece tu banco por escrito. El Banco Central publica cada mes las tasas promedio por plazo para comparar.",
    },
    {
      pregunta: "¿Puedo retirar el CDA antes del plazo?",
      respuesta: "Depende del banco. En general no se puede, o se puede con penalidad. Leé las condiciones antes de firmar.",
    },
  ],
  glosario: [
    { termino: "CDA", definicion: "Certificado de depósito de ahorro: un depósito a plazo fijo con tasa pactada." },
    { termino: "Tasa anual", definicion: "El interés que paga el banco por año, expresado en porcentaje." },
  ],
});
