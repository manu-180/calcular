import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.trabalho-noturno",
  h1: "Calcular o subsídio de trabalho noturno",
  title: "Trabalho noturno: calcule o acréscimo à hora normal",
  description: "Calcule o acréscimo do trabalho noturno sobre o valor da hora normal, com as regras do Código do Trabalho e as exceções em que não se aplica.",
  intro: [
    "O trabalho feito de noite paga-se com um acréscimo sobre o valor do mesmo trabalho feito de dia.",
    "Indique a retribuição, o horário semanal e as horas noturnas do mês para ver quanto acresce ao salário.",
  ],
  comoSeCalcula: [
    "Valor da hora normal = retribuição mensal × 12 / (52 × horas semanais).",
    "Cada hora noturna tem um acréscimo de {{pt.ct-trabalho-noturno}} sobre esse valor.",
    "A convenção coletiva pode trocar o acréscimo por uma redução do horário ou por um aumento fixo da retribuição base.",
  ],
  ejemplo: ["Com 1 200 euros e 40 horas semanais, a hora vale 6,92 euros. Quarenta horas noturnas no mês somam 69,23 euros."],
  faq: [
    {
      pregunta: "Que horas contam como trabalho noturno?",
      respuesta: "As do período fixado na convenção coletiva, que tem de durar entre 7 e 11 horas e incluir o intervalo entre as 0 e as 5 horas. Sem essa regra, é das 22 horas às 7 horas do dia seguinte.",
    },
    {
      pregunta: "Quando não há acréscimo por trabalho noturno?",
      respuesta: "Salvo convenção coletiva, em atividades feitas sobretudo de noite, como espetáculos, em serviços que têm de estar abertos ao público à noite, como restaurantes, hotéis ou farmácias, e quando o salário já foi fixado a contar com o trabalho noturno.",
    },
    {
      pregunta: "Quem é trabalhador noturno?",
      respuesta: "Quem faz pelo menos três horas de trabalho normal noturno por dia, ou a parte equivalente do tempo de trabalho anual, salvo outra regra da convenção coletiva.",
    },
  ],
  glosario: [
    { termino: "Acréscimo", definicion: "O valor que se soma ao pagamento normal da hora." },
    { termino: "Convenção coletiva", definicion: "Acordo entre sindicatos e empregadores que fixa regras de trabalho de um setor ou empresa." },
  ],
});
