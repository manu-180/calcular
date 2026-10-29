import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 14% VAT to P1 000",
    origen: { tipo: "recalculado", detalle: "Section 7 (2) (b) of the VAT Act, 2026: 14%. 1 000 × 14% = 140; 1 140 in total." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, modo: "add" },
    esperado: { iva: 140, conIva: 1140, sinIva: 1000, tasa: 14 },
  },
  {
    nombre: "Take VAT out of P1 140",
    origen: { tipo: "recalculado", detalle: "1 140 / 1.14 = 1 000; VAT 140." },
    fecha: "2026-10-27",
    entrada: { importe: 1140, modo: "remove" },
    esperado: { sinIva: 1000, iva: 140 },
  },
  {
    nombre: "Take VAT out of P99.99",
    origen: { tipo: "recalculado", detalle: "99.99 / 1.14 = 87.71; VAT 12.28." },
    fecha: "2026-10-27",
    entrada: { importe: 99.99, modo: "remove" },
    esperado: { sinIva: 87.71, iva: 12.28 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { importe: 0, modo: "add" },
    esperaError: true,
  },
]);
