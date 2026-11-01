import { definirCasos } from "@/motor/calculo";
import calculadora from "./contract-payment-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Contract payment of FJ$5,000",
    origen: { tipo: "recalculado", url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf", detalle: "5,000 is above 1,000. Withholding 5% × 5,000 = 250. Paid 4,750." },
    fecha: "2026-10-29",
    entrada: { contrato: 5000 },
    esperado: { retencion: 250, neto: 4750, aplica: "Withholding applies" },
  },
  {
    nombre: "Contract payment exactly at the FJ$1,000 threshold",
    origen: { tipo: "recalculado", detalle: "The guide says the threshold applies to agreements above 1,000, so exactly 1,000 has no withholding." },
    fecha: "2026-10-29",
    entrada: { contrato: 1000 },
    esperado: { retencion: 0, neto: 1000 },
  },
  {
    nombre: "Contract payment of FJ$1,000.01",
    origen: { tipo: "recalculado", detalle: "Just above 1,000. 5% × 1,000.01 = 50.0005, rounded 50.00." },
    fecha: "2026-10-29",
    entrada: { contrato: 1000.01 },
    esperado: { retencion: 50, neto: 950.01 },
  },
  { nombre: "Zero contract is rejected", origen: { tipo: "recalculado", detalle: "Amount must be above zero." }, fecha: "2026-10-29", entrada: { contrato: 0 }, esperaError: true },
]);
