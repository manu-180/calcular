import { definirCasos } from "@/motor/calculo";
import asignacionFamiliar from "./asignacion-familiar";

export default definirCasos(asignacionFamiliar, [
  {
    nombre: "Octubre 2026: 10 % de la RMV de S/ 1,230",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 25129: 10 % de la RMV (DS 015-2026-TR) = 123. Doce sueldos 1,476. Gratificaciones 246 + 9 % = 268.14. CTS 123 × 7 / 6 = 143.50. Total 1,887.64.",
    },
    fecha: "2026-10-12",
    entrada: { beneficios: true, seguro: "essalud" },
    esperado: { mensual: 123, enSueldos: 1476, enGratificaciones: 268.14, enCts: 143.5, anual: 1887.64 },
  },
  {
    nombre: "Setiembre 2026, todavía con la RMV de S/ 1,130",
    origen: { tipo: "recalculado", detalle: "10 % de 1,130 = 113." },
    fecha: "2026-09-30",
    entrada: { beneficios: true, seguro: "essalud" },
    esperado: { mensual: 113, rmv: 1130 },
  },
  {
    nombre: "Sin gratificación ni CTS",
    origen: { tipo: "recalculado", detalle: "Solo los 12 sueldos: 123 × 12 = 1,476." },
    fecha: "2026-10-12",
    entrada: { beneficios: false, seguro: "essalud" },
    esperado: { enGratificaciones: 0, enCts: 0, anual: 1476 },
  },
]);
