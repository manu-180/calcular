import { definirCasos } from "@/motor/calculo";
import costoEmpresa from "./costo-empresa";

export default definirCasos(costoEmpresa, [
  {
    nombre: "Un millón imponible con contrato indefinido y adicional de 0,95 %",
    origen: {
      tipo: "recalculado",
      detalle:
        "Cesantía 2,4 % = 24.000 (Ley 19.728 art. 5 b). Reforma de pensiones 3,5 % = 35.000. Accidentes 0,90 % + 0,95 % = 18.500 (Ley 16.744 art. 15). SANNA 0,03 % = 300. Total 77.800. Con 50.000 de colación, costo 1.127.800.",
    },
    fecha: "2026-10-09",
    entrada: { imponible: 1000000, noImponible: 50000, contrato: "indefinido", tasaAdicional: 0.95 },
    esperado: { cesantia: 24000, pensiones: 35000, accidentes: 18500, sanna: 300, cargas: 77800, costoTotal: 1127800, recargo: 7.78 },
  },
  {
    nombre: "Plazo fijo con sueldo sobre el tope de 90 UF",
    origen: {
      tipo: "recalculado",
      detalle:
        "UF 9/10/2026 = 41.130,94: tope 90 UF = 3.701.785; tope cesantía 135,2 UF = 5.560.903. Cesantía 3 % de 5.000.000 = 150.000. Pensiones 3,5 % del tope = 129.562. Accidentes 0,90 % = 33.316. SANNA 0,03 % = 1.111. Costo 5.313.989.",
    },
    fecha: "2026-10-09",
    entrada: { imponible: 5000000, noImponible: 0, contrato: "plazo-fijo", tasaAdicional: 0 },
    esperado: { cesantia: 150000, pensiones: 129562, accidentes: 33316, sanna: 1111, costoTotal: 5313989, tope: 3701785 },
  },
  {
    nombre: "Cotización adicional sobre el máximo",
    origen: { tipo: "recalculado", detalle: "La tasa adicional llega como máximo a 6,8 % (ISL, D.S. 67)." },
    fecha: "2026-10-09",
    entrada: { imponible: 1000000, noImponible: 0, contrato: "indefinido", tasaAdicional: 7 },
    esperaError: true,
  },
]);
