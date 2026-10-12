import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Jornada completa en 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "Decreto 45303-MTSS: trabajo doméstico 268.731,31 al mes. Día: / 30 = 8.957,71. Hora: / 8 = 1.119,71 (método del MTSS). Rebajos: 5,5 % 14.780,22 + 4,33 % 11.636,07 + 1 % 2.687,31 = 29.103,60. Neto 239.627,71.",
    },
    fecha: "2026-10-12",
    entrada: { horasSemana: 48, salarioPactado: null },
    esperado: { minimo: 268731.31, minimoDiario: 8957.71, minimoHora: 1119.71, rebajos: 29103.6, neto: 239627.71 },
  },
  {
    nombre: "Veinte horas por semana",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 45303-MTSS, art. 7: proporcional a las horas sobre 48. 268.731,31 × 20 / 48 = 111.971,38. Rebajos 6.158,43 + 4.848,36 + 1.119,71 = 12.126,50.",
    },
    fecha: "2026-10-12",
    entrada: { horasSemana: 20, salarioPactado: null },
    esperado: { minimo: 111971.38, rebajos: 12126.5, neto: 99844.88 },
  },
  {
    nombre: "Más de 48 horas",
    origen: { tipo: "recalculado", detalle: "La jornada ordinaria máxima es de 48 horas por semana (art. 105 b)." },
    fecha: "2026-10-12",
    entrada: { horasSemana: 50, salarioPactado: null },
    esperaError: true,
  },
]);
