import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosEn: TextosUi<UiInteresCompuesto> = {
  slug: "compound-interest",
  ui: () => ({
    capital: "Initial amount",
    aporte: "Monthly contribution (optional)",
    aporteAyuda: "What you would add each month. It is added at the end of each month.",
    tasa: "Annual interest rate (%)",
    anios: "Years",
    capitalizacion: "Compounding",
    anual: "Yearly",
    semestral: "Semiannually",
    trimestral: "Quarterly",
    mensual: "Monthly",
    diaria: "Daily",
    saldo: "Final balance",
    aportado: "Total contributed",
    intereses: "Interest earned",
    tabla: "Growth year by year",
    colAnio: "Year",
    colAportado: "Contributions",
    colIntereses: "Interest",
    colSaldo: "Year-end balance",
    errorSinDinero: "Enter an initial amount or a monthly contribution.",
    observacionIntereses: (porcentaje) => `${porcentaje}% of the final balance is interest.`,
  }),
};
