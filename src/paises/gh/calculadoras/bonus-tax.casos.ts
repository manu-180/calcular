import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Bonus above 15% of basic",
    origen: {
      tipo: "recalculado",
      detalle: "Limit 15% of 60,000 = 9,000; 5% = 450. Excess 3,000 on top of 60,000 chargeable falls in the 25% band: 750. Total 1,200.",
    },
    fecha: "2026-10-18",
    entrada: { basico: 60000, bono: 12000, gravable: 60000 },
    esperado: { plano: 450, graduado: 750, impuesto: 1200, neto: 10800, limite: 9000, exceso: 3000 },
  },
  {
    nombre: "Bonus within the limit",
    origen: { tipo: "recalculado", detalle: "5,000 is under 9,000: 5% = 250." },
    fecha: "2026-10-18",
    entrada: { basico: 60000, bono: 5000, gravable: 60000 },
    esperado: { impuesto: 250, graduado: 0 },
  },
  {
    nombre: "No bonus",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { basico: 60000, bono: 0, gravable: 60000 },
    esperaError: true,
  },
]);
