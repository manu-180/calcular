import { definirCasos } from "@/motor/calculo";
import netoBruto from "./neto-bruto-kalkulators";

const VID = "https://www.vid.gov.lv/lv/neapliekamais-minimums";

export default definirCasos(netoBruto, [
  {
    nombre: "VID piemērs pretējā virzienā: 1307,11 neto",
    origen: { tipo: "oficial", url: VID, detalle: "VID: bruto 1750 ar minimumu 550 dod neto 1307,11." },
    fecha: "2026-11-01",
    entrada: { neto: 1307.11, gramatina: true, apgadajamie: 0, kategorija: "vispariga" },
    esperado: { bruto: 1750, vsaoi: 183.75, iin: 259.14 },
    tolerancia: 0.01,
  },
  {
    nombre: "Neto bez grāmatiņas",
    origen: { tipo: "recalculado", url: VID, detalle: "Neto = bruto × 0,895 × 0,745. 1000 / 0,666775 = 1499,76." },
    fecha: "2026-11-01",
    entrada: { neto: 1000, gramatina: false, apgadajamie: 0, kategorija: "vispariga" },
    esperado: { bruto: 1499.76 },
    tolerancia: 0.01,
  },
  {
    nombre: "Zem minimuma nodoklis nerodas",
    origen: { tipo: "recalculado", url: VID, detalle: "Neto 400: apliekamais 0, tāpēc bruto = 400 / 0,895 = 446,93." },
    fecha: "2026-11-01",
    entrada: { neto: 400, gramatina: true, apgadajamie: 0, kategorija: "vispariga" },
    esperado: { bruto: 446.93, iin: 0 },
    tolerancia: 0.01,
  },
]);
