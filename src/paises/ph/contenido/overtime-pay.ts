import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ph.overtime-pay",
  h1: "Overtime pay calculator Philippines",
  title: "Overtime pay calculator: ordinary days, rest days, holidays",
  description:
    "Compute overtime pay under the Labor Code: {{ph.overtime-premium[ordinary]}} on ordinary days, {{ph.overtime-premium[rest-or-holiday]}} on rest days and holidays, plus night differential.",
  intro: [
    "Work beyond {{ph.normal-hours}} hours a day is overtime and is paid with a premium on top of your hourly rate.",
    "Pick the day you worked, enter your hours and see what your overtime should come to.",
  ],
  comoSeCalcula: [
    "Your hourly rate is your daily wage divided by {{ph.normal-hours}}.",
    "On rest days and holidays the hourly rate first gets the premium of that day: for example {{ph.day-rates[rest-day]}} on a rest day or {{ph.day-rates[regular-holiday]}} on a regular holiday.",
    "Overtime adds {{ph.overtime-premium[ordinary]}} of that hourly rate on ordinary days and {{ph.overtime-premium[rest-or-holiday]}} on rest days and holidays.",
    "Overtime hours between 10 pm and 6 am get a further {{ph.night-shift-differential}} of the overtime rate.",
  ],
  ejemplo: ["With a daily wage of ₱755, two hours of overtime on an ordinary day pay ₱235.94."],
  faq: [
    {
      pregunta: "How much is overtime pay in the Philippines?",
      respuesta:
        "Your regular hourly wage plus at least {{ph.overtime-premium[ordinary]}}. On a holiday or rest day it is the hourly rate for that day plus at least {{ph.overtime-premium[rest-or-holiday]}}.",
    },
    {
      pregunta: "What is the pay for a regular holiday that falls on my rest day?",
      respuesta: "{{ph.day-rates[regular-holiday-rest-day]}} of your daily wage for the first 8 hours: the holiday rate of 200% plus 30% of it.",
    },
    {
      pregunta: "Do I get night differential on overtime?",
      respuesta: "Yes. Overtime hours worked between 10 pm and 6 am get an extra {{ph.night-shift-differential}} of your overtime hourly rate.",
    },
  ],
  glosario: [
    { termino: "Overtime", definicion: "Work beyond eight hours in a day." },
    { termino: "Premium pay", definicion: "The extra pay for working on a rest day, special day or holiday." },
  ],
});
