import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosIs: TextosUi<UiPresupuesto> = {
  slug: "fjarhagsaaetlun",
  ui: () => ({
    ingreso: "Mánaðartekjur eftir skatt",
    ingresoAyuda: "Það sem kemur inn á reikninginn í hverjum mánuði, eftir skatt og önnur gjöld.",
    pctNecesidades: "Nauðsynleg útgjöld (%)",
    pctNecesidadesAyuda: "Húsnæði, matur, rafmagn, samgöngur, heilsa og lágmarksgreiðslur af lánum.",
    pctGustos: "Afþreying og annað (%)",
    pctGustosAyuda: "Veitingahús, kaup sem þú kemst af án, áskriftir og ferðalög.",
    pctAhorro: "Sparnaður (%)",
    pctAhorroAyuda: "Varasjóður, sparnaðarmarkmið, eftirlaun og aukagreiðslur inn á skuldir.",
    necesidades: "Í nauðsynleg útgjöld",
    gustos: "Í afþreyingu og annað",
    ahorro: "Í sparnað",
    ahorroAnual: "Sparnaður á ári",
    errorIngreso: "Sláðu inn mánaðartekjurnar þínar.",
    errorSuma: (suma) => `Prósenturnar þrjár eru samtals ${suma}%. Þær verða að vera 100% samtals.`,
    observacionAhorroBajo: "Ef þú sparar minna en 10% er lítið svigrúm fyrir óvænt útgjöld. Dragðu úr afþreyingu ef þú getur.",
  }),
};
