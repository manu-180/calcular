import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-tax-calculator";

const ACT = "https://www.drc.gov.bt/wp-content/uploads/2025/09/Income-Tax-Act-of-Bhutan-2025.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Company with Nu. 1 million",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1, paragraph 4: 22%." },
    fecha: "2026-10-31",
    entrada: { entidad: "company", ganancia: 1000000 },
    esperado: { impuesto: 220000, tasa: 22, restante: 780000 },
  },
  {
    nombre: "Trust with Nu. 1 million",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1, paragraph 3: 30%." },
    fecha: "2026-10-31",
    entrada: { entidad: "trust", ganancia: 1000000 },
    esperado: { impuesto: 300000, tasa: 30 },
  },
  {
    nombre: "Body of persons with Nu. 500,000",
    origen: { tipo: "recalculado", url: ACT, detalle: "Schedule 1, paragraph 2: 22%." },
    fecha: "2026-10-31",
    entrada: { entidad: "body", ganancia: 500000 },
    esperado: { impuesto: 110000, tasa: 22 },
  },
]);
