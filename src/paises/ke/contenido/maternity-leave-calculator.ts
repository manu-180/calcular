import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.maternity-leave-calculator",
  h1: "Maternity and paternity leave calculator",
  title: "Maternity leave calculator Kenya: when your leave ends",
  description: "Find the last day of your leave in Kenya: {{ke.maternity-months}} of maternity leave or {{ke.paternity-weeks}} of paternity leave, both with full pay.",
  intro: [
    "Enter the first day of your leave to see when it ends.",
    "Both maternity and paternity leave are on full pay under the Employment Act.",
  ],
  comoSeCalcula: [
    "Maternity leave lasts {{ke.maternity-months}} with full pay.",
    "Paternity leave lasts {{ke.paternity-weeks}} with full pay.",
    "The calculator counts calendar days from the first day of leave.",
  ],
  ejemplo: ["Maternity leave that starts on 1 November 2026 ends on 31 January 2027."],
  faq: [
    {
      pregunta: "Do I have to tell my employer in advance?",
      respuesta: "Yes. Give at least seven days' notice in writing of the date you start and that you will return, or a shorter period if that is reasonable.",
    },
    {
      pregunta: "Can I go back to the same job?",
      respuesta: "Yes, or to a reasonably suitable job on terms no less favourable than before.",
    },
    {
      pregunta: "What if I take annual leave straight after?",
      respuesta: "If your employer agrees, maternity leave is treated as ending on the last day of that extra leave.",
    },
  ],
  glosario: [{ termino: "Full pay", definicion: "Your normal wages for the whole leave." }],
});
