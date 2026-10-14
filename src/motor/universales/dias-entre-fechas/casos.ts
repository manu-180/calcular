import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Febrero de un año bisiesto",
    detalle: "Del 1/2/2024 al 1/3/2024: 29 días (febrero de 2024 tiene 29). 4 semanas y 1 día; 1 mes. Hábiles: 4 semanas = 20, más el jueves 29/2 = 21.",
    fecha: "2026-10-13",
    entrada: { desde: "2024-02-01", hasta: "2024-03-01", incluir: false },
    esperado: { dias: 29, semanas: 4, habiles: 21 },
  },
  {
    nombre: "Lunes a viernes contando el último día",
    detalle: "Del lunes 5/1/2026 al viernes 9/1/2026, con el último día: 4 + 1 = 5 días corridos, los 5 hábiles.",
    fecha: "2026-10-13",
    entrada: { desde: "2026-01-05", hasta: "2026-01-09", incluir: true },
    esperado: { dias: 5, habiles: 5, semanas: 0 },
  },
  {
    nombre: "Fechas al revés",
    detalle: "Del 1/3/2026 al 1/1/2026: se invierten. Enero (31) + febrero de 2026 (28) = 59 días; 8 semanas y 3 días.",
    fecha: "2026-10-13",
    entrada: { desde: "2026-03-01", hasta: "2026-01-01", incluir: false },
    esperado: { dias: 59, semanas: 8 },
  },
  {
    nombre: "Fin de semana sin días hábiles",
    detalle: "Del sábado 17/10/2026 al lunes 19/10/2026: 2 días corridos (sábado y domingo), 0 hábiles.",
    fecha: "2026-10-13",
    entrada: { desde: "2026-10-17", hasta: "2026-10-19", incluir: false },
    esperado: { dias: 2, habiles: 0 },
  },
  {
    nombre: "Misma fecha",
    detalle: "Del 13/10/2026 al 13/10/2026: 0 días.",
    fecha: "2026-10-13",
    entrada: { desde: "2026-10-13", hasta: "2026-10-13", incluir: false },
    esperado: { dias: 0, habiles: 0 },
  },
];
