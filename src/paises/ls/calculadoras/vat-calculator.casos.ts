import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add standard VAT to M1 000",
    origen: { tipo: "recalculado", detalle: "RSL tax rates page: 15%. 1 000 × 15% = 150. Total 1 150." },
    fecha: "2026-10-27",
    entrada: { monto: 1000, modo: "sin", tasa: "standard" },
    esperado: { iva: 150, conIva: 1150, tasa: 15 },
  },
  {
    nombre: "Remove VAT from M1 150",
    origen: { tipo: "recalculado", detalle: "1 150 / 1.15 = 1 000. VAT 150." },
    fecha: "2026-10-27",
    entrada: { monto: 1150, modo: "con", tasa: "standard" },
    esperado: { iva: 150, sinIva: 1000 },
  },
  {
    nombre: "Electricity bill including VAT",
    origen: { tipo: "recalculado", detalle: "Electricity 10%. 550 / 1.10 = 500. VAT 50." },
    fecha: "2026-10-27",
    entrada: { monto: 550, modo: "con", tasa: "electricity" },
    esperado: { iva: 50, sinIva: 500, tasa: 10 },
  },
  {
    nombre: "Zero-rated export",
    origen: { tipo: "recalculado", detalle: "0%: no VAT." },
    fecha: "2026-10-27",
    entrada: { monto: 2000, modo: "sin", tasa: "zero" },
    esperado: { iva: 0, conIva: 2000 },
  },
]);
