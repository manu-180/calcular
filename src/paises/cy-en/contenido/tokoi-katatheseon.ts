import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.tokoi-katatheseon",
  h1: "Fixed deposit interest calculator for Cyprus",
  title: "Cyprus deposit interest after defence and GeSY",
  description: "Work out net interest on a deposit after the Special Defence Contribution of {{cy.ektakti-eisfora-amynas[tokoi]}} and GeSY of {{cy.eisfores-gesy[eisodimatias]}}.",
  intro: [
    "Enter the amount, rate and term of your deposit to see gross interest, deductions and what's left.",
    "For Cyprus tax residents, interest pays no income tax. It pays the Special Defence Contribution and GeSY.",
  ],
  comoSeCalcula: [
    "Gross interest = amount × rate × months / 12, as simple interest.",
    "Special Defence Contribution: {{cy.ektakti-eisfora-amynas[tokoi]}} of the interest.",
    "GeSY: {{cy.eisfores-gesy[eisodimatias]}} of the interest.",
  ],
  ejemplo: [
    "€10,000 at 3% for a year earns €300. €51 goes to defence and €7.95 to GeSY. You keep €241.05.",
  ],
  faq: [
    { pregunta: "Can I get some of the contribution back on a low income?", respuesta: "Yes. If your total yearly income, interest included, is no more than €12,000, you can claim back the contribution above 3%." },
    { pregunta: "Is interest taxed on the income tax bands?", respuesta: "No. The income tax law exempts an individual's interest income. Only the defence contribution and GeSY apply." },
    { pregunta: "Does it include compounding?", respuesta: "It uses simple interest, like most fixed deposits. For compounding, use the compound interest calculator." },
  ],
  glosario: [
    { termino: "Special Defence Contribution", definicion: "A contribution withheld from interest and dividends of Cyprus tax residents." },
  ],
});
