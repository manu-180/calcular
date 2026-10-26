import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosNb: TextosUi<UiRendimientoInversion> = {
  slug: "beregn-avkastning",
  ui: () => ({
    inicial: "Investert beløp",
    final: "Sluttverdi",
    finalAyuda: "Hva investeringen er verdt i dag, eller hva du fikk da du solgte.",
    cobrado: "Utbetalinger underveis (valgfritt)",
    cobradoAyuda: "Utbytte, renter eller leieinntekter du har fått og ikke investert på nytt.",
    anios: "Antall år",
    aniosAyuda: "Desimaler går fint for deler av et år, for eksempel 1,5 år.",
    ganancia: "Gevinst",
    roi: "Samlet avkastning (ROI)",
    cagr: "Årlig avkastning (CAGR)",
    cagrAyuda: "Avkastningen per år som gir samme resultat når den vokser med renters rente år etter år.",
    errorInicial: "Fyll inn hvor mye du investerte fra starten.",
    observacionCorto: "Under ett år strekker den årlige avkastningen et kort resultat ut som om det ble gjentatt hele året. Tolk det med forsiktighet.",
    observacionInflacion: "Vil du vite om kjøpekraften din har økt, sammenlign den årlige avkastningen med prisveksten i samme periode.",
  }),
};
