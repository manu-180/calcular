import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "10.000 a 15.000 en 5 años",
    detalle: "ROI = (15000 − 10000) ÷ 10000 = 50 %. CAGR = 1,5^(1/5) − 1 = 0,0844718 → 8,447177 %.",
    fecha: "2026-10-13",
    entrada: { inicial: 10000, final: 15000, cobrado: null, anios: 5 },
    esperado: { ganancia: 5000, roi: 50, cagr: 8.447177 },
    tolerancia: 0.000001,
  },
  {
    nombre: "Con dividendos cobrados, un año",
    detalle: "Final 1100 + 100 cobrados = 1200 sobre 1000: ROI 20 %. En un año el CAGR coincide: 20 %.",
    fecha: "2026-10-13",
    entrada: { inicial: 1000, final: 1100, cobrado: 100, anios: 1 },
    esperado: { ganancia: 200, roi: 20, cagr: 20 },
  },
  {
    nombre: "Pérdida total",
    detalle: "Valor final 0: ROI −100 %, CAGR −100 %.",
    fecha: "2026-10-13",
    entrada: { inicial: 1000, final: 0, cobrado: null, anios: 3 },
    esperado: { ganancia: -1000, roi: -100, cagr: -100 },
  },
  {
    nombre: "Sin plazo no hay rendimiento anual",
    detalle: "Con 0 años solo se muestra el ROI: (1300 − 1000) ÷ 1000 = 30 %.",
    fecha: "2026-10-13",
    entrada: { inicial: 1000, final: 1300, cobrado: null, anios: 0 },
    esperado: { roi: 30, cagr: null },
  },
  {
    nombre: "Inversión inicial cero es un error",
    detalle: "No se puede calcular un porcentaje sobre 0.",
    fecha: "2026-10-13",
    entrada: { inicial: 0, final: 1000, cobrado: null, anios: 2 },
    esperaError: true,
  },
];
