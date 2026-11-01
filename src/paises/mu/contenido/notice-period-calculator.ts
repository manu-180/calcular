import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.notice-period-calculator",
  h1: "Notice period calculator Mauritius",
  title: "Notice period in Mauritius: {{mu.notice-days}} minimum",
  description:
    "Find your notice period under the Workers' Rights Act ({{mu.notice-days}} at least), the date it ends and the pay in lieu of notice.",
  intro: [
    "Either side can end a work agreement by giving notice. The law sets a minimum that no contract can cut.",
    "Enter the date notice is given and your monthly pay to see when it ends and what pay in lieu would be.",
  ],
  comoSeCalcula: [
    "The notice is at least {{mu.notice-days}}, whatever the agreement says. If your contract gives more, the longer period applies.",
    "Instead of working the notice, either side can pay the other what the worker would have earned during it.",
  ],
  ejemplo: ["Notice given on 1 November 2026 ends on 1 December 2026. On Rs 30,000 a month, pay in lieu is Rs 30,000."],
  faq: [
    {
      pregunta: "Does my employer have to give a reason?",
      respuesta: "Yes. When notifying you of the termination, the employer has to state the reason.",
    },
    {
      pregunta: "Can I look for another job during my notice?",
      respuesta: "Yes. Your employer has to give you reasonable time off, without loss of pay, to look for work, if you show what it is for.",
    },
    {
      pregunta: "Can notice be given verbally?",
      respuesta: "Yes. The Act allows notice to be verbal or written, given at any reasonable time.",
    },
  ],
  glosario: [{ termino: "Pay in lieu of notice", definicion: "Money paid instead of working the notice period." }],
});
