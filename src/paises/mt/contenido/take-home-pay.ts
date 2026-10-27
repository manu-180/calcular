import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.take-home-pay",
  h1: "Take-home pay calculator Malta 2026",
  title: "Net salary Malta 2026: take-home pay after tax and SSC",
  description:
    "Work out your net salary in Malta after income tax and Class 1 social security, with the statutory bonuses and the 2026 single, married and parent rates.",
  intro: [
    "Enter your gross basic salary and the tax rates that apply to you. You get your take-home pay a year, a month and a week.",
    "Malta pays four statutory payments on top of the basic salary: two bonuses and two weekly allowances. They are taxed but do not pay social security.",
  ],
  comoSeCalcula: [
    "Income tax is worked out on the basic salary plus the statutory payments, using the 2026 rates for your status.",
    "Class 1 social security is 10% of the basic weekly wage, with a fixed amount for low wages and a weekly cap that depends on your year of birth.",
    "Take-home pay is the gross amount less tax and social security.",
  ],
  ejemplo: ["A single person on €30,000 a year, with the statutory bonuses, pays tax on €30,512.52 and 10% social security on a basic weekly wage of €576.92."],
  faq: [
    {
      pregunta: "Are the statutory bonuses taxed?",
      respuesta: "Yes. They count as income for tax, but no social security is paid on them.",
    },
    {
      pregunta: "Why does my year of birth matter?",
      respuesta: "The weekly social security cap is higher for people born on or after 1 January 1962, whose pensions are worked out on a higher maximum income.",
    },
    {
      pregunta: "Does this include overtime?",
      respuesta: "No. Overtime can be taxed at a flat rate if you qualify, so it is left out here. Use the overtime tax calculator for that part.",
    },
  ],
  glosario: [
    { termino: "Basic salary", definicion: "Your wage before overtime, bonuses and allowances. Social security is worked out on it." },
    { termino: "Statutory bonus", definicion: "A fixed payment every employee gets in June and December, plus the weekly allowance in March and September." },
  ],
});
