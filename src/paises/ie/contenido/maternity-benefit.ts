import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.maternity-benefit",
  h1: "Maternity Benefit calculator Ireland",
  title: "Maternity Benefit Ireland {{anio}}: {{ie.maternity-benefit-weekly}} a week",
  description:
    "Maternity Benefit is {{ie.maternity-benefit-weekly}} a week for {{ie.maternity-benefit-weeks}} weeks. See your total, when your paid leave ends and how it compares with your pay.",
  intro: [
    "Maternity Benefit is a weekly payment from the Department of Social Protection for employed and self-employed people on maternity leave who have enough PRSI contributions.",
    "The full rate is {{ie.maternity-benefit-weekly}} a week for {{ie.maternity-benefit-weeks}} weeks. Enter the first day of your leave to see your dates and total.",
  ],
  comoSeCalcula: [
    "The full weekly rate of {{ie.maternity-benefit-weekly}} is paid for {{ie.maternity-benefit-weeks}} weeks (156 days).",
    "Your paid leave ends {{ie.maternity-benefit-weeks}} weeks after the day it starts.",
    "After that you can take up to {{ie.maternity-unpaid-weeks}} weeks of unpaid maternity leave.",
  ],
  ejemplo: ["If your leave starts on 2 November 2026, you get €299 a week until 2 May 2027, which is €7,774 in total."],
  faq: [
    {
      pregunta: "When can I start my maternity leave?",
      respuesta: "At least two weeks, and no earlier than sixteen weeks, before the end of the week in which your baby is due.",
    },
    {
      pregunta: "How many PRSI contributions do I need?",
      respuesta:
        "One way to qualify is at least 39 weeks of PRSI paid in the 12 months before your leave starts. There are other combinations based on the Relevant Tax Year, listed by the Department.",
    },
    {
      pregunta: "When should I apply?",
      respuesta: "Employees should apply at least six weeks before they plan to start leave. Self-employed people should apply at least 12 weeks before.",
    },
    {
      pregunta: "What if my baby is born early?",
      respuesta: "For a premature birth, Maternity Benefit is paid for an extra period after the usual {{ie.maternity-benefit-weeks}} weeks.",
    },
  ],
  glosario: [
    { termino: "Maternity Benefit", definicion: "The weekly social welfare payment during maternity leave, based on your PRSI contributions." },
    { termino: "Unpaid maternity leave", definicion: "Extra leave you can take after the paid weeks end. You are not paid for it." },
  ],
});
