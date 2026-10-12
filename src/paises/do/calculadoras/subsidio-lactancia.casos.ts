import { definirCasos } from "@/motor/calculo";
import subsidioLactancia from "./subsidio-lactancia";

export default definirCasos(subsidioLactancia, [
  {
    nombre: "Salario de RD$20,000 (hasta 1 salario mínimo nacional)",
    origen: { tipo: "recalculado", detalle: "Salario mínimo nacional 23,223. 20,000 está en el primer tramo: 33 % = 6,600 por mes, 12 meses = 79,200 (DIDA, ABC 28)." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, hijos: 1 },
    esperado: { tasa: 33, mensual: 6600, meses: 12, total: 79200 },
  },
  {
    nombre: "Salario de RD$40,000 (hasta 2 salarios mínimos)",
    origen: { tipo: "recalculado", detalle: "40,000 es menos que 46,446: 12 % = 4,800 por mes, 57,600 en total." },
    fecha: "2026-10-12",
    entrada: { salario: 40000, hijos: 1 },
    esperado: { tasa: 12, mensual: 4800, total: 57600 },
  },
  {
    nombre: "Salario de RD$60,000 (hasta 3 salarios mínimos)",
    origen: { tipo: "recalculado", detalle: "60,000 es menos que 69,669: 6 % = 3,600 por mes." },
    fecha: "2026-10-12",
    entrada: { salario: 60000, hijos: 1 },
    esperado: { tasa: 6, mensual: 3600 },
  },
  {
    nombre: "Justo 1 salario mínimo nacional",
    origen: { tipo: "recalculado", detalle: "23,223 entra en el tramo hasta 1 salario mínimo: 33 % = 7,663.59." },
    fecha: "2026-10-12",
    entrada: { salario: 23223, hijos: 1 },
    esperado: { tasa: 33, mensual: 7663.59 },
  },
  {
    nombre: "Mellizos con RD$20,000",
    origen: { tipo: "recalculado", detalle: "Parto múltiple: un subsidio por cada niño. 6,600 × 2 = 13,200." },
    fecha: "2026-10-12",
    entrada: { salario: 20000, hijos: 2 },
    esperado: { mensual: 13200, total: 158400 },
  },
  {
    nombre: "Más de 3 salarios mínimos",
    origen: { tipo: "recalculado", detalle: "70,000 pasa de 69,669: no corresponde." },
    fecha: "2026-10-12",
    entrada: { salario: 70000, hijos: 1 },
    esperado: { tasa: 0, mensual: 0, total: 0 },
  },
]);
