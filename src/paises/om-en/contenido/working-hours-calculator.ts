import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.working-hours-calculator",
  h1: "Oman working hours calculator, Ramadan included",
  title: "Working hours in Oman and Ramadan: how much overtime?",
  description:
    "Work out your weekly hours and how many go over the legal limit in Oman: {{om.working-hours[daily]}} a day and {{om.working-hours[weekly]}} a week, and {{om.working-hours[ramadan-daily]}} a day in Ramadan.",
  intro: [
    "Oman's Labour Law sets a maximum number of actual working hours per day and per week, with a lower limit in Ramadan for Muslim workers.",
    "Enter your daily hours and working days per week to see how many overtime hours you work each week.",
  ],
  comoSeCalcula: [
    "The normal limit is {{om.working-hours[daily]}} a day and {{om.working-hours[weekly]}} a week, not counting the hour for rest and meals.",
    "In Ramadan for Muslim workers: {{om.working-hours[ramadan-daily]}} a day or {{om.working-hours[ramadan-weekly]}} a week.",
    "Overtime is the larger of the hours above the daily limit across the week and the hours above the weekly limit.",
  ],
  ejemplo: [
    "Someone working 8 hours a day, five days a week in Ramadan works 40 hours, 10 of them overtime because the limit is 6 hours a day.",
  ],
  faq: [
    {
      pregunta: "What are working hours in Ramadan in the private sector?",
      respuesta: "The maximum for Muslim workers is {{om.working-hours[ramadan-daily]}} a day or {{om.working-hours[ramadan-weekly]}} a week.",
    },
    {
      pregunta: "Is the lunch hour part of working time?",
      respuesta: "No. Working hours must include an hour for rest and meals that does not count, and no stretch of continuous work can go over six hours.",
    },
    {
      pregunta: "How many rest days do I get a week?",
      respuesta: "Workers get a paid weekly rest of at least two days in a row.",
    },
  ],
  glosario: [
    { termino: "Working hours", definicion: "The time the worker is under the employer's direction and supervision." },
  ],
});
