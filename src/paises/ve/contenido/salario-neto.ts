import { definirContenido } from "@/motor/calculo";

// Borrador: no se publica hasta verificar sus datos en fuente primaria.
export default definirContenido({
  calculadora: "ve.salario-neto",
  h1: "Calculadora de salario neto en Venezuela",
  title: "Salario neto en Venezuela: IVSS, paro forzoso y FAOV",
  description: "Calcula tu salario neto con los descuentos de ley: Seguro Social, paro forzoso y FAOV.",
  intro: ["Tu salario neto es lo que cobras después de los descuentos de ley: el Seguro Social (IVSS), el Régimen Prestacional de Empleo (paro forzoso) y el FAOV para la vivienda."],
  comoSeCalcula: [
    "IVSS: {{ve.ivss-trabajador}} del salario, con un tope de {{ve.ivss-tope-salarios-minimos}} salarios mínimos.",
    "Paro forzoso: {{ve.rpe-trabajador}}, con un tope de {{ve.rpe-tope-salarios-minimos}} salarios mínimos.",
    "FAOV: {{ve.faov-trabajador}} de todo el salario.",
  ],
  faq: [],
  glosario: [{ termino: "FAOV", definicion: "Fondo de Ahorro Obligatorio para la Vivienda." }],
});
