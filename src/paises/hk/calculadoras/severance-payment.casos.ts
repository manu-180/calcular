import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-payment";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Labour Department appendix 2, example 2: service before and after 1 May 2025",
    origen: {
      tipo: "oficial",
      url: GUIA,
      detalle: "Pre-transition 15,000 x 2/3 x 3 = 30,000; post-transition 18,000 x 2/3 x 5 = 60,000; total 90,000. MPF 80,000 offsets 30,000; 50,000 stays in the account.",
    },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 18000, aniosDespues: 5, aniosAntes: 3, salarioTransicion: 15000, mpfEmpleador: 80000, otrosCompensables: 0 },
    esperado: { antes: 30000, despues: 60000, bruto: 90000, compensado: 30000, aPagar: 60000, mpfRetenido: 50000 },
  },
  {
    nombre: "Labour Department appendix 2, example 1: started on 1 May 2025",
    origen: {
      tipo: "oficial",
      url: GUIA,
      detalle: "18,000 x 2/3 x 5 = 60,000. The 50,000 of MPF mandatory benefits can't offset it.",
    },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 18000, aniosDespues: 5, aniosAntes: 0, salarioTransicion: 0, mpfEmpleador: 50000, otrosCompensables: 0 },
    esperado: { bruto: 60000, compensado: 0, aPagar: 60000, mpfRetenido: 50000 },
  },
  {
    nombre: "High wages are capped at $15,000 a year of service",
    origen: { tipo: "recalculado", detalle: "The sum per year should not exceed 2/3 of $22,500 (i.e. $15,000). 60,000 wages, 4 years after 1 May 2025: 60,000." },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 60000, aniosDespues: 4, aniosAntes: 0, salarioTransicion: 0, mpfEmpleador: 0, otrosCompensables: 0 },
    esperado: { bruto: 60000 },
  },
  {
    nombre: "The total stops at $390,000, taken off the later part",
    origen: { tipo: "recalculado", detalle: "Pre 15,000 x 25 = 375,000; post 15,000 x 2 = 30,000; total 405,000 capped at 390,000: post becomes 15,000." },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 30000, aniosDespues: 2, aniosAntes: 25, salarioTransicion: 30000, mpfEmpleador: 0, otrosCompensables: 0 },
    esperado: { antes: 375000, despues: 15000, bruto: 390000 },
  },
  {
    nombre: "Daily-rated: 18 days' wages a year",
    origen: { tipo: "recalculado", detalle: "Any 18 days' wages: 600 x 18 = 10,800 a year x 3 years = 32,400." },
    fecha: "2026-10-16",
    entrada: { pago: "daily", salarioFinal: 600, aniosDespues: 3, aniosAntes: 0, salarioTransicion: 0, mpfEmpleador: 0, otrosCompensables: 0 },
    esperado: { bruto: 32400 },
  },
  {
    nombre: "Less than 24 months: not eligible",
    origen: { tipo: "oficial", url: GUIA, detalle: "Qualifying period: not less than 24 months." },
    fecha: "2026-10-16",
    entrada: { pago: "monthly", salarioFinal: 18000, aniosDespues: 1.5, aniosAntes: 0, salarioTransicion: 0, mpfEmpleador: 0, otrosCompensables: 0 },
    esperado: { aPagar: 0 },
  },
]);
