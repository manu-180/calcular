import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sc.annual-leave-calculator",
  h1: "Seychelles annual leave calculator {{anio}}",
  title: "Seychelles annual leave {{anio}}: {{sc.annual-leave-days}} working days",
  description: "Workers in Seychelles earn {{sc.annual-leave-days}} days of paid leave a year, or {{sc.leave-days-per-month}} days for each month if employed for less. Find your balance.",
  intro: [
    "A worker on a continuous or fixed-term contract earns {{sc.annual-leave-days}} working days of paid annual leave in a full year. Casual and part-time workers follow separate rules.",
    "If you have worked for less than a year, you earn {{sc.leave-days-per-month}} days for each month and the total is rounded up to the next whole day.",
  ],
  comoSeCalcula: [
    "For a full year of employment the entitlement is {{sc.annual-leave-days}} days.",
    "For a part year, multiply the months worked by {{sc.leave-days-per-month}} and round up.",
    "Add any days carried over and take away the days you have used. Saturdays, Sundays and public holidays do not count as leave days.",
  ],
  ejemplo: [
    "You joined seven months ago. Seven times 1.75 is 12.25 days, rounded up to 13 days. If you have taken 3 of them, 10 days are left.",
  ],
  faq: [
    {
      pregunta: "Must I take my leave every year?",
      respuesta: "Your employer must see that you take a block of at least 14 consecutive days in a year, unless you agree to accumulate your leave. Leave not taken may be carried over.",
    },
    {
      pregunta: "Can leave be paid out in cash?",
      respuesta: "Yes, if you and your employer agree, the leave of a year may be converted into cash. Above 42 accumulated days, each extra day is paid at one and a half times the normal pay.",
    },
    {
      pregunta: "What about casual and part-time workers?",
      respuesta: "A casual worker who has worked 5 consecutive days is entitled to half a day's pay in lieu of leave. A part-time worker gets leave in proportion to the hours worked.",
    },
  ],
  glosario: [
    { termino: "Working day", definicion: "A day on which you would normally work. Weekends and public holidays are excluded when leave is counted." },
    { termino: "Carry over", definicion: "Leave not taken in a year and kept for later years." },
    { termino: "Cash conversion", definicion: "Payment of untaken leave instead of time off, by agreement." },
  ],
});
