import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.dias-de-ferias",
  h1: "Dias de férias no primeiro ano de contrato",
  title: "Dias de férias no ano de admissão: calculadora",
  description: "Saiba quantos dias de férias tem no ano em que começou a trabalhar, a partir de quando os pode gozar e quanto vale o subsídio de férias.",
  intro: [
    "Num ano normal o período de férias é de {{pt.ct-ferias-dias}} úteis. No ano em que o contrato começa, os dias dependem dos meses de contrato.",
    "Indique a data de início do contrato e a retribuição base para ver os dias, a data a partir da qual pode gozar as férias e o subsídio correspondente.",
  ],
  comoSeCalcula: [
    "No ano de admissão conta-se {{pt.ct-ferias-admissao[por-mes]}} úteis por cada mês completo de contrato, até {{pt.ct-ferias-admissao[maximo]}}.",
    "Estas férias podem ser gozadas depois de seis meses completos de contrato. Se o ano acabar antes, gozam-se até 30 de junho do ano seguinte.",
    "O subsídio de férias desse ano é proporcional: retribuição × dias / {{pt.ct-ferias-dias}}.",
  ],
  ejemplo: ["Quem começou a 1 de março tem 10 meses completos até ao fim do ano: 20 dias úteis de férias, que pode gozar a partir de 1 de setembro."],
  faq: [
    {
      pregunta: "Quantos dias de férias tenho por ano?",
      respuesta: "No mínimo {{pt.ct-ferias-dias}} úteis. São úteis os dias de segunda a sexta-feira, exceto feriados.",
    },
    {
      pregunta: "Posso juntar as férias do primeiro ano com as do segundo?",
      respuesta: "Sim, mas no mesmo ano civil não pode gozar mais de 30 dias úteis de férias, salvo o que preveja a convenção coletiva.",
    },
    {
      pregunta: "E se o contrato durar menos de seis meses?",
      respuesta: "Tem direito a dois dias úteis por cada mês completo de contrato, gozados imediatamente antes de o contrato terminar, salvo acordo.",
    },
    {
      pregunta: "Posso abdicar de dias de férias?",
      respuesta: "Pode renunciar aos dias que passem de 20 dias úteis, sem perder a retribuição nem o subsídio desses dias.",
    },
  ],
  glosario: [
    { termino: "Ano de admissão", definicion: "O ano civil em que o contrato de trabalho começou." },
    { termino: "Mês completo de contrato", definicion: "Um mês de calendário inteiro desde a data de início: de 15 de setembro a 14 de outubro, por exemplo." },
  ],
});
