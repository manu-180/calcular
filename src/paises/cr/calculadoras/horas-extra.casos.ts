import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Diez horas extra en jornada diurna",
    origen: { tipo: "recalculado", detalle: "600.000 / 30 / 8 = 2.500 por hora. Tiempo y medio (CT art. 139): 3.750. 10 × 3.750 = 37.500." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, jornada: "diurna", horas: 10 },
    esperado: { horasJornada: 8, valorHora: 2500, horaExtra: 3750, total: 37500 },
  },
  {
    nombre: "Jornada nocturna de seis horas",
    origen: { tipo: "recalculado", detalle: "CT art. 136: nocturna de 6 horas. 450.000 / 30 / 6 = 2.500; × 1,5 = 3.750; × 4 = 15.000." },
    fecha: "2026-10-07",
    entrada: { salario: 450000, jornada: "nocturna", horas: 4 },
    esperado: { horasJornada: 6, horaExtra: 3750, total: 15000 },
  },
  {
    nombre: "Jornada mixta de siete horas",
    origen: { tipo: "recalculado", detalle: "CT art. 138: mixta de 7 horas. 420.000 / 30 / 7 = 2.000; × 1,5 = 3.000; × 3 = 9.000." },
    fecha: "2026-10-07",
    entrada: { salario: 420000, jornada: "mixta", horas: 3 },
    esperado: { valorHora: 2000, total: 9000 },
  },
]);
