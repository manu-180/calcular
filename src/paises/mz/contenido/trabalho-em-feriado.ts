import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.trabalho-em-feriado",
  h1: "Trabalho em feriado ou dia de descanso",
  title: "Trabalhar num feriado em Moçambique: pagamento e folga",
  description: "Quanto recebe por trabalhar num feriado ou no dia de descanso: mais {{mz.trabalho-excepcional}} sobre a hora normal e descanso compensatório.",
  intro: [
    "O trabalho num dia de descanso semanal, num feriado ou numa tolerância de ponto chama-se trabalho excepcional.",
    "A lei manda pagá-lo com mais {{mz.trabalho-excepcional}} e dá direito a um descanso compensatório.",
  ],
  comoSeCalcula: [
    "Valor da hora normal = salário mensal × 12 ÷ (52 × horas semanais).",
    "Pagamento = horas trabalhadas × valor da hora × 2 (a hora mais {{mz.trabalho-excepcional}}).",
    "Até {{mz.excepcional-meio-dia}} de trabalho: meio dia de descanso. Mais do que isso: um dia completo, num dos três dias seguintes.",
  ],
  ejemplo: ["Com 30 000 MT e 48 horas semanais, oito horas num feriado dão 2 307,69 MT e um dia de descanso."],
  faq: [
    {
      pregunta: "Quais são os feriados nacionais?",
      respuesta: "1 de Janeiro, 3 de Fevereiro, 7 de Abril, 1 de Maio, 25 de Junho, 7 de Setembro, 25 de Setembro, 4 de Outubro e 25 de Dezembro.",
    },
    {
      pregunta: "E se o feriado calhar a um domingo?",
      respuesta: "A suspensão do trabalho passa para o dia seguinte, salvo nas actividades que não podem parar.",
    },
    {
      pregunta: "Que actividades trabalham nos feriados?",
      respuesta: "As que não podem ser interrompidas, como hospitais, água e energia, transportes, segurança privada, hotelaria e restauração.",
    },
  ],
  glosario: [
    { termino: "Trabalho excepcional", definicion: "O realizado em dia de descanso semanal, complementar, feriado ou tolerância de ponto." },
    { termino: "Tolerância de ponto", definicion: "Dispensa de trabalho sem perda de remuneração concedida pelo Ministro do Trabalho." },
  ],
});
