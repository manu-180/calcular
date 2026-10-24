import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.annual-leave",
  h1: "UAE annual leave calculator",
  title: "Annual leave calculator UAE: days and leave pay",
  description:
    "Work out your annual leave under the UAE Labour Law: {{ae.annual-leave[per-year]}} a year, or {{ae.annual-leave[per-month]}} a month in the first year, and what unused days are worth.",
  intro: [
    "Private sector workers in the UAE get paid annual leave once they've worked more than six months for the same employer.",
    "Enter your service and the days you've taken to see your balance and what it's worth if your job ends.",
  ],
  comoSeCalcula: [
    "After one year of service you get {{ae.annual-leave[per-year]}} of fully paid leave a year.",
    "If you've worked more than six months but less than a year, you get {{ae.annual-leave[per-month]}} for each month.",
    "For part of a leave year, the leave is proportional. When your job ends, unused leave is paid on your basic wage.",
  ],
  ejemplo: ["Six months into a leave year after two full years, you've earned 15 days. With a basic wage of AED 9,000, they're worth AED 4,500."],
  faq: [
    {
      pregunta: "How many days of annual leave do I get in the UAE?",
      respuesta: "{{ae.annual-leave[per-year]}} a year after one year of service, with full pay.",
    },
    {
      pregunta: "Can I carry leave over to next year?",
      respuesta: "Yes, if your employer agrees and the company's rules allow it. Your employer can't stop you from taking your leave for more than two years.",
    },
    {
      pregunta: "Do public holidays during my leave count?",
      respuesta: "Under Article 29 they count as part of the annual leave, unless your contract or company rules give you something better.",
    },
    {
      pregunta: "How much notice does my employer give for leave dates?",
      respuesta: "At least one month before the leave starts.",
    },
  ],
  glosario: [
    { termino: "Leave year", definicion: "The year of service in which you earn annual leave." },
    { termino: "Leave salary", definicion: "The pay for annual leave days, or for unused days when the job ends." },
  ],
});
