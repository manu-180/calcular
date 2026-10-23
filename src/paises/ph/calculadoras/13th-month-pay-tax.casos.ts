import { definirCasos } from "@/motor/calculo";
import calculadora from "./13th-month-pay-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Under the ₱90,000 ceiling",
    origen: { tipo: "recalculado", detalle: "40,000 + 20,000 = 60,000, all tax-free; 30,000 of room left." },
    fecha: "2026-10-16",
    entrada: { trece: 40000, otros: 20000, gravable: 400000 },
    esperado: { exento: 60000, gravado: 0, impuesto: 0, neto: 60000, margen: 30000 },
  },
  {
    nombre: "₱150,000 of bonuses on a ₱600,000 salary",
    origen: {
      tipo: "recalculado",
      detalle: "90,000 tax-free, 60,000 taxable. Tax on 660,000 = 22,500 + 260,000 × 20% = 74,500; on 600,000 = 62,500. Difference 12,000.",
    },
    fecha: "2026-10-16",
    entrada: { trece: 50000, otros: 100000, gravable: 600000 },
    esperado: { exento: 90000, gravado: 60000, impuesto: 12000, neto: 138000, tasa: 20 },
  },
  {
    nombre: "Taxable part crosses a bracket",
    origen: {
      tipo: "recalculado",
      detalle: "Taxable 10,000 on 245,000: tax on 255,000 = 750, on 245,000 = 0. Tax 750.",
    },
    fecha: "2026-10-16",
    entrada: { trece: 100000, otros: 0, gravable: 245000 },
    esperado: { gravado: 10000, impuesto: 750, tasa: 15 },
  },
  {
    nombre: "No bonuses",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { trece: 0, otros: 0, gravable: 400000 },
    esperaError: true,
  },
]);
