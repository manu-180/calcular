import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.annual-leave",
  h1: "Annual leave calculator for Singapore",
  title: "Annual leave calculator Singapore: days you are entitled to",
  description: "Work out your paid annual leave under the Employment Act: {{sg.vacaciones-dias[1]}} in your first year, one more each year, up to {{sg.vacaciones-dias[8]}}. Pro-rates part years.",
  intro: [
    "Employees covered by the Employment Act get paid annual leave that grows with each year of service.",
    "Enter which year of service you are in and how many months of it you have completed to see the days you have earned.",
  ],
  comoSeCalcula: [
    "You get {{sg.vacaciones-dias[1]}} in your first year of service, one more day for each further year, and {{sg.vacaciones-dias[8]}} from your 8th year.",
    "You can take annual leave once you have worked for your employer for {{sg.meses-minimos-licencias}}.",
    "For part of a year, the leave is pro-rated: completed months divided by 12, times your yearly entitlement.",
    "A fraction under half a day is dropped. Half a day or more counts as a full day.",
  ],
  ejemplo: ["In your 4th year (10 days a year), after 4 completed months you have earned 3 days: 4 ÷ 12 × 10 = 3.33, rounded down."],
  faq: [
    {
      pregunta: "When does my year of service start?",
      respuesta: "On the day you start work with your employer. If you started on 14 March, each year of service runs to 13 March of the next year.",
    },
    {
      pregunta: "Does unpaid leave reduce my annual leave?",
      respuesta: "It can. Your employer can pro-rate your leave on the completed months you worked, leaving out approved unpaid leave.",
    },
    {
      pregunta: "Is annual leave counted during my notice period?",
      respuesta: "Yes. If you resign, your notice period is included when your pro-rated annual leave is worked out.",
    },
    {
      pregunta: "What happens to unused leave when my job ends?",
      respuesta: "Unless you were dismissed for misconduct, your employer must pay you for unused annual leave at your gross rate of pay, based on your last drawn salary.",
    },
  ],
  glosario: [
    { termino: "Employment Act", definicion: "Singapore's main labour law, which sets minimum terms such as leave, hours and overtime." },
    { termino: "Pro-rated leave", definicion: "Leave for part of a year, worked out on the completed months of service." },
  ],
});
