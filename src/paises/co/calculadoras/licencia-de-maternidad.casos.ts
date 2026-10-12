import { definirCasos } from "@/motor/calculo";
import licencia from "./licencia-de-maternidad";

export default definirCasos(licencia, [
  {
    nombre: "Salario mínimo, parto normal",
    origen: { tipo: "recalculado", detalle: "CST art. 236: 18 semanas = 126 días. 1.750.905 / 30 = 58.363,5 por día × 126 = 7.353.801." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, caso: "normal", semanasPrematuro: 0 },
    esperado: { semanas: 18, dias: 126, total: 7353801 },
  },
  {
    nombre: "Parto múltiple",
    origen: { tipo: "recalculado", detalle: "18 + 2 semanas = 140 días × 58.363,5 = 8.170.890." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, caso: "multiple", semanasPrematuro: 0 },
    esperado: { semanas: 20, dias: 140, total: 8170890 },
  },
  {
    nombre: "Prematuro con 4 semanas de diferencia",
    origen: { tipo: "recalculado", detalle: "18 + 4 = 22 semanas = 154 días × 100.000 = 15.400.000." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, caso: "prematuro", semanasPrematuro: 4 },
    esperado: { semanas: 22, dias: 154, total: 15400000 },
  },
  {
    nombre: "Salario por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "1.000.000 es menor que el mínimo de 2026." },
    fecha: "2026-10-15",
    entrada: { salario: 1000000, caso: "normal", semanasPrematuro: 0 },
    esperaError: true,
  },
]);
