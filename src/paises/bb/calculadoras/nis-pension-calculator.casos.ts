import { definirCasos } from "@/motor/calculo";
import calculadora from "./nis-pension-calculator";

const URL = "https://www.nis.gov.bb/old-age-contributory-pension/";

export default definirCasos(calculadora, [
  {
    nombre: "NISSS worked example: 22 years on an average of Bds$35,500",
    origen: { tipo: "oficial", url: URL, detalle: "NISSS new basis example: 20 × 2% + 2 × 1.25% = 42.5%. Annual 15,087.50, weekly 290.14." },
    fecha: "2026-10-27",
    entrada: { promedio: 35500, anios: 22 },
    esperado: { tasa: 42.5, anual: 15087.5, semanal: 290.14 },
  },
  {
    nombre: "40 years, capped at 60%",
    origen: { tipo: "recalculado", url: URL, detalle: "40% + 20 × 1.25% = 65%, capped at 60%. 35,500 × 60% = 21,300.00 a year, 409.62 a week." },
    fecha: "2026-10-27",
    entrada: { promedio: 35500, anios: 40 },
    esperado: { tasa: 60, anual: 21300, semanal: 409.62 },
  },
  {
    nombre: "Eight years of contributions",
    origen: { tipo: "recalculado", url: URL, detalle: "8 × 50 = 400, below the 500 contributions needed." },
    fecha: "2026-10-27",
    entrada: { promedio: 30000, anios: 8 },
    esperaError: true,
  },
]);
