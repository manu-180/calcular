import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.short-term-savings-certificate-calculator",
  h1: "Short Term Savings Certificate calculator",
  title: "Short Term Savings Certificate profit calculator",
  description: "Profit on National Savings Short Term Savings Certificates for 3 months ({{pk.nss-rates[stsc3m]}}), 6 months ({{pk.nss-rates[stsc6m]}}) or 1 year ({{pk.nss-rates[stsc1y]}}).",
  intro: ["Short Term Savings Certificates are the National Savings version of a short fixed deposit. Pick the term to see what you get back."],
  comoSeCalcula: [
    "Profit = amount × rate × months ÷ 12, paid at maturity.",
    "Withholding tax is {{pk.nss-wht-filer}} for filers and {{pk.nss-wht-nonfiler}} for non-filers.",
  ],
  ejemplo: ["Rs. 500,000 for one year at 11.31% earns Rs. 56,550, or Rs. 48,067.50 after a filer's tax."],
  faq: [
    {
      pregunta: "When is the profit paid?",
      respuesta: "This calculator assumes the profit is paid with the amount at the end of the term.",
    },
    {
      pregunta: "Which term pays most?",
      respuesta: "From 1 October 2026 the one-year certificate has the highest rate, {{pk.nss-rates[stsc1y]}}.",
    },
    {
      pregunta: "How does this compare with a bank deposit?",
      respuesta: "Use the bank profit tax calculator to compare with a bank term deposit, which has its own tax rate.",
    },
  ],
  glosario: [{ termino: "STSC", definicion: "Short Term Savings Certificate." }],
});
