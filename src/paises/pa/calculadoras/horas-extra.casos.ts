import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Cuatro horas extra de día",
    origen: { tipo: "recalculado", detalle: "Hora: 1,040 ÷ (48 × 52 ÷ 12 = 208) = 5. Art. 33: 4 × 5 × 1.25 = 25." },
    fecha: "2026-10-07",
    entrada: { salario: 1040, jornada: "diurna", horasDiurnas: 4, horasNocturnas: 0, horasProlongacion: 0 },
    esperado: { valorHora: 5, diurnas: 25, total: 25 },
  },
  {
    nombre: "Once horas en la semana: pasa el límite de nueve",
    origen: {
      tipo: "recalculado",
      detalle: "6 × 5 × 1.25 = 37.50; 3 × 5 × 1.50 = 22.50; 2 × 5 × 1.75 = 17.50. Art. 36: 2 horas de exceso × 5 × 75% = 7.50. Total 85.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 1040, jornada: "diurna", horasDiurnas: 6, horasNocturnas: 3, horasProlongacion: 2 },
    esperado: { diurnas: 37.5, nocturnas: 22.5, prolongacion: 17.5, exceso: 7.5, total: 85 },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "recalculado", detalle: "Hora: 910 ÷ (42 × 52 ÷ 12 = 182) = 5. Dos horas de noche: 2 × 5 × 1.50 = 15." },
    fecha: "2026-10-07",
    entrada: { salario: 910, jornada: "nocturna", horasDiurnas: 0, horasNocturnas: 2, horasProlongacion: 0 },
    esperado: { valorHora: 5, nocturnas: 15, total: 15 },
  },
]);
