import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.redundancy-pay-calculator",
  h1: "Redundancy pay calculator Fiji {{anio}}",
  title: "Redundancy pay calculator Fiji {{anio}}",
  description: "Work out the minimum redundancy pay in Fiji. Draft: the formula is still being checked against the Employment Relations Act 2007.",
  intro: ["This calculator is a draft until the formula is checked against the text of the Employment Relations Act 2007."],
  comoSeCalcula: ["The minimum is a number of weeks of wages for each complete year of service, multiplied by your weekly wage."],
  faq: [],
  glosario: [{ termino: "Redundancy", definicion: "Ending a job because the employer no longer needs the position." }],
});
