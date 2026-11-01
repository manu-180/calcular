import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosSv: TextosUi<UiRendimientoInversion> = {
  slug: "rakna-ut-avkastning",
  ui: () => ({
    inicial: "Investerat belopp",
    final: "Slutvärde",
    finalAyuda: "Vad investeringen är värd i dag, eller vad du fick när du sålde.",
    cobrado: "Utbetalningar under tiden (valfritt)",
    cobradoAyuda: "Utdelningar, ränta eller hyra som du har fått och inte återinvesterat.",
    anios: "Antal år",
    aniosAyuda: "Decimaler går bra för delar av år, till exempel 1,5 år.",
    ganancia: "Vinst",
    roi: "Total avkastning (ROI)",
    cagr: "Årlig avkastning (CAGR)",
    cagrAyuda: "Den avkastning per år som ger samma resultat när den växer med ränta på ränta år efter år.",
    errorInicial: "Fyll i hur mycket du investerade från början.",
    observacionCorto: "Under ett år sträcker den årliga avkastningen ut ett kort resultat som om det upprepades hela året. Tolka den försiktigt.",
    observacionInflacion: "Vill du veta om din köpkraft har ökat, jämför den årliga avkastningen med inflationen under samma period.",
  }),
};
