import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "GRA example: VAT inside D1,150,000",
    origen: {
      tipo: "oficial",
      url: "https://www.gra.gm/download-file/8d0cfa28-d217-11ed-9b31-029254d29bb1",
      detalle: "A taxable supply of D1,150,000 holds D150,000 of VAT: 1,150,000 / 115 × 15.",
    },
    fecha: "2026-10-27",
    entrada: { monto: 1150000, modo: "quitar" },
    esperado: { iva: 150000, neto: 1000000 },
  },
  {
    nombre: "Add VAT to D1,000",
    origen: { tipo: "recalculado", detalle: "1,000 × 15% = 150. Total 1,150." },
    fecha: "2026-10-27",
    entrada: { monto: 1000, modo: "sumar" },
    esperado: { iva: 150, total: 1150 },
  },
  {
    nombre: "Take VAT out of D99.99",
    origen: { tipo: "recalculado", detalle: "99.99 / 1.15 = 86.95. VAT 13.04." },
    fecha: "2026-10-27",
    entrada: { monto: 99.99, modo: "quitar" },
    esperado: { iva: 13.04, neto: 86.95 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, modo: "sumar" },
    esperaError: true,
  },
]);
