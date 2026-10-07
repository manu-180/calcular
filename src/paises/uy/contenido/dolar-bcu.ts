import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.dolar-bcu",
  h1: "Dólar BCU hoy y conversor de dólares a pesos",
  title: "Dólar BCU hoy: convertí dólares a pesos uruguayos",
  description: "Cotización del dólar billete que publica el Banco Central del Uruguay y conversor de dólares a pesos y de pesos a dólares.",
  intro: [
    "El Banco Central del Uruguay publica cada día hábil la cotización del dólar billete. Es la cotización oficial de referencia.",
    "Escribí un monto y te lo pasamos de dólares a pesos, o al revés, con la última cotización publicada.",
  ],
  comoSeCalcula: [
    "Usamos la cotización del dólar billete del último día hábil que publicó el BCU, con sus tres decimales.",
    "Para pasar a pesos se multiplica por la cotización. Para pasar a dólares, se divide.",
    "Los fines de semana y feriados vale la cotización del último día hábil.",
  ],
  faq: [
    {
      pregunta: "¿Por qué el banco me cobra otro precio?",
      respuesta: "Porque bancos y casas de cambio compran y venden con su propio margen. El dólar BCU es la cotización oficial de referencia.",
    },
    {
      pregunta: "¿Por qué hoy no aparece la cotización de hoy?",
      respuesta: "Porque usamos solo días ya cerrados. La cotización del día se suma cuando termina la jornada.",
    },
    {
      pregunta: "¿Qué dólar uso para un contrato?",
      respuesta: "El que diga el contrato. Si no dice nada, la referencia más usada es la del BCU.",
    },
  ],
  glosario: [
    { termino: "BCU", definicion: "Banco Central del Uruguay. Publica las cotizaciones oficiales." },
    { termino: "Dólar billete", definicion: "Cotización para el efectivo en dólares estadounidenses." },
  ],
});
