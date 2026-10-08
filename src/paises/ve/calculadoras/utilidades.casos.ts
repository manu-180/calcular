import { definirCasos } from "@/motor/calculo";
import utilidades from "./utilidades";

export default definirCasos(utilidades, [
  {
    nombre: "Año completo con el mínimo de 30 días y $300",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 131. Diario 300/30 = 10. 30 días × 12/12 × 10 = 300." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, dias: 30, meses: 12 },
    esperado: { diarioUsd: 10, diasQueTocan: 30, utilidadesUsd: 300, utilidadesBs: null },
  },
  {
    nombre: "Tope de 120 días, ocho meses, en bolívares",
    origen: { tipo: "recalculado", detalle: "Bs 9.000 / 30 = 300 diarios. 120 × 8/12 = 80 días × 300 = 24.000." },
    fecha: "2026-10-08",
    entrada: { moneda: "VES", salario: 9000, dias: 120, meses: 8 },
    esperado: { diasQueTocan: 80, utilidadesBs: 24000, utilidadesUsd: null },
  },
  {
    nombre: "Más de 120 días",
    origen: { tipo: "recalculado", detalle: "Art. 131: máximo el salario de cuatro meses (120 días)." },
    fecha: "2026-10-08",
    entrada: { moneda: "USD", salario: 300, dias: 150, meses: 12 },
    esperaError: true,
  },
]);
