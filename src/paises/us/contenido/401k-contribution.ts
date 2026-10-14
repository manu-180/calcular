import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.401k-contribution",
  h1: "401(k) contribution calculator",
  title: "401(k) Contribution Calculator 2026: limits and match",
  description:
    "See how much goes into your 401(k) in 2026, your employer match and the {{us.401k-limit}} limit, with catch-up contributions from 50 and the bigger one at 60 to 63.",
  intro: [
    "Enter your salary, the percentage you save and your employer's match to see what goes into your 401(k) this year.",
    "The calculator applies the IRS limit for your age and tells you what percentage would max it out.",
  ],
  comoSeCalcula: [
    "The 2026 limit on your own contributions is {{us.401k-limit}}.",
    "At age 50 or older you can add a catch-up of {{us.401k-catch-up}}. If you turn 60, 61, 62 or 63 this year, the catch-up is {{us.401k-catch-up-60-63}} instead.",
    "Your contribution is your salary times your percentage, capped at that limit.",
    "The employer match is the match rate applied to your contribution, but only on the part up to the matched percentage of your salary.",
  ],
  ejemplo: ["On a $75,000 salary, saving 6% puts $4,500 in your 401(k). With a 50% match up to 6% of pay, your employer adds $2,250, for $6,750 a year."],
  faq: [
    {
      pregunta: "What is the 401(k) limit for 2026?",
      respuesta: "{{us.401k-limit}} for employee contributions, plus {{us.401k-catch-up}} if you are 50 or older, or {{us.401k-catch-up-60-63}} if you are 60 to 63.",
    },
    {
      pregunta: "Does the employer match count toward my limit?",
      respuesta: "No. The match has its own, much higher combined limit. Only your own pre-tax and Roth contributions count toward the employee limit.",
    },
    {
      pregunta: "Should I contribute at least enough to get the full match?",
      respuesta: "For most people, yes. The match is part of your pay, and contributing less than the matched percentage leaves that money unclaimed.",
    },
    {
      pregunta: "Do catch-up contributions have to be Roth?",
      respuesta: "From 2026, if your Social Security wages from the employer were over the IRS threshold the year before, your catch-up contributions must go into the Roth side of the plan.",
    },
  ],
  glosario: [
    { termino: "Elective deferral", definicion: "The part of your pay you choose to put into the plan, pre-tax or Roth." },
    { termino: "Catch-up contribution", definicion: "An extra amount people 50 or older can contribute above the regular limit." },
    { termino: "Vesting", definicion: "When the employer match becomes fully yours. Your own contributions are always yours." },
  ],
});
