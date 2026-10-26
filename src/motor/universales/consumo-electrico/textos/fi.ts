import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosFi: TextosUi<UiConsumoElectrico> = {
  slug: "sahkonkulutus",
  ui: (_trato, locale) => {
    const tuhat = new Intl.NumberFormat(locale).format(1000);
    return {
      potencia: "Laitteen teho (W)",
      potenciaAyuda: `Teho on merkitty laitteen tyyppikilpeen tai käyttöohjeeseen watteina (W). Jos siinä lukee kW, kerro luvulla ${tuhat}.`,
      cantidad: "Samanlaisten laitteiden määrä",
      horas: "Käyttötunnit vuorokaudessa",
      dias: "Käyttöpäivät kuukaudessa",
      precio: "Sähkön hinta per kWh",
      precioAyuda: "Hinta löytyy sähkölaskusta. Jos haluat nähdä koko kustannuksen, laske mukaan siirtomaksu, verot ja arvonlisävero kilowattituntia kohden.",
      kwhDia: "Kulutus vuorokaudessa (kWh)",
      kwhMes: "Kulutus kuukaudessa (kWh)",
      kwhAnio: "Kulutus vuodessa (kWh)",
      costoDia: "Kustannus vuorokaudessa",
      costoMes: "Kustannus kuukaudessa",
      costoAnio: "Kustannus vuodessa",
      errorHoras: "Vuorokaudessa on 24 tuntia. Käyttöajan on oltava 0 ja 24 tunnin välillä.",
    };
  },
};
