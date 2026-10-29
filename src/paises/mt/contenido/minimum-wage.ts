import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.minimum-wage",
  h1: "Minimum wage calculator Malta {{anio}}",
  title: "Minimum wage Malta {{anio}}: {{mt.minimum-wage[age-18-plus]}} a week",
  description:
    "The national minimum wage in Malta is {{mt.minimum-wage[age-18-plus]}} a week from {{mt.minimum-wage#desde}}. See the hourly rate, part-time pay and the yearly total with bonuses.",
  intro: [
    "Since {{mt.minimum-wage#desde}} the national minimum wage for a whole-time worker aged 18 or over is {{mt.minimum-wage[age-18-plus]}} a week.",
    "At 17 it is {{mt.minimum-wage[age-17]}} and under 17 it is {{mt.minimum-wage[under-17]}}. Pick your age and hours to see your minimum pay.",
  ],
  comoSeCalcula: [
    "The weekly minimum is for a normal 40-hour week. The hourly minimum is the weekly figure divided by 40, rounded to the cent.",
    "Part-time workers get the same hourly rate for the hours they work.",
    "On top of the weekly wage every employee gets the statutory bonus of {{mt.statutory-bonuses[bonus]}} in June and December and the weekly allowance of {{mt.statutory-bonuses[allowance]}} in March and September, pro rata for part-time work.",
  ],
  ejemplo: ["A whole-time worker aged 18 or over earns at least {{mt.minimum-wage[age-18-plus]}} a week, about €994.24 a month, and €12,443.40 a year with the statutory bonuses."],
  faq: [
    {
      pregunta: "Does the minimum wage go up every year?",
      respuesta:
        "It has gone up every January for many years, through a national standard order. The rates for 2026 come from Legal Notice 289 of 2025, and a separate order adds the cost of living increase to wages above the minimum.",
    },
    {
      pregunta: "Can my sector pay more than this?",
      respuesta: "Yes. Many sectors have a Wage Regulation Order with its own minimum rates. If one applies to you, its rates count when they are higher.",
    },
    {
      pregunta: "How is the minimum worked out for part-time work?",
      respuesta:
        "At the same hourly rate as a comparable whole-time employee. Where no Wage Regulation Order applies, that is the national minimum wage divided by 40.",
    },
  ],
  glosario: [
    { termino: "National minimum wage", definicion: "The lowest weekly wage for a normal working week that an employer can pay a whole-time employee." },
    { termino: "Wage Regulation Order", definicion: "A legal notice that sets minimum pay and conditions for a sector." },
  ],
});
