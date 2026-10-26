import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.vacation-leave-calculator",
  h1: "Vacation leave calculator Jamaica",
  title: "Vacation leave calculator Jamaica: days and holiday pay",
  description:
    "Your vacation leave under the Holidays with Pay Order: one day for every {{jm.leave-days-per}} worked, {{jm.vacation-weeks}} a year, or {{jm.vacation-weeks-long-service}} after 10 years of service.",
  intro: [
    "Vacation leave in Jamaica depends on how many days you worked for your employer in the qualifying year and how long you have been with them.",
    "Enter your days worked, years of service and weekly pay to see the days you are owed and what you should be paid for them.",
  ],
  comoSeCalcula: [
    "Fewer than {{jm.vacation-min-days}} worked in the year: no vacation leave is earned.",
    "From {{jm.vacation-min-days}} to {{jm.vacation-full-days}} worked: one day of leave for every {{jm.leave-days-per}} worked. A part of a day counts as a full day.",
    "More than {{jm.vacation-full-days}} worked: {{jm.vacation-weeks}} of leave (normal working weeks).",
    "More than {{jm.vacation-full-days}} worked and at least {{jm.vacation-long-service-years}} of service: {{jm.vacation-weeks-long-service}} of leave.",
    "Vacation pay is at least your normal wages for the last normal working week before the leave starts.",
  ],
  ejemplo: ["If you worked 150 days, 150 divided by 22 is 6.8, which rounds up to 7 days of vacation leave."],
  faq: [
    {
      pregunta: "When can I take my vacation leave?",
      respuesta: "Leave earned in one year is normally taken in the next one. You and your employer can agree to take it in the same year.",
    },
    {
      pregunta: "Do I get paid for unused vacation when I leave?",
      respuesta: "Yes. Vacation leave you have earned and not taken must be paid when the job ends, whoever ends it.",
    },
    {
      pregunta: "Do public holidays count as vacation days?",
      respuesta: "No. Paid vacation leave does not include public holidays.",
    },
    {
      pregunta: "Does this apply to casual workers?",
      respuesta: "Casual workers hired by the day or for a single task get a gratuity instead, once they have worked {{jm.vacation-min-days}} for the employer.",
    },
  ],
  glosario: [
    { termino: "Qualifying year", definicion: "The year of work that earns the vacation leave you take afterwards." },
    { termino: "Holidays with Pay Order", definicion: "The 1973 order under the Holidays with Pay Act that sets minimum vacation and sick leave." },
  ],
});
