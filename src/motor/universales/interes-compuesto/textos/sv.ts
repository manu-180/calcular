import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosSv: TextosUi<UiInteresCompuesto> = {
  slug: "ranta-pa-ranta",
  ui: () => ({
    capital: "Startbelopp",
    aporte: "Månadssparande (valfritt)",
    aporteAyuda: "Det du sätter in varje månad. Insättningen räknas i slutet av varje månad.",
    tasa: "Årlig avkastning eller ränta (%)",
    anios: "Antal år",
    capitalizacion: "Ränteberäkning",
    anual: "Varje år",
    semestral: "Varje halvår",
    trimestral: "Varje kvartal",
    mensual: "Varje månad",
    diaria: "Varje dag",
    saldo: "Slutbelopp",
    aportado: "Totalt insatt",
    intereses: "Ränta och avkastning",
    tabla: "Utveckling år för år",
    colAnio: "År",
    colAportado: "Insättningar",
    colIntereses: "Ränta",
    colSaldo: "Saldo vid årets slut",
    errorSinDinero: "Fyll i ett startbelopp eller ett månadssparande.",
    observacionIntereses: (porcentaje) => `${porcentaje} % av slutbeloppet är ränta på ränta och avkastning.`,
  }),
};
