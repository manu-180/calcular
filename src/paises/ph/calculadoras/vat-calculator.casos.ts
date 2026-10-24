import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Remove VAT from ₱1,120",
    origen: { tipo: "recalculado", detalle: "1,120 / 1.12 = 1,000; VAT 120." },
    fecha: "2026-10-16",
    entrada: { monto: 1120, modo: "inclusive", insumos: null },
    esperado: { iva: 120, neto: 1000, total: 1120, tasa: 12, pagar: null },
  },
  {
    nombre: "Add VAT to ₱50,000 and credit input VAT",
    origen: { tipo: "recalculado", detalle: "50,000 × 12% = 6,000; total 56,000. Input VAT 2,500, payable 3,500." },
    fecha: "2026-10-16",
    entrada: { monto: 50000, modo: "exclusive", insumos: 2500 },
    esperado: { iva: 6000, total: 56000, pagar: 3500 },
  },
  {
    nombre: "Odd amount",
    origen: { tipo: "recalculado", detalle: "999 / 1.12 = 891.96; VAT 107.04." },
    fecha: "2026-10-16",
    entrada: { monto: 999, modo: "inclusive", insumos: null },
    esperado: { iva: 107.04, neto: 891.96 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { monto: 0, modo: "inclusive", insumos: null },
    esperaError: true,
  },
]);
