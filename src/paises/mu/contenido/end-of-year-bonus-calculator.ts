import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.end-of-year-bonus-calculator",
  h1: "End of year bonus calculator Mauritius",
  title: "End of year bonus calculator Mauritius 2026",
  description:
    "Work out your 13th month in Mauritius: one twelfth of what you earned this year, with {{mu.bonus-first-share}} paid before Christmas and the rest by 31 December.",
  intro: [
    "The end of year bonus, often called the 13th month, is set by section 54 of the Workers' Rights Act 2019.",
    "Enter your wage and the months you worked this year to see the bonus and the two payment dates.",
  ],
  comoSeCalcula: [
    "The bonus is one twelfth of your earnings for the calendar year with that employer.",
    "At least {{mu.bonus-first-share}} is paid no later than 5 clear working days before 25 December. The balance is paid by the last working day of the year.",
    "If you leave during the year, the bonus covers the months you worked and is due by the end of the month you leave.",
  ],
  ejemplo: ["On Rs 30,000 a month for the whole year the bonus is Rs 30,000: Rs 22,500 before Christmas and Rs 7,500 by year end."],
  faq: [
    {
      pregunta: "Who gets the end of year bonus?",
      respuesta: "Workers with a basic wage of up to {{mu.bonus-wage-ceiling}} a month, whether they worked the whole year or part of it. Workers in some sugar, field crop, livestock and fishing sectors follow their own regulations.",
    },
    {
      pregunta: "Do I get it if I resign?",
      respuesta: "Yes, if you had worked at least {{mu.bonus-resign-months}} months in the year when you resign. It is worked out on your earnings up to that point.",
    },
    {
      pregunta: "Is the bonus taxed?",
      respuesta: "Yes. For PAYE it counts as a thirteenth pay period, and CSG is also due on it.",
    },
  ],
  glosario: [
    { termino: "13th month", definicion: "The everyday name for the end of year bonus." },
    { termino: "Earnings", definicion: "What you were paid for the year by that employer, overtime and other pay included." },
  ],
});
