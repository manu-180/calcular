import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.overtime-calculator",
  h1: "Overtime calculator Samoa {{anio}}",
  title: "Overtime calculator Samoa {{anio}}: time and a half",
  description: "Work out overtime pay at {{ws.overtime-multiplier}} times your ordinary rate, or double pay for a public holiday you are asked to work. Based on the Labour Act.",
  intro: [
    "In Samoa an employee who works extra hours at the employer's request is paid at least {{ws.overtime-multiplier}} times the ordinary rate. Working a public holiday that is not a normal working day is paid at {{ws.public-holiday-multiplier}} times.",
    "Enter your pay, the hours and the kind of work. If you give a monthly pay, the calculator turns it into an hourly rate first.",
  ],
  comoSeCalcula: [
    "Overtime starts when work goes beyond 8 hours in a day, or beyond {{ws.standard-week-hours}} hours in a week if the extra hours have not already been paid as daily overtime. Section 48 of the Labour and Employment Relations Act 2013 sets the rate at no less than {{ws.overtime-multiplier}} times the ordinary rate.",
    "For a public holiday that is not a day you would normally work, section 39 gives you double pay, or ordinary pay plus another day off in place of the holiday.",
    "From a monthly pay, the hourly rate is monthly pay times 12, divided by 52 weeks and by {{ws.standard-week-hours}} hours.",
  ],
  ejemplo: [
    "With an ordinary rate of WS$20 an hour, an hour of overtime is paid at WS$30. Ten hours of overtime come to WS$300. Eight hours on a public holiday at double pay come to WS$320.",
  ],
  faq: [
    {
      pregunta: "Can I take time off instead of overtime pay?",
      respuesta: "Yes, if you ask. Section 48 lets an employer grant time off in lieu of overtime when the employee requests it.",
    },
    {
      pregunta: "Does overtime apply to managers?",
      respuesta: "A contract can switch off overtime pay for managerial staff who are paid an annual salary that already covers likely extra hours. Domestic workers follow Schedule 3 of the Act instead.",
    },
    {
      pregunta: "How many hours a week is normal?",
      respuesta: "Section 47 sets {{ws.standard-week-hours}} hours a week and 8 hours a day, with at least 36 consecutive hours of rest in any 7 days.",
    },
  ],
  glosario: [
    { termino: "Ordinary rate", definicion: "The pay for one normal working hour." },
    { termino: "Time in lieu", definicion: "Paid time off taken instead of overtime pay." },
    { termino: "Shift work", definicion: "Regular rotating hours, which have their own overtime rule in section 49." },
  ],
});
