import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosLv: TextosUi<UiInteresSimple> = {
  slug: "vienkarso-procentu-kalkulators",
  ui: () => ({
    capital: "Sākuma summa",
    tasa: "Procentu likme gadā (%)",
    tiempo: "Periods",
    unidad: "Perioda vienība",
    dias: "Dienas",
    meses: "Mēneši",
    anios: "Gadi",
    base: "Dienu skaits gadā (ja periods ir dienās)",
    baseAyuda: "Dažas bankas gadu rēķina kā 360 dienas. Ja šaubāties, atstājiet 365.",
    base365: "365 dienas",
    base360: "360 dienas (bankas gads)",
    interes: "Procenti",
    montoFinal: "Summa ar procentiem",
    tasaPeriodo: "Perioda likme",
    errorCapital: "Ievadiet sākuma summu, kas lielāka par nulli.",
  }),
};
