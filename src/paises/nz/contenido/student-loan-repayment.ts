import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.student-loan-repayment",
  h1: "Student loan repayment calculator NZ",
  title: "NZ student loan repayment calculator",
  description:
    "See how much of your pay goes to your New Zealand student loan: {{nz.student-loan-rate}} of every dollar over {{nz.student-loan-threshold}} a year, by week, fortnight and month.",
  intro: [
    "If you live in New Zealand and earn salary or wages, your employer takes student loan repayments from your pay.",
    "You repay {{nz.student-loan-rate}} of every dollar you earn over the repayment threshold of {{nz.student-loan-threshold}} a year in your main job.",
  ],
  comoSeCalcula: [
    "Your pay is turned into a yearly amount and the repayment threshold of {{nz.student-loan-threshold}} is taken off.",
    "What's left is multiplied by {{nz.student-loan-rate}}.",
    "In a second job there's no threshold, so the {{nz.student-loan-rate}} applies to all of that pay.",
  ],
  ejemplo: ["On $600 a week you repay $16.32 a week: $600 minus the weekly threshold of $464 is $136, and 12% of that is $16.32."],
  faq: [
    {
      pregunta: "What is the weekly repayment threshold?",
      respuesta: "It's $464 a week, $928 a fortnight, $1,856 every four weeks or $2,010.66 a month. Your employer works out the repayment for each pay.",
    },
    {
      pregunta: "What tax code do I use with a student loan?",
      respuesta: "Add SL to your tax code, for example M SL in your main job or S SL in a second job. That tells your employer to take repayments.",
    },
    {
      pregunta: "Why does my second job take so much for my loan?",
      respuesta: "The repayment threshold only applies to your main job, so a second job repays {{nz.student-loan-rate}} of every dollar. If your main job pays under the threshold, you can apply to Inland Revenue for a special deduction rate.",
    },
  ],
  glosario: [
    { termino: "Repayment threshold", definicion: "The yearly income you can earn before student loan repayments start." },
    { termino: "SL", definicion: "The part of a tax code that tells your employer you have a student loan." },
  ],
});
