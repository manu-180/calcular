import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Resident contractor invoice",
    origen: { tipo: "recalculado", detalle: "RSL tax rates page: resident contractors 5%. 50 000 × 5% = 2 500." },
    fecha: "2026-10-27",
    entrada: { monto: 50000, tipo: "resident-contractor" },
    esperado: { retencion: 2500, neto: 47500 },
  },
  {
    nombre: "Non-resident contractor",
    origen: { tipo: "recalculado", detalle: "Non-resident contractors 10%. 80 000 × 10% = 8 000." },
    fecha: "2026-10-27",
    entrada: { monto: 80000, tipo: "non-resident-contractor" },
    esperado: { retencion: 8000, neto: 72000 },
  },
  {
    nombre: "Technical services from South Africa",
    origen: { tipo: "recalculado", detalle: "7.5% for South Africa. 20 000 × 7.5% = 1 500." },
    fecha: "2026-10-27",
    entrada: { monto: 20000, tipo: "technical-rsa" },
    esperado: { retencion: 1500, tasa: 7.5 },
  },
]);
