import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

const URL = "https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/SeverancePaymentsCAP355A.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "12 years on Bds$900 a week",
    origen: { tipo: "recalculado", url: URL, detalle: "10 × 2.5 = 25 weeks plus 2 × 3 = 6 weeks gives 31 weeks. 31 × 900 = 27,900.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 900, anios: 12 },
    esperado: { semanas: 31, base: 900, pago: 27900 },
  },
  {
    nombre: "5 years with pay above the weekly ceiling",
    origen: { tipo: "recalculado", url: URL, detalle: "5 × 2.5 = 12.5 weeks. Weekly pay is limited to the 1,238 ceiling: 12.5 × 1,238 = 15,475.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 1500, anios: 5 },
    esperado: { semanas: 12.5, base: 1238, pago: 15475 },
  },
  {
    nombre: "40 years, capped at 33",
    origen: { tipo: "recalculado", url: URL, detalle: "25 + 30 + 13 × 3.5 (45.5) = 100.5 weeks. 100.5 × 1,000 = 100,500.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 1000, anios: 40 },
    esperado: { semanas: 100.5, pago: 100500 },
  },
  {
    nombre: "One year of service",
    origen: { tipo: "recalculado", url: URL, detalle: "Under 104 weeks of employment, so no entitlement." },
    fecha: "2026-10-27",
    entrada: { semanal: 900, anios: 1 },
    esperaError: true,
  },
]);
