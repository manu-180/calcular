import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.cotizacion-real",
  h1: "Cotización del real hoy en Paraguay",
  title: "Real hoy en Paraguay: cotización del BCP y conversor",
  description: "El real hoy cotiza a {{py.real}} según el BCP. Convertí reales a guaraníes y guaraníes a reales con la cotización de cada día hábil.",
  intro: [
    "El real hoy en Paraguay cotiza a {{py.real}}, según la cotización referencial del Banco Central del Paraguay (BCP).",
    "Sirve para compras en la frontera con Brasil, viajes y pagos en reales. Elegí hacia qué moneda querés convertir y poné el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de reales a guaraníes, se multiplica el monto por la cotización.",
    "Para pasar de guaraníes a reales, se divide el monto por la cotización.",
    "El BCP publica la cotización en guaraníes de cada moneda en su planilla diaria, cada día hábil.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el real hoy en Paraguay?",
      respuesta: "A {{py.real}}, según la cotización referencial del BCP. En casas de cambio los precios de compra y venta son otros.",
    },
    {
      pregunta: "¿Cuántos guaraníes son 100 reales?",
      respuesta: "Multiplicá 100 por la cotización del día. Con {{py.real}} por real, la calculadora te da el monto exacto.",
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
