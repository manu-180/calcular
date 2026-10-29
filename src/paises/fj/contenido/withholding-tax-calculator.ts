import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.withholding-tax-calculator",
  h1: "Withholding tax calculator Fiji {{anio}}",
  title: "Withholding tax Fiji {{anio}}: interest, royalties, premiums",
  description: "Work out the withholding tax on interest, royalties, management fees and insurance premiums, using the FRCS rates: {{fj.withholding-rates[nr-royalty-fees]}}, {{fj.withholding-rates[nr-interest]}} and {{fj.withholding-rates[nr-insurance]}}.",
  intro: [
    "Fiji withholds tax at source on some payments. Interest paid to a resident carries {{fj.withholding-rates[resident-interest]}}. Royalties, management fees and professional fees paid to a non-resident carry {{fj.withholding-rates[nr-royalty-fees]}}.",
    "Choose the type of payment and enter the gross amount to see the tax withheld and the amount paid out.",
  ],
  comoSeCalcula: [
    "The payer, not the recipient, withholds the tax and sends it to FRCS. The calculator multiplies the gross payment by the rate for its type.",
    "Interest paid to a resident is subject to the Resident Interest Withholding Tax at {{fj.withholding-rates[resident-interest]}}.",
    "Payments to a non-resident follow the non-resident withholding rates: {{fj.withholding-rates[nr-royalty-fees]}} for a royalty, management fee, natural resource amount or fee for professional or other independent services, {{fj.withholding-rates[nr-interest]}} for interest and {{fj.withholding-rates[nr-insurance]}} for an insurance premium.",
    "A tax treaty may lower these rates for a particular country. This calculator does not apply treaty relief.",
  ],
  ejemplo: [
    "A Fiji company pays FJ$10,000 as a royalty to a company based overseas. It withholds 15%, which is FJ$1,500, and pays out FJ$8,500. For FJ$2,000 of interest to a resident, the withholding is 10%, which is FJ$200.",
  ],
  faq: [
    {
      pregunta: "What is the withholding rate on interest in Fiji?",
      respuesta: "The FRCS tax rates page lists {{fj.withholding-rates[resident-interest]}} for resident interest and {{fj.withholding-rates[nr-interest]}} for interest paid to a non-resident, in 2026.",
    },
    {
      pregunta: "What is withheld on payments to a non-resident for services?",
      respuesta: "FRCS lists {{fj.withholding-rates[nr-royalty-fees]}} for royalties, management fees, natural resource amounts and fees for professional or independent services.",
    },
    {
      pregunta: "How much is withheld on an insurance premium paid abroad?",
      respuesta: "FRCS lists {{fj.withholding-rates[nr-insurance]}} on insurance premiums paid to a non-resident.",
    },
  ],
  glosario: [
    { termino: "Withholding tax", definicion: "Tax the payer deducts from a payment and sends to the tax office." },
    { termino: "Non-resident", definicion: "A person or company that is not tax resident in Fiji." },
    { termino: "Royalty", definicion: "A payment for the use of intellectual property such as a licence or brand." },
  ],
});
