import { definirCasos } from "@/motor/calculo";
import interesesDeMora from "./intereses-de-mora";

export default definirCasos(interesesDeMora, [
  {
    nombre: "Prestaciones pagadas con 61 días de atraso",
    origen: {
      tipo: "recalculado",
      detalle:
        "LOTTT arts. 128 y 142 f. Salida 01/08/2026: plazo hasta el 06/08/2026. Pago el 06/10/2026: 61 días. Tasa activa BCV agosto 2026: 58,93 %. 100.000 × 58,93 % × 61 / 365 = 9.848,58.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", monto: 100000, concepto: "prestaciones", fecha: "2026-08-01", fechaPago: "2026-10-06" },
    esperado: { vence: "2026-08-06", dias: 61, tasa: 58.93, interesesBs: 9848.58, totalBs: 109848.58, interesesUsd: null },
  },
  {
    nombre: "Salario atrasado 30 días",
    origen: { tipo: "recalculado", detalle: "Sin plazo extra: 50.000 × 58,93 % × 30 / 365 = 2.421,78." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", monto: 50000, concepto: "salario", fecha: "2026-09-01", fechaPago: "2026-10-01" },
    esperado: { vence: "2026-09-01", dias: 30, interesesBs: 2421.78 },
  },
  {
    nombre: "Dentro del plazo de cinco días: sin mora",
    origen: { tipo: "recalculado", detalle: "Salida 01/10/2026, pago 04/10/2026: antes del 06/10/2026." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", monto: 1000, concepto: "prestaciones", fecha: "2026-10-01", fechaPago: "2026-10-04" },
    esperado: { dias: 0, interesesUsd: 0, totalUsd: 1000 },
  },
]);
