import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosSr: TextosUi<UiOvulacion> = {
  slug: "kalkulator-ovulacije",
  ui: () => ({
    fum: "Prvi dan poslednje menstruacije",
    fumAyuda: "Prvi dan krvarenja, ne poslednji.",
    ciclo: "Dužina ciklusa (dani)",
    cicloAyuda: "Od prvog dana jedne menstruacije do dana pre sledeće. Ako se menja, unesite prosek.",
    ovulacion: "Procenjena ovulacija",
    fertilDesde: "Plodni dani od",
    fertilHasta: "Plodni dani do",
    proxima: "Sledeća menstruacija",
    tabla: "Sledeći ciklusi",
    colRegla: "Menstruacija",
    colDesde: "Plodni od",
    colHasta: "Plodni do",
    colOvulacion: "Ovulacija",
    errorCiclo: "Dužina ciklusa mora biti od 21 do 45 dana.",
    aviso: "Ovo je procena za redovan ciklus. Nije metoda kontracepcije i ne zamenjuje savet lekara.",
  }),
};
