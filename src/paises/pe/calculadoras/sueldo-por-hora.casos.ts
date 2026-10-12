import { definirCasos } from "@/motor/calculo";
import sueldoPorHora from "./sueldo-por-hora";

export default definirCasos(sueldoPorHora, [
  {
    nombre: "S/ 2,400 en jornada de 8 horas",
    origen: { tipo: "recalculado", detalle: "Valor día 2,400 / 30 = 80; hora 80 / 8 = 10. Hora de la RMV: 1,230 / 30 / 8 = 5.13." },
    fecha: "2026-10-12",
    entrada: { sueldo: 2400, asignacionFamiliar: false, jornada: 8 },
    esperado: { valorDia: 80, valorHora: 10, minimoHora: 5.13, quincena: 1200, anual: 28800 },
  },
  {
    nombre: "RMV con asignación familiar y jornada de 6 horas",
    origen: { tipo: "recalculado", detalle: "1,230 + 123 = 1,353; / 30 = 45.10; / 6 = 7.52." },
    fecha: "2026-10-12",
    entrada: { sueldo: 1230, asignacionFamiliar: true, jornada: 6 },
    esperado: { remuneracion: 1353, valorDia: 45.1, valorHora: 7.52 },
  },
  {
    nombre: "Hora mínima con la RMV de setiembre",
    origen: { tipo: "recalculado", detalle: "1,130 / 30 / 8 = 4.71." },
    fecha: "2026-09-30",
    entrada: { sueldo: 1130, asignacionFamiliar: false, jornada: 8 },
    esperado: { minimoHora: 4.71 },
  },
]);
