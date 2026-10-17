import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "1.000 más 100 por mes al 12 % mensual, un año",
    detalle:
      "i = 1 % mensual. 1000 × 1,01^12 = 1126,83; 100 × (1,01^12 − 1) ÷ 0,01 = 1268,25. Saldo 2395,08; aportado 1000 + 1200 = 2200; intereses 195,08.",
    fecha: "2026-10-13",
    entrada: { capital: 1000, aporte: 100, tasa: 12, anios: 1, capitalizacion: "mensual" },
    esperado: { saldo: 2395.08, aportado: 2200, intereses: 195.08 },
  },
  {
    nombre: "5.000 al 10 % trimestral, 3 años sin aportes",
    detalle: "2,5 % por trimestre durante 12 trimestres: 5000 × 1,025^12 = 6724,44. Intereses 1724,44.",
    fecha: "2026-10-13",
    entrada: { capital: 5000, aporte: null, tasa: 10, anios: 3, capitalizacion: "trimestral" },
    esperado: { saldo: 6724.44, aportado: 5000, intereses: 1724.44 },
  },
  {
    nombre: "Tasa cero",
    detalle: "Sin interés el saldo es lo aportado: 1000 + 50 × 24 = 2200.",
    fecha: "2026-10-13",
    entrada: { capital: 1000, aporte: 50, tasa: 0, anios: 2, capitalizacion: "anual" },
    esperado: { saldo: 2200, aportado: 2200, intereses: 0 },
  },
  {
    nombre: "Sin capital ni aportes es un error",
    detalle: "Con capital 0 y sin aporte no hay nada que hacer crecer.",
    fecha: "2026-10-13",
    entrada: { capital: 0, aporte: null, tasa: 7, anios: 10, capitalizacion: "mensual" },
    esperaError: true,
  },
];
