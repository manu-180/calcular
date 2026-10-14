import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosEn: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "Monthly take-home pay",
    ingresoAyuda: "What reaches your account each month, after taxes and deductions.",
    pctNecesidades: "Needs (%)",
    pctNecesidadesAyuda: "Housing, groceries, utilities, transport, health and minimum debt payments.",
    pctGustos: "Wants (%)",
    pctGustosAyuda: "Eating out, non-essential shopping, subscriptions, trips.",
    pctAhorro: "Savings (%)",
    pctAhorroAyuda: "Emergency fund, goals, retirement and extra debt payments.",
    necesidades: "For needs",
    gustos: "For wants",
    ahorro: "For savings",
    ahorroAnual: "Savings in a year",
    errorIngreso: "Enter your monthly income.",
    errorSuma: (suma) => `The three percentages add up to ${suma}%. They need to add up to 100%.`,
    observacionAhorroBajo: "Saving less than 10% leaves little room for surprises. If you can, trim some wants.",
  }),
};
