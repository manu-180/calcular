import { definirCasos } from "@/motor/calculo";
import calculadora from "./gst-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Remove GST from $110",
    origen: { tipo: "recalculado", detalle: "GST is 10%, so the GST in a GST-inclusive price is 1/11: 110 × 100 / 110 = 100; GST 10." },
    fecha: "2026-10-14",
    entrada: { monto: 110, operacion: "quitar" },
    esperado: { sinGst: 100, gst: 10, conGst: 110 },
  },
  {
    nombre: "Add GST to $249.95",
    origen: { tipo: "recalculado", detalle: "249.95 × 1.10 = 274.945 → 274.95; GST 25.00." },
    fecha: "2026-10-14",
    entrada: { monto: 249.95, operacion: "sumar" },
    esperado: { sinGst: 249.95, gst: 25, conGst: 274.95 },
  },
  {
    nombre: "Remove GST from $1,000",
    origen: { tipo: "recalculado", detalle: "1000 / 1.1 = 909.0909 → 909.09; GST 90.91." },
    fecha: "2026-10-14",
    entrada: { monto: 1000, operacion: "quitar" },
    esperado: { sinGst: 909.09, gst: 90.91 },
  },
  {
    nombre: "Negative amount",
    origen: { tipo: "recalculado", detalle: "The function rejects amounts below zero." },
    fecha: "2026-10-14",
    entrada: { monto: -5, operacion: "sumar" },
    esperaError: true,
  },
]);
