import { definirCasos } from "@/motor/calculo";
import calculadora from "./ssnit-pension";

export default definirCasos(calculadora, [
  {
    nombre: "300 months of contributions",
    origen: { tipo: "recalculado", detalle: "120 months over 180 = 10 years × 1.125% = 11.25%; right 48.75%. 60,000 × 48.75% = 29,250 a year, 2,437.50 a month." },
    fecha: "2026-10-18",
    entrada: { promedio: 60000, meses: 300 },
    esperado: { derecho: 48.75, anual: 29250, mensual: 2437.5 },
  },
  {
    nombre: "420 months reach the 60% maximum",
    origen: { tipo: "oficial", url: "https://www.ssnit.org.gh/old-age-benefit/", detalle: "SSNIT: 420 months earn the maximum pension right of 60%." },
    fecha: "2026-10-18",
    entrada: { promedio: 60000, meses: 420 },
    esperado: { derecho: 60, anual: 36000 },
  },
  {
    nombre: "180 months give 37.5%",
    origen: { tipo: "oficial", url: "https://www.ssnit.org.gh/old-age-benefit/", detalle: "SSNIT: 180 months earn the minimum pension right of 37.5%." },
    fecha: "2026-10-18",
    entrada: { promedio: 48000, meses: 180 },
    esperado: { derecho: 37.5, mensual: 1500 },
  },
  {
    nombre: "Not enough months",
    origen: { tipo: "recalculado", detalle: "Under 180 months there is no old age pension." },
    fecha: "2026-10-18",
    entrada: { promedio: 48000, meses: 120 },
    esperado: { mensual: null },
  },
]);
