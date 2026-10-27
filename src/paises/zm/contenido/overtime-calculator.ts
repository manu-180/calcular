import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.overtime-calculator",
  h1: "Overtime calculator Zambia",
  title: "Overtime calculator Zambia: time and a half and double time",
  description:
    "Work out overtime under the Employment Code: {{zm.overtime-factor}} times your hourly rate above {{zm.weekly-hours}} a week, double on public holidays and rest days.",
  intro: [
    "Enter your basic pay and the extra hours you worked in the month to see what your employer owes you.",
    "The rules come from sections 74 and 75 of the Employment Code Act, 2019.",
  ],
  comoSeCalcula: [
    "Your hourly rate is your monthly basic pay divided by {{zm.hourly-divisor}}, or by {{zm.guard-hourly-divisor}} if you are a watchperson or guard.",
    "Hours above {{zm.weekly-hours}} a week ({{zm.guard-weekly-hours}} for guards) are paid at {{zm.overtime-factor}} times the hourly rate.",
    "Hours on a public holiday or weekly rest day that is not part of your normal working week are paid at {{zm.rest-day-factor}} times the hourly rate.",
  ],
  ejemplo: [
    "On basic pay of K2,080 the hourly rate is K10. Ten overtime hours earn K150 and eight hours on a public holiday earn K160, K310 in total.",
  ],
  faq: [
    {
      pregunta: "How long is a normal working day?",
      respuesta: "A full-time employee's normal day is eight hours of actual work.",
    },
    {
      pregunta: "Can my employer ask me to work extra hours without pay?",
      respuesta: "Only if you agree and your total stays within {{zm.weekly-hours}} hours a week, or a lower limit in your contract or collective agreement. Above that, overtime has to be paid.",
    },
    {
      pregunta: "What breaks am I entitled to?",
      respuesta: "A one hour meal break each working day, plus one health break of at least 20 minutes or two of at least 10 minutes, unless your contract gives you more.",
    },
  ],
  glosario: [
    { termino: "Hourly rate", definicion: "Monthly basic pay divided by the hours the Employment Code sets for your job." },
    { termino: "Weekly rest day", definicion: "At least 24 hours in a row off work in every seven days." },
  ],
});
