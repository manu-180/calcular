import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.gastos-personales",
  h1: "Calculadora de gastos personales 2026 (SRI)",
  title: "Gastos personales 2026: calcula tu rebaja del SRI",
  description: "Calcula cuánto te rebajan del impuesto a la renta por tus gastos personales: el {{ec.rebaja-gastos-personales}} de tus gastos, con tope según tus cargas familiares.",
  intro: [
    "Tus gastos de vivienda, alimentación, educación, salud, vestimenta y turismo nacional rebajan tu impuesto a la renta. La rebaja es el {{ec.rebaja-gastos-personales}} de esos gastos.",
    "Hay un tope que depende de tus cargas familiares y se mide en canastas básicas. Pon tus gastos del año y te decimos cuánto rebajas.",
  ],
  comoSeCalcula: [
    "Se suman tus gastos personales del año, sin IVA.",
    "El tope es la canasta básica de enero ({{ec.canasta-basica-enero}}) multiplicada por las canastas que te tocan según tus cargas.",
    "Con discapacidad o enfermedad catastrófica, rara o huérfana (tuya o de una carga), el tope sube a {{ec.canastas-catastroficas}} canastas.",
    "La rebaja es el {{ec.rebaja-gastos-personales}} del menor valor entre tus gastos y el tope.",
  ],
  ejemplo: ["Sin cargas, con $6.500 de gastos, pasas el tope de $5.752,60. Tu rebaja es el máximo: $1.035,47."],
  faq: [
    {
      pregunta: "¿Cuánto puedo rebajar por gastos personales en 2026?",
      respuesta: "Sin cargas, hasta {{ec.canastas-por-cargas[0]}} canastas de {{ec.canasta-basica-enero}} en gastos. La rebaja máxima es el {{ec.rebaja-gastos-personales}} de ese tope.",
    },
    {
      pregunta: "¿Cuántas canastas me tocan con cargas familiares?",
      respuesta: "Sube con cada carga: {{ec.canastas-por-cargas[1]}} con una, {{ec.canastas-por-cargas[2]}} con dos, {{ec.canastas-por-cargas[3]}} con tres, {{ec.canastas-por-cargas[4]}} con cuatro y {{ec.canastas-por-cargas[5]}} con cinco o más.",
    },
    {
      pregunta: "¿Qué gastos cuentan?",
      respuesta: "Vivienda, alimentación, educación (incluido arte y cultura), salud, vestimenta y turismo nacional. Tienen que estar en facturas a tu nombre o de tus cargas.",
    },
    {
      pregunta: "¿Me devuelven dinero si la rebaja es mayor que mi impuesto?",
      respuesta: "No. La rebaja llega como máximo hasta tu impuesto causado. Si no pagas impuesto a la renta, no hay nada que rebajar.",
    },
    {
      pregunta: "¿Cuándo entrego la proyección de gastos?",
      respuesta: "Si trabajas en relación de dependencia, la proyección se entrega a tu empleador en febrero, para que la use en tus retenciones del año.",
    },
  ],
  glosario: [
    { termino: "Carga familiar", definicion: "Una persona que depende económicamente de ti, como tu cónyuge o tus hijos." },
    { termino: "Canasta básica", definicion: "El costo mensual de los productos básicos de un hogar, que publica el INEC." },
    { termino: "Rebaja", definicion: "Lo que se resta de tu impuesto a la renta ya calculado." },
  ],
});
