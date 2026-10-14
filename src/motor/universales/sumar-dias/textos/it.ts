import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosIt: TextosUi<UiSumarDias> = {
  slug: "aggiungere-giorni-a-una-data",
  ui: () => ({
    fecha: "Data di partenza",
    operacion: "Operazione",
    sumar: "Aggiungi giorni",
    restar: "Togli giorni",
    dias: "Numero di giorni",
    tipo: "Tipo di giorni",
    corridos: "Giorni di calendario",
    habiles: "Giorni lavorativi (dal lunedì al venerdì)",
    resultado: "Data risultante",
    diaSemana: "Giorno della settimana",
    diasCorridos: "Giorni di calendario in tutto",
    nombresDias: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
    errorDias: "Il numero di giorni deve essere un numero intero, fino a 100 anni.",
    notaHabiles: "I giorni lavorativi saltano sabati e domeniche, ma non le festività. Se ce n'è una in mezzo, aggiungila a parte.",
  }),
};
