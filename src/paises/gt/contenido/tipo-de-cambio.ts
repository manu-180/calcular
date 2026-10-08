import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.tipo-de-cambio",
  h1: "Tipo de cambio del dólar hoy en Guatemala",
  title: "Tipo de cambio hoy en Guatemala: dólar a quetzales (Banguat)",
  description:
    "Tipo de cambio de referencia del Banguat hoy: {{gt.tipo-cambio}} por dólar. Convierta dólares a quetzales o quetzales a dólares al instante.",
  intro: [
    "El tipo de cambio de referencia del Banco de Guatemala (Banguat) hoy es {{gt.tipo-cambio}} por cada dólar. El Banguat publica un valor para cada día, incluidos los fines de semana.",
    "En bancos y casas de cambio el precio de compra y el de venta son otros. Escriba el monto y elija hacia qué moneda quiere convertir.",
  ],
  comoSeCalcula: [
    "De dólares a quetzales: multiplique los dólares por el tipo de cambio.",
    "De quetzales a dólares: divida los quetzales entre el tipo de cambio.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el dólar hoy en Guatemala?",
      respuesta: "Según la referencia del Banguat, a {{gt.tipo-cambio}} por dólar.",
    },
    {
      pregunta: "¿Qué es el tipo de cambio de referencia?",
      respuesta: "Es el valor del dólar en quetzales que calcula el Banco de Guatemala con las operaciones del mercado. Es la referencia oficial.",
    },
    {
      pregunta: "¿Por qué el banco me da otro precio?",
      respuesta: "Cada banco fija su propio precio de compra y de venta, con un margen. El de referencia es el promedio oficial.",
    },
    {
      pregunta: "¿Hay tipo de cambio los fines de semana?",
      respuesta: "Sí. El Banguat publica un valor para cada día. Los fines de semana y feriados suele repetir el del último día hábil.",
    },
  ],
  glosario: [{ termino: "Banguat", definicion: "Banco de Guatemala, el banco central del país." }],
});
