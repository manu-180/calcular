import { definirCasos } from "@/motor/calculo";
import horasExtras from "./horas-extras";

export default definirCasos(horasExtras, [
  {
    nombre: "Ejemplo del MTPE: sueldo de S/ 1,300 y jornada de 8 horas",
    origen: {
      tipo: "oficial",
      url: "https://cdn.www.gob.pe/uploads/document/file/7248257/6199835-como-calcular-horas-extras.pdf",
      detalle: "Guía del MTPE: valor hora 1,300 / 30 / 8 = 5.42; primera hora extra 5.42 + 1.35 = 6.77; tercera hora 5.42 + 1.90 = 7.32. Con 3 horas en un día: 2 × 6.77 + 7.32 = 20.86.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 1300, asignacionFamiliar: false, jornada: 8, horasPorDia: 3, dias: 1 },
    esperado: { valorHora: 5.42, hora25: 6.77, hora35: 7.32, primeras: 2, siguientes: 1, total: 20.86 },
  },
  {
    nombre: "Dos horas por día durante 10 días: todo al 25 %",
    origen: { tipo: "recalculado", detalle: "2,400 / 30 / 8 = 10; hora al 25 % = 12.50; 20 horas = 250." },
    fecha: "2026-10-07",
    entrada: { sueldo: 2400, asignacionFamiliar: false, jornada: 8, horasPorDia: 2, dias: 10 },
    esperado: { valorHora: 10, hora25: 12.5, siguientes: 0, total: 250 },
  },
  {
    nombre: "Con asignación familiar y jornada de 6 horas",
    origen: { tipo: "recalculado", detalle: "(1,230 + 123) / 30 / 6 = 7.5167 → 7.52; recargo 25 % = 1.88 → 9.40; 35 % = 2.63 → 10.15. 4 horas en 5 días: 10 × 9.40 + 10 × 10.15 = 195.50." },
    fecha: "2026-10-07",
    entrada: { sueldo: 1230, asignacionFamiliar: true, jornada: 6, horasPorDia: 4, dias: 5 },
    esperado: { valorHora: 7.52, hora25: 9.4, hora35: 10.15, total: 195.5 },
  },
  {
    nombre: "Jornada de más de 8 horas no es ordinaria",
    origen: { tipo: "recalculado", detalle: "La jornada máxima legal es de 8 horas diarias." },
    fecha: "2026-10-07",
    entrada: { sueldo: 2000, asignacionFamiliar: false, jornada: 10, horasPorDia: 2, dias: 1 },
    esperaError: true,
  },
]);
