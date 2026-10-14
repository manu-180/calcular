import { definirCasos } from "@/motor/calculo";
import calculadora from "./no-tax-on-tips";

const S1A = "https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Server with $12,000 of tips",
    origen: { tipo: "recalculado", url: S1A, detalle: "12000 under the 25000 cap. Tax on 28900 is 1240 + 12% of 16500 = 3220; on 16900 it is 1240 + 12% of 4500 = 1780. Saved 1440." },
    fecha: "2026-10-14",
    entrada: { estado: "single", propinas: 12000, magi: 45000, gravable: 28900 },
    esperado: { tope: 25000, recorte: 0, deduccion: 12000, ahorro: 1440 },
  },
  {
    nombre: "High earner partly phased out",
    origen: { tipo: "recalculado", url: S1A, detalle: "Tips 40000 capped at 25000. MAGI 199999 is 49999 over: 49 full thousands x 100 = 4900. Deduction 20100." },
    fecha: "2026-10-14",
    entrada: { estado: "single", propinas: 40000, magi: 199999, gravable: null },
    esperado: { recorte: 4900, deduccion: 20100 },
  },
  {
    nombre: "Joint return under the threshold",
    origen: { tipo: "recalculado", url: S1A, detalle: "MAGI 290000 is under 300000. Deduction 18000." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", propinas: 18000, magi: 290000, gravable: null },
    esperado: { recorte: 0, deduccion: 18000 },
  },
  {
    nombre: "Married filing separately",
    origen: { tipo: "recalculado", url: S1A, detalle: "Married taxpayers must file jointly." },
    fecha: "2026-10-14",
    entrada: { estado: "mfs", propinas: 18000, magi: 50000, gravable: null },
    esperado: { deduccion: 0 },
  },
]);
