import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 100,000 of interest",
    origen: { tipo: "recalculado", detalle: "Interest or discount from 1 April 2025: 10%. 10,000 withheld." },
    fecha: "2026-10-26",
    entrada: { tipo: "interest", importe: 100000 },
    esperado: { retencion: 10000, tasa: 10, neto: 90000 },
  },
  {
    nombre: "Interest on 1 April 2025, first day of the 10% rate",
    origen: { tipo: "recalculado", detalle: "Act No. 2 of 2025: 10% with effect from April 1, 2025. 200,000 × 10% = 20,000." },
    fecha: "2025-04-01",
    entrada: { tipo: "interest", importe: 200000 },
    esperado: { retencion: 20000 },
  },
  {
    nombre: "Rs. 50,000 dividend",
    origen: { tipo: "recalculado", detalle: "Dividends: 15%. 7,500 withheld." },
    fecha: "2026-10-26",
    entrada: { tipo: "dividend", importe: 50000 },
    esperado: { retencion: 7500, neto: 42500 },
  },
  {
    nombre: "Monthly rent of Rs. 150,000",
    origen: { tipo: "recalculado", detalle: "Above Rs. 100,000 a month: 10% on the full amount, 15,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "rent", importe: 150000 },
    esperado: { retencion: 15000, tasa: 10 },
  },
  {
    nombre: "Monthly rent of exactly Rs. 100,000",
    origen: { tipo: "recalculado", detalle: "Not above the limit: 0%." },
    fecha: "2026-10-26",
    entrada: { tipo: "rent", importe: 100000 },
    esperado: { retencion: 0, tasa: 0, neto: 100000 },
  },
]);
