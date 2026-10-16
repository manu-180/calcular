import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.parental-leave-pay",
  h1: "Paid parental leave calculator NZ",
  title: "Paid parental leave NZ calculator: weekly payment",
  description:
    "Work out your New Zealand paid parental leave: up to {{nz.parental-leave-max-weekly}} a week before tax for {{nz.parental-leave-weeks}} weeks. For employees and self-employed parents.",
  intro: [
    "Paid parental leave replaces your income while you care for a new baby or a child who comes into your care. Inland Revenue pays it for up to {{nz.parental-leave-weeks}} weeks.",
    "The most you can get is {{nz.parental-leave-max-weekly}} a week before tax. Self-employed parents get at least {{nz.parental-leave-self-employed-min}} a week.",
  ],
  comoSeCalcula: [
    "Employees: Inland Revenue takes the higher of your ordinary weekly pay and your average weekly income. The average is your earnings in your best 26 weeks of the 52 weeks before the due date, divided by 26.",
    "Self-employed: your net income (turnover less expenses, before tax) for the last 12 months divided by 52, or for the last 6 months divided by 26, whichever is higher.",
    "The result is capped at {{nz.parental-leave-max-weekly}} a week.",
  ],
  ejemplo: [
    "Hannah's ordinary weekly pay is $1,100 and her best 26 weeks average $1,037.69. The higher figure is over the cap, so she gets $811.05 a week, or $1,622.10 a fortnight before tax.",
  ],
  faq: [
    {
      pregunta: "How long do parental leave payments last?",
      respuesta: "Up to {{nz.parental-leave-weeks}} weeks. They stop early if you go back to work or stop being the child's primary carer.",
    },
    {
      pregunta: "Is paid parental leave taxed?",
      respuesta: "Yes. The amounts here are before tax, so what reaches your bank account is lower.",
    },
    {
      pregunta: "When does the maximum go up?",
      respuesta: "It's reviewed each year from 1 July. It rose to $811.05 a week from 1 July 2026, up from $788.66.",
    },
  ],
  glosario: [
    { termino: "Primary carer", definicion: "The person with the main day-to-day care of the child." },
    { termino: "Average weekly income", definicion: "Your earnings in your best 26 of the last 52 weeks, divided by 26." },
  ],
});
