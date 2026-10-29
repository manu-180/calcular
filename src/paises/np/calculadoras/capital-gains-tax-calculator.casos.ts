import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

const IRD = "https://ird.gov.np/content/13609/tax-rate-for-natural-persons-for-the/" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Land held for 8 years",
    origen: { tipo: "recalculado", url: IRD, detalle: "Gain 5,000,000 − 3,000,000 = 2,000,000. 7.5% = 150,000." },
    fecha: "2026-10-29",
    entrada: { activo: "land-long", venta: 5000000, costo: 3000000 },
    esperado: { impuesto: 150000, ganancia: 2000000, tasa: 7.5, neto: 4850000 },
  },
  {
    nombre: "Land held for 3 years",
    origen: { tipo: "recalculado", url: IRD, detalle: "Gain 2,000,000 × 10% = 200,000." },
    fecha: "2026-10-29",
    entrada: { activo: "land-short", venta: 5000000, costo: 3000000 },
    esperado: { impuesto: 200000 },
  },
  {
    nombre: "Listed shares sold at a loss",
    origen: { tipo: "recalculado", url: IRD, detalle: "Sale 90,000 − cost 100,000 = −10,000. No tax." },
    fecha: "2026-10-29",
    entrada: { activo: "shares-short", venta: 90000, costo: 100000 },
    esperado: { impuesto: 0, ganancia: -10000 },
  },
  {
    nombre: "Listed shares held for over a year",
    origen: { tipo: "recalculado", url: IRD, detalle: "Gain 400,000 − 250,000 = 150,000 × 7.5% = 11,250." },
    fecha: "2026-10-29",
    entrada: { activo: "shares-long", venta: 400000, costo: 250000 },
    esperado: { impuesto: 11250 },
  },
  {
    nombre: "No sale price",
    origen: { tipo: "recalculado", detalle: "Sale price has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { activo: "land-long", venta: 0, costo: 0 },
    esperaError: true,
  },
]);
