import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Jornada diurna",
    origen: { tipo: "recalculado", detalle: "Hora 4800 / 30 / 8 = 20. Recargo del 50 % (CT art. 121): 30. 10 horas = 300. Tope de 12 horas por día (art. 122) menos 8 = 4." },
    fecha: "2026-10-07",
    entrada: { salario: 4800, jornada: "diurna", horas: 10 },
    esperado: { hora: 20, recargo: 50, horaExtra: 30, total: 300, maximoDiario: 4 },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "recalculado", detalle: "Jornada de 6 horas (art. 116). 3600 / 30 / 6 = 20; extra 30; 5 horas = 150; máximo 6 por día." },
    fecha: "2026-10-07",
    entrada: { salario: 3600, jornada: "nocturna", horas: 5 },
    esperado: { hora: 20, horaExtra: 30, total: 150, maximoDiario: 6 },
  },
  {
    nombre: "Jornada mixta",
    origen: { tipo: "recalculado", detalle: "Jornada de 7 horas (art. 117). 4200 / 30 / 7 = 20; extra 30; 8 horas = 240; máximo 5 por día." },
    fecha: "2026-10-07",
    entrada: { salario: 4200, jornada: "mixta", horas: 8 },
    esperado: { total: 240, maximoDiario: 5 },
  },
]);
