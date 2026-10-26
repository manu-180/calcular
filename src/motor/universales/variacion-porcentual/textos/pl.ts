import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosPl: TextosUi<UiVariacion> = {
  slug: "kalkulator-zmiany-procentowej",
  ui: () => ({
    inicial: "Wartość początkowa",
    final: "Wartość końcowa",
    variacion: "Zmiana procentowa",
    diferencia: "Różnica",
    vuelta: "Żeby wrócić do punktu wyjścia",
    vueltaAyuda: "O ile musiałaby się zmienić wartość końcowa, żeby wrócić do wartości początkowej.",
    errorInicialCero: "Wartość początkowa nie może wynosić 0: od zera nie da się policzyć zmiany procentowej.",
    subio: (p) => `Wzrost o ${p}%.`,
    bajo: (p) => `Spadek o ${p}%.`,
    igual: "Bez zmian: obie wartości są takie same.",
  }),
};
