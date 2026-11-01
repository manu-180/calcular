import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosNb: TextosUi<UiConsumoElectrico> = {
  slug: "stromforbruk",
  ui: (_trato, locale) => {
    const tusen = new Intl.NumberFormat(locale).format(1000);
    return {
      potencia: "Apparatets effekt (W)",
      potenciaAyuda: `Den står på typeskiltet eller i bruksanvisningen, i watt (W). Står det kW, gang med ${tusen}.`,
      cantidad: "Antall like apparater",
      horas: "Timer i bruk per dag",
      dias: "Dager i bruk per måned",
      precio: "Strømpris per kWh",
      precioAyuda: "Du finner den på strømregningen. Ta med nettleie, avgifter og mva. per kWh hvis du vil se hele kostnaden.",
      kwhDia: "Forbruk per dag (kWh)",
      kwhMes: "Forbruk per måned (kWh)",
      kwhAnio: "Forbruk per år (kWh)",
      costoDia: "Kostnad per dag",
      costoMes: "Kostnad per måned",
      costoAnio: "Kostnad per år",
      errorHoras: "Et døgn har 24 timer. Brukstiden må være mellom 0 og 24.",
    };
  },
};
