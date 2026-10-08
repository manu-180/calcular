import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.trm",
  h1: "TRM hoy en Colombia: precio oficial del dólar y conversor",
  title: "TRM hoy: dólar a {{co.trm}}. Convierte dólares y pesos",
  description:
    "La TRM de hoy es {{co.trm}}, certificada por la Superintendencia Financiera. Convierte dólares a pesos colombianos y pesos a dólares al instante.",
  intro: [
    "La TRM de hoy es {{co.trm}} por dólar, vigente desde el {{co.trm#desde}}. Es el precio oficial del dólar en Colombia y la certifica la Superintendencia Financiera cada día hábil.",
    "Escribe un monto y te lo pasamos de dólares a pesos o de pesos a dólares.",
  ],
  comoSeCalcula: [
    "Dólares a pesos: dólares por la TRM.",
    "Pesos a dólares: pesos divididos por la TRM.",
    "Algunas TRM rigen varios días seguidos, por ejemplo durante un fin de semana.",
  ],
  ejemplo: ["Si la TRM es $4.000, 100 dólares son $400.000 y $1.000.000 son 250 dólares."],
  faq: [
    {
      pregunta: "¿A cuánto está el dólar hoy en Colombia?",
      respuesta: "La TRM vigente es {{co.trm}}. En bancos y casas de cambio el precio de compra y de venta es distinto.",
    },
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
