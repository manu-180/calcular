import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Legal minimum of 30 days",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 63(4): at least 30 days. 1 November 2026 + 30 = 1 December 2026. 30,000 / 30 × 30 = 30,000." },
    fecha: "2026-10-24",
    entrada: { aviso: "2026-11-01", sueldo: 30000, contrato: null },
    esperado: { dias: 30, fin: "2026-12-01", enLugar: 30000 },
  },
  {
    nombre: "Contract gives 60 days",
    origen: { tipo: "recalculado", detalle: "The longer contract notice applies: 45,000 / 30 × 60 = 90,000." },
    fecha: "2026-10-24",
    entrada: { aviso: "2026-11-01", sueldo: 45000, contrato: 60 },
    esperado: { dias: 60, fin: "2026-12-31", enLugar: 90000 },
  },
  {
    nombre: "Contract gives only 7 days",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 63(4) overrides any shorter notice in the agreement." },
    fecha: "2026-10-24",
    entrada: { aviso: "2026-11-01", sueldo: 30000, contrato: 7 },
    esperado: { dias: 30 },
  },
]);
