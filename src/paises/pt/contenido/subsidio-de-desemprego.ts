import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.subsidio-de-desemprego",
  h1: "Simulador do subsídio de desemprego",
  title: "Subsídio de desemprego {{anio}}: simule o valor mensal",
  description: "Simule o valor do subsídio de desemprego com a remuneração de referência e os limites em vigor: mínimo, máximo de {{pt.desemprego-limites-ias[maximo]}} IAS e teto do líquido.",
  intro: [
    "O subsídio de desemprego substitui parte do salário de quem ficou desempregado involuntariamente. O valor depende das remunerações registadas no ano antes do desemprego.",
    "Indique o salário bruto mensal e se recebeu os subsídios de férias e de Natal. A simulação aplica as regras do Decreto-Lei n.º 220/2006 com o IAS de {{pt.ias}}.",
  ],
  comoSeCalcula: [
    "A remuneração de referência é o total das remunerações dos 12 meses que contam, a dividir por 360, vezes 30 dias.",
    "O subsídio é {{pt.desemprego-percentagens[montante]}} dessa remuneração, sem passar {{pt.desemprego-percentagens[liquido]}} do seu valor líquido (depois da Segurança Social e da retenção de IRS).",
    "Não pode ser inferior a {{pt.desemprego-limites-ias[minimo]}} IAS nem superior a {{pt.desemprego-limites-ias[maximo]}} IAS. Se as remunerações chegavam ao salário mínimo, sobe pelo menos até {{pt.desemprego-limites-ias[majoracao]}} IAS.",
    "Em caso algum passa o valor líquido da remuneração de referência.",
  ],
  ejemplo: ["Com 1 500 euros por mês e os dois subsídios, a referência é de 1 750 euros. O limite sobre o valor líquido fixa o subsídio em 1 020,98 euros por mês."],
  faq: [
    {
      pregunta: "Qual é o valor máximo do subsídio de desemprego em 2026?",
      respuesta: "{{pt.desemprego-limites-ias[maximo]}} vezes o IAS, que em 2026 é de {{pt.ias}}.",
    },
    {
      pregunta: "Os subsídios de férias e de Natal contam?",
      respuesta: "Sim. Na remuneração de referência só entram os subsídios de férias e de Natal devidos no período de referência.",
    },
    {
      pregunta: "Durante quanto tempo se recebe?",
      respuesta: "Depende da idade e do número de meses com descontos antes do desemprego. O Decreto-Lei n.º 166/2026 altera essas regras com efeitos a 31 de dezembro de 2026, por isso este simulador não calcula a duração.",
    },
  ],
  glosario: [
    { termino: "Remuneração de referência", definicion: "A média das remunerações registadas nos 12 meses que contam para o subsídio." },
    { termino: "IAS", definicion: "Indexante dos apoios sociais, o valor de referência das prestações sociais." },
  ],
});
