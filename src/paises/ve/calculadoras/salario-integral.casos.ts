import { definirCasos } from "@/motor/calculo";
import salarioIntegral from "./salario-integral";

export default definirCasos(salarioIntegral, [
  {
    nombre: "Primer año con $300 y utilidades mínimas",
    origen: {
      tipo: "recalculado",
      detalle: "LOTTT art. 122. Diario 300 / 30 = 10. Utilidades 10 × 30 / 360 = 0,83. Bono 10 × 15 / 360 = 0,42. Integral 11,25; mensual 337,50.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, diasUtilidades: 30, anios: 0 },
    esperado: { diasBono: 15, diarioUsd: 10, alicuotaUtilidadesUsd: 0.83, alicuotaBonoUsd: 0.42, integralUsd: 11.25, integralMensualUsd: 337.5, integralBs: null },
  },
  {
    nombre: "Tres años cumplidos: 18 días de bono",
    origen: { tipo: "recalculado", detalle: "Bono del 4.º año: 18 días. 10 + 0,8333 + 0,5 = 11,33; mensual 340." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, diasUtilidades: 30, anios: 3 },
    esperado: { diasBono: 18, alicuotaBonoUsd: 0.5, integralUsd: 11.33, integralMensualUsd: 340 },
  },
  {
    nombre: "Utilidades de 120 días en bolívares",
    origen: { tipo: "recalculado", detalle: "Bs 36.000 / 30 = 1.200. Utilidades 1.200 × 120 / 360 = 400. Bono 1.200 × 15 / 360 = 50. Integral 1.650; mensual 49.500." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 36000, diasUtilidades: 120, anios: 0 },
    esperado: { diarioBs: 1200, alicuotaUtilidadesBs: 400, alicuotaBonoBs: 50, integralBs: 1650, integralMensualBs: 49500, integralUsd: null },
  },
  {
    nombre: "Utilidades por debajo del mínimo",
    origen: { tipo: "recalculado", detalle: "Art. 131: mínimo 30 días." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, diasUtilidades: 20, anios: 0 },
    esperaError: true,
  },
]);
