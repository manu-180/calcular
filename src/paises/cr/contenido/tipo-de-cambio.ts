import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.tipo-de-cambio",
  h1: "Tipo de cambio del dólar en Costa Rica hoy",
  title: "Tipo de cambio del dólar hoy en Costa Rica (BCCR)",
  description:
    "Convierta dólares a colones con el tipo de cambio de referencia del BCCR: compra {{cr.tipo-cambio-compra}} y venta {{cr.tipo-cambio-venta}}.",
  intro: [
    "El Banco Central de Costa Rica publica cada día un tipo de cambio de referencia de compra y otro de venta.",
    "Elija si quiere pasar de dólares a colones o al revés y escriba el monto.",
  ],
  comoSeCalcula: [
    "Dólares a colones: el monto por el tipo de cambio de compra, que es lo que pagan por cada dólar que usted vende.",
    "Colones a dólares: el monto dividido entre el tipo de cambio de venta, que es lo que cuesta cada dólar que usted compra.",
    "Usamos el último valor publicado por el BCCR. Los bancos aplican su propio tipo de cambio, que puede ser un poco distinto.",
  ],
  ejemplo: ["Con una referencia de compra de ₡453,46, cien dólares son ₡45.346."],
  faq: [
    {
      pregunta: "¿Por qué hay un tipo de cambio de compra y otro de venta?",
      respuesta: "Porque las entidades compran dólares un poco más baratos de lo que los venden. La diferencia es su margen.",
    },
    {
      pregunta: "¿Por qué mi banco me da otro tipo de cambio?",
      respuesta: "Porque cada banco fija el suyo. El del BCCR es una referencia del mercado y sirve para comparar.",
    },
    {
      pregunta: "¿Cada cuánto se actualiza?",
      respuesta: "Todos los días hábiles. Lo actualizamos en cuanto el BCCR lo publica.",
    },
  ],
  glosario: [
    { termino: "Tipo de cambio de referencia", definicion: "El promedio de las operaciones del día que calcula el BCCR." },
    { termino: "BCCR", definicion: "Banco Central de Costa Rica." },
  ],
});
