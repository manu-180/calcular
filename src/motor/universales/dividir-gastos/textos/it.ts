import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosIt: TextosUi<UiDividirGastos> = {
  slug: "dividere-spese",
  ui: () => ({
    persona: (n) => `Persona ${n}`,
    personaAyuda: "Inserisci quanto ha pagato ciascuno. Se qualcuno non ha pagato niente ma partecipa alla spesa, scrivi 0. Lascia vuoti gli altri.",
    total: "Spesa totale",
    personas: "Persone",
    cuota: "Quota a testa",
    transferencias: "Pagamenti per pareggiare",
    tabla: "Chi paga a chi",
    colDe: "Paga",
    colPara: "Riceve",
    colMonto: "Importo",
    errorPocas: "Per dividere una spesa servono almeno due persone.",
    aMano: "Siete pari: avete pagato tutti la stessa cifra.",
  }),
};
