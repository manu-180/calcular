import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.iva",
  h1: "Calculadora de IVA en Costa Rica",
  title: "Calculadora de IVA en Costa Rica: sume o saque el {{cr.iva[general]}}",
  description:
    "Sume o saque el IVA de un precio con la tarifa general del {{cr.iva[general]}} o las reducidas del {{cr.iva[reducida-4]}}, {{cr.iva[reducida-2]}} y {{cr.iva[reducida-1]}}. Para facturas y precios finales, al instante.",
  intro: [
    "El IVA en Costa Rica es del {{cr.iva[general]}} sobre la venta de bienes y servicios. Algunos productos y servicios pagan tarifas reducidas del {{cr.iva[reducida-4]}}, {{cr.iva[reducida-2]}} o {{cr.iva[reducida-1]}}.",
    "Elija si quiere sumar el IVA a un precio o sacarlo de un precio final, y escriba el monto.",
  ],
  comoSeCalcula: [
    "Sumar el IVA: multiplique el precio por la tarifa y sume el resultado al precio.",
    "Sacar el IVA de un precio que ya lo incluye: divida el precio entre (1 más la tarifa). Ese es el precio sin IVA y la diferencia es el impuesto.",
  ],
  ejemplo: ["Un producto de ₡10.000 sin IVA queda en ₡11.300 con la tarifa general. Y uno de ₡11.300 con IVA vale ₡10.000 sin el impuesto."],
  faq: [
    {
      pregunta: "¿Cuánto es el IVA en Costa Rica?",
      respuesta: "La tarifa general es del {{cr.iva[general]}}. Hay tarifas reducidas del {{cr.iva[reducida-4]}}, {{cr.iva[reducida-2]}} y {{cr.iva[reducida-1]}} para ciertos bienes y servicios (Ley 6826).",
    },
    {
      pregunta: "¿Cómo saco el IVA de un precio final?",
      respuesta: "Elija «Sacar el IVA» y escriba el precio con impuesto. Le mostramos el precio sin IVA y el monto del impuesto.",
    },
    {
      pregunta: "¿Qué paga el {{cr.iva[reducida-1]}} de IVA?",
      respuesta: "Los productos de la canasta básica y los bienes agropecuarios que la integran, según el artículo 11 de la Ley 6826.",
    },
    {
      pregunta: "¿Qué paga el {{cr.iva[reducida-4]}} y el {{cr.iva[reducida-2]}}?",
      respuesta: "El {{cr.iva[reducida-4]}}, los pasajes aéreos y los servicios de salud privados. El {{cr.iva[reducida-2]}}, los medicamentos, la educación privada y los seguros personales.",
    },
    {
      pregunta: "¿Por qué no basta con restar el {{cr.iva[general]}} al precio final?",
      respuesta: "Porque el IVA se calcula sobre el precio sin impuesto. Si le resta el porcentaje al total, obtiene un precio sin IVA más bajo que el real.",
    },
  ],
  glosario: [
    { termino: "IVA", definicion: "Impuesto al valor agregado. Se cobra sobre bienes y también sobre servicios." },
    { termino: "Tarifa reducida", definicion: "Un porcentaje menor que la ley fija para ciertos bienes y servicios." },
  ],
});
