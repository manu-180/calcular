import { definirCasos } from "@/motor/calculo";
import sueldoMinimo from "./sueldo-minimo";

export default definirCasos(sueldoMinimo, [
  {
    nombre: "RMV desde el 1/10/2026",
    origen: { tipo: "oficial", url: "https://busquedas.elperuano.pe/dispositivo/EX/2559163-1", detalle: "DS 015-2026-TR: la RMV pasa a S/ 1,230 desde el 1 de octubre de 2026. Asignación 10 % = 123." },
    fecha: "2026-10-01",
    entrada: { sueldo: null },
    esperado: { rmv: 1230, asignacion: 123, conAsignacion: 1353, porDia: 41, porHora: 5.13 },
  },
  {
    nombre: "Último día con la RMV de S/ 1,130",
    origen: { tipo: "oficial", url: "https://busquedas.elperuano.pe/dispositivo/NL/2357884-10", detalle: "DS 006-2024-TR: RMV de S/ 1,130 desde el 1/1/2025. 1,130 / 30 = 37.67; / 8 = 4.71." },
    fecha: "2026-09-30",
    entrada: { sueldo: null },
    esperado: { rmv: 1130, asignacion: 113, porDia: 37.67, porHora: 4.71 },
  },
  {
    nombre: "Sueldo por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "1,230 − 1,130 = 100." },
    fecha: "2026-10-07",
    entrada: { sueldo: 1130 },
    esperado: { diferencia: 100 },
  },
]);
