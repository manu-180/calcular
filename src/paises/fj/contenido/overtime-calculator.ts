import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.overtime-calculator",
  h1: "Overtime calculator Fiji {{anio}}",
  title: "Overtime calculator Fiji {{anio}}",
  description: "Work out overtime pay in Fiji. Draft: the overtime rates are still being checked against the Employment Relations Act and its regulations.",
  intro: ["This calculator is a draft until the overtime rates are checked against the Employment Relations Act 2007 and its regulations."],
  comoSeCalcula: ["Overtime pay is your normal hourly rate multiplied by the overtime factor, then by the overtime hours."],
  faq: [],
  glosario: [{ termino: "Overtime", definicion: "Hours worked beyond the normal working hours, paid at a higher rate." }],
});
