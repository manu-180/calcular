import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.tipo-de-cambio",
  h1: "Tipo de cambio del dólar hoy en México (FIX del DOF)",
  title: "Tipo de cambio hoy: dólar FIX a {{mx.dolar-fix}} (DOF)",
  description:
    "Precio del dólar hoy según el tipo de cambio FIX del Banco de México que publica el DOF: {{mx.dolar-fix}}. Convierte dólares a pesos o pesos a dólares al instante.",
  intro: [
    "El tipo de cambio oficial del dólar es de {{mx.dolar-fix}}, según el DOF del {{mx.dolar-fix#desde}}. Lo calcula el Banco de México cada día hábil y sirve para pagar en pesos deudas que están en dólares.",
    "En bancos y casas de cambio el precio de compra y de venta es distinto, porque cada uno cobra su margen.",
  ],
  comoSeCalcula: [
    "De dólares a pesos: multiplica los dólares por el tipo de cambio.",
    "De pesos a dólares: divide los pesos entre el tipo de cambio.",
  ],
  ejemplo: [
    "Para pasar 100 dólares a pesos, multiplica 100 por {{mx.dolar-fix}}. Para pasar 1,000 pesos a dólares, divide 1,000 entre el mismo valor.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el dólar hoy?",
      respuesta: "El tipo de cambio FIX publicado en el DOF es de {{mx.dolar-fix}} por dólar. En tu banco o casa de cambio el precio puede ser un poco más alto o más bajo.",
    },
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
