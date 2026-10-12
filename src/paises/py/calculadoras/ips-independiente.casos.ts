import { definirCasos } from "@/motor/calculo";
import ipsIndependiente from "./ips-independiente";

const L4933 = "https://www.bacn.gov.py/leyes-paraguayas/4395/ley-n-4933-autoriza-la-incorporacion-voluntaria-de-trabajadores-independientes" as const;

export default definirCasos(ipsIndependiente, [
  {
    nombre: "Base mínima",
    origen: { tipo: "recalculado", url: L4933, detalle: "Art. 3: 13 % sobre una base no menor al salario mínimo. 3.044.000 × 13 % = 395.720; por año 4.748.640." },
    fecha: "2026-10-12",
    entrada: { base: null },
    esperado: { base: 3044000, aporte: 395720, anual: 4748640 },
  },
  {
    nombre: "Base de 5 millones",
    origen: { tipo: "recalculado", url: L4933, detalle: "5.000.000 × 13 % = 650.000; por año 7.800.000." },
    fecha: "2026-10-12",
    entrada: { base: 5000000 },
    esperado: { base: 5000000, aporte: 650000, anual: 7800000 },
  },
  {
    nombre: "Base menor al mínimo",
    origen: { tipo: "recalculado", detalle: "2.000.000 es menor que el salario mínimo: se toma 3.044.000." },
    fecha: "2026-10-12",
    entrada: { base: 2000000 },
    esperado: { base: 3044000, aporte: 395720 },
  },
]);
