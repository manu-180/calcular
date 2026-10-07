import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.bonificacion-incentivo",
  h1: "Bonificación incentivo",
  title: "Bonificación incentivo en Guatemala",
  description: "Calcule la bonificación incentivo que le corresponde en el mes según los días trabajados.",
  intro: ["La bonificación incentivo es un pago mensual obligatorio que se suma al salario. Se paga junto con el sueldo y no se puede dividir."],
  comoSeCalcula: ["Mes completo: el monto fijado por la ley.", "Mes incompleto: el monto diario por los días trabajados."],
  faq: [],
  glosario: [{ termino: "Bonificación incentivo", definicion: "Pago mensual obligatorio del Decreto 78-89 y sus reformas." }],
});
