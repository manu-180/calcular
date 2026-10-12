import { definirCasos } from "@/motor/calculo";
import retencionUnoPorCiento from "./retencion-uno-por-ciento";

export default definirCasos(retencionUnoPorCiento, [
  {
    nombre: "Compra de L250,000 a un proveedor",
    origen: { tipo: "recalculado", detalle: "Acuerdo DEI-217-2010 (SAR): retención del 1 %. 250000 × 1 % = 2500; se paga 247500." },
    fecha: "2026-10-12",
    entrada: { monto: 250000, pagosACuenta: false },
    esperado: { tasa: 1, retencion: 2500, pago: 247500 },
  },
  {
    nombre: "Proveedor en pagos a cuenta",
    origen: { tipo: "recalculado", detalle: "No se retiene a quien está en el sistema de pagos a cuenta." },
    fecha: "2026-10-12",
    entrada: { monto: 250000, pagosACuenta: true },
    esperado: { retencion: 0, pago: 250000 },
  },
]);
