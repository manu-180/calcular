import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosDa: TextosUi<UiDividirGastos> = {
  slug: "del-udgifter",
  ui: () => ({
    persona: (n) => `Person ${n}`,
    personaAyuda: "Skriv, hvad hver person har betalt. Har nogen ikke betalt noget, men skal være med til at dele, så skriv 0. Lad resten stå tomme.",
    total: "Samlede udlæg",
    personas: "Personer",
    cuota: "Andel pr. person",
    transferencias: "Betalinger for at gøre op",
    tabla: "Hvem betaler hvem",
    colDe: "Betaler",
    colPara: "Modtager",
    colMonto: "Beløb",
    errorPocas: "Der skal mindst to personer til at dele en udgift.",
    aMano: "I er kvit. Alle har betalt lige meget.",
  }),
};
