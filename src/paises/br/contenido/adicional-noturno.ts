import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.adicional-noturno",
  h1: "Cálculo do adicional noturno",
  title: "Adicional noturno: calcule com a hora reduzida",
  description: "Calcule o adicional noturno de {{br.adicional-noturno}} sobre as horas entre 22h e 5h, com a hora noturna reduzida de 52 minutos e 30 segundos.",
  intro: [
    "Quem trabalha entre 22h e 5h na cidade recebe um adicional de pelo menos {{br.adicional-noturno}} sobre a hora normal.",
    "Além disso, a hora noturna é mais curta: dura 52 minutos e 30 segundos. Por isso 7 horas de relógio valem 8 horas noturnas.",
  ],
  comoSeCalcula: [
    "Converta as horas de relógio em horas noturnas: multiplique por 60 e divida por 52,5.",
    "Ache o valor da hora normal: salário dividido pela jornada semanal vezes 5 (220 para {{br.jornada-semanal}} semanais).",
    "O adicional por hora é {{br.adicional-noturno}} da hora normal, ou o percentual maior da sua convenção coletiva.",
    "O adicional do mês é o adicional por hora vezes as horas noturnas.",
  ],
  ejemplo: ["Com salário de R$ 2.200 e 70 horas de relógio à noite, são 80 horas noturnas. A hora vale R$ 10 e o adicional, R$ 2. No mês, R$ 160."],
  faq: [
    {
      pregunta: "Qual é o horário noturno?",
      respuesta: "Para o trabalho urbano, das 22h de um dia às 5h do dia seguinte.",
    },
    {
      pregunta: "Se eu continuar trabalhando depois das 5h, ganho adicional?",
      respuesta: "Pela jurisprudência do TST, sim: quando a jornada inteira é noturna e se prorroga de manhã, as horas seguintes também têm o adicional.",
    },
    {
      pregunta: "O adicional noturno entra no 13º e nas férias?",
      respuesta: "Sim. Quando é habitual, ele integra o salário para 13º, férias, FGTS e INSS.",
    },
  ],
  glosario: [
    { termino: "Hora noturna reduzida", definicion: "Hora de 52 minutos e 30 segundos usada para contar o trabalho noturno urbano." },
    { termino: "Hora de relógio", definicion: "A hora comum, de 60 minutos." },
  ],
});
