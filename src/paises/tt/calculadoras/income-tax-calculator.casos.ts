import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$240,000 a year with TT$8,814 of NIS",
    origen: {
      tipo: "recalculado",
      detalle: "Deduction 70% × 8,814 = 6,169.80. Chargeable income 240,000 − 90,000 − 6,169.80 = 143,830.20. Tax 25% = 35,957.55.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 240000, nis: 8814, pension: 0, otras: 0 },
    esperado: { impuesto: 35957.55, deduccion: 6169.8, imponible: 143830.2, impuestoAlto: 0 },
  },
  {
    nombre: "TT$1,500,000 a year, deduction capped",
    origen: {
      tipo: "recalculado",
      detalle: "NIS and pension 6,169.80 + 70,000 capped at 60,000. Chargeable income 1,350,000. Tax 25% × 1,000,000 + 30% × 350,000 = 355,000.",
    },
    fecha: "2026-10-27",
    entrada: { ingreso: 1500000, nis: 8814, pension: 70000, otras: 0 },
    esperado: { impuesto: 355000, deduccion: 60000, impuestoBajo: 250000, impuestoAlto: 105000 },
  },
  {
    nombre: "Income below the allowance",
    origen: { tipo: "recalculado", detalle: "85,000 is below the 90,000 personal allowance, so the tax is 0." },
    fecha: "2026-10-27",
    entrada: { ingreso: 85000, nis: 0, pension: 0, otras: 0 },
    esperado: { impuesto: 0, imponible: 0 },
  },
  {
    nombre: "Tertiary education claim",
    origen: { tipo: "recalculado", detalle: "200,000 − 90,000 − 20,000 = 90,000 chargeable. Tax 22,500." },
    fecha: "2026-10-27",
    entrada: { ingreso: 200000, nis: 0, pension: 0, otras: 20000 },
    esperado: { impuesto: 22500 },
  },
]);
