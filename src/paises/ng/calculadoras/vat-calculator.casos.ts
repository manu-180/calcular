import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 7.5% VAT",
    origen: { tipo: "recalculado", detalle: "100,000 × 7.5% = 7,500; total 107,500." },
    fecha: "2026-10-16",
    entrada: { importe: 100000, sentido: "add" },
    esperado: { bruto: 107500, iva: 7500, neto: 100000, tasa: 7.5 },
  },
  {
    nombre: "Remove VAT",
    origen: { tipo: "recalculado", detalle: "215,000 / 1.075 = 200,000; VAT 15,000." },
    fecha: "2026-10-16",
    entrada: { importe: 215000, sentido: "remove" },
    esperado: { neto: 200000, iva: 15000 },
  },
]);
