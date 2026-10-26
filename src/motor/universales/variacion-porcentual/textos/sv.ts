import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosSv: TextosUi<UiVariacion> = {
  slug: "procentuell-forandring",
  ui: () => ({
    inicial: "Gammalt värde",
    final: "Nytt värde",
    variacion: "Procentuell förändring",
    diferencia: "Skillnad",
    vuelta: "För att komma tillbaka",
    vueltaAyuda: "Hur mycket det nya värdet måste ändras för att komma tillbaka till det gamla.",
    errorInicialCero: "Det gamla värdet kan inte vara 0. Det går inte att räkna en procentuell förändring från noll.",
    subio: (p) => `Det har ökat med ${p} %.`,
    bajo: (p) => `Det har minskat med ${p} %.`,
    igual: "Ingen förändring. Båda värdena är lika.",
  }),
};
