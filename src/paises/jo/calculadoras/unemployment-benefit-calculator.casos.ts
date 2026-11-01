import { definirCasos } from "@/motor/calculo";
import calculadora from "./unemployment-benefit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "600 de salario y 200 aportes: seis meses",
    origen: {
      tipo: "recalculado",
      detalle: "Descuento 17,5 % de 600 = 105. Mes 1: 450 − 105 = 345; mes 2: 390 − 105 = 285; mes 3: 330 − 105 = 225; meses 4 a 6: 270 − 105 = 165 × 3 = 495. Total 1.350.",
    },
    fecha: "2026-10-24",
    entrada: { salario: 600, aportes: 200, sexo: "male", edad: 40 },
    esperado: { mes1: 345, meses: 6, total: 1350, descuento: 105 },
  },
  {
    nombre: "2.000 de salario y 100 aportes: tope de 2026",
    origen: { tipo: "recalculado", detalle: "Descuento 350. Mes 1: 1.500 − 350 = 1.150 → tope 623; mes 2: 950 → 623; mes 3: 750 → 623. Tres meses (menos de 180 aportes): 1.869." },
    fecha: "2026-10-24",
    entrada: { salario: 2000, aportes: 100, sexo: "female", edad: 30 },
    esperado: { mes1: 623, meses: 3, total: 1869 },
  },
  {
    nombre: "Tope de 2025",
    origen: { tipo: "recalculado", detalle: "Mismo caso en 2025: 612 × 3 = 1.836." },
    fecha: "2025-06-01",
    entrada: { salario: 2000, aportes: 100, sexo: "female", edad: 30 },
    esperado: { mes1: 612, total: 1836 },
  },
  {
    nombre: "Menos de 36 aportes",
    origen: { tipo: "recalculado", detalle: "Art. 50: 36 aportes como mínimo." },
    fecha: "2026-10-24",
    entrada: { salario: 600, aportes: 20, sexo: "male", edad: 30 },
    esperado: { mes1: null, elegible: "يلزم 36 اشتراكًا على الأقل" },
  },
]);
