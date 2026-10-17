import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.daily-rate-calculator",
  h1: "Daily rate of pay calculator Malaysia",
  title: "Daily rate calculator: ordinary rate of pay from salary",
  description: "Turn a monthly or weekly salary into the ordinary rate of pay and hourly rate used by the Employment Act for leave, overtime and holiday pay.",
  intro: [
    "The Employment Act uses your ordinary rate of pay to value annual leave, sick leave, maternity and paternity leave, and overtime.",
    "Enter your salary and normal hours to get the daily and hourly figures.",
  ],
  comoSeCalcula: [
    "Monthly salary: divided by {{my.ordinary-rate-divisor}}.",
    "Weekly salary: divided by {{my.ordinary-rate-divisor-weekly}}.",
    "Hourly rate: the daily rate divided by your normal hours of work a day.",
    "Overtime on a normal working day is at least {{my.overtime-multipliers[overtime]}} times the hourly rate.",
  ],
  ejemplo: ["On RM2,600 a month and 8 hours a day, the ordinary rate of pay is RM100 and the hourly rate RM12.50."],
  faq: [
    {
      pregunta: "Why not divide by the number of days in the month?",
      respuesta: "Section 60I of the Employment Act fixes the formula for monthly-rated employees: monthly rate of pay divided by {{my.ordinary-rate-divisor}}.",
    },
    {
      pregunta: "What if I am paid by the day or the hour?",
      respuesta: "Then the ordinary rate is worked out from the total wages you earned in the previous wage period, so this calculator does not apply.",
    },
    {
      pregunta: "Does the ordinary rate include incentive payments?",
      respuesta: "No. It leaves out payments under an approved incentive scheme and pay for work on rest days or public holidays.",
    },
  ],
  glosario: [
    { termino: "Ordinary rate of pay", definicion: "Wages for one day of normal work under section 60I of the Employment Act." },
    { termino: "Hourly rate of pay", definicion: "The ordinary rate of pay divided by the normal hours of work." },
  ],
});
