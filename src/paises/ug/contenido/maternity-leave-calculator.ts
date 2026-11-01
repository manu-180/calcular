import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.maternity-leave-calculator",
  h1: "Maternity and paternity leave calculator Uganda",
  title: "Maternity leave calculator Uganda: 60 working days",
  description: "Find when your maternity leave ends in Uganda: {{ug.maternity-days}} working days on full pay. Fathers get {{ug.paternity-days}} working days of paternity leave.",
  intro: [
    "The Employment Act gives mothers {{ug.maternity-days}} working days of maternity leave on full wages, and fathers {{ug.paternity-days}} working days of paternity leave.",
    "Enter the first day of leave to see the last day and the pay for the period.",
  ],
  comoSeCalcula: [
    "Maternity leave is {{ug.maternity-days}} working days on full wages, and at least four weeks of it must follow the birth or miscarriage.",
    "Paternity leave is {{ug.paternity-days}} working days on full wages, taken right after the delivery or miscarriage.",
    "We count working days from the first day of leave, skipping your days off each week.",
  ],
  ejemplo: ["Maternity leave starting on Monday 2 November 2026, on a Monday to Friday week, ends on Friday 22 January 2027."],
  faq: [
    {
      pregunta: "Do I get my job back after maternity leave?",
      respuesta: "Yes. You have the right to return to the same job, or a suitable one on terms no less favourable.",
    },
    {
      pregunta: "What if I or the baby are unwell after the birth?",
      respuesta: "If sickness from the pregnancy or birth makes returning unwise, the right to return is kept for up to eight weeks after the birth.",
    },
    {
      pregunta: "Do I need to give notice before returning?",
      respuesta: "Give at least seven days' notice of your return, or a shorter period that is reasonable. Your employer can ask for it in writing.",
    },
    {
      pregunta: "Must my workplace have a breastfeeding space?",
      respuesta: "Since 2026 every employer must provide time, space or a facility for breastfeeding and child care for children aged three to thirty-six months.",
    },
  ],
  glosario: [{ termino: "Working day", definicion: "A day you normally work. Weekly days off are not counted." }],
});
