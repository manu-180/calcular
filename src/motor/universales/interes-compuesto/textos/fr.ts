import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosFr: TextosUi<UiInteresCompuesto> = {
  slug: "calcul-interets-composes",
  ui: () => ({
    capital: "Capital de départ",
    aporte: "Versement mensuel (facultatif)",
    aporteAyuda: "Ce que vous ajouteriez chaque mois. Il est versé à la fin de chaque mois.",
    tasa: "Taux d’intérêt annuel (%)",
    anios: "Durée en années",
    capitalizacion: "Capitalisation",
    anual: "Annuelle",
    semestral: "Semestrielle",
    trimestral: "Trimestrielle",
    mensual: "Mensuelle",
    diaria: "Quotidienne",
    saldo: "Capital final",
    aportado: "Total versé",
    intereses: "Intérêts gagnés",
    tabla: "Évolution année par année",
    colAnio: "Année",
    colAportado: "Versements",
    colIntereses: "Intérêts",
    colSaldo: "Capital en fin d’année",
    errorSinDinero: "Saisissez un capital de départ ou un versement mensuel.",
    observacionIntereses: (porcentaje) => `${porcentaje.replace(".", ",")} % du capital final vient des intérêts.`,
  }),
};
