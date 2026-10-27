import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "na.maternity-leave-calculator",
  h1: "Maternity leave pay calculator Namibia",
  title: "Maternity leave pay Namibia: SSC benefit calculator",
  description:
    "See your Social Security maternity benefit: {{na.ssc-maternity-rate}} of your basic wage, up to {{na.ssc-maternity-cap}} a month, for {{na.maternity-weeks}} weeks of leave.",
  intro: [
    "During maternity leave the Social Security Commission pays your basic wage and your employer keeps paying the rest of your package.",
    "Enter your basic wage to see the monthly benefit and the total for the full leave.",
  ],
  comoSeCalcula: [
    "Monthly benefit: {{na.ssc-maternity-rate}} of your basic wage, up to {{na.ssc-maternity-cap}} a month.",
    "The leave lasts at least {{na.maternity-weeks}} weeks. The total is the monthly benefit divided by {{na.weeks-per-month}} weeks and multiplied by the weeks of leave.",
  ],
  ejemplo: ["On a basic wage of N$15,000 the benefit is N$15,000 a month, about N$41,541.66 for 12 weeks."],
  faq: [
    {
      pregunta: "When can I start maternity leave?",
      respuesta: "Four weeks before the expected date of birth certified by your doctor. After the birth you get at least eight weeks, and more if needed to reach a total of {{na.maternity-weeks}} weeks.",
    },
    {
      pregunta: "Who qualifies?",
      respuesta: "An employee who has completed six months of continuous service with the same employer.",
    },
    {
      pregunta: "Can I be dismissed during maternity leave?",
      respuesta: "No. Your employer may not dismiss you during the leave or when it ends for reasons linked to pregnancy, the birth or your family responsibilities, unless you unreasonably refuse comparable work offered to you.",
    },
    {
      pregunta: "When did the cap change?",
      respuesta: "Government Notice 305 of 2026 set the benefit at {{na.ssc-maternity-rate}} of basic wage up to {{na.ssc-maternity-cap}} a month from {{na.ssc-maternity-cap#desde}}.",
    },
  ],
  glosario: [
    { termino: "Confinement", definicion: "The legal word for giving birth used in the Labour Act." },
    { termino: "SSC", definicion: "Social Security Commission, which pays the maternity benefit from the fund you and your employer contribute to." },
  ],
});
