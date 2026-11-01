import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosBs: TextosUi<UiOvulacion> = {
  slug: "kalkulator-ovulacije",
  ui: () => ({
    fum: "Prvi dan posljednje menstruacije",
    fumAyuda: "Prvi dan krvarenja, ne posljednji.",
    ciclo: "Dužina ciklusa (dani)",
    cicloAyuda: "Od prvog dana jedne menstruacije do dana prije sljedeće. Ako se mijenja, unesite prosjek.",
    ovulacion: "Procijenjena ovulacija",
    fertilDesde: "Plodni dani od",
    fertilHasta: "Plodni dani do",
    proxima: "Sljedeća menstruacija",
    tabla: "Sljedeći ciklusi",
    colRegla: "Menstruacija",
    colDesde: "Plodni od",
    colHasta: "Plodni do",
    colOvulacion: "Ovulacija",
    errorCiclo: "Dužina ciklusa mora biti od 21 do 45 dana.",
    aviso: "Ovo je procjena za redovit ciklus. Nije metoda kontracepcije i ne zamjenjuje savjet ljekara.",
  }),
};
