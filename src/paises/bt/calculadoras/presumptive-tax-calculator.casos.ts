import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax-calculator";

const ACT = "https://www.drc.gov.bt/wp-content/uploads/2025/09/Income-Tax-Act-of-Bhutan-2025.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nu. 3 million of business income",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 2: 15% = 450,000. Schedule 1: 5% of 150,000 = 7,500." },
    fecha: "2026-10-31",
    entrada: { ventas: 3000000 },
    esperado: { impuesto: 7500, presunto: 450000, sobreVentas: 0.25, margen: 2000000 },
  },
  {
    nombre: "Nu. 5 million, the ceiling",
    origen: { tipo: "recalculado", url: ACT, detalle: "15% = 750,000. Schedule 1: 10,000 + 25,000 = 35,000." },
    fecha: "2026-10-31",
    entrada: { ventas: 5000000 },
    esperado: { impuesto: 35000, presunto: 750000, margen: 0 },
  },
  {
    nombre: "Nu. 1 million, no tax",
    origen: { tipo: "recalculado", url: ACT, detalle: "15% = 150,000, below 300,000." },
    fecha: "2026-10-31",
    entrada: { ventas: 1000000 },
    esperado: { impuesto: 0, presunto: 150000 },
  },
  {
    nombre: "Above the ceiling is refused",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 2, paragraph 1(3): not more than Nu. 5 million." },
    fecha: "2026-10-31",
    entrada: { ventas: 6000000 },
    esperaError: true,
  },
]);
