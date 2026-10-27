import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cy-en.chartosima",
  h1: "Stamp duty calculator for Cyprus contracts",
  title: "Cyprus stamp duty on contracts: {{anio}} calculator",
  description: "Work out stamp duty on Cyprus contracts with a fixed amount, such as property sale agreements, up to {{cy.chartosima-anotato}}.",
  intro: [
    "Contracts with a fixed amount, like a property sale agreement, must be stamped.",
    "Enter the contract value to see the duty.",
  ],
  comoSeCalcula: [
    "Up to {{cy.chartosima[0].hasta}} no stamp duty is due.",
    "From there up to {{cy.chartosima[1].hasta}} you pay €1.50 for every €1,000 or part of €1,000.",
    "Above {{cy.chartosima[2].desde}} you pay €2 for every €1,000 or part of €1,000.",
    "The duty never exceeds {{cy.chartosima-anotato}} per contract.",
  ],
  ejemplo: [
    "For a €200,000 sale agreement you pay €247.50 on the part up to €170,000 and €60 on the remaining €30,000. Total €307.50.",
  ],
  faq: [
    { pregunta: "Which contracts need stamping?", respuesta: "Contracts and documents with a fixed amount for which the law sets no other fee. A mortgage that replaces an existing one on the same day is excluded." },
    { pregunta: "What if I stamp the contract late?", respuesta: "The law adds a surcharge to the unpaid stamp duty." },
    { pregunta: "What is the maximum stamp duty?", respuesta: "{{cy.chartosima-anotato}} per contract, however large its value." },
  ],
  glosario: [
    { termino: "Stamp duty", definicion: "A fee paid so a document takes full legal effect." },
  ],
});
