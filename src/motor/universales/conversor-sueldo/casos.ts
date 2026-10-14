import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "2.000 por mes a 40 horas",
    detalle:
      "Anual 2000 × 12 = 24000. Hora 24000 ÷ (40 × 52) = 11,538 → 11,54. Día 24000 ÷ 260 = 92,31. Semana 24000 ÷ 52 = 461,54. Quincena 1000.",
    fecha: "2026-10-13",
    entrada: { monto: 2000, periodo: "mes", horasSemana: 40, diasSemana: 5, semanasAnio: 52 },
    esperado: { porHora: 11.54, porDia: 92.31, porSemana: 461.54, porQuincena: 1000, porMes: 2000, porAnio: 24000 },
  },
  {
    nombre: "20 por hora a 40 horas",
    detalle: "Anual 20 × 40 × 52 = 41600. Mes 3466,67. Quincena 1733,33. Semana 800. Día 160.",
    fecha: "2026-10-13",
    entrada: { monto: 20, periodo: "hora", horasSemana: 40, diasSemana: 5, semanasAnio: 52 },
    esperado: { porHora: 20, porDia: 160, porSemana: 800, porQuincena: 1733.33, porMes: 3466.67, porAnio: 41600 },
  },
  {
    nombre: "Por día con 50 semanas pagadas",
    detalle: "100 × 5 × 50 = 25000 al año. Hora 25000 ÷ (40 × 50) = 12,5. Mes 2083,33.",
    fecha: "2026-10-13",
    entrada: { monto: 100, periodo: "dia", horasSemana: 40, diasSemana: 5, semanasAnio: 50 },
    esperado: { porHora: 12.5, porDia: 100, porSemana: 500, porMes: 2083.33, porAnio: 25000 },
  },
  {
    nombre: "Cero horas por semana es un error",
    detalle: "No se puede dividir por 0 horas.",
    fecha: "2026-10-13",
    entrada: { monto: 2000, periodo: "mes", horasSemana: 0, diasSemana: 5, semanasAnio: 52 },
    esperaError: true,
  },
];
