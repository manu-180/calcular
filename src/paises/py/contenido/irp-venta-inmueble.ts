import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.irp-venta-inmueble",
  h1: "Calculadora del IRP por venta de inmuebles",
  title: "Impuesto por vender un inmueble en Paraguay: calculalo",
  description: "Calculá el IRP por vender una casa o un terreno: {{py.irp-capital-tasa}} sobre la menor entre el {{py.irp-venta-presunta}} del precio y tu ganancia real.",
  intro: [
    "Cuando una persona vende un inmueble, la ganancia paga el IRP de rentas del capital. La tasa es del {{py.irp-capital-tasa}}.",
    "La base es la menor entre el {{py.irp-venta-presunta}} del precio de venta y la ganancia real (precio menos lo que pagaste al comprar y los gastos de la venta).",
  ],
  comoSeCalcula: [
    "Renta presunta: el {{py.irp-venta-presunta}} del precio de venta.",
    "Ganancia real: precio de venta menos precio de compra y gastos. Solo vale si podés probar el costo con la escritura o comprobantes.",
    "Se toma la menor y se le aplica el {{py.irp-capital-tasa}}.",
  ],
  ejemplo: ["Si vendés en Gs. 500.000.000 algo que compraste en Gs. 400.000.000, con Gs. 10.000.000 de gastos, la ganancia real es Gs. 90.000.000. Pagás Gs. 7.200.000."],
  faq: [
    {
      pregunta: "¿Cuánto se paga de impuesto por vender una casa?",
      respuesta: "El {{py.irp-capital-tasa}} de la ganancia. Sin papeles del costo, la ganancia se toma como el {{py.irp-venta-presunta}} del precio.",
    },
    {
      pregunta: "¿Cómo pruebo lo que pagué al comprar?",
      respuesta: "Con la escritura inscripta en los Registros Públicos o con los comprobantes de la compra.",
    },
    {
      pregunta: "¿Cuándo se paga?",
      respuesta: "La DNIT suele cobrarlo en el momento de la escritura, como pago único y definitivo.",
    },
  ],
  glosario: [
    { termino: "Ganancia de capital", definicion: "La diferencia entre lo que cobraste al vender un bien y lo que te costó." },
    { termino: "Pago único y definitivo", definicion: "Un impuesto que se paga una vez y no se vuelve a declarar." },
  ],
});
