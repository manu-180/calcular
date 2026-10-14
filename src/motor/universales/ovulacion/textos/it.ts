import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosIt: TextosUi<UiOvulacion> = {
  slug: "calcolo-ovulazione",
  ui: () => ({
    fum: "Primo giorno dell'ultima mestruazione",
    fumAyuda: "Il primo giorno del flusso, non l'ultimo.",
    ciclo: "Durata del ciclo (giorni)",
    cicloAyuda: "Dal primo giorno di una mestruazione al giorno prima della successiva. Se cambia, usa una media.",
    ovulacion: "Ovulazione stimata",
    fertilDesde: "Giorni fertili dal",
    fertilHasta: "Giorni fertili fino al",
    proxima: "Prossima mestruazione",
    tabla: "Prossimi cicli",
    colRegla: "Mestruazione",
    colDesde: "Fertile dal",
    colHasta: "Fertile fino al",
    colOvulacion: "Ovulazione",
    errorCiclo: "La durata del ciclo deve essere tra 21 e 45 giorni.",
    aviso: "È una stima pensata per cicli regolari. Non è un metodo contraccettivo e non sostituisce il parere del medico.",
  }),
};
