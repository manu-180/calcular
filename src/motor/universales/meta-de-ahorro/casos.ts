import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "12.000 en 24 meses sin rendimiento",
    detalle: "12000 ÷ 24 = 500 por mes. Por semana: 500 × 12 ÷ 52 = 115,38.",
    fecha: "2026-10-13",
    entrada: { meta: 12000, actual: null, meses: 24, rendimiento: null },
    esperado: { aporteMensual: 500, aporteSemanal: 115.38, totalAportado: 12000, intereses: null },
  },
  {
    nombre: "10.000 en 12 meses con 2.000 ahorrados al 6 %",
    detalle:
      "i = 0,5 % mensual. 2000 × 1,005^12 = 2123,36; faltan 7876,64. Aporte = 7876,64 × 0,005 ÷ (1,005^12 − 1) = 638,53. " +
      "Aportes 638,53 × 12 = 7662,36; intereses 10000 − 2000 − 7662,36 = 337,64.",
    fecha: "2026-10-13",
    entrada: { meta: 10000, actual: 2000, meses: 12, rendimiento: 6 },
    esperado: { aporteMensual: 638.53, totalAportado: 7662.36, intereses: 337.64 },
  },
  {
    nombre: "Lo ahorrado ya alcanza",
    detalle: "Con 5000 ahorrados y una meta de 4000, el aporte es 0.",
    fecha: "2026-10-13",
    entrada: { meta: 4000, actual: 5000, meses: 6, rendimiento: null },
    esperado: { aporteMensual: 0, totalAportado: 0, intereses: null },
  },
  {
    nombre: "Meta cero es un error",
    detalle: "Sin monto a juntar no hay aporte que calcular.",
    fecha: "2026-10-13",
    entrada: { meta: 0, actual: null, meses: 12, rendimiento: null },
    esperaError: true,
  },
];
