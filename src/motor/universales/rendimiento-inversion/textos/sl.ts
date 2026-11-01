import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosSl: TextosUi<UiRendimientoInversion> = {
  slug: "donosnost-nalozbe",
  ui: () => ({
    inicial: "Vloženi znesek",
    final: "Končna vrednost",
    finalAyuda: "Koliko je naložba vredna danes ali koliko ste dobili s prodajo.",
    cobrado: "Donosi, izplačani v tem času (ni obvezno)",
    cobradoAyuda: "Dividende, obresti ali najemnina, ki ste jih prejeli in niste znova vložili.",
    anios: "Obdobje naložbe v letih",
    aniosAyuda: "Vnesete lahko tudi decimalno število, na primer 1,5 za leto in pol.",
    ganancia: "Dobiček",
    roi: "Skupna donosnost (ROI)",
    cagr: "Letni donos (CAGR)",
    cagrAyuda: "Letna stopnja, ki z obrestnimi obrestmi iz leta v leto da enak rezultat.",
    errorInicial: "Vnesite, koliko ste vložili na začetku.",
    observacionCorto: "Pri obdobju, krajšem od enega leta, letni donos kratek rezultat raztegne, kot da bi se ponavljal vse leto. Upoštevajte ga previdno.",
    observacionInflacion: "Ali se je kupna moč povečala, boste izvedeli, ko letni donos primerjate z inflacijo v istem obdobju.",
  }),
};
