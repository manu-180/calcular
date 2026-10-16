import { definirCasos } from "@/motor/calculo";
import mwstRechner from "./mwst-rechner";

const MWSTG = "https://www.fedlex.admin.ch/eli/cc/2009/615/de#art_25";

export default definirCasos(mwstRechner, [
  {
    nombre: "100 Franken plus Normalsatz",
    origen: { tipo: "recalculado", url: MWSTG, detalle: "100 × 8,1 % = 8,10; inklusive MWST 108,10 (Art. 25 Abs. 1 MWSTG)." },
    fecha: "2026-10-14",
    entrada: { betrag: 100, richtung: "zuschlagen", satz: "normal" },
    esperado: { satz: 8.1, netto: 100, mwst: 8.1, brutto: 108.1 },
  },
  {
    nombre: "108,10 Franken inklusive MWST herausrechnen",
    origen: { tipo: "recalculado", url: MWSTG, detalle: "108,10 / 1,081 = 100; MWST 8,10." },
    fecha: "2026-10-14",
    entrada: { betrag: 108.1, richtung: "herausrechnen", satz: "normal" },
    esperado: { netto: 100, mwst: 8.1 },
  },
  {
    nombre: "Lebensmittel mit reduziertem Satz",
    origen: { tipo: "recalculado", url: MWSTG, detalle: "50 × 2,6 % = 1,30; inklusive MWST 51,30 (Art. 25 Abs. 2 MWSTG)." },
    fecha: "2026-10-14",
    entrada: { betrag: 50, richtung: "zuschlagen", satz: "reduziert" },
    esperado: { satz: 2.6, mwst: 1.3, brutto: 51.3 },
  },
  {
    nombre: "Hotelrechnung mit Sondersatz",
    origen: { tipo: "recalculado", url: MWSTG, detalle: "249 / 1,038 = 239,884 → 239,88; MWST 9,12 (Art. 25 Abs. 4 MWSTG)." },
    fecha: "2026-10-14",
    entrada: { betrag: 249, richtung: "herausrechnen", satz: "beherbergung" },
    esperado: { satz: 3.8, netto: 239.88, mwst: 9.12, brutto: 249 },
  },
]);
