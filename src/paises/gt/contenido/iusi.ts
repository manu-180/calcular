import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.iusi",
  h1: "Calculadora de IUSI en Guatemala",
  title: "IUSI en Guatemala: calcule el impuesto de su inmueble",
  description:
    "Calcule el IUSI de su casa o terreno con el valor de la matrícula fiscal. Le mostramos la tasa por millar y cuánto paga en el año.",
  intro: [
    "El Impuesto Único sobre Inmuebles (IUSI) se paga cada año sobre el valor de su casa, apartamento o terreno según la matrícula fiscal. Lo cobra la municipalidad donde está el inmueble.",
    "La tasa se expresa por millar y depende del valor: mientras más vale el inmueble, más alta es la tasa. Los inmuebles de menor valor están exentos.",
  ],
  comoSeCalcula: [
    "Se busca en qué tramo de la ley cae el valor del inmueble.",
    "IUSI del año = valor del inmueble × tasa por millar / 1,000.",
    "La tasa se aplica a todo el valor, no solo a la parte que pasa de cada tramo.",
  ],
  ejemplo: ["Un inmueble con valor de Q500,000 paga 9 por millar: Q4,500 al año."],
  faq: [
    {
      pregunta: "¿Cuándo se paga el IUSI?",
      respuesta: "Se puede pagar en cuatro cuotas trimestrales o todo el año junto. Cada municipalidad indica las fechas y algunas dan descuento por pago anticipado.",
    },
    {
      pregunta: "¿Dónde veo el valor de mi inmueble?",
      respuesta: "En su boleta de IUSI o en la matrícula fiscal de la municipalidad. Si hizo un avalúo reciente, ese es el valor que se usa.",
    },
    {
      pregunta: "¿Qué pasa si no pago el IUSI?",
      respuesta: "La municipalidad cobra multas e intereses. Además, no le darán la solvencia que piden para vender el inmueble o hacer otros trámites.",
    },
  ],
  glosario: [
    { termino: "Por millar", definicion: "Quetzales que se pagan por cada mil quetzales de valor. 9 por millar es lo mismo que 0.9 %." },
    { termino: "Matrícula fiscal", definicion: "Registro de los inmuebles y su valor que lleva la municipalidad para cobrar el IUSI." },
  ],
});
