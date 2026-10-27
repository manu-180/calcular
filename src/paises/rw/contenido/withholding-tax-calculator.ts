import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.withholding-tax-calculator",
  h1: "Withholding tax calculator Rwanda",
  title: "Withholding tax Rwanda: 15%, 3%, 5% and 30% rates",
  description: "Work out withholding tax on dividends, interest, royalties, public tenders, imports and board allowances with the current RRA rates.",
  intro: [
    "Withholding tax is taken at source: the payer keeps part of the payment and sends it to the RRA. Choose the type of payment to see the tax and what the payee receives.",
  ],
  comoSeCalcula: [
    "Dividends, interest, royalties and payments to people not registered with the RRA: {{rw.wht-rate}}.",
    "Public tenders: {{rw.wht-tenders}} of the invoice without VAT, or {{rw.wht-rate}} if the supplier is not registered or has no recent income tax return.",
    "Goods imported for business: {{rw.wht-imports}} of the CIF value, paid at customs.",
    "Board member allowances: {{rw.wht-board}}.",
  ],
  ejemplo: ["A dividend of RWF 1,000,000 carries RWF 150,000 of withholding tax, so the shareholder receives RWF 850,000."],
  faq: [
    {
      pregunta: "When is withholding tax paid to the RRA?",
      respuesta: "The payer declares and pays it within 15 days after the month in which it was withheld.",
    },
    {
      pregunta: "Is it a final tax?",
      respuesta: "For a registered taxpayer, tax withheld on payments made to it is deducted from income tax when the return is filed.",
    },
    {
      pregunta: "Are dividends between Rwandan companies taxed?",
      respuesta: "No. Dividends paid between resident companies are left out of the 15% withholding tax.",
    },
  ],
  glosario: [
    { termino: "CIF value", definicion: "Cost, insurance and freight: the value of imported goods at the border." },
    { termino: "Quitus Fiscal", definicion: "Tax compliance certificate from the RRA that exempts the holder from withholding on imports and tenders." },
  ],
});
