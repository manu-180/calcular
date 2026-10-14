import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosNl: TextosUi<UiConsumoElectrico> = {
  slug: "stroomverbruik-berekenen",
  ui: () => ({
    potencia: "Vermogen van het apparaat (W)",
    potenciaAyuda: "Dat staat op het typeplaatje of in de handleiding, in watt (W). Staat er kW, vermenigvuldig dan met 1000.",
    cantidad: "Aantal dezelfde apparaten",
    horas: "Uren gebruik per dag",
    dias: "Dagen gebruik per maand",
    precio: "Prijs per kWh",
    precioAyuda: "Die staat op je energierekening. Neem de prijs met belastingen erbij als je de echte kosten wilt zien.",
    kwhDia: "Verbruik per dag (kWh)",
    kwhMes: "Verbruik per maand (kWh)",
    kwhAnio: "Verbruik per jaar (kWh)",
    costoDia: "Kosten per dag",
    costoMes: "Kosten per maand",
    costoAnio: "Kosten per jaar",
    errorHoras: "Een dag heeft 24 uur: het gebruik moet tussen 0 en 24 liggen.",
  }),
};
