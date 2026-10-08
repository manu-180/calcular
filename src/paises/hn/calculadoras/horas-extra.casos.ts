import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Diez horas extra de día",
    origen: { tipo: "recalculado", detalle: "CT art. 330.1: 25 % sobre el salario de la jornada diurna. 14400 / 30 / 8 = 60; 60 × 1.25 = 75; 75 × 10 = 750." },
    fecha: "2026-10-07",
    entrada: { salario: 14400, tipo: "diurna", horas: 10 },
    esperado: { horaOrdinaria: 60, recargo: 25, horaExtra: 75, total: 750 },
  },
  {
    nombre: "Cuatro horas extra de noche después de una jornada de día",
    origen: { tipo: "recalculado", detalle: "Art. 330.2: 50 % sobre el salario de la jornada diurna. 60 × 1.5 = 90; 90 × 4 = 360." },
    fecha: "2026-10-07",
    entrada: { salario: 14400, tipo: "nocturna", horas: 4 },
    esperado: { horaOrdinaria: 60, recargo: 50, horaExtra: 90, total: 360 },
  },
  {
    nombre: "Dos horas que alargan una jornada nocturna",
    origen: { tipo: "recalculado", detalle: "Art. 330.3: 75 % sobre el salario de la jornada nocturna (6 horas, art. 322). 14400 / 30 / 6 = 80; 80 × 1.75 = 140; 140 × 2 = 280." },
    fecha: "2026-10-07",
    entrada: { salario: 14400, tipo: "prolongacion-nocturna", horas: 2 },
    esperado: { horaOrdinaria: 80, recargo: 75, horaExtra: 140, total: 280 },
  },
  {
    nombre: "Salario mínimo de agricultura de 1 a 10 trabajadores",
    origen: {
      tipo: "recalculado",
      detalle: "Con 9596.64 al mes la hora ordinaria da 39.99, igual que la tabla del Acuerdo SETRASS-233-2026. 39.986 × 1.25 = 49.98; × 3 = 149.94.",
      url: "https://tsc.gob.hn/web/leyes/Acuerdo-SETRASS-233-2026.pdf",
    },
    fecha: "2026-10-07",
    entrada: { salario: 9596.64, tipo: "diurna", horas: 3 },
    esperado: { horaOrdinaria: 39.99, horaExtra: 49.98, total: 149.94 },
  },
]);
