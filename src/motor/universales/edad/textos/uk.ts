import { pluralUk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionUk } from "../../dias-entre-fechas/textos/uk";
import type { UiEdad } from "../definicion";

export const textosUk: TextosUi<UiEdad> = {
  slug: "kalkuliator-viku",
  ui: () => ({
    nacimiento: "Дата народження",
    referencia: "Вік станом на",
    referenciaAyuda: "За замовчуванням сьогодні. Змініть дату, щоб дізнатися вік на інший день.",
    edad: "Вік",
    anios: "Повних років",
    totalMeses: "У місяцях",
    totalSemanas: "У тижнях",
    totalDias: "У днях",
    proximo: "Наступний день народження",
    faltan: "Залишилося днів",
    cumplira: "Виповниться років",
    duracion: duracionUk,
    errorFutura: "Дата народження не може бути пізнішою за дату, на яку ви рахуєте вік.",
    cumpleHoy: (anios) => `Сьогодні день народження: виповнюється ${pluralUk(anios, "рік", "роки", "років")}.`,
    nota29: "Для тих, хто народився 29 лютого, у невисокосні роки день народження рахується 28 лютого.",
  }),
};
