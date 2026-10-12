import { definirCasos } from "@/motor/calculo";
import diaFestivo from "./dia-festivo-trabajado";

export default definirCasos(diaFestivo, [
  {
    nombre: "Un festivo con 15,000 al mes",
    origen: { tipo: "recalculado", detalle: "LFT art. 75: salario doble además del salario del día. Diario 500; extra 1000; total del día 1500 (salario triple)." },
    fecha: "2026-10-15",
    entrada: { tipo: "festivo", sueldo: 15000, periodo: "mensual", dias: 1 },
    esperado: { diario: 500, adicionalPorDia: 1000, totalPorDia: 1500, adicional: 1000 },
  },
  {
    nombre: "Dos días de descanso semanal con 2,100 a la semana",
    origen: { tipo: "recalculado", detalle: "LFT art. 73: salario doble aparte. 2100 / 7 = 300; extra 600 por día; × 2 = 1200." },
    fecha: "2026-10-15",
    entrada: { tipo: "descanso", sueldo: 2100, periodo: "semanal", dias: 2 },
    esperado: { diario: 300, adicionalPorDia: 600, totalPorDia: 900, adicional: 1200 },
  },
]);
