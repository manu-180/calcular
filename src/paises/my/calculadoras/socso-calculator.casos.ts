import { definirCasos } from "@/motor/calculo";
import calculadora from "./socso-calculator";

const TABLA = "https://www.perkeso.gov.my/images/lindung/lindung-24-jam/NewContributionRateIncludingSKBBK.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "RM3,000, first category, all schemes",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row RM2,900 to RM3,000: employer 51.65, Invalidity 14.75, Non-Employment Injury 22.15. EIS table (Act 800): 5.90 each." },
    fecha: "2026-10-16",
    entrada: { sueldo: 3000, categoriaSocso: "first", skbbk: true, eis: true },
    esperado: { empleado: 42.8, empleador: 57.55, total: 100.35, invalidez: 14.75, skbbk: 22.15, eisEmpleado: 5.9, socsoEmpleador: 51.65 },
  },
  {
    nombre: "RM1,700 (minimum wage), first category",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row RM1,600 to RM1,700: employer 28.85, Invalidity 8.25, Non-Employment Injury 12.35. EIS 3.30 each." },
    fecha: "2026-10-16",
    entrada: { sueldo: 1700, categoriaSocso: "first", skbbk: true, eis: true },
    esperado: { empleado: 23.9, empleador: 32.15, socsoEmpleador: 28.85 },
  },
  {
    nombre: "RM8,000, second category, no EIS",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row over RM6,000, second category: employer 74.40, Non-Employment Injury 44.65. No Invalidity share." },
    fecha: "2026-10-16",
    entrada: { sueldo: 8000, categoriaSocso: "second", skbbk: true, eis: false },
    esperado: { empleado: 44.65, empleador: 74.4, invalidez: 0, eisEmpleado: 0 },
  },
  {
    nombre: "Zero wages",
    origen: { tipo: "recalculado", detalle: "Wages of 0 are not a valid input." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, categoriaSocso: "first", skbbk: true, eis: true },
    esperaError: true,
  },
]);
