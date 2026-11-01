import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Whole-time worker aged 18 or over, 2026",
    origen: {
      tipo: "recalculado",
      detalle: "L.N. 289 of 2025: €229.44 a week; hourly 229.44 / 40 = 5.736 → 5.74. Month 229.44 × 52 / 12 = 994.24. Bonuses 2 × 135.10 + 2 × 121.16 = 512.52. Year 229.44 × 52 + 512.52 = 12,443.40.",
    },
    fecha: "2026-10-26",
    entrada: { edad: "age-18-plus", horas: 40, tuPaga: null },
    esperado: { semanal: 229.44, hora: 5.74, mensual: 994.24, bonos: 512.52, anual: 12443.4 },
  },
  {
    nombre: "Part-time 20 hours, aged 17",
    origen: { tipo: "recalculado", detalle: "222.66 / 40 = 5.5665 → 5.57 an hour; × 20 = 111.40 a week. Bonuses 512.52 × 0.5 = 256.26." },
    fecha: "2026-10-26",
    entrada: { edad: "age-17", horas: 20, tuPaga: null },
    esperado: { hora: 5.57, semanal: 111.4, bonos: 256.26 },
  },
  {
    nombre: "Under 17 compared with €5.00 an hour",
    origen: { tipo: "recalculado", detalle: "219.82 / 40 = 5.4955 → 5.50. 5.00 − 5.50 = −0.50." },
    fecha: "2026-10-26",
    entrada: { edad: "under-17", horas: 40, tuPaga: 5 },
    esperado: { hora: 5.5, diferencia: -0.5 },
  },
  { nombre: "No hours", origen: { tipo: "recalculado", detalle: "Hours must be above zero." }, fecha: "2026-10-26", entrada: { edad: "age-18-plus", horas: 0, tuPaga: null }, esperaError: true },
]);
