import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "12 % nominal mensual a efectiva",
    detalle: "(1 + 0,12 ÷ 12)^12 − 1 = 1,01^12 − 1 = 0,126825 → 12,6825 %. Tasa mensual 1 %.",
    fecha: "2026-10-13",
    entrada: { direccion: "nominal", tasa: 12, capitalizacion: "mensual" },
    esperado: { efectiva: 12.682503, nominal: 12, periodica: 1 },
    tolerancia: 0.000001,
  },
  {
    nombre: "10 % nominal trimestral a efectiva",
    detalle: "1,025^4 − 1 = 0,10381289 → 10,381289 %. Tasa trimestral 2,5 %.",
    fecha: "2026-10-13",
    entrada: { direccion: "nominal", tasa: 10, capitalizacion: "trimestral" },
    esperado: { efectiva: 10.381289, periodica: 2.5 },
    tolerancia: 0.000001,
  },
  {
    nombre: "Efectiva 12,6825 % mensual vuelve a nominal 12 %",
    detalle: "12 × (1,12682503^(1/12) − 1) = 12 × 0,01 = 12 %.",
    fecha: "2026-10-13",
    entrada: { direccion: "efectiva", tasa: 12.682503, capitalizacion: "mensual" },
    esperado: { nominal: 12, efectiva: 12.682503, periodica: 1 },
    tolerancia: 0.00001,
  },
  {
    nombre: "Tasa cero",
    detalle: "Con 0 % no hay nada que capitalizar: nominal y efectiva valen 0.",
    fecha: "2026-10-13",
    entrada: { direccion: "nominal", tasa: 0, capitalizacion: "diaria" },
    esperado: { efectiva: 0, nominal: 0, periodica: 0 },
  },
  {
    nombre: "Tasa negativa es un error",
    detalle: "Una tasa menor que cero no se convierte: pide corregir el campo.",
    fecha: "2026-10-13",
    entrada: { direccion: "nominal", tasa: -5, capitalizacion: "mensual" },
    esperaError: true,
  },
];
