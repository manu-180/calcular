import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.horas-extraordinarias",
  h1: "Calcular horas extraordinárias",
  title: "Horas extra 2026: quanto vale o trabalho suplementar",
  description: "Calcule o pagamento das horas extraordinárias em dias úteis, de descanso e feriados, com os acréscimos do Código do Trabalho e o limite das 100 horas.",
  intro: [
    "O trabalho suplementar, as horas extra, paga-se pelo valor da hora normal com um acréscimo que depende do dia e de quantas horas já fez no ano.",
    "Indique a retribuição, o horário semanal e as horas feitas para ver o valor a receber.",
  ],
  comoSeCalcula: [
    "Valor da hora normal = retribuição mensal × 12 / (52 × horas semanais).",
    "Até {{pt.ct-limite-horas-suplementares}} anuais: em dia útil, a primeira hora de cada dia tem um acréscimo de {{pt.ct-trabalho-suplementar[util-primeira]}} e as seguintes de {{pt.ct-trabalho-suplementar[util-seguintes]}}. Em dia de descanso ou feriado, {{pt.ct-trabalho-suplementar[descanso]}} por hora.",
    "Acima das {{pt.ct-limite-horas-suplementares}} anuais: {{pt.ct-trabalho-suplementar[util-primeira-100]}} e {{pt.ct-trabalho-suplementar[util-seguintes-100]}} em dia útil, e {{pt.ct-trabalho-suplementar[descanso-100]}} em dia de descanso ou feriado.",
  ],
  ejemplo: ["Com 1 500 euros e 40 horas semanais, a hora vale 8,65 euros. Dez horas extra em cinco dias úteis rendem 113,58 euros."],
  faq: [
    {
      pregunta: "Quanto se paga por uma hora extra num feriado?",
      respuesta: "O valor da hora com um acréscimo de {{pt.ct-trabalho-suplementar[descanso]}}. Acima das {{pt.ct-limite-horas-suplementares}} anuais, o acréscimo passa a {{pt.ct-trabalho-suplementar[descanso-100]}}.",
    },
    {
      pregunta: "As horas extra têm de ser pagas mesmo sem ordem escrita?",
      respuesta: "É exigível o pagamento do trabalho suplementar determinado prévia e expressamente, ou feito de modo a não ser previsível a oposição do empregador.",
    },
    {
      pregunta: "Quanto IRS se retém nas horas extra?",
      respuesta: "Segundo o despacho das tabelas de 2026, o trabalho suplementar retém a 50 % da taxa efetiva aplicada ao salário desse mês.",
    },
  ],
  glosario: [
    { termino: "Trabalho suplementar", definicion: "O trabalho feito fora do horário de trabalho." },
    { termino: "Período normal de trabalho", definicion: "As horas que o trabalhador se obriga a trabalhar por dia e por semana." },
  ],
});
