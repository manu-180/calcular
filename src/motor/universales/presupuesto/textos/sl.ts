import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosSl: TextosUi<UiPresupuesto> = {
  slug: "druzinski-proracun",
  ui: () => ({
    ingreso: "Neto mesečni dohodek",
    ingresoAyuda: "Koliko vsak mesec prejmete na račun po odbitku davkov in prispevkov.",
    pctNecesidades: "Osnovni stroški (%)",
    pctNecesidadesAyuda: "Stanovanje, živila, računi za elektriko in ogrevanje, prevoz, zdravje in obvezni obroki dolgov.",
    pctGustos: "Želje in užitki (%)",
    pctGustosAyuda: "Restavracije, nakupi, ki niso nujni, naročnine, potovanja.",
    pctAhorro: "Varčevanje (%)",
    pctAhorroAyuda: "Rezerva za nepredvidene stroške, cilji, varčevanje za pokojnino in dodatna odplačila dolgov.",
    necesidades: "Za osnovne stroške",
    gustos: "Za želje in užitke",
    ahorro: "Za varčevanje",
    ahorroAnual: "Prihranek na leto",
    errorIngreso: "Vnesite svoj mesečni dohodek.",
    errorSuma: (suma) => `Vsota vseh treh odstotkov je ${suma} %. Skupaj mora biti 100 %.`,
    observacionAhorroBajo: "Če privarčujete manj kot 10 %, ostane malo prostora za nepredvidene stroške. Če lahko, namenite manj za želje in užitke.",
  }),
};
