import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.overtime-calculator",
  h1: "Overtime calculator for Canada",
  title: "Overtime pay calculator: Ontario, BC, Alberta, federal",
  description: "Calculate your overtime pay for the week under Ontario's 44-hour rule, BC's daily and weekly rules, Alberta's 8/44 rule or the Canada Labour Code.",
  intro: [
    "Enter your hourly wage, the days you worked and the hours each day to see your regular pay, overtime hours and total pay for the week.",
    "Overtime rules are set by each province. This calculator covers Ontario, British Columbia, Alberta and federally regulated jobs.",
  ],
  comoSeCalcula: [
    "Ontario: overtime starts after {{ca.overtime-on[weekly]}} hours in a work week, at {{ca.overtime-on[factor]}} times your regular rate.",
    "British Columbia: hours over {{ca.overtime-bc[daily]}} in a day are paid at {{ca.overtime-bc[factor]}} times, and hours over {{ca.overtime-bc[daily-double]}} at {{ca.overtime-bc[factor-double]}} times. Over {{ca.overtime-bc[weekly]}} hours a week also count, using only the first 8 hours of each day.",
    "Alberta: overtime is the hours over {{ca.overtime-ab[daily]}} a day or {{ca.overtime-ab[weekly]}} a week, whichever gives more, at {{ca.overtime-ab[factor]}} times.",
    "Canada Labour Code: hours over {{ca.overtime-federal[daily]}} a day or {{ca.overtime-federal[weekly]}} a week, at {{ca.overtime-federal[factor]}} times. The calculator takes whichever count gives more overtime.",
  ],
  ejemplo: [
    "In Ontario, 5 days of 10 hours at $25 an hour is 50 hours: 44 regular hours ($1,100) and 6 overtime hours at $37.50 ($225), for $1,325.",
  ],
  faq: [
    {
      pregunta: "Can I take time off instead of overtime pay?",
      respuesta: "In many cases yes, with a written agreement. Under the Canada Labour Code it is 1.5 hours off for each overtime hour, and in Alberta banked time is at least 1 hour off for each overtime hour.",
    },
    {
      pregunta: "Do salaried employees get overtime?",
      respuesta: "Being paid a salary does not remove the right to overtime. Some jobs, such as many managers, are excluded from the overtime rules.",
    },
    {
      pregunta: "My hours are different every day. What do I enter?",
      respuesta: "The calculator assumes the same hours each day. If your days differ, the daily rules in BC, Alberta and federal jobs can give more overtime than shown here.",
    },
  ],
  glosario: [
    { termino: "Time and a half", definicion: "Overtime paid at 1.5 times your regular hourly wage." },
    { termino: "Double time", definicion: "Overtime paid at twice your regular hourly wage, required in BC for hours over 12 in a day." },
  ],
});
