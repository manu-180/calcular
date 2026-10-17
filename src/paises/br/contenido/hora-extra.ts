import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.hora-extra",
  h1: "Cálculo de hora extra",
  title: "Cálculo de hora extra: 50 %, 100 % e valor da hora",
  description: "Calcule o valor da hora extra a partir do salário e da jornada, com adicional mínimo de {{br.hora-extra-adicional}} e 100 % em domingos e feriados.",
  intro: [
    "Hora extra é cada hora trabalhada além da jornada do contrato. Ela vale a hora normal com um adicional de pelo menos {{br.hora-extra-adicional}}.",
    "Informe o salário, a jornada semanal e as horas do mês. A calculadora mostra o valor de cada hora e o total.",
  ],
  comoSeCalcula: [
    "O valor da hora normal é o salário dividido pelo divisor do mês: a jornada semanal vezes 5. Com {{br.jornada-semanal}} semanais, o divisor é 220.",
    "A hora extra em dia útil vale a hora normal com o adicional de {{br.hora-extra-adicional}} ou o que a convenção coletiva garantir.",
    "Em domingos e feriados sem folga compensatória, o costume é pagar em dobro (100 %).",
    "O total é cada valor de hora vezes as horas trabalhadas.",
  ],
  ejemplo: ["Com salário de R$ 2.200 e 44 horas semanais, a hora normal vale R$ 10. A hora extra a 50 % vale R$ 15 e a 100 %, R$ 20. Dez horas a 50 % e cinco a 100 % somam R$ 250."],
  faq: [
    {
      pregunta: "Quantas horas extras posso fazer por dia?",
      respuesta: "Até 2 horas por dia, por acordo individual, convenção ou acordo coletivo. Em casos de força maior a lei permite mais.",
    },
    {
      pregunta: "Hora extra entra no 13º e nas férias?",
      respuesta: "Sim, quando é habitual. A média das horas extras entra no 13º, nas férias, no FGTS e no descanso semanal remunerado.",
    },
    {
      pregunta: "Hora extra paga imposto?",
      respuesta: "Sim. Ela se soma ao salário do mês para o INSS e para o imposto de renda.",
    },
  ],
  glosario: [
    { termino: "Divisor", definicion: "Número de horas que se usa para achar o valor da hora a partir do salário mensal." },
    { termino: "DSR", definicion: "Descanso semanal remunerado, o dia de folga pago da semana." },
  ],
});
