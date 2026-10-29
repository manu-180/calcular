import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "WST 4,000 a month",
    origen: { tipo: "recalculado", detalle: "PAYE 8,210 / 12 = 684.17. NPF 10% = 400. Net 4,000 − 684.17 − 400 = 2,915.83." },
    fecha: "2026-10-29",
    entrada: { bruto: 4000, periodo: "month" },
    esperado: { neto: 2915.83, paye: 684.17, npf: 400, totalDeducido: 1084.17 },
  },
  {
    nombre: "WST 1,000 a fortnight",
    origen: { tipo: "recalculado", detalle: "PAYE 77.20 + 10.26 = 87.46. NPF 100. Net 812.54." },
    fecha: "2026-10-29",
    entrada: { bruto: 1000, periodo: "fortnight" },
    esperado: { neto: 812.54, paye: 87.46, npf: 100, netoAnual: 21126.04 },
  },
  {
    nombre: "WST 500 a fortnight, below the tax threshold",
    origen: { tipo: "recalculado", detalle: "No PAYE under 576. NPF 50. Net 450." },
    fecha: "2026-10-29",
    entrada: { bruto: 500, periodo: "fortnight" },
    esperado: { neto: 450, paye: 0, npf: 50 },
  },
]);
