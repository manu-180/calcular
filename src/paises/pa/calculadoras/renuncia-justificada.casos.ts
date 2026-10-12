import { definirCasos } from "@/motor/calculo";
import renunciaJustificada from "./renuncia-justificada";

export default definirCasos(renunciaJustificada, [
  {
    nombre: "Renuncia justificada después de ocho años",
    origen: {
      tipo: "recalculado",
      detalle:
        "Semanal 300. Prima 8 × 300 = 2,400. Indemnización 8 × 3.4 = 27.2 semanas × 300 = 8,160 (art. 225, literal C, por remisión del art. 223). Vacaciones 590.91. Décimo 255.08. Total 11,405.99.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "2018-10-13", fechaSalida: "2026-10-12", mesesVacaciones: 5 },
    esperado: { prima: 2400, indemnizacion: 8160, vacaciones: 590.91, decimo: 255.08, total: 11405.99 },
  },
  {
    nombre: "Doce años: los dos últimos a una semana por año",
    origen: {
      tipo: "recalculado",
      detalle: "Semanal 2,600 × 12 ÷ 52 = 600. Indemnización 10 × 3.4 + 2 × 1 = 36 semanas = 21,600. Prima 12 × 600 = 7,200. Décimo del 16/4 al 15/8 completo: 2,600 × 4 ÷ 12 = 866.67.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 2600, fechaIngreso: "2014-08-16", fechaSalida: "2026-08-15", mesesVacaciones: 0 },
    esperado: { prima: 7200, indemnizacion: 21600, vacaciones: 0, decimo: 866.67, total: 29666.67 },
  },
  {
    nombre: "Ingreso antes de la Ley 44 de 1995",
    origen: { tipo: "recalculado", detalle: "La escala del literal C vale para relaciones iniciadas desde el 14/8/1995." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "1990-01-01", fechaSalida: "2026-10-12", mesesVacaciones: 0 },
    esperaError: true,
  },
]);
