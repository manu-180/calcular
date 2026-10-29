import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.maternity-leave-calculator",
  h1: "Maternity leave calculator Fiji {{anio}}",
  title: "Maternity leave calculator Fiji {{anio}}",
  description: "Work out maternity leave length and pay in Fiji. Draft: the leave length is still being checked against the current law.",
  intro: ["This calculator is a draft until the length and pay rules are checked against the current Employment Relations Act and its amendments."],
  comoSeCalcula: ["Pay during the leave is your weekly wage multiplied by the weeks of leave."],
  faq: [],
  glosario: [{ termino: "Maternity leave", definicion: "Paid time off around the birth of a child." }],
});
