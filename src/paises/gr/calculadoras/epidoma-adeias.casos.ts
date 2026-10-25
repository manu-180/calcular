import { definirCasos } from "@/motor/calculo";
import epidomaAdeias from "./epidoma-adeias";

const HLI = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/adeies-ergasiakes-scheseis/etisia-kanoniki-adeia/apodoches-adeias-kai-epidoma-adeias/";

export default definirCasos(epidomaAdeias, [
  {
    nombre: "Μισθός 1.200 €, όλο το έτος: μισός μισθός",
    origen: { tipo: "oficial", url: HLI, detalle: "Ανώτατο όριο: μισός μισθός. 1200 / 2 = 600." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, mines: 12 },
    esperado: { epidoma: 600 },
  },
  {
    nombre: "Έξι μήνες απασχόλησης",
    origen: { tipo: "recalculado", url: HLI, detalle: "600 × 6 / 12 = 300." },
    fecha: "2026-10-24",
    entrada: { typos: "misthos", misthos: 1200, imeromisthio: null, mines: 6 },
    esperado: { epidoma: 300 },
  },
  {
    nombre: "Ημερομίσθιο 50 €: 13 ημερομίσθια",
    origen: { tipo: "oficial", url: HLI, detalle: "Ανώτατο όριο: 13 ημερομίσθια. 13 × 50 = 650." },
    fecha: "2026-10-24",
    entrada: { typos: "imeromisthio", misthos: null, imeromisthio: 50, mines: 12 },
    esperado: { epidoma: 650 },
  },
]);
