import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Dividend of RWF 1,000,000",
    origen: { tipo: "recalculado", detalle: "15% × 1,000,000 = 150,000; the shareholder receives 850,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "dividends", monto: 1000000, registrado: null },
    esperado: { impuesto: 150000, neto: 850000, tasa: 15 },
  },
  {
    nombre: "Public tender to a registered supplier",
    origen: { tipo: "recalculado", detalle: "3% of the invoice without VAT: 5,000,000 × 3% = 150,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "tender", monto: 5000000, registrado: true },
    esperado: { impuesto: 150000, tasa: 3 },
  },
  {
    nombre: "Public tender to a supplier with no recent return",
    origen: { tipo: "recalculado", detalle: "15% applies: 5,000,000 × 15% = 750,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "tender", monto: 5000000, registrado: false },
    esperado: { impuesto: 750000, tasa: 15 },
  },
  {
    nombre: "Board allowance",
    origen: { tipo: "recalculado", detalle: "30% × 400,000 = 120,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "board", monto: 400000, registrado: null },
    esperado: { impuesto: 120000, neto: 280000 },
  },
  {
    nombre: "Imports with CIF value RWF 20,000,000",
    origen: { tipo: "recalculado", detalle: "5% × 20,000,000 = 1,000,000." },
    fecha: "2026-10-26",
    entrada: { tipo: "imports", monto: 20000000, registrado: null },
    esperado: { impuesto: 1000000 },
  },
]);
