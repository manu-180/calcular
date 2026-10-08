import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.tipo-de-cambio",
  h1: "Tipo de cambio oficial hoy en Nicaragua: dólar a córdoba",
  title: "Tipo de cambio en Nicaragua hoy: {{ni.tipo-cambio}} por dólar",
  description: "Tipo de cambio oficial del Banco Central de Nicaragua: {{ni.tipo-cambio}} por dólar. Convertí dólares a córdobas y córdobas a dólares al instante.",
  intro: [
    "El tipo de cambio oficial de hoy en Nicaragua es {{ni.tipo-cambio}} por dólar. Lo publica el Banco Central de Nicaragua (BCN) para cada día del año.",
    "Elegí hacia qué moneda querés convertir y poné el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de dólares a córdobas, se multiplica el monto por el tipo de cambio del día.",
    "Para pasar de córdobas a dólares, se divide el monto por el tipo de cambio.",
    "El BCN publica por adelantado el valor de cada día del mes.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el dólar hoy en Nicaragua?",
      respuesta: "El tipo de cambio oficial del BCN es {{ni.tipo-cambio}} por dólar.",
    },
    {
      pregunta: "¿Cómo paso dólares a córdobas?",
      respuesta: "Multiplicá los dólares por el tipo de cambio del día. Para pasar de córdobas a dólares, dividí entre el tipo de cambio.",
    },
    {
      pregunta: "¿Por qué el tipo de cambio no se mueve en 2026?",
      respuesta: "Porque el BCN fijó el deslizamiento del córdoba en cero para todo 2026. El valor oficial es el mismo cada día del año.",
    },
    {
      pregunta: "¿Por qué el banco me da otro precio?",
      respuesta: "Bancos y casas de cambio compran más barato y venden más caro que el oficial. La diferencia es su margen.",
    },
    {
      pregunta: "¿Qué es el deslizamiento?",
      respuesta: "Es cuánto se devalúa el córdoba frente al dólar en el año. El BCN lo anuncia antes de que empiece cada año.",
    },
  ],
  glosario: [
    { termino: "BCN", definicion: "Banco Central de Nicaragua." },
    { termino: "Deslizamiento", definicion: "La devaluación anual programada del córdoba frente al dólar." },
  ],
});
