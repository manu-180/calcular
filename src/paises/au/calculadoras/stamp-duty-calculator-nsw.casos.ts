import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator-nsw";

const URL = "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty/understanding-transfer-duty/calculate-transfer-duty";

export default definirCasos(calculadora, [
  {
    nombre: "Revenue NSW example: Sarah and Michael, $1,350,000 at auction",
    origen: { tipo: "oficial", url: URL, detalle: "$52,237 + ($1,350,000 − $1,290,000) × 0.055 = $55,537." },
    fecha: "2026-10-14",
    entrada: { valor: 1350000, residencial: true, primeraVivienda: false },
    esperado: { duty: 55537 },
  },
  {
    nombre: "Revenue NSW example: Emma, $4 million with premium duty",
    origen: { tipo: "oficial", url: URL, detalle: "$194,137 + ($4,000,000 − $3,870,000) × 0.07 = $203,237." },
    fecha: "2026-10-14",
    entrada: { valor: 4000000, residencial: true, primeraVivienda: false },
    esperado: { duty: 203237 },
  },
  {
    nombre: "Revenue NSW example: Duy, land valued at $450,000",
    origen: { tipo: "oficial", url: URL, detalle: "$11,602 + ($450,000 − $387,000) × 0.045 = $14,437." },
    fecha: "2026-10-14",
    entrada: { valor: 450000, residencial: true, primeraVivienda: false },
    esperado: { duty: 14437 },
  },
  {
    nombre: "$4 million commercial property: no premium duty",
    origen: { tipo: "recalculado", detalle: "52,237 + 2,710,000 × 5.5% = 201,287." },
    fecha: "2026-10-14",
    entrada: { valor: 4000000, residencial: false, primeraVivienda: false },
    esperado: { duty: 201287 },
  },
  {
    nombre: "Minimum duty",
    origen: { tipo: "recalculado", detalle: "1,000 × 1.25% = 12.50, below the $20 minimum." },
    fecha: "2026-10-14",
    entrada: { valor: 1000, residencial: true, primeraVivienda: false },
    esperado: { duty: 20 },
  },
  {
    nombre: "First home at $750,000",
    origen: { tipo: "recalculado", detalle: "At or below $800,000 a first home buyer pays no duty. General duty 11,602 + 363,000 × 4.5% = 27,937." },
    fecha: "2026-10-14",
    entrada: { valor: 750000, residencial: true, primeraVivienda: true },
    esperado: { duty: 0, general: 27937 },
  },
]);
