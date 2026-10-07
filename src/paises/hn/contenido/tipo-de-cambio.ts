import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.tipo-de-cambio",
  h1: "Tipo de cambio del dólar hoy en Honduras",
  title: "Tipo de cambio hoy: dólar a lempiras (BCH)",
  description: "Consulte el tipo de cambio de referencia del Banco Central de Honduras y convierta dólares a lempiras o lempiras a dólares.",
  intro: [
    "El tipo de cambio de referencia lo publica el Banco Central de Honduras (BCH) todos los días hábiles.",
    "En bancos y casas de cambio el precio de compra y el de venta son otros.",
  ],
  comoSeCalcula: [
    "De dólares a lempiras: multiplique los dólares por el tipo de cambio.",
    "De lempiras a dólares: divida los lempiras entre el tipo de cambio.",
  ],
  faq: [
    {
      pregunta: "¿Qué es el tipo de cambio de referencia?",
      respuesta: "Es el valor del dólar en lempiras que publica el Banco Central de Honduras. Es la referencia oficial.",
    },
    {
      pregunta: "¿Por qué el banco me da otro precio?",
      respuesta: "Cada banco fija su propio precio de compra y de venta, con un margen.",
    },
    {
      pregunta: "¿Hay tipo de cambio los fines de semana?",
      respuesta: "El BCH publica un valor que cubre el sábado, el domingo y el lunes siguiente, y hace lo mismo con los feriados.",
    },
  ],
  glosario: [{ termino: "BCH", definicion: "Banco Central de Honduras." }],
});
