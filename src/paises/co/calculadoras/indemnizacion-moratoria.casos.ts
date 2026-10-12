import { definirCasos } from "@/motor/calculo";
import moratoria from "./indemnizacion-moratoria";

export default definirCasos(moratoria, [
  {
    nombre: "45 días de retraso en la liquidación",
    origen: { tipo: "recalculado", detalle: "CST art. 65: un día de salario (100.000) por cada día de retraso. Del 15/01 al 1/03/2026 hay 45 días: 4.500.000." },
    fecha: "2026-10-15",
    entrada: { motivo: "liquidacion", salario: 3000000, desde: "2026-01-15", pago: "2026-03-01" },
    esperado: { diasRetraso: 45, dias: 45, total: 4500000 },
  },
  {
    nombre: "Más de 24 meses: tope",
    origen: { tipo: "recalculado", detalle: "Del 15/01/2023 al 15/01/2025 hay 731 días (24 meses). 731 × 100.000 = 73.100.000." },
    fecha: "2026-10-15",
    entrada: { motivo: "liquidacion", salario: 3000000, desde: "2023-01-15", pago: "2026-10-15" },
    esperado: { dias: 731, total: 73100000 },
  },
  {
    nombre: "Salario mínimo: sin tope de 24 meses",
    origen: { tipo: "recalculado", detalle: "CST art. 65 par. 2: con un salario mínimo rige el texto original, sin tope. 1.004 días × 58.363,5 = 58.596.954." },
    fecha: "2026-10-15",
    entrada: { motivo: "liquidacion", salario: 1750905, desde: "2024-01-15", pago: "2026-10-15" },
    esperado: { dias: 1004, total: 58596954 },
  },
  {
    nombre: "Cesantías consignadas 30 días tarde",
    origen: { tipo: "recalculado", detalle: "Ley 50 de 1990 art. 99 num. 3: un día de salario por día. Del 14/02 al 16/03/2026: 30 días × 100.000." },
    fecha: "2026-10-15",
    entrada: { motivo: "cesantias", salario: 3000000, desde: "2026-02-14", pago: "2026-03-16" },
    esperado: { dias: 30, total: 3000000 },
  },
]);
