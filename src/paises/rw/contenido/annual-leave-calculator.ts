import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.annual-leave-calculator",
  h1: "Annual leave calculator Rwanda",
  title: "Annual leave in Rwanda: how many days you are owed",
  description: "Work out your paid annual leave: {{rw.leave-days-per-month}} a month, one extra day every {{rw.leave-extra-every-years}} of service, up to {{rw.leave-max-days}}.",
  intro: [
    "The labour law gives every employee paid annual leave that grows with each month worked. Enter your months and years of service to see your days.",
  ],
  comoSeCalcula: [
    "You earn {{rw.leave-days-per-month}} for each month of work, which is 18 working days for a full year.",
    "Employees aged 16 or 17 earn {{rw.leave-days-per-month-minor}} a month.",
    "You get one more day a year for every {{rw.leave-extra-every-years}} with the same enterprise.",
    "Paid annual leave can never go above {{rw.leave-max-days}}.",
  ],
  ejemplo: ["After three years with the same employer, a full year of work gives 18 + 1 = 19 working days of leave."],
  faq: [
    {
      pregunta: "Can my employer pay me instead of giving leave?",
      respuesta: "Not while you are employed: the law says annual leave cannot be paid in cash. If the contract ends before you take it, you receive compensation for the days owed.",
    },
    {
      pregunta: "When does annual leave expire?",
      respuesta: "The right to ask for it lapses two years after the date you became entitled to it.",
    },
    {
      pregunta: "Can I take it in two parts?",
      respuesta: "Yes, if your employer agrees. The employer can also call you back for work reasons, and the remaining days must be taken within six months.",
    },
    {
      pregunta: "Do public holidays count?",
      respuesta: "No. Official public holidays are not part of annual leave.",
    },
  ],
  glosario: [
    { termino: "Working day", definicion: "A day you would normally work, not counting weekly rest or public holidays." },
    { termino: "Annual leave compensation", definicion: "Pay for leave days still owed when the contract ends." },
  ],
});
