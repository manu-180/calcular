import { definirCasos } from "@/motor/calculo";
import salarioAtrasado from "./salario-atrasado";

export default definirCasos(salarioAtrasado, [
  {
    nombre: "Cinco días de atraso: sin recargo",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 86: la primera semana no genera recargo. Del 30/09 al 05/10/2026: 5 días." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, fechaDebida: "2026-09-30", fechaPago: "2026-10-05" },
    esperado: { dias: 5, semanasConRecargo: 0, recargo: 0, total: 10000 },
  },
  {
    nombre: "Trece días de atraso: todavía sin recargo",
    origen: { tipo: "recalculado", detalle: "Del 30/09 al 13/10/2026: 13 días, una semana completa. No se cumple la segunda." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, fechaDebida: "2026-09-30", fechaPago: "2026-10-13" },
    esperado: { dias: 13, semanasConRecargo: 0, recargo: 0 },
  },
  {
    nombre: "Dos semanas de atraso: un décimo",
    origen: { tipo: "recalculado", detalle: "Del 30/09 al 14/10/2026: 14 días, dos semanas. Una con recargo: 10000 × 10 % = 1000. Total 11000." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, fechaDebida: "2026-09-30", fechaPago: "2026-10-14" },
    esperado: { dias: 14, semanasConRecargo: 1, recargo: 1000, total: 11000 },
  },
  {
    nombre: "Más de un mes de atraso: tope de dos décimos",
    origen: { tipo: "recalculado", detalle: "Del 30/09 al 15/11/2026: 46 días, 6 semanas. El art. 86 cuenta solo las dos semanas siguientes a la primera: 2 × 10 % × 8500 = 1700. Total 10200." },
    fecha: "2026-10-12",
    entrada: { monto: 8500, fechaDebida: "2026-09-30", fechaPago: "2026-11-15" },
    esperado: { dias: 46, semanasConRecargo: 2, recargo: 1700, total: 10200 },
  },
  {
    nombre: "Fecha de pago anterior a la debida",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { monto: 10000, fechaDebida: "2026-09-30", fechaPago: "2026-09-20" },
    esperaError: true,
  },
]);
