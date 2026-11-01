import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosLv: TextosUi<UiPropina> = {
  slug: "dzeramnaudas-kalkulators",
  ui: () => ({
    cuenta: "Rēķina summa",
    porcentaje: "Dzeramnauda (%)",
    porcentajeAyuda: "Paražas atšķiras atkarībā no valsts un iestādes. Izvēlieties to, kas jums šķiet piemēroti.",
    personas: "Maksātāju skaits",
    redondear: "Noapaļot katra daļu uz augšu",
    redondearAyuda: "Lai katrs maksātu veselu summu. Starpība aiziet dzeramnaudā.",
    propina: "Dzeramnauda",
    total: "Kopā ar dzeramnaudu",
    porPersona: "Katrs maksā",
    propinaEfectiva: "Dzeramnauda pēc noapaļošanas",
    errorPersonas: "Maksāt jāmaksā vismaz vienam cilvēkam.",
    observacionRedondeo: (efectiva) => `Pēc noapaļošanas uz augšu dzeramnauda ir ${efectiva}% no rēķina summas.`,
  }),
};
