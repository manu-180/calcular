import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.annual-leave-calculator",
  h1: "Annual leave calculator Mauritius",
  title: "Annual leave in Mauritius: how many days you get",
  description:
    "Count your annual leave under the Workers' Rights Act: {{mu.annual-leave-days}} after 12 months plus {{mu.extra-leave-days}} for every worker, and the part-time formula.",
  intro: [
    "Annual leave is paid time off you earn by working for the same employer. The Workers' Rights Act 2019 sets the minimum.",
    "Enter how long you have worked there and how many days you have already taken.",
  ],
  comoSeCalcula: [
    "After 12 months of continuous employment you get {{mu.annual-leave-days}} of annual leave in each following 12-month period.",
    "Every worker also gets {{mu.extra-leave-days}} of leave a year on top of that.",
    "A part-time worker gets the days a week they work, divided by the days a comparable full-time worker works, times {{mu.annual-leave-days}}.",
    "In the first year, after 6 months with no absence, a full-time worker earns one day a month up to the twelfth month.",
  ],
  ejemplo: ["A full-time worker with two years of service gets 22 days. After taking 5, 17 are left."],
  faq: [
    {
      pregunta: "What happens to leave I do not take?",
      respuesta: "Your employer pays you a normal day's wage for each day left at the end of the 12 months. You can instead choose in writing to carry the days over, and any carried days are refunded when you leave.",
    },
    {
      pregunta: "Who decides when I take my leave?",
      respuesta: "If you cannot agree, your employer fixes half of the leave and you fix the other half. For more than one day in a row, give at least 48 hours' written notice.",
    },
    {
      pregunta: "Can I give up my annual leave?",
      respuesta: "No. Any agreement to give up your leave is null and void.",
    },
  ],
  glosario: [{ termino: "Annual leave", definicion: "Paid days off you earn each year with the same employer." }],
});
