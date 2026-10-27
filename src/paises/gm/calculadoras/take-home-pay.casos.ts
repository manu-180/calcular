import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "D20,000 basic salary in the NPF",
    origen: {
      tipo: "recalculado",
      detalle: "PAYE: (240,000 − 76,000) × 25% + 5,000 = 46,000 a year, 3,833.33 a month. NPF 5% of 20,000 = 1,000. Net 20,000 − 3,833.33 − 1,000 = 15,166.67.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 20000, subsidios: 0, esquema: "npf" },
    esperado: { paye: 3833.33, npf: 1000, neto: 15166.67 },
  },
  {
    nombre: "Allowances count for PAYE but not for the NPF",
    origen: {
      tipo: "recalculado",
      detalle: "Basic 8,000 and allowances 2,000. PAYE on 10,000: (120,000 − 76,000) × 25% + 5,000 = 16,000 a year, 1,333.33 a month. NPF 5% of 8,000 = 400. Net 10,000 − 1,333.33 − 400 = 8,266.67.",
    },
    fecha: "2026-10-27",
    entrada: { basico: 8000, subsidios: 2000, esquema: "npf" },
    esperado: { paye: 1333.33, npf: 400, neto: 8266.67 },
  },
  {
    nombre: "Federated Pension Scheme: nothing comes off your pay",
    origen: { tipo: "recalculado", detalle: "Same pay as above in the FPS: 10,000 − 1,333.33 = 8,666.67." },
    fecha: "2026-10-27",
    entrada: { basico: 8000, subsidios: 2000, esquema: "fps" },
    esperado: { npf: 0, neto: 8666.67 },
  },
  {
    nombre: "D3,000 a month pays no PAYE",
    origen: { tipo: "recalculado", detalle: "36,000 a year is in the 0% band. NPF 150. Net 2,850." },
    fecha: "2026-10-27",
    entrada: { basico: 3000, subsidios: 0, esquema: "npf" },
    esperado: { paye: 0, npf: 150, neto: 2850 },
  },
  {
    nombre: "No basic salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { basico: 0, subsidios: 0, esquema: "npf" },
    esperaError: true,
  },
]);
