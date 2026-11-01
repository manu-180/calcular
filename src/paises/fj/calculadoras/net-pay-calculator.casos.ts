import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$5,000 a month",
    origen: { tipo: "recalculado", detalle: "Annual 60,000. Tax 3,600 + 20% × 10,000 = 5,600, so 466.67 a month. FNPF 8% × 5,000 = 400. Net 5,000 − 466.67 − 400 = 4,133.33. Year: 60,000 − 5,600 − 4,800 = 49,600." },
    fecha: "2026-10-29",
    entrada: { bruto: 5000, periodo: "month" },
    esperado: { netoPeriodo: 4133.33, paye: 466.67, fnpf: 400, totalDeducido: 866.67, netoAnual: 49600 },
  },
  {
    nombre: "FJ$2,000 a month, under the tax free threshold",
    origen: { tipo: "recalculado", detalle: "Annual 24,000 is below 30,000, so no PAYE. FNPF 8% × 2,000 = 160. Net 1,840." },
    fecha: "2026-10-29",
    entrada: { bruto: 2000, periodo: "month" },
    esperado: { netoPeriodo: 1840, paye: 0, fnpf: 160, netoAnual: 22080 },
  },
  {
    nombre: "FJ$100,000 a year",
    origen: { tipo: "recalculado", detalle: "Tax 3,600 + 20% × (100,000 − 50,000) = 13,600. FNPF 8,000. Net 78,400." },
    fecha: "2026-10-29",
    entrada: { bruto: 100000, periodo: "year" },
    esperado: { netoPeriodo: 78400, paye: 13600, fnpf: 8000 },
  },
  {
    nombre: "FJ$1,000 a week",
    origen: { tipo: "recalculado", detalle: "Annual 52,000. Tax 3,600 + 20% × 2,000 = 4,000, so 76.92 a week. FNPF 80. Net 843.08." },
    fecha: "2026-10-29",
    entrada: { bruto: 1000, periodo: "week" },
    esperado: { netoPeriodo: 843.08, paye: 76.92, fnpf: 80 },
  },
  { nombre: "Zero pay is rejected", origen: { tipo: "recalculado", detalle: "Pay must be above zero." }, fecha: "2026-10-29", entrada: { bruto: 0, periodo: "month" }, esperaError: true },
]);
