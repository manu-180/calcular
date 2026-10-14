import { definirCasos } from "@/motor/calculo";
import calculadora from "./hsa-contribution";

const RP = "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Self-only coverage all year",
    origen: { tipo: "recalculado", url: RP, detalle: "Rev. Proc. 2025-19: 4400 for 2026." },
    fecha: "2026-10-14",
    entrada: { cobertura: "individual", mayor55: false, meses: 12, empleador: null },
    esperado: { limite: 4400, tuyo: 4400, porMes: 366.67 },
  },
  {
    nombre: "Family coverage at 56 with an employer contribution",
    origen: { tipo: "recalculado", url: RP, detalle: "8750 + 1000 catch-up = 9750. Minus 1000 from the employer = 8750." },
    fecha: "2026-10-14",
    entrada: { cobertura: "familiar", mayor55: true, meses: 12, empleador: 1000 },
    esperado: { limite: 9750, empleador: 1000, tuyo: 8750 },
  },
  {
    nombre: "Six months of self-only coverage at 55",
    origen: { tipo: "recalculado", url: "https://www.irs.gov/pub/irs-pdf/p969.pdf", detalle: "(4400 + 1000) x 6 / 12 = 2700." },
    fecha: "2026-10-14",
    entrada: { cobertura: "individual", mayor55: true, meses: 6, empleador: null },
    esperado: { limite: 2700, tuyo: 2700 },
  },
]);
