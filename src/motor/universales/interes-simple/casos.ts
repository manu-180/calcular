import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "10.000 al 12 % por 90 días, año de 360",
    detalle: "10000 × 0,12 × 90 ÷ 360 = 300. Monto final 10300. Tasa del período 12 × 0,25 = 3 %.",
    fecha: "2026-10-13",
    entrada: { capital: 10000, tasa: 12, tiempo: 90, unidad: "dias", base: "360" },
    esperado: { interes: 300, montoFinal: 10300, tasaPeriodo: 3 },
  },
  {
    nombre: "Mismo caso con año de 365",
    detalle: "10000 × 0,12 × 90 ÷ 365 = 295,890 → 295,89. Tasa del período 2,9589 %.",
    fecha: "2026-10-13",
    entrada: { capital: 10000, tasa: 12, tiempo: 90, unidad: "dias", base: "365" },
    esperado: { interes: 295.89, montoFinal: 10295.89, tasaPeriodo: 2.958904 },
    tolerancia: 0.000001,
  },
  {
    nombre: "6 meses al 10 %",
    detalle: "10000 × 0,10 × 6 ÷ 12 = 500.",
    fecha: "2026-10-13",
    entrada: { capital: 10000, tasa: 10, tiempo: 6, unidad: "meses", base: "365" },
    esperado: { interes: 500, montoFinal: 10500, tasaPeriodo: 5 },
  },
  {
    nombre: "Plazo cero",
    detalle: "Con tiempo 0 no se generan intereses: el monto final es el capital.",
    fecha: "2026-10-13",
    entrada: { capital: 10000, tasa: 10, tiempo: 0, unidad: "anios", base: "365" },
    esperado: { interes: 0, montoFinal: 10000, tasaPeriodo: 0 },
  },
  {
    nombre: "Capital cero es un error",
    detalle: "Sin capital no hay interés que calcular.",
    fecha: "2026-10-13",
    entrada: { capital: 0, tasa: 10, tiempo: 6, unidad: "meses", base: "365" },
    esperaError: true,
  },
];
