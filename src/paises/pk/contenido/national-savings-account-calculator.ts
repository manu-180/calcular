import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.national-savings-account-calculator",
  h1: "National Savings Account profit calculator",
  title: "National Savings Account profit calculator {{anio}}",
  description: "Profit on a National Savings Account at {{pk.nss-rates[sa]}} a year, after withholding tax for filers or non-filers.",
  intro: ["The National Savings Account lets you deposit and withdraw while earning profit. Enter your balance and months to see the profit."],
  comoSeCalcula: [
    "Profit = balance × {{pk.nss-rates[sa]}} × months ÷ 12, assuming the balance stays the same.",
    "Withholding tax is {{pk.nss-wht-filer}} for filers and {{pk.nss-wht-nonfiler}} for non-filers.",
  ],
  ejemplo: ["Rs. 500,000 for a year earns Rs. 50,000, or Rs. 42,500 for a filer."],
  faq: [
    {
      pregunta: "Is a non-filer taxed more?",
      respuesta: "Yes. National Savings deducts {{pk.nss-wht-nonfiler}} from a non-filer's profit, against {{pk.nss-wht-filer}} for a filer.",
    },
    {
      pregunta: "Did the savings account rate change on 1 October 2026?",
      respuesta: "No. National Savings noted that the Savings Account rate stayed at {{pk.nss-rates[sa]}}.",
    },
    {
      pregunta: "What if my balance changes?",
      respuesta: "Then the profit changes too. Use an average balance for a rough estimate.",
    },
  ],
  glosario: [{ termino: "Savings Account", definicion: "A National Savings account for regular deposits and withdrawals." }],
});
