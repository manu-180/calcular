import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.withholding-tax-calculator",
  h1: "Withholding tax calculator Samoa {{anio}}",
  title: "Withholding tax calculator Samoa {{anio}}: 10% and 15%",
  description: "Work out the tax a payer withholds in Samoa: {{ws.resident-wht-rate}} on resident contractors paid by government, {{ws.nonresident-wht-rate}} on most payments to non-residents.",
  intro: [
    "Withholding tax is income tax taken off a payment before it reaches the recipient, at {{ws.resident-wht-rate}} for residents paid by government and {{ws.nonresident-wht-rate}} for most non-residents. Samoa uses it in two situations: government payments for services to residents, and payments from Samoa to non-residents.",
    "Pick the case, enter the gross amount and the calculator shows the tax withheld and the amount paid out.",
  ],
  comoSeCalcula: [
    "Resident withholding tax applies only when a ministry, state-owned enterprise or public authority pays a resident for professional or personal services. The rate is {{ws.resident-wht-rate}} of the gross amount or, for a contract, of the total contract price.",
    "Non-resident withholding tax is {{ws.nonresident-wht-rate}} on interest, royalties, insurance premiums, management fees, professional fees and natural resource amounts paid to a non-resident. A life insurance premium or reinsurance is taxed at {{ws.nonresident-wht-insurance-rate}} instead.",
    "The resident tax is a credit against the contractor's final income tax. The non-resident tax is a final tax.",
  ],
  ejemplo: [
    "A ministry pays a resident consultant a contract price of WS$10,000. It withholds {{ws.resident-wht-rate}}, which is WS$1,000, and pays WS$9,000. If the same WS$10,000 went to a non-resident consultant, the tax would be WS$1,500 and the payment WS$8,500.",
  ],
  faq: [
    {
      pregunta: "Is there withholding between two private businesses?",
      respuesta: "Not on the resident rule. Information Sheet IS01 says resident withholding tax is for services supplied to a government entity, and there is none where the supply is between private businesses only.",
    },
    {
      pregunta: "Can a non-resident get the withheld tax refunded?",
      respuesta: "No. IS01 calls the non-resident withholding tax a final tax: the amount withheld is not altered or refunded. A P5 certificate from the Ministry of Finance lets you claim a credit in your home country.",
    },
    {
      pregunta: "Where does the P5 certificate come from?",
      respuesta: "For government contracts the Ministry of Finance issues the P5 withholding certificate. A resident lodges it with the annual income tax return.",
    },
  ],
  glosario: [
    { termino: "Withholding tax", definicion: "Tax the payer deducts and sends to the Ministry for Revenue on behalf of the recipient." },
    { termino: "P5 certificate", definicion: "The certificate that proves withholding tax was paid." },
    { termino: "Final tax", definicion: "A tax that settles the liability, with no further return." },
  ],
});
