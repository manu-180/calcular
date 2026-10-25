import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosSv: TextosUi<UiMetaDeAhorro> = {
  slug: "sparkalkylator",
  ui: () => ({
    meta: "Hur mycket vill du spara ihop?",
    actual: "Det du redan har sparat (valfritt)",
    meses: "Antal månader till målet",
    rendimiento: "Avkastning eller sparränta per år (%, valfritt)",
    rendimientoAyuda: "Om pengarna ligger på ett sparkonto eller i en placering som ger ränta. Lämna tomt om de inte ger något.",
    aporteMensual: "Du behöver spara per månad",
    aporteSemanal: "Det motsvarar per vecka",
    totalAportado: "Totalt insatt",
    intereses: "Ränta och avkastning",
    errorMeta: "Fyll i hur mycket du vill spara.",
    yaLlegas: "Det du redan har räcker till målet på den tiden utan att du sätter in mer.",
  }),
};
