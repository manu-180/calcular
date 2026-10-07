import { definirCasos } from "@/motor/calculo";
import horasExtras from "./horas-extras";

const cero = { extraDiurnas: 0, extraNocturnas: 0, nocturnas: 0, dominicales: 0, dominicalesNocturnas: 0, extraDominicalesDiurnas: 0, extraDominicalesNocturnas: 0 };

export default definirCasos(horasExtras, [
  {
    nombre: "Mes con todos los tipos de hora (jornada de 42 horas, dominical 90 %)",
    origen: {
      tipo: "recalculado",
      detalle:
        "2.100.000 / 210 = 10.000. Extra diurna 10 × 1,25 = 125.000; extra nocturna 4 × 1,75 = 70.000; nocturnas 8 × 0,35 = 28.000; dominical 8 × 1,9 = 152.000; dominical nocturna 2 × 2,25 = 45.000; extra dominical diurna 2 × 2,15 = 43.000; extra dominical nocturna 1 × 2,65 = 26.500. Total 489.500.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 2100000, extraDiurnas: 10, extraNocturnas: 4, nocturnas: 8, dominicales: 8, dominicalesNocturnas: 2, extraDominicalesDiurnas: 2, extraDominicalesNocturnas: 1 },
    esperado: { jornada: 42, horasMes: 210, valorHora: 10000, extraDiurnas: 125000, nocturnas: 28000, dominicales: 152000, extraDominicalesNocturnas: 26500, total: 489500 },
  },
  {
    nombre: "Último día con recargo dominical del 80 % y jornada de 44 horas",
    origen: { tipo: "recalculado", detalle: "30/6/2026: 2.200.000 / 220 = 10.000. Dominical 8 × 1,8 = 144.000; extra diurna 2 × 1,25 = 25.000. Total 169.000." },
    fecha: "2026-06-30",
    entrada: { ...cero, salario: 2200000, dominicales: 8, extraDiurnas: 2 },
    esperado: { jornada: 44, valorHora: 10000, dominicales: 144000, total: 169000 },
  },
  {
    nombre: "Primer día del recargo dominical del 90 %, todavía con 44 horas",
    origen: { tipo: "recalculado", detalle: "1/7/2026: 2.200.000 / 220 = 10.000. Dominical 8 × 1,9 = 152.000." },
    fecha: "2026-07-01",
    entrada: { ...cero, salario: 2200000, dominicales: 8 },
    esperado: { jornada: 44, dominicales: 152000, total: 152000 },
  },
  {
    nombre: "Primer día de la jornada de 42 horas",
    origen: { tipo: "recalculado", detalle: "15/7/2026: 2.100.000 / 210 = 10.000. Extra diurna 1 × 1,25 = 12.500." },
    fecha: "2026-07-15",
    entrada: { ...cero, salario: 2100000, extraDiurnas: 1 },
    esperado: { jornada: 42, horasMes: 210, total: 12500 },
  },
]);
