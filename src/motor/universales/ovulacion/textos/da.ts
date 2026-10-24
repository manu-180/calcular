import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosDa: TextosUi<UiOvulacion> = {
  slug: "aegloesningsberegner",
  ui: () => ({
    fum: "Første dag i sidste menstruation",
    fumAyuda: "Den første blødningsdag, ikke den sidste.",
    ciclo: "Cyklussens længde (dage)",
    cicloAyuda: "Fra første dag i en menstruation til dagen før den næste. Varierer den, så brug et gennemsnit.",
    ovulacion: "Omtrentlig ægløsning",
    fertilDesde: "Fertile dage fra",
    fertilHasta: "Fertile dage til",
    proxima: "Næste menstruation",
    tabla: "De næste cyklusser",
    colRegla: "Menstruation",
    colDesde: "Fertil fra",
    colHasta: "Fertil til",
    colOvulacion: "Ægløsning",
    errorCiclo: "Cyklussens længde skal være mellem 21 og 45 dage.",
    aviso: "Det er et skøn for regelmæssige cyklusser og ikke en prævention. Beregneren er vejledende og erstatter ikke en samtale med din læge eller jordemoder.",
  }),
};
