import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "FUM 1/1/2026, ciclo de 28, hoy 15/4/2026",
    detalle: "1/1/2026 + 280 = 8/10/2026. Del 1/1 al 15/4 pasaron 104 días = 14 semanas y 6 días: segundo trimestre. Faltan 176 días.",
    fecha: "2026-04-15",
    entrada: { metodo: "fum", fecha: "2026-01-01", ciclo: 28 },
    esperado: { fpp: "2026-10-08", semanas: 14, dias: 6, faltan: 176, fechaConcepcion: "2026-01-15" },
  },
  {
    nombre: "Ciclo de 35 días",
    detalle: "FUM equivalente 1/1 + 7 = 8/1/2026; parto 15/10/2026. Del 8/1 al 15/4 hay 97 días = 13 semanas y 6 días: primer trimestre.",
    fecha: "2026-04-15",
    entrada: { metodo: "fum", fecha: "2026-01-01", ciclo: 35 },
    esperado: { fpp: "2026-10-15", semanas: 13, dias: 6, faltan: 183 },
  },
  {
    nombre: "Concepción el 29/2/2024",
    detalle: "29/2/2024 + 266 = 21/11/2024. FUM equivalente 15/2/2024; al 1/5/2024 pasaron 76 días = 10 semanas y 6 días.",
    fecha: "2024-05-01",
    entrada: { metodo: "concepcion", fecha: "2024-02-29", ciclo: 28 },
    esperado: { fpp: "2024-11-21", semanas: 10, dias: 6 },
  },
  {
    nombre: "Más de 42 semanas",
    detalle: "FUM 1/1/2025, hoy 13/10/2026: pasaron más de 294 días; muestra la fecha (8/10/2025) pero no la semana.",
    fecha: "2026-10-13",
    entrada: { metodo: "fum", fecha: "2025-01-01", ciclo: 28 },
    esperado: { fpp: "2025-10-08", semanas: null, faltan: null },
  },
  {
    nombre: "Fecha futura es un error",
    detalle: "La última menstruación no puede ser posterior a hoy.",
    fecha: "2026-04-15",
    entrada: { metodo: "fum", fecha: "2026-05-01", ciclo: 28 },
    esperaError: true,
  },
];
