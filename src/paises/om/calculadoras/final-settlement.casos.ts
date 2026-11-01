import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-settlement";

export default definirCasos(calculadora, [
  {
    nombre: "Extranjero con cinco años",
    origen: { tipo: "recalculado", detalle: "Gratificación 400 × 1.826/365 = 2.001,096. Diario 550/30 = 18,333…: vacaciones 10 → 183,333; 5 días pendientes → 91,667; preaviso 30 → 550. Total 2.826,096." },
    fecha: "2026-10-26",
    entrada: { nacionalidad: "expat", basico: 400, total: 550, inicio: "2021-01-01", fin: "2026-01-01", articulo40: false, sinGoce: 0, vacaciones: 10, pendientes: 5, preaviso: 30, diasMes: 30 },
    esperado: { gratificacion: 2001.096, vacaciones: 183.333, sueldo: 91.667, preaviso: 550, total: 2826.096 },
  },
  {
    nombre: "Omaní sin gratificación",
    origen: { tipo: "recalculado", detalle: "Solo vacaciones: 550/30 × 10 = 183,333." },
    fecha: "2026-10-26",
    entrada: { nacionalidad: "omani", basico: 400, total: 550, inicio: "2021-01-01", fin: "2026-01-01", articulo40: null, sinGoce: 0, vacaciones: 10, pendientes: 0, preaviso: 0, diasMes: 30 },
    esperado: { gratificacion: 0, total: 183.333 },
  },
]);
