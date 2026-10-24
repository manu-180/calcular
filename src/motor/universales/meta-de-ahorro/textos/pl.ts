import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosPl: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkulator-oszczednosci",
  ui: () => ({
    meta: "Ile chcesz odłożyć?",
    actual: "Ile już masz odłożone (opcjonalnie)",
    meses: "W ile miesięcy",
    rendimiento: "Roczne oprocentowanie oszczędności (%, opcjonalnie)",
    rendimientoAyuda: "Jeśli pieniądze leżą na koncie oszczędnościowym, lokacie albo w inwestycji. Zostaw puste, jeśli nic nie zarabiają.",
    aporteMensual: "Musisz odkładać miesięcznie",
    aporteSemanal: "Czyli tygodniowo",
    totalAportado: "Suma twoich wpłat",
    intereses: "Zarobione odsetki",
    errorMeta: "Wpisz, ile chcesz odłożyć.",
    yaLlegas: "To, co już masz, w tym czasie wystarczy do osiągnięcia celu bez kolejnych wpłat.",
  }),
};
