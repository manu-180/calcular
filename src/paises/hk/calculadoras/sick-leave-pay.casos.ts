import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-pay";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";
const PROMEDIO = { diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "Labour Department example: 4 sickness days at $15,000 a month",
    origen: { tipo: "oficial", url: GUIA, detalle: "Appendix 1, example 2: 180,000 / 365 = $493; $493 x 4/5 x 4 = $1,578. Unrounded 1,578.08." },
    fecha: "2026-10-16",
    entrada: { diasEnfermo: 4, embarazo: false, meses: 24, usados: 0, salarios12: 180000, ...PROMEDIO },
    esperado: { total: 1578, pagados: 4 },
    tolerancia: 0.1,
  },
  {
    nombre: "Three days off are not paid",
    origen: { tipo: "oficial", url: GUIA, detalle: "Sick leave has to be not less than four consecutive days." },
    fecha: "2026-10-16",
    entrada: { diasEnfermo: 3, embarazo: false, meses: 24, usados: 0, salarios12: 219000, ...PROMEDIO },
    esperado: { total: 0, pagados: 0 },
  },
  {
    nombre: "One day for a pregnancy check-up is paid",
    origen: { tipo: "recalculado", detalle: "Pregnancy check-up days count even if fewer than 4. 219,000 / 365 = 600 x 80% = 480." },
    fecha: "2026-10-16",
    entrada: { diasEnfermo: 1, embarazo: true, meses: 24, usados: 0, salarios12: 219000, ...PROMEDIO },
    esperado: { total: 480, porDia: 480 },
  },
  {
    nombre: "Five months of service: 10 paid days available",
    origen: { tipo: "recalculado", detalle: "2 days a month x 5 = 10 available. Sick for 14 days: 10 paid x 480 = 4,800." },
    fecha: "2026-10-16",
    entrada: { diasEnfermo: 14, embarazo: false, meses: 5, usados: 0, salarios12: 91200, diasPeriodo: 152, diasExcluidos: 0, salariosExcluidos: 0 },
    esperado: { disponibles: 10, pagados: 10, total: 4800 },
  },
  {
    nombre: "Accumulation stops at 120 days",
    origen: { tipo: "recalculado", detalle: "40 months: 24 + 28 x 4 = 136, capped at 120." },
    fecha: "2026-10-16",
    entrada: { diasEnfermo: 4, embarazo: false, meses: 40, usados: 0, salarios12: 219000, ...PROMEDIO },
    esperado: { disponibles: 120 },
  },
]);
