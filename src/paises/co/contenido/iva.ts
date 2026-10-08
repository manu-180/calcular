import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.iva",
  h1: "Calculadora de IVA en Colombia: sumar o sacar el IVA",
  title: "Calculadora de IVA Colombia: suma o saca el {{co.iva[general]}}",
  description:
    "Suma o saca el IVA de un precio en un clic, con la tarifa general del {{co.iva[general]}} o la reducida del {{co.iva[reducida]}}. Te mostramos el valor sin IVA, el impuesto y el total.",
  intro: [
    "El IVA en Colombia es del {{co.iva[general]}} para la mayoría de bienes y servicios. Para sumarlo, multiplica el precio sin IVA por 1,19; para sacarlo, divide el precio con IVA por 1,19.",
    "Algunos bienes pagan una tarifa reducida del {{co.iva[reducida]}}, y otros están excluidos o exentos.",
  ],
  comoSeCalcula: [
    "Sumar el IVA: precio por la tarifa. El resultado se suma al precio.",
    "Sacar el IVA de un precio que ya lo incluye: precio dividido por (1 más la tarifa). Lo que sobra es el IVA.",
  ],
  ejemplo: [
    "Si un producto cuesta $100.000 sin IVA, con la tarifa general queda en $119.000.",
    "Al revés, si pagaste $238.000 con IVA incluido, el precio sin IVA es $200.000 y el IVA, $38.000.",
  ],
  faq: [
    {
      pregunta: "¿Cómo saco el IVA de un precio final?",
      respuesta: "Divide el precio por 1,19 si tiene la tarifa general. Lo que queda es el precio sin IVA, y la diferencia es el impuesto. En la calculadora elige «Sacar el IVA».",
    },
    {
      pregunta: "¿Qué productos pagan la tarifa reducida?",
      respuesta: "Los que lista el artículo 468-1 del Estatuto Tributario, por ejemplo el café, el trigo y el arroz para uso industrial.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre excluido y exento?",
      respuesta: "Un bien excluido no paga IVA. Un bien exento tiene tarifa del 0 %, y quien lo vende puede pedir la devolución del IVA que pagó en sus compras.",
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
