import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosCs: TextosUi<UiPropina> = {
  slug: "kalkulacka-spropitneho",
  ui: () => ({
    cuenta: "Částka na účtu",
    porcentaje: "Spropitné (%)",
    porcentajeAyuda: "Zvyklosti se liší podle země i podniku. Zvolte, co vám připadá přiměřené.",
    personas: "Počet lidí, kteří platí",
    redondear: "Zaokrouhlit podíl každého nahoru",
    redondearAyuda: "Aby každý platil celou částku. Rozdíl připadne na spropitné.",
    propina: "Spropitné",
    total: "Celkem se spropitným",
    porPersona: "Každý zaplatí",
    propinaEfectiva: "Spropitné po zaokrouhlení",
    errorPersonas: "Platit musí alespoň jeden člověk.",
    observacionRedondeo: (efectiva) => `Po zaokrouhlení nahoru je spropitné ${efectiva} % z účtu.`,
  }),
};
