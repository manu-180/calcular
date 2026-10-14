import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosEn: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even",
  ui: () => ({
    fijos: "Fixed costs per month",
    fijosAyuda: "What you pay even if you sell nothing: rent, fixed salaries, utilities, software.",
    precio: "Selling price per unit",
    variable: "Variable cost per unit",
    variableAyuda: "What each unit sold costs you: materials, stock, commissions, shipping.",
    objetivo: "Target profit per month (optional)",
    objetivoAyuda: "To see how much to sell on top of covering your costs.",
    unidades: "Units to break even",
    facturacion: "Sales to break even",
    contribucion: "Contribution margin per unit",
    contribucionAyuda: "What each sale leaves to pay fixed costs: price minus variable cost.",
    contribucionPct: "Contribution margin (%)",
    unidadesObjetivo: "Units for your target profit",
    facturacionObjetivo: "Sales for your target profit",
    errorPrecio: "Enter the selling price of one unit.",
    errorMargen: "The variable cost is equal to or above the price: every sale loses money and you never break even. Check the price or the cost.",
    observacionRedondeo: "Units are rounded up, because you can't sell part of a unit.",
  }),
};
