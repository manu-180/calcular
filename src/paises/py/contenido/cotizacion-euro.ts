import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.cotizacion-euro",
  h1: "Cotización del euro hoy en Paraguay",
  title: "Euro hoy en Paraguay: cotización del BCP y conversor",
  description: "El euro hoy cotiza a {{py.euro}} según el BCP. Convertí euros a guaraníes y guaraníes a euros con la cotización de cada día hábil.",
  intro: [
    "El euro hoy en Paraguay cotiza a {{py.euro}}, según la cotización referencial del Banco Central del Paraguay (BCP).",
    "Sirve para viajes, compras en tiendas de Europa y remesas. Elegí hacia qué moneda querés convertir y poné el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de euros a guaraníes, se multiplica el monto por la cotización.",
    "Para pasar de guaraníes a euros, se divide el monto por la cotización.",
    "El BCP publica la cotización en guaraníes de cada moneda en su planilla diaria, cada día hábil.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el euro hoy en Paraguay?",
      respuesta: "A {{py.euro}}, según la cotización referencial del BCP. En casas de cambio los precios de compra y venta son otros.",
    },
    {
      pregunta: "¿Cuántos guaraníes son 100 euros?",
      respuesta: "Multiplicá 100 por la cotización del día. Con {{py.euro}} por euro, la calculadora te da el monto exacto.",
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
