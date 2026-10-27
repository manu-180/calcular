import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.trabalho-nocturno",
  h1: "Calcular o subsídio de trabalho nocturno",
  title: "Trabalho nocturno em Moçambique: acréscimo de {{mz.trabalho-nocturno}}",
  description: "Quanto recebe a mais por trabalhar de noite: a Lei do Trabalho manda pagar mais {{mz.trabalho-nocturno}} sobre a hora normal de dia.",
  intro: [
    "Trabalho nocturno é o que se presta entre as 20 horas e a hora de início do período normal de trabalho do dia seguinte.",
    "A lei manda pagá-lo com um acréscimo de {{mz.trabalho-nocturno}} sobre o mesmo trabalho feito de dia.",
  ],
  comoSeCalcula: [
    "Valor da hora normal = salário mensal × 12 ÷ (52 × horas semanais).",
    "Acréscimo por hora nocturna = {{mz.trabalho-nocturno}} do valor da hora.",
    "Acréscimo do mês = horas nocturnas × acréscimo por hora.",
  ],
  ejemplo: ["Com 30 000 MT e 48 horas semanais, a hora vale 144,23 MT e a hora nocturna 180,29 MT. Quarenta horas nocturnas no mês dão 1 442,31 MT a mais."],
  faq: [
    {
      pregunta: "A partir de que hora é trabalho nocturno?",
      respuesta: "A partir das 20 horas. Um instrumento colectivo pode considerar nocturnas sete das nove horas entre as 20 horas e as 5 da manhã.",
    },
    {
      pregunta: "Horas extraordinárias à noite somam os dois acréscimos?",
      respuesta: "As horas extraordinárias depois das 20 horas já têm um acréscimo próprio de {{mz.extra-noite}}. Veja a calculadora de horas extraordinárias.",
    },
    {
      pregunta: "O trabalho por turnos conta como nocturno?",
      respuesta: "O regime de turnos tem regras próprias, mas o mesmo regime de remunerações aplica-se com as adaptações necessárias.",
    },
  ],
  glosario: [{ termino: "Trabalho nocturno", definicion: "O prestado entre as 20 horas de um dia e o início do período normal de trabalho do dia seguinte." }],
});
