import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosSv: TextosUi<UiConsumoElectrico> = {
  slug: "elkostnad",
  ui: (_trato, locale) => {
    const tusen = new Intl.NumberFormat(locale).format(1000);
    return {
      potencia: "Apparatens effekt (W)",
      potenciaAyuda: `Den står på märkskylten eller i bruksanvisningen, i watt (W). Står det kW, multiplicera med ${tusen}.`,
      cantidad: "Antal likadana apparater",
      horas: "Timmar i bruk per dag",
      dias: "Dagar i bruk per månad",
      precio: "Elpris per kWh",
      precioAyuda: "Du hittar det på elräkningen. Räkna med nätavgift, skatt och moms per kWh om du vill se hela kostnaden.",
      kwhDia: "Förbrukning per dag (kWh)",
      kwhMes: "Förbrukning per månad (kWh)",
      kwhAnio: "Förbrukning per år (kWh)",
      costoDia: "Kostnad per dag",
      costoMes: "Kostnad per månad",
      costoAnio: "Kostnad per år",
      errorHoras: "Ett dygn har 24 timmar. Användningen måste vara mellan 0 och 24.",
    };
  },
};
