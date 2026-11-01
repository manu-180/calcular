import { definirCasos } from "@/motor/calculo";
import calculadora from "./paternity-benefit-calculator";

const URL = "https://www.nis.gov.bb/paternity-benefit/";

export default definirCasos(calculadora, [
  {
    nombre: "Bds$800 a week",
    origen: { tipo: "recalculado", url: URL, detalle: "100% of 800 = 800.00 a week for 3 weeks = 2,400.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 800 },
    esperado: { semanalBeneficio: 800, semanas: 3, total: 2400 },
  },
  {
    nombre: "Earnings above the ceiling",
    origen: { tipo: "recalculado", url: URL, detalle: "Ceiling 1,238. 3 × 1,238 = 3,714.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 2000 },
    esperado: { semanalBeneficio: 1238, total: 3714 },
  },
  {
    nombre: "No earnings",
    origen: { tipo: "recalculado", detalle: "Zero earnings are rejected." },
    fecha: "2026-10-27",
    entrada: { semanal: 0 },
    esperaError: true,
  },
]);
