import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosSk: TextosUi<UiPropina> = {
  slug: "kalkulacka-prepitneho",
  ui: () => ({
    cuenta: "Suma na účte",
    porcentaje: "Prepitné (%)",
    porcentajeAyuda: "Zvyklosti sa líšia podľa krajiny aj podniku. Zvoľte, čo vám pripadá primerané.",
    personas: "Počet ľudí, ktorí platia",
    redondear: "Zaokrúhliť podiel každého nahor",
    redondearAyuda: "Aby každý platil celú sumu. Rozdiel pripadne na prepitné.",
    propina: "Prepitné",
    total: "Spolu s prepitným",
    porPersona: "Každý zaplatí",
    propinaEfectiva: "Prepitné po zaokrúhlení",
    errorPersonas: "Platiť musí aspoň jeden človek.",
    observacionRedondeo: (efectiva) => `Po zaokrúhlení nahor je prepitné ${efectiva} % z účtu.`,
  }),
};
