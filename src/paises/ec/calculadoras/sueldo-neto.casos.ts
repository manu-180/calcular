import { definirCasos } from "@/motor/calculo";
import sueldoNeto from "./sueldo-neto";

export default definirCasos(sueldoNeto, [
  {
    nombre: "$2.000 con décimos mensualizados",
    origen: {
      tipo: "recalculado",
      detalle: "Aporte 9,45 % = 189. Base anual (2.000 − 189) × 12 = 21.732 → impuesto 816,28 (tabla 2026); retención 816,28 / 11 = 74,21. Décimo tercero 2.000 / 12 = 166,67; décimo cuarto 482 / 12 = 40,17. Neto 1.943,63.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 2000, decimos: true, gastos: 0, cargas: "0", catastrofica: false },
    esperado: { aporte: 189, retencion: 74.21, decimoTercero: 166.67, decimoCuarto: 40.17, neto: 1943.63 },
  },
  {
    nombre: "$800 sin retención, décimos acumulados",
    origen: { tipo: "recalculado", detalle: "Aporte 75,60. Base anual 8.692,80, bajo la fracción exenta: sin retención. Neto 724,40." },
    fecha: "2026-10-07",
    entrada: { sueldo: 800, decimos: false, gastos: 0, cargas: "0", catastrofica: false },
    esperado: { aporte: 75.6, retencion: 0, neto: 724.4 },
  },
  {
    nombre: "$5.000 con 2 cargas y $10.000 de gastos proyectados",
    origen: {
      tipo: "recalculado",
      detalle: "Aporte 472,50. Base anual 54.330 → causado 6.903,75; rebaja 18 % × 11 × 821,80 = 1.627,16; impuesto 5.276,59; retención 479,69. Neto 5.000 − 472,50 − 479,69 = 4.047,81.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 5000, decimos: false, gastos: 10000, cargas: "2", catastrofica: false },
    esperado: { retencion: 479.69, impuestoAnual: 5276.59, neto: 4047.81 },
  },
]);
