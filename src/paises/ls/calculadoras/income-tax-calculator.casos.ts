import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const ESTRUCTURA = "https://www.rsl.org.ls/sites/default/files/2026-09/2026%20-2027%20Income%20Tax%20structure%201.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "M114 000 a year (RSL table 1)",
    origen: { tipo: "oficial", url: ESTRUCTURA, detalle: "15 552 + (114 000 − 77 760) × 30% = 15 552 + 10 872, less credit 12 240 = M14 184." },
    fecha: "2026-10-27",
    entrada: { ingreso: 114000, pension: 0, otras: null },
    esperado: { impuesto: 14184, tramoBajo: 15552, tramoAlto: 10872, marginal: 30 },
  },
  {
    nombre: "M77 760 a year (RSL table 1)",
    origen: { tipo: "oficial", url: ESTRUCTURA, detalle: "77 760 × 20% = 15 552, less 12 240 = M3 312." },
    fecha: "2026-10-27",
    entrada: { ingreso: 77760, pension: 0, otras: null },
    esperado: { impuesto: 3312, tramoAlto: 0 },
  },
  {
    nombre: "M61 200 a year (RSL table 1)",
    origen: { tipo: "oficial", url: ESTRUCTURA, detalle: "61 200 × 20% = 12 240, equal to the credit, so no tax." },
    fecha: "2026-10-27",
    entrada: { ingreso: 61200, pension: 0, otras: null },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Sole trader with expenses and a pension",
    origen: { tipo: "recalculado", detalle: "Chargeable 200 000 − 20 000 − 30 000 = 150 000. 15 552 + 72 240 × 30% = 37 224, less 12 240 = 24 984." },
    fecha: "2026-10-27",
    entrada: { ingreso: 200000, pension: 20000, otras: 30000 },
    esperado: { impuesto: 24984, imponible: 150000, mensual: 2082 },
  },
  {
    nombre: "M114 000 in the 2025/26 tax year",
    origen: { tipo: "recalculado", detalle: "Band 74 040, credit 11 640: 14 808 + 39 960 × 30% = 26 796, less 11 640 = 15 156." },
    fecha: "2025-12-01",
    entrada: { ingreso: 114000, pension: 0, otras: null },
    esperado: { impuesto: 15156 },
  },
]);
