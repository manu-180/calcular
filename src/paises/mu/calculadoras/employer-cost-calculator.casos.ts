import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs 30,000 basic wage with bonus set aside",
    origen: {
      tipo: "recalculado",
      detalle: "CSG 3% = 900. NSF 2.5% × 29,710 = 742.75. Levy 1.5% = 450. PRGF 4.5% = 1,350. Bonus 30,000 / 12 = 2,500 plus CSG 3% = 75. Total 36,017.75.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 30000, extras: 0, pensionPrivada: false, bono: true },
    esperado: { costoMensual: 36017.75, csg: 900, nsf: 742.75, levy: 450, prgf: 1350, bono: 2575, costoAnual: 432213 },
  },
  {
    nombre: "Rs 80,000 with a private pension scheme, no bonus",
    origen: { tipo: "recalculado", detalle: "CSG 6% = 4,800. NSF 742.75. Levy 1,200. No PRGF. Total 80,000 + 6,742.75 = 86,742.75." },
    fecha: "2026-10-24",
    entrada: { basico: 80000, extras: 0, pensionPrivada: true, bono: false },
    esperado: { costoMensual: 86742.75, csg: 4800, prgf: 0, bono: 0, contribuciones: 6742.75 },
  },
  {
    nombre: "Rs 150,000 basic: no statutory bonus",
    origen: { tipo: "recalculado", detalle: "CSG 9,000, NSF 742.75, levy 2,250, PRGF 6,750. Bonus not due above Rs 100,000. Total 168,742.75." },
    fecha: "2026-10-24",
    entrada: { basico: 150000, extras: 0, pensionPrivada: false, bono: true },
    esperado: { costoMensual: 168742.75, bono: 0, prgf: 6750 },
  },
]);
