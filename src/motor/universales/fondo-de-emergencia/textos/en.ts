import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosEn: TextosUi<UiFondoDeEmergencia> = {
  slug: "emergency-fund",
  ui: () => ({
    gastos: "Essential expenses per month",
    gastosAyuda: "What you can't stop paying: housing, food, utilities, transport, health and debt payments.",
    meses: "Months of expenses to cover",
    mesesAyuda: "3 to 6 months if your income is steady. More if it varies or your household has a single income.",
    actual: "What you have set aside already (optional)",
    aporte: "What you can save per month (optional)",
    meta: "Recommended emergency fund",
    falta: "Still to save",
    mesesParaLlegar: "Months to complete it",
    cobertura: "Months your savings cover today",
    errorGastos: "Enter your essential expenses for one month.",
    yaCubierto: "Your fund is complete. Whatever you save from now on can go to other goals.",
    sinAporte: "Enter how much you can save each month and we tell you how long it takes.",
    observacionDonde: "Keep it in a separate account you can withdraw from the same day and that keeps its value, like a savings account or money market fund.",
  }),
};
