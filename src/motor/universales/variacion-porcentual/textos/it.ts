import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

const senzaSegno = (p: string) => p.replace(/^[-−]\s*/, "");

export const textosIt: TextosUi<UiVariacion> = {
  slug: "variazione-percentuale",
  ui: () => ({
    inicial: "Valore iniziale",
    final: "Valore finale",
    variacion: "Variazione percentuale",
    diferencia: "Differenza",
    vuelta: "Per tornare al valore iniziale",
    vueltaAyuda: "Di quanto dovrebbe cambiare il valore finale per tornare a quello di partenza.",
    errorInicialCero: "Il valore iniziale non può essere 0: non esiste una variazione percentuale partendo da zero.",
    subio: (p) => `È aumentato ${percento(senzaSegno(p), "di")}.`,
    bajo: (p) => `È diminuito ${percento(senzaSegno(p), "di")}.`,
    igual: "Nessuna variazione: i due valori sono uguali.",
  }),
};
