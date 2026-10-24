import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.withholding-tax-calculator",
  h1: "Withholding tax calculator Kenya",
  title: "Withholding tax calculator Kenya: rates for fees and rent",
  description:
    "Work out the withholding tax to deduct on professional fees ({{ke.wht-resident[professional]}} for residents), contractual fees, rent, interest and more. KRA rates.",
  intro: [
    "When you pay certain kinds of income, you deduct withholding tax and send it to KRA. The payee gets the rest.",
    "Choose the type of payment and whether the payee lives in Kenya to see the rate and the amounts.",
  ],
  comoSeCalcula: [
    "Each type of payment has its own rate, and non-residents usually pay a higher one.",
    "Professional, management and consultancy fees: {{ke.wht-resident[professional]}} for residents and {{ke.wht-non-resident[professional]}} for non-residents. Contractual fees: {{ke.wht-resident[contractual]}} for residents.",
    "Rent of buildings: {{ke.wht-resident[rent-buildings]}} for residents and {{ke.wht-non-resident[rent-buildings]}} for non-residents.",
    "The payer remits the tax within five working days after deducting it.",
  ],
  ejemplo: ["On a professional fee of KSh 100,000 to a resident, you deduct KSh 5,000 and pay the consultant KSh 95,000."],
  faq: [
    {
      pregunta: "Who has to deduct withholding tax?",
      respuesta: "The person making the payment, when the payment is one of the types listed by KRA.",
    },
    {
      pregunta: "How fast must I pay it to KRA?",
      respuesta: "Within five working days after you deduct it.",
    },
    {
      pregunta: "Is betting winnings tax the same?",
      respuesta: "Winnings from betting and gaming carry {{ke.wht-resident[winnings]}} withholding for residents and non-residents alike.",
    },
  ],
  glosario: [{ termino: "Withholding tax", definicion: "Tax the payer deducts from a payment and sends to KRA on behalf of the payee." }],
});
