import { definirContenido } from "@/motor/calculo";

// Borrador: no se publica hasta verificar sus datos en fuente primaria.
export default definirContenido({
  calculadora: "ve.unidad-tributaria",
  h1: "Unidad tributaria en Venezuela: conversor a bolívares",
  title: "Unidad tributaria en Venezuela: valor y conversor",
  description: "Convierte unidades tributarias a bolívares y bolívares a unidades tributarias con el valor vigente de la UT.",
  intro: ["La unidad tributaria (UT) es la medida que usa el SENIAT para fijar montos de impuestos, multas y límites."],
  comoSeCalcula: [
    "Unidades tributarias por el valor de la UT ({{ve.unidad-tributaria}}) dan bolívares.",
  ],
  faq: [],
  glosario: [{ termino: "UT", definicion: "Unidad tributaria, valor que fija el SENIAT." }],
});
