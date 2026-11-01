import { definirCasos } from "@/motor/calculo";
import calculadora from "./unemployment-benefit-calculator";

const URL = "https://www.nis.gov.bb/unemployment-benefits/";

export default definirCasos(calculadora, [
  {
    nombre: "Bds$1,000 a week for 20 weeks",
    origen: { tipo: "recalculado", url: URL, detalle: "60% of 1,000 = 600.00 a week. 20 × 600 = 12,000.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 1000, semanas: 20 },
    esperado: { semanalBeneficio: 600, pagadas: 20, total: 12000 },
  },
  {
    nombre: "Earnings above the ceiling and 30 weeks",
    origen: { tipo: "recalculado", url: URL, detalle: "Ceiling 1,238. 60% = 742.80 a week. 26 weeks × 742.80 = 19,312.80." },
    fecha: "2026-10-27",
    entrada: { semanal: 1500, semanas: 30 },
    esperado: { semanalBeneficio: 742.8, pagadas: 26, total: 19312.8 },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Zero earnings are rejected." },
    fecha: "2026-10-27",
    entrada: { semanal: 0, semanas: 4 },
    esperaError: true,
  },
]);
