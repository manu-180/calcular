import { definirContenido } from "@/motor/calculo";

// Borrador: no se publica hasta verificar sus datos en fuente primaria.
export default definirContenido({
  calculadora: "ve.costo-empleador",
  h1: "Calculadora de costo de un empleado en Venezuela",
  title: "Costo de un empleado en Venezuela: aportes patronales",
  description: "Calcula cuánto le cuesta a la empresa un salario con los aportes al IVSS, paro forzoso, FAOV e INCES.",
  intro: ["Además del salario, la empresa paga aportes al Seguro Social, al paro forzoso, al FAOV y al INCES."],
  comoSeCalcula: [
    "IVSS: entre 9 % y 11 % según el riesgo, con tope en salarios mínimos.",
    "Paro forzoso: {{ve.rpe-patrono}}.",
    "FAOV: {{ve.faov-patrono}}.",
    "INCES: {{ve.inces-patrono}}.",
  ],
  faq: [],
  glosario: [{ termino: "INCES", definicion: "Instituto Nacional de Capacitación y Educación Socialista." }],
});
