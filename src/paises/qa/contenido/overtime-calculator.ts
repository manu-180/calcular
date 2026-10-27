import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.overtime-calculator",
  h1: "Overtime calculator for Qatar",
  title: "Overtime pay in Qatar: day and night rates",
  description:
    "Work out overtime pay under the Qatar Labour Law: basic hourly pay plus at least {{qa.overtime[normal]}}, or {{qa.overtime[night]}} between 9 pm and 3 am.",
  intro: [
    "Normal working time in Qatar is up to {{qa.working-hours[weekly]}} a week. Hours beyond that are overtime and paid at a higher rate.",
    "Enter your basic salary and your overtime hours to see what you're owed.",
  ],
  comoSeCalcula: [
    "Overtime is paid at your basic hourly pay plus at least {{qa.overtime[normal]}}.",
    "Work between 9 pm and 3 am is paid at your basic hourly pay plus at least {{qa.overtime[night]}}, except for shift workers.",
    "The law doesn't fix how to get an hourly rate, so this calculator uses basic salary × 12 ÷ 52 ÷ your weekly hours.",
  ],
  ejemplo: [
    "On a basic salary of QAR 5,200 and a 48-hour week, the hourly rate is QAR 25. Ten hours of day overtime pay QAR 312.50.",
  ],
  faq: [
    {
      pregunta: "How many hours a day can I work in Qatar?",
      respuesta: "Normal hours are {{qa.working-hours[daily]}} a day. With overtime the total can't go over {{qa.working-hours[max-daily]}}, unless the work is needed to prevent serious loss or a serious accident.",
    },
    {
      pregunta: "What if I work on my weekly rest day?",
      respuesta: "Friday is the normal rest day. If you have to work on it, you get another rest day and either the usual rest day pay or your basic wage plus at least 150%.",
    },
    {
      pregunta: "What are the hours during Ramadan?",
      respuesta: "During Ramadan the maximum is {{qa.working-hours[ramadan-weekly]}} a week, or {{qa.working-hours[ramadan-daily]}} a day.",
    },
    {
      pregunta: "Do managers get overtime?",
      respuesta: "The working hours and overtime rules don't apply to people in senior posts who hold the employer's powers over other workers.",
    },
  ],
  glosario: [
    { termino: "Shift worker", definicion: "Someone who works in rotating shifts, including at night as part of the normal schedule." },
  ],
});
