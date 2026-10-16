import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.sick-leave",
  h1: "Sick leave calculator",
  title: "Sick leave calculator: BCEA paid sick days",
  description: "How many paid sick days you get under the BCEA: the days you normally work in {{za.sick-leave-weeks}} weeks, every {{za.sick-leave-cycle-months}} months.",
  intro: [
    "Enter how many days a week you work and how long you have been with your employer. You get your paid sick days for the cycle and how many you have left.",
    "The Basic Conditions of Employment Act counts sick leave over a cycle of {{za.sick-leave-cycle-months}} months, not per year.",
  ],
  comoSeCalcula: [
    "In each {{za.sick-leave-cycle-months}}-month cycle you get as many paid sick days as you would normally work in {{za.sick-leave-weeks}} weeks: 30 on a five-day week, 36 on a six-day week.",
    "In your first six months you earn one paid sick day for every {{za.sick-leave-early-days}} days worked.",
    "A new cycle starts every {{za.sick-leave-cycle-months}} months from the day you started.",
  ],
  ejemplo: ["On a five-day week you get 30 paid sick days every three years. If you have taken 4, you have 26 left."],
  faq: [
    {
      pregunta: "Do I get paid my full wage on sick leave?",
      respuesta:
        "Yes, the wage you would have earned that day. An agreement can lower the daily pay to no less than 75%, but only if it adds enough sick days so the total over the cycle is not less.",
    },
    {
      pregunta: "When do I need a medical certificate?",
      respuesta:
        "Your employer can refuse to pay sick leave if you were off for more than two days in a row, or on more than two occasions in eight weeks, and you do not produce a medical certificate when asked.",
    },
    {
      pregunta: "Does this apply to part-time workers?",
      respuesta: "It applies to anyone who works at least 24 hours a month for the employer. The number of days depends on how many days a week you work.",
    },
  ],
  glosario: [
    { termino: "Sick leave cycle", definicion: "Each period of {{za.sick-leave-cycle-months}} months with the same employer, counted from the day you started." },
  ],
});
