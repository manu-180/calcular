import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosSl: TextosUi<UiOvulacion> = {
  slug: "izracun-ovulacije",
  ui: () => ({
    fum: "Prvi dan zadnje menstruacije",
    fumAyuda: "Prvi dan krvavitve, ne zadnji.",
    ciclo: "Dolžina cikla (dnevi)",
    cicloAyuda: "Od prvega dne ene menstruacije do dneva pred naslednjo. Če se spreminja, vnesite povprečje.",
    ovulacion: "Predvidena ovulacija",
    fertilDesde: "Začetek plodnih dni",
    fertilHasta: "Konec plodnih dni",
    proxima: "Naslednja menstruacija",
    tabla: "Naslednji cikli",
    colRegla: "Menstruacija",
    colDesde: "Začetek plodnih dni",
    colHasta: "Konec plodnih dni",
    colOvulacion: "Ovulacija",
    errorCiclo: "Cikel mora trajati od 21 do 45 dni.",
    aviso: "To je ocena za reden cikel. Ni metoda kontracepcije in ne nadomešča nasveta zdravnika.",
  }),
};
