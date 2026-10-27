import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "Gambian employee in the NPF",
    origen: {
      tipo: "recalculado",
      detalle: "Basic 10,000 and allowances 2,000. Employer NPF 10% of 10,000 = 1,000. IICF 1% of 12,000 = 120, capped at 15. Total 13,015 a month, 156,180 a year.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 10000, subsidios: 2000, esquema: "npf", expatriado: "no" },
    esperado: { pension: 1000, iicf: 15, total: 13015, anual: 156180 },
  },
  {
    nombre: "Expatriate from outside ECOWAS in the FPS",
    origen: {
      tipo: "recalculado",
      detalle: "FPS 15% of 12,000 = 1,800. IICF 15. Payroll tax 100,000 / 12 = 8,333.33. Total 12,000 + 1,800 + 15 + 8,333.33 = 22,148.33.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 10000, subsidios: 2000, esquema: "fps", expatriado: "other" },
    esperado: { pension: 1800, expatriado: 8333.33, total: 22148.33 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { basico: 0, subsidios: 0, esquema: "npf", expatriado: "no" },
    esperaError: true,
  },
]);
