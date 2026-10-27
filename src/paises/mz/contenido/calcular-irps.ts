import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.calcular-irps",
  h1: "Calcular o IRPS sobre o salário",
  title: "Calcular o IRPS do salário em Moçambique (2026)",
  description: "Quanto IRPS a entidade empregadora retém por mês, com a tabela do artigo 65-A em vigor desde 2026 e o número de dependentes.",
  intro: [
    "Todos os meses a entidade empregadora retém IRPS sobre o salário e entrega-o ao Estado. O valor sai de uma tabela publicada no Código do IRPS.",
    "A tabela actual entrou em vigor em {{mz.irps-retencao-0#desde}}, com a Lei n.º 11/2025. Indique a remuneração bruta do mês e os dependentes a cargo.",
  ],
  comoSeCalcula: [
    "Procura-se o intervalo da tabela em que cai a remuneração bruta do mês.",
    "Na coluna do número de dependentes lê-se o valor fixo desse intervalo. O sinal (-) quer dizer que não há imposto.",
    "Soma-se o coeficiente do intervalo aplicado à diferença entre a remuneração e o limite inferior do intervalo.",
    "IRPS = valor fixo + coeficiente × (remuneração − limite inferior).",
  ],
  ejemplo: [
    "Com 100 000 MT e três dependentes, o intervalo começa em 60 750 MT. O valor fixo é 7 275 MT e o coeficiente é 25 %. O IRPS é 7 275 + 25 % × 39 250 = 17 087,50 MT.",
  ],
  faq: [
    {
      pregunta: "Quais são os coeficientes da tabela?",
      respuesta: "Vão de {{mz.irps-retencao-0[1].tasa}} nos primeiros intervalos até {{mz.irps-retencao-0[-1].tasa}} a partir de {{mz.irps-retencao-0[-1].desde}} por mês.",
    },
    {
      pregunta: "Os dependentes contam muito?",
      respuesta: "Cada dependente baixa o valor fixo do intervalo em algumas dezenas de meticais e atrasa o início da retenção. Nos salários altos a diferença é pequena.",
    },
    {
      pregunta: "A retenção é o imposto final?",
      respuesta: "Para quem só tem rendimentos do trabalho dependente, a retenção mensal funciona como o imposto do ano. Quem tem outros rendimentos pode ter de os declarar e acertar contas com a Autoridade Tributária.",
    },
  ],
  glosario: [
    { termino: "Retenção na fonte", definicion: "Desconto do imposto feito por quem paga o rendimento, que depois o entrega ao Estado." },
    { termino: "Coeficiente", definicion: "Percentagem aplicada à parte da remuneração acima do limite inferior do intervalo." },
  ],
});
