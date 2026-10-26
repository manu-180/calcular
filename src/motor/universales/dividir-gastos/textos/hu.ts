import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosHu: TextosUi<UiDividirGastos> = {
  slug: "koltsegek-megosztasa",
  ui: () => ({
    persona: (n) => `${n}. személy`,
    personaAyuda: "Írd be, ki mennyit fizetett. Ha valaki nem fizetett semmit, de a költségből neki is része van, írj nullát. A többi mezőt hagyd üresen.",
    total: "Teljes költség",
    personas: "Létszám",
    cuota: "Fejenkénti rész",
    transferencias: "Elszámoláshoz szükséges utalások",
    tabla: "Ki kinek fizet",
    colDe: "Fizet",
    colPara: "Kapja",
    colMonto: "Összeg",
    errorPocas: "A költség megosztásához legalább két személyt adj meg.",
    aMano: "Kvittek vagytok: mindenki ugyanannyit fizetett.",
  }),
};
