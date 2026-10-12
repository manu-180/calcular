import { definirContenido } from "@/motor/calculo";

// Borrador: no se publica hasta verificar sus datos en fuente primaria.
export default definirContenido({
  calculadora: "ve.igtf",
  h1: "Calculadora de IGTF en Venezuela",
  title: "IGTF en Venezuela: impuesto por pagar en divisas",
  description: "Calcula el impuesto a las grandes transacciones financieras (IGTF) de un pago en divisas o criptoactivos.",
  intro: ["Cuando pagas en divisas o criptoactivos a un contribuyente especial, se cobra el IGTF sobre el monto pagado."],
  comoSeCalcula: [
    "IGTF: {{ve.igtf-divisas}} del monto pagado en divisas.",
  ],
  faq: [],
  glosario: [{ termino: "IGTF", definicion: "Impuesto a las grandes transacciones financieras." }],
});
