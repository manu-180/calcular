import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosEt: TextosUi<UiInteresSimple> = {
  slug: "intressikalkulaator",
  ui: () => ({
    capital: "Põhisumma",
    tasa: "Aastaintress (%)",
    tiempo: "Aeg",
    unidad: "Aeg on antud",
    dias: "Päevades",
    meses: "Kuudes",
    anios: "Aastates",
    base: "Päevi aastas (kui aeg on päevades)",
    baseAyuda: "Mõned pangad arvestavad aastat 360-päevasena. Kui sa pole kindel, jäta väärtuseks 365.",
    base365: "365 päeva",
    base360: "360 päeva (pangandusaasta)",
    interes: "Intress",
    montoFinal: "Põhisumma ja intress kokku",
    tasaPeriodo: "Intress perioodi eest",
    errorCapital: "Sisesta summa, mis on suurem kui null.",
  }),
};
