import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.annual-leave-calculator",
  h1: "Annual leave calculator Fiji {{anio}}",
  title: "Annual leave calculator Fiji {{anio}}",
  description: "Work out annual leave days and pay under the Employment Relations Act 2007. Draft: the entitlement is still being checked against the Act.",
  intro: ["This calculator is a draft until the leave entitlement is checked against the Employment Relations Act 2007."],
  comoSeCalcula: ["Leave days are the yearly entitlement spread over the months worked. Pay is the days multiplied by one day of pay."],
  faq: [],
  glosario: [{ termino: "Annual leave", definicion: "Paid time off earned for each year of work." }],
});
