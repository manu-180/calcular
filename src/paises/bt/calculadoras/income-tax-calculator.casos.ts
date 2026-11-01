import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const ACT = "https://www.drc.gov.bt/wp-content/uploads/2025/09/Income-Tax-Act-of-Bhutan-2025.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nu. 300,000, the top of the nil band",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1: nil up to Nu. 300,000." },
    fecha: "2026-10-31",
    entrada: { ingreso: 300000 },
    esperado: { impuesto: 0, restante: 300000, marginal: 0 },
  },
  {
    nombre: "Nu. 500,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1: 5% of 200,000 = 10,000." },
    fecha: "2026-10-31",
    entrada: { ingreso: 500000 },
    esperado: { impuesto: 10000, marginal: 5 },
  },
  {
    nombre: "Nu. 800,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1: Nu. 35,000 plus 15% of 50,000 = 42,500." },
    fecha: "2026-10-31",
    entrada: { ingreso: 800000 },
    esperado: { impuesto: 42500, restante: 757500, marginal: 15 },
  },
  {
    nombre: "Nu. 4,000,000, top band",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1: Nu. 637,500 plus 30% of 500,000 = 787,500." },
    fecha: "2026-10-31",
    entrada: { ingreso: 4000000 },
    esperado: { impuesto: 787500, marginal: 30 },
  },
]);
