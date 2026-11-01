import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add VAT to RWF 100,000",
    origen: { tipo: "recalculado", detalle: "100,000 × 18% = 18,000; total 118,000." },
    fecha: "2026-10-26",
    entrada: { monto: 100000, modo: "add" },
    esperado: { iva: 18000, total: 118000, neto: 100000 },
  },
  {
    nombre: "Take VAT out of RWF 59,000",
    origen: { tipo: "recalculado", detalle: "59,000 ÷ 1.18 = 50,000; VAT 9,000." },
    fecha: "2026-10-26",
    entrada: { monto: 59000, modo: "remove" },
    esperado: { neto: 50000, iva: 9000 },
  },
]);
