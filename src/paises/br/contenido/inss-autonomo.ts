import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.inss-autonomo",
  h1: "Calculadora de INSS para autônomo e contribuinte individual",
  title: "INSS autônomo {{anio}}: quanto pagar na GPS",
  description: "Calcule a contribuição ao INSS de autônomo, contribuinte individual ou facultativo em {{anio}}: plano normal de {{br.inss-individual}}, simplificado de {{br.inss-simplificado}} ou baixa renda.",
  intro: [
    "Quem trabalha por conta própria ou quer contribuir sem ter emprego paga o INSS por conta própria, numa guia mensal (GPS).",
    "Escolha o plano e, no plano normal, quanto quer declarar como salário de contribuição.",
  ],
  comoSeCalcula: [
    "Plano normal: {{br.inss-individual}} sobre o valor declarado, entre o salário mínimo de {{br.salario-minimo}} e o teto de {{br.teto-inss}}.",
    "Plano simplificado: {{br.inss-simplificado}} sobre o salário mínimo.",
    "Facultativo de baixa renda: {{br.inss-mei}} sobre o salário mínimo, para quem cumpre os requisitos do CadÚnico.",
  ],
  ejemplo: ["Declarando R$ 3.000 no plano normal, a contribuição é de R$ 600 por mês. No plano simplificado, seria R$ 178,31."],
  faq: [
    {
      pregunta: "Qual plano escolher?",
      respuesta: "O simplificado é mais barato, mas a aposentadoria fica em um salário mínimo. O normal custa mais e permite um benefício maior.",
    },
    {
      pregunta: "Quem presta serviço para empresa também paga 20 %?",
      respuesta: "Não. Quando a empresa contrata um contribuinte individual, ela retém 11 % do valor do serviço, até o teto. Esta calculadora é para quem recolhe por conta própria.",
    },
    {
      pregunta: "Qual é o prazo para pagar?",
      respuesta: "Até o dia 15 do mês seguinte ao da competência. Se cair em dia sem expediente bancário, vale o próximo dia útil.",
    },
  ],
  glosario: [
    { termino: "Contribuinte individual", definicion: "Quem trabalha por conta própria, como autônomos, profissionais liberais e sócios que retiram pró-labore." },
    { termino: "Facultativo", definicion: "Quem não tem renda de trabalho, mas decide contribuir, como estudantes e donas de casa." },
    { termino: "GPS", definicion: "Guia da Previdência Social, usada para pagar o INSS por conta própria." },
  ],
});
