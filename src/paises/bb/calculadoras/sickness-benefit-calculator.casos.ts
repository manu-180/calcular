import { definirCasos } from "@/motor/calculo";
import calculadora from "./sickness-benefit-calculator";

const URL = "https://www.nis.gov.bb/sickness-benefits/";

export default definirCasos(calculadora, [
  {
    nombre: "Bds$900 a week for 10 weeks",
    origen: { tipo: "recalculado", url: URL, detalle: "66 2/3% of 900 = 600.00 a week. 10 × 600 = 6,000.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 900, semanas: 10 },
    esperado: { semanalBeneficio: 600, pagadas: 10, total: 6000 },
  },
  {
    nombre: "30 weeks off, capped at 26",
    origen: { tipo: "recalculado", url: URL, detalle: "66 2/3% of 1,000 = 666.67 a week. 26 weeks × 666.67 = 17,333.33 on the unrounded rate." },
    fecha: "2026-10-27",
    entrada: { semanal: 1000, semanas: 30 },
    esperado: { semanalBeneficio: 666.67, pagadas: 26, total: 17333.33 },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Zero earnings are rejected." },
    fecha: "2026-10-27",
    entrada: { semanal: 0, semanas: 4 },
    esperaError: true,
  },
]);
