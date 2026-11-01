import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosIs: TextosUi<UiMetaDeAhorro> = {
  slug: "sparnadarmarkmid",
  ui: () => ({
    meta: "Hve miklu viltu safna?",
    actual: "Það sem þú hefur þegar sparað (valfrjálst)",
    meses: "Fjöldi mánaða að markmiðinu",
    rendimiento: "Ávöxtun eða innlánsvextir á ári (%, valfrjálst)",
    rendimientoAyuda: "Ef peningarnir eru á sparireikningi eða í fjárfestingu sem gefur vexti. Skildu reitinn eftir auðan ef þeir gefa ekkert.",
    aporteMensual: "Þú þarft að spara á mánuði",
    aporteSemanal: "Það samsvarar á viku",
    totalAportado: "Lagt fyrir samtals",
    intereses: "Vextir og ávöxtun",
    errorMeta: "Sláðu inn hve miklu þú vilt safna.",
    yaLlegas: "Það sem þú átt nú þegar dugar til að ná markmiðinu á þessum tíma án þess að þú leggir meira fyrir.",
  }),
};
