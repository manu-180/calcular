import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.property-tax-penalty",
  h1: "Real property tax penalty calculator Liberia",
  title: "Late real property tax penalty in Liberia",
  description: "Work out the penalty for paying real property tax late in Liberia: {{lr.property-penalty[por-mes]}} for each month after 31 July, up to {{lr.property-penalty[tope]}}.",
  intro: [
    "Enter the real property tax you owe and how many months late you are to see the penalty the LRA adds.",
    "The penalty is {{lr.property-penalty[por-mes]}} of the tax for each month after 31 July that it remains unpaid, but never more than {{lr.property-penalty[tope]}}.",
  ],
  comoSeCalcula: [
    "Penalty rate: months unpaid after 31 July × {{lr.property-penalty[por-mes]}}, capped at {{lr.property-penalty[tope]}}.",
    "Penalty: tax due × penalty rate. Interest at the market rate of the Central Bank of Liberia comes on top.",
  ],
  ejemplo: ["A US$125 tax paid two months late carries a US$12.50 penalty."],
  faq: [
    {
      pregunta: "When is real property tax due?",
      respuesta: "Between 1 January and 1 July of the year it is levied. After that it is late and starts to build up penalty and interest.",
    },
    {
      pregunta: "Is there interest as well?",
      respuesta: "Yes. Section 2002 adds interest at the market rate published by the Central Bank of Liberia. This calculator shows the penalty only.",
    },
    {
      pregunta: "How do I pay?",
      respuesta: "Deposit the amount at a commercial bank and send the return to the LRA, or pay at an LRA office. Amounts above US$250 need a manager's check.",
    },
  ],
  glosario: [
    { termino: "Section 2002", definicion: "The part of the Revenue Code of Liberia that sets penalty and interest on late real property tax." },
  ],
});
