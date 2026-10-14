import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosDe: TextosUi<UiMetaDeAhorro> = {
  slug: "sparziel-rechner",
  ui: () => ({
    meta: "Wie viel möchten Sie sparen?",
    actual: "Schon gespart (optional)",
    meses: "In wie vielen Monaten?",
    rendimiento: "Zinsen auf das Ersparte (% pro Jahr, optional)",
    rendimientoAyuda: "Wenn das Geld auf einem Tagesgeldkonto oder in einer Anlage mit Zinsen liegt. Bringt es nichts, lassen Sie das Feld leer.",
    aporteMensual: "Nötige Sparrate pro Monat",
    aporteSemanal: "Das sind pro Woche",
    totalAportado: "Eingezahlt insgesamt",
    intereses: "Erhaltene Zinsen",
    errorMeta: "Geben Sie ein, wie viel Sie sparen möchten.",
    yaLlegas: "Ihr bisheriges Erspartes erreicht das Ziel in dieser Zeit auch ohne weitere Einzahlungen.",
  }),
};
