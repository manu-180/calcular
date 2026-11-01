import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.severance-pay",
  h1: "Severance pay calculator for The Gambia",
  title: "Severance pay calculator Gambia: Labour Act 2023",
  description: "Work out severance pay in The Gambia under the Labour Act, 2023: {{gm.severance-months-per-year}} of basic pay for each year served, or a {{gm.fixed-term-gratuity-rate}} gratuity on fixed-term contracts.",
  intro: [
    "Section 104 of the Labour Act, 2023 sets severance pay when a contract is terminated or ends. Choose how the job ended to see the minimum amount.",
    "For a terminated contract, death in service, insolvency or a transfer of the business, it is {{gm.severance-months-per-year}} of basic pay for each year served. On a fixed-term contract it is a gratuity of at least {{gm.fixed-term-gratuity-rate}} of the basic pay earned.",
  ],
  comoSeCalcula: [
    "Terminated contract, death, insolvency or transfer: monthly basic pay × {{gm.severance-months-per-year}} × completed years served.",
    "Fixed-term contract that ends or is terminated: basic pay earned during the contract × {{gm.fixed-term-gratuity-rate}}.",
    "Only basic pay counts. Allowances, overtime and bonuses are left out.",
  ],
  ejemplo: ["A worker on D10,000 basic pay whose contract is terminated after five years receives at least D100,000 of severance pay."],
  faq: [
    {
      pregunta: "Who does not get severance pay?",
      respuesta: "Casual employees and employees serving a period of probation.",
    },
    {
      pregunta: "What happens if the worker dies before being paid?",
      respuesta: "The employer pays the severance to the worker's estate under the Intestate Estates Act.",
    },
    {
      pregunta: "Is there more to pay when a job ends?",
      respuesta: "Yes. The employer also pays wages earned, deferred pay, accrued annual leave and any compensation for sickness or accident, plus notice or pay in lieu of notice.",
    },
  ],
  glosario: [
    { termino: "Basic pay", definicion: "The fixed salary before allowances, overtime and bonuses." },
    { termino: "Gratuity", definicion: "A lump sum paid at the end of a fixed-term contract." },
  ],
});
