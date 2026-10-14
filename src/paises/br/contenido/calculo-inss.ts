import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.calculo-inss",
  h1: "Cálculo do INSS 2026",
  title: "Cálculo do INSS 2026: desconto por faixa",
  description: "Veja quanto o INSS desconta do seu salário em 2026, faixa por faixa, com a tabela progressiva oficial e o teto de {{br.teto-inss}}.",
  intro: [
    "Quem trabalha com carteira assinada contribui ao INSS todo mês. A empresa desconta o valor do salário e recolhe para a Previdência.",
    "Desde 2020 a contribuição é progressiva: cada faixa do salário paga uma alíquota diferente. Informe o salário e veja o desconto de cada faixa.",
  ],
  comoSeCalcula: [
    "A parte do salário até a primeira faixa paga 7,5 %. A parte que cai na segunda faixa paga 9 %, a da terceira 12 % e a da quarta 14 %.",
    "O que passa do teto de {{br.teto-inss}} não paga nada.",
    "O desconto é a soma das faixas. A alíquota efetiva é esse total dividido pelo salário.",
  ],
  ejemplo: [
    "Com salário de R$ 3.000, a primeira faixa paga R$ 121,58, a segunda R$ 115,37 e a terceira R$ 11,66. O desconto total é R$ 248,60, uma alíquota efetiva de 8,29 %.",
  ],
  faq: [
    {
      pregunta: "Qual é o desconto máximo do INSS em 2026?",
      respuesta: "É o desconto de quem ganha o teto de {{br.teto-inss}} ou mais: R$ 988,09 por mês.",
    },
    {
      pregunta: "O 13º salário paga INSS junto com o salário de dezembro?",
      respuesta: "Não. O INSS do 13º é calculado à parte, com a mesma tabela, sem somar ao salário do mês.",
    },
    {
      pregunta: "E se eu tiver dois empregos com carteira?",
      respuesta: "Os salários se somam para achar a alíquota, e o total respeita o teto. Avise as empresas para que não descontem acima do limite.",
    },
    {
      pregunta: "Autônomo e MEI usam esta tabela?",
      respuesta: "Não. Contribuinte individual, facultativo e MEI têm alíquotas próprias. Use a calculadora de INSS de autônomo.",
    },
  ],
  glosario: [
    { termino: "Salário de contribuição", definicion: "Valor sobre o qual se calcula o INSS: o salário e os adicionais do mês, até o teto." },
    { termino: "Teto do INSS", definicion: "Maior salário de contribuição. Acima dele não há desconto, e ele também limita as aposentadorias." },
  ],
});
