import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10 hours on Ushs 1,000,000 and 48 hours a week",
    origen: {
      tipo: "recalculado",
      detalle: "Hourly 1,000,000 × 12 / (52 × 48) = 4,807.69 → 4,808. Section 52(8): 10 × 4,808 × 1.5 = 72,120.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 1000000, semanales: 48, extra: 10, feriado: 0 },
    esperado: { total: 72120, normal: 72120, feriado: 0, hora: 4808 },
  },
  {
    nombre: "Public holiday hours",
    origen: { tipo: "recalculado", detalle: "Hourly 4,808. 8 holiday hours × 4,808 × 2 = 76,928; 4 normal hours × 4,808 × 1.5 = 28,848. Total 105,776." },
    fecha: "2026-10-24",
    entrada: { mensual: 1000000, semanales: 48, extra: 4, feriado: 8 },
    esperado: { total: 105776, feriado: 76928 },
  },
  {
    nombre: "40-hour week",
    origen: { tipo: "recalculado", detalle: "Hourly 800,000 × 12 / 2,080 = 4,615.38 → 4,615. 6 × 4,615 × 1.5 = 41,535." },
    fecha: "2026-10-24",
    entrada: { mensual: 800000, semanales: 40, extra: 6, feriado: 0 },
    esperado: { total: 41535, hora: 4615 },
  },
]);
