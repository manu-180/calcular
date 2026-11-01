import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosSk: TextosUi<UiInteresSimple> = {
  slug: "jednoduche-urocenie",
  ui: () => ({
    capital: "Istina",
    tasa: "Ročná úroková sadzba (%)",
    tiempo: "Doba",
    unidad: "Doba je v",
    dias: "Dňoch",
    meses: "Mesiacoch",
    anios: "Rokoch",
    base: "Počet dní v roku (pre dobu v dňoch)",
    baseAyuda: "Niektoré banky počítajú rok ako 360 dní. Ak to neviete presne, nechajte 365.",
    base365: "365 dní",
    base360: "360 dní (bankový rok)",
    interes: "Úrok",
    montoFinal: "Istina vrátane úroku",
    tasaPeriodo: "Sadzba za obdobie",
    errorCapital: "Zadajte istinu väčšiu ako nula.",
  }),
};
