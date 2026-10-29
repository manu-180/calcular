import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Dismissed after 3 years with 10 leave days and notice paid",
    origen: {
      tipo: "recalculado",
      detalle:
        "Daily 12,000 / (4.333 × 5) = 553.89. 8 days worked 4,431.12. Leave 10 × 553.89 = 5,538.90. Week 12,000 / 4.333 = 2,769.44; severance 3 × 2,769.44 = 8,308.32. One month notice 12,000. Total 30,278.34.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 12000, dias: 5, trabajados: 8, licencia: 10, motivo: "dismissed", anios: 3, sinPreaviso: true, antiguedad: "over-1-year" },
    esperado: { diaria: 553.89, sueldo: 4431.12, vacaciones: 5538.9, indemnizacion: 8308.32, aviso: 12000, total: 30278.34 },
  },
  {
    nombre: "Resigned before 65 with 4 leave days",
    origen: { tipo: "recalculado", detalle: "No severance on resignation before 65. Leave 4 × 553.89 = 2,215.56." },
    fecha: "2026-10-27",
    entrada: { salario: 12000, dias: 5, trabajados: 0, licencia: 4, motivo: "resigned", anios: 6, sinPreaviso: false, antiguedad: null },
    esperado: { indemnizacion: 0, aviso: 0, total: 2215.56 },
  },
]);
