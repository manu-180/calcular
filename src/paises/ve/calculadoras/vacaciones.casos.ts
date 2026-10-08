import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Primer año con $300",
    origen: { tipo: "recalculado", detalle: "LOTTT arts. 190 y 192: 15 días hábiles y 15 de bono. Diario 10. 150 + 150 = 300." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, anios: 1 },
    esperado: { diasVacaciones: 15, diasBono: 15, pagoUsd: 150, bonoUsd: 150, totalUsd: 300, totalBs: null },
  },
  {
    nombre: "Quinto año en bolívares",
    origen: { tipo: "recalculado", detalle: "15 + 4 = 19 días de vacaciones y 19 de bono. Bs 6.000 / 30 = 200. 3.800 + 3.800 = 7.600." },
    fecha: "2026-10-08",
    entrada: { moneda: "VES", salario: 6000, anios: 5 },
    esperado: { diasVacaciones: 19, diasBono: 19, pagoBs: 3800, bonoBs: 3800, totalBs: 7600 },
  },
  {
    nombre: "Topes: 16 años o más",
    origen: { tipo: "recalculado", detalle: "Vacaciones: 15 + 15 adicionales = 30 como máximo. Bono: 30 como máximo. Con 20 años: 30 y 30." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, anios: 20 },
    esperado: { diasVacaciones: 30, diasBono: 30, totalUsd: 600 },
  },
  {
    nombre: "Sin el primer año cumplido",
    origen: { tipo: "recalculado", detalle: "Art. 190: las vacaciones se ganan al cumplir un año." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, anios: 0 },
    esperaError: true,
  },
]);
