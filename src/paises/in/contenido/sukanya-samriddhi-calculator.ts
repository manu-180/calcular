import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.sukanya-samriddhi-calculator",
  h1: "Sukanya Samriddhi Yojana calculator",
  title: "Sukanya Samriddhi Yojana calculator: SSY maturity",
  description:
    "Estimate the maturity value of a Sukanya Samriddhi account at {{in.small-savings-rates[ssy]}}: deposits for 15 years, maturity after 21 years.",
  intro: [
    "Sukanya Samriddhi Yojana is a savings scheme for a girl child. A parent or guardian opens the account before she turns 10 and deposits every year.",
    "Enter the yearly deposit and your daughter's age to see what the account can be worth when it matures.",
  ],
  comoSeCalcula: [
    "You deposit for 15 years from the date of opening, between {{in.ssy-min-deposit}} and {{in.ssy-max-deposit}} in a financial year.",
    "Interest is worked out every month on the lowest balance between the 5th and the end of the month and credited at the end of each financial year, rounded to the nearest rupee.",
    "From year 16 to year 21 there are no deposits, but the balance keeps earning interest. The account matures 21 years after it was opened.",
    "This calculator assumes you deposit at the start of each year at today's rate of {{in.small-savings-rates[ssy]}}.",
  ],
  ejemplo: [
    "Depositing ₹1.5 lakh a year for 15 years at 8.2% gives about ₹71.82 lakh after 21 years. You put in ₹22.5 lakh.",
  ],
  faq: [
    {
      pregunta: "Can I withdraw money before maturity?",
      respuesta:
        "Up to 50% of the balance at the end of the previous financial year can be taken out for your daughter's education, once she turns 18 or passes tenth standard, whichever comes first.",
    },
    {
      pregunta: "What if I miss a year's deposit?",
      respuesta: "The account becomes a default account. You can revive it within the 15 years by paying the minimum deposit for each missed year plus a penalty of ₹50 a year.",
    },
    {
      pregunta: "Does the rate stay fixed?",
      respuesta: "No. The government reviews it every quarter and the rate applies to the whole balance, so the final amount will differ from this estimate.",
    },
  ],
  glosario: [
    { termino: "SSY", definicion: "Sukanya Samriddhi Yojana, the government savings scheme for a girl child." },
    { termino: "Guardian", definicion: "The parent or legal guardian who opens and runs the account until the girl is 18." },
    { termino: "Maturity", definicion: "21 years from the date the account was opened." },
  ],
});
