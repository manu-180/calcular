import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10 hours of ordinary overtime at K1,000 an hour",
    origen: { tipo: "recalculado", detalle: "Employment Act s. 39(3): 10 × 1,000 × 1.5 = 15,000." },
    fecha: "2026-10-27",
    entrada: { hora: 1000, ordinarias: 10, libres: 0, feriados: 0 },
    esperado: { total: 15000, ordinaria: 15000, libre: 0, feriado: 0, limite: 48 },
  },
  {
    nombre: "Mixed overtime at K850 an hour",
    origen: { tipo: "recalculado", detalle: "4 × 850 × 1.5 = 5,100; 8 × 850 × 2 = 13,600; 6 × 850 × 2 = 10,200. Total 28,900." },
    fecha: "2026-10-27",
    entrada: { hora: 850, ordinarias: 4, libres: 8, feriados: 6 },
    esperado: { total: 28900, ordinaria: 5100, libre: 13600, feriado: 10200 },
  },
  {
    nombre: "Zero hourly wage is rejected",
    origen: { tipo: "recalculado", detalle: "The hourly wage has to be above zero." },
    fecha: "2026-10-27",
    entrada: { hora: 0, ordinarias: 1, libres: 0, feriados: 0 },
    esperaError: true,
  },
]);
