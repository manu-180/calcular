import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Professional fees of Ushs 5,000,000",
    origen: { tipo: "recalculado", detalle: "Schedule 4, Part X: 6% × 5,000,000 = 300,000. Payee receives 4,700,000." },
    fecha: "2026-10-24",
    entrada: { importe: 5000000, tipo: "professional-fees" },
    esperado: { retencion: 300000, neto: 4700000, tasa: 6 },
  },
  {
    nombre: "Goods of Ushs 800,000",
    origen: { tipo: "recalculado", detalle: "Section 136: not above 1,000,000, so no withholding." },
    fecha: "2026-10-24",
    entrada: { importe: 800000, tipo: "goods-services" },
    esperado: { retencion: 0, neto: 800000 },
  },
  {
    nombre: "Goods of Ushs 2,000,000",
    origen: { tipo: "recalculado", detalle: "6% × 2,000,000 = 120,000." },
    fecha: "2026-10-24",
    entrada: { importe: 2000000, tipo: "goods-services" },
    esperado: { retencion: 120000 },
  },
  {
    nombre: "Dividend from a listed company",
    origen: { tipo: "recalculado", detalle: "Part IX, paragraph 2: 10% × 1,000,000 = 100,000." },
    fecha: "2026-10-24",
    entrada: { importe: 1000000, tipo: "listed-dividends" },
    esperado: { retencion: 100000, tasa: 10 },
  },
  {
    nombre: "Interest paid to a resident",
    origen: { tipo: "recalculado", detalle: "Part IX, paragraph 1: 15% × 1,000,000 = 150,000." },
    fecha: "2026-10-24",
    entrada: { importe: 1000000, tipo: "interest-dividends" },
    esperado: { retencion: 150000, tasa: 15 },
  },
]);
