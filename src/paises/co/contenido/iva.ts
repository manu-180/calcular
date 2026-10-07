import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.iva",
  h1: "Calculadora de IVA",
  title: "Calculadora de IVA en Colombia: suma o quita el IVA",
  description:
    "Suma o saca el IVA de un precio con la tarifa general del {{co.iva[general]}} o la reducida del {{co.iva[reducida]}}, según el Estatuto Tributario.",
  intro: [
    "El IVA es el impuesto que se cobra sobre la venta de bienes y servicios. La tarifa general es del {{co.iva[general]}}.",
    "Algunos bienes pagan una tarifa reducida del {{co.iva[reducida]}}, y otros están excluidos o exentos.",
  ],
  comoSeCalcula: [
    "Sumar el IVA: precio por la tarifa. El resultado se suma al precio.",
    "Sacar el IVA de un precio que ya lo incluye: precio dividido por (1 más la tarifa). Lo que sobra es el IVA.",
  ],
  ejemplo: ["Si un producto cuesta $100.000 sin IVA, con la tarifa general queda en $119.000."],
  faq: [
    {
      pregunta: "¿Qué productos pagan la tarifa reducida?",
      respuesta: "Los que lista el artículo 468-1 del Estatuto Tributario, por ejemplo el café, el trigo y el arroz para uso industrial.",
    },
    {
      pregunta: "¿Cómo saco el IVA de un precio final?",
      respuesta: "Elige «Sacar el IVA» y escribe el precio con IVA. Te mostramos el precio sin IVA y cuánto es el impuesto.",
    },
    {
      pregunta: "¿Va a cambiar el IVA?",
      respuesta: "Hoy rigen las tarifas del Estatuto Tributario. Si una reforma las cambia, actualizamos la calculadora.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto sobre las ventas. Lo paga quien compra y lo declara quien vende." },
    { termino: "Bien excluido", definicion: "Un bien que no paga IVA." },
  ],
});
