import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.iva",
  h1: "Calculadora de IVA {{ec.iva}} en Ecuador",
  title: "Calculadora IVA {{ec.iva}} Ecuador: suma o quita el IVA",
  description: "Suma o quita el IVA de {{ec.iva}} a cualquier precio en segundos. Con la tarifa general vigente desde el {{ec.iva#desde}}, confirmada por el SRI.",
  intro: [
    "El IVA en Ecuador es de {{ec.iva}} desde el {{ec.iva#desde}}. Con esta calculadora lo sumas a un precio o lo separas de un precio que ya lo incluye.",
  ],
  comoSeCalcula: [
    "Para sumar el IVA, se multiplica el precio sin IVA por {{ec.iva}} y se suma al precio.",
    "Para quitarlo, se divide el precio con IVA para uno más la tarifa (con {{ec.iva}}, para 1,15). El resultado es el precio sin IVA, y la diferencia es el impuesto.",
  ],
  ejemplo: ["Un producto de $100 sin IVA cuesta $115 con IVA. Si pagaste $57,50, el precio sin IVA era $50 y el IVA, $7,50."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Ecuador en 2026?",
      respuesta: "{{ec.iva}}. Rige desde el {{ec.iva#desde}} y el SRI confirmó que sigue vigente mientras el Presidente no lo cambie por decreto.",
    },
    {
      pregunta: "¿Cómo se calcula el IVA de {{ec.iva}}?",
      respuesta: "Para sumarlo, multiplica el precio sin IVA por 1,15. Para quitarlo, divide el precio con IVA para 1,15: el resultado es el precio sin IVA y la diferencia es el impuesto.",
    },
    {
      pregunta: "¿Puede cambiar el IVA?",
      respuesta: "Sí. La ley fija 13 % y permite al Presidente subirlo hasta 15 % por decreto. Si cambia, lo actualizamos.",
    },
    {
      pregunta: "¿Todos los productos pagan IVA?",
      respuesta: "No. Hay bienes y servicios con tarifa 0 %. Esta calculadora usa la tarifa general.",
    },
    {
      pregunta: "¿Por qué a veces el IVA de turismo baja al 8 %?",
      respuesta: "El Presidente puede reducirlo al 8 % para servicios turísticos en feriados, por decreto y solo en las fechas que este indique.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al valor agregado. Se cobra sobre el precio de bienes y servicios." },
    { termino: "Tarifa general", definicion: "El porcentaje de IVA que se aplica a la mayoría de bienes y servicios." },
  ],
});
