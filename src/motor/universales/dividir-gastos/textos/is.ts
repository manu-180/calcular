import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosIs: TextosUi<UiDividirGastos> = {
  slug: "skipta-kostnadi",
  ui: () => ({
    persona: (n) => `Einstaklingur ${n}`,
    personaAyuda: "Sláðu inn hvað hver og einn hefur borgað. Ef einhver hefur ekkert borgað en á að taka þátt í kostnaðinum, sláðu inn 0. Skildu hina eftir auða.",
    total: "Heildarkostnaður",
    personas: "Einstaklingar",
    cuota: "Hlutur á mann",
    transferencias: "Greiðslur til að gera upp",
    tabla: "Hver borgar hverjum",
    colDe: "Borgar",
    colPara: "Fær",
    colMonto: "Upphæð",
    errorPocas: "Það þarf að minnsta kosti tvo til að skipta kostnaði.",
    aMano: "Þið eruð kvitt. Allir hafa borgað jafn mikið.",
  }),
};
