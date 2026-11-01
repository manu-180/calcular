import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.horas-extraordinarias",
  h1: "Calcular as horas extraordinárias",
  title: "Horas extraordinárias em Moçambique: quanto se paga",
  description: "Calcule as horas extraordinárias com os acréscimos da Lei do Trabalho: mais {{mz.extra-diurno}} até às 20 horas e mais {{mz.extra-noite}} depois.",
  intro: [
    "O trabalho extraordinário é o que se faz fora do horário normal. A Lei do Trabalho manda pagá-lo com um acréscimo sobre o valor da hora normal.",
    "Indique o salário, as horas semanais do seu horário e as horas extraordinárias feitas antes e depois das 20 horas.",
  ],
  comoSeCalcula: [
    "Valor da hora normal = salário mensal × 12 ÷ (52 × horas semanais).",
    "Horas até às 20 horas: valor da hora mais {{mz.extra-diurno}}.",
    "Horas depois das 20 horas, até ao início do trabalho do dia seguinte: valor da hora mais {{mz.extra-noite}}.",
  ],
  ejemplo: ["Com 30 000 MT e 48 horas por semana, a hora vale 144,23 MT. Oito horas extraordinárias até às 20 horas dão 1 730,77 MT; duas horas depois das 20 horas dão 576,92 MT."],
  faq: [
    {
      pregunta: "Quantas horas extraordinárias posso fazer?",
      respuesta: "No máximo {{mz.extra-max-semana}} por semana, {{mz.extra-max-trimestre}} por trimestre e {{mz.extra-max-ano}} por ano.",
    },
    {
      pregunta: "Quando é permitido trabalho extraordinário?",
      respuesta: "Quando a empresa tem um aumento de trabalho que não justifica contratar alguém, ou por motivos ponderosos. O empregador tem de registar as horas.",
    },
    {
      pregunta: "Quem tem isenção de horário recebe horas extraordinárias?",
      respuesta: "Não. A lei não considera extraordinário o trabalho de quem está isento de horário, nem o que serve para compensar ausências pedidas pelo trabalhador.",
    },
    {
      pregunta: "E o trabalho num feriado?",
      respuesta: "É trabalho excepcional, pago com mais 100 % e com direito a descanso compensatório. Use a calculadora de trabalho em feriado.",
    },
  ],
  glosario: [
    { termino: "Período normal de trabalho", definicion: "As horas que o trabalhador se obriga a prestar: no máximo {{mz.periodo-normal-semanal}} por semana e 8 por dia." },
    { termino: "Trabalho extraordinário", definicion: "O que é prestado fora do horário normal de trabalho." },
  ],
});
