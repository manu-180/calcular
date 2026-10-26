import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.maternity-leave-calculator",
  h1: "Maternity leave calculator Mauritius",
  title: "Maternity leave in Mauritius: {{mu.maternity-weeks}} on full pay",
  description:
    "Plan your maternity leave in Mauritius: {{mu.maternity-weeks}} on full pay, at least {{mu.maternity-weeks-after-birth}} after the birth, and the {{mu.maternity-allowance}} allowance.",
  intro: [
    "Every female worker gets {{mu.maternity-weeks}} of maternity leave on full pay when she shows a medical certificate.",
    "Enter the expected date of birth and how many weeks you want to take before it. You get the first and last day of leave and the date you return.",
  ],
  comoSeCalcula: [
    "The leave lasts {{mu.maternity-weeks}}. At least {{mu.maternity-weeks-after-birth}} of it has to be taken right after the birth.",
    "For twins, triplets or more, or a premature baby, there are {{mu.maternity-extra-weeks}} more.",
    "After 12 months with the same employer you are also paid a maternity allowance of {{mu.maternity-allowance}} within 7 days of the birth.",
  ],
  ejemplo: ["With a birth expected on 1 December 2026 and 2 weeks taken before, the leave runs from 17 November 2026 to 8 March 2027."],
  faq: [
    {
      pregunta: "How long is paternity leave?",
      respuesta: "{{mu.paternity-weeks}} in a row with pay, for a father with 12 months of continuous employment. It starts within 2 weeks of the birth or of the mother leaving hospital.",
    },
    {
      pregunta: "What if the baby is stillborn?",
      respuesta: "The mother is still entitled to {{mu.maternity-weeks}} of leave on full pay, with a medical certificate.",
    },
    {
      pregunta: "Can I breastfeed at work?",
      respuesta: "Yes. A worker nursing her unweaned child is entitled to breaks every day for that purpose, at a time that suits her and the child.",
    },
    {
      pregunta: "Does adoption give leave?",
      respuesta: "Yes. After 12 months with the employer, a worker who adopts a child under 12 months old gets {{mu.maternity-weeks}} on full pay.",
    },
  ],
  glosario: [{ termino: "Confinement", definicion: "The legal word for giving birth." }],
});
