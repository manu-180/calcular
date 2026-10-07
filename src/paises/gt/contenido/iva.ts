import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.iva",
  h1: "Calculadora de IVA en Guatemala",
  title: "Calcular IVA en Guatemala: agregar o quitar",
  description: "Agregue el IVA a un precio o quítelo de un precio que ya lo incluye.",
  intro: ["El IVA se cobra sobre la venta de bienes y la prestación de servicios. Esta calculadora lo agrega a un precio o lo separa de un precio final."],
  comoSeCalcula: [
    "Agregar: precio sin IVA × tarifa.",
    "Quitar: precio con IVA / (1 + tarifa), y la diferencia es el IVA.",
  ],
  faq: [],
  glosario: [{ termino: "IVA", definicion: "Impuesto al Valor Agregado." }],
});
