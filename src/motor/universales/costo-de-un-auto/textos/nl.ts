import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosNl: TextosUi<UiCostoDeUnAuto> = {
  slug: "autokosten-berekenen",
  ui: () => ({
    precio: "Waarde van de auto",
    precioAyuda: "Wat je ervoor betaalde, of wat hij nu waard is als je hem al een tijd hebt.",
    depreciacion: "Waardeverlies per jaar (%)",
    depreciacionAyuda: "Een nieuwe auto verliest het eerste jaar 15% tot 25% van zijn waarde. Een tweedehands auto minder.",
    cuota: "Maandbedrag autolening (niet verplicht)",
    cuotaAyuda: "Alleen om te zien wat er elke maand van je rekening gaat. Het telt niet mee in de echte kosten.",
    seguro: "Verzekering per maand",
    distanciaKm: "Kilometers per maand",
    distanciaMi: "Mijl per maand",
    consumoL100: "Verbruik (liter per 100 km)",
    consumoMpg: "Verbruik (mijl per gallon)",
    precioLitro: "Brandstofprijs per liter",
    precioGalon: "Brandstofprijs per gallon",
    mantenimiento: "Onderhoud per maand",
    mantenimientoAyuda: "Onderhoudsbeurten, banden, reparaties en wassen, gemiddeld per maand.",
    estacionamiento: "Parkeren per maand (niet verplicht)",
    otros: "Belastingen, tol en overige kosten per maand (niet verplicht)",
    otrosAyuda: "Wegenbelasting, keuring, tol en boetes, gemiddeld per maand.",
    costoMensual: "Echte kosten per maand",
    costoAnual: "Echte kosten per jaar",
    porKm: "Kosten per kilometer",
    porMilla: "Kosten per mijl",
    combustible: "Brandstof per maand",
    depreciacionMensual: "Waardeverlies per maand",
    gastoBolsillo: "Wat er elke maand van je rekening gaat",
    errorConsumo: "Vul het verbruik van je auto in om de brandstofkosten te berekenen.",
    observacionCuota:
      "Het maandbedrag van de lening telt niet mee in de echte kosten. Een deel ervan betaalt de auto zelf, en die zit al in het waardeverlies. De rente op de lening komt er nog bovenop.",
  }),
};
