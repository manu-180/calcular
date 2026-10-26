import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosNb: TextosUi<UiFondoDeEmergencia> = {
  slug: "buffersparing",
  ui: () => ({
    gastos: "Nødvendige utgifter per måned",
    gastosAyuda: "Det du ikke kan slutte å betale: bolig, mat, strøm, transport, medisiner og avdrag på lån.",
    meses: "Antall måneder bufferen skal dekke",
    mesesAyuda: "3 til 6 måneder hvis inntekten er stabil. Mer hvis den varierer eller husholdningen bare har én inntekt.",
    actual: "Det du allerede har spart (valgfritt)",
    aporte: "Det du kan spare per måned (valgfritt)",
    meta: "Anbefalt buffer",
    falta: "Gjenstår å spare",
    mesesParaLlegar: "Måneder til bufferen er på plass",
    cobertura: "Måneder sparepengene dekker i dag",
    errorGastos: "Fyll inn de nødvendige utgiftene dine for én måned.",
    yaCubierto: "Bufferen din er på plass. Det du sparer fra nå av, kan gå til andre mål.",
    sinAporte: "Fyll inn hvor mye du kan spare hver måned, så ser du hvor lang tid det tar.",
    observacionDonde: "Ha bufferen på en egen konto som du kan ta ut fra samme dag, og der verdien ikke svinger, for eksempel en sparekonto.",
  }),
};
