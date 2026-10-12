import { definirCasos } from "@/motor/calculo";
import trabajoNocturno from "./trabajo-nocturno";

export default definirCasos(trabajoNocturno, [
  {
    nombre: "Mínimo nocturno con la RMV de S/ 1,230",
    origen: {
      tipo: "recalculado",
      detalle: "DS 007-2002-TR, art. 8: RMV + 35 % = 1,230 × 1.35 = 1,660.50 (el monto que publicó El Peruano el 1/10/2026). Con sueldo de 1,300 faltan 360.50. Hora: 1,660.50 / 30 / 8 = 6.92.",
    },
    fecha: "2026-10-12",
    entrada: { sueldo: 1300, jornada: 8 },
    esperado: { minimo: 1660.5, diferencia: 360.5, valorHora: 6.92 },
  },
  {
    nombre: "Setiembre 2026 con la RMV anterior",
    origen: { tipo: "recalculado", detalle: "1,130 × 1.35 = 1,525.50. Sueldo de 2,000: no falta nada; hora 2,000 / 30 / 8 = 8.33." },
    fecha: "2026-09-30",
    entrada: { sueldo: 2000, jornada: 8 },
    esperado: { minimo: 1525.5, diferencia: 0, valorHora: 8.33 },
  },
  {
    nombre: "Jornada mayor a 8 horas",
    origen: { tipo: "recalculado", detalle: "Entrada imposible para la jornada ordinaria." },
    fecha: "2026-10-12",
    entrada: { sueldo: 2000, jornada: 10 },
    esperaError: true,
  },
]);
