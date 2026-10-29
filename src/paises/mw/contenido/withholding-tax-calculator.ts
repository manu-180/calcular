import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.withholding-tax-calculator",
  h1: "Withholding tax calculator Malawi",
  title: "Withholding tax calculator Malawi: MRA rates by payment",
  description:
    "Work out the withholding tax to deduct from a payment in Malawi: {{mw.wht-rates[services]}} on services and fees, {{mw.wht-rates[haulage]}} on haulage, {{mw.wht-rates[supplies]}} on supplies.",
  intro: [
    "Choose the type of payment and enter the gross amount to see the tax you deduct and what you pay the supplier.",
    "The rates are the ones in the Fourteenth Schedule to the Taxation Act, as listed by the Malawi Revenue Authority.",
  ],
  comoSeCalcula: [
    "Withholding tax is a share of the gross payment, set by the type of payment.",
    "Royalties, rent, commission, services, interest, fees and public entertainment: {{mw.wht-rates[services]}}.",
    "Carriage and haulage, and contractors in the building industry: {{mw.wht-rates[haulage]}}.",
    "Supplies to traders and institutions: {{mw.wht-rates[supplies]}}. Sales of farm produce: {{mw.wht-rates[farm-produce]}} as a final tax.",
  ],
  ejemplo: ["The MRA's own example: a transporter paid MK 500,000 for haulage has MK 50,000 withheld and receives MK 450,000."],
  faq: [
    {
      pregunta: "When do I send the tax to the MRA?",
      respuesta: "Within 14 days from the end of the month in which you made the deduction. You generate the withholding tax certificate in Msonkho Online.",
    },
    {
      pregunta: "What if I do not deduct the tax?",
      respuesta: "You become personally liable for the tax you did not deduct, plus a penalty of 20% of it and interest at the bank lending rate plus 5%.",
    },
    {
      pregunta: "Can a supplier be exempted?",
      respuesta: "Yes. The MRA can issue a withholding tax exemption certificate to a supplier whose tax affairs are up to date. It does not cover royalties, rent, fees, commissions, contractors and subcontractors or bank interest.",
    },
    {
      pregunta: "What about betting and lottery winnings?",
      respuesta: "Winnings now have their own rate of 15% on every win. Use the winnings tax calculator for those.",
    },
  ],
  glosario: [
    { termino: "Withholding tax", definicion: "An advance payment of income tax that the payer deducts from a specified payment." },
    { termino: "Final tax", definicion: "A tax that settles the income tax on that income, with nothing more to pay on it." },
  ],
});
