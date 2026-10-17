import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-ni-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "£30,000 with 3% pension",
    origen: { tipo: "recalculado", detalle: "NI (30,000 − 5,000) × 15% = 3,750. Pension 900. Total 34,650; a month 2,887.50." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, pension: 3, allowance: false },
    esperado: { ni: 3750, pension: 900, total: 34650, mensual: 2887.5 },
  },
  {
    nombre: "Employment Allowance covers the whole NI",
    origen: { tipo: "recalculado", detalle: "NI 3,750 is under the 10,500 allowance, so 0 to pay. Total 30,900." },
    fecha: "2026-10-14",
    entrada: { salario: 30000, pension: 3, allowance: true },
    esperado: { ni: 0, descuento: 3750, total: 30900 },
  },
  {
    nombre: "£100,000 with Employment Allowance",
    origen: { tipo: "recalculado", detalle: "NI (100,000 − 5,000) × 15% = 14,250 − 10,500 = 3,750. No pension. Total 103,750." },
    fecha: "2026-10-14",
    entrada: { salario: 100000, pension: 0, allowance: true },
    esperado: { ni: 3750, descuento: 10500, total: 103750 },
  },
]);
