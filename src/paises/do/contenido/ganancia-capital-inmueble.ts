import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.ganancia-capital-inmueble",
  h1: "Calculadora del impuesto a la ganancia de capital por venta de inmuebles",
  title: "Ganancia de capital por venta de inmueble en RD 2026",
  description: "Calcula el impuesto de {{do.ganancia-capital-inmuebles}} a la ganancia por vender una casa, un apartamento o un solar, con la exención por reinversión de la Ley 30-26.",
  intro: [
    "Desde la Ley 30-26, la ganancia que obtiene una persona física al vender un inmueble paga {{do.ganancia-capital-inmuebles}} de impuesto, como pago único y definitivo.",
    "Si vendes tu vivienda habitual y compras otra en 6 meses, la parte reinvertida queda exenta.",
  ],
  comoSeCalcula: [
    "La ganancia es el precio de venta menos el costo de compra ajustado por inflación con los factores de la DGII.",
    "Si reinviertes en tu nueva vivienda habitual, queda exenta la misma proporción de la ganancia que reinviertes del precio.",
    "Sobre la ganancia que queda se paga el {{do.ganancia-capital-inmuebles}}.",
  ],
  ejemplo: [
    "Si vendes en RD$8,000,000 un inmueble con costo ajustado de RD$5,000,000, ganas RD$3,000,000 y pagas RD$300,000 de impuesto.",
  ],
  faq: [
    { pregunta: "¿Cuánto se paga por vender una casa en RD?", respuesta: "El {{do.ganancia-capital-inmuebles}} de la ganancia, no del precio. La ganancia es lo que sobra después de restar el costo ajustado por inflación." },
    { pregunta: "¿Cuándo hay que pagarlo?", respuesta: "Dentro de los 6 meses desde que se perfecciona la venta." },
    { pregunta: "¿Hay exenciones?", respuesta: "Sí. La parte que reinviertas en tu nueva vivienda habitual dentro de 6 meses, y la venta de la vivienda habitual de personas de 65 años o más." },
    { pregunta: "¿Dónde busco el factor de ajuste por inflación?", respuesta: "La DGII publica cada año la tabla de multiplicadores para el ajuste por inflación de los activos de capital." },
  ],
  glosario: [
    { termino: "Ganancia de capital", definicion: "La diferencia entre el precio de venta y el costo ajustado del bien." },
    { termino: "Vivienda habitual", definicion: "La casa donde vives de forma permanente." },
  ],
});
