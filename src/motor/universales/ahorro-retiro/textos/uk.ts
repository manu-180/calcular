import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosUk: TextosUi<UiAhorroRetiro> = {
  slug: "zaoshchadzhennia-na-pensiiu",
  ui: () => ({
    edadActual: "Ваш вік зараз",
    edadRetiro: "У якому віці хочете вийти на пенсію",
    actual: "Скільки вже накопичено",
    aporte: "Щомісячний внесок",
    rendimiento: "Реальна річна дохідність (%)",
    rendimientoAyuda: "Скільки приносять інвестиції понад інфляцію. Від 2% до 5% є обережним припущенням на довгий строк.",
    aniosRenta: "Скільки років пенсії покрити",
    aniosRentaAyuda: "Скільки років ви хочете отримувати гроші з цих заощаджень.",
    capital: "Заощадження на момент виходу на пенсію",
    renta: "Щомісячний дохід із цих заощаджень",
    aportado: "Загалом внесено",
    intereses: "Загальне зростання",
    tabla: "Зростання за віком",
    colEdad: "Вік",
    colAportado: "Внесено на цей час",
    colSaldo: "Заощадження",
    errorEdades: "Вік виходу на пенсію має бути більшим за ваш поточний вік.",
    errorSinAhorro: "Введіть наявні заощадження або щомісячний внесок.",
    observacionDineroDeHoy: "Суми подано в сьогоднішніх цінах, бо дохідність уже без інфляції.",
    observacionPublica: "Тут лише ваші власні заощадження. Державну пенсію чи інші соціальні виплати, які ви можете отримувати, не враховано.",
  }),
};
