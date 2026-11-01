import { definirCasos } from "@/motor/calculo";
import n13Plat from "./13-plat";

const FS = "https://podpora.financnasprava.sk/418585-V%C3%BDpo%C4%8Det-preddavkov-na-da%C5%88---sadzba-dane?r=1";

export default definirCasos(n13Plat, [
  { nombre: "1 800 eur mzda a 1 800 eur 13. plat", origen: { tipo: "recalculado", url: FS, detalle: "3 600 − 338,40 − 180; základ 2 584,37; daň 491,03; čistá 2 590,57; rozdiel oproti 1 342,52 = 1 248,05." }, fecha: "2026-06-15", entrada: { mzda: 1800, plat: 1800, detiDo15: 0 }, esperado: { cistyPlat: 1248.05, cistaVTomMesiaci: 2590.57 } },
  { nombre: "Nulový plat je chyba", origen: { tipo: "recalculado", url: FS, detalle: "Suma musí byť kladná." }, fecha: "2026-06-15", entrada: { mzda: 1800, plat: 0, detiDo15: 0 }, esperaError: true },
]);
