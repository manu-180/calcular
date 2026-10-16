import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.nsc-calculator",
  h1: "NSC calculator",
  title: "NSC calculator: National Savings Certificate maturity",
  description: "Work out the maturity value and yearly interest of a National Savings Certificate at {{in.small-savings-rates[nsc]}}, compounded yearly over 5 years.",
  intro: [
    "The National Savings Certificate (VIII Issue) is a five-year deposit sold at post offices. Enter the amount and see what you get at maturity.",
    "The rate is fixed on the day you buy the certificate, so later changes do not affect it.",
  ],
  comoSeCalcula: [
    "Interest of {{in.small-savings-rates[nsc]}} is added to the certificate at the end of each year and earns interest itself in the years after.",
    "Nothing is paid out along the way. You get the deposit plus all the interest when the certificate matures after five years.",
    "Maturity = amount × (1 + rate)^5.",
  ],
  ejemplo: ["₹1 lakh invested at 7.7% grows to ₹1,44,903.38 after five years."],
  faq: [
    {
      pregunta: "What is the minimum investment?",
      respuesta: "₹1,000, and then any amount in multiples of ₹100. You can open any number of accounts.",
    },
    {
      pregunta: "Does the rate change during the five years?",
      respuesta: "No. The rate in force when you buy the certificate applies until maturity.",
    },
    {
      pregunta: "Where is the current rate published?",
      respuesta: "The Ministry of Finance announces small savings rates every quarter. For October to December 2026 the NSC rate is {{in.small-savings-rates[nsc]}}.",
    },
  ],
  glosario: [
    { termino: "NSC", definicion: "National Savings Certificate, a five-year government savings certificate." },
    { termino: "Compounding", definicion: "Adding each year's interest to the amount so it earns interest too." },
  ],
});
