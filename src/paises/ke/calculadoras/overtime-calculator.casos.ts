import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 30,000 a month with 6 overtime hours",
    origen: {
      tipo: "recalculado",
      url: "https://new.kenyalaw.org/akn/ke/act/ln/1982/120/eng@2026-06-26",
      detalle: "Hourly rate 30,000 / 225 = 133.33. Overtime 133.33 × 1.5 × 6 = 1,200.",
    },
    fecha: "2026-10-17",
    entrada: { modo: "monthly", mensual: 30000, hora: null, horasNormales: 6, horasDescanso: 0 },
    esperado: { total: 1200, base: 133.33, tarifaNormal: 200 },
  },
  {
    nombre: "Hourly worker on a public holiday",
    origen: { tipo: "recalculado", detalle: "150 × 1.5 × 4 = 900 and 150 × 2 × 8 = 2,400. Total 3,300." },
    fecha: "2026-10-17",
    entrada: { modo: "hourly", mensual: null, hora: 150, horasNormales: 4, horasDescanso: 8 },
    esperado: { total: 3300, normales: 900, descanso: 2400 },
  },
]);
