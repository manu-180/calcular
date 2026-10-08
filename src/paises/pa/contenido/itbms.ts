import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.itbms",
  h1: "Calculadora de ITBMS en Panamá",
  title: "Calculadora de ITBMS en Panamá: suma o quita el impuesto",
  description:
    "Suma o saca el ITBMS de un precio con la tarifa general del {{pa.itbms[general]}} o las de alcohol, hospedaje y tabaco. Según el artículo 1057-V del Código Fiscal.",
  intro: [
    "El ITBMS es el impuesto a la transferencia de bienes muebles y la prestación de servicios. La tarifa general es del {{pa.itbms[general]}}.",
    "Las bebidas alcohólicas y el hospedaje pagan {{pa.itbms[bebidas-alcoholicas]}}. Los productos de tabaco, {{pa.itbms[tabaco]}}.",
  ],
  comoSeCalcula: [
    "Sumar el ITBMS: precio por la tarifa. El resultado se suma al precio.",
    "Sacar el ITBMS de un precio que ya lo incluye: precio dividido entre (1 más la tarifa). La diferencia es el impuesto.",
  ],
  ejemplo: ["Un producto de B/. 100 sin impuesto queda en B/. 107 con la tarifa general."],
  faq: [
    {
      pregunta: "¿Cuánto es el ITBMS en Panamá?",
      respuesta: "La tarifa general es del {{pa.itbms[general]}}. Hay tarifas mayores para alcohol, hospedaje y tabaco.",
    },
    {
      pregunta: "¿Cuánto ITBMS paga un hotel?",
      respuesta: "El hospedaje y alojamiento en todo tipo de establecimiento paga {{pa.itbms[hospedaje]}}.",
    },
    {
      pregunta: "¿Cómo saco el ITBMS de un precio final?",
      respuesta: "Elige «Sacar el ITBMS» y escribe el precio con impuesto. Te mostramos el precio sin ITBMS y el monto del impuesto.",
    },
  ],
  glosario: [
    { termino: "ITBMS", definicion: "Impuesto de Transferencia de Bienes Corporales Muebles y la Prestación de Servicios. Es el IVA de Panamá." },
    { termino: "Precio con impuesto", definicion: "Lo que paga el cliente, con el ITBMS incluido." },
  ],
});
