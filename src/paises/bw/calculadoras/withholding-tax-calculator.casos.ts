import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Dividend of P10 000 to a resident",
    origen: { tipo: "recalculado", detalle: "Schedule 1, Part I, paragraph 7 (a) of the Income Tax Act, 2026: 10%. 1 000 withheld." },
    fecha: "2026-10-27",
    entrada: { monto: 10000, residencia: "resident", tipoResidente: "dividends", tipoNoResidente: null },
    esperado: { retencion: 1000, neto: 9000, tasa: 10 },
  },
  {
    nombre: "Rent of P8 000 paid by a business",
    origen: { tipo: "recalculado", detalle: "Paragraph 7 (e): 5%. 400 withheld." },
    fecha: "2026-10-27",
    entrada: { monto: 8000, residencia: "resident", tipoResidente: "rent", tipoNoResidente: null },
    esperado: { retencion: 400, tasa: 5 },
  },
  {
    nombre: "Construction contract payment of P250 000",
    origen: { tipo: "recalculado", detalle: "Paragraph 7 (d): 3%. 7 500 withheld." },
    fecha: "2026-10-27",
    entrada: { monto: 250000, residencia: "resident", tipoResidente: "construction", tipoNoResidente: null },
    esperado: { retencion: 7500 },
  },
  {
    nombre: "Technical fees of P50 000 to a non-resident",
    origen: { tipo: "recalculado", detalle: "Paragraph 6 (d): 15%. 7 500 withheld, 42 500 paid." },
    fecha: "2026-10-27",
    entrada: { monto: 50000, residencia: "non-resident", tipoResidente: null, tipoNoResidente: "technical-fees" },
    esperado: { retencion: 7500, neto: 42500, tasa: 15 },
  },
  {
    nombre: "Insurance premium of P20 000 to a non-resident",
    origen: { tipo: "recalculado", detalle: "Paragraph 6 (e): 3%. 600 withheld." },
    fecha: "2026-10-27",
    entrada: { monto: 20000, residencia: "non-resident", tipoResidente: null, tipoNoResidente: "insurance-premium" },
    esperado: { retencion: 600 },
  },
  {
    nombre: "Zero amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, residencia: "resident", tipoResidente: "dividends", tipoNoResidente: null },
    esperaError: true,
  },
]);
