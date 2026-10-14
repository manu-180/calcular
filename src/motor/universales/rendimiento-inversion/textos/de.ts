import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosDe: TextosUi<UiRendimientoInversion> = {
  slug: "renditerechner",
  ui: () => ({
    inicial: "Angelegter Betrag",
    final: "Endwert",
    finalAyuda: "Was die Anlage heute wert ist oder was Sie beim Verkauf bekommen haben.",
    cobrado: "Zwischendurch erhaltene Erträge (optional)",
    cobradoAyuda: "Dividenden, Zinsen oder Mieten, die Sie ausgezahlt und nicht wieder angelegt haben.",
    anios: "Anlagedauer in Jahren",
    aniosAyuda: "Dezimalzahlen sind möglich, zum Beispiel für anderthalb Jahre.",
    ganancia: "Gewinn",
    roi: "Gesamtrendite (ROI)",
    cagr: "Rendite pro Jahr (CAGR)",
    cagrAyuda: "Die jährliche Rendite, die mit Zinseszins Jahr für Jahr zum selben Ergebnis führt.",
    errorInicial: "Geben Sie ein, wie viel Sie am Anfang angelegt haben.",
    observacionCorto: "Bei weniger als einem Jahr rechnet die Jahresrendite ein kurzes Ergebnis so hoch, als würde es sich das ganze Jahr wiederholen. Lesen Sie sie mit Vorsicht.",
    observacionInflacion: "Ob Sie Kaufkraft gewonnen haben, sehen Sie, wenn Sie die Jahresrendite mit der Inflation im selben Zeitraum vergleichen.",
  }),
};
