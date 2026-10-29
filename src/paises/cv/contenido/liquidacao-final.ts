import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.liquidacao-final",
  h1: "Liquidação final {{anio}} em Cabo Verde: o que receber ao sair",
  title: "Liquidação final {{anio}}: salário, férias e indemnização",
  description: "Some o que a empresa deve ao fim do contrato: salário em falta, férias vencidas e proporcionais ({{cv.ferias-dias}} por ano) e indemnização.",
  intro: [
    "Ao fim do contrato, a empresa deve o salário em falta, as férias vencidas e não gozadas e as férias proporcionais ao tempo trabalhado no ano. Com 60 000$00 por mês, seis meses no ano e cinco dias de férias vencidas, a liquidação passa de 63 000$00 sem indemnização.",
    "Indique a retribuição, os dias de salário por receber, os meses do ano e as férias. Se houve despedimento, escreva também a indemnização e o aviso prévio em falta.",
  ],
  comoSeCalcula: [
    "O Código Laboral manda pagar, qualquer que seja a forma de cessação, a retribuição das férias já vencidas e não gozadas. Manda pagar ainda um período de férias proporcional ao tempo de serviço do ano da cessação.",
    "As férias proporcionais são {{cv.ferias-dias}} úteis vezes os meses trabalhados no ano, a dividir por 12, menos os dias já gozados. Cada dia útil de férias vale a retribuição mensal a dividir por {{cv.ferias-dias}}.",
    "O salário em falta usa o valor de um dia, que é a retribuição mensal a dividir pelos dias do mês. A lei não fixa o divisor, e a calculadora usa 30 por omissão.",
    "O aviso prévio em falta e a indemnização somam-se ao total quando existirem. O resultado é bruto, antes do INPS e do IRPS.",
  ],
  ejemplo: [
    "Uma pessoa com 60 000$00 por mês sai a meio do ano com 10 dias de salário por receber e 5 dias úteis de férias vencidas. Os 10 dias valem 20 000$00. As férias proporcionais são {{cv.ferias-dias}} × 6 / 12, ou 11 dias, que valem 30 000$00. Os 5 dias vencidos valem 13 636,36$00. A liquidação é 63 636,36$00.",
  ],
  faq: [
    {
      pregunta: "Que férias se pagam quando o contrato termina?",
      respuesta: "As férias já vencidas e não gozadas e um período proporcional ao tempo de serviço do ano da cessação, nos termos do artigo 62.º do Código Laboral.",
    },
    {
      pregunta: "Os dias de férias não gozados contam para a antiguidade?",
      respuesta: "Sim. O n.º 3 do artigo 62.º diz que os períodos de férias vencidos e não gozados se contam sempre para efeitos de antiguidade.",
    },
    {
      pregunta: "A indemnização está incluída?",
      respuesta: "Só se a escrever no campo próprio. A indemnização do despedimento coletivo e da justa causa objetiva tem uma calculadora própria, com vinte dias de retribuição por ano de serviço.",
    },
  ],
  glosario: [
    { termino: "Liquidação final", definicion: "O conjunto dos valores que o trabalhador recebe quando o contrato termina." },
    { termino: "Férias vencidas", definicion: "Férias a que o trabalhador já tem direito e ainda não gozou." },
    { termino: "Férias proporcionais", definicion: "Os dias de férias do ano da saída, calculados pelos meses trabalhados." },
  ],
});
