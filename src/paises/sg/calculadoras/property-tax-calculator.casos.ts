import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-tax-calculator";

const IRAS = "https://www.iras.gov.sg/taxes/property-tax/property-owners/property-tax-rates";

export default definirCasos(calculadora, [
  {
    nombre: "IRAS example 1: owner-occupied AV $36,000",
    origen: { tipo: "oficial", url: IRAS, detalle: "First 12,000 × 0% = 0, next 24,000 × 4% = 960. Total 960." },
    fecha: "2026-10-14",
    entrada: { valorAnual: 36000, uso: "ocupada" },
    esperado: { impuesto: 960 },
  },
  {
    nombre: "IRAS example 2: owner-occupied AV $84,000",
    origen: { tipo: "oficial", url: IRAS, detalle: "0 + 1,120 + 600 + 2,500 + 1,260 = 5,480." },
    fecha: "2026-10-14",
    entrada: { valorAnual: 84000, uso: "ocupada" },
    esperado: { impuesto: 5480 },
  },
  {
    nombre: "Rented out at AV $36,000",
    origen: { tipo: "recalculado", url: IRAS, detalle: "First 30,000 × 12% = 3,600, next 6,000 × 20% = 1,200. Total 4,800." },
    fecha: "2026-10-14",
    entrada: { valorAnual: 36000, uso: "no-ocupada" },
    esperado: { impuesto: 4800 },
  },
  {
    nombre: "Shop at AV $50,000",
    origen: { tipo: "recalculado", detalle: "10% × 50,000 = 5,000." },
    fecha: "2026-10-14",
    entrada: { valorAnual: 50000, uso: "otros" },
    esperado: { impuesto: 5000 },
  },
]);
