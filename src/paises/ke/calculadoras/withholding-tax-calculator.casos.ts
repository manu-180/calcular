import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Professional fees to a resident",
    origen: { tipo: "recalculado", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/individual-withholding-tax", detalle: "5% × 100,000 = 5,000." },
    fecha: "2026-10-17",
    entrada: { importe: 100000, tipo: "professional", residencia: "resident" },
    esperado: { retencion: 5000, neto: 95000, tasa: 5 },
  },
  {
    nombre: "Professional fees to a non-resident",
    origen: { tipo: "recalculado", detalle: "20% × 100,000 = 20,000." },
    fecha: "2026-10-17",
    entrada: { importe: 100000, tipo: "professional", residencia: "non-resident" },
    esperado: { retencion: 20000, tasa: 20 },
  },
  {
    nombre: "Contractual fees to a resident",
    origen: { tipo: "recalculado", detalle: "3% × 250,000 = 7,500." },
    fecha: "2026-10-17",
    entrada: { importe: 250000, tipo: "contractual", residencia: "resident" },
    esperado: { retencion: 7500 },
  },
  {
    nombre: "Rent of a building to a non-resident",
    origen: { tipo: "recalculado", detalle: "30% × 50,000 = 15,000." },
    fecha: "2026-10-17",
    entrada: { importe: 50000, tipo: "rent-buildings", residencia: "non-resident" },
    esperado: { retencion: 15000 },
  },
]);
