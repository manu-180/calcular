import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.horas-extraordinarias",
  h1: "Calcular horas extraordinárias",
  title: "Horas extraordinárias em Angola: cálculo pela LGT",
  description: "As primeiras {{ao.he-limite-1}} extra do mês pagam mais {{ao.he-adicional-1}} e as seguintes mais {{ao.he-adicional-2}}. Calcule o valor com a fórmula do salário-hora da LGT.",
  intro: [
    "O trabalho fora do horário normal é trabalho extraordinário e paga-se com um adicional sobre o valor da hora normal.",
    "Indique o salário base, o horário semanal e as horas extra do mês. A calculadora aplica a fórmula do salário-hora e os dois adicionais da Lei Geral do Trabalho.",
  ],
  comoSeCalcula: [
    "Valor da hora normal = salário base × 12 / (52 × horas semanais).",
    "Até {{ao.he-limite-1}} por mês, cada hora extra paga a hora normal mais {{ao.he-adicional-1}}.",
    "Acima desse limite, cada hora paga a hora normal mais {{ao.he-adicional-2}}.",
    "Fracções: menos de 15 minutos não contam, de 15 a 44 minutos contam meia hora e de 45 minutos em diante contam uma hora.",
  ],
  ejemplo: ["Com 350 000 Kz de salário base e 44 horas por semana, a hora normal vale 1 835,66 Kz. Dez horas extra no mês pagam 27 534,97 Kz."],
  faq: [
    {
      pregunta: "Quantas horas extra se podem fazer?",
      respuesta: "No máximo 2 horas por dia normal de trabalho, {{ao.he-limite-mes}} por mês e {{ao.he-limite-ano}} por ano. A lei prevê casos sem estes limites e outros em que podem ser ultrapassados com o acordo do trabalhador e autorização da Inspecção Geral do Trabalho.",
    },
    {
      pregunta: "As horas extra nocturnas pagam mais?",
      respuesta: "Sim. Os adicionais de trabalho extraordinário somam-se a outros adicionais, como o do trabalho nocturno.",
    },
    {
      pregunta: "O meio dia de descanso complementar conta como hora extra?",
      respuesta: "Para pagar o trabalho extraordinário, o dia ou meio dia de descanso complementar conta como dia normal de trabalho. O dia de descanso semanal tem regras próprias.",
    },
  ],
  glosario: [
    { termino: "Trabalho extraordinário", definicion: "O que é prestado fora do horário normal de trabalho." },
    { termino: "Salário-hora", definicion: "O valor de uma hora normal, calculado com a fórmula do artigo 237.º da Lei Geral do Trabalho." },
  ],
});
