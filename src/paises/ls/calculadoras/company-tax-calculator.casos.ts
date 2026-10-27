import { definirCasos } from "@/motor/calculo";
import calculadora from "./company-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Ordinary company with M500 000 profit",
    origen: { tipo: "recalculado", detalle: "RSL tax rates page: other companies 25%. 500 000 × 25% = 125 000." },
    fecha: "2026-10-27",
    entrada: { renta: 500000, tipo: "other" },
    esperado: { impuesto: 125000, despues: 375000, tasa: 25 },
  },
  {
    nombre: "Manufacturing company",
    origen: { tipo: "recalculado", detalle: "Manufacturing companies 10%. 500 000 × 10% = 50 000." },
    fecha: "2026-10-27",
    entrada: { renta: 500000, tipo: "manufacturing" },
    esperado: { impuesto: 50000, tasa: 10 },
  },
  {
    nombre: "Commercial farming",
    origen: { tipo: "recalculado", detalle: "Commercial farming 10%. 120 000 × 10% = 12 000." },
    fecha: "2026-10-27",
    entrada: { renta: 120000, tipo: "farming" },
    esperado: { impuesto: 12000 },
  },
]);
