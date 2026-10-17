import { definirCasos } from "@/motor/calculo";
import kestRechner from "./kest-rechner";

const KEST = "https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/information-zu-einkuenften-aus-kapitalvermoegen.html";

export default definirCasos(kestRechner, [
  {
    nombre: "1.000 Euro Dividende",
    origen: { tipo: "recalculado", url: KEST, detalle: "Sonstige Kapitaleinkünfte 27,5 %: 275 Euro; netto 725." },
    fecha: "2026-10-14",
    entrada: { ertrag: 1000, art: "sonstige" },
    esperado: { kest: 275, netto: 725, satz: 27.5 },
  },
  {
    nombre: "Sparbuchzinsen 250 Euro",
    origen: { tipo: "recalculado", url: KEST, detalle: "Zinsen aus Sparbüchern und Girokonten 25 %: 62,50 Euro." },
    fecha: "2026-10-14",
    entrada: { ertrag: 250, art: "sparbuch" },
    esperado: { kest: 62.5, netto: 187.5 },
  },
]);
