import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Mes completo en octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 1469 de 2025: 1.750.905. Diario 58.363,5. Hora 1.750.905 / 210 = 8.337,64. Con auxilio 249.095: 2.000.000.",
    },
    fecha: "2026-10-15",
    entrada: { dias: 30 },
    esperado: { mensual: 1750905, diario: 58364, hora: 8338, salario: 1750905, auxilio: 249095, total: 2000000 },
  },
  {
    nombre: "Diez días trabajados",
    origen: { tipo: "recalculado", detalle: "58.363,5 × 10 = 583.635. Auxilio 249.095 / 30 × 10 = 83.031,67. Total 666.667." },
    fecha: "2026-10-15",
    entrada: { dias: 10 },
    esperado: { salario: 583635, auxilio: 83032, total: 666667 },
  },
  {
    nombre: "Último día de la jornada de 44 horas",
    origen: { tipo: "recalculado", detalle: "14/7/2026: 1.750.905 / 220 = 7.958,66." },
    fecha: "2026-07-14",
    entrada: { dias: 30 },
    esperado: { hora: 7959 },
  },
]);
