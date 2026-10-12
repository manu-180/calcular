import { definirCasos } from "@/motor/calculo";
import prestamo from "./prestamo";

export default definirCasos(prestamo, [
  {
    nombre: "₡10.000.000 al 12 % a 60 meses",
    origen: {
      tipo: "recalculado",
      detalle: "Cuota fija: i = 1 % mensual. 10.000.000 × 0,01 / (1 − 1,01^−60) = 222.444,48. 60 cuotas: 13.346.668,80; intereses 3.346.668,80.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 10000000, tasa: 12, meses: 60 },
    esperado: { cuota: 222444.48, total: 13346668.8, intereses: 3346668.8, tbp: 3.57 },
  },
  {
    nombre: "Hipoteca de ₡30.000.000 al 9,5 % a 20 años",
    origen: { tipo: "recalculado", detalle: "i = 9,5 % / 12. Cuota 279.639,36; 240 cuotas suman 67.113.446,40." },
    fecha: "2026-10-12",
    entrada: { monto: 30000000, tasa: 9.5, meses: 240 },
    esperado: { cuota: 279639.36, total: 67113446.4 },
  },
  {
    nombre: "Préstamo sin intereses",
    origen: { tipo: "recalculado", detalle: "Tasa 0: 5.000.000 / 50 = 100.000 por mes." },
    fecha: "2026-10-12",
    entrada: { monto: 5000000, tasa: 0, meses: 50 },
    esperado: { cuota: 100000, intereses: 0 },
  },
]);
