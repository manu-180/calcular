import { definirCasos } from "@/motor/calculo";
import valorHora from "./valor-hora";

export default definirCasos(valorHora, [
  {
    nombre: "Salario mínimo con jornada de 42 horas",
    origen: { tipo: "recalculado", detalle: "Desde el 15/07/2026 la jornada es de 42 horas: 42 × 5 = 210 horas al mes. 1.750.905 / 210 = 8.337,64." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905 },
    esperado: { jornada: 42, horasMes: 210, valorHora: 8338, valorDia: 58364 },
  },
  {
    nombre: "Antes del cambio: jornada de 44 horas",
    origen: { tipo: "recalculado", detalle: "Hasta el 14/07/2026: 44 × 5 = 220 horas. 1.750.905 / 220 = 7.958,66." },
    fecha: "2026-07-14",
    entrada: { salario: 1750905 },
    esperado: { jornada: 44, horasMes: 220, valorHora: 7959 },
  },
]);
