import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Royalty paid to a non-resident",
    origen: { tipo: "recalculado", detalle: "15 % of 100,000 = 15,000. The recipient gets 85,000." },
    fecha: "2026-10-29",
    entrada: { tipo: "non-resident-income", pago: 100000 },
    esperado: { retencion: 15000, neto: 85000 },
  },
  {
    nombre: "Payment to a building contractor (deduction at source)",
    origen: { tipo: "oficial", url: "https://src.gov.sc/seychelles-tax-system/", detalle: "The payer withholds 1.5 % of the total amount paid to a specified business: 1.5 % of 200,000 = 3,000." },
    fecha: "2026-10-29",
    entrada: { tipo: "deduction-at-source", pago: 200000 },
    esperado: { retencion: 3000, neto: 197000 },
  },
  {
    nombre: "Insurance premium to a non-resident",
    origen: { tipo: "recalculado", detalle: "5 % of 50,000 = 2,500." },
    fecha: "2026-10-29",
    entrada: { tipo: "insurance-premium", pago: 50000 },
    esperado: { retencion: 2500, neto: 47500 },
  },
]);
