import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosNl: TextosUi<UiPresupuesto> = {
  slug: "50-30-20-regel",
  ui: () => ({
    ingreso: "Netto inkomen per maand",
    ingresoAyuda: "Wat er elke maand op je rekening komt, na belastingen en inhoudingen.",
    pctNecesidades: "Vaste lasten en noodzakelijk (%)",
    pctNecesidadesAyuda: "Huur of hypotheek, boodschappen, energie, vervoer, zorg en de minimale aflossing op schulden.",
    pctGustos: "Leuke dingen (%)",
    pctGustosAyuda: "Uit eten, shoppen, abonnementen, vakanties.",
    pctAhorro: "Sparen (%)",
    pctAhorroAyuda: "Buffer, spaardoelen, pensioen en extra aflossen op schulden.",
    necesidades: "Voor vaste lasten",
    gustos: "Voor leuke dingen",
    ahorro: "Om te sparen",
    ahorroAnual: "Gespaard in een jaar",
    errorIngreso: "Vul je netto inkomen per maand in.",
    errorSuma: (suma) => `De drie percentages zijn samen ${suma}%. Ze moeten samen 100% zijn.`,
    observacionAhorroBajo: "Spaar je minder dan 10%, dan heb je weinig ruimte voor tegenvallers. Schrap als het kan iets bij de leuke dingen.",
  }),
};
