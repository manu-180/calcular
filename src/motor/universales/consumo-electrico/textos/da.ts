import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosDa: TextosUi<UiConsumoElectrico> = {
  slug: "beregn-elforbrug",
  ui: (_trato, locale) => {
    const tusind = new Intl.NumberFormat(locale).format(1000);
    return {
      potencia: "Apparatets effekt (W)",
      potenciaAyuda: `Den står på typeskiltet eller i brugsanvisningen, i watt (W). Står der kW, så gang med ${tusind}.`,
      cantidad: "Antal ens apparater",
      horas: "Timer i brug om dagen",
      dias: "Dage i brug om måneden",
      precio: "Elpris pr. kWh",
      precioAyuda: "Du finder den på din elregning. Tag nettarif, elafgift og moms med pr. kWh, hvis du vil se hele udgiften.",
      kwhDia: "Forbrug pr. dag (kWh)",
      kwhMes: "Forbrug pr. måned (kWh)",
      kwhAnio: "Forbrug pr. år (kWh)",
      costoDia: "Udgift pr. dag",
      costoMes: "Udgift pr. måned",
      costoAnio: "Udgift pr. år",
      errorHoras: "Et døgn har 24 timer. Brugstiden skal være mellem 0 og 24.",
    };
  },
};
