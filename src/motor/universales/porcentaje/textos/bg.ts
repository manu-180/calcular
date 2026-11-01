import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosBg: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-za-protsenti",
  ui: () => ({
    modo: "Какво искате да изчислите?",
    modoParte: "Колко е X% от Y?",
    modoProporcion: "Какъв процент е X от Y?",
    modoAumento: "Y плюс X%",
    modoRebaja: "Y минус X%",
    x: "Число X",
    xAyuda: "Процентът. Ако изберете „Какъв процент е X от Y?“, това е частта.",
    y: "Число Y",
    resultado: "Резултат",
    porcentaje: "Процент",
    diferencia: "Добавена или извадена сума",
    errorYCero: "Y не може да е 0: от нулата няма процент.",
    fraseParte: (x, y, r) => `${x}% от ${y} е ${r}.`,
    fraseProporcion: (x, y, p) => `${x} е ${p}% от ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} плюс ${x}% е ${r}: добавят се ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} минус ${x}% е ${r}: изваждат се ${d}.`,
  }),
};
