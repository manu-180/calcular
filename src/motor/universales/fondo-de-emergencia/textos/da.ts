import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosDa: TextosUi<UiFondoDeEmergencia> = {
  slug: "bufferopsparing",
  ui: () => ({
    gastos: "Faste nødvendige udgifter om måneden",
    gastosAyuda: "Det, du ikke kan lade være med at betale: bolig, mad, el og varme, transport, medicin og afdrag på lån.",
    meses: "Antal måneder bufferen skal række",
    mesesAyuda: "3 til 6 måneder, hvis du har en stabil indkomst. Mere, hvis indkomsten svinger, eller hvis husstanden kun har én indkomst.",
    actual: "Det, du allerede har sparet op (valgfrit)",
    aporte: "Det, du kan spare op om måneden (valgfrit)",
    meta: "Anbefalet buffer",
    falta: "Mangler at spare op",
    mesesParaLlegar: "Måneder til bufferen er på plads",
    cobertura: "Måneder din opsparing rækker i dag",
    errorGastos: "Skriv dine nødvendige udgifter for en måned.",
    yaCubierto: "Din buffer er på plads. Det, du sparer op fra nu af, kan gå til andre mål.",
    sinAporte: "Skriv, hvor meget du kan spare op hver måned, så ser du, hvor lang tid det tager.",
    observacionDonde: "Hav bufferen på en separat konto, som du kan hæve fra samme dag, og hvor værdien ikke svinger, fx en opsparingskonto.",
  }),
};
