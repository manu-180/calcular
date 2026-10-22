import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.regular-income-certificate-calculator",
  h1: "Regular Income Certificate calculator",
  title: "Regular Income Certificate (RIC) profit calculator 2026",
  description: "Monthly profit on National Savings Regular Income Certificates at {{pk.nss-rates[ric]}}, after withholding tax for filers or non-filers.",
  intro: ["Regular Income Certificates pay you a profit every month. Enter the amount to see the income before and after tax."],
  comoSeCalcula: [
    "Monthly profit = amount × {{pk.nss-rates[ric]}} ÷ 12, or Rs. 980 for every Rs. 100,000.",
    "Withholding tax is {{pk.nss-wht-filer}} for filers and {{pk.nss-wht-nonfiler}} for non-filers.",
  ],
  ejemplo: ["Rs. 1 million gives Rs. 9,800 a month before tax, or Rs. 8,330 for a filer."],
  faq: [
    {
      pregunta: "RIC or Behbood?",
      respuesta: "Behbood pays more ({{pk.nss-rates[bsc]}}) but is limited to eligible investors. RIC is open more widely at {{pk.nss-rates[ric]}}.",
    },
    {
      pregunta: "How often do rates change?",
      respuesta: "National Savings revises them often. This page uses the rates in force from 1 October 2026.",
    },
    {
      pregunta: "Is a filer always better off?",
      respuesta: "Yes. Non-filers have tax deducted at twice the filer rate on this profit.",
    },
  ],
  glosario: [{ termino: "RIC", definicion: "Regular Income Certificate, a National Savings product with monthly profit." }],
});
