import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.holiday-entitlement",
  h1: "Holiday entitlement calculator",
  title: "Holiday entitlement calculator UK: days and hours",
  description:
    "Work out your statutory holiday: {{gb.holiday-weeks}} weeks a year, capped at {{gb.holiday-max-days}} days, for full time, part time and irregular hours ({{gb.irregular-hours-accrual}} of hours worked).",
  intro: [
    "Almost all workers in the UK have a legal right to {{gb.holiday-weeks}} weeks of paid holiday a year. For a 5-day week that is {{gb.holiday-max-days}} days, and bank holidays can be included in it.",
    "Choose how you work to see your minimum entitlement in days or hours. If you work irregular hours, enter the hours you worked in a pay period to see the holiday you built up.",
  ],
  comoSeCalcula: [
    "Fixed days: multiply your days a week by {{gb.holiday-weeks}}. The result is capped at {{gb.holiday-max-days}} days.",
    "Fixed hours: multiply your weekly hours by {{gb.holiday-weeks}}.",
    "Irregular hours or part-year work: you build up {{gb.irregular-hours-accrual}} of the hours you actually work in each pay period. This applies to leave years starting on or after {{gb.irregular-hours-accrual#desde}}.",
    "If you start or leave during the year, you get a share of the yearly entitlement for the months you work.",
  ],
  ejemplo: [
    "Working 3 days a week, you get at least 16.8 days of paid holiday a year.",
    "If you work 68 irregular hours in a month, you build up 8.2 hours of holiday, which can be rounded to 8.",
  ],
  faq: [
    {
      pregunta: "Are bank holidays included in my 28 days?",
      respuesta: "They can be. Employers can count bank holidays as part of your statutory entitlement. Your contract says whether they are on top or included.",
    },
    {
      pregunta: "Do part-time workers get fewer holidays?",
      respuesta: "They get the same {{gb.holiday-weeks}} weeks, so fewer days if they work fewer days. Someone working 3 days a week gets 16.8 days.",
    },
    {
      pregunta: "Can my employer give me more than the minimum?",
      respuesta: "Yes, many do. This calculator shows the legal minimum. Your contract can give you more but never less.",
    },
    {
      pregunta: "What happens to holiday I have not taken when I leave?",
      respuesta: "You are paid for any statutory holiday you have built up but not taken by your last day.",
    },
  ],
  glosario: [
    { termino: "Leave year", definicion: "The 12 months your holiday is counted over. Your contract sets when it starts." },
    { termino: "Accrual", definicion: "The way holiday builds up as you work during the year." },
  ],
});
