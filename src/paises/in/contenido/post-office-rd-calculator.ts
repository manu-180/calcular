import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.post-office-rd-calculator",
  h1: "Post Office RD calculator",
  title: "Post Office RD calculator: 5-year recurring deposit",
  description: "Estimate the maturity value of a 5-year post office recurring deposit at {{in.small-savings-rates[rd]}}, compounded every quarter.",
  intro: [
    "A post office recurring deposit lets you save a fixed amount every month for five years. Enter your monthly deposit to see the maturity value.",
  ],
  comoSeCalcula: [
    "You make 60 monthly deposits. Interest at {{in.small-savings-rates[rd]}} a year is compounded every quarter.",
    "Each deposit grows for the months left until maturity: the first one for 60 months, the last one for one month.",
    "This is an estimate. Rounding can make the amount on your passbook differ by a few rupees.",
  ],
  ejemplo: ["Saving ₹10,000 a month for five years at 6.7% gives about ₹7,13,658. You deposit ₹6 lakh."],
  faq: [
    {
      pregunta: "Does the rate change during the five years?",
      respuesta: "The rate shown is the one announced for October to December 2026. Check the rate in force on the day you open the account.",
    },
    {
      pregunta: "Is RD interest taxed?",
      respuesta: "Yes. The interest is part of your income and taxed at your slab rate.",
    },
    {
      pregunta: "RD or SIP?",
      respuesta: "An RD gives a known amount backed by the government. A SIP in a mutual fund can earn more or less. Compare with the SIP calculator.",
    },
  ],
  glosario: [
    { termino: "RD", definicion: "Recurring deposit: a fixed amount saved every month for a set period." },
    { termino: "Quarterly compounding", definicion: "Interest added to the balance every three months." },
  ],
});
