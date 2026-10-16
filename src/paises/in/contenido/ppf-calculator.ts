import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.ppf-calculator",
  h1: "PPF calculator",
  title: "PPF calculator: Public Provident Fund maturity value",
  description:
    "See what your PPF grows to in 15 years at {{in.small-savings-rates[ppf]}} a year, with yearly deposits from {{in.ppf-min-deposit}} to {{in.ppf-max-deposit}}.",
  intro: [
    "The Public Provident Fund is a 15-year government savings scheme at the post office or a bank. Enter how much you deposit each year and see the maturity value.",
    "The rate is set every quarter by the Ministry of Finance. For October to December 2026 it stays at {{in.small-savings-rates[ppf]}}.",
  ],
  comoSeCalcula: [
    "Interest is worked out every month on the lowest balance between the 5th and the end of the month, and credited once at the end of the year.",
    "This calculator assumes you deposit by 5 April each year, so the whole deposit earns interest for twelve months.",
    "The account matures 15 years after the end of the year in which you opened it. You can then extend it in blocks of five years, with or without new deposits.",
  ],
  ejemplo: [
    "Depositing the maximum of ₹1.5 lakh every year for 15 years at 7.1% gives about ₹40.68 lakh. You put in ₹22.5 lakh and the rest is interest.",
  ],
  faq: [
    {
      pregunta: "How much can I put in a PPF account?",
      respuesta: "From {{in.ppf-min-deposit}} to {{in.ppf-max-deposit}} in a year, in multiples of ₹50. The maximum includes what you deposit in an account opened for a minor.",
    },
    {
      pregunta: "What happens if I skip a year?",
      respuesta: "If you miss the minimum deposit, the account is treated as discontinued. You can revive it by paying a fee of ₹50 plus the minimum deposit for each year missed.",
    },
    {
      pregunta: "Will the rate stay at 7.1% for 15 years?",
      respuesta: "No. The government reviews it every quarter and the new rate applies to the whole balance. Treat the result as an estimate.",
    },
    {
      pregunta: "Can I close the account early?",
      respuesta: "Only after five years from the end of the year of opening and for reasons the scheme allows: treatment of a life-threatening disease, higher education or a change in residency. Interest is then cut by 1%.",
    },
  ],
  glosario: [
    { termino: "PPF", definicion: "Public Provident Fund, a 15-year savings scheme backed by the government." },
    { termino: "Maturity", definicion: "The end of the 15 years, when you can withdraw the balance." },
    { termino: "Extension", definicion: "Keeping the account open for another five years after maturity." },
  ],
});
