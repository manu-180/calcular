import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.maternity-leave-calculator",
  h1: "Maternity leave calculator Malawi",
  title: "Maternity leave Malawi: 8 weeks on full pay, with dates",
  description:
    "Work out when your maternity leave ends and what it pays: the Employment Act gives at least {{mw.maternity-weeks}} on full pay once within every {{mw.maternity-cycle}}.",
  intro: [
    "Enter the first day of your maternity leave to see your last day off and the day you are back at work.",
    "Add your monthly pay to see what the leave is worth.",
  ],
  comoSeCalcula: [
    "Section 47 of the Employment Act gives at least {{mw.maternity-weeks}} of maternity leave on full pay.",
    "The entitlement applies once within every {{mw.maternity-cycle}}.",
    "The pay for the weeks of leave is your monthly pay times 12, divided by 52 and multiplied by the weeks.",
  ],
  ejemplo: ["Leave starting on 2 November 2026 ends on 27 December 2026 and you are back on 28 December. On K300,000 a month the eight weeks are worth about K553,846."],
  faq: [
    {
      pregunta: "Do I keep my benefits while on leave?",
      respuesta: "Yes. Your normal benefits and contractual rights continue, seniority keeps building and your employment counts as unbroken.",
    },
    {
      pregunta: "What if I fall ill because of the pregnancy?",
      respuesta: "If a doctor certifies an illness arising from pregnancy or birth that affects you or your child, your employer has to grant additional leave as it sees fit.",
    },
    {
      pregunta: "Can I go back to the same job?",
      respuesta: "Yes, with the same benefits and entitlements as before. The exceptions are when the job no longer exists for economic, technological or organisational reasons, or when you can no longer do it.",
    },
  ],
  glosario: [
    { termino: "Full pay", definicion: "Your normal pay, as if you were at work." },
    { termino: "Confinement", definicion: "The birth and the days around it." },
  ],
});
