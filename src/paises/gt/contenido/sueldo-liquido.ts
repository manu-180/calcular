import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.sueldo-liquido",
  h1: "Calculadora de sueldo líquido en Guatemala",
  title: "Sueldo líquido en Guatemala: calcule descuentos IGSS e ISR",
  description: "Calcule su sueldo líquido: le restamos la cuota laboral del IGSS y la retención del ISR y le mostramos cuánto recibe en mano cada mes.",
  intro: [
    "El sueldo líquido en Guatemala es lo que recibe en mano después de los descuentos de ley: la cuota laboral del IGSS y la retención mensual del ISR.",
    "Escriba su salario y su bonificación. Le mostramos cada descuento y lo que le queda.",
  ],
  comoSeCalcula: [
    "Cuota del IGSS: su salario por la tasa laboral. La bonificación incentivo no paga IGSS.",
    "Retención del ISR: el impuesto del año dividido entre 12.",
    "Sueldo líquido = salario + bonificaciones menos IGSS menos ISR.",
  ],
  faq: [],
  glosario: [{ termino: "Sueldo líquido", definicion: "Lo que recibe en mano después de los descuentos." }],
});
