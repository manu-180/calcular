import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosIt: TextosUi<UiAumentoDeSueldo> = {
  slug: "calcolo-aumento-stipendio",
  ui: () => ({
    sueldo: "Stipendio mensile attuale",
    sueldoAyuda: "Lordo o netto, come preferisci. Il risultato usa la stessa base.",
    aumentoPorcentaje: "Aumento (%)",
    aumentoMonto: "Aumento come cifra (facoltativo)",
    aumentoMontoAyuda: "Se l'aumento è una cifra fissa, inseriscila qui. Si usa al posto della percentuale.",
    inflacion: "Inflazione nel periodo (%, facoltativo)",
    inflacionAyuda: "L'inflazione dall'ultimo aumento, per vedere se il tuo stipendio compra di più o di meno di prima.",
    sueldosAnio: "Mensilità all'anno",
    sueldosAnioAyuda: "12 se hai solo lo stipendio mensile. 13 o 14 se hai anche tredicesima o quattordicesima.",
    nuevo: "Nuovo stipendio mensile",
    diferenciaMensual: "Differenza al mese",
    diferenciaAnual: "Differenza all'anno",
    porcentaje: "Aumento in percentuale",
    real: "Aumento reale (al netto dell'inflazione)",
    realAyuda: "Quanto di più puoi comprare con il nuovo stipendio rispetto al vecchio.",
    errorSueldo: "Inserisci il tuo stipendio attuale.",
    errorSinAumento: "Inserisci l'aumento in percentuale o come cifra.",
    observacionGana: (punti) => `Hai battuto l'inflazione: il tuo stipendio compra ${percento(punti)} in più di prima.`,
    observacionPierde: (punti) => `L'aumento non copre l'inflazione: il tuo stipendio compra ${percento(punti)} in meno di prima.`,
    observacionIgual: "L'aumento è pari all'inflazione: il tuo stipendio compra quanto prima.",
  }),
};
