import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosSv: TextosUi<UiPrestamo> = {
  slug: "lanekalkyl",
  ui: () => ({
    monto: "Lånebelopp",
    tasa: "Årsränta (%)",
    tasaAyuda: "Den nominella räntan per år i erbjudandet. Avgifter ingår inte.",
    meses: "Löptid i månader",
    extra: "Extra inbetalning per månad (valfritt)",
    extraAyuda: "Det du vill betala extra varje månad för att bli klar snabbare. Allt går till att minska skulden.",
    cuota: "Månadskostnad",
    intereses: "Total ränta",
    total: "Totalt att betala",
    mesesReales: "Månader till lånet är betalt med extra inbetalning",
    ahorro: "Ränta du sparar",
    tabla: "Amorteringsplan",
    colMes: "Månad",
    colPago: "Betalning",
    colInteres: "Ränta",
    colCapital: "Amortering",
    colSaldo: "Kvar att betala",
    errorMonto: "Fyll i ett belopp som är större än noll.",
    observacionCostos: "Månadskostnaden räknar inte med försäkringar, avgifter eller skatter som långivaren kan lägga till. Fråga efter den totala kostnaden innan du skriver på.",
    observacionExtra: (meses, ahorro) => `Med den extra inbetalningen är lånet betalt efter ${meses} månader och du sparar ${ahorro} i ränta.`,
  }),
};
