import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosCs: TextosUi<UiInteresSimple> = {
  slug: "jednoduche-uroceni",
  ui: () => ({
    capital: "Jistina",
    tasa: "Roční úroková sazba (%)",
    tiempo: "Doba",
    unidad: "Doba je v",
    dias: "Dnech",
    meses: "Měsících",
    anios: "Letech",
    base: "Počet dní v roce (pro dobu ve dnech)",
    baseAyuda: "Některé banky počítají rok jako 360 dní. Pokud si nejste jisti, nechte 365.",
    base365: "365 dní",
    base360: "360 dní (bankovní rok)",
    interes: "Úrok",
    montoFinal: "Jistina včetně úroku",
    tasaPeriodo: "Sazba za období",
    errorCapital: "Zadejte jistinu větší než nula.",
  }),
};
