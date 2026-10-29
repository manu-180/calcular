import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.presumptive-tax",
  h1: "Presumptive tax calculator Liberia",
  title: "Liberia presumptive tax and advance tax by quarter",
  description: "Work out the quarterly presumptive tax for small businesses or the advance tax for medium and large businesses in Liberia, as a share of turnover.",
  intro: [
    "Enter your turnover for the quarter and for the year to see the business income tax payment due to the LRA.",
    "Businesses with yearly turnover below {{lr.small-turnover-limit}} pay {{lr.presumptive-rates[small]}} of turnover each quarter. Larger ones pay {{lr.presumptive-rates[medium-large]}}.",
  ],
  comoSeCalcula: [
    "Your division depends on yearly turnover: Small Tax Division below {{lr.small-turnover-limit}}, Medium or Large above it.",
    "Small Tax Division: presumptive tax of {{lr.presumptive-rates[small]}} of the quarter's turnover.",
    "Medium and Large Tax Divisions: advance (minimum) tax of {{lr.presumptive-rates[medium-large]}} of the quarter's turnover.",
  ],
  ejemplo: ["A shop with L$500,000 of sales in the quarter and about L$2,000,000 a year pays L$20,000 for the quarter."],
  faq: [
    {
      pregunta: "When are the quarterly payments due?",
      respuesta: "Within 15 days after each quarter ends: 15 April, 15 July, 15 October and 15 January.",
    },
    {
      pregunta: "What is presumptive taxation?",
      respuesta: "A way to calculate your tax on an estimated income or profit instead of your actual accounts. Any business in Liberia can use it.",
    },
    {
      pregunta: "Which division am I in?",
      respuesta: "The LRA puts businesses with turnover below {{lr.small-turnover-limit}} in the Small and Micro Tax Division and those above it in the Medium or Large Tax Division.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "Total sales of the business before any costs." },
    { termino: "Advance tax", definicion: "The minimum tax paid each quarter by medium and large businesses." },
  ],
});
