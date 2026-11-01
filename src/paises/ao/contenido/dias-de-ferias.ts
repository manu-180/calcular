import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.dias-de-ferias",
  h1: "Quantos dias de férias tenho",
  title: "Dias de férias em Angola: {{ao.ferias-dias}} úteis por ano",
  description: "Pela Lei Geral do Trabalho são {{ao.ferias-dias}} úteis de férias por ano. Calcule os dias no ano de admissão e nos contratos a termo.",
  intro: [
    "Cada ano de trabalho dá direito a {{ao.ferias-dias}} úteis de férias. Não contam os dias de descanso semanal, de descanso complementar nem os feriados.",
    "No ano em que entrou, ou se o contrato esteve suspenso, os dias contam-se por mês completo. Escolha a situação e indique os meses.",
  ],
  comoSeCalcula: [
    "Ano completo: {{ao.ferias-dias}} úteis.",
    "Ano de admissão: {{ao.ferias-dias-por-mes}} úteis por mês completo de trabalho, com um mínimo de {{ao.ferias-minimo-admissao}}.",
    "Contrato a termo de um ano ou menos: {{ao.ferias-dias-por-mes}} úteis por mês completo, até {{ao.ferias-dias}}.",
  ],
  ejemplo: ["Quem entrou na empresa e tem 7 meses completos de trabalho no ano tem direito a 14 dias úteis de férias."],
  faq: [
    {
      pregunta: "Os feriados contam como dias de férias?",
      respuesta: "Não. Os {{ao.ferias-dias}} são dias úteis: os feriados e os dias de descanso semanal e complementar ficam de fora.",
    },
    {
      pregunta: "Que dias contam para os meses completos?",
      respuesta: "Os dias de trabalho efectivo, as faltas justificadas com direito a remuneração e os dias de licença de parentalidade.",
    },
    {
      pregunta: "As férias de um contrato a termo podem ser pagas em dinheiro?",
      respuesta: "Sim. Nos contratos a termo que não passam de um ano, as férias podem ser substituídas pela remuneração correspondente, paga no fim do contrato.",
    },
  ],
  glosario: [
    { termino: "Dias úteis", definicion: "Os dias de trabalho, sem os de descanso semanal, de descanso complementar e os feriados." },
    { termino: "Contrato a termo", definicion: "Contrato de trabalho por tempo determinado." },
  ],
});
