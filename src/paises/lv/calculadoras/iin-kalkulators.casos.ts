import { definirCasos } from "@/motor/calculo";
import iin from "./iin-kalkulators";

const VID = "https://www.vid.gov.lv/lv/iedzivotaju-ienakuma-nodokla-likmes";

export default definirCasos(iin, [
  {
    nombre: "30 000 eiro gadā ar minimumu",
    origen: { tipo: "recalculado", url: VID, detalle: "550 × 12 = 6600. Apliekamais 23 400 × 25,5% = 5967." },
    fecha: "2026-11-01",
    entrada: { ienakums: 30000, minimums: true, apgadajamie: 0, ieturets: null },
    esperado: { nodoklis: 5967, apliekams: 23400 },
  },
  {
    nombre: "Slieksnis: 33% daļai virs 105 300",
    origen: { tipo: "recalculado", url: VID, detalle: "105 300 × 25,5% = 26 851,50. 14 700 × 33% = 4851. Kopā 31 702,50." },
    fecha: "2026-11-01",
    entrada: { ienakums: 120000, minimums: false, apgadajamie: 0, ieturets: null },
    esperado: { nodoklis: 31702.5 },
  },
  {
    nombre: "3% papildu likme virs 200 000",
    origen: { tipo: "recalculado", url: VID, detalle: "26 851,50 + 94 700 × 33% (31 251) + 50 000 × 36% (18 000) = 76 102,50." },
    fecha: "2026-11-01",
    entrada: { ienakums: 250000, minimums: false, apgadajamie: 0, ieturets: null },
    esperado: { nodoklis: 76102.5 },
  },
  {
    nombre: "Ar apgādājamo un ieturēto nodokli",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/par-apgadiba-esosam-personam", detalle: "(550 + 250) × 12 = 9600. 20 000 - 9600 = 10 400 × 25,5% = 2652. Starpība ar 3000 = -348." },
    fecha: "2026-11-01",
    entrada: { ienakums: 20000, minimums: true, apgadajamie: 1, ieturets: 3000 },
    esperado: { nodoklis: 2652, starpiba: -348 },
  },
]);
