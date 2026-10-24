import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosSv: TextosUi<UiFondoDeEmergencia> = {
  slug: "buffertsparande",
  ui: () => ({
    gastos: "Nödvändiga utgifter per månad",
    gastosAyuda: "Det du inte kan sluta betala: boende, mat, el, resor, vård och avbetalningar på lån.",
    meses: "Antal månader bufferten ska räcka",
    mesesAyuda: "3 till 6 månader om du har en stabil inkomst. Mer om inkomsten varierar eller om hushållet bara har en inkomst.",
    actual: "Det du redan har sparat (valfritt)",
    aporte: "Det du kan spara per månad (valfritt)",
    meta: "Rekommenderad buffert",
    falta: "Kvar att spara",
    mesesParaLlegar: "Månader tills bufferten är klar",
    cobertura: "Månader som ditt sparande räcker i dag",
    errorGastos: "Fyll i dina nödvändiga utgifter för en månad.",
    yaCubierto: "Din buffert är klar. Det du sparar från och med nu kan gå till andra mål.",
    sinAporte: "Fyll i hur mycket du kan spara varje månad så ser du hur lång tid det tar.",
    observacionDonde: "Ha bufferten på ett separat konto som du kan ta ut pengar från samma dag och som inte svänger i värde, till exempel ett sparkonto.",
  }),
};
