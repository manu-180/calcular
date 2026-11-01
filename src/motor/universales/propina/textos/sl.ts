import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosSl: TextosUi<UiPropina> = {
  slug: "izracun-napitnine",
  ui: () => ({
    cuenta: "Znesek računa",
    porcentaje: "Napitnina (%)",
    porcentajeAyuda: "Navade se razlikujejo od države do države in od lokala do lokala. Izberite delež, ki se vam zdi primeren.",
    personas: "Število oseb, ki plačajo",
    redondear: "Zaokroži delež vsake osebe navzgor",
    redondearAyuda: "Tako vsak plača okrogel znesek. Razlika gre v napitnino.",
    propina: "Napitnina",
    total: "Skupaj z napitnino",
    porPersona: "Na osebo",
    propinaEfectiva: "Napitnina po zaokrožitvi",
    errorPersonas: "Plača vsaj ena oseba.",
    observacionRedondeo: (efectiva) => `Po zaokrožitvi navzgor napitnina znaša ${efectiva} % računa.`,
  }),
};
