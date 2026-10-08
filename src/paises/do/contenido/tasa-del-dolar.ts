import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.tasa-del-dolar",
  h1: "Tasa del dólar hoy en República Dominicana",
  title: "Tasa del dólar hoy: compra y venta del Banco Central",
  description: "Tasa de referencia del dólar del Banco Central de la República Dominicana, compra y venta. Convierte dólares a pesos y pesos a dólares.",
  intro: [
    "El Banco Central publica cada día hábil la tasa de referencia del dólar en el mercado spot, con un valor de compra y otro de venta.",
    "Usamos la última tasa publicada. Los fines de semana y feriados vale la del último día hábil.",
  ],
  comoSeCalcula: [
    "Dólares a pesos: el monto por la tasa de compra. Es lo que te pagarían por vender tus dólares.",
    "Pesos a dólares: el monto dividido entre la tasa de venta. Es lo que comprarías con tus pesos.",
    "Bancos y casas de cambio usan su propia tasa, cerca de la de referencia.",
  ],
  faq: [
    {
      pregunta: "¿Qué diferencia hay entre la tasa de compra y la de venta?",
      respuesta: "La de compra es a cuánto el mercado te compra los dólares. La de venta es a cuánto te los vende. La de venta siempre es un poco más alta.",
    },
    {
      pregunta: "¿Por qué el banco me da otra tasa?",
      respuesta: "Porque cada banco fija la suya. La tasa del Banco Central es un promedio de referencia del mercado.",
    },
    {
      pregunta: "¿Cada cuánto se actualiza?",
      respuesta: "Cada día hábil. Nosotros la leemos todos los días del sitio del Banco Central.",
    },
  ],
  glosario: [
    { termino: "Tasa de referencia", definicion: "Promedio de las operaciones del día que publica el Banco Central." },
    { termino: "Mercado spot", definicion: "Compra y venta de dólares para entrega inmediata." },
  ],
});
