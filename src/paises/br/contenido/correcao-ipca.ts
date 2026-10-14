import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.correcao-ipca",
  h1: "Correção de valores pelo IPCA",
  title: "Correção pelo IPCA: atualize um valor pela inflação",
  description: "Corrija um valor pela inflação oficial do IPCA entre dois meses, com os números-índice do IBGE. Veja o valor atualizado e o IPCA acumulado.",
  intro: [
    "O IPCA é o índice oficial de inflação do Brasil, medido pelo IBGE. Ele mostra quanto os preços subiram de um mês para outro.",
    "Informe o valor e o período para saber quanto ele vale hoje, por exemplo para reajustar um aluguel, uma pensão ou comparar preços.",
  ],
  comoSeCalcula: [
    "O IBGE publica um número-índice do IPCA para cada mês, com base em dezembro de 1993 = 100.",
    "O fator de correção é o índice do mês final dividido pelo índice do mês anterior ao inicial. Assim a inflação do mês inicial também entra, como na Calculadora do Cidadão do Banco Central.",
    "O valor corrigido é o valor original vezes o fator. O IPCA acumulado é o fator menos 1, em porcentagem.",
  ],
  ejemplo: ["R$ 1.000 de janeiro de 2025 valem R$ 1.083,84 em setembro de 2026: o IPCA acumulado no período foi de 8,38 %."],
  faq: [
    {
      pregunta: "Quando sai o IPCA de cada mês?",
      respuesta: "O IBGE divulga o IPCA de um mês por volta do dia 10 do mês seguinte. Até lá, a correção vai até o último mês publicado.",
    },
    {
      pregunta: "Qual a diferença entre IPCA e INPC?",
      respuesta: "O IPCA mede a inflação das famílias com renda de 1 a 40 salários mínimos e é a meta do Banco Central. O INPC olha famílias de 1 a 5 salários mínimos e corrige o salário mínimo e benefícios.",
    },
    {
      pregunta: "Posso usar esta conta para reajustar o aluguel?",
      respuesta: "Pode, se o contrato prevê reajuste pelo IPCA. Muitos contratos usam o IGP-M ou o IVAR, e aí o resultado é outro.",
    },
  ],
  glosario: [
    { termino: "Número-índice", definicion: "Valor do índice em cada mês. A variação entre dois números-índice dá a inflação do período." },
    { termino: "IPCA", definicion: "Índice Nacional de Preços ao Consumidor Amplo, a inflação oficial do Brasil." },
  ],
});
