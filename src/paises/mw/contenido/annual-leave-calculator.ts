import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.annual-leave-calculator",
  h1: "Annual leave calculator Malawi",
  title: "Annual leave calculator Malawi: 15 or 18 working days",
  description:
    "Work out your paid annual leave under the Employment Act: {{mw.leave-five-day-week}} on a five-day week, {{mw.leave-six-day-week}} on a six-day week, and less if you worked part of the year.",
  intro: [
    "Choose how many days you work each week and how many months you worked to see the paid leave you have earned.",
    "Add your daily wage to see what that leave is worth, for example when your job ends.",
  ],
  comoSeCalcula: [
    "A full year gives at least {{mw.leave-five-day-week}} if you work five days a week and {{mw.leave-six-day-week}} if you work six.",
    "If you worked only part of the year, you get leave in proportion to your service: months worked divided by 12.",
    "Leave pay is at least the wage you were earning right before the leave or before your job ended.",
  ],
  ejemplo: ["After seven months on a five-day week you have earned 8.75 days. At K10,000 a day that is K87,500."],
  faq: [
    {
      pregunta: "When do I have to take my leave?",
      respuesta: "Within six months of the end of the year it was earned for, on a date your employer sets after talking to you. You and your employer can agree to carry it forward.",
    },
    {
      pregunta: "What happens to unused leave when I leave the job?",
      respuesta: "Your employer has to pay you for any leave you earned but did not take before your employment ended.",
    },
    {
      pregunta: "What if a public holiday falls during my leave?",
      respuesta: "Your leave is extended by one working day on full pay for each public holiday that falls on what would have been a working day.",
    },
  ],
  glosario: [
    { termino: "Working day", definicion: "A day you would normally work. Weekly rest days and public holidays do not count." },
    { termino: "Leave pay", definicion: "Your normal wage for the days of leave." },
  ],
});
