import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.revisao-prestacao-euribor",
  h1: "Revisão da prestação da casa com a Euribor",
  title: "Euribor e prestação da casa: simule a revisão",
  description: "Veja quanto fica a prestação do crédito à habitação com a última Euribor a 3, 6 ou 12 meses publicada pelo Banco de Portugal e o seu spread.",
  intro: [
    "No crédito à habitação com taxa variável, a prestação muda quando a Euribor é revista. A nova taxa é a Euribor mais o spread do contrato.",
    "Indique o capital em dívida, os anos que faltam, o indexante e o spread. Se não indicar a Euribor, o cálculo usa a última média mensal publicada.",
  ],
  comoSeCalcula: [
    "Taxa de juro = Euribor do indexante + spread.",
    "Prestação constante: capital × i / (1 − (1 + i) elevado a −n), com i = taxa anual / 12 e n = número de prestações em falta.",
    "Os valores da Euribor são médias mensais do BPstat do Banco de Portugal, com fonte no Banco Central Europeu, e atualizam-se todos os meses.",
  ],
  ejemplo: ["Por exemplo, com 150 000 euros em dívida a 25 anos, uma Euribor de 2,92 % e um spread de 1 %, a prestação fica em 785,28 euros."],
  faq: [
    {
      pregunta: "Que Euribor usa o meu banco?",
      respuesta: "A que o contrato indicar: o prazo (3, 6 ou 12 meses) e o período de referência para a revisão. Confirme no contrato ou na carta de revisão.",
    },
    {
      pregunta: "De quanto em quanto tempo muda a prestação?",
      respuesta: "Nas datas de revisão previstas no contrato. Use esta simulação para antecipar a próxima.",
    },
    {
      pregunta: "A taxa pode ficar negativa?",
      respuesta: "Se a Euribor mais o spread der um valor negativo, este simulador usa 0 %. O que se aplica ao seu crédito é o que o contrato disser.",
    },
  ],
  glosario: [
    { termino: "Euribor", definicion: "Taxa de juro de referência do mercado interbancário da zona euro." },
    { termino: "Spread", definicion: "A margem que o banco soma à Euribor, fixada no contrato." },
    { termino: "Indexante", definicion: "A taxa de referência a que o crédito está ligado." },
  ],
});
