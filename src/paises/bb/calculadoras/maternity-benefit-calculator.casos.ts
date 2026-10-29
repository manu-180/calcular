import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-benefit-calculator";

const URL = "https://www.nis.gov.bb/maternity-grant-benefits/";

export default definirCasos(calculadora, [
  {
    nombre: "Bds$800 a week for 12 weeks",
    origen: { tipo: "recalculado", url: URL, detalle: "100% of 800 = 800.00 a week. 12 × 800 = 9,600.00. Plus the 1,280 child grant = 10,880.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 800, semanas: 12 },
    esperado: { semanalBeneficio: 800, total: 9600, grant: 1280, conGrant: 10880, licencia: 12 },
  },
  {
    nombre: "Earnings above the weekly ceiling",
    origen: { tipo: "recalculado", url: URL, detalle: "Ceiling 1,238. 12 × 1,238 = 14,856.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 1500, semanas: 12 },
    esperado: { semanalBeneficio: 1238, total: 14856 },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Zero earnings are rejected." },
    fecha: "2026-10-27",
    entrada: { semanal: 0, semanas: 12 },
    esperaError: true,
  },
]);
