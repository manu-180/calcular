import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosCs: TextosUi<UiVariacion> = {
  slug: "procentualni-zmena",
  ui: () => ({
    inicial: "Původní hodnota",
    final: "Nová hodnota",
    variacion: "Procentuální změna",
    diferencia: "Rozdíl",
    vuelta: "Návrat na původní hodnotu",
    vueltaAyuda: "O kolik by se nová hodnota musela změnit, aby se vrátila na původní.",
    errorInicialCero: "Původní hodnota nesmí být 0: z nuly se procentuální změna spočítat nedá.",
    subio: (p) => `Hodnota vzrostla o ${p} %.`,
    bajo: (p) => `Hodnota klesla o ${p} %.`,
    igual: "Beze změny: obě hodnoty jsou stejné.",
  }),
};
