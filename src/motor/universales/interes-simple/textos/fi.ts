import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosFi: TextosUi<UiInteresSimple> = {
  slug: "korkolaskuri",
  ui: () => ({
    capital: "Pääoma",
    tasa: "Vuosikorko (%)",
    tiempo: "Aika",
    unidad: "Aika ilmoitetaan",
    dias: "Päivinä",
    meses: "Kuukausina",
    anios: "Vuosina",
    base: "Päiviä vuodessa (kun aika on päivinä)",
    baseAyuda: "Osa pankeista laskee vuoden 360 päivän mittaiseksi. Jos et ole varma, jätä arvoksi 365.",
    base365: "365 päivää",
    base360: "360 päivää (pankkivuosi)",
    interes: "Korko",
    montoFinal: "Pääoma ja korko yhteensä",
    tasaPeriodo: "Korko ajanjaksolta",
    errorCapital: "Syötä nollaa suurempi summa.",
  }),
};
