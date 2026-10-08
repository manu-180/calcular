import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.iva",
  h1: "Calculadora de IVA en El Salvador",
  title: "Calculadora de IVA en El Salvador: sume o quite el {{sv.iva}}",
  description: "Sume o quite el IVA del {{sv.iva}} a cualquier precio en segundos. Vea el precio sin IVA, el impuesto y el total, con la tasa de la ley del IVA de El Salvador.",
  intro: [
    "El IVA en El Salvador es del {{sv.iva}} sobre la venta de bienes y la prestación de servicios.",
    "Ponga un monto y elija si quiere sumarle el IVA o quitárselo a un precio que ya lo incluye.",
  ],
  comoSeCalcula: [
    "Para sumar el IVA, se multiplica el precio sin IVA por el {{sv.iva}} y se le suma.",
    "Para quitarlo, se divide el precio con IVA por 1.13. Lo que queda es el precio sin IVA y la diferencia es el impuesto.",
  ],
  ejemplo: ["Un producto de $100 sin IVA cuesta $113 con IVA. Y uno de $113 con IVA vale $100 sin el impuesto."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en El Salvador?",
      respuesta: "El {{sv.iva}} sobre la base imponible, según el artículo 54 de la ley del IVA.",
    },
    {
      pregunta: "¿Cómo saco el precio sin IVA?",
      respuesta: "Divida el precio con IVA por 1.13. Por ejemplo, $56.50 dividido por 1.13 da $50.",
    },
    {
      pregunta: "¿Cómo le sumo el IVA a un precio?",
      respuesta: "Multiplique el precio sin IVA por 1.13. Por ejemplo, $50 por 1.13 da $56.50.",
    },
    {
      pregunta: "¿Por qué no basta con restar el porcentaje al precio final?",
      respuesta: "Porque el {{sv.iva}} se calcula sobre el precio sin IVA, no sobre el precio final. Restar el porcentaje del total le daría un precio sin IVA más bajo que el real.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto a la transferencia de bienes muebles y a la prestación de servicios." },
    { termino: "Base imponible", definicion: "El precio sin IVA sobre el que se calcula el impuesto." },
  ],
});
