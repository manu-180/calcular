import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosDe: TextosUi<UiConsumoElectrico> = {
  slug: "stromkosten-rechner",
  ui: () => ({
    potencia: "Leistung des Geräts (W)",
    potenciaAyuda: "Steht auf dem Typenschild oder in der Anleitung, in Watt (W). Bei Angaben in kW mal 1000 nehmen.",
    cantidad: "Anzahl gleicher Geräte",
    horas: "Nutzung pro Tag (Stunden)",
    dias: "Nutzungstage pro Monat",
    precio: "Preis pro kWh",
    precioAyuda: "Steht auf Ihrer Stromrechnung als Arbeitspreis pro kWh, brutto, wenn Sie die vollen Kosten sehen möchten.",
    kwhDia: "Verbrauch pro Tag (kWh)",
    kwhMes: "Verbrauch pro Monat (kWh)",
    kwhAnio: "Verbrauch pro Jahr (kWh)",
    costoDia: "Kosten pro Tag",
    costoMes: "Kosten pro Monat",
    costoAnio: "Kosten pro Jahr",
    errorHoras: "Ein Tag hat 24 Stunden. Die Nutzung muss zwischen 0 und 24 liegen.",
  }),
};
