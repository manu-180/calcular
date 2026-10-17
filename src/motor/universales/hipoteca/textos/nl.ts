import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosNl: TextosUi<UiHipoteca> = {
  slug: "hypotheek-berekenen",
  ui: () => ({
    precio: "Koopsom van de woning",
    entradaPorcentaje: "Eigen geld (% van de koopsom)",
    entradaMonto: "Eigen geld als bedrag (niet verplicht)",
    entradaMontoAyuda: "Vul je dit in, dan telt dit bedrag in plaats van het percentage.",
    tasa: "Hypotheekrente per jaar (%)",
    anios: "Looptijd in jaren",
    gastos: "Woonlasten per maand (niet verplicht)",
    gastosAyuda: "Gemeentelijke belastingen, opstalverzekering of de bijdrage aan de vereniging van eigenaars die je naast de hypotheek betaalt.",
    cuota: "Bruto maandlast hypotheek",
    cuotaTotal: "Maandlast met woonlasten",
    entrada: "Eigen geld",
    prestado: "Hypotheekbedrag",
    intereses: "Totale rente",
    total: "Totaal aan hypotheeklasten",
    tabla: "Per jaar",
    colAnio: "Jaar",
    colIntereses: "Betaalde rente",
    colCapital: "Afgelost",
    colSaldo: "Restschuld eind van het jaar",
    errorPrecio: "Vul de koopsom van de woning in.",
    errorEntrada: "Met dit eigen geld betaal je de hele woning, dus er valt geen hypotheek te berekenen. Verlaag het eigen geld.",
    observacionPrestado: (porcentaje) => `Je leent ${porcentaje}% van de waarde van de woning. Hoe hoger dat deel, hoe strenger de geldverstrekker meestal is.`,
    observacionCostos: "Bijkomende kosten (notaris, taxatie, belastingen, advies) zitten er niet in. Reken die bovenop je eigen geld.",
  }),
};
