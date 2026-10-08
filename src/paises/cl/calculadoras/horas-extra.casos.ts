import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Ejemplo de la Dirección del Trabajo con 42 horas",
    origen: {
      tipo: "oficial",
      url: "https://dt.gob.cl/portal/1628/w3-article-95182.html",
      detalle: "$800.000 / 30 × 28 / 168 = $4.444,4 la hora normal; × 1,5 (factor 0,0083333) = 6.666,67 → 6.667. Por 10 horas: 66.667.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 800000, jornada: 42, horas: 10 },
    esperado: { horaOrdinaria: 4444, horaExtra: 6667, total: 66667 },
  },
  {
    nombre: "Último día con jornada de 44 horas",
    origen: { tipo: "recalculado", detalle: "25/4/2026: máximo 44. 800.000 / 30 × 28 / 176 = 4.242,42; × 1,5 = 6.363,64 → 6.364." },
    fecha: "2026-04-25",
    entrada: { sueldo: 800000, jornada: 44, horas: 1 },
    esperado: { horaExtra: 6364, total: 6364 },
  },
  {
    nombre: "Primer día de las 42 horas: 44 ya no se acepta",
    origen: { tipo: "recalculado", detalle: "Desde el 26/4/2026 la jornada máxima es 42 horas (Ley 21.561)." },
    fecha: "2026-04-26",
    entrada: { sueldo: 800000, jornada: 44, horas: 1 },
    esperaError: true,
  },
  {
    nombre: "Sueldo base bajo el ingreso mínimo",
    origen: { tipo: "recalculado", detalle: "Art. 32: base = IMM 553.553. 553.553 / 30 × 28 / 168 = 3.075,29; × 1,5 = 4.612,94 → 4.613; × 2 = 9.225,88 → 9.226." },
    fecha: "2026-10-07",
    entrada: { sueldo: 400000, jornada: 42, horas: 2 },
    esperado: { base: 553553, horaExtra: 4613, total: 9226 },
  },
  {
    nombre: "Jornada parcial de 21 horas",
    origen: { tipo: "recalculado", detalle: "Mínimo proporcional 553.553 × 21 / 42 = 276.776,5 < 300.000. 300.000 / 30 × 28 / 84 = 3.333,33; × 1,5 = 5.000; × 4 = 20.000." },
    fecha: "2026-10-07",
    entrada: { sueldo: 300000, jornada: 21, horas: 4 },
    esperado: { base: 300000, horaExtra: 5000, total: 20000 },
  },
]);
