import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosIt: TextosUi<UiMetaDeAhorro> = {
  slug: "obiettivo-di-risparmio",
  ui: () => ({
    meta: "Quanto vuoi mettere da parte?",
    actual: "Quanto hai già risparmiato (facoltativo)",
    meses: "In quanti mesi",
    rendimiento: "Rendimento annuo dei risparmi (%, facoltativo)",
    rendimientoAyuda: "Se i soldi stanno su un conto deposito o un investimento che rende. Lascialo vuoto se non rendono niente.",
    aporteMensual: "Devi risparmiare al mese",
    aporteSemanal: "Cioè a settimana",
    totalAportado: "Totale che versi",
    intereses: "Interessi maturati",
    errorMeta: "Inserisci quanto vuoi risparmiare.",
    yaLlegas: "Con quello che hai già arrivi all'obiettivo in quel tempo, senza aggiungere altro.",
  }),
};
