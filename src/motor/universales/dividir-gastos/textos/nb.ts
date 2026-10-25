import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosNb: TextosUi<UiDividirGastos> = {
  slug: "dele-utgifter",
  ui: () => ({
    persona: (n) => `Person ${n}`,
    personaAyuda: "Fyll inn hva hver person har betalt. Har noen ikke betalt noe, men skal være med og dele, fyller du inn 0. La resten stå tomme.",
    total: "Samlede utlegg",
    personas: "Personer",
    cuota: "Andel per person",
    transferencias: "Betalinger for å gjøre opp",
    tabla: "Hvem betaler hvem",
    colDe: "Betaler",
    colPara: "Får",
    colMonto: "Beløp",
    errorPocas: "Det trengs minst to personer for å dele en utgift.",
    aMano: "Dere er skuls. Alle har betalt like mye.",
  }),
};
