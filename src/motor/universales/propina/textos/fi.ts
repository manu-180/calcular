import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosFi: TextosUi<UiPropina> = {
  slug: "tippilaskuri",
  ui: () => ({
    cuenta: "Laskun summa",
    porcentaje: "Tippi (%)",
    porcentajeAyuda: "Tippauskäytäntö vaihtelee maittain ja paikoittain. Valitse itsellesi sopiva.",
    personas: "Maksajien määrä",
    redondear: "Pyöristä jokaisen osuus ylöspäin",
    redondearAyuda: "Näin jokainen maksaa tasasumman. Ylijäämä menee tippiin.",
    propina: "Tippi",
    total: "Yhteensä tipin kanssa",
    porPersona: "Kukin maksaa",
    propinaEfectiva: "Tippi pyöristyksen jälkeen",
    errorPersonas: "Maksajia pitää olla vähintään yksi.",
    observacionRedondeo: (efectiva) => `Ylöspäin pyöristettynä tippi on ${efectiva} % laskun summasta.`,
  }),
};
