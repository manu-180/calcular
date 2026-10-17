import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.kvp-calculator",
  h1: "KVP calculator",
  title: "KVP calculator: Kisan Vikas Patra doubles your money",
  description: "Kisan Vikas Patra doubles your money in {{in.kvp-months}}. See the maturity value and the yearly return it works out to.",
  intro: [
    "Kisan Vikas Patra is a post office certificate that doubles the amount you invest. Enter the amount to see the maturity value and when you get it.",
  ],
  comoSeCalcula: [
    "The amount doubles in {{in.kvp-months}}, which is 9 years and 7 months at the current rate.",
    "That works out to {{in.small-savings-rates[kvp]}} a year, compounded yearly.",
  ],
  ejemplo: ["₹1 lakh in a KVP becomes ₹2 lakh after 115 months."],
  faq: [
    {
      pregunta: "Why is the period 115 months?",
      respuesta: "It is the time it takes to double at {{in.small-savings-rates[kvp]}} compounded yearly. When the rate changes, the period for new certificates changes too.",
    },
    {
      pregunta: "Is the gain taxed?",
      respuesta: "Yes. The interest is income and is taxed at your slab rate.",
    },
    {
      pregunta: "KVP or NSC?",
      respuesta: "NSC pays {{in.small-savings-rates[nsc]}} for five years. KVP takes longer but doubles the money. Compare both with their calculators.",
    },
  ],
  glosario: [
    { termino: "KVP", definicion: "Kisan Vikas Patra, a certificate that doubles the amount invested." },
    { termino: "Maturity", definicion: "The day the certificate pays out double the amount." },
  ],
});
