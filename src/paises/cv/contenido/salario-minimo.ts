import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.salario-minimo",
  h1: "Salário mínimo {{anio}} em Cabo Verde",
  title: "Salário mínimo {{anio}} em Cabo Verde: {{cv.salario-minimo}}",
  description: "O salário mínimo em vigor é {{cv.salario-minimo}} por mês. Compare o seu salário e veja o líquido e o custo para a empresa.",
  intro: [
    "O salário mínimo em vigor em Cabo Verde é de {{cv.salario-minimo}} por mês, valor que se aplica desde {{cv.salario-minimo#desde}} aos trabalhadores por conta de outrem. A lei chama-lhe retribuição mínima mensal garantida.",
    "Indique o seu salário mensal para ver a diferença para o mínimo. A calculadora mostra também o líquido depois do INPS e o custo do mínimo para a entidade empregadora.",
  ],
  comoSeCalcula: [
    "O valor do mínimo vem do artigo 4.º do Decreto-Lei n.º 6/2014, na redação dada pela lei do Orçamento do Estado para 2025: {{cv.salario-minimo}} para trabalhadores sujeitos ao período normal de trabalho.",
    "O líquido do mínimo desconta {{cv.inps-trabalhador}} de quotização do INPS. Com este valor a remuneração fica abaixo de {{cv.irps-limite-retencao}}, o limite a partir do qual há retenção de IRPS.",
    "O custo para a empresa soma ao mínimo os {{cv.inps-empregador}} de contribuição patronal. O valor da hora usa a fórmula do Código Laboral, o salário vezes 12 a dividir por {{cv.semanas-ano}} semanas e pelas horas semanais, com o máximo normal de {{cv.horas-semanais}}.",
  ],
  ejemplo: [
    "Quem recebe 20 000$00 ganha 3 000$00 acima do mínimo de 17 000$00, ou cerca de 117,6 % do mínimo. No mínimo, o INPS do trabalhador é 1 445$00 e o líquido fica em 15 555$00. A empresa gasta 19 720$00 por mês com esse trabalhador.",
  ],
  faq: [
    {
      pregunta: "Qual é o salário mínimo em Cabo Verde?",
      respuesta: "É {{cv.salario-minimo}} por mês para trabalhadores por conta de outrem a tempo inteiro, segundo o artigo 14.º da Lei n.º 45/X/2024, que alterou o artigo 4.º do Decreto-Lei n.º 6/2014.",
    },
    {
      pregunta: "O salário mínimo vai aumentar?",
      respuesta: "O artigo 9.º da Lei n.º 69/X/2025 diz que o Governo promove as medidas para chegar a 25 000$00 a partir de 2027. Enquanto não houver diploma novo, vale o valor atual.",
    },
    {
      pregunta: "O mínimo paga IRPS?",
      respuesta: "Não. A retenção só ocorre acima de {{cv.irps-limite-retencao}} de remuneração mensal, segundo o artigo 71.º, n.º 7, do Código do IRPS. O mínimo paga apenas {{cv.inps-trabalhador}} de INPS.",
    },
    {
      pregunta: "Há reduções do mínimo?",
      respuesta: "O artigo 4.º do Decreto-Lei n.º 6/2014 fixa o valor sem prejuízo das reduções relacionadas com o trabalhador, previstas no artigo 6.º do mesmo decreto-lei.",
    },
  ],
  glosario: [
    { termino: "Retribuição mínima mensal garantida", definicion: "O nome legal do salário mínimo dos trabalhadores por conta de outrem." },
    { termino: "Período normal de trabalho", definicion: "As horas de trabalho que o trabalhador cumpre por dia e por semana, dentro dos limites do Código Laboral." },
    { termino: "Contribuição patronal", definicion: "A parte do INPS que a entidade empregadora paga para além do salário." },
  ],
});
