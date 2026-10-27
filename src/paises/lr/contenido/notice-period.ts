import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.notice-period",
  h1: "Notice period calculator Liberia",
  title: "Liberia notice period and pay in lieu of notice",
  description: "Find the minimum notice your employer must give in Liberia under the Decent Work Act, and the pay in lieu of notice, from your months of service.",
  intro: [
    "Enter your months of continuous service and weekly pay to see the minimum notice of termination and what it is worth in pay.",
    "Notice grows with service, from one week in the first three months to four weeks after one year.",
  ],
  comoSeCalcula: [
    "Minimum notice: by months of continuous service after probation.",
    "Pay in lieu of notice: weeks of notice × your weekly pay.",
  ],
  ejemplo: ["After two years on L$10,000 a week, the notice is 4 weeks, or L$40,000 in lieu of notice."],
  faq: [
    {
      pregunta: "Must notice be in writing?",
      respuesta: "Yes. It must state your last day of employment.",
    },
    {
      pregunta: "When does the notice period start?",
      respuesta: "On the first day of the pay period after the one in which notice was served.",
    },
    {
      pregunta: "Can my employer pay me instead of giving notice?",
      respuesta: "Yes. The employer may pay what you would have earned during the minimum notice period.",
    },
  ],
  glosario: [{ termino: "Pay in lieu of notice", definicion: "Money paid instead of working the notice period." }],
});
