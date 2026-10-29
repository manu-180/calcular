import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.public-holiday-pay-calculator",
  h1: "Public holiday pay calculator Ethiopia",
  title: "Public holiday pay in Ethiopia: work on a holiday",
  description:
    "Worked on a public holiday? See the pay for those hours: {{et.holiday-pay-rate}} times your hourly wage under Article 75 of the Labour Proclamation.",
  intro: [
    "Public holidays are paid holidays in Ethiopia. If you are asked to work on one, Article 75 of the Labour Proclamation sets the pay for each hour you work.",
    "Enter your monthly salary and the hours you worked on public holidays to see the amount.",
  ],
  comoSeCalcula: [
    "Your hourly wage is your monthly salary divided by the normal hours you work in a month.",
    "Each hour worked on a public holiday pays {{et.holiday-pay-rate}} times that hourly wage.",
    "Overtime on a public holiday, beyond your normal daily hours, is paid at a higher multiplier: use our overtime calculator for those hours.",
  ],
  ejemplo: [
    "With a salary of ETB 10,400 and 208 hours a month, eight hours on a public holiday pay ETB 800.",
  ],
  faq: [
    {
      pregunta: "Do I lose pay when a public holiday falls on a working day?",
      respuesta: "No. A worker paid by the month has no reduction in wages for not working on a public holiday.",
    },
    {
      pregunta: "What if two holidays fall on the same day?",
      respuesta: "When a public holiday coincides with another or falls on a rest day set by law, you are paid for only one public holiday for working that day.",
    },
    {
      pregunta: "What about workers paid by the day or by the hour?",
      respuesta: "For them, pay on a public holiday they do not work depends on the contract of employment or the collective agreement.",
    },
  ],
  glosario: [
    { termino: "Public holiday", definicion: "A holiday set by the law on public holidays, paid for all workers." },
    { termino: "Hourly wage", definicion: "Your pay for one normal hour of work." },
  ],
});
