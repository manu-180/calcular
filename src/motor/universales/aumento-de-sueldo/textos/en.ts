import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosEn: TextosUi<UiAumentoDeSueldo> = {
  slug: "pay-raise",
  ui: () => ({
    sueldo: "Current monthly pay",
    sueldoAyuda: "Gross or take-home, whichever you prefer. The result uses the same basis.",
    aumentoPorcentaje: "Raise (%)",
    aumentoMonto: "Raise as an amount (optional)",
    aumentoMontoAyuda: "If your raise is a fixed amount, enter it here. It is used instead of the percentage.",
    inflacion: "Inflation over the period (%, optional)",
    inflacionAyuda: "Inflation since your last raise, to see whether your pay buys more or less than before.",
    sueldosAnio: "Paychecks per year",
    sueldosAnioAyuda: "12 for monthly pay. 13 or 14 if you also get an extra month's pay each year.",
    nuevo: "New monthly pay",
    diferenciaMensual: "Difference per month",
    diferenciaAnual: "Difference per year",
    porcentaje: "Raise as a percentage",
    real: "Real raise (after inflation)",
    realAyuda: "How much more your new pay can buy than your old pay.",
    errorSueldo: "Enter your current pay.",
    errorSinAumento: "Enter the raise as a percentage or an amount.",
    observacionGana: (puntos) => `You beat inflation: your pay buys ${puntos}% more than before.`,
    observacionPierde: (puntos) => `Your raise falls short of inflation: your pay buys ${puntos}% less than before.`,
    observacionIgual: "Your raise matches inflation: your pay buys the same as before.",
  }),
};
