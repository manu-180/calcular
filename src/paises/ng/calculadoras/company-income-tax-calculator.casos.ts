import { definirCasos } from "@/motor/calculo";
import calculadora from "./company-income-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Medium company with ₦40 million profit",
    origen: { tipo: "recalculado", detalle: "Turnover above 100 million, so not small. CIT 30% × 40,000,000 = 12,000,000; levy 4% = 1,600,000. Total 13,600,000." },
    fecha: "2026-10-16",
    entrada: { ventas: 250000000, activos: 80000000, beneficio: 40000000 },
    esperado: { total: 13600000, cit: 12000000, levy: 1600000, categoria: "Other company", efectiva: 34 },
  },
  {
    nombre: "Small company",
    origen: { tipo: "recalculado", detalle: "Turnover 90 million and assets 50 million: small company at 0%, no development levy." },
    fecha: "2026-10-16",
    entrada: { ventas: 90000000, activos: 50000000, beneficio: 20000000 },
    esperado: { total: 0, categoria: "Small company" },
  },
  {
    nombre: "Small turnover but assets above the limit",
    origen: { tipo: "recalculado", detalle: "Assets 300 million exceed 250 million: 30% + 4% on 10,000,000 = 3,400,000." },
    fecha: "2026-10-16",
    entrada: { ventas: 90000000, activos: 300000000, beneficio: 10000000 },
    esperado: { total: 3400000, categoria: "Other company" },
  },
]);
