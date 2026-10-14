import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosNl: TextosUi<UiPromedio> = {
  slug: "gewogen-gemiddelde",
  ui: () => ({
    nota: (n) => `Cijfer ${n}`,
    notaAyuda: "Vul elk cijfer of getal in met zijn weging. Laat lege regels gewoon leeg.",
    peso: (n) => `Weging ${n}`,
    pesoAyuda: "Dat kan een percentage zijn, studiepunten of hoe vaak het cijfer telt. Zonder weging tellen alle cijfers even zwaar.",
    ponderado: "Gewogen gemiddelde",
    simple: "Gewoon gemiddelde",
    cantidad: "Aantal cijfers",
    sumaPesos: "Totaal van de wegingen",
    errorSinNotas: "Vul minstens één cijfer in.",
    errorFaltaPeso: "Dit cijfer heeft geen weging. Gebruik je wegingen, vul ze dan bij elk cijfer in.",
    errorFaltaNota: "Bij deze weging staat geen cijfer. Vul het cijfer in of maak de weging leeg.",
    errorPesosCero: "De wegingen zijn samen 0. Minstens één moet hoger dan nul zijn.",
    sinPesos: "Zonder wegingen is het gewogen gemiddelde gelijk aan het gewone gemiddelde.",
  }),
};
