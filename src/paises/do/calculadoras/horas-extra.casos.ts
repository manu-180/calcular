import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "RD$30,000, 10 horas al 35 %, 4 al 100 % y 20 nocturnas",
    origen: {
      tipo: "recalculado",
      detalle:
        "Reglamento art. 34: hora = 30,000 ÷ 23.83 ÷ 8 = 157.36. Art. 203: 157.36 × 1.35 = 212.44 × 10 = 2,124.40; 157.36 × 2 = 314.72 × 4 = 1,258.88. Art. 204: 157.36 × 15 % × 20 = 472.08. Total 3,855.36.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 30000, jornada: 8, horasHasta68: 10, horasMas68: 4, horasNocturnas: 20 },
    esperado: { hora: 157.36, valor35: 212.44, valor100: 314.72, pagoHasta68: 2124.4, pagoMas68: 1258.88, recargoNocturno: 472.08, total: 3855.36 },
  },
  {
    nombre: "Jornada de 6 horas",
    origen: { tipo: "recalculado", detalle: "Hora = 45,000 ÷ 23.83 ÷ 6 = 314.73. Al 35 %: 424.89 × 5 = 2,124.45." },
    fecha: "2026-10-07",
    entrada: { salario: 45000, jornada: 6, horasHasta68: 5, horasMas68: 0, horasNocturnas: 0 },
    esperado: { hora: 314.73, valor35: 424.89, total: 2124.45 },
  },
  {
    nombre: "Jornada de más de 8 horas",
    origen: { tipo: "recalculado", detalle: "Art. 147: la jornada no puede pasar de 8 horas diarias." },
    fecha: "2026-10-07",
    entrada: { salario: 30000, jornada: 9, horasHasta68: 0, horasMas68: 0, horasNocturnas: 0 },
    esperaError: true,
  },
]);
