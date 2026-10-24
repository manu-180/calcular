import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosDa: TextosUi<UiSumarDias> = {
  slug: "laeg-dage-til-dato",
  ui: () => ({
    fecha: "Startdato",
    operacion: "Hvad vil du gøre?",
    sumar: "Lægge dage til",
    restar: "Trække dage fra",
    dias: "Antal dage",
    tipo: "Type af dage",
    corridos: "Kalenderdage",
    habiles: "Hverdage (mandag til fredag)",
    resultado: "Dato",
    diaSemana: "Ugedag",
    diasCorridos: "Kalenderdage i alt",
    nombresDias: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
    errorDias: "Antallet af dage skal være et helt tal og højst svare til 100 år.",
    notaHabiles: "Hverdage springer lørdage og søndage over, men ikke helligdage. Falder der en helligdag i perioden, så læg den til for sig.",
  }),
};
