import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Redundancy after 5 years on K6,000",
    origen: {
      tipo: "recalculado",
      url: "https://www.mlss.gov.zm/wp-content/uploads/2023/07/The-Employment-Code-Act-No.-3-of-2019.pdf",
      detalle: "Sections 54(1)(d) and 55(3): 2 months' basic pay × 5 years = 10 × 6,000 = 60,000.",
    },
    fecha: "2026-10-26",
    entrada: { motivo: "redundancy", basico: 6000, anios: 5 },
    esperado: { pago: 60000, mesesPorAnio: 2, mesesTotales: 10 },
  },
  {
    nombre: "Medical discharge after 5 years",
    origen: { tipo: "recalculado", detalle: "Section 38(6): 3 months' basic pay × 5 completed years = 90,000." },
    fecha: "2026-10-26",
    entrada: { motivo: "medical", basico: 6000, anios: 5 },
    esperado: { pago: 90000, mesesTotales: 15 },
  },
  {
    nombre: "Death in service after 12 years",
    origen: { tipo: "recalculado", detalle: "Section 54(1)(e): 2 × 12 × 4,500 = 108,000." },
    fecha: "2026-10-26",
    entrada: { motivo: "death", basico: 4500, anios: 12 },
    esperado: { pago: 108000 },
  },
  {
    nombre: "No completed year",
    origen: { tipo: "recalculado", detalle: "Zero years gives nothing to calculate." },
    fecha: "2026-10-26",
    entrada: { motivo: "redundancy", basico: 6000, anios: 0 },
    esperaError: true,
  },
]);
