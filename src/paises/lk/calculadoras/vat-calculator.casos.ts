import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 18% VAT to Rs. 10,000",
    origen: { tipo: "recalculado", detalle: "10,000 × 18% = 1,800. Total 11,800." },
    fecha: "2026-10-26",
    entrada: { importe: 10000, modo: "add" },
    esperado: { total: 11800, iva: 1800, tasa: 18 },
  },
  {
    nombre: "Take VAT out of Rs. 11,800",
    origen: { tipo: "recalculado", detalle: "11,800 / 1.18 = 10,000. VAT 1,800." },
    fecha: "2026-10-26",
    entrada: { importe: 11800, modo: "remove" },
    esperado: { neto: 10000, iva: 1800 },
  },
  {
    nombre: "1 January 2024 at 18%",
    origen: { tipo: "recalculado", detalle: "The 18% rate applies from 01.01.2024. 5,900 / 1.18 = 5,000." },
    fecha: "2024-01-01",
    entrada: { importe: 5900, modo: "remove" },
    esperado: { neto: 5000, iva: 900, tasa: 18 },
  },
]);
