import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.special-savings-certificate-calculator",
  h1: "Special Savings Certificate calculator",
  title: "Special Savings Certificate (SSC) profit calculator",
  description: "Profit on a 3-year Special Savings Certificate: {{pk.nss-rates[ssc]}} for the first five half-years and {{pk.nss-rates[ssc3]}} for the last, after tax.",
  intro: ["Special Savings Certificates run for three years and pay profit every six months. Enter the amount to see each payment and the total."],
  comoSeCalcula: [
    "The first five half-yearly payments are worked out at {{pk.nss-rates[ssc]}} a year: Rs. 5,800 per Rs. 100,000 each time.",
    "The sixth and last payment uses {{pk.nss-rates[ssc3]}}: Rs. 6,450 per Rs. 100,000.",
    "Withholding tax is {{pk.nss-wht-filer}} for filers and {{pk.nss-wht-nonfiler}} for non-filers.",
  ],
  ejemplo: ["Rs. 100,000 earns Rs. 35,450 over three years before tax, or Rs. 30,132.50 for a filer."],
  faq: [
    {
      pregunta: "Why is the last payment higher?",
      respuesta: "National Savings sets a higher rate for the last half-year in its profit table.",
    },
    {
      pregunta: "Which rate applies to my certificate?",
      respuesta: "The table of the date you invest. This page uses the rates from 1 October 2026.",
    },
    {
      pregunta: "Is there an account version?",
      respuesta: "Yes, the Special Savings Account follows the same profit table.",
    },
  ],
  glosario: [{ termino: "SSC", definicion: "Special Savings Certificate, a 3-year National Savings certificate with half-yearly profit." }],
});
