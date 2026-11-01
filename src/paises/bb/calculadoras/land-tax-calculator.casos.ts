import { definirCasos } from "@/motor/calculo";
import calculadora from "./land-tax-calculator";

const URL = "https://www.bra.gov.bb/FAQs/Land-Tax/";

export default definirCasos(calculadora, [
  {
    nombre: "Home valued at Bds$1,000,000",
    origen: { tipo: "recalculado", url: URL, detalle: "0% to 400,000. 150,000 × 0.1% = 150. 400,000 × 0.7% = 2,800. 50,000 × 1% = 500. Total 3,450.00." },
    fecha: "2026-10-27",
    entrada: { valor: 1000000, tipo: "residential" },
    esperado: { impuesto: 3450, mensual: 287.5 },
  },
  {
    nombre: "Home valued at Bds$350,000",
    origen: { tipo: "recalculado", url: URL, detalle: "Within the 0% band, so no tax." },
    fecha: "2026-10-27",
    entrada: { valor: 350000, tipo: "residential" },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Shop building valued at Bds$600,000",
    origen: { tipo: "recalculado", url: URL, detalle: "600,000 × 0.95% = 5,700.00." },
    fecha: "2026-10-27",
    entrada: { valor: 600000, tipo: "building" },
    esperado: { impuesto: 5700 },
  },
  {
    nombre: "Small vacant lot valued at Bds$100,000",
    origen: { tipo: "recalculado", url: URL, detalle: "100,000 × 0.8% = 800.00." },
    fecha: "2026-10-27",
    entrada: { valor: 100000, tipo: "vacant-small" },
    esperado: { impuesto: 800 },
  },
  {
    nombre: "No value",
    origen: { tipo: "recalculado", detalle: "A zero value is rejected." },
    fecha: "2026-10-27",
    entrada: { valor: 0, tipo: "residential" },
    esperaError: true,
  },
]);
