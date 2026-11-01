import { definirCasos } from "@/motor/calculo";
import calculadora from "./napsa-calculator";

// El techo de NAPSA de 2026 no está verificado: los casos prueban la fórmula con valores fijos.
const VALORES = { "zm.napsa-rate": 5, "zm.napsa-ceiling": 37236 };

export default definirCasos(calculadora, [
  {
    nombre: "K10,000 gross",
    origen: { tipo: "recalculado", detalle: "5% × 10,000 = 500 each side, 1,000 in total." },
    fecha: "2026-10-26",
    entrada: { bruto: 10000 },
    valores: VALORES,
    esperado: { empleado: 500, empleador: 500, total: 1000 },
  },
  {
    nombre: "K60,000 gross, above the ceiling",
    origen: { tipo: "recalculado", detalle: "5% × 37,236 = 1,861.80 each side." },
    fecha: "2026-10-26",
    entrada: { bruto: 60000 },
    valores: VALORES,
    esperado: { empleado: 1861.8, total: 3723.6, base: 37236 },
  },
]);
