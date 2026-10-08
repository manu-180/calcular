import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.itbis",
  h1: "Calculadora de ITBIS en República Dominicana",
  title: "Calculadora de ITBIS {{do.itbis}}: agrega o quita el impuesto",
  description: "Agrega el ITBIS de {{do.itbis}} a un precio o sácalo de un precio que ya lo incluye. Resultado al centavo, con la tasa vigente de la DGII.",
  intro: [
    "El ITBIS en República Dominicana es de {{do.itbis}} sobre la venta de bienes y servicios. Para agregarlo, multiplica el precio por {{do.itbis}}; para sacarlo, divide el total entre 1 más la tasa.",
    "Usa la calculadora para saber el precio final con ITBIS, o para separar el impuesto de un precio que ya lo trae.",
  ],
  comoSeCalcula: [
    "Para agregar el ITBIS: multiplica el precio por {{do.itbis}} y súmalo al precio.",
    "Para sacarlo: divide el precio total entre 1 más la tasa (1.18 con la tasa de {{do.itbis}}). Lo que queda es el precio sin ITBIS.",
  ],
  ejemplo: ["Un servicio de RD$1,000 más ITBIS cuesta RD$1,180. De esos RD$1,180, RD$180 son impuesto."],
  faq: [
    {
      pregunta: "¿Cuál es la tasa del ITBIS?",
      respuesta: "La tasa general es {{do.itbis}}. Algunos bienes y servicios están exentos.",
    },
    {
      pregunta: "¿Cómo saco el ITBIS de un precio?",
      respuesta: "Divide el precio total entre 1 más la tasa. De RD$1,180, el precio sin ITBIS es RD$1,000 y el impuesto, RD$180.",
    },
    {
      pregunta: "¿Qué significa ITBIS?",
      respuesta: "Impuesto sobre la Transferencia de Bienes Industrializados y Servicios. Es el equivalente dominicano del IVA.",
    },
    {
      pregunta: "¿Cuándo se declara y se paga el ITBIS?",
      respuesta: "En los primeros 20 días del mes siguiente. Las ventas de enero se declaran y pagan antes del 20 de febrero.",
    },
  ],
  glosario: [
    { termino: "ITBIS", definicion: "Impuesto al consumo de bienes y servicios de República Dominicana." },
    { termino: "Precio neto", definicion: "El precio antes de sumar el impuesto." },
  ],
});
