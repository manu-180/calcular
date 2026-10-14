import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.car-expenses-calculator",
  h1: "Car expenses calculator: cents per km",
  title: "Cents per km car expenses calculator (ATO rates)",
  description: "Work out your work-related car expenses deduction with the ATO cents per kilometre method: {{au.cents-por-km[2025-26]}} a km for 2025-26 and {{au.cents-por-km[2026-27]}} for 2026-27.",
  intro: [
    "If you use your own car for work, the cents per kilometre method lets you claim a set rate for each work-related kilometre, without receipts.",
    "Enter your work-related kilometres and the income year to see your deduction.",
  ],
  comoSeCalcula: [
    "Multiply your work-related kilometres by the rate for the income year: {{au.cents-por-km[2025-26]}} a km for 2025-26 and {{au.cents-por-km[2026-27]}} a km for 2026-27.",
    "You can claim up to {{au.km-maximo}} km per car.",
    "The rate covers all your car costs, including fuel, registration, insurance, repairs and decline in value, so you can't add them on top.",
  ],
  ejemplo: ["2,514 work-related kilometres in 2025-26 at 88 cents give a deduction of $2,212."],
  faq: [
    {
      pregunta: "Do I need a logbook or receipts?",
      respuesta: "No receipts and no logbook. You do need to show that you own the car and how you worked out your kilometres, for example with a diary or the myDeductions tool in the ATO app.",
    },
    {
      pregunta: "Can I estimate my kilometres?",
      respuesta: "Yes, with a reasonable estimate. For example, a 20 km work round trip once a week for 48 weeks is 960 km.",
    },
    {
      pregunta: "What if I travel more than {{au.km-maximo}} km for work?",
      respuesta: "This method stops at {{au.km-maximo}} km per car. The logbook method is the other option the ATO offers.",
    },
  ],
  glosario: [
    { termino: "Work-related kilometres", definicion: "Kilometres your car travels in the course of earning your income." },
    { termino: "Logbook method", definicion: "The other ATO method for claiming the costs of a car you own or lease." },
  ],
});
