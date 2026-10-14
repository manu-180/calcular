import { definirCasos } from "@/motor/calculo";
import calculadora from "./child-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "Two children, income under the threshold",
    origen: { tipo: "oficial", url: "https://www.gov.uk/child-benefit/what-youll-get", detalle: "£27.05 for the eldest + £17.90 for the second = £44.95 a week; × 52 = 2,337.40." },
    fecha: "2026-10-14",
    entrada: { hijos: 2, ingreso: 50000 },
    esperado: { semanal: 44.95, anual: 2337.4, cargo: 0, neto: 2337.4 },
  },
  {
    nombre: "Two children, £70,000",
    origen: {
      tipo: "recalculado",
      url: "https://www.gov.uk/child-benefit-tax-charge",
      detalle: "1% for every £200 over £60,000: 10,000 / 200 = 50%. Charge 2,337.40 × 50% = 1,168.70.",
    },
    fecha: "2026-10-14",
    entrada: { hijos: 2, ingreso: 70000 },
    esperado: { porcentaje: 50, cargo: 1168.7, neto: 1168.7 },
  },
  {
    nombre: "One child, over £80,000",
    origen: { tipo: "oficial", url: "https://www.gov.uk/child-benefit-tax-charge", detalle: "Over £80,000 you pay it all back. 27.05 × 52 = 1,406.60." },
    fecha: "2026-10-14",
    entrada: { hijos: 1, ingreso: 85000 },
    esperado: { anual: 1406.6, porcentaje: 100, neto: 0 },
  },
  {
    nombre: "Three children, £60,450",
    origen: { tipo: "recalculado", detalle: "Weekly 27.05 + 2 × 17.90 = 62.85; a year 3,268.20. 450 / 200 = 2 full steps, so 2%: 65.36." },
    fecha: "2026-10-14",
    entrada: { hijos: 3, ingreso: 60450 },
    esperado: { semanal: 62.85, anual: 3268.2, porcentaje: 2, cargo: 65.36 },
  },
]);
