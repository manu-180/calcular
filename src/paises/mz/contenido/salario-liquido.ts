import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.salario-liquido",
  h1: "Calcular o salário líquido em Moçambique",
  title: "Salário líquido em Moçambique: INSS e IRPS 2026",
  description: "Do salário bruto ao líquido com os {{mz.inss-trabalhador}} do INSS e a tabela de retenção do IRPS em vigor desde 2026, conforme os dependentes.",
  intro: [
    "O salário líquido é o que recebe depois de a entidade empregadora descontar a segurança social e reter o IRPS.",
    "Indique o salário bruto, o que recebeu a mais no mês e quantos dependentes tem a cargo. A calculadora aplica a tabela do artigo 65-A do Código do IRPS, em vigor desde {{mz.irps-retencao-0#desde}}.",
  ],
  comoSeCalcula: [
    "Soma-se o salário base com os subsídios, prémios e horas extraordinárias do mês. Isso é a remuneração bruta.",
    "O INSS do trabalhador é {{mz.inss-trabalhador}} da remuneração bruta.",
    "O IRPS sai da tabela de retenção: o valor fixo do intervalo do salário mais o coeficiente sobre a diferença entre o salário e o limite inferior desse intervalo. Cada dependente baixa um pouco o imposto.",
    "Líquido = remuneração bruta − INSS − IRPS.",
  ],
  ejemplo: [
    "Com 50 000 MT por mês e sem dependentes, o INSS é 1 500 MT. O salário cai no intervalo que começa em 32 750 MT: 1 775 MT mais 20 % de 17 250 MT dão 5 225 MT de IRPS. O líquido é 43 275 MT.",
  ],
  faq: [
    {
      pregunta: "Até que salário não se paga IRPS?",
      respuesta: "Até {{mz.irps-retencao-0[0].hasta}} por mês não há retenção. Com dependentes o limite sobe um pouco: com quatro ou mais, a retenção só começa a partir de {{mz.irps-retencao-4[5].desde}}.",
    },
    {
      pregunta: "Quanto se desconta para o INSS?",
      respuesta: "O trabalhador por conta de outrem desconta {{mz.inss-trabalhador}} da remuneração. A entidade empregadora paga mais {{mz.inss-empregador}} por cima, que não sai do salário.",
    },
    {
      pregunta: "O que conta como remuneração para o IRPS?",
      respuesta: "A remuneração fixa mais tudo o que tenha natureza de rendimento do trabalho dependente pago no mês, mesmo que diga respeito a meses anteriores. Por isso as horas extraordinárias e os prémios entram no mês em que são pagos.",
    },
    {
      pregunta: "Há décimo terceiro salário obrigatório?",
      respuesta: "A Lei do Trabalho não obriga a pagar um décimo terceiro salário. Se a empresa o pagar, entra na remuneração do mês em que é pago.",
    },
  ],
  glosario: [
    { termino: "IRPS", definicion: "Imposto sobre o Rendimento das Pessoas Singulares, retido todos os meses pela entidade empregadora." },
    { termino: "INSS", definicion: "Instituto Nacional de Segurança Social, que gere a segurança social obrigatória." },
    { termino: "Dependentes", definicion: "Pessoas a cargo do trabalhador que contam para a coluna da tabela de retenção." },
  ],
});
