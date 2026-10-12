import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.ganancia-ocasional",
  h1: "Calculadora de ganancia ocasional",
  title: "Ganancia ocasional 2026: herencias, premios y ventas",
  description:
    "Calcula el impuesto de ganancia ocasional: {{co.ganancia-ocasional[general]}} para herencias, donaciones y ventas, y {{co.ganancia-ocasional[loterias]}} para loterías y premios.",
  intro: [
    "La ganancia ocasional es un impuesto sobre ingresos que no son de todos los días: una herencia, una donación, un premio o la venta de un bien que tenías hace dos años o más.",
    "Tiene su propia tarifa, aparte del impuesto de renta. Elige qué recibiste y el valor: te mostramos la parte exenta y el impuesto.",
  ],
  comoSeCalcula: [
    "Premios de lotería, rifas y apuestas: {{co.ganancia-ocasional[loterias]}} del premio.",
    "Herencias para herederos o cónyuge: los primeros {{co.ganancia-ocasional-exenciones[heredero]}} por persona están exentos; el resto paga {{co.ganancia-ocasional[general]}}.",
    "Donaciones y herencias para quien no es heredero: el {{co.ganancia-ocasional-donacion}} está exento, hasta {{co.ganancia-ocasional-exenciones[donacion-tope]}}; el resto paga {{co.ganancia-ocasional[general]}}.",
    "Venta de bienes que tenías hace dos años o más: {{co.ganancia-ocasional[general]}} de la ganancia (precio de venta menos costo fiscal).",
  ],
  ejemplo: [
    "Si te ganas $10.000.000 en una lotería, el impuesto es de $2.000.000.",
    "Si heredas $300.000.000 en 2026, $170.215.500 están exentos y pagas $19.467.675.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga de impuesto por una herencia?",
      respuesta: "El {{co.ganancia-ocasional[general]}} de lo que pase de {{co.ganancia-ocasional-exenciones[heredero]}} por heredero. Si la herencia incluye la vivienda del causante, hay una exención adicional de hasta {{co.ganancia-ocasional-exenciones[vivienda]}}.",
    },
    {
      pregunta: "¿Cuánto descuentan de un premio de lotería?",
      respuesta: "El impuesto es del {{co.ganancia-ocasional[loterias]}} del premio. Normalmente lo retienen al pagarte.",
    },
    {
      pregunta: "¿Si vendo mi casa pago ganancia ocasional?",
      respuesta: "Si la tenías hace dos años o más, la ganancia paga {{co.ganancia-ocasional[general]}}. Si la tenías hace menos, la ganancia va en el impuesto de renta.",
    },
  ],
  glosario: [
    { termino: "Ganancia ocasional", definicion: "Un ingreso extraordinario, como una herencia o un premio, que paga un impuesto aparte." },
    { termino: "Costo fiscal", definicion: "Lo que te costó el bien para efectos de impuestos, con sus ajustes." },
  ],
});
