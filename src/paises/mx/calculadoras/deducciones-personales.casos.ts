import { definirCasos } from "@/motor/calculo";
import deducciones from "./deducciones-personales";

export default definirCasos(deducciones, [
  {
    nombre: "300,000 de ingresos y 40,000 de gastos",
    origen: {
      tipo: "recalculado",
      detalle: "LISR art. 151: tope = menor entre 5 × 3566.22 × 12 = 213973.20 y 15 % × 300000 = 45000. Deducible 40000. ISR sin deducir 41419.91, con deducción 32875.91: ahorro 8544.",
    },
    fecha: "2026-10-15",
    entrada: { ingresos: 300000, gastos: 40000 },
    esperado: { topeUma: 213973.2, tope: 45000, deducible: 40000, noDeducible: 0, ahorro: 8544 },
  },
  {
    nombre: "Gastos arriba del 15 %",
    origen: { tipo: "recalculado", detalle: "200000 × 15 % = 30000; de 50000 de gastos se deducen 30000 y 20000 no." },
    fecha: "2026-10-15",
    entrada: { ingresos: 200000, gastos: 50000 },
    esperado: { tope: 30000, deducible: 30000, noDeducible: 20000 },
  },
]);
