import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosUk: TextosUi<UiVariacion> = {
  slug: "zmina-u-vidsotkakh",
  ui: () => ({
    inicial: "Початкове значення",
    final: "Кінцеве значення",
    variacion: "Зміна у відсотках",
    diferencia: "Різниця",
    vuelta: "Щоб повернутися до початкового",
    vueltaAyuda: "На скільки відсотків має змінитися кінцеве значення, щоб знову дорівнювати початковому.",
    errorInicialCero: "Початкове значення не може дорівнювати 0: зміну від нуля у відсотках не обчислити.",
    subio: (p) => `Значення зросло на ${p}%.`,
    bajo: (p) => `Значення зменшилося на ${p}%.`,
    igual: "Змін немає: обидва значення однакові.",
  }),
};
