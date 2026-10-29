import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.notice-period-calculator",
  h1: "Notice period calculator Samoa {{anio}}",
  title: "Notice period calculator Samoa {{anio}}: weeks and pay",
  description: "Find the notice period the Labour and Employment Relations Act sets for your length of service, from {{ws.notice-weeks[m3-y1]}} week to {{ws.notice-weeks[y19]}} weeks, and the pay in its place.",
  intro: [
    "The notice an employer or employee must give in Samoa depends on how long the employee has worked there. Schedule 2 of the Labour and Employment Relations Act 2013 starts at {{ws.notice-weeks[m3-y1]}} week for service of three months to under a year, and tops out at {{ws.notice-weeks[y19]}} weeks after more than 19 years.",
    "Enter the first day of employment, the date notice is given and your monthly pay. You get the notice period, the day it ends and the pay an employer owes if it pays instead of letting you work the notice.",
  ],
  comoSeCalcula: [
    "Service is counted in complete months from the first day of employment to the day notice is given.",
    "The notice weeks come from Schedule 2: {{ws.notice-weeks[y1-y4]}} weeks for 1 to under 4 years, {{ws.notice-weeks[y4-y7]}} for 4 to under 7, {{ws.notice-weeks[y7-y10]}} for 7 to under 10, {{ws.notice-weeks[y10-y13]}} for 10 to under 13, {{ws.notice-weeks[y13-y16]}} for 13 to under 16 and {{ws.notice-weeks[y16-y19]}} for 16 to under 19 years.",
    "Pay instead of notice is the notice weeks times weekly pay at the full rate, which covers bonuses, allowances and overtime worked. Weekly pay here is monthly pay times 12, divided by 52.",
  ],
  ejemplo: [
    "An employee who started on 15 March 2020 and is given notice on 29 October 2026 has 79 months of service, which falls between 4 and 7 years. The notice is 3 weeks and ends on 19 November 2026. On WST 3,000 a month, pay instead of notice is WST 2,076.92.",
  ],
  faq: [
    {
      pregunta: "Who does not have to be given notice?",
      respuesta: "Section 56 removes the notice requirement for seasonal employees, trainees at the end of a training agreement and casual employees who have worked for the same employer for under two months.",
    },
    {
      pregunta: "Can the employer pay me instead of letting me work the notice?",
      respuesta: "Yes. Section 55 allows payment in lieu, which has to equal or exceed the full rate of pay for the minimum notice period. Annual leave owing is paid as well.",
    },
    {
      pregunta: "What if I leave without giving notice?",
      respuesta: "Section 54 lets the employer keep earned wages owing to you, up to the value of the notice period you failed to give.",
    },
  ],
  glosario: [
    { termino: "Schedule 2", definicion: "The table in the Act that links length of service to notice weeks." },
    { termino: "Payment in lieu", definicion: "Money paid instead of working out the notice period." },
    { termino: "Full rate of pay", definicion: "Pay including bonuses, allowances and overtime worked." },
  ],
});
