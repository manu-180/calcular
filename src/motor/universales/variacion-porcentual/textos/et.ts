import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosEt: TextosUi<UiVariacion> = {
  slug: "protsendimuutus",
  ui: () => ({
    inicial: "Algne väärtus",
    final: "Uus väärtus",
    variacion: "Muutus protsentides",
    diferencia: "Vahe",
    vuelta: "Tagasi algsele väärtusele",
    vueltaAyuda: "Mitu protsenti peab uus väärtus muutuma, et jõuda tagasi algse väärtuseni.",
    errorInicialCero: "Algne väärtus ei saa olla 0. Nullist ei saa protsendimuutust arvutada.",
    subio: (p) => `Väärtus on tõusnud ${p}%.`,
    bajo: (p) => `Väärtus on langenud ${p}%.`,
    igual: "Muutust ei ole. Väärtused on võrdsed.",
  }),
};
