import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosEt: TextosUi<UiConsumoElectrico> = {
  slug: "elektrikulu",
  ui: (_trato, locale) => {
    const tuhat = new Intl.NumberFormat(locale).format(1000);
    return {
      potencia: "Seadme võimsus (W)",
      potenciaAyuda: `Võimsus on märgitud seadme andmesildile või kasutusjuhendisse vattides (W). Kui seal on kW, korruta see arvuga ${tuhat}.`,
      cantidad: "Samasuguste seadmete arv",
      horas: "Kasutustunde ööpäevas",
      dias: "Kasutuspäevi kuus",
      precio: "Elektri hind kWh kohta",
      precioAyuda: "Hinna leiad elektriarvelt. Kui tahad näha kogukulu, arvesta kilovatt-tunni kohta juurde ka võrgutasu, maksud ja käibemaks.",
      kwhDia: "Tarbimine ööpäevas (kWh)",
      kwhMes: "Tarbimine kuus (kWh)",
      kwhAnio: "Tarbimine aastas (kWh)",
      costoDia: "Kulu ööpäevas",
      costoMes: "Kulu kuus",
      costoAnio: "Kulu aastas",
      errorHoras: "Ööpäevas on 24 tundi. Kasutusaeg peab jääma vahemikku 0 kuni 24 tundi.",
    };
  },
};
