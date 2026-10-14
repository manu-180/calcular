import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.acc-levy-calculator",
  h1: "ACC levy calculator",
  title: "ACC earners' levy calculator NZ",
  description: "Work out your ACC earners' levy at {{nz.acc-earners-levy-rate}} of earnings up to {{nz.acc-max-liable-earnings}} a year. Uses the current Inland Revenue rate.",
  intro: [
    "The ACC earners' levy pays for injuries that happen outside work. Every employee pays it as part of PAYE.",
    "This tax year the levy is {{nz.acc-earners-levy-rate}} of your earnings, and it stops once you reach {{nz.acc-max-liable-earnings}}.",
  ],
  comoSeCalcula: [
    "Take your earnings for the tax year, up to the maximum of {{nz.acc-max-liable-earnings}}.",
    "Multiply by {{nz.acc-earners-levy-rate}}. The rate already includes GST.",
  ],
  ejemplo: ["On $50,000 the levy is $875 a year, about $16.83 a week."],
  faq: [
    {
      pregunta: "Do I pay the ACC levy on top of PAYE?",
      respuesta: "No. It's already inside the PAYE your employer takes, so you don't do anything extra.",
    },
    {
      pregunta: "Why is the levy higher this year?",
      respuesta: "The rate rose to $1.75 per $100 from 1 April 2026, from $1.67 the year before. It goes up again to $1.83 from 1 April 2027.",
    },
    {
      pregunta: "Is there a maximum ACC levy?",
      respuesta: "Yes. Earnings above {{nz.acc-max-liable-earnings}} don't pay the levy, so nobody pays more than the amount shown in the result.",
    },
  ],
  glosario: [
    { termino: "ACC", definicion: "Accident Compensation Corporation, which covers the cost of injuries in New Zealand." },
    { termino: "Liable earnings", definicion: "The earnings the levy is charged on, up to the yearly maximum." },
  ],
});
