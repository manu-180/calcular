import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosEn: TextosUi<UiAhorroRetiro> = {
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "Your age today",
    edadRetiro: "Age you want to retire",
    actual: "What you have saved already",
    aporte: "Monthly contribution",
    rendimiento: "Real annual return (%)",
    rendimientoAyuda: "What the investment earns above inflation. 2% to 5% is a cautious assumption over the long run.",
    aniosRenta: "Years of retirement to cover",
    aniosRentaAyuda: "How many years you want to draw on these savings.",
    capital: "Savings at retirement",
    renta: "Monthly income from those savings",
    aportado: "Total contributed",
    intereses: "Total growth",
    tabla: "Growth by age",
    colEdad: "Age",
    colAportado: "Contributed so far",
    colSaldo: "Savings",
    errorEdades: "Your retirement age has to be higher than your age today.",
    errorSinAhorro: "Enter your current savings or a monthly contribution.",
    observacionDineroDeHoy: "Amounts are in today's money, because the return already takes inflation out.",
    observacionPublica: "This is only your own savings. It does not include any state pension or social security you may receive.",
  }),
};
