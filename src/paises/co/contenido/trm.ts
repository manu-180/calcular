import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.trm",
  h1: "TRM de hoy y conversor de dólares a pesos",
  title: "TRM hoy: {{co.trm}}. Convierte dólares y pesos",
  description:
    "La TRM vigente es {{co.trm}}, publicada por la Superintendencia Financiera. Convierte dólares a pesos colombianos y pesos a dólares.",
  intro: [
    "La Tasa Representativa del Mercado (TRM) es el precio oficial del dólar en Colombia.",
    "La certifica la Superintendencia Financiera cada día hábil. La que se muestra aquí es la vigente desde el {{co.trm#desde}}.",
  ],
  comoSeCalcula: [
    "Dólares a pesos: dólares por la TRM.",
    "Pesos a dólares: pesos divididos por la TRM.",
    "Algunas TRM rigen varios días seguidos, por ejemplo durante un fin de semana.",
  ],
  ejemplo: ["Si la TRM es $4.000, 100 dólares son $400.000."],
  faq: [
    {
      pregunta: "¿La TRM es el precio al que compro dólares en una casa de cambio?",
      respuesta: "No. La TRM es un promedio oficial. Las casas de cambio y los bancos venden más caro y compran más barato.",
    },
    {
      pregunta: "¿De dónde sale el dato?",
      respuesta: "Del conjunto de datos abiertos de la Superintendencia Financiera en datos.gov.co. Se actualiza solo cada día.",
    },
    {
      pregunta: "¿Para qué sirve la TRM?",
      respuesta: "Para facturas y contratos en dólares, declaraciones de impuestos y para saber cuánto cuesta algo que pagas en dólares.",
    },
  ],
  glosario: [
    { termino: "TRM", definicion: "Tasa Representativa del Mercado: el valor oficial del dólar en pesos colombianos." },
    { termino: "Superintendencia Financiera", definicion: "La entidad que vigila a bancos y entidades financieras y certifica la TRM." },
  ],
});
