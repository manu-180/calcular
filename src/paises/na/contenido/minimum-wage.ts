import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.minimum-wage",
  h1: "Minimum wage in Namibia",
  title: "Minimum wage Namibia {{anio}}: hourly and monthly",
  description:
    "The national minimum wage is {{na.minimum-wage[general]}} an hour. Domestic, farm and security workers move up to it by 2027. See the monthly amount for your hours.",
  intro: [
    "Namibia has had a national minimum wage since 1 January 2025. It applies to every employee except the defence force, police, intelligence service and correctional service.",
    "Pick your type of work and your weekly hours to see the minimum per hour, per week and per month, and check your own pay against it.",
  ],
  comoSeCalcula: [
    "Most employees: {{na.minimum-wage[general]}} an hour. Domestic workers: {{na.minimum-wage[domestic]}}. Agricultural workers: {{na.minimum-wage[agricultural]}}. Security workers: {{na.minimum-wage[security]}}.",
    "The weekly minimum is the hourly rate times your ordinary hours.",
    "The monthly minimum is the weekly amount times {{na.weeks-per-month}}, the factor the Labour Act uses to turn weekly pay into monthly pay.",
  ],
  ejemplo: ["At N$18 an hour and 45 hours a week, the minimum is N$810 a week and N$3,509.73 a month."],
  faq: [
    {
      pregunta: "When do domestic, farm and security workers get the full minimum wage?",
      respuesta: "The wage order raises their rates every January. From 1 January 2027 domestic, agricultural and security workers all earn at least the general rate.",
    },
    {
      pregunta: "Can my employer count food or housing as part of my wage?",
      respuesta: "No. The order says the employer must not deduct the value of payments in kind such as food, clothing or housing from your pay.",
    },
    {
      pregunta: "What counts towards the minimum wage?",
      respuesta: "Only money paid for ordinary hours of work. Allowances, overtime, Sunday and public holiday pay, night work pay, tips, bonuses and pension or medical contributions are left out.",
    },
    {
      pregunta: "How often is the minimum wage reviewed?",
      respuesta: "The Wages Commission must review the order every two years, on top of any yearly inflation increase allowed by the Labour Act.",
    },
  ],
  glosario: [
    { termino: "Wage order", definicion: "A notice in the Government Gazette that sets a minimum wage under section 13 of the Labour Act." },
    { termino: "Ordinary hours", definicion: "Your normal working hours, up to 45 a week for most employees, without overtime." },
  ],
});
