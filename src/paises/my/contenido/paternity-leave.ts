import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.paternity-leave",
  h1: "Paternity leave calculator Malaysia",
  title: "Paternity leave Malaysia: 7 days of paid leave",
  description: "Check if you qualify for {{my.paternity-leave-days}} days of paid paternity leave under section 60FA of the Employment Act and what it pays.",
  intro: [
    "Married male employees get {{my.paternity-leave-days}} consecutive days of paid paternity leave for each confinement, up to five confinements.",
    "Enter your wages to see what the leave pays at your ordinary rate of pay.",
  ],
  comoSeCalcula: [
    "The leave is paid at your ordinary rate of pay: monthly wages divided by {{my.ordinary-rate-divisor}}.",
    "You get {{my.paternity-leave-days}} consecutive days for each confinement.",
    "You need at least 12 months with the same employer before the leave starts.",
  ],
  ejemplo: ["On RM2,600 a month the daily rate is RM100, so paternity leave pays RM700."],
  faq: [
    {
      pregunta: "Who qualifies for paternity leave?",
      respuesta:
        "A married male employee who has worked for the same employer for at least 12 months immediately before the leave starts and has told the employer about his spouse's pregnancy in time.",
    },
    {
      pregunta: "How many times can I take it?",
      respuesta: "For up to five confinements in total, whatever the number of spouses.",
    },
    {
      pregunta: "Is paternity leave paid?",
      respuesta: "Yes, at your ordinary rate of pay for each of the {{my.paternity-leave-days}} days.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The birth of a child, the term used in the Employment Act." },
    { termino: "Ordinary rate of pay", definicion: "Your wages for one day of normal work." },
  ],
});
