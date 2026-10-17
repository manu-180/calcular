import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

const textos: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even-rechner",
  ui: () => ({
    fijos: "Fixkosten pro Monat",
    fijosAyuda: "Was Sie zahlen, auch wenn Sie nichts verkaufen: Miete, feste Gehälter, Energie, Software.",
    precio: "Verkaufspreis pro Stück",
    variable: "Variable Kosten pro Stück",
    variableAyuda: "Was jedes verkaufte Stück kostet: Material, Wareneinsatz, Provisionen, Versand.",
    objetivo: "Gewinnziel pro Monat (optional)",
    objetivoAyuda: "Damit Sie sehen, wie viel Sie über die Kostendeckung hinaus verkaufen müssen.",
    unidades: "Stückzahl bis zur Gewinnschwelle",
    facturacion: "Umsatz bis zur Gewinnschwelle",
    contribucion: "Deckungsbeitrag pro Stück",
    contribucionAyuda: "Was jeder Verkauf zur Deckung der Fixkosten beiträgt: Preis minus variable Kosten.",
    contribucionPct: "Deckungsbeitrag (%)",
    unidadesObjetivo: "Stückzahl für Ihr Gewinnziel",
    facturacionObjetivo: "Umsatz für Ihr Gewinnziel",
    errorPrecio: "Geben Sie den Verkaufspreis für ein Stück ein.",
    errorMargen: "Die variablen Kosten sind so hoch wie der Preis oder höher. Jeder Verkauf macht Verlust, die Gewinnschwelle wird nie erreicht. Prüfen Sie Preis oder Kosten.",
    observacionRedondeo: "Die Stückzahl ist aufgerundet, weil sich kein halbes Stück verkaufen lässt.",
  }),
};

export const textosDe = textosConSuiza(textos);
