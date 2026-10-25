import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosRu: TextosUi<UiPorcentaje> = {
  slug: "kalkulyator-protsentov",
  ui: () => ({
    modo: "Что нужно посчитать?",
    modoParte: "Сколько составляет X% от Y?",
    modoProporcion: "Сколько процентов X составляет от Y?",
    modoAumento: "Прибавить X% к Y",
    modoRebaja: "Вычесть X% из Y",
    x: "Число X",
    xAyuda: "Процент. Если выбран вариант «Сколько процентов X составляет от Y?», здесь указывается часть.",
    y: "Число Y",
    resultado: "Результат",
    porcentaje: "Процент",
    diferencia: "Сколько прибавлено или вычтено",
    errorYCero: "Y не может быть равен 0: от нуля процент не считается.",
    fraseParte: (x, y, r) => `${x}% от ${y} составляет ${r}.`,
    fraseProporcion: (x, y, p) => `${x} составляет ${p}% от ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} плюс ${x}% равно ${r}: прибавляется ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} минус ${x}% равно ${r}: вычитается ${d}.`,
  }),
};
