import { definirCasos } from "@/motor/calculo";
import kataKalkulator from "./kata-kalkulator";

const KATA = "https://njt.jog.gov.hu/jogszabaly/2022-13-00-00";

export default definirCasos(kataKalkulator, [
  {
    nombre: "12 millió Ft bevétel, egész évben kisadózó",
    origen: { tipo: "recalculado", url: KATA, detalle: "7. § (1): 12 × 50 000 = 600 000; a bevétel a 18 millió Ft-os keret alatt van." },
    fecha: "2026-10-24",
    entrada: { bevetel: 12000000, honapok: 12 },
    esperado: { teteles: 600000, kulonado: 0, osszes: 600000, arany: 5 },
  },
  {
    nombre: "20 millió Ft bevétel: különadó a keret felett",
    origen: { tipo: "recalculado", url: KATA, detalle: "7. § (4): (20 000 000 − 18 000 000) × 40% = 800 000; összesen 1 400 000." },
    fecha: "2026-10-24",
    entrada: { bevetel: 20000000, honapok: 12 },
    esperado: { kulonado: 800000, osszes: 1400000, felett: 2000000 },
  },
  {
    nombre: "Fél év, 10 millió Ft bevétel",
    origen: { tipo: "recalculado", url: KATA, detalle: "Keret 18 000 000 / 12 × 6 = 9 000 000; különadó 1 000 000 × 40% = 400 000; tételes adó 300 000." },
    fecha: "2026-10-24",
    entrada: { bevetel: 10000000, honapok: 6 },
    esperado: { keret: 9000000, kulonado: 400000, teteles: 300000, osszes: 700000 },
  },
]);
