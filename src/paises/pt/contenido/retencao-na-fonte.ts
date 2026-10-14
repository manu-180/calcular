import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.retencao-na-fonte",
  h1: "Retenção na fonte de IRS",
  title: "Retenção na fonte de IRS 2026: tabelas e simulador",
  description:
    "Saiba quanto IRS é retido no salário com as tabelas de retenção na fonte de 2026 do continente: taxa marginal, parcela a abater e dependentes.",
  intro: [
    "Todos os meses a entidade patronal retém uma parte do salário por conta do IRS. O valor sai das tabelas de retenção na fonte aprovadas por despacho para cada ano.",
    "Indique a remuneração mensal, a situação familiar e os dependentes para ver a linha da tabela, a taxa, a parcela a abater e o valor retido.",
  ],
  comoSeCalcula: [
    "Escolhe-se a tabela pela situação familiar e a linha pela remuneração mensal.",
    "Retenção = remuneração × taxa marginal máxima − parcela a abater − parcela adicional por dependente × número de dependentes. O resultado nunca é negativo.",
    "Na 2.ª e na 3.ª linha das tabelas a parcela a abater é uma fórmula que usa a própria remuneração (R).",
    "Com três ou mais dependentes retira-se {{pt.retencao-reducao-3-dependentes}} à taxa marginal, sem mexer na parcela a abater.",
  ],
  ejemplo: [
    "Uma remuneração de 1 819 euros, na tabela I, paga 24,10 % menos 193,33 euros: retém 245,05 euros, que é 13,5 % do salário.",
  ],
  faq: [
    {
      pregunta: "Quem aprova as tabelas de retenção?",
      respuesta: "A Secretária de Estado dos Assuntos Fiscais, por despacho. As de 2026 aplicam-se aos rendimentos pagos a partir de 1 de janeiro de 2026.",
    },
    {
      pregunta: "Quando se aplica a tabela de casado, único titular?",
      respuesta: "Quando só um dos cônjuges ou unidos de facto tem rendimentos, ou quando um deles ganha pelo menos 95 % do rendimento englobado do casal.",
    },
    {
      pregunta: "Como se retém IRS nas horas extra?",
      respuesta: "O trabalho suplementar retém a 50 % da taxa efetiva que resulta para o salário desse mês.",
    },
    {
      pregunta: "Posso pedir para reter mais?",
      respuesta: "Sim. Pode pedir uma taxa superior à da tabela. Nesse caso muda só a taxa marginal; a parcela a abater fica igual.",
    },
  ],
  glosario: [
    { termino: "Parcela adicional por dependente", definicion: "Valor fixo por dependente que se subtrai à retenção." },
    { termino: "Taxa efetiva", definicion: "A percentagem do salário que fica retida depois de abater as parcelas." },
  ],
});
