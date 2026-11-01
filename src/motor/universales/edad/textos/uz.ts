import type { TextosUi } from "../../tipos";
import { duracionUz } from "../../dias-entre-fechas/textos/uz";
import type { UiEdad } from "../definicion";

export const textosUz: TextosUi<UiEdad> = {
  slug: "yosh-kalkulyatori",
  ui: () => ({
    nacimiento: "Tugʻilgan sana",
    referencia: "Yosh qaysi sanaga hisoblansin",
    referenciaAyuda: "Odatda bugungi sana. Boshqa sanadagi yoshni bilish uchun uni oʻzgartiring.",
    edad: "Yosh",
    anios: "Toʻliq yosh",
    totalMeses: "Oylarda",
    totalSemanas: "Haftalarda",
    totalDias: "Kunlarda",
    proximo: "Keyingi tugʻilgan kun",
    faltan: "Qolgan kunlar",
    cumplira: "Toʻladigan yosh",
    duracion: duracionUz,
    errorFutura: "Tugʻilgan sana yosh hisoblanadigan sanadan keyin boʻla olmaydi.",
    cumpleHoy: (anios) => `Bugun tugʻilgan kun. Yangi yosh: ${anios}.`,
    nota29: "29-fevralda tugʻilganlar uchun kabisa boʻlmagan yillarda tugʻilgan kun 28-fevral deb hisoblanadi.",
  }),
};
