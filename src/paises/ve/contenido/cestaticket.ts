import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.cestaticket",
  h1: "Cestaticket en bolívares",
  title: "Cestaticket en bolívares a tasa BCV",
  description: "Calcula el cestaticket socialista en bolívares con la tasa oficial del BCV del día.",
  intro: ["El cestaticket socialista es el beneficio de alimentación. Se fija en dólares y se paga en bolívares a la tasa oficial del BCV."],
  comoSeCalcula: ["Monto en dólares por la tasa oficial del BCV vigente."],
  faq: [],
  glosario: [{ termino: "Cestaticket", definicion: "Beneficio de alimentación que no forma parte del salario." }],
});
