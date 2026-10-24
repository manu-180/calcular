import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 16% to KSh 10,000",
    origen: { tipo: "recalculado", url: "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/value-added-tax", detalle: "10,000 × 16% = 1,600. Total 11,600." },
    fecha: "2026-10-17",
    entrada: { importe: 10000, modo: "add" },
    esperado: { neto: 10000, iva: 1600, total: 11600, tasa: 16 },
  },
  {
    nombre: "Take VAT out of KSh 11,600",
    origen: { tipo: "recalculado", detalle: "11,600 / 1.16 = 10,000. VAT 1,600." },
    fecha: "2026-10-17",
    entrada: { importe: 11600, modo: "remove" },
    esperado: { neto: 10000, iva: 1600 },
  },
  {
    nombre: "Take VAT out of KSh 1,000",
    origen: { tipo: "recalculado", detalle: "1,000 / 1.16 = 862.07. VAT 137.93." },
    fecha: "2026-10-17",
    entrada: { importe: 1000, modo: "remove" },
    esperado: { neto: 862.07, iva: 137.93 },
  },
]);
