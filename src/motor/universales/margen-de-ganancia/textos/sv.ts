import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosSv: TextosUi<UiMargenDeGanancia> = {
  slug: "marginalkalkylator",
  ui: () => ({
    modo: "Vad vill du räkna ut?",
    modoPrecio: "Marginalen, utifrån kostnad och pris",
    modoMargen: "Priset för en viss marginal",
    modoMarkup: "Priset för ett visst påslag",
    costo: "Kostnad per styck",
    costoAyuda: "Vad det kostar att köpa in eller tillverka en enhet, exklusive moms.",
    precio: "Försäljningspris",
    precioAyuda: "Bara om du räknar ut marginalen. Exklusive moms.",
    objetivo: "Önskad marginal eller påslag (%)",
    objetivoAyuda: "Bara om du räknar ut priset.",
    precioResultado: "Försäljningspris",
    margen: "Marginal",
    margenAyuda: "Vinsten i procent av försäljningspriset.",
    markup: "Påslag",
    markupAyuda: "Vinsten i procent av kostnaden.",
    ganancia: "Vinst per styck",
    errorCosto: "Fyll i kostnaden för en enhet.",
    errorFaltaPrecio: "Fyll i försäljningspriset för att räkna ut marginalen.",
    errorFaltaObjetivo: "Fyll i den marginal eller det påslag du vill nå.",
    errorMargen100: "Marginalen måste vara under 100 %. Annars vore hela priset vinst utan någon kostnad.",
    observacionPerdida: "Till det priset säljer du under kostnad och förlorar pengar på varje försäljning.",
  }),
};
