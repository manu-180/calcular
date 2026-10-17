import { definirCasos } from "@/motor/calculo";
import calculadora from "./nssf-calculator";

const AVISO =
  "https://www.nssf.or.ke/notice-to-employers-year-4-2026-nssf-contribution-rates" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Pay above the upper earnings limit",
    origen: { tipo: "oficial", url: AVISO, detalle: "NSSF notice for Year 4: Tier I 540, Tier II 5,940 each for employee and employer, 12,960 in total." },
    fecha: "2026-10-17",
    entrada: { bruto: 150000 },
    esperado: { empleado: 6480, tier1: 540, tier2: 5940, empleador: 6480, total: 12960 },
  },
  {
    nombre: "KSh 50,000 a month",
    origen: { tipo: "recalculado", detalle: "Tier I 6% × 9,000 = 540. Tier II 6% × 41,000 = 2,460. Total 3,000 each side." },
    fecha: "2026-10-17",
    entrada: { bruto: 50000 },
    esperado: { empleado: 3000, tier1: 540, tier2: 2460, total: 6000 },
  },
  {
    nombre: "Pay below the lower earnings limit",
    origen: { tipo: "recalculado", detalle: "6% × 7,000 = 420, all Tier I." },
    fecha: "2026-10-17",
    entrada: { bruto: 7000 },
    esperado: { empleado: 420, tier1: 420, tier2: 0 },
  },
]);
