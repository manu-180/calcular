import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.dias-de-ferias",
  h1: "Quantos dias de férias tenho em {{anio}} em Cabo Verde",
  title: "Dias de férias {{anio}}: {{cv.ferias-dias}} úteis por ano",
  description: "Saiba quantos dias de férias tem direito conforme o contrato e a data de admissão: {{cv.ferias-dias}} úteis por ano de serviço.",
  intro: [
    "Um trabalhador com contrato sem prazo tem {{cv.ferias-dias}} úteis de férias por cada ano de serviço. No ano da admissão, quem entra no primeiro semestre tem {{cv.ferias-primeiro-ano}}.",
    "Escolha o tipo de contrato e, se for o caso, a data de admissão ou a duração do contrato. A calculadora diz quantos dias vence, quando se vencem e até quando podem ser gozados.",
  ],
  comoSeCalcula: [
    "Nos contratos sem prazo, o período de férias vence-se a 1 de janeiro de cada ano e vale {{cv.ferias-dias}} úteis.",
    "Quem é admitido sem prazo no primeiro semestre tem {{cv.ferias-primeiro-ano}} úteis para gozar no ano da admissão. Se entra no segundo semestre, o primeiro período vence-se ao fim de {{cv.ferias-primeiro-vencimento}} de serviço efetivo.",
    "Nos contratos a prazo com um ano ou mais, o direito é o mesmo dos contratos sem prazo. Abaixo de um ano, os dias são proporcionais à duração: {{cv.ferias-dias}} vezes os meses do contrato, a dividir por 12.",
    "As férias devem ser gozadas no prazo de {{cv.ferias-prazo-gozo}} a contar do vencimento e podem acumular-se até {{cv.ferias-acumulacao}} úteis, por acordo ou se o gozo causar grave prejuízo à empresa ou ao trabalhador.",
  ],
  ejemplo: [
    "Uma pessoa contratada por seis meses tem {{cv.ferias-dias}} × 6 / 12, ou 11 dias úteis de férias. Quem foi admitido em março, sem prazo, tem 7 dias úteis nesse ano e passa a ter 22 dias a partir de 1 de janeiro seguinte.",
  ],
  faq: [
    {
      pregunta: "Quantos dias de férias tem um trabalhador em Cabo Verde?",
      respuesta: "Tem {{cv.ferias-dias}} úteis por cada ano de serviço, nos termos do artigo 52.º, n.º 1, do Código Laboral, para contratos sem prazo.",
    },
    {
      pregunta: "Quantos dias tem quem entra a meio do ano?",
      respuesta: "Se a admissão for sem prazo e no primeiro semestre, são {{cv.ferias-primeiro-ano}} úteis no ano da admissão, segundo o artigo 53.º, n.º 5. Depois de {{cv.ferias-primeiro-vencimento}} de serviço efetivo vence-se o primeiro período completo.",
    },
    {
      pregunta: "Até quando se podem gozar as férias?",
      respuesta: "No prazo de {{cv.ferias-prazo-gozo}} a contar do vencimento, de acordo com o artigo 56.º, n.º 1. Podem ser acumuladas até {{cv.ferias-acumulacao}} úteis nos casos previstos no n.º 3.",
    },
    {
      pregunta: "O que acontece às férias quando o contrato termina?",
      respuesta: "O trabalhador recebe a retribuição das férias vencidas e não gozadas e a de um período proporcional ao tempo de serviço do ano da cessação, nos termos do artigo 62.º.",
    },
  ],
  glosario: [
    { termino: "Dias úteis", definicion: "Os dias de trabalho da semana, sem domingos nem feriados." },
    { termino: "Vencimento das férias", definicion: "O momento em que nasce o direito a gozar o período de férias." },
    { termino: "Férias proporcionais", definicion: "Os dias de férias calculados em função do tempo trabalhado, nos contratos curtos e na cessação." },
  ],
});
