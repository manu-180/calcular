import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "₱30,000 a month",
    origen: {
      tipo: "recalculado",
      detalle:
        "SSS: salary credit 30,000 × 5% = 1,500. PhilHealth: 30,000 × 5% = 1,500, half is 750. Pag-IBIG: 10,000 × 2% = 200. Taxable 30,000 − 2,450 = 27,550, yearly 330,600. Tax (330,600 − 250,000) × 15% = 12,090, monthly 1,007.50. Net 30,000 − 2,450 − 1,007.50 = 26,542.50.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 30000, otrosGravables: 0, minimo: false },
    esperado: { sss: 1500, philhealth: 750, pagibig: 200, impuesto: 1007.5, neto: 26542.5, anual: 318510, marginal: 15 },
  },
  {
    nombre: "₱100,000 a month hits every ceiling",
    origen: {
      tipo: "recalculado",
      detalle:
        "SSS credit capped at 35,000: 1,750. PhilHealth capped at 100,000: 5,000, half 2,500. Pag-IBIG 200. Taxable 95,550, yearly 1,146,600. Tax 102,500 + (1,146,600 − 800,000) × 25% = 189,150, monthly 15,762.50. Net 79,787.50.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 100000, otrosGravables: 0, minimo: false },
    esperado: { sss: 1750, philhealth: 2500, pagibig: 200, impuesto: 15762.5, neto: 79787.5, marginal: 25 },
  },
  {
    nombre: "₱15,000 a month is below the taxable threshold",
    origen: {
      tipo: "recalculado",
      detalle: "SSS 750, PhilHealth 750 / 2 = 375, Pag-IBIG 200. Taxable 13,675 a month, 164,100 a year, under 250,000. Net 13,675.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 15000, otrosGravables: 0, minimo: false },
    esperado: { impuesto: 0, neto: 13675 },
  },
  {
    nombre: "Minimum wage earner pays no income tax",
    origen: {
      tipo: "recalculado",
      detalle: "Statutory minimum wage is exempt (RR 8-2018). SSS 1,000, PhilHealth 500, Pag-IBIG 200. Net 20,000 − 1,700 = 18,300.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 20000, otrosGravables: 0, minimo: true },
    esperado: { impuesto: 0, neto: 18300 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "A salary of 0 is not valid." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, otrosGravables: 0, minimo: false },
    esperaError: true,
  },
]);
