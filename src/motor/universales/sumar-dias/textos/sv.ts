import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosSv: TextosUi<UiSumarDias> = {
  slug: "lagg-till-dagar",
  ui: () => ({
    fecha: "Startdatum",
    operacion: "Vad vill du göra?",
    sumar: "Lägga till dagar",
    restar: "Dra av dagar",
    dias: "Antal dagar",
    tipo: "Typ av dagar",
    corridos: "Kalenderdagar",
    habiles: "Vardagar (måndag till fredag)",
    resultado: "Datum",
    diaSemana: "Veckodag",
    diasCorridos: "Kalenderdagar totalt",
    nombresDias: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
    errorDias: "Antalet dagar måste vara ett heltal, högst 100 år.",
    notaHabiles: "Vardagar hoppar över lördagar och söndagar men inte helgdagar. Infaller en helgdag under perioden, lägg till den separat.",
  }),
};
