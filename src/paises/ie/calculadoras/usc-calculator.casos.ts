import { definirCasos } from "@/motor/calculo";
import calculadora from "./usc-calculator";

const URL = "https://www.revenue.ie/en/jobs-and-pensions/usc/calculating-usc.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "Jacob, €25,000",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue: 0.5% on €12,012 = €60.06, 2% on €12,988 = €259.76, total €319.82 (2026)." },
    fecha: "2026-06-15",
    entrada: { ingreso: 25000, reducida: false },
    esperado: { anual: 319.82, marginal: 2 },
  },
  {
    nombre: "Sadhbh, €50,000",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue: €60.06 + €333.76 + 3% on €21,300 = €639.00, total €1,032.82 (2026)." },
    fecha: "2026-06-15",
    entrada: { ingreso: 50000, reducida: false },
    esperado: { anual: 1032.82, marginal: 3 },
  },
  {
    nombre: "Donnchadh, €50,000 at reduced rates",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue: 0.5% on €12,012 = €60.06 and 2% on €37,988 = €759.76, total €819.82 (2026)." },
    fecha: "2026-06-15",
    entrada: { ingreso: 50000, reducida: true },
    esperado: { anual: 819.82, tipo: "Reduced rates" },
  },
  {
    nombre: "Cian, €75,000",
    origen: { tipo: "oficial", url: URL, detalle: "Revenue: €60.06 + €333.76 + €1,240.32 + 8% on €4,956 = €396.48, total €2,030.62 (2026)." },
    fecha: "2026-06-15",
    entrada: { ingreso: 75000, reducida: false },
    esperado: { anual: 2030.62, marginal: 8 },
  },
  {
    nombre: "€13,000 is exempt",
    origen: { tipo: "recalculado", detalle: "Revenue: you pay USC on your full income only if it exceeds €13,000." },
    fecha: "2026-06-15",
    entrada: { ingreso: 13000, reducida: false },
    esperado: { anual: 0, tipo: "Exempt" },
  },
  {
    nombre: "€13,001 pays on everything",
    origen: { tipo: "recalculado", detalle: "60.06 + (13,001 − 12,012) × 2% = 19.78, total 79.84." },
    fecha: "2026-06-15",
    entrada: { ingreso: 13001, reducida: false },
    esperado: { anual: 79.84 },
  },
  {
    nombre: "Medical card but income over €60,000",
    origen: { tipo: "recalculado", detalle: "One cent over the €60,000 limit the standard rates apply: 60.06 + 333.76 + 31,300.01 × 3% = 939.00, total 1,332.82." },
    fecha: "2026-06-15",
    entrada: { ingreso: 60000.01, reducida: true },
    esperado: { tipo: "Standard rates", anual: 1332.82 },
  },
]);
