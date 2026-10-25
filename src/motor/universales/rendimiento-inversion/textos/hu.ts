import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosHu: TextosUi<UiRendimientoInversion> = {
  slug: "hozam-kalkulator",
  ui: () => ({
    inicial: "Befektetett összeg",
    final: "Végső érték",
    finalAyuda: "Mennyit ér ma a befektetés, vagy mennyit kaptál érte eladáskor.",
    cobrado: "Közben kifizetett hozam (nem kötelező)",
    cobradoAyuda: "Osztalék, kamat vagy bérleti díj, amelyet megkaptál, és nem fektettél be újra.",
    anios: "Tartási idő években",
    aniosAyuda: "Tizedes számot is megadhatsz, például 1,5 másfél évre.",
    ganancia: "Nyereség",
    roi: "Teljes megtérülés (ROI)",
    cagr: "Éves hozam (CAGR)",
    cagrAyuda: "Az az éves hozam, amely kamatos kamattal évről évre ugyanezt az eredményt adja.",
    errorInicial: "Add meg, mennyit fektettél be az elején.",
    observacionCorto: "Egy évnél rövidebb időnél az éves hozam úgy nagyítja fel a rövid eredményt, mintha egész évben ismétlődne. Óvatosan kezeld.",
    observacionInflacion: "Hogy nőtt-e a vásárlóerőd, azt úgy tudod meg, ha az éves hozamot összeveted az ugyanerre az időszakra eső inflációval.",
  }),
};
