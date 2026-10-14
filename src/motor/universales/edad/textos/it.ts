import type { TextosUi } from "../../tipos";
import { durataIt } from "../../dias-entre-fechas/textos/it";
import type { UiEdad } from "../definicion";

export const textosIt: TextosUi<UiEdad> = {
  slug: "calcolo-eta",
  ui: () => ({
    nacimiento: "Data di nascita",
    referencia: "Età alla data del",
    referenciaAyuda: "Di base è oggi. Cambiala per vedere l'età in un altro giorno.",
    edad: "Età",
    anios: "Anni compiuti",
    totalMeses: "In mesi",
    totalSemanas: "In settimane",
    totalDias: "In giorni",
    proximo: "Prossimo compleanno",
    faltan: "Giorni che mancano",
    cumplira: "Anni che compirà",
    duracion: durataIt,
    errorFutura: "La data di nascita non può essere successiva alla data che stai controllando.",
    cumpleHoy: (anni) => `Oggi è il compleanno: compie ${anni} anni.`,
    nota29: "Per chi è nato il 29 febbraio, negli anni non bisestili il compleanno si conta il 28 febbraio.",
  }),
};
