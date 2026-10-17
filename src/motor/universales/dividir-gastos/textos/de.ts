import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

const textos: TextosUi<UiDividirGastos> = {
  slug: "kosten-teilen",
  ui: () => ({
    persona: (n) => `Person ${n}`,
    personaAyuda: "Tragen Sie ein, was jede Person bezahlt hat. Wer nichts bezahlt hat, aber mitteilt, bekommt eine 0. Den Rest lassen Sie leer.",
    total: "Ausgaben insgesamt",
    personas: "Personen",
    cuota: "Anteil pro Person",
    transferencias: "Nötige Überweisungen",
    tabla: "Wer zahlt wem",
    colDe: "Zahlt",
    colPara: "Bekommt",
    colMonto: "Betrag",
    errorPocas: "Zum Aufteilen braucht es mindestens zwei Personen.",
    aMano: "Alles ausgeglichen. Alle haben gleich viel bezahlt.",
  }),
};

export const textosDe = textosConSuiza(textos);
