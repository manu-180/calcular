import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosIt: TextosUi<UiPromedio> = {
  slug: "media-ponderata",
  ui: () => ({
    nota: (n) => `Voto ${n}`,
    notaAyuda: "Inserisci ogni voto o valore con il suo peso. Lascia vuote le righe che non usi.",
    peso: (n) => `Peso ${n}`,
    pesoAyuda: "Può essere una percentuale, i CFU o quante volte conta. Senza pesi, tutti i valori contano uguale.",
    ponderado: "Media ponderata",
    simple: "Media aritmetica",
    cantidad: "Valori",
    sumaPesos: "Somma dei pesi",
    errorSinNotas: "Inserisci almeno un valore.",
    errorFaltaPeso: "Questo valore non ha un peso. Se usi i pesi, inseriscili per tutti i valori.",
    errorFaltaNota: "Questo peso non ha un valore. Inserisci il valore o cancella il peso.",
    errorPesosCero: "La somma dei pesi è 0: almeno uno deve essere maggiore di zero.",
    sinPesos: "Senza pesi, la media ponderata coincide con quella aritmetica.",
  }),
};
