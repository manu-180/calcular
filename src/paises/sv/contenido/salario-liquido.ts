import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.salario-liquido",
  h1: "Calculadora de salario líquido en El Salvador",
  title: "Salario líquido en El Salvador: calcule AFP, ISSS y renta",
  description: "Calcule su salario líquido: le restamos la AFP del {{sv.afp-trabajador}}, el ISSS y la retención de renta con la tabla vigente. Vea cuánto recibe en mano.",
  intro: [
    "El salario líquido en El Salvador es lo que recibe en mano después de los descuentos de ley: la AFP del {{sv.afp-trabajador}}, el ISSS y la renta.",
    "Ponga su salario mensual y la calculadora le muestra cada descuento.",
  ],
  comoSeCalcula: [
    "Se resta la cotización a la AFP ({{sv.afp-trabajador}} del salario).",
    "Se resta la cotización al ISSS, que tiene un salario máximo de cotización.",
    "Con lo que queda se calcula la retención de renta según la tabla del Ministerio de Hacienda.",
  ],
  faq: [],
  glosario: [{ termino: "Descuentos de ley", definicion: "La AFP, el ISSS y la renta que el patrono descuenta del salario." }],
});
