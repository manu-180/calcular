import { definirCasos } from "@/motor/calculo";
import calculadora from "./registration-duty-calculator";

const RDA = "https://www.mra.mu/download/TheRegistrationDutyAct.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 8 million house with the first home reduction",
    origen: { tipo: "recalculado", url: RDA, detalle: "First Schedule Part I (J): 5% × 8,000,000 = 400,000. Section 27(5): less 300,000 = 100,000. Land transfer tax 5% = 400,000." },
    fecha: "2026-10-24",
    entrada: { precio: 8000000, tipo: "home", reduccion: true },
    esperado: { comprador: 100000, derecho: 400000, reduccion: 300000, vendedor: 400000, total: 500000 },
  },
  {
    nombre: "Formula with the old Rs 250,000 cap",
    origen: { tipo: "recalculado", detalle: "Before 13 August 2026 the cap was 250,000: 400,000 − 250,000 = 150,000. Only the formula is checked, with valores." },
    fecha: "2026-10-24",
    valores: { "mu.first-home-relief-house": 250000 },
    entrada: { precio: 8000000, tipo: "home", reduccion: true },
    esperado: { comprador: 150000 },
  },
  {
    nombre: "Rs 2 million bare land with the reduction",
    origen: { tipo: "recalculado", url: RDA, detalle: "5% = 100,000, below the 150,000 cap, so nothing is left to pay." },
    fecha: "2026-10-24",
    entrada: { precio: 2000000, tipo: "land", reduccion: true },
    esperado: { comprador: 0, reduccion: 100000 },
  },
  {
    nombre: "Other property, no reduction",
    origen: { tipo: "recalculado", url: "https://www.mra.mu/download/TheLandAct.pdf", detalle: "5% registration duty and 5% land transfer tax on 10,000,000." },
    fecha: "2026-10-24",
    entrada: { precio: 10000000, tipo: "other", reduccion: null },
    esperado: { comprador: 500000, vendedor: 500000, reduccion: 0 },
  },
]);
