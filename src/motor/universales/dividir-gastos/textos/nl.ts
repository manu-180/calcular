import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosNl: TextosUi<UiDividirGastos> = {
  slug: "kosten-verdelen",
  ui: () => ({
    persona: (n) => `Persoon ${n}`,
    personaAyuda: "Vul in wat ieder betaald heeft. Heeft iemand niets betaald maar deelt hij wel mee, vul dan 0 in. Laat de rest leeg.",
    total: "Totaal uitgegeven",
    personas: "Personen",
    cuota: "Ieders deel",
    transferencias: "Betalingen om te verrekenen",
    tabla: "Wie betaalt wie",
    colDe: "Betaalt",
    colPara: "Krijgt",
    colMonto: "Bedrag",
    errorPocas: "Je hebt minstens twee mensen nodig om kosten te verdelen.",
    aMano: "Jullie staan quitte: iedereen heeft evenveel betaald.",
  }),
};
