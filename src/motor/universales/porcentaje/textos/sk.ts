import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosSk: TextosUi<UiPorcentaje> = {
  slug: "vypocet-percent",
  ui: () => ({
    modo: "Čo chcete vypočítať?",
    modoParte: "Koľko je X % z Y?",
    modoProporcion: "Koľko percent z Y je X?",
    modoAumento: "Y plus X %",
    modoRebaja: "Y mínus X %",
    x: "Číslo X",
    xAyuda: "Percento. Ak zvolíte „Koľko percent z Y je X?“, je to časť celku.",
    y: "Číslo Y",
    resultado: "Výsledok",
    porcentaje: "Percento",
    diferencia: "Pripočítaná alebo odpočítaná suma",
    errorYCero: "Y nemôže byť 0: z nuly sa percento vypočítať nedá.",
    fraseParte: (x, y, r) => `${x} % z ${y} je ${r}.`,
    fraseProporcion: (x, y, p) => `${x} je ${p} % z ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x} % je ${r}: pripočíta sa ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} mínus ${x} % je ${r}: odpočíta sa ${d}.`,
  }),
};
