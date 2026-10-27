import { definirCasos } from "@/motor/calculo";
import calculadora from "./turnover-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ZRA example: AZ Limited, January 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.zra.org.zm/wp-content/uploads/2026/06/Turnover-Tax.pdf",
      detalle: "K6,000 − K2,500 = K3,500. K3,500 × 5% = K175.",
    },
    fecha: "2026-10-26",
    entrada: { ventas: 6000 },
    esperado: { impuesto: 175, gravado: 3500, exento: 2500 },
  },
  {
    nombre: "Sales of K2,000 pay nothing",
    origen: { tipo: "recalculado", detalle: "Below K2,500 a month the rate is 0%." },
    fecha: "2026-10-26",
    entrada: { ventas: 2000 },
    esperado: { impuesto: 0, exento: 2000 },
  },
  {
    nombre: "K100,000 in a month",
    origen: { tipo: "recalculado", detalle: "(100,000 − 2,500) × 5% = 4,875." },
    fecha: "2026-10-26",
    entrada: { ventas: 100000 },
    esperado: { impuesto: 4875 },
  },
]);
