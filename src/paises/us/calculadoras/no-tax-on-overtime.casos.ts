import { definirCasos } from "@/motor/calculo";
import calculadora from "./no-tax-on-overtime";

const S1A = "https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Single worker with $15,000 of overtime pay",
    origen: {
      tipo: "recalculado",
      url: S1A,
      detalle: "Premium 15000 x 0.5 / 1.5 = 5000, under the 12500 cap, MAGI under 150000. Tax on 63900 is 8770 and on 58900 is 7670, so 1100 saved.",
    },
    fecha: "2026-10-14",
    entrada: { estado: "single", pagoExtra: 15000, magi: 80000, gravable: 63900 },
    esperado: { prima: 5000, tope: 12500, recorte: 0, deduccion: 5000, ahorro: 1100 },
  },
  {
    nombre: "Joint return over the cap and slightly over the threshold",
    origen: { tipo: "recalculado", url: S1A, detalle: "Premium 30000, cap 25000. MAGI 310500: 10500 over, 10 full thousands x 100 = 1000. Deduction 24000." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", pagoExtra: 90000, magi: 310500, gravable: null },
    esperado: { prima: 30000, tope: 25000, recorte: 1000, deduccion: 24000, ahorro: null },
  },
  {
    nombre: "Fully phased out",
    origen: { tipo: "recalculado", url: S1A, detalle: "MAGI 280000 is 130000 over: reduction 13000 wipes out the 12500 cap." },
    fecha: "2026-10-14",
    entrada: { estado: "single", pagoExtra: 45000, magi: 280000, gravable: null },
    esperado: { deduccion: 0, recorte: 13000 },
  },
  {
    nombre: "Married filing separately can't claim it",
    origen: { tipo: "recalculado", url: S1A, detalle: "Married taxpayers must file jointly." },
    fecha: "2026-10-14",
    entrada: { estado: "mfs", pagoExtra: 15000, magi: 80000, gravable: 60000 },
    esperado: { deduccion: 0 },
  },
]);
