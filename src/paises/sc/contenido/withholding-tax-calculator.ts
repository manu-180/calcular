import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.withholding-tax-calculator",
  h1: "Seychelles withholding tax calculator {{anio}}",
  title: "Seychelles withholding tax {{anio}}: rates by payment",
  description: "Find the tax to hold back from a payment: {{sc.withholding-rates[non-resident-income]}} for non-resident income and {{sc.withholding-rates[deduction-at-source]}} for deduction at source.",
  intro: [
    "Some payments carry a tax that the payer must hold back and send to the Seychelles Revenue Commission (SRC). Pick the type of payment and enter the gross amount. The headline rate is {{sc.withholding-rates[non-resident-income]}}.",
    "The rates come from the SRC description of the Business Tax Act. Withholding tax is a final tax, so the income is not taxed again as business income.",
  ],
  comoSeCalcula: [
    "Dividends, interest, royalties, natural resource amounts and technical service fees paid to a non-resident bear {{sc.withholding-rates[non-resident-income]}}.",
    "An insurance premium paid to a non-resident bears {{sc.withholding-rates[insurance-premium]}}, as does interest on current, fixed and call deposits.",
    "Deduction at source on payments to a specified business is {{sc.withholding-rates[deduction-at-source]}} of the total amount paid. Specified businesses are building and maintenance contractors, mechanics, and hirers of omnibuses or plant.",
  ],
  ejemplo: [
    "A company pays SCR 100,000 in royalties to a non-resident. It withholds 15 %, which is SCR 15,000, and pays SCR 85,000 to the recipient. It sends SCR 15,000 to the SRC.",
  ],
  faq: [
    {
      pregunta: "When must the tax be paid to the SRC?",
      respuesta: "The SRC says withholding tax is due on or before the 21st day of the following month, reported on the Business Activity Statement.",
    },
    {
      pregunta: "What happens to tax deducted at source?",
      respuesta: "The SRC keeps it as a credit for the business. The credit offsets the business tax assessed for that year and any excess is refunded.",
    },
    {
      pregunta: "Do tax treaties change the rate?",
      respuesta: "They can. The SRC tells payers to consider the permanent establishment rules and the double taxation agreements Seychelles has signed. Write to advisory.center@src.gov.sc if in doubt.",
    },
  ],
  glosario: [
    { termino: "Withholding tax", definicion: "Tax the payer holds back from a payment and sends straight to the tax authority." },
    { termino: "Deduction at source", definicion: "The 1.5 % withholding on payments to specified businesses such as contractors." },
    { termino: "Non-resident", definicion: "A person or company with no residence for tax purposes in Seychelles." },
  ],
});
