import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosDe: TextosUi<UiCeramicos> = {
  slug: "fliesenrechner",
  ui: () => ({
    superficie: (u) => `Zu fliesende Fläche (${u})`,
    largo: (u) => `Länge der Fliese (${u})`,
    ancho: (u) => `Breite der Fliese (${u})`,
    desperdicio: "Verschnitt (%)",
    desperdicioAyuda: "Für Zuschnitte und Bruch. Rechnen Sie mit 10 % bei gerader Verlegung und 15 % bei diagonaler.",
    porCaja: "Fliesen pro Paket",
    porCajaAyuda: "Optional. Tragen Sie es ein, um zu sehen, wie viele Pakete Sie kaufen müssen.",
    piezas: "Benötigte Fliesen",
    cajas: "Zu kaufende Pakete",
    conDesperdicio: (u) => `Fläche mit Verschnitt (${u})`,
    cubre: (u) => `Fläche, die die Pakete abdecken (${u})`,
    errorSuperficie: "Die Fläche muss über 0 liegen.",
    errorPieza: "Die Maße der Fliese müssen über 0 liegen.",
  }),
};
