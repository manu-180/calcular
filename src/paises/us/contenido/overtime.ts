import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.overtime",
  h1: "Overtime pay calculator",
  title: "Overtime Calculator: time and a half pay for your week",
  description:
    "Calculate your overtime pay under federal law: time and a half for every hour over {{us.overtime-hours}} in a workweek. See regular pay, overtime pay and your weekly total.",
  intro: [
    "Under the Fair Labor Standards Act, most hourly workers earn at least one and a half times their regular rate for hours over {{us.overtime-hours}} in a workweek.",
    "Enter your hourly rate and the hours you worked to see your pay for the week.",
  ],
  comoSeCalcula: [
    "Regular hours are the first {{us.overtime-hours}} of the workweek, paid at your normal rate.",
    "Every hour after that is paid at your rate times {{us.overtime-multiplier}}.",
    "The premium is the extra half you earn on each overtime hour. It is the part covered by the federal deduction for qualified overtime.",
  ],
  ejemplo: ["At $20 an hour and 45 hours, you earn $800 for the first 40 hours and $150 for 5 overtime hours at $30. The week pays $950."],
  faq: [
    {
      pregunta: "Is overtime counted per day or per week?",
      respuesta: "Federal law counts per workweek, a fixed period of 168 hours. A few states also pay overtime after 8 hours in one day.",
    },
    {
      pregunta: "Who doesn't get overtime?",
      respuesta:
        "Exempt employees, mainly salaried managers, administrators and professionals who meet the Department of Labor's salary and duties tests. Some jobs, like certain farm and transportation work, follow special rules.",
    },
    {
      pregunta: "Do bonuses change my overtime rate?",
      respuesta: "Often yes. Nondiscretionary bonuses, like production or attendance bonuses, must be added to the regular rate before figuring overtime.",
    },
    {
      pregunta: "Is overtime pay taxed?",
      respuesta: "Yes, it is withheld like regular pay. From 2025 through 2028 you may deduct the premium part on your federal return, up to a yearly cap.",
    },
  ],
  glosario: [
    { termino: "Workweek", definicion: "Seven straight 24-hour days set by your employer. Overtime is counted inside each workweek." },
    { termino: "Regular rate", definicion: "Your hourly pay plus certain bonuses and shift differentials, used to figure the overtime rate." },
  ],
});
