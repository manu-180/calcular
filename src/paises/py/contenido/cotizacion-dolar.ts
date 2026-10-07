import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.cotizacion-dolar",
  h1: "Cotización del dólar hoy",
  title: "Dólar hoy en Paraguay: cotización del BCP",
  description: "Convertí dólares a guaraníes y guaraníes a dólares con la cotización referencial del Banco Central del Paraguay, actualizada cada día hábil.",
  intro: [
    "Usamos la cotización referencial del Banco Central del Paraguay (BCP). Es el promedio de las operaciones entre bancos de cada día hábil.",
    "Elegí hacia qué moneda querés convertir y poné el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de dólares a guaraníes, se multiplica el monto por la cotización.",
    "Para pasar de guaraníes a dólares, se divide el monto por la cotización.",
    "La cotización sale de las operaciones entre bancos de 8:30 a 13:00 de cada día hábil.",
  ],
  faq: [
    {
      pregunta: "¿Por qué el banco me da otro precio?",
      respuesta: "Bancos y casas de cambio compran más barato y venden más caro que la referencia. La diferencia es su margen.",
    },
    {
      pregunta: "¿Cada cuánto se actualiza?",
      respuesta: "Cada día hábil. Los fines de semana y feriados vale la del último día hábil.",
    },
    {
      pregunta: "¿Es la misma que la del mercado con clientes?",
      respuesta: "No. El BCP publica aparte las cotizaciones de compra y venta con clientes desde USD 50.000. Acá usamos la referencial, que es el promedio entre bancos.",
    },
  ],
  glosario: [
    { termino: "BCP", definicion: "Banco Central del Paraguay." },
    { termino: "Cotización referencial", definicion: "El promedio ponderado del dólar en las operaciones entre bancos del día." },
  ],
});
