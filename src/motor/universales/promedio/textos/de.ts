import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosDe: TextosUi<UiPromedio> = {
  slug: "notendurchschnitt",
  ui: () => ({
    nota: (n) => `Note ${n}`,
    notaAyuda: "Tragen Sie jede Note oder jeden Wert mit Gewichtung ein. Nicht benötigte Zeilen lassen Sie leer.",
    peso: (n) => `Gewichtung ${n}`,
    pesoAyuda: "Das kann ein Prozentsatz sein, Leistungspunkte (ECTS) oder wie oft die Note zählt. Ohne Gewichtung zählen alle gleich.",
    ponderado: "Gewichteter Durchschnitt",
    simple: "Einfacher Durchschnitt",
    cantidad: "Anzahl der Werte",
    sumaPesos: "Summe der Gewichtungen",
    errorSinNotas: "Geben Sie mindestens einen Wert ein.",
    errorFaltaPeso: "Dieser Wert hat keine Gewichtung. Wenn Sie gewichten, tragen Sie für jeden Wert eine ein.",
    errorFaltaNota: "Zu dieser Gewichtung fehlt der Wert. Tragen Sie ihn ein oder löschen Sie die Gewichtung.",
    errorPesosCero: "Die Gewichtungen ergeben zusammen 0. Mindestens eine muss über null liegen.",
    sinPesos: "Ohne Gewichtung ist der gewichtete Durchschnitt gleich dem einfachen.",
  }),
};
