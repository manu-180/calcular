import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.intereses-sunat",
  h1: "Calculadora de intereses moratorios de SUNAT (TIM)",
  title: "Intereses SUNAT 2026: calcula la TIM de tu deuda",
  description:
    "Calcula los intereses por pagar tarde un tributo a SUNAT con la TIM de {{pe.tim[soles]}} mensual en soles ({{pe.tim[dolares]}} en dólares). Días de atraso y total a pagar.",
  intro: [
    "Si pagas un impuesto después de su vencimiento, SUNAT te cobra intereses moratorios por cada día de atraso. La tasa se llama TIM.",
    "Pon el tributo, la fecha de vencimiento y la fecha en que vas a pagar. Te decimos los intereses y el total.",
  ],
  comoSeCalcula: [
    "La TIM vigente es {{pe.tim[soles]}} mensual para deudas en soles y {{pe.tim[dolares]}} para deudas en dólares.",
    "La TIM diaria es la mensual dividida entre 30.",
    "Se cuentan los días desde el siguiente al vencimiento hasta el día de pago, inclusive, y se multiplica el tributo por la TIM diaria y por esos días.",
  ],
  ejemplo: ["Debías S/ 5,000 de IGV con vencimiento el 28 de agosto y pagas el 12 de octubre: son 45 días de atraso y S/ 67.50 de intereses."],
  faq: [
    {
      pregunta: "¿Cuánto es la TIM de SUNAT hoy?",
      respuesta: "{{pe.tim[soles]}} mensual en soles y {{pe.tim[dolares]}} mensual en dólares, desde el {{pe.tim#desde}}.",
    },
    {
      pregunta: "¿Los intereses se capitalizan?",
      respuesta: "No. Se calculan cada día sobre el tributo impago, sin sumar intereses sobre intereses.",
    },
    {
      pregunta: "¿Las multas también pagan TIM?",
      respuesta: "No desde 2024. Por la Ley 31962, las multas generan interés legal en vez de la TIM.",
    },
    {
      pregunta: "¿Conviene pagar aunque sea tarde?",
      respuesta: "Sí. Los intereses se cuentan por día, así que mientras antes pagues, menos pagas.",
    },
  ],
  glosario: [
    { termino: "TIM", definicion: "Tasa de interés moratorio: el interés mensual que fija SUNAT para los tributos pagados fuera de plazo." },
    { termino: "Tributo impago", definicion: "El impuesto que no pagaste dentro del plazo de vencimiento." },
  ],
});
