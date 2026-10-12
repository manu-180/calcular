import { definirCasos } from "@/motor/calculo";
import recargosDgii from "./recargos-dgii";

export default definirCasos(recargosDgii, [
  {
    nombre: "RD$50,000 con 2 meses y unos días de atraso",
    origen: { tipo: "recalculado", detalle: "Vence el 20/7/2026 y se paga el 25/9/2026: 2 meses y fracción = 3 meses. Recargo 3 × 3 % = 9 % = 4,500. Interés 3 × 1.10 % = 3.3 % = 1,650. Total 56,150." },
    fecha: "2026-10-12",
    entrada: { impuesto: 50000, vencimiento: "2026-07-20", pago: "2026-09-25" },
    esperado: { meses: 3, tasaRecargo: 9, recargo: 4500, interes: 1650, total: 56150 },
  },
  {
    nombre: "Un día de atraso cuenta como un mes",
    origen: { tipo: "recalculado", detalle: "Vence el 10/8/2026 y se paga el 11/8/2026: 1 mes o fracción. Recargo 3 % = 300, interés 1.10 % = 110." },
    fecha: "2026-10-12",
    entrada: { impuesto: 10000, vencimiento: "2026-08-10", pago: "2026-08-11" },
    esperado: { meses: 1, recargo: 300, interes: 110, total: 10410 },
  },
  {
    nombre: "Mes justo",
    origen: { tipo: "recalculado", detalle: "Vence el 10/8 y se paga el 10/9: exactamente 1 mes." },
    fecha: "2026-10-12",
    entrada: { impuesto: 10000, vencimiento: "2026-08-10", pago: "2026-09-10" },
    esperado: { meses: 1 },
  },
  {
    nombre: "Pago a tiempo",
    origen: { tipo: "recalculado", detalle: "Sin atraso no hay recargos." },
    fecha: "2026-10-12",
    entrada: { impuesto: 10000, vencimiento: "2026-08-10", pago: "2026-08-10" },
    esperado: { meses: 0, recargo: 0, interes: 0, total: 10000 },
  },
  {
    nombre: "Tope de 100 % del recargo",
    origen: { tipo: "recalculado", detalle: "Vence el 10/7/2026 y se paga el 10/12/2029: 41 meses. Recargo 123 % con tope 100 % = 10,000. Interés 41 × 1.10 % = 45.1 % = 4,510 (con la tasa de 2026)." },
    fecha: "2026-10-12",
    entrada: { impuesto: 10000, vencimiento: "2026-07-10", pago: "2029-12-10" },
    esperado: { meses: 41, tasaRecargo: 100, recargo: 10000, interes: 4510 },
  },
]);
