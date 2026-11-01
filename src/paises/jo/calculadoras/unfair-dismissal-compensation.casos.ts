import { definirCasos } from "@/motor/calculo";
import calculadora from "./unfair-dismissal-compensation";

export default definirCasos(calculadora, [
  {
    nombre: "Cinco años sin preaviso",
    origen: { tipo: "recalculado", detalle: "1.826 días = 5,00274 años × medio mes = 2,50137 meses × 600 = 1.500,822. Preaviso 1 mes = 600. Total 2.100,822." },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2021-01-01", fin: "2026-01-01", avisado: false },
    esperado: { compensacion: 1500.822, preaviso: 600, total: 2100.822 },
  },
  {
    nombre: "Un año: rige el mínimo de dos meses",
    origen: { tipo: "recalculado", detalle: "365 días = 1 año × 0,5 = 0,5 mes, menos que el mínimo de 2. 2 × 600 = 1.200; con preaviso dado, total 1.200." },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2025-01-01", fin: "2026-01-01", avisado: true },
    esperado: { meses: 2, compensacion: 1200, preaviso: 0, total: 1200 },
  },
  {
    nombre: "Sin salario",
    origen: { tipo: "recalculado", detalle: "Salario 0." },
    fecha: "2026-10-24",
    entrada: { salario: 0, inicio: "2025-01-01", fin: "2026-01-01", avisado: false },
    esperaError: true,
  },
]);
