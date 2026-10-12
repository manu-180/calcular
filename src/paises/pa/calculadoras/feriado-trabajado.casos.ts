import { definirCasos } from "@/motor/calculo";
import feriadoTrabajado from "./feriado-trabajado";

export default definirCasos(feriadoTrabajado, [
  {
    nombre: "Feriado completo con salario de B/. 1,000",
    origen: {
      tipo: "recalculado",
      detalle: "Hora 1,000 ÷ 208 = 4.8077. 8 horas = 38.46. Recargo del 150% (art. 49) = 57.69. Día total 96.15. Día compensatorio trabajado: 50% = 19.23.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000, jornada: "diurna", horas: null },
    esperado: { hora: 4.81, base: 38.46, recargo: 57.69, total: 96.15, diaCompensatorio: 19.23 },
  },
  {
    nombre: "Cuatro horas de feriado en jornada mixta",
    origen: {
      tipo: "recalculado",
      detalle: "Hora 900 ÷ (45 × 52 ÷ 12 = 195) = 4.6154. 4 horas = 18.46; recargo 27.69; total 46.15. Compensatorio: 4.6154 × 7.5 × 50% = 17.31.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 900, jornada: "mixta", horas: 4 },
    esperado: { base: 18.46, recargo: 27.69, total: 46.15, diaCompensatorio: 17.31 },
  },
]);
