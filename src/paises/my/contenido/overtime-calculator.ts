import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.overtime-calculator",
  h1: "Overtime calculator Malaysia",
  title: "Overtime calculator: Employment Act rates for OT pay",
  description: "Work out overtime, rest day and public holiday pay with the minimum rates set by the Employment Act 1955 for monthly-paid employees.",
  intro: [
    "Enter your monthly wages, your normal hours and the extra hours you worked to see what the Employment Act says you should be paid for them.",
    "Your daily rate is your monthly wages divided by {{my.ordinary-rate-divisor}}, and your hourly rate is that divided by your normal hours a day.",
  ],
  comoSeCalcula: [
    "Overtime on a normal working day: at least {{my.overtime-multipliers[overtime]}} times your hourly rate.",
    "Work on a rest day: half a day's wages if you work half your normal hours or less, a full day's wages if you work more.",
    "Hours beyond your normal hours on a rest day: at least {{my.overtime-multipliers[rest-day-overtime]}} times your hourly rate.",
    "Work on a paid public holiday: {{my.overtime-multipliers[public-holiday]}} days' wages on top of your holiday pay, and at least {{my.overtime-multipliers[public-holiday-overtime]}} times your hourly rate for hours beyond your normal hours.",
  ],
  ejemplo: [
    "On RM3,000 a month and 8 hours a day, your daily rate is RM115.38 and your hourly rate RM14.42. Ten hours of overtime on normal days pay RM216.30.",
  ],
  faq: [
    {
      pregunta: "How is the hourly rate worked out for a monthly salary?",
      respuesta: "The Employment Act divides your monthly wages by {{my.ordinary-rate-divisor}} to get your ordinary rate of pay for a day, then divides that by your normal hours of work.",
    },
    {
      pregunta: "What counts as overtime?",
      respuesta:
        "Hours worked beyond your normal hours of work in a day. If you keep working after a spread of ten hours in a day, everything from the end of those ten hours is overtime.",
    },
    {
      pregunta: "How many normal hours can I be asked to work?",
      respuesta: "No more than eight hours a day and {{my.max-normal-hours-week}} hours a week under section 60A of the Employment Act.",
    },
  ],
  glosario: [
    { termino: "Ordinary rate of pay", definicion: "Your wages for one day of normal work. For a monthly salary, the salary divided by {{my.ordinary-rate-divisor}}." },
    { termino: "Rest day", definicion: "Your weekly day off under the Employment Act." },
  ],
});
