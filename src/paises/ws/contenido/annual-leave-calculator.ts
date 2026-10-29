import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.annual-leave-calculator",
  h1: "Annual leave calculator Samoa {{anio}}",
  title: "Annual leave calculator Samoa {{anio}}: days and pay",
  description: "Find how many of your {{ws.annual-leave-days}} paid annual leave days you have built up, how many are left and what they are worth in pay.",
  intro: [
    "The Labour and Employment Relations Act 2013 gives an employee at least {{ws.annual-leave-days}} of paid annual leave after 12 months of continuous service with the same employer. Time spent on probation counts.",
    "This calculator shows how much leave you have built up, what is left after the days you have taken, and what those days are worth in pay.",
  ],
  comoSeCalcula: [
    "Leave builds up pro rata during the year: {{ws.annual-leave-days}} a year, so one twelfth of that for each month of service.",
    "Days left are the days built up less the days you have taken, never below zero.",
    "One working day of pay is monthly pay times 12, divided by 52 weeks and by the number of days you work a week. The Act does not fix this formula, so it is a standard way to price a day.",
    "An employee can carry forward up to {{ws.leave-carry-forward-days}} of unused leave, and the employer and employee can agree to extend that.",
  ],
  ejemplo: [
    "After 18 months of service you have built up 15 days. If you have taken 5, you have 10 left. On a monthly pay of WS$3,000 for a five day week, one day is worth WS$138.46, so the 10 days are worth WS$1,384.62.",
  ],
  faq: [
    {
      pregunta: "Can I be paid instead of taking my leave?",
      respuesta: "Section 41 of the Act lets an employee choose to have annual leave paid out instead of taking it, but only with the employer's approval.",
    },
    {
      pregunta: "What happens to my leave when I leave the job?",
      respuesta: "Under section 55 an employee whose employment ends is entitled to payment of all annual leave owing, including leave accumulated in a part year of employment.",
    },
    {
      pregunta: "How much leave can I carry into next year?",
      respuesta: "Section 40 allows {{ws.leave-carry-forward-days}} to be carried forward, and the employer and employee can agree on more.",
    },
  ],
  glosario: [
    { termino: "Continuous service", definicion: "Time worked for the same employer without a break, probation included." },
    { termino: "Pro rata", definicion: "In proportion to the time worked." },
    { termino: "Payment in lieu", definicion: "Money paid instead of leave taken." },
  ],
});
