import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosNb: TextosUi<UiOvulacion> = {
  slug: "eggolsningskalkulator",
  ui: () => ({
    fum: "Første dag i siste menstruasjon",
    fumAyuda: "Den første blødningsdagen, ikke den siste.",
    ciclo: "Syklusens lengde (dager)",
    cicloAyuda: "Fra første dag i én menstruasjon til dagen før den neste. Varierer den, bruk et gjennomsnitt.",
    ovulacion: "Omtrentlig eggløsning",
    fertilDesde: "Fruktbare dager fra",
    fertilHasta: "Fruktbare dager til",
    proxima: "Neste menstruasjon",
    tabla: "De neste syklusene",
    colRegla: "Menstruasjon",
    colDesde: "Fruktbar fra",
    colHasta: "Fruktbar til",
    colOvulacion: "Eggløsning",
    errorCiclo: "Syklusens lengde må være mellom 21 og 45 dager.",
    aviso: "Dette er et anslag for regelmessige sykluser og ikke en prevensjonsmetode. Kalkulatoren er veiledende og erstatter ikke en samtale med lege eller jordmor.",
  }),
};
