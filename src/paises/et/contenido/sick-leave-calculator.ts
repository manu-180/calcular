import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.sick-leave-calculator",
  h1: "Sick leave pay calculator Ethiopia",
  title: "Sick leave pay in Ethiopia: full, half and unpaid",
  description:
    "See your pay during sick leave under Article 86 of the Labour Proclamation: {{et.sick-full-months}} on full pay, {{et.sick-half-months}} at {{et.sick-half-rate}} and the rest unpaid.",
  intro: [
    "After probation, a worker who cannot work because of illness has a right to sick leave of up to six months in any 12-month period. Enter your salary and the days you have been off to see what you are paid.",
  ],
  comoSeCalcula: [
    "First {{et.sick-full-months}} of sick leave: full pay.",
    "Next {{et.sick-half-months}}: {{et.sick-half-rate}} of your wage.",
    "Next {{et.sick-unpaid-months}}: no pay.",
    "The calculator counts a month as 30 days and a day's pay as your monthly salary divided by 30.",
  ],
  ejemplo: [
    "With a salary of ETB 9,000, 75 days off pay ETB 9,000 for the first 30 days and ETB 6,750 for the next 45: ETB 15,750.",
  ],
  faq: [
    {
      pregunta: "Do I need a medical certificate?",
      respuesta: "Yes. Unless a collective agreement or work rules say otherwise, sick leave is granted on a valid certificate from a recognised medical facility.",
    },
    {
      pregunta: "When do I have to tell my employer?",
      respuesta: "On the day after you are absent, unless the employer already knows or it is impractical.",
    },
    {
      pregunta: "Does this cover an injury at work?",
      respuesta: "No. Article 85 covers sickness other than employment injury, which has its own rules.",
    },
  ],
  glosario: [
    { termino: "Sick leave", definicion: "Leave for a worker who cannot work because of illness, after probation." },
    { termino: "12-month period", definicion: "Counted from the first day of the illness." },
  ],
});
