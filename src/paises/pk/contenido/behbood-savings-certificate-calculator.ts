import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.behbood-savings-certificate-calculator",
  h1: "Behbood Savings Certificate calculator",
  title: "Behbood Savings Certificate profit calculator {{anio}}",
  description: "Monthly profit on Behbood Savings Certificates at {{pk.nss-rates[bsc]}}, after the withholding tax for filers ({{pk.nss-wht-filer}}) or non-filers.",
  intro: ["Behbood Savings Certificates pay a monthly profit. Enter the amount to see your monthly income before and after tax."],
  comoSeCalcula: [
    "Monthly profit = amount × {{pk.nss-rates[bsc]}} ÷ 12. That is Rs. 1,060 a month for every Rs. 100,000.",
    "National Savings deducts withholding tax: {{pk.nss-wht-filer}} for filers and {{pk.nss-wht-nonfiler}} for non-filers.",
  ],
  ejemplo: ["Rs. 1 million gives Rs. 10,600 a month before tax, or Rs. 9,010 for a filer."],
  faq: [
    {
      pregunta: "Who can buy Behbood certificates?",
      respuesta: "Eligibility is set by the scheme's rules. Ask at a National Savings centre or check the scheme page before you invest.",
    },
    {
      pregunta: "Does the rate change after I buy?",
      respuesta: "National Savings revises rates often. Check the latest summary of profit rates before you invest.",
    },
    {
      pregunta: "Can zakat be deducted?",
      respuesta: "Zakat and service charges may apply as per rules, as National Savings notes on its rates page.",
    },
  ],
  glosario: [{ termino: "Filer", definicion: "A person on the FBR Active Taxpayers List." }],
});
