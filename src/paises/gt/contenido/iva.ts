import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.iva",
  h1: "Calculadora de IVA en Guatemala",
  title: "Calculadora de IVA en Guatemala: agregar o quitar el IVA",
  description: "Agregue el IVA a un precio o quítelo de un precio que ya lo incluye. Vea el precio sin IVA y el monto del impuesto al instante.",
  intro: [
    "El IVA en Guatemala es del {{gt.iva}} y se cobra sobre la venta de bienes y la prestación de servicios. Esta calculadora lo agrega a un precio o lo separa de un precio final.",
    "Los precios al público suelen incluir el IVA. Para saber cuánto impuesto hay dentro de un precio, use la opción de quitar.",
  ],
  comoSeCalcula: [
    "Agregar: IVA = precio sin IVA × {{gt.iva}}. Precio final = precio sin IVA + IVA.",
    "Quitar: precio sin IVA = precio con IVA / (1 + {{gt.iva}}). El IVA es la diferencia.",
  ],
  ejemplo: ["Un producto de Q1,000 con IVA incluido tiene un precio sin IVA de Q892.86 y Q107.14 de IVA."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Guatemala?",
      respuesta: "La tarifa es del {{gt.iva}}. Se aplica igual a bienes y servicios, salvo las operaciones exentas que indica la ley.",
    },
    {
      pregunta: "¿Cómo saco el IVA de un precio que ya lo incluye?",
      respuesta: "Divida el precio entre (1 + {{gt.iva}}) y obtiene el precio sin IVA. La diferencia entre los dos es el IVA.",
    },
    {
      pregunta: "¿Por qué no da lo mismo restar la tarifa al precio final?",
      respuesta: "Porque el IVA se calcula sobre el precio sin impuesto. Si le resta el {{gt.iva}} al precio final, quita de más.",
    },
    {
      pregunta: "¿El pequeño contribuyente cobra IVA?",
      respuesta: "No cobra IVA aparte. Paga una tarifa única sobre lo que factura y su factura no genera crédito fiscal para el comprador.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al Valor Agregado. Lo paga el consumidor final y lo cobra el vendedor para entregarlo a la SAT." },
    { termino: "Crédito fiscal", definicion: "El IVA que paga una empresa en sus compras y que puede restar del IVA de sus ventas." },
  ],
});
