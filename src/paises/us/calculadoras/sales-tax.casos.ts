import { definirCasos } from "@/motor/calculo";
import calculadora from "./sales-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Add 8.25% to $49.99",
    origen: { tipo: "recalculado", detalle: "49.99 x 8.25% = 4.124175, rounded 4.12. Total 54.11." },
    fecha: "2026-10-14",
    entrada: { modo: "sumar", monto: 49.99, tasa: 8.25 },
    esperado: { antes: 49.99, impuesto: 4.12, total: 54.11 },
  },
  {
    nombre: "Remove 7% from a $107 total",
    origen: { tipo: "recalculado", detalle: "107 / 1.07 = 100. Tax 7." },
    fecha: "2026-10-14",
    entrada: { modo: "quitar", monto: 107, tasa: 7 },
    esperado: { antes: 100, impuesto: 7, total: 107 },
  },
  {
    nombre: "No sales tax",
    origen: { tipo: "recalculado", detalle: "A 0% rate leaves the price as is." },
    fecha: "2026-10-14",
    entrada: { modo: "sumar", monto: 250, tasa: 0 },
    esperado: { impuesto: 0, total: 250 },
  },
]);
