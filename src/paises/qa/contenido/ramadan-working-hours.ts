import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa.ramadan-working-hours",
  h1: "Ramadan working hours calculator for Qatar",
  title: "Ramadan working hours in Qatar: finish time and overtime",
  description:
    "See when your day ends in Ramadan under the Qatar Labour Law: {{qa.working-hours[ramadan-daily]}} a day and {{qa.working-hours[ramadan-weekly]}} a week, and any overtime.",
  intro: [
    "During Ramadan, the Labour Law cuts the maximum working time for everyone it covers.",
    "Enter your start time and break to see when your day should end, and how many hours count as overtime.",
  ],
  comoSeCalcula: [
    "The maximum in Ramadan is {{qa.working-hours[ramadan-daily]}} a day and {{qa.working-hours[ramadan-weekly]}} a week, against {{qa.working-hours[daily]}} and {{qa.working-hours[weekly]}} the rest of the year.",
    "Breaks for prayer, rest and meals don't count as working time, so the finish time adds them to the six hours.",
    "Overtime is the larger of the extra daily hours and the hours above the weekly limit.",
  ],
  ejemplo: ["Starting at 08:00 with a one-hour break, a six-hour Ramadan day ends at 15:00."],
  faq: [
    {
      pregunta: "Do I need a break during Ramadan hours?",
      respuesta: "The Labour Law requires one or more breaks of between one and three hours, so no one works more than five hours in a row. Some jobs approved by the minister can run without a stop.",
    },
    {
      pregunta: "Is time travelling to work counted?",
      respuesta: "No. The time spent going between home and work isn't part of working hours.",
    },
    {
      pregunta: "Are extra hours in Ramadan paid?",
      respuesta: "Yes. Hours above the limit are overtime, paid at your basic hourly pay plus at least {{qa.overtime[normal]}}.",
    },
  ],
  glosario: [{ termino: "Working hours", definicion: "Time at work, not counting breaks or travel between home and work." }],
});
