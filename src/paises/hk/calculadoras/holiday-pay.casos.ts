import { definirCasos } from "@/motor/calculo";
import calculadora from "./holiday-pay";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Labour Department example: daily-rated at $500 with no-pay rest days",
    origen: {
      tipo: "oficial",
      url: GUIA,
      detalle: "Appendix 1, example 1: (154,500 - 0) / (365 - 52 - 4) = $500 holiday pay for 1 January 2023.",
    },
    fecha: "2026-10-16",
    entrada: { feriados: 1, salarios12: 154500, diasPeriodo: 365, diasExcluidos: 56, salariosExcluidos: 0, tresMeses: true },
    esperado: { porDia: 500, total: 500, anio: 15 },
  },
  {
    nombre: "Three Lunar New Year holidays at $600 a day",
    origen: { tipo: "recalculado", detalle: "219,000 / 365 = 600 x 3 = 1,800." },
    fecha: "2026-10-16",
    entrada: { feriados: 3, salarios12: 219000, diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0, tresMeses: true },
    esperado: { total: 1800 },
  },
  {
    nombre: "Less than 3 months: day off but no holiday pay",
    origen: { tipo: "oficial", url: GUIA, detalle: "Holiday pay needs a continuous contract of at least 3 months before the holiday." },
    fecha: "2026-10-16",
    entrada: { feriados: 1, salarios12: 30000, diasPeriodo: 60, diasExcluidos: 0, salariosExcluidos: 0, tresMeses: false },
    esperado: { total: 0, porDia: 0, diario: 500 },
  },
  {
    nombre: "Sixteen statutory holidays from 2028",
    origen: { tipo: "oficial", url: GUIA, detalle: "Starting from 2028, Good Friday is added: 16 statutory holidays." },
    fecha: "2028-03-01",
    entrada: { feriados: 1, salarios12: 219000, diasPeriodo: 365, diasExcluidos: 0, salariosExcluidos: 0, tresMeses: true },
    esperado: { anio: 16 },
  },
]);
