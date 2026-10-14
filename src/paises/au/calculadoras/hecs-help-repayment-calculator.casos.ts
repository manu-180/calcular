import { definirCasos } from "@/motor/calculo";
import calculadora from "./hecs-help-repayment-calculator";

const URL = "https://www.ato.gov.au/tax-rates-and-codes/study-and-training-loan-minimum-repayment-income-and-rates";

export default definirCasos(calculadora, [
  {
    nombre: "ATO example 1: Christina, $86,380 in 2026-27",
    origen: { tipo: "oficial", url: URL, detalle: "($86,380 − $69,528) × 15% = $2,527.80." },
    fecha: "2026-10-14",
    entrada: { ingreso: 86380, anio: "2026-27", deuda: null },
    esperado: { repago: 2527.8 },
  },
  {
    nombre: "ATO example 2: Barry, $137,064 in 2026-27",
    origen: { tipo: "oficial", url: URL, detalle: "$9,028 + ($137,064 − $129,717) × 17% = $10,276.99." },
    fecha: "2026-10-14",
    entrada: { ingreso: 137064, anio: "2026-27", deuda: null },
    esperado: { repago: 10276.99 },
  },
  {
    nombre: "ATO example 3: Priya, $254,780 in 2026-27",
    origen: { tipo: "oficial", url: URL, detalle: "$254,780 × 10% = $25,478." },
    fecha: "2026-10-14",
    entrada: { ingreso: 254780, anio: "2026-27", deuda: null },
    esperado: { repago: 25478 },
  },
  {
    nombre: "$100,000 in 2025-26",
    origen: { tipo: "recalculado", detalle: "(100,000 − 67,000) × 15% = 4,950." },
    fecha: "2026-10-14",
    entrada: { ingreso: 100000, anio: "2025-26", deuda: null },
    esperado: { repago: 4950 },
  },
  {
    nombre: "Repayment capped at the debt",
    origen: { tipo: "recalculado", detalle: "Repayment would be 2,527.80 but only 1,000 is owed." },
    fecha: "2026-10-14",
    entrada: { ingreso: 86380, anio: "2026-27", deuda: 1000 },
    esperado: { repago: 1000, restante: 0 },
  },
  {
    nombre: "Below the threshold",
    origen: { tipo: "recalculado", detalle: "69,528 or less: nil." },
    fecha: "2026-10-14",
    entrada: { ingreso: 69528, anio: "2026-27", deuda: 20000 },
    esperado: { repago: 0, restante: 20000 },
  },
]);
