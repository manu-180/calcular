import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosNl: TextosUi<UiMetaDeAhorro> = {
  slug: "spaardoel-berekenen",
  ui: () => ({
    meta: "Hoeveel wil je sparen?",
    actual: "Wat je al gespaard hebt (niet verplicht)",
    meses: "Aantal maanden om het te halen",
    rendimiento: "Rente of rendement per jaar (%, niet verplicht)",
    rendimientoAyuda: "Als het geld op een spaarrekening of in een belegging staat die iets oplevert. Laat het leeg als het niets oplevert.",
    aporteMensual: "Je moet per maand sparen",
    aporteSemanal: "Dat is per week",
    totalAportado: "Totaal zelf ingelegd",
    intereses: "Ontvangen rente",
    errorMeta: "Vul in hoeveel je wilt sparen.",
    yaLlegas: "Met wat je al hebt, haal je je doel in die tijd zonder iets bij te leggen.",
  }),
};
