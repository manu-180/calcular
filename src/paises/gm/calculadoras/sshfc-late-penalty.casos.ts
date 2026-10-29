import { definirCasos } from "@/motor/calculo";
import calculadora from "./sshfc-late-penalty";

export default definirCasos(calculadora, [
  {
    nombre: "Paid one day late",
    origen: { tipo: "recalculado", detalle: "16 Sep is within the first month after 15 Sep: one part month. 2.5% of 15,000 = 375." },
    fecha: "2026-10-27",
    entrada: { monto: 15000, vencimiento: "2026-09-15", pago: "2026-09-16" },
    esperado: { meses: 1, recargo: 375, total: 15375 },
  },
  {
    nombre: "Paid on 27 October for 15 September",
    origen: { tipo: "recalculado", detalle: "One full month to 15 Oct plus part of a second month: 2 × 375 = 750." },
    fecha: "2026-10-27",
    entrada: { monto: 15000, vencimiento: "2026-09-15", pago: "2026-10-27" },
    esperado: { meses: 2, recargo: 750 },
  },
  {
    nombre: "Paid on the due date",
    origen: { tipo: "recalculado", detalle: "Not late: no penalty." },
    fecha: "2026-10-27",
    entrada: { monto: 15000, vencimiento: "2026-09-15", pago: "2026-09-15" },
    esperado: { meses: 0, recargo: 0 },
  },
  {
    nombre: "Payment before the due date",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 15000, vencimiento: "2026-09-15", pago: "2026-09-01" },
    esperaError: true,
  },
]);
