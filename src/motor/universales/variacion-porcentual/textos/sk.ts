import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosSk: TextosUi<UiVariacion> = {
  slug: "percentualna-zmena",
  ui: () => ({
    inicial: "Pôvodná hodnota",
    final: "Nová hodnota",
    variacion: "Percentuálna zmena",
    diferencia: "Rozdiel",
    vuelta: "Návrat na pôvodnú hodnotu",
    vueltaAyuda: "O koľko by sa nová hodnota musela zmeniť, aby sa vrátila na pôvodnú.",
    errorInicialCero: "Pôvodná hodnota nesmie byť 0: z nuly sa percentuálna zmena vypočítať nedá.",
    subio: (p) => `Hodnota vzrástla o ${p} %.`,
    bajo: (p) => `Hodnota klesla o ${p} %.`,
    igual: "Bez zmeny: obe hodnoty sú rovnaké.",
  }),
};
