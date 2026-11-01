import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.maternity-leave-calculator",
  h1: "Maternity leave calculator Zambia",
  title: "Maternity leave calculator Zambia: plan your leave dates",
  description:
    "Plan your maternity leave under the Employment Code: {{zm.maternity-weeks}}, plus {{zm.maternity-multiple-weeks}} for twins, with at least {{zm.maternity-after-birth-weeks}} after the birth.",
  intro: [
    "Enter your expected date of delivery and how many weeks before it you want to stop work. You get the first and last day of leave and the day you go back.",
  ],
  comoSeCalcula: [
    "A female employee is entitled to {{zm.maternity-weeks}} of maternity leave on production of a medical certificate.",
    "It can start before the expected date of delivery, but at least {{zm.maternity-after-birth-weeks}} have to be taken right after the birth. You can also take all of it after the birth.",
    "A multiple birth adds {{zm.maternity-multiple-weeks}}.",
  ],
  ejemplo: [
    "With the baby due on 15 December 2026 and leave starting four weeks earlier, the leave runs from 17 November 2026 to 22 February 2027.",
  ],
  faq: [
    {
      pregunta: "Is maternity leave paid?",
      respuesta: "If you have worked for the same employer for the 24 months before the leave, it is on full pay, unless maternity benefits are paid under another law.",
    },
    {
      pregunta: "What if the baby is premature?",
      respuesta: "The leave can be extended for the period a medical doctor recommends. A premature child is one born before 37 weeks of pregnancy.",
    },
    {
      pregunta: "Is there paternity leave?",
      respuesta: "Yes. A father with 12 months of continuous service with the same employer gets at least {{zm.paternity-days}} continuous working days of paternity leave.",
    },
    {
      pregunta: "Can I take annual leave right after maternity leave?",
      respuesta: "Yes, with your employer's approval you can go straight on to sick, annual, compassionate or other leave you are entitled to, and you keep your annual leave.",
    },
  ],
  glosario: [
    { termino: "Expected date of delivery", definicion: "The due date your doctor or midwife gives you." },
  ],
});
