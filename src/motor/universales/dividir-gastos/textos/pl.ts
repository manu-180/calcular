import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosPl: TextosUi<UiDividirGastos> = {
  slug: "kalkulator-podzialu-kosztow",
  ui: () => ({
    persona: (n) => `Osoba ${n}`,
    personaAyuda: "Wpisz, ile zapłaciła każda osoba. Jeśli ktoś nic nie zapłacił, ale dzieli się kosztem, wpisz 0. Resztę pól zostaw pustą.",
    total: "Łączne wydatki",
    personas: "Liczba osób",
    cuota: "Przypada na osobę",
    transferencias: "Przelewy do rozliczenia",
    tabla: "Kto komu ile oddaje",
    colDe: "Płaci",
    colPara: "Dostaje",
    colMonto: "Kwota",
    errorPocas: "Do podziału kosztów potrzeba co najmniej dwóch osób.",
    aMano: "Jesteście rozliczeni: każdy zapłacił tyle samo.",
  }),
};
