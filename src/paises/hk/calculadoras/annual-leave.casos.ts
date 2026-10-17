import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";
const BASE = { diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0, termina: false, inicioAnio: null, fin: null, sumaria: null } as const;

export default definirCasos(calculadora, [
  {
    nombre: "Labour Department example: 7 days at $15,000 a month",
    origen: {
      tipo: "oficial",
      url: GUIA,
      detalle: "Appendix 1, example 3: 180,000 / 365 = $493 a day; 7 days = $3,451. Unrounded: 493.15 x 7 = 3,452.05.",
    },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 1, salarios12: 180000 },
    esperado: { dias: 7, paga: 3451 },
    tolerancia: 1.1,
  },
  {
    nombre: "Nine years or more: 14 days",
    origen: { tipo: "oficial", url: GUIA, detalle: "Table of annual leave entitlements: 9 or above = 14 days. 365,000 / 365 = 1,000 x 14 = 14,000." },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 12, salarios12: 365000 },
    esperado: { dias: 14, paga: 14000 },
  },
  {
    nombre: "Job ends after 181 days of the sixth leave year",
    origen: {
      tipo: "recalculado",
      detalle: "Five years done: 10 days. Current leave year (sixth) gives 11 days x 181 / 365 = 5.45 days. Daily wages 219,000 / 365 = 600, so 3,272.88.",
    },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 5, salarios12: 219000, termina: true, inicioAnio: "2026-01-01", fin: "2026-06-30", sumaria: false },
    esperado: { dias: 10, diasProporcionales: 5.45, pagaProporcional: 3272.88 },
  },
  {
    nombre: "Exactly three months in the leave year qualifies",
    origen: { tipo: "recalculado", detalle: "1 January to 31 March 2026 is 3 months (90 days). 8 days x 90 / 365 = 1.97 days." },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 2, salarios12: 219000, termina: true, inicioAnio: "2026-01-01", fin: "2026-03-31", sumaria: false },
    esperado: { diasProporcionales: 1.97 },
  },
  {
    nombre: "One day short of three months gives nothing pro rata",
    origen: { tipo: "recalculado", detalle: "1 January to 30 March 2026 is less than 3 months." },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 2, salarios12: 219000, termina: true, inicioAnio: "2026-01-01", fin: "2026-03-30", sumaria: false },
    esperado: { diasProporcionales: 0, pagaProporcional: 0 },
  },
  {
    nombre: "Summary dismissal gives nothing pro rata",
    origen: { tipo: "oficial", url: GUIA, detalle: "3 to 12 months in the leave year with summary dismissal: nil." },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 5, salarios12: 219000, termina: true, inicioAnio: "2026-01-01", fin: "2026-06-30", sumaria: true },
    esperado: { diasProporcionales: 0 },
  },
  {
    nombre: "End date before the leave year is not valid",
    origen: { tipo: "recalculado", detalle: "fin < inicioAnio." },
    fecha: "2026-10-16",
    entrada: { ...BASE, anios: 5, salarios12: 219000, termina: true, inicioAnio: "2026-06-01", fin: "2026-01-01", sumaria: false },
    esperaError: true,
  },
]);
