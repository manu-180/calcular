import { definirCasos } from "@/motor/calculo";
import sueldoPorDias from "./sueldo-por-dias";

export default definirCasos(sueldoPorDias, [
  {
    nombre: "Diez días con un sueldo de 600",
    origen: { tipo: "recalculado", detalle: "Art. 53 del Código del Trabajo: el día es 600 / 30 = 20. 10 días = 200." },
    fecha: "2026-10-07",
    entrada: { sueldo: 600, dias: 10 },
    esperado: { dia: 20, dias: 10, total: 200 },
  },
  {
    nombre: "Mes de 31 días: se pagan 30",
    origen: { tipo: "recalculado", detalle: "Con 31 días trabajados se paga el mes completo: 482." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, dias: 31 },
    esperado: { dias: 30, total: 482 },
  },
  {
    nombre: "Siete días con el salario básico",
    origen: { tipo: "recalculado", detalle: "482 / 30 = 16,0667 por día. × 7 = 112,47." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, dias: 7 },
    esperado: { dia: 16.07, total: 112.47 },
  },
]);
