import { definirCasos } from "@/motor/calculo";
import calculadora from "./in-hand-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹12 lakh CTC, PF on the ceiling, new regime",
    origen: {
      tipo: "recalculado",
      detalle:
        "Basic 50,000 a month; PF on 25,000 = 3,000 a month each side (36,000 a year). Gratuity 50,000 × 15 / 26 = 28,846.15. Gross 11,35,153.85. Taxable 10,60,153.85, slab tax 46,015.39 fully rebated. In-hand 11,35,153.85 − 36,000 − 2,400 = 10,96,753.85, or 91,396.15 a month.",
    },
    fecha: "2026-10-15",
    entrada: { ctc: 1200000, basico: 50, pf: "ceiling", gratuity: true, regimen: "new", profesional: 2400, otrasDeducciones: 0 },
    esperado: { bruto: 1135153.85, pfEmpleado: 36000, gratuity: 28846.15, impuesto: 0, anual: 1096753.85, mensual: 91396.15 },
  },
  {
    nombre: "Same CTC in the old regime",
    origen: {
      tipo: "recalculado",
      detalle:
        "Taxable 11,35,153.85 − 50,000 − 2,400 − 36,000 PF = 10,46,753.85. Tax 12,500 + 1,00,000 + 46,753.85 × 30% = 1,26,526.16; with 4% cess 1,31,587.20. In-hand 9,65,166.65, or 80,430.55 a month.",
    },
    fecha: "2026-10-15",
    entrada: { ctc: 1200000, basico: 50, pf: "ceiling", gratuity: true, regimen: "old", profesional: 2400, otrasDeducciones: 0 },
    esperado: { impuesto: 131587.2, anual: 965166.65, mensual: 80430.55 },
  },
  {
    nombre: "₹30 lakh CTC, PF on full basic, no gratuity",
    origen: {
      tipo: "recalculado",
      detalle:
        "Basic 1,00,000 a month; PF 12,000 a month each side. Gross 28,56,000; taxable 27,81,000; tax 3,00,000 + 3,81,000 × 30% = 4,14,300; with cess 4,30,872. In-hand 22,81,128, or 1,90,094 a month.",
    },
    fecha: "2026-10-15",
    entrada: { ctc: 3000000, basico: 40, pf: "full", gratuity: false, regimen: "new", profesional: 0, otrasDeducciones: 0 },
    esperado: { bruto: 2856000, impuesto: 430872, anual: 2281128, mensual: 190094 },
  },
  {
    nombre: "CTC of zero",
    origen: { tipo: "recalculado", detalle: "There is nothing to calculate." },
    fecha: "2026-10-15",
    entrada: { ctc: 0, basico: 50, pf: "ceiling", gratuity: true, regimen: "new", profesional: 0, otrasDeducciones: 0 },
    esperaError: true,
  },
]);
