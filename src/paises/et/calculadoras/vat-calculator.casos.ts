import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 15% VAT to ETB 10,000",
    origen: { tipo: "recalculado", detalle: "Article 8(2)(b): 10,000 × 15% = 1,500; total 11,500." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, modo: "add" },
    esperado: { total: 11500, iva: 1500, neto: 10000, tasa: 15 },
  },
  {
    nombre: "Take VAT out of ETB 11,500",
    origen: { tipo: "recalculado", detalle: "11,500 / 1.15 = 10,000; VAT 1,500." },
    fecha: "2026-10-27",
    entrada: { importe: 11500, modo: "remove" },
    esperado: { total: 11500, neto: 10000, iva: 1500 },
  },
  {
    nombre: "Take VAT out of ETB 1,000",
    origen: { tipo: "recalculado", detalle: "1,000 / 1.15 = 869.57; VAT 130.43." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, modo: "remove" },
    esperado: { neto: 869.57, iva: 130.43 },
  },
]);
