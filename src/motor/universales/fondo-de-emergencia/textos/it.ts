import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosIt: TextosUi<UiFondoDeEmergencia> = {
  slug: "fondo-di-emergenza",
  ui: () => ({
    gastos: "Spese essenziali al mese",
    gastosAyuda: "Quelle che non puoi smettere di pagare: casa, cibo, bollette, trasporti, salute e rate dei debiti.",
    meses: "Mesi di spese da coprire",
    mesesAyuda: "Da 3 a 6 mesi se hai un reddito stabile. Di più se il reddito varia o in famiglia entra un solo stipendio.",
    actual: "Quanto hai già da parte (facoltativo)",
    aporte: "Quanto puoi risparmiare al mese (facoltativo)",
    meta: "Fondo di emergenza consigliato",
    falta: "Quanto manca",
    mesesParaLlegar: "Mesi per completarlo",
    cobertura: "Mesi che i tuoi risparmi coprono oggi",
    errorGastos: "Inserisci le tue spese essenziali di un mese.",
    yaCubierto: "Il tuo fondo è completo. Quello che risparmi da adesso in poi può andare ad altri obiettivi.",
    sinAporte: "Inserisci quanto puoi risparmiare ogni mese e ti diciamo quanto tempo ci vuole.",
    observacionDonde: "Tienilo su un conto separato, da cui puoi prelevare in giornata e che non perde valore, come un conto deposito libero.",
  }),
};
