import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.hourly-rate-calculator",
  h1: "Hourly rate calculator for Lesotho",
  title: "Hourly rate calculator Lesotho: Labour Act method",
  description:
    "Turn your monthly or weekly wage into an hourly rate the way the Labour Act 2024 does: divide by {{ls.hours-divisor[monthly]}} or {{ls.hours-divisor[weekly]}}.",
  intro: [
    "Your hourly rate is the base for overtime, holiday work and many other payments. Enter your wage and how you are paid to get it.",
    "The method is set in section 187 of the Labour Act, 2024.",
  ],
  comoSeCalcula: [
    "Monthly contract: monthly wage divided by {{ls.hours-divisor[monthly]}}.",
    "Weekly contract: weekly wage divided by {{ls.hours-divisor[weekly]}}.",
    "Watchman or security guard: monthly wage divided by {{ls.hours-divisor[monthly-watchman]}}, or weekly wage divided by {{ls.hours-divisor[weekly-watchman]}}.",
    "A full normal day is {{ls.daily-hours[five-day]}} on a five-day week or {{ls.daily-hours[six-day]}} on a six-day week.",
  ],
  ejemplo: ["On M6 000 a month the hourly rate is M30.77, and a full day on a five-day week is worth M276.92."],
  faq: [
    {
      pregunta: "Where does the monthly divisor come from?",
      respuesta: "The Labour Act sets ordinary hours at {{ls.hours-divisor[monthly]}} a month where hours are counted monthly. Spread over a year, that is the same as {{ls.hours-divisor[weekly]}} a week.",
    },
    {
      pregunta: "What about a daily contract?",
      respuesta: "The daily wage is divided by your normal hours of work that day.",
    },
    {
      pregunta: "Why is the rate lower for security guards?",
      respuesta: "The Act divides their wages by {{ls.hours-divisor[monthly-watchman]}} a month or {{ls.hours-divisor[weekly-watchman]}} a week instead of the general figures.",
    },
  ],
  glosario: [
    { termino: "Normal hourly rate", definicion: "Your wage for one ordinary hour of work, before any overtime premium." },
    { termino: "Watchman", definicion: "A guard who watches over premises. The Act gives watchmen and security guards their own divisor." },
  ],
});
