import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.iva",
  h1: "Calculadora de IVA en Costa Rica",
  title: "Calculadora de IVA en Costa Rica: sume o quite el 13 %",
  description:
    "Sume o saque el IVA de un precio con la tarifa general del {{cr.iva[general]}} o las reducidas de la Ley 6826. Para facturas y precios finales.",
  intro: [
    "El impuesto al valor agregado se cobra sobre la venta de bienes y servicios. La tarifa general es del {{cr.iva[general]}}.",
    "Algunos bienes y servicios tienen tarifas reducidas del {{cr.iva[reducida-4]}}, {{cr.iva[reducida-2]}} o {{cr.iva[reducida-1]}}.",
  ],
  comoSeCalcula: [
    "Sumar el IVA: precio por la tarifa. El resultado se suma al precio.",
    "Sacar el IVA de un precio que ya lo incluye: precio dividido entre (1 más la tarifa). Lo que sobra es el impuesto.",
  ],
  ejemplo: ["Un producto de ₡10.000 sin IVA queda en ₡11.300 con la tarifa general."],
  faq: [
    {
      pregunta: "¿Qué paga el 1 % de IVA?",
      respuesta: "Los productos de la canasta básica y los bienes agropecuarios que la integran, según el artículo 11 de la Ley 6826.",
    },
    {
      pregunta: "¿Qué paga el 4 % y el 2 %?",
      respuesta: "El 4 %, los pasajes aéreos y los servicios de salud privados. El 2 %, los medicamentos, la educación privada y los seguros personales.",
    },
    {
      pregunta: "¿Cómo saco el IVA de un precio final?",
      respuesta: "Elija «Sacar el IVA» y escriba el precio con impuesto. Le mostramos el precio sin IVA y el monto del impuesto.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al valor agregado. Se cobra sobre bienes y también sobre servicios." },
    { termino: "Tarifa reducida", definicion: "Un porcentaje menor que la ley fija para ciertos bienes y servicios." },
  ],
});
