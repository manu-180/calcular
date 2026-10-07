import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.sueldo-liquido",
  h1: "Calculadora de sueldo líquido",
  title: "Sueldo líquido en Guatemala: IGSS e ISR",
  description: "Calcule cuánto recibe en mano después del descuento del IGSS y la retención del ISR.",
  intro: ["El sueldo líquido es lo que recibe después de los descuentos de ley: la cuota laboral del IGSS y la retención del ISR."],
  comoSeCalcula: [
    "Cuota del IGSS: su salario por la tasa laboral. La bonificación incentivo no paga IGSS.",
    "Retención del ISR: el impuesto del año dividido entre 12.",
    "Sueldo líquido = salario + bonificaciones menos IGSS menos ISR.",
  ],
  faq: [],
  glosario: [{ termino: "Sueldo líquido", definicion: "Lo que recibe en mano después de los descuentos." }],
});
