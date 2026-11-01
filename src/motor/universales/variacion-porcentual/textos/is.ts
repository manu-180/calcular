import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosIs: TextosUi<UiVariacion> = {
  slug: "prosentubreyting",
  ui: () => ({
    inicial: "Gamla gildið",
    final: "Nýja gildið",
    variacion: "Prósentubreyting",
    diferencia: "Mismunur",
    vuelta: "Til að komast til baka",
    vueltaAyuda: "Hve mikið nýja gildið þarf að breytast til að ná aftur því gamla.",
    errorInicialCero: "Gamla gildið getur ekki verið 0. Það er ekki hægt að reikna prósentubreytingu frá núlli.",
    subio: (p) => `Það hefur hækkað um ${p}%.`,
    bajo: (p) => `Það hefur lækkað um ${p}%.`,
    igual: "Engin breyting. Gildin eru jöfn.",
  }),
};
