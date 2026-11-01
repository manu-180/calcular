import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-to-gross";

export default definirCasos(calculadora, [
  {
    nombre: "D15,166.67 net in the NPF",
    origen: {
      tipo: "recalculado",
      detalle: "Reverse of the take-home pay case: a D20,000 basic salary pays PAYE 3,833.33 and NPF 1,000, leaving 15,166.67.",
    },
    fecha: "2026-10-27",
    entrada: { neto: 15166.67, esquema: "npf" },
    esperado: { bruto: 20000, paye: 3833.33, npf: 1000 },
    tolerancia: 0.02,
  },
  {
    nombre: "D2,850 net is below the tax threshold",
    origen: { tipo: "recalculado", detalle: "No PAYE up to D3,000 a month. 2,850 / 0.95 = 3,000." },
    fecha: "2026-10-27",
    entrada: { neto: 2850, esquema: "npf" },
    esperado: { bruto: 3000, paye: 0 },
    tolerancia: 0.02,
  },
  {
    nombre: "D8,666.67 net with nothing deducted for pension",
    origen: { tipo: "recalculado", detalle: "D10,000 gross pays PAYE 1,333.33 and leaves 8,666.67." },
    fecha: "2026-10-27",
    entrada: { neto: 8666.67, esquema: "otro" },
    esperado: { bruto: 10000, npf: 0 },
    tolerancia: 0.02,
  },
  {
    nombre: "No target",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { neto: 0, esquema: "npf" },
    esperaError: true,
  },
]);
