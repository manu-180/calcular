import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ws.minimum-wage",
  h1: "Minimum wage Samoa {{anio}}",
  title: "Minimum wage Samoa {{anio}}: hourly, weekly and monthly",
  description: "The current minimum wage in Samoa is {{ws.min-wage-hourly}} an hour, in force since {{ws.min-wage-hourly#desde}}. See it by week, fortnight, month and year.",
  intro: [
    "The minimum wage in Samoa is {{ws.min-wage-hourly}} an hour, in force since {{ws.min-wage-hourly#desde}}. It applies to workers in the private sector and in state-owned enterprises.",
    "Enter the hours you work in a week to see the minimum pay by week, fortnight, month and year. Add your own hourly pay to see how far above or below the minimum you are.",
  ],
  comoSeCalcula: [
    "The rate is set by Cabinet Directive FK(24)25 under section 32 of the Labour and Employment Relations Amendment Act 2023, and the Ministry of Commerce, Industry and Labour publishes it. It rises by steps each 1 July until 2028.",
    "Weekly minimum pay is the hourly rate times your hours. A fortnight is two weeks, a year is 52 weeks and a month is a twelfth of a year.",
    "Ordinary hours are capped at {{ws.standard-week-hours}} a week under section 47 of the Labour and Employment Relations Act 2013. Hours beyond that are overtime and pay more.",
  ],
  ejemplo: [
    "At WS$5.24 an hour, a {{ws.standard-week-hours}} hour week pays at least WS$209.60. That is WS$419.20 a fortnight, WS$908.27 a month and WS$10,899.20 a year.",
  ],
  faq: [
    {
      pregunta: "Who is not covered by the minimum wage?",
      respuesta: "The Ministry of Commerce, Industry and Labour says workers and employers under the Public Service Act 2004 are not covered. The rate is set for the private sector and state-owned enterprises.",
    },
    {
      pregunta: "Will the minimum wage go up again?",
      respuesta: "Yes. The Ministry lists later steps for 1 July 2027 and 1 July 2028. This calculator switches to each new rate on its date, so it shows the one in force on the day you use it.",
    },
    {
      pregunta: "What happens to NPF if an employer pays below the minimum?",
      respuesta: "The NPF Employers Guide says an employer paying under the minimum wage must not deduct the employee share, and pays the whole contribution itself.",
    },
  ],
  glosario: [
    { termino: "Minimum wage", definicion: "The lowest hourly pay an employer covered by the notice may offer." },
    { termino: "Ordinary hours", definicion: "The normal working hours before overtime applies." },
    { termino: "Cabinet Directive", definicion: "The Cabinet decision that sets the minimum wage rate." },
  ],
});
