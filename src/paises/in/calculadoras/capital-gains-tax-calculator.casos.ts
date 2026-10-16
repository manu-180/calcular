import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹1 lakh short-term and ₹3 lakh long-term",
    origen: {
      tipo: "recalculado",
      detalle: "STCG 1,00,000 × 20% = 20,000. LTCG (3,00,000 − 1,25,000) × 12.5% = 21,875. Cess 4% of 41,875 = 1,675. Total 43,550.",
    },
    fecha: "2026-10-15",
    entrada: { corto: 100000, largo: 300000 },
    esperado: { total: 43550, impCorto: 20000, impLargo: 21875, gravableLargo: 175000, exento: 125000, cess: 1675 },
  },
  {
    nombre: "Long-term gains under the exemption",
    origen: { tipo: "recalculado", detalle: "1,00,000 of LTCG is below 1,25,000, so no tax." },
    fecha: "2026-10-15",
    entrada: { corto: 0, largo: 100000 },
    esperado: { total: 0, exento: 100000 },
  },
  {
    nombre: "₹11.25 lakh of long-term gains",
    origen: { tipo: "recalculado", detalle: "(11,25,000 − 1,25,000) × 12.5% = 1,25,000; with 4% cess 1,30,000." },
    fecha: "2026-10-15",
    entrada: { corto: 0, largo: 1125000 },
    esperado: { total: 130000, impLargo: 125000 },
  },
]);
