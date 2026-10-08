import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.itbms",
  h1: "Calculadora de ITBMS en Panamá",
  title: "Calcular ITBMS en Panamá: suma o quita el {{pa.itbms[general]}}",
  description:
    "Suma o saca el ITBMS de un precio en Panamá: tarifa general del {{pa.itbms[general]}} y tarifas de alcohol, hospedaje y tabaco, según el artículo 1057-V del Código Fiscal.",
  intro: [
    "La tarifa general del ITBMS en Panamá es del {{pa.itbms[general]}}. Las bebidas alcohólicas y el hospedaje pagan {{pa.itbms[bebidas-alcoholicas]}}, y los productos de tabaco {{pa.itbms[tabaco]}}.",
    "Elige si quieres sumar el impuesto a un precio o sacarlo de un precio que ya lo incluye.",
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
      pregunta: "¿Cómo se suma el ITBMS a un precio?",
      respuesta: "Multiplica el precio por la tarifa y súmale el resultado. Un producto de B/. 100 queda en B/. 107 con la tarifa general.",
    },
    {
      pregunta: "¿Cómo saco el ITBMS de un precio final?",
      respuesta: "Divide el precio entre 1 más la tarifa. En la calculadora, elige «Sacar el ITBMS» y te mostramos el precio sin impuesto y el monto del ITBMS.",
    },
    {
      pregunta: "¿Cuánto ITBMS paga un hotel?",
      respuesta: "El hospedaje y alojamiento en todo tipo de establecimiento paga {{pa.itbms[hospedaje]}}.",
    },
  ],
  glosario: [
    { termino: "ITBMS", definicion: "Impuesto de Transferencia de Bienes Corporales Muebles y la Prestación de Servicios. Es el IVA de Panamá." },
    { termino: "Precio con impuesto", definicion: "Lo que paga el cliente, con el ITBMS incluido." },
  ],
});
