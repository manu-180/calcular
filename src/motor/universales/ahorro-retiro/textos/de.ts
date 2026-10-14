import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosDe: TextosUi<UiAhorroRetiro> = {
  slug: "altersvorsorge-rechner",
  ui: () => ({
    edadActual: "Ihr Alter heute",
    edadRetiro: "Gewünschtes Renteneintrittsalter",
    actual: "Schon angespart",
    aporte: "Monatliche Sparrate",
    rendimiento: "Reale Rendite pro Jahr (%)",
    rendimientoAyuda: "Was die Anlage über der Inflation bringt. Langfristig sind 2 bis 5 % eine vorsichtige Annahme.",
    aniosRenta: "Wie viele Rentenjahre sollen abgedeckt sein?",
    aniosRentaAyuda: "Wie viele Jahre Sie aus diesem Vermögen Geld entnehmen möchten.",
    capital: "Vermögen bei Rentenbeginn",
    renta: "Monatliche Zusatzrente aus dem Vermögen",
    aportado: "Eingezahlt insgesamt",
    intereses: "Wertzuwachs insgesamt",
    tabla: "Entwicklung nach Alter",
    colEdad: "Alter",
    colAportado: "Bisher eingezahlt",
    colSaldo: "Vermögen",
    errorEdades: "Das Renteneintrittsalter muss über Ihrem heutigen Alter liegen.",
    errorSinAhorro: "Geben Sie Ihr bisheriges Vermögen oder eine monatliche Sparrate ein.",
    observacionDineroDeHoy: "Alle Beträge sind in heutiger Kaufkraft, weil die reale Rendite die Inflation schon abzieht.",
    observacionPublica: "Das ist nur Ihre private Vorsorge. Die gesetzliche Rente und Betriebsrenten sind nicht enthalten.",
  }),
};
