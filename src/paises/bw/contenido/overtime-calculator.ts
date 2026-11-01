import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.overtime-calculator",
  h1: "Overtime calculator Botswana",
  title: "Overtime calculator Botswana: pay for extra hours",
  description: "Work out overtime pay in Botswana at {{bw.overtime-rate}} of the normal rate, and pay for work on a public holiday or rest day at {{bw.public-holiday-rate}}.",
  intro: ["Enter your monthly basic wage, your working week and the extra hours you worked to see the overtime pay you are owed."],
  comoSeCalcula: [
    "Your daily rate is your monthly wage divided by the number of working days for your week.",
    "Your hourly rate is the daily rate divided by your normal daily hours.",
    "Overtime is paid at {{bw.overtime-rate}} of the hourly rate, and work on a public holiday or rest day at {{bw.public-holiday-rate}}.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
