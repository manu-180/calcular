import { definirCasos } from "@/motor/calculo";
import algasKalkulators from "./algas-kalkulators";

const VID = "https://www.vid.gov.lv/lv/neapliekamais-minimums";
const LIKMES = "https://www.vid.gov.lv/lv/iedzivotaju-ienakuma-nodokla-likmes";

const pamata = { gramatina: true, apgadajamie: 0, atvieglojums: "nav", kategorija: "vispariga" } as const;

export default definirCasos(algasKalkulators, [
  {
    nombre: "VID piemērs: 1750 eiro bruto ar grāmatiņu",
    origen: { tipo: "oficial", url: VID, detalle: "VID piemērs: bruto 1750, neapliekamais minimums 550, bez apgādājamiem, neto 1307,11." },
    fecha: "2026-11-01",
    entrada: { alga: 1750, ...pamata },
    esperado: { neto: 1307.11, vsaoi: 183.75, iin: 259.14 },
  },
  {
    nombre: "900 eiro ar vienu apgādājamo",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/par-apgadiba-esosam-personam", detalle: "VSAOI 94,50. Apliekamais 900 - 94,50 - 550 - 250 = 5,50. IIN 1,40. Neto 804,10." },
    fecha: "2026-11-01",
    entrada: { alga: 900, ...pamata, apgadajamie: 1 },
    esperado: { neto: 804.1, iin: 1.4 },
  },
  {
    nombre: "Minimālā alga bez grāmatiņas",
    origen: { tipo: "recalculado", url: VID, detalle: "VSAOI 81,90. IIN (780 - 81,90) × 25,5% = 178,02. Neto 520,08." },
    fecha: "2026-11-01",
    entrada: { alga: 780, ...pamata, gramatina: false },
    esperado: { neto: 520.08, minimums: 0 },
  },
  {
    nombre: "III grupas invaliditāte",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/papildu-nodokla-atvieglojums", detalle: "VSAOI 157,50. Apliekamais 1500 - 157,50 - 550 - 120 = 672,50. IIN 171,49. Neto 1171,01." },
    fecha: "2026-11-01",
    entrada: { alga: 1500, ...pamata, atvieglojums: "invaliditate-3" },
    esperado: { neto: 1171.01, atvieglojumi: 120 },
  },
  {
    nombre: "Pensijas vecumā sasniegts: 9,25% VSAOI",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/valsts-socialas-apdrosinasanas-obligato-iemaksu-likmes", detalle: "VSAOI 2000 × 9,25% = 185. IIN (2000 - 185 - 550) × 25,5% = 322,58. Neto 1492,42." },
    fecha: "2026-11-01",
    entrada: { alga: 2000, ...pamata, kategorija: "pensijas-vecums" },
    esperado: { vsaoi: 185, iin: 322.58, neto: 1492.42 },
  },
  {
    nombre: "Liela alga: 33% gada daļai virs 105 300 eiro",
    origen: { tipo: "recalculado", url: LIKMES, detalle: "Bruto 12 000: VSAOI 1260. Apliekamais 10 190, gadā 122 280. Gada IIN 105 300 × 25,5% + 16 980 × 33% = 26 851,50 + 5603,40 = 32 454,90, mēnesī 2704,58. Ieturēts 2598,45, piemaksa 106,13." },
    fecha: "2026-11-01",
    entrada: { alga: 12000, ...pamata },
    esperado: { iin: 2598.45, iinGadaPiemaksa: 106.13, neto: 8035.42 },
  },
  {
    nombre: "Nulle nav derīga alga",
    origen: { tipo: "recalculado", url: VID, detalle: "Bruto algai jābūt lielākai par nulli." },
    fecha: "2026-11-01",
    entrada: { alga: 0, ...pamata },
    esperaError: true,
  },
]);
