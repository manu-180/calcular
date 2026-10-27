import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

// El techo de NAPSA de 2026 no está verificado: los casos prueban la fórmula con valores fijos.
const VALORES = { "zm.napsa-rate": 5, "zm.napsa-ceiling": 37236, "zm.nhima-rate": 1, "zm.sdl-rate": 0.5 };

export default definirCasos(calculadora, [
  {
    nombre: "K10,000 basic and K2,000 allowances",
    origen: { tipo: "recalculado", detalle: "NAPSA 5% × 12,000 = 600. NHIMA 1% × 10,000 = 100. SDL 0.5% × 12,000 = 60. Cost 12,760." },
    fecha: "2026-10-26",
    entrada: { basico: 10000, asignaciones: 2000, sdl: true },
    valores: VALORES,
    esperado: { costo: 12760, napsa: 600, nhima: 100, sdl: 60, extra: 760 },
  },
  {
    nombre: "Exempt from the levy",
    origen: { tipo: "recalculado", detalle: "10,000 + 500 + 100 = 10,600." },
    fecha: "2026-10-26",
    entrada: { basico: 10000, asignaciones: 0, sdl: false },
    valores: VALORES,
    esperado: { costo: 10600, sdl: 0 },
  },
]);
