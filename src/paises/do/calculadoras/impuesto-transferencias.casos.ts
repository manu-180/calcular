import { definirCasos } from "@/motor/calculo";
import impuestoTransferencias from "./impuesto-transferencias";

export default definirCasos(impuestoTransferencias, [
  {
    nombre: "Transferencia de RD$100,000",
    origen: { tipo: "recalculado", detalle: "Ley 30-26, art. 40: 2 por mil desde el 3/7/2026. 100,000 × 0.2 % = 200." },
    fecha: "2026-10-12",
    entrada: { monto: 100000, cantidad: 1 },
    esperado: { tasa: 0.2, impuesto: 200, mensual: 200, anual: 2400 },
  },
  {
    nombre: "Cuatro pagos de RD$35,000 al mes",
    origen: { tipo: "recalculado", detalle: "35,000 × 0.2 % = 70 por operación; 280 por mes; 3,360 por año." },
    fecha: "2026-10-12",
    entrada: { monto: 35000, cantidad: 4 },
    esperado: { impuesto: 70, mensual: 280, anual: 3360 },
  },
]);
