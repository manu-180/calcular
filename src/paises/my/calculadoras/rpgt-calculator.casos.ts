import { definirCasos } from "@/motor/calculo";
import calculadora from "./rpgt-calculator";

const BASE = { venta: 600000, gastosVenta: 12000, compra: 450000, gastosCompra: 15000 };

export default definirCasos(calculadora, [
  {
    nombre: "Citizen selling in the 5th year",
    origen: { tipo: "recalculado", detalle: "Gain 600,000 − 12,000 − 465,000 = 123,000. Exemption: higher of 10,000 and 10% (12,300). 110,700 × 15% = 16,605." },
    fecha: "2026-10-16",
    entrada: { ...BASE, vendedor: "citizen", anios: 4 },
    esperado: { impuesto: 16605, ganancia: 123000, exencion: 12300, tasa: 15, neto: 571395 },
  },
  {
    nombre: "Citizen selling in the 6th year or later",
    origen: { tipo: "recalculado", detalle: "Part I rate from 1 January 2022: 0% from the 6th year." },
    fecha: "2026-10-16",
    entrada: { ...BASE, vendedor: "citizen", anios: 6 },
    esperado: { impuesto: 0, tasa: 0 },
  },
  {
    nombre: "Malaysian company selling within 3 years",
    origen: { tipo: "recalculado", detalle: "Part II, within 3 years: 30%. No individual exemption. 123,000 × 30% = 36,900." },
    fecha: "2026-10-16",
    entrada: { ...BASE, vendedor: "company", anios: 2 },
    esperado: { impuesto: 36900, exencion: 0, tasa: 30 },
  },
  {
    nombre: "Non-citizen individual after 7 years",
    origen: { tipo: "recalculado", detalle: "Part III, 6th year onwards: 10%. Exemption 12,300. 110,700 × 10% = 11,070." },
    fecha: "2026-10-16",
    entrada: { ...BASE, vendedor: "foreigner", anios: 7 },
    esperado: { impuesto: 11070, tasa: 10 },
  },
  {
    nombre: "Small gain: the RM10,000 exemption is higher than 10%",
    origen: { tipo: "recalculado", detalle: "Gain 20,000. Exemption max(10,000; 2,000) = 10,000. 10,000 × 30% = 3,000." },
    fecha: "2026-10-16",
    entrada: { vendedor: "citizen", venta: 300000, gastosVenta: 0, compra: 280000, gastosCompra: 0, anios: 1 },
    esperado: { impuesto: 3000, exencion: 10000 },
  },
]);
