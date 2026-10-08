import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Primer semestre de 2026 sin gozar",
    origen: {
      tipo: "recalculado",
      detalle: "Código del Trabajo art. 76 y 78: 15 días por cada 6 meses. Del 01/01 al 30/06/2026: 181 días. 30 × 181 / 365 = 14.88 días. 9000 / 30 = 300 diarios. 300 × 14.88 = 4464.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 9000, desde: "2026-01-01", hasta: "2026-06-30", gozados: 0 },
    esperado: { dias: 181, acumulados: 14.88, pendientes: 14.88, diario: 300, pago: 4464 },
  },
  {
    nombre: "Año completo con 15 días ya gozados",
    origen: { tipo: "recalculado", detalle: "Del 01/07/2025 al 30/06/2026: 365 días, 30 días ganados. Quedan 15. 12000 / 30 = 400. 400 × 15 = 6000." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, desde: "2025-07-01", hasta: "2026-06-30", gozados: 15 },
    esperado: { acumulados: 30, pendientes: 15, pago: 6000 },
  },
  {
    nombre: "Más días gozados que ganados",
    origen: { tipo: "recalculado", detalle: "En 31 días se ganan 2.55 días; no se pueden haber gozado 5." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, desde: "2026-08-01", hasta: "2026-08-31", gozados: 5 },
    esperaError: true,
  },
]);
