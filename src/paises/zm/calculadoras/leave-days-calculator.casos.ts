import { definirCasos } from "@/motor/calculo";
import calculadora from "./leave-days-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "A full year on K5,200",
    origen: {
      tipo: "recalculado",
      url: "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf",
      detalle: "12 months × 2 days = 24 days. Fifth Schedule: (5,200 × 24) / 26 = 4,800.",
    },
    fecha: "2026-10-26",
    entrada: { sueldo: 5200, meses: 12, tomados: 0 },
    esperado: { pago: 4800, dias: 24, ganados: 24, diario: 200 },
  },
  {
    nombre: "Seven months, five days taken",
    origen: { tipo: "recalculado", detalle: "14 − 5 = 9 days. (6,500 × 9) / 26 = 2,250." },
    fecha: "2026-10-26",
    entrada: { sueldo: 6500, meses: 7, tomados: 5 },
    esperado: { pago: 2250, dias: 9 },
  },
  {
    nombre: "More days taken than earned",
    origen: { tipo: "recalculado", detalle: "3 months earn 6 days." },
    fecha: "2026-10-26",
    entrada: { sueldo: 5000, meses: 3, tomados: 10 },
    esperaError: true,
  },
]);
