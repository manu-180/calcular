import type { CasoUniversal } from "../tipos";

const semana = (desde: string | null, hasta: string | null, dias: number) =>
  Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [
      [`entrada${i + 1}`, i < dias ? desde : null],
      [`salida${i + 1}`, i < dias ? hasta : null],
    ]).flat(),
  );

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Lunes a viernes de 9:00 a 17:30 con 30 minutos de pausa",
    detalle: "8,5 h − 0,5 h = 8 h por día; × 5 = 40 h. Sin extra con 40 h normales. 40 × 10 = 400.",
    fecha: "2026-10-13",
    entrada: { ...semana("09:00", "17:30", 5), pausa: 30, pagoHora: 10, umbral: 40, recargo: 50 },
    esperado: { horasTotales: 40, horasReloj: "40:00", horasNormales: 40, horasExtra: 0, pagoNormal: 400, pagoExtra: 0, pagoTotal: 400 },
  },
  {
    nombre: "Cinco días de 8:00 a 18:00 con una hora de pausa",
    detalle: "10 h − 1 h = 9 h por día; × 5 = 45 h. Extra 45 − 40 = 5. Pago 40 × 10 + 5 × 10 × 1,5 = 400 + 75 = 475.",
    fecha: "2026-10-13",
    entrada: { ...semana("08:00", "18:00", 5), pausa: 60, pagoHora: 10, umbral: 40, recargo: 50 },
    esperado: { horasTotales: 45, horasNormales: 40, horasExtra: 5, pagoNormal: 400, pagoExtra: 75, pagoTotal: 475 },
  },
  {
    nombre: "Turno de noche que cruza la medianoche",
    detalle: "De 22:00 a 06:00 son 8 h (salida antes que la entrada: se suma un día). Sin umbral no hay extra: 8 × 12,5 = 100.",
    fecha: "2026-10-13",
    entrada: { ...semana("22:00", "06:00", 1), pausa: 0, pagoHora: 12.5, umbral: null, recargo: 50 },
    esperado: { horasTotales: 8, horasReloj: "8:00", horasExtra: 0, pagoTotal: 100 },
  },
  {
    nombre: "Minutos sueltos: 7 h 45 min",
    detalle: "De 08:15 a 16:30 son 8 h 15 min; menos 30 de pausa, 7 h 45 min = 7,75 h. × 20 = 155.",
    fecha: "2026-10-13",
    entrada: { ...semana("08:15", "16:30", 1), pausa: 30, pagoHora: 20, umbral: 40, recargo: 50 },
    esperado: { horasTotales: 7.75, horasReloj: "7:45", pagoTotal: 155 },
  },
  {
    nombre: "Entrada sin salida es un error",
    detalle: "El lunes tiene hora de entrada y no de salida: pide completarla.",
    fecha: "2026-10-13",
    entrada: { ...semana(null, null, 0), entrada1: "09:00", pausa: 30, pagoHora: 10, umbral: 40, recargo: 50 },
    esperaError: true,
  },
  {
    nombre: "Pausa más larga que la jornada es un error",
    detalle: "De 09:00 a 10:00 con 90 minutos de pausa da tiempo negativo.",
    fecha: "2026-10-13",
    entrada: { ...semana("09:00", "10:00", 1), pausa: 90, pagoHora: 10, umbral: 40, recargo: 50 },
    esperaError: true,
  },
];
