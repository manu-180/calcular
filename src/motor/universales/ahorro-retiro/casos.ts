import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Un año de aportes al 6 % y un año de renta",
    detalle:
      "i = 1,06^(1/12) − 1 = 0,0048676. Capital = 1000 × ((1 + i)^12 − 1) ÷ i = 1000 × 0,06 ÷ i = 12326,53. " +
      "Renta = 12326,53 × i ÷ (1 − 1,06^−1) = 1060,00. Aportado 12000; rendimiento 326,53.",
    fecha: "2026-10-13",
    entrada: { edadActual: 64, edadRetiro: 65, actual: 0, aporte: 1000, rendimiento: 6, aniosRenta: 1 },
    esperado: { capital: 12326.53, renta: 1060, aportado: 12000, intereses: 326.53 },
  },
  {
    nombre: "De 30 a 65 con 5.000 y 200 por mes al 4 % real",
    detalle:
      "i = 1,04^(1/12) − 1, n = 420 meses. 5000 × 1,04^35 + 200 × (1,04^35 − 1) ÷ i = 199713,53. " +
      "Renta a 25 años: PMT(i; 300; 199713,53) = 1046,29. Aportado 5000 + 200 × 420 = 89000.",
    fecha: "2026-10-13",
    entrada: { edadActual: 30, edadRetiro: 65, actual: 5000, aporte: 200, rendimiento: 4, aniosRenta: 25 },
    esperado: { capital: 199713.53, renta: 1046.29, aportado: 89000, intereses: 110713.53 },
  },
  {
    nombre: "Rendimiento cero",
    detalle: "10000 + 100 × 120 = 22000. Repartido en 120 meses: 183,33.",
    fecha: "2026-10-13",
    entrada: { edadActual: 30, edadRetiro: 40, actual: 10000, aporte: 100, rendimiento: 0, aniosRenta: 10 },
    esperado: { capital: 22000, renta: 183.33, aportado: 22000, intereses: 0 },
  },
  {
    nombre: "Edad de retiro menor que la actual es un error",
    detalle: "No se puede acumular si ya pasó la edad de retiro.",
    fecha: "2026-10-13",
    entrada: { edadActual: 50, edadRetiro: 45, actual: 1000, aporte: 100, rendimiento: 4, aniosRenta: 20 },
    esperaError: true,
  },
];
