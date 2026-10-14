import { definirCasos } from "@/motor/calculo";
import calculadora from "./roth-ira-contribution";

const W = "https://www.irs.gov/pub/irs-pdf/p590a.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Single filer inside the phase-out range",
    origen: { tipo: "recalculado", url: W, detalle: "(160000 - 153000) / 15000 = 0.467. 7500 x 0.467 = 3502.50. 7500 - 3502.50 = 3997.50, rounded up to 4000." },
    fecha: "2026-10-14",
    entrada: { estado: "single", magi: 160000, edad: 35, compensacion: 100000 },
    esperado: { limite: 7500, inicio: 153000, fin: 168000, maximo: 4000, porMes: 333.33 },
  },
  {
    nombre: "Joint filers over 50 inside the range",
    origen: { tipo: "recalculado", url: W, detalle: "Limit 7500 + 1100 = 8600. (250000 - 242000) / 10000 = 0.8. 8600 x 0.2 = 1720." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", magi: 250000, edad: 52, compensacion: 200000 },
    esperado: { limite: 8600, maximo: 1720 },
  },
  {
    nombre: "Near the top of the range the $200 floor applies",
    origen: { tipo: "recalculado", url: W, detalle: "14900 / 15000 = 0.993. 7500 x 0.007 = 52.50, rounded up to 60, raised to 200." },
    fecha: "2026-10-14",
    entrada: { estado: "single", magi: 167900, edad: 35, compensacion: 100000 },
    esperado: { maximo: 200 },
  },
  {
    nombre: "Above the range",
    origen: { tipo: "recalculado", url: W, detalle: "MAGI 170000 is over 168000." },
    fecha: "2026-10-14",
    entrada: { estado: "single", magi: 170000, edad: 35, compensacion: 100000 },
    esperado: { maximo: 0 },
  },
  {
    nombre: "Compensation smaller than the limit",
    origen: { tipo: "recalculado", url: W, detalle: "You can't contribute more than your taxable compensation: 3000." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", magi: 50000, edad: 30, compensacion: 3000 },
    esperado: { maximo: 3000 },
  },
]);
