import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosUk: TextosUi<UiPorcentaje> = {
  slug: "kalkuliator-vidsotkiv",
  ui: () => ({
    modo: "Що потрібно розрахувати?",
    modoParte: "Скільки становить X% від Y?",
    modoProporcion: "Скільки відсотків X становить від Y?",
    modoAumento: "Y плюс X%",
    modoRebaja: "Y мінус X%",
    x: "Число X",
    xAyuda: "Відсоток. Якщо ви обрали «Скільки відсотків X становить від Y?», це частина.",
    y: "Число Y",
    resultado: "Результат",
    porcentaje: "Відсоток",
    diferencia: "Скільки додано або віднято",
    errorYCero: "Y не може дорівнювати 0: від нуля відсоток не обчислюється.",
    fraseParte: (x, y, r) => `${x}% від ${y} становить ${r}.`,
    fraseProporcion: (x, y, p) => `${x} становить ${p}% від ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} плюс ${x}% дорівнює ${r}: додано ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} мінус ${x}% дорівнює ${r}: віднято ${d}.`,
  }),
};
