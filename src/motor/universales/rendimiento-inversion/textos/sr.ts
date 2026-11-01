import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosSr: TextosUi<UiRendimientoInversion> = {
  slug: "povrat-investicije",
  ui: () => ({
    inicial: "Uloženi iznos",
    final: "Konačna vrednost",
    finalAyuda: "Koliko investicija vredi danas, ili koliko je dobijeno prodajom.",
    cobrado: "Prinosi isplaćeni u međuvremenu (nije obavezno)",
    cobradoAyuda: "Dividende, kamate ili kirija koje su naplaćene i nisu ponovo uložene.",
    anios: "Period ulaganja u godinama",
    aniosAyuda: "Možete uneti i decimalni broj, na primer 1,5 za godinu i po.",
    ganancia: "Zarada",
    roi: "Ukupni povrat (ROI)",
    cagr: "Godišnji prinos (CAGR)",
    cagrAyuda: "Godišnja stopa koja uz složenu kamatu, iz godine u godinu, daje isti rezultat.",
    errorInicial: "Unesite koliko je uloženo na početku.",
    observacionCorto: "Za period kraći od godinu dana godišnji prinos razvlači kratak rezultat kao da se ponavlja cele godine. Uzmite ga sa rezervom.",
    observacionInflacion: "Da li je kupovna moć porasla, saznaćete kada godišnji prinos uporedite sa inflacijom za isti period.",
  }),
};
