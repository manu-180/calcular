import type { TextosUi } from "../../tipos";
import { duracionEt } from "../../dias-entre-fechas/textos/et";
import type { UiEdad } from "../definicion";

export const textosEt: TextosUi<UiEdad> = {
  slug: "vanuse-kalkulaator",
  ui: () => ({
    nacimiento: "Sünnikuupäev",
    referencia: "Vanus kuupäeval",
    referenciaAyuda: "Vaikimisi tänane päev. Muuda kuupäeva, et näha vanust mõnel teisel päeval.",
    edad: "Vanus",
    anios: "Aastaid",
    totalMeses: "Kuudes",
    totalSemanas: "Nädalates",
    totalDias: "Päevades",
    proximo: "Järgmine sünnipäev",
    faltan: "Päevi jäänud",
    cumplira: "Uus vanus",
    duracion: duracionEt,
    errorFutura: "Sünnikuupäev ei saa olla hilisem kui päev, mille kohta vanus arvutatakse.",
    cumpleHoy: (anios) => `Täna on sünnipäev. Uus vanus: ${anios} ${anios === "1" ? "aasta" : "aastat"}.`,
    nota29: "Liigaasta 29. veebruaril sündinud inimese sünnipäevaks loetakse tavalistel aastatel 28. veebruar.",
  }),
};
