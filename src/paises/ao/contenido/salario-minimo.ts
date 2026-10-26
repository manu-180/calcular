import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.salario-minimo",
  h1: "Salário mínimo nacional em Angola",
  title: "Salário mínimo em Angola 2026: {{ao.salario-minimo}}",
  description: "O salário mínimo nacional é {{ao.salario-minimo}} por mês desde {{ao.salario-minimo#desde}}. Nas micro-empresas e startups é {{ao.salario-minimo-micro}}. Veja o valor por hora.",
  intro: [
    "O salário mínimo nacional é a soma mínima que um trabalhador deve receber por um mês de trabalho. Desde {{ao.salario-minimo#desde}} é {{ao.salario-minimo}}.",
    "As micro-empresas e as empresas iniciantes (startups) têm um mínimo próprio de {{ao.salario-minimo-micro}}. Escolha o tipo de empresa para ver o valor por mês, por hora e depois do INSS.",
  ],
  comoSeCalcula: [
    "O valor mensal é o fixado pelo Decreto Presidencial n.º 152/24.",
    "O valor por hora usa a fórmula da Lei Geral do Trabalho: salário mensal × 12 / (52 semanas × {{ao.horas-semanais}} horas por semana).",
    "O trabalhador desconta {{ao.inss-trabalhador}} para o INSS. Com este salário não há IRT, porque fica abaixo do limite isento.",
  ],
  ejemplo: ["Com {{ao.salario-minimo}} por mês e {{ao.horas-semanais}} por semana, a hora vale 524,48 Kz. Depois do INSS ficam 97 000 Kz."],
  faq: [
    {
      pregunta: "Quando passou o salário mínimo para {{ao.salario-minimo}}?",
      respuesta: "Em {{ao.salario-minimo#desde}}, doze meses depois da entrada em vigor do Decreto Presidencial n.º 152/24. Antes disso era 70 000 Kz.",
    },
    {
      pregunta: "Uma empresa pode pagar menos do que o mínimo?",
      respuesta: "Só com autorização do ministério que tutela o trabalho, se provar que não tem capacidade financeira. A autorização é temporária e não pode passar de 24 meses.",
    },
    {
      pregunta: "O sector pode ter um mínimo mais alto?",
      respuesta: "Sim. Por acordo colectivo, os representantes dos trabalhadores e dos empregadores podem fixar salários mínimos superiores para uma indústria ou sector.",
    },
  ],
  glosario: [
    { termino: "Micro-empresa", definicion: "Empresa de pequena dimensão, com um salário mínimo próprio no decreto." },
    { termino: "Startup", definicion: "Empresa iniciante, que o decreto trata como as micro-empresas." },
  ],
});
