import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.ganancia-de-capital",
  h1: "Calculadora del impuesto sobre ganancias de capital en Honduras",
  title: "Ganancia de capital en Honduras: impuesto único del {{hn.ganancia-capital}}",
  description: "Calcule el impuesto único del {{hn.ganancia-capital}} sobre la ganancia al vender una casa, un terreno, un vehículo o acciones en Honduras.",
  intro: [
    "Cuando vende un bien por más de lo que le costó, la diferencia es una ganancia de capital. Paga un impuesto único del {{hn.ganancia-capital}}.",
    "Ese impuesto no se suma al ISR de la tabla progresiva: se paga aparte y una sola vez.",
  ],
  comoSeCalcula: [
    "Ganancia = precio de venta − costo del bien (compra más mejoras).",
    "Impuesto = ganancia × {{hn.ganancia-capital}}.",
  ],
  ejemplo: ["Compró un terreno en L1,800,000 y lo vende en L2,500,000. La ganancia es L700,000 y el impuesto L70,000."],
  faq: [
    {
      pregunta: "¿Cuánto se paga por ganancia de capital en Honduras?",
      respuesta: "Un impuesto único del {{hn.ganancia-capital}} sobre la ganancia, para personas naturales y jurídicas, domiciliadas o no en Honduras.",
    },
    {
      pregunta: "¿Se suma a mi ISR del año?",
      respuesta: "No. Como es un impuesto único, la ganancia de capital no entra en la tabla progresiva del ISR.",
    },
    {
      pregunta: "¿Y si el comprador es el Estado?",
      respuesta: "En las compras, indemnizaciones o compra de derechos que paga el Estado, el propio Estado retiene el {{hn.ganancia-capital}}.",
    },
  ],
  glosario: [
    { termino: "Ganancia de capital", definicion: "La diferencia positiva entre el precio de venta de un bien y su costo." },
    { termino: "Impuesto único", definicion: "El que se paga una vez sobre ese ingreso y no se suma a otros." },
  ],
});
