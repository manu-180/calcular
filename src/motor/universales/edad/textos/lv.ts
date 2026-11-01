import { pluralLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionLv } from "../../dias-entre-fechas/textos/lv";
import type { UiEdad } from "../definicion";

export const textosLv: TextosUi<UiEdad> = {
  slug: "vecuma-kalkulators",
  ui: () => ({
    nacimiento: "Dzimšanas datums",
    referencia: "Vecums uz datumu",
    referenciaAyuda: "Pēc noklusējuma tā ir šodiena. Mainiet datumu, ja vēlaties uzzināt vecumu citā dienā.",
    edad: "Vecums",
    anios: "Pilni gadi",
    totalMeses: "Mēnešos",
    totalSemanas: "Nedēļās",
    totalDias: "Dienās",
    proximo: "Nākamā dzimšanas diena",
    faltan: "Atlikušas dienas",
    cumplira: "Cik gadu apritēs",
    duracion: duracionLv,
    errorFutura: "Dzimšanas datums nevar būt vēlāks par datumu, uz kuru rēķināt vecumu.",
    cumpleHoy: (anios) => `Šodien ir dzimšanas diena: aprit tieši ${pluralLv(anios, "gads", "gadi", "gadu")}.`,
    nota29: "Ja dzimšanas datums ir 29. februāris, parastajos gados dzimšanas dienu skaitām 28. februārī.",
  }),
};
