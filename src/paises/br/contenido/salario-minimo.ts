import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.salario-minimo",
  h1: "Salário mínimo {{anio}}",
  title: "Salário mínimo {{anio}}: {{br.salario-minimo}} por mês",
  description: "O salário mínimo nacional é {{br.salario-minimo}} desde {{br.salario-minimo#desde}}: {{br.salario-minimo-diario}} por dia e {{br.salario-minimo-hora}} por hora.",
  intro: [
    "O salário mínimo nacional de 2026 é {{br.salario-minimo}} por mês, fixado pelo Decreto nº 12.797/2025.",
    "Use a calculadora para ver o valor por dia e por hora, converter vários salários mínimos em reais ou saber a quantos mínimos o seu salário equivale.",
  ],
  comoSeCalcula: [
    "O decreto fixa três valores: {{br.salario-minimo}} por mês, {{br.salario-minimo-diario}} por dia e {{br.salario-minimo-hora}} por hora.",
    "O valor anual soma 13 salários: os 12 meses e o 13º.",
    "Para saber a quantos mínimos o seu salário equivale, divida pelo valor mensal.",
  ],
  ejemplo: ["Um salário de R$ 4.863 equivale a 3 salários mínimos. Dois mínimos e meio são R$ 4.052,50."],
  faq: [
    {
      pregunta: "Como o salário mínimo é reajustado?",
      respuesta: "Pela inflação do INPC em 12 meses até novembro mais um ganho real ligado ao crescimento do PIB, dentro dos limites do arcabouço fiscal. O novo valor sai por decreto no fim do ano.",
    },
    {
      pregunta: "Quem trabalha meio período pode ganhar menos que o mínimo?",
      respuesta: "Pode receber proporcional às horas trabalhadas, desde que o valor da hora não fique abaixo de {{br.salario-minimo-hora}}.",
    },
    {
      pregunta: "O que muda com o reajuste do mínimo?",
      respuesta: "Aposentadorias e benefícios de um salário mínimo, o piso do seguro-desemprego, o abono salarial, a contribuição do MEI e o adicional de insalubridade.",
    },
  ],
  glosario: [
    { termino: "Piso regional", definicion: "Salário mínimo próprio de alguns estados, maior que o nacional, para categorias definidas em lei estadual." },
  ],
});
