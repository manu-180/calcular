import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosHr: TextosUi<UiRendimientoInversion> = {
  slug: "roi-kalkulator",
  ui: () => ({
    inicial: "Uloženi iznos",
    final: "Konačna vrijednost",
    finalAyuda: "Koliko ulaganje vrijedi danas ili koliko je dobiveno prodajom.",
    cobrado: "Prinosi isplaćeni u međuvremenu (neobavezno)",
    cobradoAyuda: "Dividende, kamate ili najamnina koje su naplaćene i nisu ponovno uložene.",
    anios: "Razdoblje ulaganja u godinama",
    aniosAyuda: "Možete unijeti i decimalni broj, na primjer 1,5 za godinu i pol.",
    ganancia: "Dobit",
    roi: "Ukupni povrat (ROI)",
    cagr: "Godišnji prinos (CAGR)",
    cagrAyuda: "Godišnja stopa koja uz složenu kamatu, iz godine u godinu, daje isti rezultat.",
    errorInicial: "Unesite koliko je uloženo na početku.",
    observacionCorto: "Za razdoblje kraće od godinu dana godišnji prinos rasteže kratak rezultat kao da se ponavlja cijelu godinu. Uzmite ga s rezervom.",
    observacionInflacion: "Je li kupovna moć porasla, saznat ćete kada godišnji prinos usporedite s inflacijom za isto razdoblje.",
  }),
};
