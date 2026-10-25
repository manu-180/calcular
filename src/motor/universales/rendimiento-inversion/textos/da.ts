import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosDa: TextosUi<UiRendimientoInversion> = {
  slug: "afkastberegner",
  ui: () => ({
    inicial: "Investeret beløb",
    final: "Slutværdi",
    finalAyuda: "Hvad investeringen er værd i dag, eller hvad du fik, da du solgte.",
    cobrado: "Udbetalinger undervejs (valgfrit)",
    cobradoAyuda: "Udbytte, renter eller husleje, som du har fået og ikke geninvesteret.",
    anios: "Antal år",
    aniosAyuda: "Decimaler går fint for dele af et år, fx 1,5 år.",
    ganancia: "Gevinst",
    roi: "Samlet afkast (ROI)",
    cagr: "Årligt afkast (CAGR)",
    cagrAyuda: "Det afkast om året, der giver samme resultat, når det vokser med renters rente år efter år.",
    errorInicial: "Skriv, hvor meget du investerede fra starten.",
    observacionCorto: "Under et år strækker det årlige afkast et kort resultat ud, som om det blev gentaget hele året. Tolk det med forsigtighed.",
    observacionInflacion: "Vil du vide, om din købekraft er steget, så sammenlign det årlige afkast med inflationen i samme periode.",
  }),
};
