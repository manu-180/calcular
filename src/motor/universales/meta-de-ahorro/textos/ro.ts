import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosRo: TextosUi<UiMetaDeAhorro> = {
  slug: "calculator-economii",
  ui: () => ({
    meta: "Ce sumă doriți să economisiți?",
    actual: "Ce ați economisit deja (opțional)",
    meses: "În câte luni",
    rendimiento: "Randament anual al economiilor (%, opțional)",
    rendimientoAyuda: "Dacă banii stau într-un cont sau într-o investiție cu dobândă. Lăsați gol dacă nu aduc nimic.",
    aporteMensual: "Trebuie să puneți deoparte pe lună",
    aporteSemanal: "Adică pe săptămână",
    totalAportado: "Total depus de dumneavoastră",
    intereses: "Dobândă câștigată",
    errorMeta: "Introduceți suma pe care doriți să o economisiți.",
    yaLlegas: "Ce aveți deja ajunge la obiectiv în acest interval, fără să mai adăugați nimic.",
  }),
};
