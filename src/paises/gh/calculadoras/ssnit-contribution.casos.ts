import { definirCasos } from "@/motor/calculo";
import calculadora from "./ssnit-contribution";

export default definirCasos(calculadora, [
  {
    nombre: "GH₵5,000 basic salary",
    origen: { tipo: "recalculado", detalle: "5.5% = 275, 13% = 650, total 18.5% = 925; Tier 1 13.5% = 675, Tier 2 5% = 250." },
    fecha: "2026-10-18",
    entrada: { basico: 5000 },
    esperado: { empleado: 275, empleador: 650, total: 925, tier1: 675, tier2: 250, anual: 11100 },
  },
  {
    nombre: "Minimum wage month",
    origen: { tipo: "recalculado", detalle: "566.02 × 5.5% = 31.13; × 13% = 73.58." },
    fecha: "2026-10-18",
    entrada: { basico: 566.02 },
    esperado: { empleado: 31.13, empleador: 73.58 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { basico: 0 },
    esperaError: true,
  },
]);
