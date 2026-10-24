import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosPl: TextosUi<UiRendimientoInversion> = {
  slug: "kalkulator-roi",
  ui: () => ({
    inicial: "Zainwestowana kwota",
    final: "Wartość końcowa",
    finalAyuda: "Ile inwestycja jest warta dziś albo ile przyniosła jej sprzedaż.",
    cobrado: "Wypłacone dochody po drodze (opcjonalnie)",
    cobradoAyuda: "Dywidendy, odsetki albo czynsz wypłacone na konto, a nie zainwestowane ponownie.",
    anios: "Czas inwestycji w latach",
    aniosAyuda: "Możesz wpisać ułamek roku, na przykład półtora roku.",
    ganancia: "Zysk",
    roi: "Całkowita stopa zwrotu (ROI)",
    cagr: "Roczna stopa zwrotu (CAGR)",
    cagrAyuda: "Roczny zysk, który składany rok po roku daje ten sam wynik.",
    errorInicial: "Wpisz, ile zainwestowano na początku.",
    observacionCorto: "Przy okresie krótszym niż rok roczna stopa zwrotu rozciąga krótki wynik tak, jakby powtarzał się przez cały rok. Traktuj ją ostrożnie.",
    observacionInflacion: "Żeby sprawdzić, czy zyskujesz siłę nabywczą, porównaj roczną stopę zwrotu z inflacją z tego samego okresu.",
  }),
};
