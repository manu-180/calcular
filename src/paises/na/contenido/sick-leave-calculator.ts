import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.sick-leave-calculator",
  h1: "Sick leave calculator Namibia",
  title: "Sick leave calculator Namibia: paid sick days",
  description:
    "Under the Labour Act you get {{na.sick-leave-days[five-days]}} paid sick days every three years on a five-day week. See your days and sick pay per day.",
  intro: [
    "Sick leave in Namibia runs in cycles of 36 months with the same employer, not year by year.",
    "Enter your work week, whether you are still in your first year, and your pay, to see the paid sick days you can take.",
  ],
  comoSeCalcula: [
    "Five-day week: {{na.sick-leave-days[five-days]}} working days per 36-month cycle. Six-day week: {{na.sick-leave-days[six-days]}} days.",
    "Fewer than five days a week: the five-day entitlement scaled to your days.",
    "First year: one day of sick leave for every {{na.sick-leave-first-year-divisor}} days worked.",
    "Sick pay per day is your monthly pay divided by {{na.weeks-per-month}} times your work days a week.",
  ],
  ejemplo: ["On a six-day week you have 36 sick days per cycle. On N$6,500 a month each day pays N$250.02."],
  faq: [
    {
      pregunta: "Do unused sick days carry over?",
      respuesta: "No. Sick leave you do not use lapses at the end of the 36-month cycle and is not paid out when you leave.",
    },
    {
      pregunta: "When do I need a medical certificate?",
      respuesta: "Your employer does not have to pay if you are absent for more than two days in a row and do not bring a certificate from a medical practitioner or other accepted proof.",
    },
    {
      pregunta: "What happens when my sick leave runs out?",
      respuesta: "The Social Security Commission can pay a sick leave benefit. From 1 October 2026 it is 75% of your basic wage, up to N$15,000 a month, for the first 12 months.",
    },
  ],
  glosario: [
    { termino: "Sick leave cycle", definicion: "Each period of 36 consecutive months with the same employer, counted from your start date." },
    { termino: "Medical practitioner", definicion: "A doctor registered to practise in Namibia." },
  ],
});
