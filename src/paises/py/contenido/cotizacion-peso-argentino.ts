import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.cotizacion-peso-argentino",
  h1: "Cotización del peso argentino hoy en Paraguay",
  title: "Peso argentino hoy en Paraguay: cotización y conversor",
  description: "El peso argentino hoy cotiza a {{py.peso-argentino}} según el BCP. Convertí pesos argentinos a guaraníes y guaraníes a pesos argentinos con la cotización de cada día hábil.",
  intro: [
    "El peso argentino hoy en Paraguay cotiza a {{py.peso-argentino}}, según la cotización referencial del Banco Central del Paraguay (BCP).",
    "Sirve para compras en la frontera con Argentina, viajes y envíos de plata. Elegí hacia qué moneda querés convertir y poné el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de pesos argentinos a guaraníes, se multiplica el monto por la cotización.",
    "Para pasar de guaraníes a pesos argentinos, se divide el monto por la cotización.",
    "El BCP publica la cotización en guaraníes de cada moneda en su planilla diaria, cada día hábil.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el peso argentino hoy en Paraguay?",
      respuesta: "A {{py.peso-argentino}}, según la cotización referencial del BCP. En casas de cambio los precios de compra y venta son otros.",
    },
    {
      pregunta: "¿Cuántos guaraníes son 100.000 pesos argentinos?",
      respuesta: "Multiplicá 100.000 por la cotización del día. Con {{py.peso-argentino}} por peso, la calculadora te da el monto exacto.",
    },
    {
      pregunta: "¿Por qué la casa de cambios me da otro precio?",
      respuesta: "Bancos y casas de cambio compran más barato y venden más caro que la referencia. La diferencia es su margen.",
    },
    {
      pregunta: "¿Cada cuánto se actualiza?",
      respuesta: "Cada día hábil. Los fines de semana y feriados vale la del último día hábil.",
    },
  ],
  glosario: [
    { termino: "BCP", definicion: "Banco Central del Paraguay." },
    { termino: "Cotización referencial", definicion: "El valor en guaraníes que publica el BCP para cada moneda, cada día hábil." },
  ],
});
