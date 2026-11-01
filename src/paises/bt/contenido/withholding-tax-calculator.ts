import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.withholding-tax-calculator",
  h1: "Withholding tax (TDS) calculator Bhutan",
  title: "TDS rates Bhutan: {{bt.tds-rates[contract-resident]}} on service fees, {{bt.tds-rates[rent]}} on rent",
  description: "Work out tax deducted at source in Bhutan: {{bt.tds-rates[contract-resident]}} on service fees to residents, {{bt.tds-rates[rent]}} on rent, {{bt.tds-rates[interest]}} on interest. Choose the payment.",
  intro: [
    "Whoever pays certain amounts in Bhutan must hold back part of the payment and hand it to the Department of Revenue and Customs: {{bt.tds-rates[contract-resident]}} on a contract or service fee to a resident, {{bt.tds-rates[contract-non-resident]}} to a non-resident, {{bt.tds-rates[rent]}} on rent, and {{bt.tds-rates[interest]}} on interest. These rates apply since {{bt.tds-rates#desde}}.",
    "Choose the payment and the amount to see what to withhold and what the other party receives.",
  ],
  comoSeCalcula: [
    "Multiply the payment by the rate for its type.",
    "Royalties and other investment income: {{bt.tds-rates[royalty]}}. Dividends to individuals: {{bt.tds-rates[dividend]}}. A partner's share: {{bt.tds-rates[partnership]}}. Lottery, betting and gambling winnings: {{bt.tds-rates[lottery]}}.",
    "Deposit the amount within 10 days after the end of the calendar month of the deduction, as the notification of 16 December 2025 requires.",
  ],
  ejemplo: ["A company pays a resident plumber a fee of Nu. 100,000. It withholds 2 %, Nu. 2,000, and pays Nu. 98,000. By the 10th of the next month it deposits the Nu. 2,000. For a non-resident contractor the rate is 5 %, so Nu. 5,000 stays back."],
  faq: [
    {
      pregunta: "Who has to deduct TDS in Bhutan?",
      respuesta: "Government and semi-government entities, companies, non-governmental organisations, businesses, agencies and individuals, according to Chapter 11 of the Income Tax Act of Bhutan 2025 and part 2 of the notification of the Department of Revenue and Customs.",
    },
    {
      pregunta: "What about tax on salaries?",
      respuesta: "An employer uses the monthly table in Annexure I of the Rules on the Income Tax Act, not a flat rate. See the take-home pay calculator.",
    },
    {
      pregunta: "Must a household withhold from a builder?",
      respuesta: "The notification lists an individual who pays for construction, renovation, repair or maintenance of a home they own or occupy: {{bt.tds-rates[contract-resident]}} for residents and {{bt.tds-rates[contract-non-resident]}} for non-residents.",
    },
    {
      pregunta: "Is all interest or dividend income taxed?",
      respuesta: "No. Schedule 3 exempts fixed deposit interest up to Nu. 400,000 and dividends up to Nu. 300,000 a year for an individual who is not a business, and winnings up to Nu. 5,000 per win. This calculator applies the rate to the amount you enter.",
    },
  ],
  glosario: [
    { termino: "TDS", definicion: "Tax deducted at source, also called withholding tax." },
    { termino: "Withholding person", definicion: "The one who makes the payment and must deduct and deposit the tax." },
    { termino: "Non-resident", definicion: "A person who does not meet the residence test of the Act." },
  ],
});
