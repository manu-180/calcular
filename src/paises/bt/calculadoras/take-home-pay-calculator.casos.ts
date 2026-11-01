import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay-calculator";

const ACT = "https://www.drc.gov.bt/wp-content/uploads/2025/09/Income-Tax-Act-of-Bhutan-2025.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nu. 50,000 a month",
    origen: { tipo: "recalculado", url: ACT, detalle: "Year 600,000; section 44: 15% = 90,000; taxable 510,000; Schedule 1: 10,000 + 10% of 10,000 = 11,000; month 916.67; PF 5% = 2,500; net 46,583.33." },
    fecha: "2026-10-31",
    entrada: { bruto: 50000, basico: null, tasaPf: 5, otros: 0 },
    esperado: { neto: 46583.33, impuesto: 916.67, pf: 2500, deduccion: 90000, imponible: 510000, impuestoAnual: 11000 },
  },
  {
    nombre: "Nu. 100,000 a month, deduction at the ceiling",
    origen: { tipo: "recalculado", url: ACT, detalle: "Year 1,200,000; 15% = 180,000, capped at 150,000; taxable 1,050,000; 35,000 + 15% of 300,000 = 80,000; month 6,666.67; PF 5,000; net 88,333.33." },
    fecha: "2026-10-31",
    entrada: { bruto: 100000, basico: null, tasaPf: 5, otros: 0 },
    esperado: { neto: 88333.33, impuesto: 6666.67, deduccion: 150000, imponible: 1050000, impuestoAnual: 80000 },
  },
  {
    nombre: "Nu. 20,000 a month, no tax",
    origen: { tipo: "recalculado", url: ACT, detalle: "Year 240,000; less 36,000 = 204,000, below 300,000. PF 1,000. Net 19,000." },
    fecha: "2026-10-31",
    entrada: { bruto: 20000, basico: null, tasaPf: 5, otros: 0 },
    esperado: { neto: 19000, impuesto: 0 },
  },
  {
    nombre: "Basic pay lower than gross, and group insurance",
    origen: { tipo: "recalculado", detalle: "Gross 50,000: tax 916.67. PF 5% of basic 30,000 = 1,500. Other 300. Net 47,283.33." },
    fecha: "2026-10-31",
    entrada: { bruto: 50000, basico: 30000, tasaPf: 5, otros: 300 },
    esperado: { neto: 47283.33, pf: 1500, otros: 300 },
  },
  {
    nombre: "Basic pay above gross is refused",
    origen: { tipo: "recalculado", detalle: "Basic pay is part of gross pay." },
    fecha: "2026-10-31",
    entrada: { bruto: 50000, basico: 60000, tasaPf: 5, otros: 0 },
    esperaError: true,
  },
]);
