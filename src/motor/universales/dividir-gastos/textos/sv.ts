import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosSv: TextosUi<UiDividirGastos> = {
  slug: "dela-kostnader",
  ui: () => ({
    persona: (n) => `Person ${n}`,
    personaAyuda: "Fyll i vad varje person har betalat. Har någon inte betalat något men ska dela på kostnaden, fyll i 0. Lämna resten tomma.",
    total: "Totalt utlägg",
    personas: "Personer",
    cuota: "Andel per person",
    transferencias: "Betalningar för att göra upp",
    tabla: "Vem betalar vem",
    colDe: "Betalar",
    colPara: "Får",
    colMonto: "Belopp",
    errorPocas: "Det behövs minst två personer för att dela en kostnad.",
    aMano: "Ni är kvitt. Alla har betalat lika mycket.",
  }),
};
