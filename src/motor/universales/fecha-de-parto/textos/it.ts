import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosIt: TextosUi<UiFechaDeParto> = {
  slug: "data-presunta-parto",
  ui: () => ({
    metodo: "Quale data conosci?",
    fum: "Primo giorno dell'ultima mestruazione",
    concepcion: "Data del concepimento",
    fecha: "Data",
    fechaAyuda: "Se scegli l'ultima mestruazione, inserisci il primo giorno del flusso.",
    ciclo: "Durata del ciclo (giorni)",
    cicloAyuda: "Serve solo con l'ultima mestruazione. Se non la conosci, lascia 28.",
    fpp: "Data presunta del parto",
    edadGestacional: "Settimane di gravidanza oggi",
    trimestre: "Trimestre",
    faltan: "Giorni che mancano",
    fechaConcepcion: "Concepimento stimato",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "settimana" : "settimane"}${d ? ` e ${d} ${d === 1 ? "giorno" : "giorni"}` : ""}`,
    trimestres: ["Primo trimestre", "Secondo trimestre", "Terzo trimestre"],
    errorFutura: "La data non può essere successiva a oggi.",
    errorCiclo: "La durata del ciclo deve essere tra 20 e 45 giorni.",
    notaPasada: "Da quella data sono passate più di 42 settimane, quindi le settimane di gravidanza non vengono mostrate.",
    aviso: "È una stima: pochi bambini nascono proprio nel giorno previsto. L'ecografia e le visite con il ginecologo o l'ostetrica danno la data più precisa.",
  }),
};
