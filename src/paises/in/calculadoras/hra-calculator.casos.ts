import { definirCasos } from "@/motor/calculo";
import calculadora from "./hra-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Metro city, rent is the limit",
    origen: {
      tipo: "recalculado",
      detalle: "Least of HRA 20,000; 50% of 50,000 = 25,000; rent 18,000 − 5,000 = 13,000. Exempt 13,000 a month, 1,56,000 a year; taxable 84,000.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 50000, hra: 20000, alquiler: 18000, ciudad: "metro", meses: 12 },
    esperado: { exentoMes: 13000, exentoAnual: 156000, gravableAnual: 84000, porSalario: 25000, porAlquiler: 13000 },
  },
  {
    nombre: "Other city, 40% of salary is the limit",
    origen: { tipo: "recalculado", detalle: "Least of HRA 15,000; 40% of 30,000 = 12,000; rent 20,000 − 3,000 = 17,000. Exempt 12,000 a month, 1,44,000 a year." },
    fecha: "2026-10-15",
    entrada: { salario: 30000, hra: 15000, alquiler: 20000, ciudad: "other", meses: 12 },
    esperado: { exentoMes: 12000, exentoAnual: 144000, limite: "40% of salary" },
  },
  {
    nombre: "HRA received is the limit, 10 months of rent",
    origen: { tipo: "recalculado", detalle: "Least of HRA 10,000; 30,000; 30,000 − 6,000 = 24,000. Exempt 10,000 × 10 months = 1,00,000." },
    fecha: "2026-10-15",
    entrada: { salario: 60000, hra: 10000, alquiler: 30000, ciudad: "metro", meses: 10 },
    esperado: { exentoAnual: 100000, gravableAnual: 0, limite: "The HRA you receive" },
  },
]);
