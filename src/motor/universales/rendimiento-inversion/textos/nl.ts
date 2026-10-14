import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosNl: TextosUi<UiRendimientoInversion> = {
  slug: "rendement-berekenen",
  ui: () => ({
    inicial: "Ingelegd bedrag",
    final: "Eindwaarde",
    finalAyuda: "Wat de belegging nu waard is, of wat je kreeg toen je verkocht.",
    cobrado: "Tussentijds ontvangen inkomsten (niet verplicht)",
    cobradoAyuda: "Dividend, rente of huur die je ontving en niet opnieuw belegde.",
    anios: "Aantal jaar belegd",
    aniosAyuda: "Decimalen mogen, bijvoorbeeld 1,5 voor anderhalf jaar.",
    ganancia: "Winst",
    roi: "Totaal rendement (ROI)",
    cagr: "Rendement per jaar (CAGR)",
    cagrAyuda: "Het rendement per jaar dat hetzelfde resultaat geeft als het elk jaar met rente op rente terugkomt.",
    errorInicial: "Vul in hoeveel je aan het begin hebt ingelegd.",
    observacionCorto: "Bij minder dan een jaar rekent het jaarrendement een kort resultaat door alsof het het hele jaar zo doorgaat. Lees het met de nodige voorzichtigheid.",
    observacionInflacion: "Wil je weten of je er in koopkracht op vooruit bent gegaan, vergelijk het jaarrendement dan met de inflatie in dezelfde periode.",
  }),
};
