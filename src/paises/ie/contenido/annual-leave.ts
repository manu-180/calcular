import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.annual-leave",
  h1: "Annual leave calculator Ireland",
  title: "Annual leave calculator Ireland: your holiday entitlement",
  description:
    "Work out your statutory annual leave in Ireland, for full-time and part-time work, with the three methods in the Organisation of Working Time Act.",
  intro: [
    "Employees in Ireland earn paid annual leave based on the time they work. Part-time workers earn it too, in proportion to their hours.",
    "Enter the hours you worked in the leave year and your normal week, and see your entitlement in days and hours.",
  ],
  comoSeCalcula: [
    "There are three ways to count it, and you get whichever gives you the most.",
    "{{ie.annual-leave-max-weeks}} working weeks if you worked at least {{ie.annual-leave-full-year-hours}} hours in the leave year.",
    "A third of a working week for each calendar month in which you worked at least {{ie.annual-leave-monthly-hours}} hours.",
    "{{ie.annual-leave-percent}} of the hours you worked in the leave year.",
    "Whatever the method, the legal maximum is {{ie.annual-leave-max-weeks}} of your normal working weeks.",
  ],
  ejemplo: ["A part-time worker who did 800 hours in the year, on 20 hours a week over 3 days, gets 8% of 800 = 64 hours. That is 3.2 working weeks, or 9.6 days."],
  faq: [
    {
      pregunta: "I work part-time. How much leave do I get?",
      respuesta:
        "At least {{ie.annual-leave-percent}} of the hours you work in the leave year. If you work {{ie.annual-leave-monthly-hours}} hours or more in some months, the monthly method may give you more, and the calculator checks both.",
    },
    {
      pregunta: "Do public holidays count as annual leave?",
      respuesta: "No. Public holidays are a separate entitlement. The public holiday pay calculator shows what you get for each one.",
    },
    {
      pregunta: "Can my employer give me more than this?",
      respuesta: "Yes. This is the legal minimum. Your contract can give you more days, but never fewer.",
    },
  ],
  glosario: [
    { termino: "Leave year", definicion: "The 12 months over which annual leave is earned and counted." },
    { termino: "Working week", definicion: "Your normal week of work. For someone working 3 days, one working week of leave is 3 days off." },
  ],
});
