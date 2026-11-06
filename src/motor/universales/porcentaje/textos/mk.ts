import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosMk: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-za-procenti",
  ui: () => ({
    modo: "Што сакате да пресметате?",
    modoParte: "Колку е X % од Y?",
    modoProporcion: "Колкав процент е X од Y?",
    modoAumento: "Y плус X %",
    modoRebaja: "Y минус X %",
    x: "Број X",
    xAyuda: "Процентот. Ако изберете „Колкав процент е X од Y?“, ова е делот.",
    y: "Број Y",
    resultado: "Резултат",
    porcentaje: "Процент",
    diferencia: "Додаден или одземен износ",
    errorYCero: "Y не може да биде 0: од нулата нема процент.",
    fraseParte: (x, y, r) => `${x} % од ${y} е ${r}.`,
    fraseProporcion: (x, y, p) => `${x} е ${p} % од ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} плус ${x} % е ${r}: се додаваат ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} минус ${x} % е ${r}: се одземаат ${d}.`,
  }),
};
