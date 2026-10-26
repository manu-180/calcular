import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "A full year on Ushs 1,000,000",
    origen: {
      tipo: "recalculado",
      detalle: "Section 53(1)(a): 7 days × 3 periods of 4 months = 21. Daily pay 1,000,000 × 12 / 260 = 46,153.85 → 46,154. 21 × 46,154 = 969,234.",
    },
    fecha: "2026-10-24",
    entrada: { meses: 12, antiguedad: 24, mensual: 1000000, semana: "5", tomados: 0 },
    esperado: { dias: 21, proporcional: 21, pendientes: 21, valorDia: 46154, valor: 969234 },
  },
  {
    nombre: "Leaving after 10 months with 7 days taken",
    origen: {
      tipo: "recalculado",
      detalle: "Full periods: 2 × 7 = 14. Proportionate (s. 53(5)): 7 × 10 / 4 = 17.5; minus 7 = 10.5. Daily pay on 6 days: 1,200,000 × 12 / 312 = 46,153.85 → 46,154. 10.5 × 46,154 = 484,617.",
    },
    fecha: "2026-10-24",
    entrada: { meses: 10, antiguedad: 10, mensual: 1200000, semana: "6", tomados: 7 },
    esperado: { dias: 14, proporcional: 17.5, pendientes: 10.5, valor: 484617 },
  },
  {
    nombre: "Less than six months of service",
    origen: { tipo: "recalculado", detalle: "Section 53(4)(a): no annual leave before six months of continuous service." },
    fecha: "2026-10-24",
    entrada: { meses: 5, antiguedad: 5, mensual: 800000, semana: "5", tomados: 0 },
    esperado: { dias: 0, valor: 0 },
  },
]);
