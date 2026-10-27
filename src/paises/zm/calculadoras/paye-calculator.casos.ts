import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ZRA example: K15,000 taxable pay",
    origen: {
      tipo: "oficial",
      url: "https://www.zra.org.zm/wp-content/uploads/2026/06/PAYE.pdf",
      detalle: "First K5,100 at 0%, K400 at 20%, K630 at 30%, K2,146 at 37%. Total K3,176, net K11,824.",
    },
    fecha: "2026-10-26",
    entrada: { bruto: 15000 },
    esperado: { paye: 3176, neto: 11824, banda1: 0, banda2: 400, banda3: 630, banda4: 2146, marginal: 37 },
  },
  {
    nombre: "K5,100 pays no PAYE",
    origen: { tipo: "recalculado", detalle: "The whole amount sits in the 0% band." },
    fecha: "2026-10-26",
    entrada: { bruto: 5100 },
    esperado: { paye: 0, neto: 5100, marginal: 0 },
  },
  {
    nombre: "K8,000 in the 30% band",
    origen: { tipo: "recalculado", detalle: "2,000 × 20% = 400; 900 × 30% = 270. Total 670." },
    fecha: "2026-10-26",
    entrada: { bruto: 8000 },
    esperado: { paye: 670, neto: 7330, marginal: 30 },
  },
  {
    nombre: "K50,000",
    origen: { tipo: "recalculado", detalle: "400 + 630 + 40,800 × 37% = 15,096. Total 16,126." },
    fecha: "2026-10-26",
    entrada: { bruto: 50000 },
    esperado: { paye: 16126, anual: 193512 },
  },
  {
    nombre: "Zero pay is rejected",
    origen: { tipo: "recalculado", detalle: "Gross pay has to be above zero." },
    fecha: "2026-10-26",
    entrada: { bruto: 0 },
    esperaError: true,
  },
]);
