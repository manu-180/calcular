import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosBs: TextosUi<UiRendimientoInversion> = {
  slug: "roi-kalkulator",
  ui: () => ({
    inicial: "Uloženi iznos",
    final: "Konačna vrijednost",
    finalAyuda: "Koliko ulaganje vrijedi danas ili koliko je dobijeno prodajom.",
    cobrado: "Prinosi isplaćeni u međuvremenu (neobavezno)",
    cobradoAyuda: "Dividende, kamate ili kirija koje su naplaćene i nisu ponovno uložene.",
    anios: "Period ulaganja u godinama",
    aniosAyuda: "Možete unijeti i decimalni broj, na primjer 1,5 za godinu i pol.",
    ganancia: "Dobit",
    roi: "Ukupni povrat (ROI)",
    cagr: "Godišnji prinos (CAGR)",
    cagrAyuda: "Godišnja stopa koja uz složenu kamatu, iz godine u godinu, daje isti rezultat.",
    errorInicial: "Unesite koliko je uloženo na početku.",
    observacionCorto: "Za period kraći od godinu dana godišnji prinos rasteže kratak rezultat kao da se ponavlja cijelu godinu. Uzmite ga s rezervom.",
    observacionInflacion: "Da li je kupovna moć porasla, saznat ćete kada godišnji prinos uporedite s inflacijom za isti period.",
  }),
};
