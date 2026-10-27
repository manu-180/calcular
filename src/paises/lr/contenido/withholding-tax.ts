import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.withholding-tax",
  h1: "Withholding tax calculator Liberia",
  title: "Liberia withholding tax calculator: rent, services, dividends",
  description: "Work out the withholding tax on rent, services, contracts, interest, dividends, board fees and gambling in Liberia with the LRA monthly rates.",
  intro: [
    "Choose the type of payment and enter the gross amount to see how much tax to withhold and pay to the LRA.",
    "Rates go from {{lr.withholding-rates[services]}} on payments for services to {{lr.withholding-rates[gambling]}} on gambling winnings.",
  ],
  comoSeCalcula: [
    "Withholding: gross amount × the rate for the type of payment.",
    "Rent: {{lr.withholding-rates[rent-resident]}} to a resident landlord, {{lr.withholding-rates[rent-non-resident]}} to a non-resident.",
    "Interest and dividends: {{lr.withholding-rates[interest-dividends]}}.",
    "Board and management fees: {{lr.withholding-rates[board-resident]}} resident, {{lr.withholding-rates[board-non-resident]}} non-resident.",
    "Payment for services: {{lr.withholding-rates[services]}}. Contracts on services rendered: {{lr.withholding-rates[contracts]}}.",
  ],
  ejemplo: ["On a L$100,000 invoice for services, withhold L$6,000 and pay the supplier L$94,000."],
  faq: [
    {
      pregunta: "When is withholding tax due?",
      respuesta: "By the 10th day of the month after the payment.",
    },
    {
      pregunta: "What about royalties and other payments to non-residents?",
      respuesta: "Since the Tax Amendment Act of December 2025, a payer must withhold 15 percent on Liberia-source interest, dividends, royalties, licence fees and software sales paid to a non-resident.",
    },
    {
      pregunta: "Who withholds the tax?",
      respuesta: "The payer. It deducts the tax from the payment and pays it to the LRA on behalf of the recipient.",
    },
  ],
  glosario: [
    { termino: "Withholding tax", definicion: "Tax deducted at source by the payer and paid to the LRA." },
  ],
});
