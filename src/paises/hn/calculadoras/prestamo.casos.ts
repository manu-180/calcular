import { definirCasos } from "@/motor/calculo";
import prestamo from "./prestamo";

export default definirCasos(prestamo, [
  {
    nombre: "L100,000 al 18 % a 36 meses",
    origen: { tipo: "recalculado", detalle: "i = 1.5 % mensual. 100000 × 0.015 / (1 − 1.015^−36) = 3615.24. 36 cuotas: 130148.64; intereses 30148.64." },
    fecha: "2026-10-12",
    entrada: { monto: 100000, tasa: 18, meses: 36 },
    esperado: { cuota: 3615.24, total: 130148.64, intereses: 30148.64 },
  },
  {
    nombre: "Vivienda de L1,500,000 al 11 % a 20 años",
    origen: { tipo: "recalculado", detalle: "i = 11 % / 12. Cuota 15482.83; 240 cuotas suman 3715879.20." },
    fecha: "2026-10-12",
    entrada: { monto: 1500000, tasa: 11, meses: 240 },
    esperado: { cuota: 15482.83, total: 3715879.2 },
  },
  {
    nombre: "Sin intereses",
    origen: { tipo: "recalculado", detalle: "Tasa 0: 50000 / 10 = 5000 por mes." },
    fecha: "2026-10-12",
    entrada: { monto: 50000, tasa: 0, meses: 10 },
    esperado: { cuota: 5000, intereses: 0 },
  },
]);
