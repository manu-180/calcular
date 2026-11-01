import { definirCasos } from "@/motor/calculo";
import calculadora from "./unfair-dismissal-compensation";

export default definirCasos(calculadora, [
  {
    nombre: "Ocho meses de servicio, sin preaviso",
    origen: { tipo: "recalculado", detalle: "Art. 47: 1/1/2026 a 1/9/2026 = 243 días; 243/365 × 2 × 2.500 = 3.328,77; más 1 mes de preaviso (art. 46) = 5.828,77." },
    fecha: "2026-10-29",
    entrada: { salario: 2500, inicio: "2026-01-01", fin: "2026-09-01", sinAviso: true },
    esperado: { compensacion: 3328.77, preaviso: 2500, total: 5828.77 },
  },
  {
    nombre: "Un año exacto con preaviso",
    origen: { tipo: "recalculado", detalle: "1/1/2025 a 1/1/2026 = 365 días: 2 meses × 3.000 = 6.000." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2025-01-01", fin: "2026-01-01", sinAviso: false },
    esperado: { compensacion: 6000, preaviso: 0, total: 6000, meses: 2 },
  },
  {
    nombre: "Quince años: tope de dos años de salario",
    origen: { tipo: "recalculado", detalle: "Art. 47: 15 años × 2 = 30 meses, tope 24 meses × 3.000 = 72.000." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2011-01-01", fin: "2026-01-01", sinAviso: false },
    esperado: { compensacion: 72000, meses: 24 },
  },
  {
    nombre: "Salario cero",
    origen: { tipo: "recalculado", detalle: "Sin salario no hay cálculo." },
    fecha: "2026-10-29",
    entrada: { salario: 0, inicio: "2025-01-01", fin: "2026-01-01", sinAviso: false },
    esperaError: true,
  },
]);
