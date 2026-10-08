import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.bonificacion-incentivo",
  h1: "Calculadora de bonificación incentivo en Guatemala",
  title: "Bonificación incentivo en Guatemala: cálculo por días",
  description: "Calcule la bonificación incentivo que le corresponde en el mes, completa o según los días trabajados. Se paga junto con el salario.",
  intro: [
    "La bonificación incentivo en Guatemala es un pago mensual obligatorio que se suma al salario. Se paga junto con el sueldo y no se puede dividir.",
  ],
  comoSeCalcula: ["Mes completo: el monto fijado por la ley.", "Mes incompleto: el monto diario por los días trabajados."],
  faq: [],
  glosario: [{ termino: "Bonificación incentivo", definicion: "Pago mensual obligatorio del Decreto 78-89 y sus reformas." }],
});
