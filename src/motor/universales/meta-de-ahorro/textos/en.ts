import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosEn: TextosUi<UiMetaDeAhorro> = {
  slug: "savings-goal",
  ui: () => ({
    meta: "How much do you want to save?",
    actual: "What you have saved already (optional)",
    meses: "Months to reach it",
    rendimiento: "Annual return on savings (%, optional)",
    rendimientoAyuda: "If the money sits in an account or investment that pays interest. Leave it empty if it earns nothing.",
    aporteMensual: "You need to save per month",
    aporteSemanal: "That is per week",
    totalAportado: "Total you put in",
    intereses: "Interest earned",
    errorMeta: "Enter how much you want to save.",
    yaLlegas: "What you already have reaches the goal in that time without adding more.",
  }),
};
