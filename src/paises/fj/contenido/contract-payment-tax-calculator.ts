import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.contract-payment-tax-calculator",
  h1: "Contract payment tax calculator Fiji {{anio}}",
  title: "Contract payment tax Fiji {{anio}}: {{fj.contract-withholding-rate}} withheld",
  description: "Payers withhold {{fj.contract-withholding-rate}} from contract payments above {{fj.contract-withholding-threshold}}. See the tax held back and what the contractor receives.",
  intro: [
    "When a business pays a contractor in Fiji for a job above {{fj.contract-withholding-threshold}}, it must withhold {{fj.contract-withholding-rate}} of the payment and send it to FRCS. This is provisional tax, not PAYE, because a contractor is not an employee.",
    "Enter the contract amount to see what is held back and what the contractor receives.",
  ],
  comoSeCalcula: [
    "FRCS separates a contract of service (an employment contract, where PAYE applies) from a contract for service (a business to business agreement, where provisional tax applies).",
    "For a contract for service the payer withholds {{fj.contract-withholding-rate}} of the payment when the agreement is above {{fj.contract-withholding-threshold}}. At or below it nothing is withheld.",
    "The same {{fj.contract-withholding-rate}} provisional tax applies to commission agents, election day workers, fishing income, performers, pieceworkers, seasonal workers and similar contractual payments listed in the Employer Guide 2026.",
    "The payer sends the money to FRCS in the month after the month of payment. Keep a record of the amount withheld, because it relates to your own tax position as a contractor.",
  ],
  ejemplo: [
    "A business agrees to pay a freelance designer FJ$5,000. The amount is above FJ$1,000, so it withholds 5%, which is FJ$250, and pays the designer FJ$4,750. A payment of exactly FJ$1,000 has no withholding.",
  ],
  faq: [
    {
      pregunta: "What rate is withheld from contract payments?",
      respuesta: "The Employer Guide 2026 says the contractee withholds {{fj.contract-withholding-rate}} of the contract payment and remits it to FRCS.",
    },
    {
      pregunta: "Which contracts are covered?",
      respuesta: "Agreements above {{fj.contract-withholding-threshold}}. The guide also names commission agents, fishing income, performers, pieceworkers, seasonal workers and screen production workers.",
    },
    {
      pregunta: "When must the payer send the money to FRCS?",
      respuesta: "In the month following the month in which the amount was deducted, according to the guide.",
    },
  ],
  glosario: [
    { termino: "Contract for service", definicion: "An agreement between two businesses for work done, not an employment contract." },
    { termino: "Provisional tax", definicion: "Tax that the payer withholds from certain contractual payments and sends to FRCS." },
    { termino: "Contractee", definicion: "The person or business that pays for the work." },
  ],
});
