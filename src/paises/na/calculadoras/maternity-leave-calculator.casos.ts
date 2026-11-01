import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "N$15,000 basic wage",
    origen: {
      tipo: "recalculado",
      detalle: "GN 305 of 2026: 100% of basic wage, up to N$20,000. 15,000 a month. 12 weeks: 15,000 / 4.333 × 12 = 41,541.66.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 15000, meses: 12 },
    esperado: { mensual: 15000, total: 41541.66, semanas: 12 },
  },
  {
    nombre: "N$30,000 basic wage, above the cap",
    origen: { tipo: "recalculado", detalle: "Capped at N$20,000 a month. 20,000 / 4.333 × 12 = 55,388.88." },
    fecha: "2026-10-27",
    entrada: { basico: 30000, meses: 24 },
    esperado: { mensual: 20000, total: 55388.88 },
  },
]);
