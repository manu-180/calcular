import { definirCasos } from "@/motor/calculo";
import recargoNocturno from "./recargo-nocturno";

export default definirCasos(recargoNocturno, [
  {
    nombre: "RD$30,000 y 20 horas nocturnas",
    origen: { tipo: "recalculado", detalle: "Hora = 30,000 ÷ 23.83 ÷ 8 = 157.36. Art. 204: 15 % = 23.604 por hora (23.60). Hora nocturna 180.96. Mes: 23.604 × 20 = 472.08." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, jornada: 8, horas: 20 },
    esperado: { hora: 157.36, recargoHora: 23.6, horaNocturna: 180.96, total: 472.08 },
  },
  {
    nombre: "Sin horas nocturnas",
    origen: { tipo: "recalculado", detalle: "Sin horas entre las 9 de la noche y las 7 de la mañana no hay recargo." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, jornada: 8, horas: 0 },
    esperado: { total: 0 },
  },
  {
    nombre: "Jornada de 9 horas",
    origen: { tipo: "recalculado", detalle: "Art. 147: máximo 8 horas por día." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, jornada: 9, horas: 10 },
    esperaError: true,
  },
]);
