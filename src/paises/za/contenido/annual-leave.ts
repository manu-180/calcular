import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.annual-leave",
  h1: "Annual leave calculator",
  title: "Annual leave calculator: BCEA leave days and leave pay",
  description: "Work out your annual leave under the BCEA: {{za.annual-leave-days}} consecutive days a year, the leave you have built up and what it is worth in pay.",
  intro: [
    "Enter your salary and how many days a week you work. You get your leave days for a full year, the value of a day's leave and, if you add the days worked, the leave you have built up.",
    "The Basic Conditions of Employment Act gives at least {{za.annual-leave-days}} consecutive days of paid leave for each 12-month leave cycle.",
  ],
  comoSeCalcula: [
    "{{za.annual-leave-days}} consecutive days are three calendar weeks. On a five-day week that is 15 working days; on a six-day week, 18.",
    "By agreement, leave can also build up at one day for every {{za.leave-accrual-days}} days worked. That is also the rule for paying out leave when a job ends.",
    "A day of leave is worth your monthly salary divided by {{za.weeks-per-month}} weeks and by the days you work in a week.",
  ],
  ejemplo: ["On R15 000 a month and a five-day week you get 15 working days of leave, worth R692,36 a day."],
  faq: [
    {
      pregunta: "Can my employer pay me instead of giving me leave?",
      respuesta: "Only when your employment ends. While you work there, your employer has to give you the leave, not pay it out.",
    },
    {
      pregunta: "By when must I get my leave?",
      respuesta: "Your employer must grant your annual leave no later than six months after the end of the leave cycle.",
    },
    {
      pregunta: "What if a public holiday falls during my leave?",
      respuesta: "If it falls on a day you would normally have worked, you get an extra day of paid leave.",
    },
    {
      pregunta: "Am I paid out leave if I resign before a full year?",
      respuesta: "Yes, if you have worked there for more than four months. You get one day's pay for every {{za.leave-accrual-days}} days worked in the unfinished leave cycle.",
    },
  ],
  glosario: [
    { termino: "Leave cycle", definicion: "Each 12-month period with the same employer, counted from the day you started." },
    { termino: "BCEA", definicion: "Basic Conditions of Employment Act, 1997, which sets the minimum leave every employee gets." },
  ],
});
