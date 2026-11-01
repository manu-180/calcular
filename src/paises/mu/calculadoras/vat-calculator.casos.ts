import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 15% to Rs 1,000",
    origen: { tipo: "recalculado", url: "https://www.mra.mu/download/VATAct.pdf", detalle: "Fourth Schedule: 15%. 1,000 × 0.15 = 150." },
    fecha: "2026-10-24",
    entrada: { importe: 1000, sentido: "add" },
    esperado: { conIva: 1150, iva: 150, sinIva: 1000, tasa: 15 },
  },
  {
    nombre: "Take VAT out of Rs 2,300",
    origen: { tipo: "recalculado", detalle: "2,300 / 1.15 = 2,000. VAT 300." },
    fecha: "2026-10-24",
    entrada: { importe: 2300, sentido: "remove" },
    esperado: { sinIva: 2000, iva: 300 },
  },
  {
    nombre: "Take VAT out of Rs 999",
    origen: { tipo: "recalculado", detalle: "999 / 1.15 = 868.70. VAT 130.30." },
    fecha: "2026-10-24",
    entrada: { importe: 999, sentido: "remove" },
    esperado: { sinIva: 868.7, iva: 130.3 },
  },
]);
