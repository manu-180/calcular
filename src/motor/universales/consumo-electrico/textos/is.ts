import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosIs: TextosUi<UiConsumoElectrico> = {
  slug: "rafmagnsnotkun",
  ui: (_trato, locale) => {
    const thusund = new Intl.NumberFormat(locale).format(1000);
    return {
      potencia: "Afl tækisins (W)",
      potenciaAyuda: `Það kemur fram á merkiplötu tækisins eða í leiðbeiningunum, í vöttum (W). Ef það er gefið upp í kW skaltu margfalda með ${thusund}.`,
      cantidad: "Fjöldi eins tækja",
      horas: "Notkun á dag (klukkustundir)",
      dias: "Notkun á mánuði (dagar)",
      precio: "Rafmagnsverð á kWh",
      precioAyuda: "Þú finnur það á rafmagnsreikningnum. Taktu dreifingu, skatta og VSK á hverja kWh með ef þú vilt sjá allan kostnaðinn.",
      kwhDia: "Notkun á dag (kWh)",
      kwhMes: "Notkun á mánuði (kWh)",
      kwhAnio: "Notkun á ári (kWh)",
      costoDia: "Kostnaður á dag",
      costoMes: "Kostnaður á mánuði",
      costoAnio: "Kostnaður á ári",
      errorHoras: "Sólarhringurinn er 24 klukkustundir. Notkunin þarf að vera á bilinu 0 til 24.",
    };
  },
};
