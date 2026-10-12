import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

export default definirCasos(salarioPorHora, [
  {
    nombre: "₡600.000 en jornada diurna",
    origen: { tipo: "recalculado", detalle: "600.000 / 30 = 20.000 por día (Decreto 45303-MTSS, art. 7). / 8 horas = 2.500. Hora extra × 1,5 = 3.750. Semana 140.000." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, jornada: "diurna" },
    esperado: { diario: 20000, hora: 2500, horaExtra: 3750, semanal: 140000 },
  },
  {
    nombre: "Jornada nocturna de 6 horas",
    origen: { tipo: "recalculado", detalle: "20.000 / 6 = 3.333,33. Hora extra 5.000." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, jornada: "nocturna" },
    esperado: { horasJornada: 6, hora: 3333.33, horaExtra: 5000 },
  },
  {
    nombre: "Jornada mixta de 7 horas",
    origen: { tipo: "recalculado", detalle: "20.000 / 7 = 2.857,14. Hora extra 4.285,71." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, jornada: "mixta" },
    esperado: { hora: 2857.14, horaExtra: 4285.71 },
  },
]);
