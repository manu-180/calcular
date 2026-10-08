import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Dos horas extra en jornada diurna",
    origen: { tipo: "recalculado", detalle: "LOTTT arts. 118 y 173. $240 / 30 = 8 diarios; 8 / 8 h = 1 la hora; con 50 % = 1,50; × 2 = 3." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 240, jornada: "diurna", horas: 2 },
    esperado: { horaUsd: 1, horaExtraUsd: 1.5, totalUsd: 3, totalBs: null },
  },
  {
    nombre: "Hora extra nocturna: bono nocturno y después el recargo",
    origen: { tipo: "recalculado", detalle: "Arts. 117 y 118. $210 / 30 = 7; 7 / 7 h = 1; con 30 % nocturno = 1,30; con 50 % = 1,95." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 210, jornada: "nocturna", horas: 1 },
    esperado: { horaUsd: 1, horaExtraUsd: 1.95, totalUsd: 1.95 },
  },
  {
    nombre: "Jornada mixta en bolívares",
    origen: { tipo: "recalculado", detalle: "Bs 4.500 / 30 = 150; 150 / 7,5 h = 20; con 50 % = 30; × 4 = 120." },
    fecha: "2026-10-08",
    entrada: { moneda: "VES", salario: 4500, jornada: "mixta", horas: 4 },
    esperado: { horaBs: 20, horaExtraBs: 30, totalBs: 120, totalUsd: null },
  },
]);
