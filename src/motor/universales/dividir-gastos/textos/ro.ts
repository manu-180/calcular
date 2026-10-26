import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosRo: TextosUi<UiDividirGastos> = {
  slug: "impartire-cheltuieli",
  ui: () => ({
    persona: (n) => `Persoana ${n}`,
    personaAyuda: "Introduceți cât a plătit fiecare persoană. Dacă cineva nu a plătit nimic, dar participă la cheltuială, introduceți 0. Lăsați restul câmpurilor goale.",
    total: "Total cheltuit",
    personas: "Persoane",
    cuota: "Partea fiecăruia",
    transferencias: "Plăți pentru a închide socotelile",
    tabla: "Cine cui plătește",
    colDe: "Plătește",
    colPara: "Primește",
    colMonto: "Suma",
    errorPocas: "Pentru a împărți o cheltuială sunt necesare cel puțin două persoane.",
    aMano: "Sunteți chit: toată lumea a plătit la fel.",
  }),
};
