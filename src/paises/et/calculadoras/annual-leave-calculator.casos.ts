import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "First year of service",
    origen: { tipo: "recalculado", detalle: "Article 77(1)(a): 16 working days for the first year." },
    fecha: "2026-10-27",
    entrada: { anios: 1, meses: 0, tomados: 0, salario: 13000, diasMes: 26 },
    esperado: { derecho: 16, pendientes: 16, diario: 500, valor: 8000 },
  },
  {
    nombre: "Fifth year, 4 days taken",
    origen: { tipo: "recalculado", detalle: "16 + one day for each two additional years: 16 + 2 = 18. 18 − 4 = 14 days × 13,000 / 26 = 7,000." },
    fecha: "2026-10-27",
    entrada: { anios: 5, meses: 0, tomados: 4, salario: 13000, diasMes: 26 },
    esperado: { derecho: 18, pendientes: 14, valor: 7000 },
  },
  {
    nombre: "Second year still 16 days",
    origen: { tipo: "recalculado", detalle: "One additional year is not yet two: 16 days." },
    fecha: "2026-10-27",
    entrada: { anios: 2, meses: 0, tomados: 0, salario: 13000, diasMes: 26 },
    esperado: { derecho: 16 },
  },
  {
    nombre: "Six months of service",
    origen: { tipo: "recalculado", detalle: "Article 77(5): proportional, 16 × 6 / 12 = 8 days." },
    fecha: "2026-10-27",
    entrada: { anios: 0, meses: 6, tomados: 0, salario: 13000, diasMes: 26 },
    esperado: { derecho: 8, valor: 4000 },
  },
]);
