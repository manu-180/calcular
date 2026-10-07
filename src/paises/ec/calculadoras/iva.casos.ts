import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar el 15 % a $100",
    origen: { tipo: "recalculado", detalle: "Tarifa general 15 % (SRI, Circular NAC-DGECCGC25-00000006). 100 × 15 % = 15; total 115." },
    fecha: "2026-10-07",
    entrada: { monto: 100, operacion: "sumar" },
    esperado: { base: 100, iva: 15, total: 115 },
  },
  {
    nombre: "Quitar el IVA de $57,50",
    origen: { tipo: "recalculado", detalle: "57,50 / 1,15 = 50; IVA 7,50." },
    fecha: "2026-10-07",
    entrada: { monto: 57.5, operacion: "quitar" },
    esperado: { base: 50, iva: 7.5, total: 57.5 },
  },
  {
    nombre: "Primer día del 15 % (1/4/2024)",
    origen: { tipo: "recalculado", detalle: "Desde el 1/4/2024 la tarifa es 15 % (Decreto Ejecutivo 198). 482 × 15 % = 72,30." },
    fecha: "2024-04-01",
    entrada: { monto: 482, operacion: "sumar" },
    esperado: { iva: 72.3, total: 554.3 },
  },
]);
