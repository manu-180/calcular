import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.ganancia-de-capital",
  h1: "Impuesto por vender una propiedad (ganancia de capital)",
  title: "Ganancia de capital en Costa Rica: impuesto al vender",
  description:
    "Calcule el impuesto por vender un terreno, casa o acciones: {{cr.ganancia-capital[general]}} de la ganancia, o {{cr.ganancia-capital[primera-venta]}} del precio si lo compró antes de julio de 2019.",
  intro: [
    "Cuando vende un bien por más de lo que le costó, paga impuesto sobre la ganancia: {{cr.ganancia-capital[general]}}. La casa donde vive está exenta.",
    "Si lo compró antes del 1 de julio de 2019 y es la primera venta, puede elegir pagar {{cr.ganancia-capital[primera-venta]}} del precio de venta. Le mostramos cuál le conviene.",
  ],
  comoSeCalcula: [
    "Ganancia: precio de venta menos lo que le costó (compra y mejoras).",
    "Impuesto general: {{cr.ganancia-capital[general]}} de la ganancia.",
    "Opción para bienes comprados antes del 1 de julio de 2019, en su primera venta: {{cr.ganancia-capital[primera-venta]}} del precio de venta.",
    "Vivienda habitual: exenta.",
  ],
  ejemplo: ["Un lote comprado en ₡60.000.000 y vendido en ₡80.000.000 deja ₡20.000.000 de ganancia y paga ₡3.000.000 de impuesto."],
  faq: [
    {
      pregunta: "¿Pago impuesto si vendo mi casa?",
      respuesta: "No, si es su vivienda habitual. La ley exonera la ganancia por vender la casa donde vive.",
    },
    {
      pregunta: "¿Qué es la opción del {{cr.ganancia-capital[primera-venta]}}?",
      respuesta: "Para bienes comprados antes de que empezara a regir este impuesto (1 de julio de 2019), en la primera venta puede pagar {{cr.ganancia-capital[primera-venta]}} del precio en lugar de {{cr.ganancia-capital[general]}} de la ganancia.",
    },
    {
      pregunta: "¿Y si vendo con pérdida?",
      respuesta: "No hay impuesto que pagar, porque no hubo ganancia.",
    },
  ],
  glosario: [
    { termino: "Ganancia de capital", definicion: "La diferencia positiva entre el precio de venta de un bien y lo que costó." },
    { termino: "Vivienda habitual", definicion: "La casa donde usted vive de forma permanente." },
  ],
});
