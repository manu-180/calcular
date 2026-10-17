import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.annual-leave-calculator",
  h1: "Annual leave calculator",
  title: "Annual leave calculator: hours accrued and leave pay",
  description: "Work out how much annual leave you have accrued under the National Employment Standards, and your leave pay with or without {{au.leave-loading}} leave loading.",
  intro: [
    "Full-time and part-time employees get {{au.vacaciones-semanas}} weeks of paid annual leave a year, based on their ordinary hours. It builds up gradually as you work.",
    "Enter your hours and the weeks you have worked. Add your hourly rate to see what the leave is worth, and choose whether your award pays leave loading.",
  ],
  comoSeCalcula: [
    "A full year of leave is your ordinary weekly hours times {{au.vacaciones-semanas}}.",
    "It accrues in proportion to the weeks you work: hours a week times weeks worked times {{au.vacaciones-semanas}}, divided by 52.",
    "Leave is paid at your base pay rate. If your award or agreement includes leave loading of {{au.leave-loading}}, it is added on top.",
  ],
  ejemplo: ["Working 38 hours a week for 26 weeks gives you 76 hours of annual leave. At $30 an hour with 17.5% loading, that leave is worth $2,679."],
  faq: [
    {
      pregunta: "Do casual employees get annual leave?",
      respuesta: "No. The {{au.vacaciones-semanas}} weeks of annual leave are for full-time and part-time employees.",
    },
    {
      pregunta: "Does everyone get leave loading?",
      respuesta: "No. Leave loading is extra pay set by some awards and enterprise agreements, often {{au.leave-loading}}. It does not apply to all employees, so check yours.",
    },
    {
      pregunta: "Can shiftworkers get more leave?",
      respuesta: "Yes. Shiftworkers can get more than {{au.vacaciones-semanas}} weeks if their award or agreement includes shiftwork provisions and defines them as shiftworkers.",
    },
    {
      pregunta: "What happens to unused leave when my job ends?",
      respuesta: "Unused annual leave is paid out in your final pay, together with any loading your award or agreement includes.",
    },
  ],
  glosario: [
    { termino: "National Employment Standards (NES)", definicion: "The minimum conditions that apply to employees in the national workplace relations system." },
    { termino: "Ordinary hours", definicion: "Your normal hours of work, without overtime." },
    { termino: "Leave loading", definicion: "An extra payment some employees get on top of their base pay when they take annual leave." },
  ],
});
