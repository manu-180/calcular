import { definirCasos } from "@/motor/calculo";
import kapitalbezugSteuerRechner from "./kapitalbezug-steuer-rechner";

const DBG = "https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_38";

export default definirCasos(kapitalbezugSteuerRechner, [
  {
    nombre: "Alleinstehend, 200 000 Franken",
    origen: { tipo: "recalculado", url: DBG, detalle: "Tarif Abs. 1: für 185 100 Franken 10 936,55, je weitere 100 Franken 13,20. 149 × 13,20 = 1966,80; 12 903,35. Ein Fünftel (Art. 38 Abs. 2 DBG): 2580,67." },
    fecha: "2026-10-14",
    entrada: { kapital: 200000, zivilstand: "alleinstehend", mitKindern: false },
    esperado: { vollerTarif: 12903.35, steuer: 2580.67, netto: 197419.33 },
  },
  {
    nombre: "Verheiratet, 500 000 Franken",
    origen: { tipo: "recalculado", url: DBG, detalle: "Tarif Abs. 2: für 152 400 Franken 5692, je weitere 100 Franken 13. 3476 × 13 = 45 188; 50 880. Ein Fünftel: 10 176." },
    fecha: "2026-10-14",
    entrada: { kapital: 500000, zivilstand: "verheiratet", mitKindern: false },
    esperado: { vollerTarif: 50880, steuer: 10176 },
  },
  {
    nombre: "Alleinstehend mit Kind: Tarif für Verheiratete ohne Kinderabzug",
    origen: { tipo: "recalculado", url: DBG, detalle: "Abs. 2bis erster Satz: Tarif Abs. 2. 50 000: für 29 700 Franken 0, je weitere 100 Franken 1. 203 × 1 = 203. Ein Fünftel: 40,60." },
    fecha: "2026-10-14",
    entrada: { kapital: 50000, zivilstand: "alleinstehend", mitKindern: true },
    esperado: { vollerTarif: 203, steuer: 40.6 },
  },
]);
