import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosDa: TextosUi<UiCostoDeUnAuto> = {
  slug: "biludgifter",
  ui: () => ({
    precio: "Bilens værdi",
    precioAyuda: "Det, du gav for bilen, eller hvad den er værd i dag, hvis du har haft den et stykke tid.",
    depreciacion: "Værditab om året (%)",
    depreciacionAyuda: "En ny bil taber 15 % til 25 % i værdi det første år. En brugt bil taber mindre.",
    cuota: "Månedlig ydelse på billånet (valgfrit)",
    cuotaAyuda: "Kun for at vise, hvad der forlader kontoen hver måned. Den lægges ikke til de reelle udgifter.",
    seguro: "Forsikring om måneden",
    distanciaKm: "Kilometer om måneden",
    distanciaMi: "Engelske mil om måneden",
    consumoL100: "Brændstofforbrug (liter pr. 100 km)",
    consumoMpg: "Brændstofforbrug (engelske mil pr. gallon)",
    precioLitro: "Brændstofpris pr. liter",
    precioGalon: "Brændstofpris pr. gallon",
    mantenimiento: "Vedligeholdelse om måneden",
    mantenimientoAyuda: "Service, dæk, reparationer og bilvask, i gennemsnit om måneden.",
    estacionamiento: "Parkering om måneden (valgfrit)",
    otros: "Afgifter og andre udgifter om måneden (valgfrit)",
    otrosAyuda: "Ejerafgift, syn, vejafgifter og bøder, i gennemsnit om måneden.",
    costoMensual: "Reelle udgifter om måneden",
    costoAnual: "Reelle udgifter om året",
    porKm: "Udgift pr. kilometer",
    porMilla: "Udgift pr. engelsk mil",
    combustible: "Brændstof om måneden",
    depreciacionMensual: "Værditab om måneden",
    gastoBolsillo: "Det, der forlader kontoen hver måned",
    errorConsumo: "Skriv bilens brændstofforbrug, så brændstofudgiften kan beregnes.",
    observacionCuota:
      "Ydelsen på billånet indgår ikke i de reelle udgifter, fordi en del af den betaler selve bilen, og den tæller allerede med som værditab. Renten på lånet er en ekstra udgift oven i.",
  }),
};
