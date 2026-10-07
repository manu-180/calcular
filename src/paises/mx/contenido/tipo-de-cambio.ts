import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.tipo-de-cambio",
  h1: "Tipo de cambio del dólar hoy (FIX del DOF)",
  title: "Tipo de cambio del dólar hoy: FIX publicado en el DOF",
  description:
    "Consulta el tipo de cambio oficial del dólar que publica el Banco de México en el DOF y convierte dólares a pesos o pesos a dólares.",
  intro: [
    "Este es el tipo de cambio oficial para pagar en México deudas que están en dólares. Lo calcula el Banco de México y se publica cada día hábil en el Diario Oficial de la Federación.",
    "En bancos y casas de cambio el precio de compra y de venta es distinto.",
  ],
  comoSeCalcula: [
    "De dólares a pesos: multiplica los dólares por el tipo de cambio.",
    "De pesos a dólares: divide los pesos entre el tipo de cambio.",
  ],
  faq: [
    {
      pregunta: "¿Qué es el tipo de cambio FIX?",
      respuesta: "Es el tipo de cambio que determina el Banco de México cada día hábil y que se publica en el DOF. Sirve para pagar en pesos obligaciones que están en dólares.",
    },
    {
      pregunta: "¿Por qué el banco me da otro precio?",
      respuesta: "Cada banco fija su propio precio de compra y de venta, con un margen. El FIX es la referencia oficial.",
    },
    {
      pregunta: "¿Qué tipo de cambio uso para facturas en dólares?",
      respuesta: "Para efectos fiscales se usa el tipo de cambio que publica el Banco de México en el DOF. Revisa con tu contador qué fecha te corresponde.",
    },
  ],
  glosario: [
    { termino: "FIX", definicion: "Tipo de cambio de referencia del Banco de México para el dólar." },
    { termino: "DOF", definicion: "Diario Oficial de la Federación, donde se publican leyes, decretos y valores oficiales." },
  ],
});
