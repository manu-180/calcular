import { definirCasos } from "@/motor/calculo";
import calculadora from "./company-car-deduction-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Car of BND 60,000",
    origen: { tipo: "oficial", url: "https://www.mof.gov.bn/div_revenue_typesoftaxes_incometax/", detalle: "Revenue Division example: a 60,000 car with 10,000 of costs. Allowed share 50,000 / 60,000, so 8,333.33." },
    fecha: "2026-10-29",
    entrada: { costo: 60000, gastos: 10000, aplica: true },
    esperado: { deducible: 8333.33, noDeducible: 1666.67, base: 50000, proporcion: 83.33 },
  },
  {
    nombre: "Car below the cap",
    origen: { tipo: "recalculado", detalle: "A 30,000 car is under the 50,000 cap, so all 10,000 of costs are deductible." },
    fecha: "2026-10-29",
    entrada: { costo: 30000, gastos: 10000, aplica: true },
    esperado: { deducible: 10000, noDeducible: 0, base: 30000 },
  },
  {
    nombre: "Heavy vehicle",
    origen: { tipo: "recalculado", detalle: "A vehicle outside the 7 passenger and 3,000 kg limits is not capped." },
    fecha: "2026-10-29",
    entrada: { costo: 90000, gastos: 10000, aplica: false },
    esperado: { deducible: 10000, base: 90000 },
  },
]);
