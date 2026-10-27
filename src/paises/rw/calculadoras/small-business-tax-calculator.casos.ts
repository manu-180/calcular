import { definirCasos } from "@/motor/calculo";
import calculadora from "./small-business-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Turnover of RWF 8,000,000",
    origen: { tipo: "recalculado", detalle: "Band 7,000,001 to 10,000,000: flat RWF 210,000 a year." },
    fecha: "2026-10-26",
    entrada: { facturacion: 8000000 },
    esperado: { impuesto: 210000, regimen: "Micro-enterprise flat amount" },
  },
  {
    nombre: "Turnover of exactly RWF 4,000,000",
    origen: { tipo: "recalculado", detalle: "Band 2,000,001 to 4,000,000: RWF 60,000." },
    fecha: "2026-10-26",
    entrada: { facturacion: 4000000 },
    esperado: { impuesto: 60000 },
  },
  {
    nombre: "Turnover of RWF 1,500,000",
    origen: { tipo: "recalculado", detalle: "Up to 2,000,000: no tax." },
    fecha: "2026-10-26",
    entrada: { facturacion: 1500000 },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Turnover of RWF 15,000,000",
    origen: { tipo: "recalculado", detalle: "Between 12,000,001 and 20,000,000: 3% × 15,000,000 = 450,000." },
    fecha: "2026-10-26",
    entrada: { facturacion: 15000000 },
    esperado: { impuesto: 450000, regimen: "Flat-rate (lump sum) regime" },
  },
  {
    nombre: "Turnover of RWF 30,000,000",
    origen: { tipo: "recalculado", detalle: "Above 20,000,000 the real regime applies." },
    fecha: "2026-10-26",
    entrada: { facturacion: 30000000 },
    esperado: { impuesto: null, regimen: "Real regime" },
  },
]);
