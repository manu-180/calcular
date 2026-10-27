import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.statutory-bonus",
  h1: "Statutory bonus and weekly allowance calculator Malta",
  title: "Statutory bonus Malta {{anio}}: {{mt.statutory-bonuses[bonus]}} in June and December",
  description:
    "Work out your Malta statutory bonus of {{mt.statutory-bonuses[bonus]}} and weekly allowance of {{mt.statutory-bonuses[allowance]}}, including part of a period and part-time work.",
  intro: [
    "Every employee in Malta gets two statutory bonuses and two weekly allowances a year, on top of the wage.",
    "Pick the payment, say whether you worked the whole six months and enter your weekly hours. You get the amount you should receive.",
  ],
  comoSeCalcula: [
    "The full statutory bonus is {{mt.statutory-bonuses[bonus]}}, paid at the end of June and between 15 and 23 December.",
    "The full weekly allowance is {{mt.statutory-bonuses[allowance]}}, paid at the end of March and at the end of September.",
    "For part of a period, the bonus is {{mt.statutory-bonuses[bonus-per-day]}} for each calendar day, weekends included, and the allowance is {{mt.statutory-bonuses[allowance-per-week]}} for each working week or part of one.",
    "Part-time employees get them pro rata to their hours compared with a whole-time employee.",
  ],
  ejemplo: ["If you started work 92 days before the end of June, your June bonus is 92 × {{mt.statutory-bonuses[bonus-per-day]}} = €68.08."],
  faq: [
    {
      pregunta: "Are the bonuses taxed?",
      respuesta: "Yes. They are part of your income for tax, so FSS tax is deducted from them like from your wage.",
    },
    {
      pregunta: "Do part-time workers get them?",
      respuesta:
        "Yes. The Part-time Employees Regulations give part-timers the statutory bonuses pro rata, in proportion to their hours compared with a comparable whole-time employee.",
    },
    {
      pregunta: "Is the weekly allowance the same as the cost of living increase?",
      respuesta: "No. The weekly allowance is a fixed payment twice a year. The cost of living increase is added to your weekly wage every January.",
    },
  ],
  glosario: [
    { termino: "Statutory bonus", definicion: "A fixed payment that every employee receives in June and in December." },
    { termino: "Weekly allowance", definicion: "A fixed payment that every employee receives in March and in September." },
  ],
});
