import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosDe: TextosUi<UiOvulacion> = {
  slug: "eisprung-rechner",
  ui: () => ({
    fum: "Erster Tag der letzten Periode",
    fumAyuda: "Der erste Tag der Blutung, nicht der letzte.",
    ciclo: "Zykluslänge (Tage)",
    cicloAyuda: "Vom ersten Tag einer Periode bis zum Tag vor der nächsten. Schwankt sie, nehmen Sie einen Durchschnitt.",
    ovulacion: "Voraussichtlicher Eisprung",
    fertilDesde: "Fruchtbare Tage ab",
    fertilHasta: "Fruchtbare Tage bis",
    proxima: "Nächste Periode",
    tabla: "Die nächsten Zyklen",
    colRegla: "Periode",
    colDesde: "Fruchtbar ab",
    colHasta: "Fruchtbar bis",
    colOvulacion: "Eisprung",
    errorCiclo: "Die Zykluslänge muss zwischen 21 und 45 Tagen liegen.",
    aviso: "Das ist eine Schätzung für regelmäßige Zyklen. Sie ist keine Verhütungsmethode und ersetzt keine ärztliche Beratung.",
  }),
};
