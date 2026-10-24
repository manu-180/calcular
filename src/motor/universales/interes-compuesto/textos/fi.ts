import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosFi: TextosUi<UiInteresCompuesto> = {
  slug: "korkoa-korolle",
  ui: () => ({
    capital: "Alkupääoma",
    aporte: "Kuukausisäästö (valinnainen)",
    aporteAyuda: "Summa, jonka talletat joka kuukausi. Talletus lasketaan kunkin kuukauden lopussa.",
    tasa: "Vuotuinen tuotto tai korko (%)",
    anios: "Vuosien määrä",
    capitalizacion: "Koron laskeminen",
    anual: "Kerran vuodessa",
    semestral: "Puolivuosittain",
    trimestral: "Neljännesvuosittain",
    mensual: "Kuukausittain",
    diaria: "Päivittäin",
    saldo: "Loppusumma",
    aportado: "Talletukset yhteensä",
    intereses: "Korot ja tuotot",
    tabla: "Kehitys vuosi vuodelta",
    colAnio: "Vuosi",
    colAportado: "Talletukset",
    colIntereses: "Korot",
    colSaldo: "Saldo vuoden lopussa",
    errorSinDinero: "Syötä alkupääoma tai kuukausisäästö.",
    observacionIntereses: (porcentaje) => `Loppusummasta ${porcentaje} % on korkoa korolle ja tuottoa.`,
  }),
};
