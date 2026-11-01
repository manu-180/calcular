import { formaIs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionIs } from "../../dias-entre-fechas/textos/is";
import type { UiEdad } from "../definicion";

export const textosIs: TextosUi<UiEdad> = {
  slug: "aldursreiknivel",
  ui: () => ({
    nacimiento: "Fæðingardagur",
    referencia: "Aldur þann",
    referenciaAyuda: "Dagurinn í dag er sjálfgefinn. Breyttu honum til að sjá aldurinn á öðrum degi.",
    edad: "Aldur",
    anios: "Ár",
    totalMeses: "Í mánuðum",
    totalSemanas: "Í vikum",
    totalDias: "Í dögum",
    proximo: "Næsti afmælisdagur",
    faltan: "Dagar eftir",
    cumplira: "Aldur á næsta afmæli",
    duracion: duracionIs,
    errorFutura: "Fæðingardagurinn má ekki vera á eftir dagsetningunni sem þú reiknar til.",
    cumpleHoy: (anios) => `Afmæli í dag. Viðkomandi verður ${anios} ${formaIs(anios, "árs", "ára")}.`,
    nota29: "Hjá þeim sem fæddust 29. febrúar er afmælisdagurinn talinn 28. febrúar þau ár sem eru ekki hlaupár.",
  }),
};
