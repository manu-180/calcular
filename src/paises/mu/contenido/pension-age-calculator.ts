import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.pension-age-calculator",
  h1: "Pension age calculator Mauritius",
  title: "Pension age in Mauritius: when you get your pension",
  description:
    "Find your pension age under the 2026 reform, the earliest month you can claim and your State Age Pension, from a basis of {{mu.state-age-pension-3a}} a month.",
  intro: [
    "Mauritius is raising the age for the basic pension from 60 to 65, one year for each group turning 60. The Finance Act 2026 also created the State Age Pension.",
    "Enter your date of birth to see your pension age. Add a start month to see how claiming early or late changes the amount.",
  ],
  comoSeCalcula: [
    "If you turned 60 before September 2025, your pension age is 60. If you turn 60 between September 2025 and August 2026, it is 61, and it rises by one year for each later group up to 65 for people turning 60 from September 2029.",
    "The basic retirement pension is {{mu.basic-pension}} a month. The State Age Pension is worked out on {{mu.state-age-pension-3a}} for people turning 60 from January 2026 to August 2029, and on {{mu.state-age-pension-3b}} for people turning 60 from September 2029.",
    "Each month you claim before pension age cuts the amount by {{mu.pension-early-reduction}}. Each month you wait after pension age adds {{mu.pension-deferral-before-65}} up to 65 and {{mu.pension-deferral-after-65}} from 65 to 70.",
  ],
  ejemplo: ["Someone born on 15 March 1967 turns 60 in March 2027 and reaches pension age 62 in March 2029. Claiming at 60 cuts the pension by 12%."],
  faq: [
    {
      pregunta: "Can I claim at 60?",
      respuesta: "Yes if you turn 60 from January 2027, with the monthly reduction. If you turn 60 during 2026, the earliest is January 2027.",
    },
    {
      pregunta: "Can I change my mind after choosing?",
      respuesta: "No. The Act says the choice to start early or late cannot be reversed.",
    },
    {
      pregunta: "Does the pension rise over time?",
      respuesta: "Yes. The Act adds fixed amounts at 65, 75, 90 and 100, and a yearly increase that takes the cost of living into account.",
    },
  ],
  glosario: [
    { termino: "Pension age", definicion: "The age at which you get the full pension without a reduction." },
    { termino: "State Age Pension", definicion: "The pension paid in place of the basic retirement pension under the 2026 reform." },
  ],
});
