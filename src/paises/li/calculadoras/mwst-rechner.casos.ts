import { definirCasos } from "@/motor/calculo";
import mwstRechner from "./mwst-rechner";

export default definirCasos(mwstRechner, [
  {
    nombre: "100 Franken plus Normalsatz",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2009330000", detalle: "8,1 % von 100." },
    fecha: "2026-10-22",
    entrada: { betrag: 100, richtung: "zuschlagen", satz: "normal" },
    esperado: { mwst: 8.1, brutto: 108.1, satz: 8.1 },
  },
  {
    nombre: "108,10 Franken inklusive MWST",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2009330000", detalle: "108,10 / 1,081 = 100." },
    fecha: "2026-10-22",
    entrada: { betrag: 108.1, richtung: "herausrechnen", satz: "normal" },
    esperado: { netto: 100, mwst: 8.1 },
  },
  {
    nombre: "Beherbergung 200 Franken",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2009330000", detalle: "3,8 % von 200 = 7,60." },
    fecha: "2026-10-22",
    entrada: { betrag: 200, richtung: "zuschlagen", satz: "beherbergung" },
    esperado: { mwst: 7.6, satz: 3.8 },
  },
  {
    nombre: "Reduzierter Satz",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2009330000", detalle: "2,6 % von 50 = 1,30." },
    fecha: "2026-10-22",
    entrada: { betrag: 50, richtung: "zuschlagen", satz: "reduziert" },
    esperado: { mwst: 1.3, brutto: 51.3 },
  },
]);
