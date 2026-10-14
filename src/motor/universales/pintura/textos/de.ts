import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "Liter" : "Gallonen");

export const textosDe: TextosUi<UiPintura> = {
  slug: "farbbedarf-rechner",
  ui: () => ({
    modo: "Welche Maße haben Sie?",
    modoMedidas: "Wandlänge und Höhe",
    modoSuperficie: "Die gesamte Fläche",
    largo: (u) => `Gesamtlänge der Wände (${u})`,
    largoAyuda: "Alle Wände, die Sie streichen, zusammengezählt. Bei einem Zimmer ist das der Umfang.",
    alto: (u) => `Raumhöhe (${u})`,
    superficie: (u) => `Zu streichende Fläche (${u})`,
    aberturas: (u) => `Türen und Fenster abziehen (${u})`,
    aberturasAyuda: "Eine Tür hat etwa 2 m², ein normales Fenster 1 bis 2 m².",
    manos: "Anzahl der Anstriche",
    rendimiento: (u) => `Ergiebigkeit der Farbe (${u})`,
    rendimientoAyuda: "Steht auf dem Eimer: wie viel Fläche die Farbe pro Anstrich deckt. Wenn Sie es nicht wissen, lassen Sie den vorgeschlagenen Wert stehen.",
    recomendado: (u) => `Zu kaufende Farbe (${volumen(u)})`,
    recomendadoAyuda: "Mit 10 % Reserve für Ausbesserungen und das, was in der Rolle bleibt.",
    necesario: (u) => `Genaue Menge (${volumen(u)})`,
    neta: (u) => `Zu streichende Fläche (${u})`,
    errorMedidas: "Tragen Sie Wandlänge und Raumhöhe ein.",
    errorSuperficie: "Tragen Sie die zu streichende Fläche ein.",
    errorAberturas: "Türen und Fenster können nicht die ganze Wand ausmachen.",
    errorRendimiento: "Die Ergiebigkeit muss über 0 liegen.",
  }),
};
