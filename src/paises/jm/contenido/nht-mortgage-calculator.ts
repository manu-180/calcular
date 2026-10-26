import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.nht-mortgage-calculator",
  h1: "NHT mortgage calculator",
  title: "NHT mortgage calculator Jamaica: monthly payment and rate",
  description:
    "Estimate your NHT loan payment. The rate goes from {{jm.nht-interest-rates[0].tasa}} to {{jm.nht-interest-rates[-1].tasa}} by weekly income, over up to {{jm.nht-max-years}}.",
  intro: [
    "The National Housing Trust lends to its contributors at low rates. Your interest rate depends on your weekly income band.",
    "Enter the loan, your weekly income and the years to repay to see the monthly payment and the interest you will pay over the life of the loan.",
  ],
  comoSeCalcula: [
    "Weekly income below {{jm.nht-interest-rates[1].desde}}: {{jm.nht-interest-rates[0].tasa}}. From {{jm.nht-interest-rates[1].desde}}: {{jm.nht-interest-rates[1].tasa}}.",
    "From {{jm.nht-interest-rates[2].desde}}: {{jm.nht-interest-rates[2].tasa}}. From {{jm.nht-interest-rates[-1].desde}}: {{jm.nht-interest-rates[-1].tasa}}.",
    "The monthly payment repays the loan in equal instalments of principal and interest over the years you choose, up to {{jm.nht-max-years}}.",
  ],
  ejemplo: ["A J$9,000,000 loan over 30 years on a weekly income of J$45,000 carries 4% interest. The monthly payment is J$42,967.38."],
  faq: [
    {
      pregunta: "How much can I borrow from the NHT?",
      respuesta: "For a house on the open market one applicant can borrow up to {{jm.nht-open-market-limit}}, subject to affordability. Co-applicants can borrow more.",
    },
    {
      pregunta: "What if two of us apply together?",
      respuesta: "The NHT uses the average of all your incomes to set one interest rate for the whole loan.",
    },
    {
      pregunta: "Are there lower rates for public sector workers?",
      respuesta: "Eligible teachers, nurses, firefighters, police and members of the security forces can get up to 2% off: 1% with 5 to 10 years of service and 2% with more than 10.",
    },
  ],
  glosario: [
    { termino: "NHT", definicion: "National Housing Trust, funded by the NHT contributions taken from pay." },
    { termino: "Affordability", definicion: "The NHT check of whether your income and age let you carry the loan payment." },
  ],
});
