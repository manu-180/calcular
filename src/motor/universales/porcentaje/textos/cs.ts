import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosCs: TextosUi<UiPorcentaje> = {
  slug: "vypocet-procent",
  ui: () => ({
    modo: "Co chcete spočítat?",
    modoParte: "Kolik je X % z Y?",
    modoProporcion: "Kolik procent z Y je X?",
    modoAumento: "Y plus X %",
    modoRebaja: "Y minus X %",
    x: "Číslo X",
    xAyuda: "Procento. Pokud zvolíte „Kolik procent z Y je X?“, je to část celku.",
    y: "Číslo Y",
    resultado: "Výsledek",
    porcentaje: "Procento",
    diferencia: "Přičtená nebo odečtená částka",
    errorYCero: "Y nemůže být 0: z nuly se procento spočítat nedá.",
    fraseParte: (x, y, r) => `${x} % z ${y} je ${r}.`,
    fraseProporcion: (x, y, p) => `${x} je ${p} % z ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x} % je ${r}: přičte se ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} minus ${x} % je ${r}: odečte se ${d}.`,
  }),
};
