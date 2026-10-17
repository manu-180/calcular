import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.payment-in-lieu-of-notice",
  h1: "Payment in lieu of notice calculator Hong Kong",
  title: "Payment in lieu of notice Hong Kong: how much",
  description:
    "Work out the wages in lieu of notice under the Employment Ordinance, based on your average wages in the 12 months before notice was given.",
  intro: [
    "In Hong Kong either side can end a job by giving notice or paying wages instead of it. That payment is called payment in lieu of notice.",
    "Enter the notice period and your wages over the last 12 months to see how much it should be.",
  ],
  comoSeCalcula: [
    "For notice in months: average monthly wages over the last 12 months × the months of notice.",
    "For notice in days or weeks: average daily wages × the days in the notice period for which wages would normally be paid.",
    "Days without full pay, and what was paid for them, are left out of the average.",
  ],
  ejemplo: ["On a steady $18,000 a month, one month's notice is worth $18,000."],
  faq: [
    {
      pregunta: "How long is the notice period in Hong Kong?",
      respuesta: "On a continuous contract, what the contract says but not less than 7 days. If the contract doesn't say, at least one month.",
    },
    {
      pregunta: "Is notice needed during probation?",
      respuesta: "Not in the first month of probation. After that, what the contract says but at least 7 days.",
    },
    {
      pregunta: "When must payment in lieu of notice be paid?",
      respuesta: "As soon as practicable and no later than 7 days after the contract ends.",
    },
  ],
  glosario: [
    { termino: "Payment in lieu of notice", definicion: "Wages paid instead of working the notice period." },
    { termino: "Summary dismissal", definicion: "Dismissal without notice or payment in lieu, only allowed for serious misconduct." },
  ],
});
