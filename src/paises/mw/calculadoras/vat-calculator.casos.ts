import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add VAT to K10,000",
    origen: { tipo: "recalculado", detalle: "VAT Act s. 9 as amended in 2025: 10,000 × 17.5% = 1,750. Total 11,750." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, modo: "add" },
    esperado: { iva: 1750, total: 11750, tasa: 17.5 },
  },
  {
    nombre: "Take VAT out of K11,750",
    origen: { tipo: "recalculado", detalle: "11,750 / 1.175 = 10,000. VAT 1,750." },
    fecha: "2026-10-27",
    entrada: { importe: 11750, modo: "remove" },
    esperado: { neto: 10000, iva: 1750 },
  },
  {
    nombre: "Take VAT out of K1,000",
    origen: { tipo: "recalculado", detalle: "1,000 / 1.175 = 851.06. VAT 148.94." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, modo: "remove" },
    esperado: { neto: 851.06, iva: 148.94 },
  },
  {
    nombre: "Zero is rejected",
    origen: { tipo: "recalculado", detalle: "The amount has to be above zero." },
    fecha: "2026-10-27",
    entrada: { importe: 0, modo: "add" },
    esperaError: true,
  },
]);
