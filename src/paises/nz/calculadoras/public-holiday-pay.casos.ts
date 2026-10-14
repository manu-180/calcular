import { definirCasos } from "@/motor/calculo";
import calculadora from "./public-holiday-pay";

export default definirCasos(calculadora, [
  {
    nombre: "8 hours at $30 on a normal working day",
    origen: { tipo: "recalculado", detalle: "30 × 8 × 1.5 = 360. Normal pay 240, extra 120. Alternative holiday because it's an otherwise working day." },
    fecha: "2026-10-14",
    entrada: { tarifa: 30, horas: 8, diaLaboral: true },
    esperado: { pago: 360, normal: 240, extra: 120, factor: 1.5, alternativo: "Yes, one paid day off later" },
  },
  {
    nombre: "5 hours at the adult minimum wage on a day you don't usually work",
    origen: { tipo: "recalculado", detalle: "23.95 × 5 × 1.5 = 179.63 (179.625 rounded). No alternative holiday." },
    fecha: "2026-10-14",
    entrada: { tarifa: 23.95, horas: 5, diaLaboral: false },
    esperado: { pago: 179.63, alternativo: "No" },
  },
  {
    nombre: "No hours",
    origen: { tipo: "recalculado", detalle: "0 hours is not valid." },
    fecha: "2026-10-14",
    entrada: { tarifa: 30, horas: 0, diaLaboral: true },
    esperaError: true,
  },
]);
