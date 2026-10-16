import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦500,000 a month with NHF and rent",
    origen: {
      tipo: "recalculado",
      detalle:
        "Pension 8% × 450,000 = 36,000; NHF 2.5% × 250,000 = 6,250. Year: 6,000,000 − 507,000 − rent relief 240,000 = 5,253,000 chargeable. Tax 330,000 + 2,253,000 × 18% = 735,540, or 61,295 a month. Net 500,000 − 36,000 − 6,250 − 61,295 = 396,455.",
    },
    fecha: "2026-10-16",
    entrada: { basico: 250000, vivienda: 125000, transporte: 75000, otros: 50000, nhf: true, alquiler: 1200000 },
    esperado: { neto: 396455, pension: 36000, nhf: 6250, paye: 61295, gravable: 5253000 },
  },
  {
    nombre: "Minimum wage",
    origen: { tipo: "recalculado", detalle: "70,000 basic: pension 5,600, no PAYE at the minimum wage. Net 64,400." },
    fecha: "2026-10-16",
    entrada: { basico: 70000, vivienda: 0, transporte: 0, otros: 0, nhf: false, alquiler: 0 },
    esperado: { neto: 64400, paye: 0 },
  },
]);
