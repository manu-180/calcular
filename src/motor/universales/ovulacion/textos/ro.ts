import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosRo: TextosUi<UiOvulacion> = {
  slug: "calculator-ovulatie",
  ui: () => ({
    fum: "Prima zi a ultimei menstruații",
    fumAyuda: "Prima zi de sângerare, nu ultima.",
    ciclo: "Durata ciclului (zile)",
    cicloAyuda: "De la prima zi a unei menstruații până în ziua dinaintea următoarei. Dacă variază, folosiți o medie.",
    ovulacion: "Ovulație estimată",
    fertilDesde: "Zile fertile de la",
    fertilHasta: "Zile fertile până la",
    proxima: "Următoarea menstruație",
    tabla: "Următoarele cicluri",
    colRegla: "Menstruație",
    colDesde: "Fertil de la",
    colHasta: "Fertil până la",
    colOvulacion: "Ovulație",
    errorCiclo: "Durata ciclului trebuie să fie între 21 și 45 de zile.",
    aviso: "Este o estimare pentru cicluri regulate. Nu este o metodă contraceptivă și nu înlocuiește consultul unui medic.",
  }),
};
