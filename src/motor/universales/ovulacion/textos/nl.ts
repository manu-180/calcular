import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosNl: TextosUi<UiOvulacion> = {
  slug: "ovulatie-berekenen",
  ui: () => ({
    fum: "Eerste dag van je laatste menstruatie",
    fumAyuda: "De eerste dag van de bloeding, niet de laatste.",
    ciclo: "Lengte van je cyclus (dagen)",
    cicloAyuda: "Van de eerste dag van je menstruatie tot de dag voor de volgende. Wisselt het, neem dan een gemiddelde.",
    ovulacion: "Geschatte eisprong",
    fertilDesde: "Vruchtbare dagen vanaf",
    fertilHasta: "Vruchtbare dagen tot en met",
    proxima: "Volgende menstruatie",
    tabla: "Volgende cycli",
    colRegla: "Menstruatie",
    colDesde: "Vruchtbaar vanaf",
    colHasta: "Vruchtbaar tot en met",
    colOvulacion: "Eisprong",
    errorCiclo: "De lengte van je cyclus moet tussen 21 en 45 dagen liggen.",
    aviso: "Dit is een schatting voor een regelmatige cyclus. Het is geen anticonceptiemethode en het vervangt niet het advies van een arts.",
  }),
};
