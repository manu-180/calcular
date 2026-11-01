import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.maternity-leave-calculator",
  h1: "Oman maternity and paternity leave calculator",
  title: "Oman maternity leave of {{om.family-leave[maternity]}}: start and end dates",
  description:
    "Work out the first and last day of maternity leave in Oman ({{om.family-leave[maternity]}}), its total wage and the last day for paternity leave.",
  intro: [
    "Working mothers in Oman get {{om.family-leave[maternity]}} of maternity leave to cover the time before and after the birth, and fathers get paternity leave.",
    "Enter the birth date and how many days before it the leave starts to see the leave dates and pay.",
  ],
  comoSeCalcula: [
    "Leave before the birth starts on the advice of the medical authority, up to {{om.family-leave[prenatal]}}, and the rest runs from the birth.",
    "Last day = first day + {{om.family-leave[maternity]}} minus one day.",
    "Paternity leave is {{om.family-leave[paternity]}} on full pay and must end by the child's 98th day.",
  ],
  ejemplo: [
    "With a birth expected on 1 December 2026 and 14 days of leave before it, the leave starts on 17 November 2026 and ends on 22 February 2027.",
  ],
  faq: [
    {
      pregunta: "How long is maternity leave in Oman?",
      respuesta: "{{om.family-leave[maternity]}} to cover the time before and after the birth, of which at most {{om.family-leave[prenatal]}} can come before.",
    },
    {
      pregunta: "Who pays maternity leave?",
      respuesta: "Omani workers get the maternity leave allowance from the maternity insurance branch of the Social Protection Fund. Under the Labour Law it is special leave on full pay.",
    },
    {
      pregunta: "Is there a nursing hour after I return?",
      respuesta: "Yes. A nursing mother gets one hour a day to care for her child for one year after maternity leave ends, and it counts as working time.",
    },
  ],
  glosario: [
    { termino: "Maternity leave", definicion: "Leave for a working mother covering the time before and after the birth." },
    { termino: "Paternity leave", definicion: "Special leave on full pay for a father when his child is born." },
  ],
});
