import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosSv: TextosUi<UiCostoDeUnAuto> = {
  slug: "bilkostnad",
  ui: () => ({
    precio: "Bilens värde",
    precioAyuda: "Det du betalade, eller vad bilen är värd i dag om du har haft den ett tag.",
    depreciacion: "Värdeminskning per år (%)",
    depreciacionAyuda: "En ny bil tappar 15 % till 25 % i värde första året. En begagnad tappar mindre.",
    cuota: "Månadskostnad för billånet (valfritt)",
    cuotaAyuda: "Bara för att visa vad som lämnar kontot varje månad. Den läggs inte till den verkliga kostnaden.",
    seguro: "Försäkring per månad",
    distanciaKm: "Kilometer per månad",
    distanciaMi: "Engelska mil per månad",
    consumoL100: "Bränsleförbrukning (liter per 100 km)",
    consumoMpg: "Bränsleförbrukning (engelska mil per gallon)",
    precioLitro: "Bränslepris per liter",
    precioGalon: "Bränslepris per gallon",
    mantenimiento: "Underhåll per månad",
    mantenimientoAyuda: "Service, däck, reparationer och biltvätt, i snitt per månad.",
    estacionamiento: "Parkering per månad (valfritt)",
    otros: "Skatt, avgifter och andra kostnader per månad (valfritt)",
    otrosAyuda: "Fordonsskatt, besiktning, vägavgifter och böter, i snitt per månad.",
    costoMensual: "Verklig kostnad per månad",
    costoAnual: "Verklig kostnad per år",
    porKm: "Kostnad per kilometer",
    porMilla: "Kostnad per engelsk mil",
    combustible: "Bränsle per månad",
    depreciacionMensual: "Värdeminskning per månad",
    gastoBolsillo: "Det som lämnar kontot varje månad",
    errorConsumo: "Fyll i bilens bränsleförbrukning så att bränslekostnaden kan räknas ut.",
    observacionCuota:
      "Avbetalningen på lånet ingår inte i den verkliga kostnaden, eftersom en del av den betalar själva bilen och den redan räknas som värdeminskning. Räntan på lånet är en extra kostnad utöver det.",
  }),
};
