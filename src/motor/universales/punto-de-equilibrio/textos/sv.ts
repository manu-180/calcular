import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosSv: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even-kalkyl",
  ui: () => ({
    fijos: "Fasta kostnader per månad",
    fijosAyuda: "Det du betalar även om du inte säljer något: hyra, fasta löner, el, program och abonnemang.",
    precio: "Försäljningspris per styck",
    variable: "Rörlig kostnad per styck",
    variableAyuda: "Vad varje såld enhet kostar dig: material, inköp, provision och frakt.",
    objetivo: "Önskad vinst per månad (valfritt)",
    objetivoAyuda: "För att se hur mycket du behöver sälja utöver det som täcker kostnaderna.",
    unidades: "Antal enheter till nollpunkten",
    facturacion: "Omsättning vid nollpunkten",
    contribucion: "Täckningsbidrag per styck",
    contribucionAyuda: "Det varje försäljning lämnar till de fasta kostnaderna: pris minus rörlig kostnad.",
    contribucionPct: "Täckningsgrad (%)",
    unidadesObjetivo: "Antal enheter för din önskade vinst",
    facturacionObjetivo: "Omsättning för din önskade vinst",
    errorPrecio: "Fyll i försäljningspriset för en enhet.",
    errorMargen: "Den rörliga kostnaden är lika hög som priset eller högre. Varje försäljning går med förlust och du når aldrig nollpunkten. Kontrollera pris och kostnad.",
    observacionRedondeo: "Antalet enheter avrundas uppåt, eftersom du inte kan sälja en del av en enhet.",
  }),
};
